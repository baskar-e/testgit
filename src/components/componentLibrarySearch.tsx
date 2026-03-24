"use client";

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
- Always use the exact component names from the registry`;
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

// ─── Anthropic API call ───────────────────────────────────────────────────────

// async function callGemini(
//     messages: { role: string; content: string }[],
//     systemPrompt: string,
//     onChunk: (text: string) => void
// ): Promise<void> {
//     const response = await fetch("/api/component-ai", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ messages: messages, systemPrompt }),
//   });

//     if (!response.ok) throw new Error(`API error: ${response.status}`);

//     const reader = response.body!.getReader();
//     const decoder = new TextDecoder();

//     while (true) {
//         const { done, value } = await reader.read();
//         if (done) break;
//         const chunk = decoder.decode(value);
//         for (const line of chunk.split("\n")) {
//             if (line.startsWith("data: ")) {
//                 const data = line.slice(6);
//                 if (data === "[DONE]") return;
//                 try {
//                     const parsed = JSON.parse(data);
//                     if (parsed.type === "content_block_delta" && parsed.delta?.text) {
//                         onChunk(parsed.delta.text);
//                     }
//                 } catch { }
//             }
//         }
//     }
// }


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
                ? <code key={j} style={{ background: "#0a0c13", border: "1px solid #1e2132", borderRadius: 3, padding: "1px 5px", fontSize: "0.9em", color: "#7ecfb3", fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}>{seg.slice(1, -1)}</code>
                : seg
        );

        if (line.startsWith("### ")) {
            nodes.push(<p key={key++} style={{ fontWeight: 600, fontSize: 13, color: "#e2e4ef", margin: "10px 0 4px" }}>{inlined}</p>);
        } else if (line.startsWith("## ")) {
            nodes.push(<p key={key++} style={{ fontWeight: 600, fontSize: 14, color: "#e2e4ef", margin: "12px 0 4px" }}>{inlined}</p>);
        } else if (line.startsWith("- ") || line.startsWith("* ")) {
            nodes.push(<div key={key++} style={{ display: "flex", gap: 6, fontSize: 13, color: "#9198b8", lineHeight: 1.6 }}><span style={{ color: "#4f6ef7", flexShrink: 0 }}>›</span><span>{inlined.slice(1)}</span></div>);
        } else if (/^\d+\./.test(line)) {
            nodes.push(<div key={key++} style={{ display: "flex", gap: 6, fontSize: 13, color: "#9198b8", lineHeight: 1.6 }}><span style={{ color: "#4f6ef7", minWidth: 16, flexShrink: 0 }}>{line.match(/^\d+/)?.[0]}.</span><span>{inlined.slice(1)}</span></div>);
        } else {
            nodes.push(<p key={key++} style={{ fontSize: 13, color: "#9198b8", margin: "2px 0", lineHeight: 1.7 }}>{inlined}</p>);
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
        setChatOpen(true);
        if (messages.length === 0) {
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
        setContextComponent(entry);
        setChatOpen(true);
        setInput(`Explain the ${entry.name} component and show me a practical usage example.`);
        setTimeout(() => chatInputRef.current?.focus(), 100);
    }

    const noResults = query.trim().length > 0 && results.length === 0;

    return (
        <>
            <style>{CSS}</style>
            <div className="cls-root absolute top-0">
                {/* ── Search bar ── */}
                <div className="cls-search-wrap" ref={containerRef}>
                    <div className="cls-input-wrap">
                        <SearchIcon />
                        <input
                            ref={inputRef}
                            className="cls-input"
                            type="text"
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            onFocus={() => query && setDropOpen(true)}
                            onKeyDown={handleKeyDown}
                            placeholder="Search components… (⌘K)"
                            autoComplete="off"
                            spellCheck={false}
                        />
                        {query && (
                            <button className="cls-clear" onClick={() => { setQuery(""); inputRef.current?.focus(); }}>×</button>
                        )}
                        <button
                            className={`cls-ai-toggle${chatOpen ? " active" : ""}`}
                            onClick={() => { setChatOpen(o => !o); setTimeout(() => chatInputRef.current?.focus(), 100); }}
                            title="AI assistant"
                        >
                            <SparkleIcon />
                            <span>Ask AI</span>
                        </button>
                    </div>

                    {/* ── Dropdown ── */}
                    {dropOpen && (
                        <div className="cls-dropdown">
                            {noResults ? (
                                <div className="cls-empty">
                                    No results for <strong>"{query}"</strong>
                                    <button className="cls-ask-btn" onClick={() => {
                                        setQuery(""); setDropOpen(false);
                                        setChatOpen(true);
                                        setInput(`How do I ${query}?`);
                                        setTimeout(() => chatInputRef.current?.focus(), 100);
                                    }}>
                                        <SparkleIcon /> Ask AI about "{query}"
                                    </button>
                                </div>
                            ) : (
                                <ul className="cls-list">
                                    {results.map((r, i) => (
                                        <li
                                            key={r.id}
                                            className={`cls-item${i === activeIdx ? " active" : ""}`}
                                            onMouseEnter={() => setActiveIdx(i)}
                                            onMouseDown={e => { e.preventDefault(); selectResult(r); }}
                                        >
                                            <div className="cls-item-head">
                                                <span className="cls-item-name">{highlight(r.name, query)}</span>
                                                <span className="cls-item-cat">{r.category}</span>
                                            </div>
                                            <p className="cls-item-desc">{highlight(r.description, query)}</p>
                                            <div className="cls-item-foot">
                                                <div className="cls-tags">
                                                    {r.tags.slice(0, 4).map(t => (
                                                        <span key={t} className="cls-tag">{highlight(t, query)}</span>
                                                    ))}
                                                </div>
                                                <button
                                                    className="cls-explain-btn"
                                                    onMouseDown={e => { e.stopPropagation(); e.preventDefault(); explainComponent(r); }}
                                                >
                                                    <SparkleIcon /> Explain
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                            <div className="cls-drop-footer">
                                <span>↑↓ navigate</span><span>↵ open</span><span>esc close</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* ── Chat panel ── */}
                {chatOpen && (
                    <div className="cls-chat">
                        {/* Chat header */}
                        <div className="cls-chat-header">
                            <div className="cls-chat-title">
                                <SparkleIcon />
                                <span>Component AI</span>
                                {contextComponent && (
                                    <span className="cls-ctx-pill">
                                        {contextComponent.name}
                                        <button onClick={() => setContextComponent(null)}>×</button>
                                    </span>
                                )}
                            </div>
                            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                                {messages.length > 0 && (
                                    <button className="cls-chat-action" onClick={() => setMessages([])}>
                                        Clear
                                    </button>
                                )}
                                <button className="cls-chat-close" onClick={() => setChatOpen(false)}>×</button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="cls-messages">
                            {messages.length === 0 && (
                                <div className="cls-welcome">
                                    <div className="cls-welcome-icon"><SparkleIcon /></div>
                                    <p>Ask me anything about your component library.</p>
                                    <div className="cls-suggestions">
                                        {[
                                            "What component should I use for a confirmation dialog?",
                                            "Show me how to use Button with a loading state",
                                            "What's the difference between Toast and Modal?",
                                            "How do I build a form with validation?",
                                        ].map(s => (
                                            <button key={s} className="cls-suggestion" onClick={() => { setInput(s); chatInputRef.current?.focus(); }}>
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {messages.map((msg, i) => (
                                <div key={i} className={`cls-msg cls-msg--${msg.role}`}>
                                    {msg.role === "assistant" && (
                                        <div className="cls-msg-avatar"><SparkleIcon /></div>
                                    )}
                                    <div className="cls-msg-body">
                                        {msg.role === "assistant"
                                            ? renderMarkdown(msg.content)
                                            : <p style={{ fontSize: 13, color: "#e2e4ef", margin: 0 }}>{msg.content}</p>
                                        }
                                        {streaming && i === messages.length - 1 && msg.role === "assistant" && !msg.content && (
                                            <span className="cls-cursor" />
                                        )}
                                    </div>
                                </div>
                            ))}
                            <div ref={chatEndRef} />
                        </div>

                        {/* Chat input */}
                        <div className="cls-chat-input-wrap">
                            <input
                                ref={chatInputRef}
                                className="cls-chat-input"
                                type="text"
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                                placeholder="Ask about any component…"
                                disabled={streaming}
                            />
                            <button
                                className={`cls-send${streaming ? " loading" : ""}`}
                                onClick={sendMessage}
                                disabled={streaming || !input.trim()}
                            >
                                {streaming ? <LoadingDots /> : <SendIcon />}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function SearchIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ color: "#4a4f6a", flexShrink: 0 }}>
            <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M10 10.5L13.5 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

function SparkleIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 1 L9 6.5 L14.5 8 L9 9.5 L8 15 L7 9.5 L1.5 8 L7 6.5 Z" />
        </svg>
    );
}

function SendIcon() {
    return (
        <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
            <path d="M2 8L14 2L8 14L7 9L2 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
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

.cls-root { font-family:'JetBrains Mono','Fira Code',ui-monospace,monospace; }

/* Search bar */
.cls-search-wrap { position:relative; width:100%; max-width:600px; }
.cls-input-wrap { display:flex; align-items:center; gap:8px; background:#0c0e18; border:1px solid #1e2236; border-radius:12px; padding:0 10px 0 14px; transition:border-color .15s,box-shadow .15s; }
.cls-input-wrap:focus-within { border-color:#4f6ef7; box-shadow:0 0 0 3px rgba(79,110,247,.15); }
.cls-input { flex:1; background:transparent; border:none; outline:none; font-family:inherit; font-size:14px; color:#d8daf0; padding:11px 0; caret-color:#4f6ef7; }
.cls-input::placeholder { color:#2e3352; }
.cls-clear { background:none; border:none; color:#4a4f6a; cursor:pointer; font-size:20px; line-height:1; padding:0 4px; }
.cls-clear:hover { color:#8b90aa; }

.cls-ai-toggle { display:flex; align-items:center; gap:5px; background:#131625; border:1px solid #2a2d3a; border-radius:7px; color:#4f6ef7; cursor:pointer; font-family:inherit; font-size:12px; padding:5px 10px; transition:all .15s; white-space:nowrap; }
.cls-ai-toggle:hover { background:#1a1e36; border-color:#4f6ef7; }
.cls-ai-toggle.active { background:rgba(79,110,247,.15); border-color:#4f6ef7; }

/* Dropdown */
.cls-dropdown { position:absolute; top:calc(100% + 6px); left:0; right:0; background:#0c0e18; border:1px solid #1e2236; border-radius:14px; overflow:hidden; z-index:9999; box-shadow:0 20px 50px rgba(0,0,0,.6); animation:clsFadeIn .12s ease; }
.cls-list { list-style:none; margin:0; padding:6px; max-height:380px; overflow-y:auto; }
.cls-list::-webkit-scrollbar { width:3px; }
.cls-list::-webkit-scrollbar-thumb { background:#1e2236; border-radius:2px; }
.cls-item { padding:10px 12px; border-radius:9px; cursor:pointer; transition:background .1s; }
.cls-item:hover,.cls-item.active { background:#111428; }
.cls-item-head { display:flex; align-items:center; justify-content:space-between; gap:8px; margin-bottom:3px; }
.cls-item-name { font-size:13px; font-weight:600; color:#d8daf0; }
.cls-item-cat { font-size:10px; color:#4f6ef7; background:rgba(79,110,247,.1); border:1px solid rgba(79,110,247,.18); border-radius:4px; padding:2px 7px; }
.cls-item-desc { font-size:11px; color:#555d80; margin:0 0 6px; line-height:1.5; font-family:-apple-system,sans-serif; }
.cls-item-foot { display:flex; align-items:center; justify-content:space-between; gap:8px; }
.cls-tags { display:flex; flex-wrap:wrap; gap:3px; }
.cls-tag { font-size:10px; color:#3fcf8e; background:rgba(63,207,142,.08); border:1px solid rgba(63,207,142,.15); border-radius:3px; padding:1px 5px; font-family:inherit; }
.cls-explain-btn { display:flex; align-items:center; gap:4px; background:rgba(79,110,247,.1); border:1px solid rgba(79,110,247,.2); border-radius:5px; color:#4f6ef7; cursor:pointer; font-family:inherit; font-size:10px; padding:3px 8px; transition:all .1s; white-space:nowrap; flex-shrink:0; }
.cls-explain-btn:hover { background:rgba(79,110,247,.2); }
.cls-empty { padding:20px 16px; text-align:center; font-size:12px; color:#3a3f57; font-family:-apple-system,sans-serif; display:flex; flex-direction:column; align-items:center; gap:12px; }
.cls-empty strong { color:#555d80; }
.cls-ask-btn { display:flex; align-items:center; gap:6px; background:rgba(79,110,247,.12); border:1px solid rgba(79,110,247,.25); border-radius:8px; color:#4f6ef7; cursor:pointer; font-family:inherit; font-size:12px; padding:8px 14px; transition:all .15s; }
.cls-ask-btn:hover { background:rgba(79,110,247,.22); }
.cls-drop-footer { display:flex; gap:16px; padding:7px 14px; border-top:1px solid #131625; font-size:10px; color:#222538; }

/* Chat panel */
.cls-chat { background:#0c0e18; border:1px solid #1e2236; border-radius:16px; overflow:hidden; margin-top:10px; display:flex; flex-direction:column; height:520px; animation:clsFadeIn .15s ease; }
.cls-chat-header { display:flex; align-items:center; justify-content:space-between; padding:12px 16px; border-bottom:1px solid #131625; }
.cls-chat-title { display:flex; align-items:center; gap:8px; font-size:13px; font-weight:600; color:#d8daf0; }
.cls-ctx-pill { display:flex; align-items:center; gap:5px; background:rgba(79,110,247,.12); border:1px solid rgba(79,110,247,.2); border-radius:20px; color:#4f6ef7; font-size:11px; padding:2px 8px; }
.cls-ctx-pill button { background:none; border:none; color:#4f6ef7; cursor:pointer; font-size:14px; line-height:1; padding:0 0 0 2px; }
.cls-chat-action { background:none; border:1px solid #1e2236; border-radius:6px; color:#3a3f57; cursor:pointer; font-family:inherit; font-size:11px; padding:4px 10px; transition:all .1s; }
.cls-chat-action:hover { border-color:#2a2d3a; color:#555d80; }
.cls-chat-close { background:none; border:none; color:#3a3f57; cursor:pointer; font-size:20px; line-height:1; padding:0 2px; transition:color .1s; }
.cls-chat-close:hover { color:#8b90aa; }
.cls-messages { flex:1; overflow-y:auto; padding:16px; display:flex; flex-direction:column; gap:16px; }
.cls-messages::-webkit-scrollbar { width:3px; }
.cls-messages::-webkit-scrollbar-thumb { background:#1e2236; border-radius:2px; }

/* Welcome */
.cls-welcome { text-align:center; padding:20px 0; }
.cls-welcome-icon { font-size:28px; color:#4f6ef7; margin-bottom:10px; }
.cls-welcome p { font-size:13px; color:#555d80; margin-bottom:16px; font-family:-apple-system,sans-serif; }
.cls-suggestions { display:flex; flex-direction:column; gap:6px; align-items:stretch; }
.cls-suggestion { background:#0f1220; border:1px solid #1e2236; border-radius:8px; color:#555d80; cursor:pointer; font-family:-apple-system,sans-serif; font-size:12px; padding:9px 14px; text-align:left; transition:all .12s; }
.cls-suggestion:hover { border-color:#2a2d3a; color:#8b90aa; background:#131625; }

/* Messages */
.cls-msg { display:flex; gap:10px; animation:clsFadeIn .15s ease; }
.cls-msg--user { flex-direction:row-reverse; }
.cls-msg--user .cls-msg-body { background:#131d3d; border:1px solid #1e2d56; border-radius:12px 12px 2px 12px; padding:10px 14px; max-width:80%; }
.cls-msg--assistant .cls-msg-body { flex:1; }
.cls-msg-avatar { width:28px; height:28px; border-radius:8px; background:rgba(79,110,247,.15); border:1px solid rgba(79,110,247,.2); color:#4f6ef7; display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-top:2px; }
.cls-cursor { display:inline-block; width:2px; height:14px; background:#4f6ef7; border-radius:1px; animation:clsBlink 1s ease infinite; vertical-align:middle; }

/* Chat input */
.cls-chat-input-wrap { display:flex; gap:8px; padding:12px 14px; border-top:1px solid #131625; }
.cls-chat-input { flex:1; background:#0f1220; border:1px solid #1e2236; border-radius:9px; color:#d8daf0; font-family:inherit; font-size:13px; outline:none; padding:10px 14px; transition:border-color .15s; }
.cls-chat-input:focus { border-color:#4f6ef7; }
.cls-chat-input::placeholder { color:#2e3352; }
.cls-chat-input:disabled { opacity:.5; }
.cls-send { align-items:center; background:#4f6ef7; border:none; border-radius:9px; color:white; cursor:pointer; display:flex; height:40px; justify-content:center; transition:all .15s; width:40px; flex-shrink:0; }
.cls-send:hover:not(:disabled) { background:#6381f9; }
.cls-send:disabled { opacity:.4; cursor:default; }
.cls-send.loading { background:#131625; border:1px solid #1e2236; color:#4f6ef7; }
`;