"use client";

import { useState, useMemo } from "react";
import { useChat, type UIMessage } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Health metrics card component
function MetricCard({
  title,
  value,
  unit,
  icon,
  color,
  subtitle,
}: {
  title: string;
  value: string | number;
  unit?: string;
  icon: string;
  color: string;
  subtitle?: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <div className="flex items-baseline gap-2">
            <span className={`text-3xl font-bold ${color}`}>{value}</span>
            {unit && <span className="text-sm text-gray-500">{unit}</span>}
          </div>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className={`text-4xl ${color} opacity-80`}>{icon}</div>
      </div>
    </div>
  );
}

// Tool call display component
function ToolCallDisplay({ toolCall }: { toolCall: { toolName: string } }) {
  const getToolInfo = (toolName: string) => {
    const toolInfo: Record<
      string,
      { icon: string; color: string; label: string }
    > = {
      getPersonalInfo: {
        icon: "👤",
        color: "bg-blue-50 text-blue-700",
        label: "Personal Info",
      },
      getDailySleep: {
        icon: "😴",
        color: "bg-purple-50 text-purple-700",
        label: "Sleep Data",
      },
      getSleep: {
        icon: "🌙",
        color: "bg-indigo-50 text-indigo-700",
        label: "Detailed Sleep",
      },
      getDailyActivity: {
        icon: "🏃",
        color: "bg-green-50 text-green-700",
        label: "Activity Data",
      },
      getDailyReadiness: {
        icon: "⚡",
        color: "bg-yellow-50 text-yellow-700",
        label: "Readiness Score",
      },
      getDailyStress: {
        icon: "🧘",
        color: "bg-pink-50 text-pink-700",
        label: "Stress Data",
      },
      getWorkouts: {
        icon: "💪",
        color: "bg-orange-50 text-orange-700",
        label: "Workouts",
      },
      getHeartRate: {
        icon: "❤️",
        color: "bg-red-50 text-red-700",
        label: "Heart Rate",
      },
      getSessions: {
        icon: "🧘‍♀️",
        color: "bg-teal-50 text-teal-700",
        label: "Sessions",
      },
      getSleepTime: {
        icon: "⏰",
        color: "bg-cyan-50 text-cyan-700",
        label: "Sleep Time",
      },
      getTags: {
        icon: "🏷️",
        color: "bg-gray-50 text-gray-700",
        label: "Tags",
      },
      getEnhancedTags: {
        icon: "✨",
        color: "bg-violet-50 text-violet-700",
        label: "Enhanced Tags",
      },
      getRestModePeriods: {
        icon: "🛌",
        color: "bg-blue-50 text-blue-700",
        label: "Rest Mode",
      },
      getRingConfiguration: {
        icon: "💍",
        color: "bg-amber-50 text-amber-700",
        label: "Ring Config",
      },
    };

    return (
      toolInfo[toolName] || {
        icon: "🔧",
        color: "bg-gray-50 text-gray-700",
        label: toolName,
      }
    );
  };

  const info = getToolInfo(toolCall.toolName);

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm ${info.color} font-medium`}
    >
      <span>{info.icon}</span>
      <span>{info.label}</span>
    </div>
  );
}

export default function Home() {
  const [input, setInput] = useState("");
  const [showDashboard, setShowDashboard] = useState(true);

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

  // Sample prompts for quick access
  const samplePrompts = [
    { text: "How did I sleep last night?", icon: "😴" },
    { text: "Show my activity for this week", icon: "🏃" },
    { text: "What's my readiness score today?", icon: "⚡" },
    { text: "Show my heart rate data", icon: "❤️" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl font-bold">C</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Cortex
                </h1>
                <p className="text-xs text-gray-500">
                  Your Oura Ring AI Assistant
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowDashboard(!showDashboard)}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors"
            >
              {showDashboard ? "Hide" : "Show"} Dashboard
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Dashboard Section */}
        {showDashboard && messages.length === 0 && (
          <div className="mb-8 space-y-6">
            {/* Welcome Card */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
              <h2 className="text-3xl font-bold mb-2">
                Welcome to Your Health Dashboard
              </h2>
              <p className="text-blue-100">
                Ask me anything about your Oura Ring data, or use the quick
                prompts below to get started.
              </p>
            </div>

            {/* Quick Actions */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Quick Questions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {samplePrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setInput(prompt.text);
                      setShowDashboard(false);
                    }}
                    className="bg-white rounded-xl p-4 hover:shadow-lg transition-all text-left group border border-gray-100"
                  >
                    <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                      {prompt.icon}
                    </div>
                    <p className="text-sm font-medium text-gray-700">
                      {prompt.text}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Info Cards */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Available Metrics
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard
                  title="Sleep Quality"
                  value="💤"
                  icon="😴"
                  color="text-purple-600"
                  subtitle="Daily sleep scores & analysis"
                />
                <MetricCard
                  title="Activity"
                  value="🏃"
                  icon="🎯"
                  color="text-green-600"
                  subtitle="Steps, calories & workouts"
                />
                <MetricCard
                  title="Readiness"
                  value="⚡"
                  icon="💪"
                  color="text-yellow-600"
                  subtitle="Daily readiness scores"
                />
                <MetricCard
                  title="Heart Rate"
                  value="❤️"
                  icon="💓"
                  color="text-red-600"
                  subtitle="Continuous HR monitoring"
                />
              </div>
            </div>
          </div>
        )}

        {/* Chat Interface */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Messages Container */}
          <div className="h-[500px] overflow-y-auto p-6 bg-gray-50">
            {messages.length === 0 ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🤖</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Start a Conversation
                  </h3>
                  <p className="text-gray-600">
                    Ask me anything about your Oura Ring data!
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message: UIMessage) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-3xl rounded-2xl px-6 py-4 ${
                        message.role === "user"
                          ? "bg-linear-to-br from-blue-600 to-purple-600 text-white"
                          : "bg-white shadow-md text-gray-800"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-semibold">
                          {message.role === "user" ? "You" : "Cortex"}
                        </span>
                      </div>
                      <div className="space-y-3">
                        {message.parts.map((part, idx) => {
                          if (part.type === "text") {
                            const isUser = message.role === "user";
                            return (
                              <div
                                key={idx}
                                className="prose prose-sm max-w-none leading-relaxed"
                              >
                                <ReactMarkdown
                                  remarkPlugins={[remarkGfm]}
                                  components={{
                                    table: ({ children }) => (
                                      <div className="overflow-x-auto my-4">
                                        <table
                                          className={`min-w-full divide-y ${
                                            isUser
                                              ? "divide-white/20 border-white/30"
                                              : "divide-gray-200 border-gray-200"
                                          } border rounded-lg`}
                                        >
                                          {children}
                                        </table>
                                      </div>
                                    ),
                                    thead: ({ children }) => (
                                      <thead
                                        className={
                                          isUser
                                            ? "bg-white/10"
                                            : "bg-gradient-to-r from-blue-50 to-purple-50"
                                        }
                                      >
                                        {children}
                                      </thead>
                                    ),
                                    tbody: ({ children }) => (
                                      <tbody
                                        className={`${
                                          isUser
                                            ? "bg-white/5 divide-white/10"
                                            : "bg-white divide-gray-200"
                                        } divide-y`}
                                      >
                                        {children}
                                      </tbody>
                                    ),
                                    tr: ({ children }) => (
                                      <tr
                                        className={
                                          isUser
                                            ? "hover:bg-white/10"
                                            : "hover:bg-gray-50"
                                        }
                                      >
                                        {children}
                                      </tr>
                                    ),
                                    th: ({ children }) => (
                                      <th
                                        className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider ${
                                          isUser
                                            ? "text-white"
                                            : "text-gray-700"
                                        }`}
                                      >
                                        {children}
                                      </th>
                                    ),
                                    td: ({ children }) => (
                                      <td
                                        className={`px-4 py-3 text-sm ${
                                          isUser
                                            ? "text-white"
                                            : "text-gray-800"
                                        }`}
                                      >
                                        {children}
                                      </td>
                                    ),
                                    h1: ({ children }) => (
                                      <h1
                                        className={`text-2xl font-bold mb-4 mt-6 ${
                                          isUser
                                            ? "text-white"
                                            : "text-gray-900"
                                        }`}
                                      >
                                        {children}
                                      </h1>
                                    ),
                                    h2: ({ children }) => (
                                      <h2
                                        className={`text-xl font-bold mb-3 mt-5 ${
                                          isUser
                                            ? "text-white"
                                            : "text-gray-900"
                                        }`}
                                      >
                                        {children}
                                      </h2>
                                    ),
                                    h3: ({ children }) => (
                                      <h3
                                        className={`text-lg font-semibold mb-2 mt-4 ${
                                          isUser
                                            ? "text-white"
                                            : "text-gray-800"
                                        }`}
                                      >
                                        {children}
                                      </h3>
                                    ),
                                    ul: ({ children }) => (
                                      <ul
                                        className={`list-disc list-inside space-y-1 my-3 ${
                                          isUser
                                            ? "text-white"
                                            : "text-gray-800"
                                        }`}
                                      >
                                        {children}
                                      </ul>
                                    ),
                                    ol: ({ children }) => (
                                      <ol
                                        className={`list-decimal list-inside space-y-1 my-3 ${
                                          isUser
                                            ? "text-white"
                                            : "text-gray-800"
                                        }`}
                                      >
                                        {children}
                                      </ol>
                                    ),
                                    li: ({ children }) => (
                                      <li className="ml-4">{children}</li>
                                    ),
                                    p: ({ children }) => (
                                      <p
                                        className={`mb-3 leading-relaxed ${
                                          isUser
                                            ? "text-white"
                                            : "text-gray-800"
                                        }`}
                                      >
                                        {children}
                                      </p>
                                    ),
                                    strong: ({ children }) => (
                                      <strong
                                        className={`font-semibold ${
                                          isUser
                                            ? "text-white"
                                            : "text-gray-900"
                                        }`}
                                      >
                                        {children}
                                      </strong>
                                    ),
                                    code: ({ children }) => (
                                      <code
                                        className={`px-1.5 py-0.5 rounded text-sm font-mono ${
                                          isUser
                                            ? "bg-white/20 text-white"
                                            : "bg-gray-100 text-gray-800"
                                        }`}
                                      >
                                        {children}
                                      </code>
                                    ),
                                    pre: ({ children }) => (
                                      <pre
                                        className={`p-4 rounded-lg overflow-x-auto my-3 ${
                                          isUser ? "bg-white/10" : "bg-gray-100"
                                        }`}
                                      >
                                        {children}
                                      </pre>
                                    ),
                                  }}
                                >
                                  {part.text}
                                </ReactMarkdown>
                              </div>
                            );
                          } else if (part.type === "tool-call") {
                            return (
                              <div key={idx} className="my-2">
                                <ToolCallDisplay toolCall={part as never} />
                              </div>
                            );
                          } else if (
                            part.type.startsWith("tool-") &&
                            "output" in part &&
                            part.output !== undefined
                          ) {
                            // Don't display raw tool outputs - the AI will interpret them
                            return null;
                          }
                          return null;
                        })}
                      </div>
                    </div>
                  </div>
                ))}
                {(status === "submitted" || status === "streaming") && (
                  <div className="flex justify-start">
                    <div className="bg-white shadow-md rounded-2xl px-6 py-4 max-w-3xl">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-semibold text-gray-800">
                          Cortex
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-600">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-pink-600 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                        <span className="text-sm">
                          Analyzing your Oura data...
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                {error && (
                  <div className="flex justify-start">
                    <div className="bg-red-50 border border-red-200 rounded-2xl px-6 py-4 max-w-3xl">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-red-600">⚠️</span>
                        <span className="text-sm font-semibold text-red-800">
                          Error
                        </span>
                      </div>
                      <div className="text-red-700">{error.message}</div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 bg-white p-6">
            <form onSubmit={onSubmit} className="flex gap-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about your Oura Ring data..."
                className="flex-1 px-6 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-400 text-base"
                disabled={status === "submitted" || status === "streaming"}
              />
              <button
                type="submit"
                disabled={
                  status === "submitted" ||
                  status === "streaming" ||
                  !input.trim()
                }
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed font-semibold transition-all shadow-md hover:shadow-lg"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
