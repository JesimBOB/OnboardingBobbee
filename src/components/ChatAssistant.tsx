"use client";

import { useState, useRef, useEffect } from "react";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  links?: Array<{
    id: string;
    quoi: string;
    source: string;
    url: string;
  }>;
};

export function ChatAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init-1",
      role: "assistant",
      content: "Bonjour ! Je suis l'assistant BOBBEE. Je peux vous aider à trouver les ressources et liens utiles pour démarrer. Posez-moi votre question ! 👋"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll vers le dernier message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: input
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input })
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la communication avec l'assistant");
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: `msg-${Date.now()}`,
        role: "assistant",
        content: data.answer,
        links: data.links || []
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
      const errorMessage: Message = {
        id: `msg-${Date.now()}`,
        role: "assistant",
        content: "Désolé, je n'ai pas pu traiter votre question. Essayez reformuler votre demande ! 😊"
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen flex-col bg-gradient-to-br from-hive-cream via-white to-honey-25">
      {/* En-tête */}
      <div className="border-b border-hive-line/30 bg-white/60 backdrop-blur-md">
        <div className="container-page flex items-center gap-3 py-5">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-honey-400 to-honey-500 text-sm font-bold text-hive-ink shadow-soft">
            B
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-honey-700">
              Assistant
            </p>
            <p className="font-display text-lg leading-none text-hive-ink">
              BOBBEE
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="container-page flex-1 overflow-y-auto space-y-6 py-8">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xl space-y-3 ${
                message.role === "user"
                  ? "rounded-3xl bg-honey-400 px-6 py-3.5 text-hive-ink shadow-soft"
                  : "space-y-4"
              }`}
            >
              {message.role === "assistant" && (
                <p className="text-sm leading-6 text-hive-ink">
                  {message.content}
                </p>
              )}

              {message.role === "user" && (
                <p className="text-sm leading-6 font-medium">{message.content}</p>
              )}

              {/* Afficher les liens si présents */}
              {message.links && message.links.length > 0 && (
                <div className="space-y-3 pt-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-hive-ink/70">
                    📚 Ressources recommandées
                  </p>
                  <div className="space-y-2">
                    {message.links.map((link) => (
                      <a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-start gap-3 rounded-2xl border border-hive-line/40 bg-white/70 p-3.5 transition-all duration-250 hover:bg-white hover:border-honey-300/60 hover:shadow-soft"
                      >
                        <div className="mt-0.5 flex-shrink-0">
                          <svg
                            className="h-4 w-4 text-honey-700"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-hive-ink line-clamp-2">
                            {link.quoi}
                          </p>
                          <p className="text-xs text-hive-ink/60 mt-1">
                            {link.source}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="space-y-2">
              <div className="flex gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-honey-400 animate-bounce" />
                <div className="h-2.5 w-2.5 rounded-full bg-honey-400 animate-bounce" style={{ animationDelay: "0.1s" }} />
                <div className="h-2.5 w-2.5 rounded-full bg-honey-400 animate-bounce" style={{ animationDelay: "0.2s" }} />
              </div>
              <p className="text-xs text-hive-ink/60">
                L'assistant réfléchit...
              </p>
            </div>
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-red-200/60 bg-red-50/70 p-4 backdrop-blur-sm">
            <p className="text-sm text-red-700/90">{error}</p>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Formulaire */}
      <div className="border-t border-hive-line/30 bg-white/60 backdrop-blur-md">
        <div className="container-page py-5">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Posez votre question..."
              disabled={isLoading}
              className="flex-1 rounded-2xl border border-hive-line/50 bg-white/80 px-5 py-3.5 text-hive-ink placeholder-hive-ink/50 backdrop-blur-sm transition-all duration-250 focus:border-honey-400/70 focus:bg-white/95 focus:outline-none focus:ring-2 focus:ring-honey-400/20 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="btn-primary disabled:opacity-50"
            >
              <svg
                className="h-4 w-4"
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
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
