
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Image as ImageIcon } from 'lucide-react';
import { ChatMessage } from '../types';
import { gemini } from '../services/geminiService';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hello, Commander. I am LevelUp AI. How can I assist your gameplay today?', timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await gemini.getChatResponse(input, []);
      const aiMsg: ChatMessage = { role: 'model', text: response || "I couldn't process that request.", timestamp: Date.now() };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'model', text: "Error: Could not reach gaming intelligence servers.", timestamp: Date.now() }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0a0c] rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
      <div className="p-4 bg-slate-900/50 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full gaming-gradient flex items-center justify-center">
            <Bot className="text-white w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-100">AI Gaming Strategist</h3>
            <span className="text-xs text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Synchronized & Ready
            </span>
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-indigo-600' : 'bg-slate-800'}`}>
                {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5 text-indigo-400" />}
              </div>
              <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-none shadow-lg' 
                  : 'bg-slate-800/80 text-slate-200 rounded-tl-none border border-slate-700/50'
              }`}>
                <div className="prose prose-invert prose-sm max-w-none">
                  {msg.text}
                </div>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-800/80 p-4 rounded-2xl rounded-tl-none border border-slate-700/50 flex items-center gap-3">
              <Loader2 className="w-4 h-4 text-indigo-400 animate-spin" />
              <span className="text-sm text-slate-400 italic">Analyzing game mechanics...</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-slate-900/80 border-t border-slate-800">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about a boss fight, build, or puzzle..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 pr-24 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
          />
          <div className="absolute right-2 flex gap-1">
            <button className="p-2 text-slate-500 hover:text-indigo-400 transition-colors">
              <ImageIcon className="w-5 h-5" />
            </button>
            <button
              onClick={handleSend}
              disabled={isLoading}
              className="p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
        <p className="mt-2 text-[10px] text-slate-500 text-center">
          Leveraging Gemini 3 Pro reasoning engine for high-precision strategy.
        </p>
      </div>
    </div>
  );
};

export default ChatInterface;
