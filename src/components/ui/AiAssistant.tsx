"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Cpu, Key } from "lucide-react";
import { useAuth } from "@/components/providers/AuthProvider";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { decryptData } from "@/lib/utils/encryption";
import Link from "next/link";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [loadingKey, setLoadingKey] = useState(true);
  
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hello, Architect. I am the ARISE Core AI. How can I assist your engineering today?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadKey() {
      if (!user?.uid) {
        setLoadingKey(false);
        return;
      }
      try {
        const snap = await getDoc(doc(db, "users", user.uid));
        if (snap.exists() && snap.data().openAiKey) {
          const decrypted = await decryptData(snap.data().openAiKey, user.uid);
          setApiKey(decrypted);
        }
      } catch (e) {
        console.error("Failed to load AI key", e);
      }
      setLoadingKey(false);
    }
    loadKey();
  }, [user]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || !apiKey) return;
    
    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setIsTyping(true);

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini", // Cost effective fast model
          messages: [
            { role: "system", content: "You are the ARISE Core AI, an advanced tech-focused assistant for the ARISE Open Source Community. Keep responses extremely concise, intelligent, and formatted cleanly. You assist college students and engineers in building tech projects." },
            ...messages,
            { role: "user", content: userMsg }
          ]
        })
      });

      const data = await response.json();
      
      if (data.error) {
        setMessages(prev => [...prev, { role: "assistant", content: `Error: ${data.error.message}` }]);
      } else {
        const reply = data.choices[0].message.content;
        setMessages(prev => [...prev, { role: "assistant", content: reply }]);
      }
    } catch (e) {
      setMessages(prev => [...prev, { role: "assistant", content: "Neural connection failed. Please check your network or API key." }]);
    }
    
    setIsTyping(false);
  };

  if (!user) return null; // Hide completely for non-logged in users

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-apple-bg/80 backdrop-blur-xl border border-apple-border/50 text-apple-text shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-apple-accent ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
      >
        <Bot className="w-6 h-6 text-apple-text" />
        <div className="absolute top-0 right-0 w-3 h-3 bg-apple-accent rounded-full border-2 border-apple-bg animate-pulse"></div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] h-[550px] max-h-[85vh] max-w-[calc(100vw-32px)] apple-card glass-heavy flex flex-col overflow-hidden shadow-2xl border border-apple-border/30"
          >
            {/* Header */}
            <div className="h-16 border-b border-apple-border/30 flex items-center justify-between px-4 bg-apple-bg/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-apple-border/30 flex items-center justify-center border border-apple-border/50">
                  <Bot className="w-4 h-4 text-apple-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-apple-text text-sm tracking-tight">ARISE Core AI</h3>
                  <p className="text-[10px] text-green-500 font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> ONLINE
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 text-apple-text-muted hover:text-apple-text hover:bg-apple-border/20 rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4" ref={scrollRef}>
              {loadingKey ? (
                <div className="flex-1 flex items-center justify-center text-apple-text-muted font-mono text-xs">
                  Decrypting neural pathways...
                </div>
              ) : !apiKey ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center px-4 gap-4">
                  <Key className="w-8 h-8 text-apple-text-muted/50" />
                  <p className="text-sm text-apple-text-muted">
                    Your neural interface requires an active OpenAI API Key to function.
                  </p>
                  <Link 
                    href="/profile"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 bg-apple-border/20 hover:bg-apple-border/40 text-apple-text text-xs font-mono uppercase tracking-widest rounded-md border border-apple-border/30 transition-colors"
                  >
                    Configure Key
                  </Link>
                </div>
              ) : (
                <>
                  {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                        msg.role === 'user' 
                          ? 'bg-apple-text text-apple-bg rounded-br-sm' 
                          : 'bg-apple-border/10 text-apple-text border border-apple-border/20 rounded-bl-sm'
                      }`}>
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-apple-border/10 border border-apple-border/20 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-apple-text-muted animate-bounce" style={{ animationDelay: '0ms' }}></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-apple-text-muted animate-bounce" style={{ animationDelay: '150ms' }}></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-apple-text-muted animate-bounce" style={{ animationDelay: '300ms' }}></span>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Input Area */}
            {apiKey && (
              <div className="p-3 border-t border-apple-border/30 bg-apple-bg/50">
                <div className="relative flex items-center">
                  <input 
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Message Core AI..."
                    className="w-full bg-apple-border/10 border border-apple-border/30 rounded-full pl-4 pr-12 py-2.5 text-sm text-apple-text focus:outline-none focus:border-apple-accent transition-colors"
                  />
                  <button 
                    onClick={handleSend}
                    disabled={!input.trim() || isTyping}
                    className="absolute right-1.5 w-8 h-8 flex items-center justify-center rounded-full bg-apple-text text-apple-bg disabled:opacity-50 transition-opacity"
                  >
                    <Send className="w-3.5 h-3.5 -ml-0.5" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
