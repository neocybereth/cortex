"use client";

import { useState, useMemo } from "react";
import { useChat, type UIMessage } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";

export default function Home() {
  const [input, setInput] = useState("");

  const transport = useMemo(() => {
    return new DefaultChatTransport({
      api: "/api/chat",
    });
  }, []);

  const { messages, sendMessage, status, error } = useChat({
    transport,
    onError: (error: Error) => {
      console.error("[Frontend] Chat error:", error);
    },
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("[Frontend] Submitting message:", input);
    if (!input.trim()) return;

    sendMessage({ text: input });
    setInput("");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Cortex - Oura Ring AI Assistant
        </h1>

        <div className="bg-white rounded-lg shadow-md h-96 mb-6 overflow-y-auto p-4">
          {messages.length === 0 ? (
            <div className="text-black text-center mt-20">
              Start a conversation about your Oura Ring data!
              <br />
              Try asking: &quot;What was my sleep score yesterday?&quot; or
              &quot;Show me my activity for this week&quot;
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message: UIMessage) => (
                <div
                  key={message.id}
                  className={`p-3 rounded-lg text-black ${
                    message.role === "user"
                      ? "bg-blue-100 ml-auto max-w-xs"
                      : "bg-gray-100 mr-auto max-w-md"
                  }`}
                >
                  <div className="font-medium text-sm text-black mb-1">
                    {message.role === "user" ? "You" : "Cortex"}
                  </div>
                  <div className="space-y-2">
                    {message.parts.map((part, idx) => {
                      if (part.type === "text") {
                        return (
                          <div key={idx} className="whitespace-pre-wrap">
                            {part.text}
                          </div>
                        );
                      } else if (part.type === "tool-call") {
                        return (
                          <div
                            key={idx}
                            className="text-sm text-gray-600 italic"
                          >
                            🔧 Calling tool...
                          </div>
                        );
                      } else if (
                        part.type.startsWith("tool-") &&
                        "output" in part &&
                        part.output !== undefined
                      ) {
                        return (
                          <div
                            key={idx}
                            className="text-sm bg-white p-2 rounded border border-gray-200"
                          >
                            <div className="font-medium text-gray-700 mb-1">
                              📊 Tool result:
                            </div>
                            <pre className="whitespace-pre-wrap text-xs overflow-x-auto">
                              {typeof part.output === "string"
                                ? part.output
                                : JSON.stringify(part.output, null, 2)}
                            </pre>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
              ))}
              {(status === "submitted" || status === "streaming") && (
                <div className="bg-gray-100 p-3 rounded-lg mr-auto max-w-md">
                  <div className="font-medium text-sm text-black mb-1">
                    Cortex
                  </div>
                  <div className="flex items-center space-x-2 text-black">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black"></div>
                    <span>Analyzing your Oura data...</span>
                  </div>
                </div>
              )}
              {error && (
                <div className="bg-red-100 p-3 rounded-lg mr-auto max-w-md border border-red-300">
                  <div className="font-medium text-sm text-red-800 mb-1">
                    Error
                  </div>
                  <div className="text-red-700">{error.message}</div>
                </div>
              )}
            </div>
          )}
        </div>

        <form onSubmit={onSubmit} className="flex space-x-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your Oura Ring data..."
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
            disabled={status === "submitted" || status === "streaming"}
          />
          <button
            type="submit"
            disabled={
              status === "submitted" || status === "streaming" || !input.trim()
            }
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
