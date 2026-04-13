"use client";

import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "@/controls/combobox";
import { SearchCode, Send } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SubComponentProps {
    component: string;
    description?: string;
    props: Record<string, string>;
}

export interface ComponentEntry {
    id: string;
    name: string;
    category: string;
    description: string;
    tags: string[];
    codeSnippet?: string;
    subComponents?: SubComponentProps[];
    href: string;
}

interface SearchResult extends ComponentEntry {
    matchedFields: string[];
    score: number;
}

interface ChatMessage {
    role: "user" | "assistant";
    content: string;
    component?: ComponentEntry; // context pill
}

interface Props {
    components: ComponentEntry[];
    onNavigate?: (component: ComponentEntry) => void;
}

// ─── Registry prompt builder ──────────────────────────────────────────────────

function buildSystemPrompt(components: ComponentEntry[]): string {
    const registry = components
        .map((c) => {
            const propsSection = c.subComponents
                ? c.subComponents
                    .map(
                        (sc) =>
                            `  ${sc.component}${sc.description ? ` — ${sc.description}` : ""}:\n` +
                            Object.entries(sc.props)
                                .map(([k, v]) => `    - ${k}: ${v}`)
                                .join("\n")
                    )
                    .join("\n")
                : "";

            return `### ${c.name} (${c.category})
Description: ${c.description}
Tags: ${c.tags.join(", ")}
${c.codeSnippet ? `Usage:\n\`\`\`tsx\n${c.codeSnippet}\n\`\`\`` : ""}
${propsSection ? `Props by sub-component:\n${propsSection}` : ""}
Path: ${c.href}`;
        })
        .join("\n\n");

    return `You are an AI assistant embedded in a component library documentation site.
You help developers find, understand, and use UI components correctly.

You have access to the following component registry:

${registry}

Guidelines:
- When recommending a component, always include a concise code example
- Use markdown for code blocks (\`\`\`tsx ... \`\`\`)
- Be concise — developers want answers, not essays
- If multiple components could work, list them briefly and explain the tradeoff
- If asked something unrelated to the component library, gently redirect
- Always use the exact component names from the registry
- When explaining props, make it clear which sub-component each prop belongs to`;
}

// ─── Search logic ─────────────────────────────────────────────────────────────

function highlight(text: string, query: string): React.ReactNode {
    if (!query.trim()) return text;
    const regex = new RegExp(
        `(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
        "gi"
    );
    return text.split(regex).map((part, i) =>
        regex.test(part) ? (
            <mark key={i} style={{ background: "rgba(255,190,50,.22)", color: "#fbbe32", borderRadius: 2, padding: "0 1px" }}>
                {part}
            </mark>
        ) : (
            part
        )
    );
}

function scoreEntry(entry: ComponentEntry, q: string): SearchResult | null {
    const l = q.toLowerCase();
    let score = 0;
    const matchedFields: string[] = [];
    if (entry.name.toLowerCase().includes(l)) { score += entry.name.toLowerCase().startsWith(l) ? 100 : 60; matchedFields.push("name"); }
    if (entry.description.toLowerCase().includes(l)) { score += 30; matchedFields.push("description"); }
    if (entry.tags.some((t) => t.toLowerCase().includes(l))) { score += 20; matchedFields.push("tags"); }
    if (entry.codeSnippet?.toLowerCase().includes(l)) { score += 10; matchedFields.push("code"); }
    return score ? { ...entry, score, matchedFields } : null;
}

function runSearch(components: ComponentEntry[], query: string): SearchResult[] {
    if (!query.trim()) return [];
    return components
        .map((c) => scoreEntry(c, query))
        .filter((r): r is SearchResult => r !== null)
        .sort((a, b) => b.score - a.score)
        .slice(0, 7);
}

// ─── API call ───────────────────────────────────────────────────────

async function callGemini(
    messages: { role: string; content: string }[],
    systemPrompt: string,
    onChunk: (text: string) => void
): Promise<void> {
    const response = await fetch("/api/component-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages, systemPrompt }),
    });

    // ── Non-200: surface the real error ──────────────────────────────────────
    if (!response.ok) {
        let errorMessage = `API error ${response.status}`;
        try {
            const body = await response.json();
            if (body.error) errorMessage = body.error;
        } catch {
            errorMessage = await response.text() || errorMessage;
        }
        throw new Error(errorMessage);
    }

    // ── Stream the response ───────────────────────────────────────────────────
    const reader = response.body!.getReader();
    const decoder = new TextDecoder();

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        for (const line of chunk.split("\n")) {
            if (!line.startsWith("data: ")) continue;
            const data = line.slice(6).trim();
            if (!data || data === "[DONE]") continue;
            try {
                const parsed = JSON.parse(data);
                if (parsed.type === "content_block_delta" && parsed.delta?.text) {
                    onChunk(parsed.delta.text);
                }
            } catch {
                // skip malformed chunks
            }
        }
    }
}


// ─── Markdown renderer (minimal) ──────────────────────────────────────────────

function renderMarkdown(text: string): React.ReactNode {
    const lines = text.split("\n");
    const nodes: React.ReactNode[] = [];
    let inCode = false;
    let codeLines: string[] = [];
    let codeLang = "";
    let key = 0;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.startsWith("```")) {
            if (!inCode) {
                inCode = true;
                codeLang = line.slice(3).trim();
                codeLines = [];
            } else {
                nodes.push(
                    <div key={key++} style={{ position: "relative", margin: "10px 0" }}>
                        {codeLang && (
                            <span style={{ position: "absolute", top: 6, right: 10, fontSize: 10, color: "#4f6ef7", fontFamily: "inherit" }}>
                                {codeLang}
                            </span>
                        )}
                        <pre style={{ background: "#080b12", border: "1px solid #1e2132", borderRadius: 8, padding: "12px 14px", fontSize: 12, overflowX: "auto", margin: 0, color: "#a8b1c8", fontFamily: "'JetBrains Mono', ui-monospace, monospace", lineHeight: 1.6 }}>
                            {codeLines.join("\n")}
                        </pre>
                    </div>
                );
                inCode = false;
                codeLines = [];
            }
            continue;
        }
        if (inCode) { codeLines.push(line); continue; }

        if (!line.trim()) { nodes.push(<div key={key++} style={{ height: 8 }} />); continue; }

        // inline code
        const inlined = line.split(/(`[^`]+`)/).map((seg, j) =>
            seg.startsWith("`") && seg.endsWith("`")
                ? <code key={j} className="bg-[#ededed] text-[#147c40] border border-[#d8d8d8] dark:text-[#7ecfb3] dark:bg-[#0a0c13] dark:border-[#1e2132]" style={{ borderRadius: 3, padding: "1px 5px", fontSize: "0.9em", fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}>{seg.slice(1, -1)}</code>
                : seg
        );

        if (line.startsWith("### ")) {
            nodes.push(<p key={key++} className="text-[#40455a] dark:text-[#e2e4ef]" style={{ fontWeight: 600, fontSize: 13, margin: "10px 0 4px" }}>{inlined}</p>);
        } else if (line.startsWith("## ")) {
            nodes.push(<p key={key++} className="text-[#40455a] dark:text-[#e2e4ef]" style={{ fontWeight: 600, fontSize: 14, margin: "12px 0 4px" }}>{inlined}</p>);
        } else if (line.startsWith("- ") || line.startsWith("* ")) {
            nodes.push(<div key={key++} className="text-[#4e536d] dark:text-[#9198b8]" style={{ display: "flex", gap: 6, fontSize: 13, lineHeight: 1.6 }}><span style={{ color: "#4f6ef7", flexShrink: 0 }}>›</span><span>{inlined.slice(1)}</span></div>);
        } else if (/^\d+\./.test(line)) {
            nodes.push(<div key={key++} className="text-[#4e536d] dark:text-[#9198b8]" style={{ display: "flex", gap: 6, fontSize: 13, lineHeight: 1.6 }}><span style={{ color: "#4f6ef7", minWidth: 16, flexShrink: 0 }}>{line.match(/^\d+/)?.[0]}.</span><span>{inlined.slice(1)}</span></div>);
        } else {
            nodes.push(<p key={key++} className="text-[#4e536d] dark:text-[#9198b8]" style={{ fontSize: 13, margin: "2px 0", lineHeight: 1.7 }}>{inlined}</p>);
        }
    }
    return <>{nodes}</>;
}

// ─── Main component ───────────────────────────────────────────────────────────

export function ComponentLibrarySearch({ components, onNavigate }: Props) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SearchResult[]>([]);
    const [dropOpen, setDropOpen] = useState(false);
    const [activeIdx, setActiveIdx] = useState(-1);
    const [chatOpen, setChatOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState("");
    const [streaming, setStreaming] = useState(false);
    const [contextComponent, setContextComponent] = useState<ComponentEntry | null>(null);

    const inputRef = useRef<HTMLInputElement>(null);
    const chatInputRef = useRef<HTMLInputElement>(null);
    const chatEndRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const systemPrompt = buildSystemPrompt(components);

    // Search
    useEffect(() => {
        const r = runSearch(components, query);
        setResults(r);
        setActiveIdx(-1);
        setDropOpen(query.trim().length > 0);
    }, [query, components]);

    // Close dropdown on outside click
    useEffect(() => {
        function h(e: MouseEvent) {
            if (!containerRef.current?.contains(e.target as Node)) setDropOpen(false);
        }
        document.addEventListener("mousedown", h);
        return () => document.removeEventListener("mousedown", h);
    }, []);

    // ⌘K shortcut
    useEffect(() => {
        function h(e: KeyboardEvent) {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                inputRef.current?.focus();
            }
        }
        document.addEventListener("keydown", h);
        return () => document.removeEventListener("keydown", h);
    }, []);

    // Scroll chat to bottom
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, streaming]);

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (!dropOpen) return;
            if (e.key === "ArrowDown") { e.preventDefault(); setActiveIdx(i => Math.min(i + 1, results.length - 1)); }
            else if (e.key === "ArrowUp") { e.preventDefault(); setActiveIdx(i => Math.max(i - 1, -1)); }
            else if (e.key === "Enter" && activeIdx >= 0) { e.preventDefault(); selectResult(results[activeIdx]); }
            else if (e.key === "Escape") { setDropOpen(false); inputRef.current?.blur(); }
        },
        [dropOpen, results, activeIdx]
    );

    function selectResult(entry: ComponentEntry) {
        setQuery("");
        setDropOpen(false);
        if (onNavigate) { onNavigate(entry); return; }
        // Open chat with this component as context
        setContextComponent(entry);
        setInput("");
        setChatOpen(true);
        if (messages.length <= 1) {
            setMessages([{
                role: "assistant",
                content: `I've loaded **${entry.name}** as context. Ask me anything about it — usage, props, examples, or when to use it.`,
                component: entry,
            }]);
        }
        setTimeout(() => chatInputRef.current?.focus(), 100);
    }

    async function sendMessage() {
        const text = input.trim();
        if (!text || streaming) return;
        setInput("");

        const userMsg: ChatMessage = { role: "user", content: text };
        const newMessages = [...messages, userMsg];
        setMessages(newMessages);
        setStreaming(true);

        // Build context prefix if a component is selected
        const contextPrefix = contextComponent
            ? `[Context: User is looking at the ${contextComponent.name} component]\n\n`
            : "";

        const apiMessages = newMessages.map(m => ({
            role: m.role,
            content: m.role === "user" && m === userMsg ? contextPrefix + m.content : m.content,
        }));

        let assistantText = "";
        setMessages(prev => [...prev, { role: "assistant", content: "" }]);

        try {
            await callGemini(apiMessages, systemPrompt, (chunk) => {
                assistantText += chunk;
                setMessages(prev => {
                    const updated = [...prev];
                    updated[updated.length - 1] = { role: "assistant", content: assistantText };
                    return updated;
                });
            });
        } catch (err) {
            // setMessages(prev => {
            //     const updated = [...prev];
            //     updated[updated.length - 1] = { role: "assistant", content: "Sorry, something went wrong. Please try again." };
            //     return updated;
            // });
            const message = err instanceof Error ? err.message : "Something went wrong.";
            setMessages(prev => {
                const updated = [...prev];
                updated[updated.length - 1] = { role: "assistant", content: `**Error:** ${message}` };
                return updated;
            });
        } finally {
            setStreaming(false);
        }
    }

    function explainComponent(entry: ComponentEntry) {
        setQuery("");
        setDropOpen(false);
        setContextComponent(entry);
        setChatOpen(true);
        setInput(`Explain the ${entry.name} component and show me a practical usage example.`);
        if (messages.length <= 1) setMessages([]);
        setTimeout(() => chatInputRef.current?.focus(), 100);
    }

    const noResults = query.trim().length > 0 && results.length === 0;

    return (
        <>
            <style>{CSS}</style>
            <div className="font-['JetBrains_Mono','Fira_Code',ui-monospace,monospace] ml-auto">
                {/* ── Search bar ── */}
                <div className="relative w-full max-w-170" ref={containerRef}>
                    <div className="flex items-center gap-2 bg-white dark:bg-zinc-900 border border-violet-700/15 rounded-lg pl-2.5 pr-0.75 transition-[border-color,box-shadow] duration-150 focus-within:border-violet-500 focus-within:shadow-[0_0_0_3px_rgba(79,110,247,.15)]">
                        <SearchCode size={16} className="stroke-slate-400 dark:stroke-[#ab98d730]" />
                        <input
                            ref={inputRef}
                            className="flex-1 bg-transparent min-w-52 border-none outline-none text-sm text-slate-800 dark:text-slate-200 py-1.5 caret-violet-500 placeholder:text-slate-400 dark:placeholder:text-violet-300/15"
                            type="text"
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            onFocus={() => {
                                setChatOpen(false);
                                if (query) setDropOpen(true);
                            }}
                            onKeyDown={handleKeyDown}
                            placeholder="Search components… (⌘ K)"
                            autoComplete="off"
                            spellCheck={false}
                        />
                        {query && (
                            <button className="absolute right-21 bg-none border-none text-slate-500 dark:text-[#4a4f6a] text-xl cursor-pointer outline-none hover:text-slate-600 dark:hover:text-[#8b90aa]" onClick={() => { setQuery(""); inputRef.current?.focus(); }}>×</button>
                        )}
                        <button
                            className={`flex items-center gap-1.25 border rounded-[7px] text-violet-500 text-xs whitespace-nowrap px-1.5 py-1 ml-5 cursor-pointer transition-all duration-150 hover:bg-violet-600/15 dark:hover:bg-violet-800/15 hover:border-violet-400/80 dark:hover:border-violet-500 ${chatOpen ? "bg-violet-600/15 dark:bg-violet-800/20 border-violet-400/80 dark:border-violet-500" : "bg-violet-800/5 border-violet-600/15"}`}
                            onClick={() => { setDropOpen(false); setChatOpen(o => !o); setQuery(""); setTimeout(() => chatInputRef.current?.focus(), 100); }}
                            title="AI assistant"
                        >
                            <SparkleIcon />
                            <span>Ask AI</span>
                        </button>
                    </div>

                    {/* ── Dropdown ── */}
                    {dropOpen && (
                        <div className="absolute top-[calc(100%+6px)] left-0 right-0 bg-zinc-50 dark:bg-zinc-900 border border-violet-700/15 rounded-[14px] overflow-hidden overscroll-contain z-999 shadow-[0_20px_50px_rgba(0,0,0,.6)] animate-[clsFadeIn_.12s_ease]">
                            {noResults ? (
                                <div className="flex flex-col items-center gap-3 text-center text-xs text-[#3a3f57] font-[-apple-system,sans-serif] px-4 py-5">
                                    No results for <strong className="text-[#555d80] w-full text-ellipsis overflow-hidden">"{query}"</strong>
                                    <button className="flex items-center gap-1.5 bg-violet-800/12 border border-violet-800/25 rounded-md text-violet-500 text-xs whitespace-nowrap w-full px-3.5 py-2 cursor-pointer transition-all duration-150 hover:bg-violet-800/22" onClick={() => {
                                        setQuery(""); setDropOpen(false);
                                        setChatOpen(true);
                                        setInput(`How do I ${query}?`);
                                        setTimeout(() => chatInputRef.current?.focus(), 100);
                                    }}>
                                        <SparkleIcon /> 
                                        Ask AI about 
                                        <span className="text-ellipsis overflow-hidden">{query}</span>
                                    </button>
                                </div>
                            ) : (
                                <ul className="p-1.5 max-h-95 overflow-y-auto">
                                    {results.map((r, i) => (
                                        <li
                                            key={r.id}
                                            className={`px-3 p-2.5 rounded-[9px] cursor-pointer transition-[background] duration-100 hover:bg-violet-400/15 dark:hover:bg-violet-900/10 ${i === activeIdx ? "bg-violet-400/15 dark:bg-violet-900/10" : ""}`}
                                            onMouseEnter={() => setActiveIdx(i)}
                                            onMouseDown={e => { e.preventDefault(); selectResult(r); }}
                                        >
                                            <div className="flex items-center justify-between gap-2 mb-0.75">
                                                <span className="text-[13px] font-semibold text-slate-700 dark:text-slate-200">{highlight(r.name, query)}</span>
                                                <span className="text-[10px] text-violet-500 bg-violet-600/10 border border-violet-600/18 rounded-[4px] px-1.75 py-0.5">{r.category}</span>
                                            </div>
                                            <p className="text-[11px] text-[#555d80] mb-1.5 font-[-apple-system,sans-serif]">{highlight(r.description, query)}</p>
                                            <div className="flex items-center justify-between gap-2">
                                                <div className="flex flex-wrap gap-0.75">
                                                    {r.tags.slice(0, 4).map(t => (
                                                        <span key={t} className="text-[10px] text-emerald-600 dark:text-[#3fcf8e] bg-[rgba(63,207,142,.12)] dark:bg-[rgba(63,207,142,.08)] border border-[rgba(63,207,142,.18)] dark:border-[rgba(63,207,142,.15)] rounded-[3px] px-1.25 py-px">{highlight(t, query)}</span>
                                                    ))}
                                                </div>
                                                <button
                                                    className="flex items-center gap-1 shrink-0 bg-violet-600/10 border border-violet-600/20 rounded-[5px] text-violet-500 text-[10px] whitespace-nowrap px-2 py-0.75 transition-all duration-100 cursor-pointer hover:bg-violet-600/20"
                                                    onMouseDown={e => { e.stopPropagation(); e.preventDefault(); explainComponent(r); }}
                                                >
                                                    <SparkleIcon /> Explain
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                            <div className="flex gap-4 px-3.5 py-1.75 text-[10px] text-slate-400 dark:text-[#3e3b42] border-t border-t-violet-800/7 dark:border-t-violet-800/15">
                                <span>↑↓ navigate</span><span>↵ open</span><span>esc close</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* ── Chat panel ── */}
                {chatOpen && (
                    <div className={`absolute top-10 flex flex-col bg-zinc-50 dark:bg-zinc-900 border border-violet-700/15 rounded-[16px] h-130 mt-2.5 overflow-hidden overscroll-contain animate-[clsFadeIn_.15s_ease] ${messages.length <=1 ? "max-w-87" : "right-5 max-w-[95vw]"}`}>
                        {/* Chat header */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-b-violet-800/15">
                            <div className="flex items-center gap-2 text-[13px] font-semibold text-slate-600 dark:text-slate-200">
                                <SparkleIcon />
                                <span>Component AI</span>
                                {contextComponent && (
                                    <span className="flex items-center gap-1.25 bg-violet-800/8 dark:bg-violet-800/12 border border-violet-600/20 rounded-2xl text-violet-500 text-[11px] px-2 py-0.75">
                                        <span className="leading-none">{contextComponent.name}</span>
                                        {/* <button className="text-violet-500 text-sm leading-none pl-0.5 cursor-pointer" onClick={() => setContextComponent(null)}>×</button> */}
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center gap-2">
                                {messages.length > 0 && (
                                    <button className="border border-violet-700/15 rounded-[6px] text-[#566087] dark:text-[#3a3f57] text-[11px] px-2.5 py-1 cursor-pointer transition-all duration-100 hover:border-violet-700/25 dark:hover:border-violet-600/15 hover:text-[#2d3144] dark:hover:text-[#555d80]" onClick={() => { setMessages([]); setContextComponent(null) }}>
                                        Clear
                                    </button>
                                )}
                                <button className="text-[#566087] dark:text-[#3a3f57] text-xl leading-none px-0.5 cursor-pointer transition-colors duration-100 hover:text-[#3f445a] dark:hover:text-[#8b90aa]" onClick={() => setChatOpen(false)}>×</button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex flex-1 flex-col gap-4 p-4 overflow-y-auto">
                            {messages.length === 0 && (
                                <div className="text-center py-5">
                                    <div className="text-[28px] text-violet-500 mb-2.5"><SparkleIcon /></div>
                                    <p className="text-[13px] text-[#555d80] mb-4 font-[-apple-system,sans-serif]">Ask me anything about your component library.</p>
                                    <div className="flex flex-col items-stretch gap-1.5">
                                        {[
                                            "What component should I use for a confirmation dialog?",
                                            "Show me how to use Button with a loading state",
                                            "What's the difference between Toast and Modal?",
                                            "How do I build a form with validation?",
                                        ].map(s => (
                                            <button key={s} className="bg-zinc-100 dark:bg-[#160f20] border border-violet-700/15 rounded-[8px] text-xs text-left text-[#555d80] font-[-apple-system,sans-serif] cursor-pointer px-3.5 py-2.25 transition-all duration-[.12s] hover:bg-violet-800/5 dark:hover:bg-violet-800/10 hover:border-violet-600/15 hover:text-[#3f445a] dark:hover:text-[#8b90aa]" onClick={() => { setInput(s); chatInputRef.current?.focus(); }}>
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {messages.map((msg, i) => (
                                <div key={i} data-role={msg.role} className={`group flex gap-2.5 animate-[clsFadeIn_.15s_ease] data-[role=user]:flex-row-reverse`}>
                                    {msg.role === "assistant" && (
                                        <div className="flex items-center justify-center shrink-0 size-7 rounded-[8px] bg-violet-600/15 dark:bg-violet-800/20 border border-violet-600/20 text-violet-500"><SparkleIcon /></div>
                                    )}
                                    <div className="group-data-[role=assistant]:flex-1 group-data-[role=user]:bg-violet-800/80 dark:group-data-[role=user]:bg-violet-800/20 group-data-[role=user]:border group-data-[role=user]:border-violet-800/30 group-data-[role=user]:rounded-[12px] group-data-[role=user]:rounded-br-[2px] group-data-[role=user]:px-3.5 group-data-[role=user]:py-2.5 group-data-[role=user]:max-w-4/5 min-w-0">
                                        {msg.role === "assistant"
                                            ? renderMarkdown(msg.content)
                                            : <p style={{ fontSize: 13, color: "#e2e4ef", margin: 0 }}>{msg.content}</p>
                                        }
                                        {streaming && i === messages.length - 1 && msg.role === "assistant" && !msg.content && (
                                            <span className="inline-block align-middle w-0.5 h-3.5 bg-violet-500 rounded-[1px] mt-1 animate-[clsBlink_1s_ease_infinite]" />
                                        )}
                                    </div>
                                </div>
                            ))}
                            <div ref={chatEndRef} />
                        </div>

                        {/* Chat input */}
                        <div className="flex gap-2 px-3.5 py-3 border-t border-t-violet-800/7 dark:border-t-violet-800/15">
                            <input
                                ref={chatInputRef}
                                className="flex-1 bg-zinc-50 dark:bg-zinc-900 border border-violet-400/30 dark:border-violet-700/30 rounded-[9px] text-slate-600 dark:text-slate-200 text-[13px] px-3.5 py-2 outline-none transition-colors duration-150 focus:border-violet-500 placeholder:text-slate-400 dark:placeholder:text-violet-300/15 disabled:opacity-50"
                                type="text"
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                                placeholder="Ask about any component…"
                                disabled={streaming}
                            />
                            <button
                                className={`flex items-center justify-center shrink-0 size-9 bg-violet-800 rounded-[9px] text-white cursor-pointer transition-all duration-150 hover:not-disabled:bg-violet-700 disabled:opacity-60 disabled:cursor-default ${streaming ? "bg-violet-800/5 border border-violet-700/30 text-violet-500" : ""}`}
                                onClick={sendMessage}
                                disabled={streaming || !input.trim()}
                            >
                                {streaming ? <LoadingDots /> : <Send size={14} />}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function SparkleIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" className="shrink-0">
            <path d="M8 1 L9 6.5 L14.5 8 L9 9.5 L8 15 L7 9.5 L1.5 8 L7 6.5 Z" />
        </svg>
    );
}

function LoadingDots() {
    return (
        <span style={{ display: "flex", gap: 3, alignItems: "center" }}>
            {[0, 1, 2].map(i => (
                <span key={i} style={{ width: 4, height: 4, borderRadius: "50%", background: "currentColor", animation: `clsDot 1.2s ease-in-out ${i * 0.2}s infinite` }} />
            ))}
        </span>
    );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const CSS = `
@keyframes clsDot { 0%,80%,100%{opacity:.2} 40%{opacity:1} }
@keyframes clsFadeIn { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
@keyframes clsBlink { 0%,100%{opacity:1} 50%{opacity:0} }

/* Dropdown */
// .cls-list::-webkit-scrollbar { width:3px; }
// .cls-list::-webkit-scrollbar-thumb { background:#1e2236; border-radius:2px; }

/* Chat panel */
// .cls-messages::-webkit-scrollbar { width:3px; }
// .cls-messages::-webkit-scrollbar-thumb { background:#1e2236; border-radius:2px; }
`;