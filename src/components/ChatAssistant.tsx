"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { isChatEnabled } from "@/lib/chat/config";
import type { ChatLink, ChatResponse } from "@/types";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  links?: ChatLink[];
};

export function ChatAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init-1",
      role: "assistant",
      content: isChatEnabled
        ? "Bonjour ! Je suis l'assistant BOBBEE. Je peux vous aider a trouver les ressources et liens utiles pour demarrer. Posez-moi votre question !"
        : "L'assistant n'est pas disponible dans cette version statique. Il reste testable en local et pret pour un futur runtime serveur."
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!isChatEnabled || !input.trim() || isLoading) {
      return;
    }

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: input
    };

    setMessages((previousMessages) => [...previousMessages, userMessage]);
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

      const data = (await response.json()) as ChatResponse;

      const assistantMessage: Message = {
        id: `msg-${Date.now()}`,
        role: "assistant",
        content: data.answer,
        links: data.links
      };

      setMessages((previousMessages) => [...previousMessages, assistantMessage]);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Une erreur est survenue"
      );

      setMessages((previousMessages) => [
        ...previousMessages,
        {
          id: `msg-${Date.now()}`,
          role: "assistant",
          content: "Desole, je n'ai pas pu traiter votre question. Essayez de reformuler votre demande."
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen flex-col bg-gradient-to-br from-hive-cream via-white to-honey-25">
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

      <div className="container-page flex-1 space-y-6 overflow-y-auto py-8">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xl space-y-3 ${
                message.role === "user"
                  ? "rounded-3xl bg-honey-400 px-6 py-3.5 text-hive-ink shadow-soft"
                  : "space-y-4"
              }`}
            >
              <p
                className={
                  message.role === "user"
                    ? "text-sm font-medium leading-6"
                    : "text-sm leading-6 text-hive-ink"
                }
              >
                {message.content}
              </p>

              {message.links && message.links.length > 0 && (
                <div className="space-y-3 pt-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-hive-ink/70">
                    Ressources recommandees
                  </p>
                  <div className="space-y-2">
                    {message.links.map((link) => (
                      <a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-start gap-3 rounded-2xl border border-hive-line/40 bg-white/70 p-3.5 transition-all duration-250 hover:border-honey-300/60 hover:bg-white hover:shadow-soft"
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
                        <div className="min-w-0 flex-1">
                          <p className="line-clamp-2 text-sm font-semibold text-hive-ink">
                            {link.quoi}
                          </p>
                          <p className="mt-1 text-xs text-hive-ink/60">
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
                <div className="h-2.5 w-2.5 animate-bounce rounded-full bg-honey-400" />
                <div
                  className="h-2.5 w-2.5 animate-bounce rounded-full bg-honey-400"
                  style={{ animationDelay: "0.1s" }}
                />
                <div
                  className="h-2.5 w-2.5 animate-bounce rounded-full bg-honey-400"
                  style={{ animationDelay: "0.2s" }}
                />
              </div>
              <p className="text-xs text-hive-ink/60">
                L&apos;assistant reflechit...
              </p>
            </div>
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-red-200/60 bg-red-50/70 p-4 backdrop-blur-sm">
            <p className="text-sm text-red-700/90">{error}</p>
          </div>
        )}

        {!isChatEnabled && (
          <div className="rounded-2xl border border-hive-line/60 bg-white/75 p-4 text-sm text-hive-ink/75 backdrop-blur-sm">
            Activez `NEXT_PUBLIC_CHAT_ENABLED=true` sur un runtime serveur pour publier le chat.
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-hive-line/30 bg-white/60 backdrop-blur-md">
        <div className="container-page py-5">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder={isChatEnabled ? "Posez votre question..." : "Assistant desactive dans cette version"}
              disabled={!isChatEnabled || isLoading}
              className="flex-1 rounded-2xl border border-hive-line/50 bg-white/80 px-5 py-3.5 text-hive-ink placeholder-hive-ink/50 backdrop-blur-sm transition-all duration-250 focus:border-honey-400/70 focus:bg-white/95 focus:outline-none focus:ring-2 focus:ring-honey-400/20 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!isChatEnabled || isLoading || !input.trim()}
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
