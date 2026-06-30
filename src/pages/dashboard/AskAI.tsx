import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, FileText, CheckCircle2, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AskAI() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "I am CarbonCounsel AI. I can analyze CCTS exposure, summarize EU CBAM obligations, and run due diligence on voluntary carbon projects using our live intelligence graph. How can I assist you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.content }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.content,
          evidences: data.evidences || [],
        },
      ]);
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-medium text-slate-900">CarbonCounsel AI</h1>
          <p className="text-sm text-slate-500">Decision-grade carbon market intelligence</p>
        </div>
        <Badge variant="outline" className="border-green-200 text-green-700 bg-green-50">
          Agent Active
        </Badge>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-4 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            {m.role === "assistant" && (
              <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
            )}
            
            <div className={`max-w-[80%] ${m.role === "user" ? "bg-slate-900 text-white rounded-2xl rounded-tr-sm px-5 py-3.5" : ""}`}>
              {m.role === "assistant" ? (
                <div className="space-y-4">
                  <div className="text-slate-700 leading-relaxed">{m.content}</div>
                  
                  {/* Evidences UI */}
                  {m.evidences && m.evidences.length > 0 && (
                    <div className="mt-4 space-y-3">
                      <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Supporting Evidence</div>
                      <div className="grid gap-3">
                        {m.evidences.map((evidence: any, idx: number) => (
                          <div key={idx} className="bg-slate-50 border border-slate-100 rounded-lg p-4">
                            <p className="text-sm text-slate-700 mb-3 leading-relaxed">{evidence.text}</p>
                            
                            <div className="flex flex-wrap items-center gap-3 border-t border-slate-200 pt-3">
                              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                                <FileText className="w-3.5 h-3.5" />
                                {evidence.source}
                              </div>
                              <div className="text-slate-300">•</div>
                              <div className="text-xs text-slate-500 font-mono">{evidence.date}</div>
                              <div className="text-slate-300">•</div>
                              <div className="flex items-center gap-1.5 text-xs">
                                <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                                <span className="text-slate-600 font-medium">{evidence.confidenceScore}% Confidence</span>
                              </div>
                              <div className="ml-auto">
                                <Badge variant="secondary" className="bg-slate-200/50 text-slate-600 hover:bg-slate-200/80 rounded-sm text-[10px] tracking-wider uppercase">
                                  {evidence.provenance}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="leading-relaxed">{m.content}</div>
              )}
            </div>

            {m.role === "user" && (
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
                <User className="w-4 h-4 text-slate-600" />
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-4 justify-start">
            <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 text-white animate-pulse" />
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-2xl rounded-tl-sm px-5 py-3.5 text-slate-400 text-sm flex items-center gap-2">
              <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              <span className="ml-2">Querying Intelligence Graph...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-slate-100">
        <form onSubmit={handleSubmit} className="relative flex items-center max-w-4xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about sector exposure, latest regulations, or project due diligence..."
            className="w-full bg-slate-50 border border-slate-200 rounded-full pl-6 pr-14 py-3.5 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400 shadow-sm"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 p-2 bg-slate-900 text-white rounded-full hover:bg-slate-800 disabled:opacity-50 disabled:hover:bg-slate-900 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
