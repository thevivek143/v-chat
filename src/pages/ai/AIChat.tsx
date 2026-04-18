import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Settings, Sparkles, Image as ImageIcon, Mic, Send, Palette } from 'lucide-react';
import { useAIStore } from '../../store/ai.store';

export default function AIChat() {
  const navigate = useNavigate();
  const { messages, isTyping, sendMessage } = useAIStore();
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    sendMessage(inputText);
    setInputText('');
  };

  return (
    <div className="flex flex-col h-full bg-bg absolute inset-0 pt-[110px]">
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 pb-28">
        
        {messages.map((msg) => (
          <div key={msg.id} className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.sender === 'ai' && (
              <div className="w-[32px] h-[32px] rounded-full flex items-center justify-center shrink-0 mr-2 mt-auto" style={{ background: 'linear-gradient(135deg, #6C3CE1, #06B6D4)' }}>
                 <Sparkles size={16} className="text-white" />
              </div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className={`max-w-[75%] px-4 py-2.5 ${msg.sender === 'user'
                ? 'bg-primary text-white rounded-[18px_18px_4px_18px]'
                : 'bg-card2 border-[0.5px] border-border text-text rounded-[18px_18px_18px_4px]'}`}
            >
              <p className="text-[14px] leading-[1.4] whitespace-pre-wrap">{msg.text}</p>
            </motion.div>
          </div>
        ))}

        {isTyping && (
          <div className="flex w-full justify-start">
            <div className="w-[32px] h-[32px] rounded-full flex items-center justify-center shrink-0 mr-2 mt-auto" style={{ background: 'linear-gradient(135deg, #6C3CE1, #06B6D4)' }}>
               <Sparkles size={16} className="text-white" />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="bg-card2 border-[0.5px] border-border text-text rounded-[18px_18px_18px_4px] px-4 py-3 flex items-center gap-1"
            >
              <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0 }} className="w-1.5 h-1.5 bg-text3 rounded-full" />
              <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-text3 rounded-full" />
              <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-text3 rounded-full" />
            </motion.div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="absolute bottom-0 w-full bg-bg/90 backdrop-blur-md px-4 pb-6 pt-2 border-t-[0.5px] border-border z-20">
        
        {/* Suggestion Pills */}
        {messages.length <= 5 && !inputText && (
          <div className="flex gap-2 overflow-x-auto pb-3 -mt-2" style={{ scrollbarWidth: 'none' }}>
             {['📋 Daily briefing', '💰 Spending summary', '🔍 Find a file', '📅 What\'s today'].map((pill, i) => (
                <span key={i} onClick={() => setInputText(pill)} className="bg-card border-[0.5px] border-border rounded-full px-3 py-1.5 text-[11px] font-bold text-text shrink-0 cursor-pointer shadow-sm">
                   {pill}
                </span>
             ))}
          </div>
        )}

        <div className="flex items-center gap-2">
           <button onClick={() => navigate('/ai-twin/draw')} className="w-[40px] h-[40px] rounded-full bg-card border-[0.5px] border-border flex items-center justify-center text-primary-light shrink-0">
             <Palette size={20} />
           </button>

           <AnimatePresence mode="wait">
             {isRecording ? (
                <motion.div 
                  initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: '100%' }} exit={{ opacity: 0, width: 0 }}
                  className="flex-1 h-[44px] bg-[rgba(239,68,68,0.1)] border-[0.5px] border-red/30 rounded-full flex items-center px-4 gap-3 relative overflow-hidden"
                >
                   <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity }} className="w-2.5 h-2.5 rounded-full bg-red"></motion.div>
                   <span className="text-red text-[14px] font-medium grow text-center animate-pulse">Listening...</span>
                </motion.div>
             ) : (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="flex-1 h-[44px] bg-card border-[0.5px] border-border rounded-full flex items-center px-4 gap-2"
                >
                  <input 
                    type="text" 
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Message AI Twin..." 
                    className="bg-transparent border-none outline-none text-text text-[14px] w-full"
                  />
                  <ImageIcon size={20} className="text-text3 cursor-pointer" />
                </motion.div>
             )}
           </AnimatePresence>

           <button 
             className="w-[44px] h-[44px] rounded-full bg-primary flex items-center justify-center text-white shrink-0 shadow-md"
             onPointerDown={() => !inputText && setIsRecording(true)}
             onPointerUp={() => { if(isRecording) setIsRecording(false); else handleSend(); }}
             onPointerLeave={() => isRecording && setIsRecording(false)}
           >
             {inputText.trim() ? <Send size={18} className="translate-x-0.5" /> : <Mic size={20} />}
           </button>
        </div>
      </div>
    </div>
  );
}
