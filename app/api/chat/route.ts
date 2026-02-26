export async function POST(request: Request) {
  try {
    const { document: docText, messages } = await request.json();

    if (!docText || !messages || !Array.isArray(messages)) {
      return new Response("Invalid request", { status: 400 });
    }

    // Build system prompt with document context
    const systemPrompt = `You are DocIQ — a document intelligence assistant. Your job is to answer questions about the document provided by the user.

## Document Content:
<document>
${docText.slice(0, 100000)} ${docText.length > 100000 ? "\n\n[Document truncated at 100,000 characters]" : ""}
</document>

## Instructions:
- Answer questions ONLY based on the document above
- Always quote specific text from the document when relevant (use "..." for exact quotes)
- Cite location when possible: "In the [section/paragraph]..." or "According to the document..."
- If the document doesn't contain the answer, say so clearly — don't speculate
- Be concise but complete — the goal is accurate information retrieval, not long essays
- For lists or comparisons, use bullet points for clarity
- If a question is ambiguous, ask for clarification before answering`;

    const formattedMessages = messages.map(
      (m: { role: string; content: string }) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })
    );

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY!,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5",
        max_tokens: 1500,
        stream: true,
        system: systemPrompt,
        messages: formattedMessages,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Anthropic API error:", error);
      return new Response("Anthropic API error", { status: 500 });
    }

    const readable = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        const reader = response.body!.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              if (line.startsWith("data: ")) {
                const data = line.slice(6).trim();
                if (data === "[DONE]") continue;
                try {
                  const parsed = JSON.parse(data);
                  if (
                    parsed.type === "content_block_delta" &&
                    parsed.delta?.type === "text_delta"
                  ) {
                    controller.enqueue(encoder.encode(parsed.delta.text));
                  }
                } catch {}
              }
            }
          }
        } catch (err) {
          controller.error(err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
        "Cache-Control": "no-cache",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
