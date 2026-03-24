import { NextRequest } from "next/server";

// Remove edge runtime — use Node for easier debugging first
// export const runtime = "edge";

export async function POST(req: NextRequest) {
  // ── 1. Check API key exists ──────────────────────────────────────────────
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("[component-ai] GEMINI_API_KEY is not set in .env.local");
    return new Response(
      JSON.stringify({ error: "GEMINI_API_KEY is missing. Add it to .env.local and restart the server." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  // ── 2. Parse request body ────────────────────────────────────────────────
  let messages: { role: string; content: string }[];
  let systemPrompt: string;

  try {
    const body = await req.json();
    messages = body.messages;
    systemPrompt = body.systemPrompt;
  } catch (e) {
    console.error("[component-ai] Failed to parse request body:", e);
    return new Response(
      JSON.stringify({ error: "Invalid request body" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // ── 3. Convert message format ────────────────────────────────────────────
  // Gemini requires: roles must be "user" or "model" (not "assistant")
  // Gemini also requires messages to alternate user/model — merge consecutive same-role messages
  const rawMessages = messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  // Ensure conversation starts with a user message (Gemini requirement)
  const geminiMessages = rawMessages.filter((_, i) => {
    if (i === 0 && rawMessages[0].role === "model") return false;
    return true;
  });

  // ── 4. Call Gemini API ───────────────────────────────────────────────────
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:streamGenerateContent?alt=sse&key=${apiKey}`;

  let geminiResponse: Response;
  try {
    geminiResponse = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: systemPrompt }],
        },
        contents: geminiMessages,
        generationConfig: {
          maxOutputTokens: 1000,
          temperature: 0.7,
        },
        safetySettings: [
          { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
          { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
          { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
          { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
        ],
      }),
    });
  } catch (e) {
    console.error("[component-ai] Network error calling Gemini:", e);
    return new Response(
      JSON.stringify({ error: "Failed to reach Gemini API. Check your internet connection." }),
      { status: 502, headers: { "Content-Type": "application/json" } }
    );
  }

  // ── 5. Handle non-200 from Gemini ────────────────────────────────────────
  if (!geminiResponse.ok) {
    const errorText = await geminiResponse.text();
    console.error(`[component-ai] Gemini returned ${geminiResponse.status}:`, errorText);

    let friendlyError = `Gemini API error (${geminiResponse.status})`;
    try {
      const parsed = JSON.parse(errorText);
      const msg = parsed?.error?.message;
      if (msg) friendlyError = msg;
    } catch {}

    return new Response(
      JSON.stringify({ error: friendlyError }),
      { status: geminiResponse.status, headers: { "Content-Type": "application/json" } }
    );
  }

  // ── 6. Stream response back to client ────────────────────────────────────
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const reader = geminiResponse.body!.getReader();
      const decoder = new TextDecoder();

      try {
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
              const text = parsed.candidates?.[0]?.content?.parts?.[0]?.text;
              if (text) {
                // Emit in the format ComponentLibrarySearch.tsx expects
                const event = JSON.stringify({
                  type: "content_block_delta",
                  delta: { text },
                });
                controller.enqueue(encoder.encode(`data: ${event}\n\n`));
              }
            } catch {
              // skip unparseable chunks — normal at stream boundaries
            }
          }
        }
      } catch (e) {
        console.error("[component-ai] Stream read error:", e);
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "X-Accel-Buffering": "no",
    },
  });
}