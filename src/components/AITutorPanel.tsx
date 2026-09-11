import React, { useState } from 'react';
import { Bot, Send, User, Sparkles } from 'lucide-react';

interface AITutorPanelProps {
  currentLessonTitle?: string;
}

interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}

export const AITutorPanel: React.FC<AITutorPanelProps> = ({ currentLessonTitle }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'ai',
      text: `Olá! Sou seu Tutor IA offline (Qwen3 0.6B local). Estou aqui para tirar dúvidas sobre a lição atual: "${currentLessonTitle || 'Fundamentos de Linux'}". Como posso ajudar?`,
    },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    const currentQuestion = input;
    setInput('');

    // Resposta local didática simulada (na Etapa 12 integrada via Rust IPC llama.cpp)
    setTimeout(() => {
      const aiReply: ChatMessage = {
        sender: 'ai',
        text: `Entendido! Em relação a "${currentQuestion}", no Linux esse conceito é fundamental para entender a separação entre o usuário comum e os privilégios do sistema.`,
      };
      setMessages((prev) => [...prev, aiReply]);
    }, 600);
  };

  return (
    <div className="flex flex-col h-full bg-surface-container-low rounded-2xl border border-outline-subtle shadow-surface-card p-4">
      {/* Header */}
      <div className="flex items-center gap-3 pb-3 border-b border-outline-subtle">
        <div className="p-2 rounded-xl bg-tertiary-indigo/10 border border-tertiary-indigo/20 text-tertiary-indigo">
          <Bot className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-display font-semibold text-sm text-on-surface flex items-center gap-1.5">
            Tutor IA Offline
            <Sparkles className="w-3.5 h-3.5 text-primary-electric" />
          </h3>
          <p className="text-xs text-on-surface-variant">Qwen3 0.6B Q4_K_M (Local)</p>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto my-4 space-y-3 pr-1 text-xs">
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

      {/* Input Field */}
      <div className="flex items-center gap-2 pt-2 border-t border-outline-subtle">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Tire sua dúvida com o Tutor IA..."
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
