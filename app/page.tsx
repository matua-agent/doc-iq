"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { SAMPLE_DOCS, type SampleDoc } from "@/lib/sample-docs";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const STARTER_QUESTIONS = [
  "What are the key terms and conditions?",
  "Summarize this document in 3 bullet points",
  "What are the main obligations and deadlines?",
  "Are there any risks or red flags I should know about?",
  "What happens if either party breaches this agreement?",
];

export default function Home() {
  const [docText, setDocText] = useState("");
  const [docName, setDocName] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [chatStarted, setChatStarted] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const chatInputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const wordCount = docText
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  const charCount = docText.length;

  const loadSample = (sample: SampleDoc) => {
    setDocText(sample.content);
    setDocName(sample.title);
    setMessages([]);
    setChatStarted(false);
  };

  const sendMessage = useCallback(
    async (userText: string) => {
      if (!userText.trim() || !docText.trim() || isStreaming) return;

      const userMessage: Message = { role: "user", content: userText.trim() };
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setInput("");
      setChatStarted(true);
      setIsStreaming(true);

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            document: docText,
            messages: updatedMessages,
          }),
        });

        if (!response.ok) throw new Error("API error");

        const reader = response.body?.getReader();
        if (!reader) throw new Error("No reader");

        const decoder = new TextDecoder();
        let accumulatedText = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          accumulatedText += decoder.decode(value, { stream: true });
          const currentText = accumulatedText;
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              role: "assistant",
              content: currentText,
            };
            return updated;
          });
        }
      } catch (error) {
        console.error(error);
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            content: "Sorry, something went wrong. Please try again.",
          };
          return updated;
        });
      } finally {
        setIsStreaming(false);
      }
    },
    [messages, docText, isStreaming]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const hasDoc = docText.trim().length > 0;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      {/* Header */}
      <header className="border-b border-zinc-800 px-4 sm:px-6 py-4 flex items-center gap-3 z-10 bg-zinc-950/95 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-sm font-bold">
            DQ
          </div>
          <div>
            <h1 className="text-base font-semibold tracking-tight">DocIQ</h1>
            <p className="text-xs text-zinc-500 hidden sm:block">
              Document intelligence · Ask questions, get cited answers
            </p>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          {hasDoc && (
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-zinc-400 bg-zinc-800 px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block" />
              {wordCount.toLocaleString()} words loaded
            </span>
          )}
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left panel: Document */}
        <div
          className={`flex flex-col border-b md:border-b-0 md:border-r border-zinc-800 ${
            chatStarted
              ? "md:w-2/5 h-64 md:h-auto"
              : "md:w-1/2 h-72 md:h-auto"
          } transition-all duration-500`}
        >
          {/* Document header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-900/50 shrink-0">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="text-sm font-medium text-zinc-300">
                {docName || "Document"}
              </span>
              {hasDoc && (
                <span className="text-xs text-zinc-600">
                  {charCount.toLocaleString()} chars
                </span>
              )}
            </div>
            {hasDoc && (
              <button
                onClick={() => {
                  setDocText("");
                  setDocName("");
                  setMessages([]);
                  setChatStarted(false);
                }}
                className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                Clear
              </button>
            )}
          </div>

          {/* Sample docs */}
          {!hasDoc && (
            <div className="px-4 py-3 border-b border-zinc-800 shrink-0">
              <p className="text-xs text-zinc-500 mb-2 uppercase tracking-wider">
                Load a sample
              </p>
              <div className="flex gap-2 flex-wrap">
                {SAMPLE_DOCS.map((doc) => (
                  <button
                    key={doc.id}
                    onClick={() => loadSample(doc)}
                    className="flex items-center gap-1.5 text-xs bg-zinc-800 hover:bg-zinc-700 px-2.5 py-1.5 rounded-lg transition-colors text-zinc-300"
                  >
                    <span>{doc.icon}</span>
                    <span>{doc.title}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Document textarea */}
          <textarea
            value={docText}
            onChange={(e) => {
              setDocText(e.target.value);
              if (!e.target.value.trim()) {
                setMessages([]);
                setChatStarted(false);
              }
              if (!docName && e.target.value.trim()) {
                setDocName("Pasted Document");
              }
            }}
            placeholder="Paste your document here — legal agreements, research papers, technical specs, meeting notes, anything...

Or load a sample document above ↑"
            className="flex-1 w-full bg-transparent text-sm text-zinc-300 placeholder-zinc-600 resize-none px-4 py-3 focus:outline-none font-mono leading-relaxed"
          />
        </div>

        {/* Right panel: Chat */}
        <div
          className={`flex flex-col ${
            chatStarted ? "md:w-3/5" : "md:w-1/2"
          } flex-1 transition-all duration-500`}
        >
          {!hasDoc ? (
            /* Empty state */
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 gap-6">
              <div>
                <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-3xl mx-auto mb-4">
                  📄
                </div>
                <h2 className="text-xl font-bold text-zinc-100 mb-2">
                  Paste your document to start
                </h2>
                <p className="text-zinc-400 text-sm max-w-sm leading-relaxed">
                  Contracts, research papers, specs, reports — anything. Ask questions and get answers with exact citations from the text.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-2 w-full max-w-xs">
                <p className="text-xs text-zinc-600 uppercase tracking-wider">
                  Works great for
                </p>
                {[
                  "📜 Legal agreements — find key clauses",
                  "🔬 Research papers — extract findings",
                  "📋 Product specs — clarify requirements",
                  "📊 Financial reports — highlight metrics",
                ].map((item) => (
                  <div
                    key={item}
                    className="text-left text-sm text-zinc-400 flex items-center gap-2"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Chat messages */}
              <div className="flex-1 overflow-y-auto px-4 py-4">
                {messages.length === 0 ? (
                  <div className="h-full flex flex-col justify-between">
                    <div className="text-center py-6">
                      <p className="text-zinc-400 text-sm font-medium mb-1">
                        Document loaded — ready to answer questions
                      </p>
                      <p className="text-zinc-600 text-xs">
                        Ask anything about the document. Answers include direct citations.
                      </p>
                    </div>
                    <div className="space-y-2 mb-4">
                      <p className="text-xs text-zinc-600 uppercase tracking-wider">
                        Suggested questions
                      </p>
                      {STARTER_QUESTIONS.map((q) => (
                        <button
                          key={q}
                          onClick={() => sendMessage(q)}
                          className="w-full text-left text-sm text-zinc-300 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-indigo-500/40 rounded-xl px-4 py-2.5 transition-all"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((msg, i) => (
                      <div
                        key={i}
                        className={`flex gap-3 ${
                          msg.role === "user"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        {msg.role === "assistant" && (
                          <div className="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-1">
                            DQ
                          </div>
                        )}
                        <div
                          className={`max-w-[90%] rounded-2xl px-4 py-3 ${
                            msg.role === "user"
                              ? "bg-indigo-600 text-white rounded-tr-sm text-sm"
                              : "bg-zinc-900 border border-zinc-800 text-zinc-100 rounded-tl-sm"
                          }`}
                        >
                          {msg.role === "user" ? (
                            <p className="text-sm whitespace-pre-wrap">
                              {msg.content}
                            </p>
                          ) : (
                            <div className="text-sm prose prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-p:my-1.5 prose-p:first:mt-0 prose-p:last:mb-0 prose-headings:text-zinc-100 prose-strong:text-zinc-100 prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:underline prose-code:text-indigo-300 prose-code:bg-zinc-800 prose-code:px-1 prose-code:rounded prose-li:my-0.5 prose-blockquote:border-indigo-500 prose-blockquote:text-zinc-400">
                              {msg.content ? (
                                <ReactMarkdown>{msg.content}</ReactMarkdown>
                              ) : (
                                <span className="text-zinc-500 animate-pulse">
                                  Reading document...
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                        {msg.role === "user" && (
                          <div className="w-6 h-6 rounded-full bg-zinc-700 flex items-center justify-center text-xs flex-shrink-0 mt-1">
                            You
                          </div>
                        )}
                      </div>
                    ))}
                    <div ref={bottomRef} />
                  </div>
                )}
              </div>

              {/* Chat input */}
              <div className="border-t border-zinc-800 p-4">
                <form
                  onSubmit={handleSubmit}
                  className="flex gap-3 items-end"
                >
                  <div className="flex-1">
                    <textarea
                      ref={chatInputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask anything about this document..."
                      rows={1}
                      className="w-full resize-none bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors max-h-32"
                      disabled={isStreaming}
                      style={{
                        height: "auto",
                        minHeight: "48px",
                      }}
                      onInput={(e) => {
                        const target = e.target as HTMLTextAreaElement;
                        target.style.height = "auto";
                        target.style.height = `${Math.min(target.scrollHeight, 128)}px`;
                      }}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!input.trim() || isStreaming}
                    className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white px-4 py-3 rounded-xl text-sm font-medium transition-colors flex-shrink-0"
                  >
                    {isStreaming ? (
                      <svg
                        className="animate-spin w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                    )}
                  </button>
                </form>
                <p className="text-xs text-zinc-600 mt-2">
                  Your document is processed locally — it&apos;s never stored on our servers.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
