import React, { useState } from 'react';
import { Bot, X, Send } from 'lucide-react';
import clsx from 'clsx';

function AiAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi there! I am your SHEild AI assistant. How can I help you stay safe today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    // Mock AI response
    setTimeout(() => {
      let reply = "I'm analyzing the safety data for your query.";
      if (userMsg.content.toLowerCase().includes('safe')) {
        reply = "Based on current data, the area you are in has a moderate risk score. I recommend sticking to well-lit main roads.";
      } else if (userMsg.content.toLowerCase().includes('route')) {
        reply = "I have highlighted the safest route on your map, avoiding areas with recent reports of poor lighting.";
      }
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    }, 1000);
  };

  return (
    <>
      {/* Trigger */}
      <button 
        onClick={() => setOpen(!open)}
        className="fixed bottom-24 left-4 md:bottom-8 md:left-8 w-14 h-14 bg-dark-800 border border-primary-500/50 hover:bg-dark-700 rounded-full shadow-lg flex items-center justify-center z-[2000] transition-transform hover:scale-105"
      >
        {open ? <X className="w-6 h-6 text-slate-300" /> : <Bot className="w-6 h-6 text-primary-400" />}
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-40 left-4 right-4 md:bottom-28 md:left-8 md:right-auto md:w-80 h-96 glass-panel flex flex-col z-[2000] overflow-hidden animate-in slide-in-from-bottom-5">
          <div className="bg-dark-800 p-4 border-b border-dark-700 flex items-center gap-3">
            <div className="bg-primary-500/20 p-2 rounded-lg">
              <Bot className="w-5 h-5 text-primary-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white text-sm">Safety Assistant</h3>
              <p className="text-xs text-slate-400">Online</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={clsx(
                  "max-w-[85%] rounded-xl p-3 text-sm",
                  msg.role === 'assistant' 
                    ? "bg-dark-700 text-slate-200 self-start rounded-tl-sm" 
                    : "bg-primary-600 text-white self-end ml-auto rounded-tr-sm"
                )}
              >
                {msg.content}
              </div>
            ))}
          </div>

          <form onSubmit={handleSend} className="p-3 border-t border-dark-700 bg-dark-800/50 flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about a safe route..."
              className="flex-1 bg-dark-900 border border-dark-700 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-primary-500"
            />
            <button 
              type="submit"
              className="bg-primary-600 hover:bg-primary-500 text-white p-2 rounded-lg transition-colors flex items-center justify-center"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default AiAssistant;
