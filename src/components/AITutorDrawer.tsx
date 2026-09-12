import React, { useState } from 'react';
import { SiberianCatMascot } from './SiberianCatMascot';
import { Bot, Send, User, Sparkles, X, Minimize2 } from 'lucide-react';

interface AITutorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentLessonTitle?: string;
}

interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}

export const AITutorDrawer: React.FC<AITutorDrawerProps> = ({
  isOpen,
  onClose,
  currentLessonTitle,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'ai',
      text: `Olá! Sou seu Tutor IA offline (Qwen3 0.6B local). Estou aqui para tirar dúvidas sobre a lição ou chamado atual: "${
        currentLessonTitle || 'Fundamentos de Linux'
      }". O que gostaria de compreender melhor?`,
    },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    const currentQuestion = input;
    setInput('');

    setTimeout(() => {
      const aiReply: ChatMessage = {
        sender: 'ai',
        text: `Excelente pergunta sobre "${currentQuestion}". No Linux, entender esse princípio ajuda você a evitar erros comuns de permissão e comandos de terminal. Precisa de um exemplo prático?`,
      };
      setMessages((prev) => [...prev, aiReply]);
    }, 500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-layer1/95 backdrop-blur-xl border-l border-outline-subtle shadow-2xl z-50 flex flex-col transition-all duration-300">
      {/* Drawer Header */}
      <div className="p-4 border-b border-outline-subtle flex items-center justify-between bg-surface-container/60">
        <div className="flex items-center gap-3">
          <SiberianCatMascot size={36} />
          <div>
            <h3 className="font-display font-semibold text-sm text-on-surface flex items-center gap-1.5">
              Tutor IA Offline
              <Sparkles className="w-3.5 h-3.5 text-primary-electric" />
            </h3>
            <p className="text-[10px] text-on-surface-variant font-mono">Qwen3 0.6B Q4_K_M</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'ai' && (
              <div className="w-6 h-6 rounded-full bg-tertiary-indigo/20 text-tertiary-indigo flex items-center justify-center shrink-0">
                <Bot className="w-3.5 h-3.5" />
              </div>
            )}
            <div
              className={`p-3 rounded-xl max-w-[85%] leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-primary-electric text-white rounded-tr-none'
                  : 'bg-surface-container border border-outline-subtle text-on-surface-variant rounded-tl-none'
              }`}
            >
              {msg.text}
            </div>
            {msg.sender === 'user' && (
              <div className="w-6 h-6 rounded-full bg-primary-electric/20 text-primary-electric flex items-center justify-center shrink-0">
                <User className="w-3.5 h-3.5" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Drawer Input */}
      <div className="p-3 border-t border-outline-subtle bg-surface-container/40 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Tire dúvidas com o Tutor IA..."
          className="flex-1 bg-surface-container border border-outline-subtle rounded-xl px-3 py-2 text-xs text-on-surface outline-none focus:border-primary-electric"
        />
        <button
          onClick={handleSend}
          className="p-2 rounded-xl bg-primary-electric text-white hover:bg-primary-electric/90 transition-all"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
