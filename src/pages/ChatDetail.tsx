import { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Globe, Video, Phone, PlusCircle, Image as ImageIcon, Mic, Send, Play, CheckCheck, Check, X, LayoutGrid } from 'lucide-react';
import GroupFeatures from '../components/GroupFeatures';
import { useChatStore } from '../store/chat.store';
import type { DirectMessage, ContextGroup } from '../data/chat.data';

export default function ChatDetail() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
  
  const chatId = id || 'rahul';
  const isGroup = chatId?.startsWith('group-');
  const groupType = isGroup ? (chatId?.split('-')[1] as any) : null;
  
  const routeState = location.state as (DirectMessage | ContextGroup | null);
  
  // Get store data
  const store = useChatStore();
  const messages = store.messages[chatId] ?? [];
  const chat = store.chats.find(c => c.id === chatId);
  
  // Get chat info from store or fallback to route state
  const name = chat?.name || routeState?.name || 'Rahul Kumar';
  const isOnline = chat?.online ?? (routeState && 'isOnline' in routeState ? routeState.isOnline : true);
  const avatarGradient = chat?.gradient || routeState?.gradient || 'linear-gradient(135deg, #6C3CE1, #06B6D4)';
  const initials = chat?.initials || (routeState && 'initials' in routeState ? routeState.initials : 'RK');
  const streaksOrEmoji = chat?.streak || (routeState && 'streak' in routeState ? routeState.streak : null);
  const isEmoji = chat?.emoji || (routeState && 'emoji' in routeState);
  const emoji = chat?.emoji || (isEmoji ? (routeState as ContextGroup).emoji : '💬');

  // Mark as read on mount
  useEffect(() => {
    store.markAsRead(chatId);
  }, [chatId, store]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="w-full flex-col flex bg-bg relative h-full max-h-[100dvh] overflow-hidden">
      
      {/* Header */}
      <div className="sticky top-0 z-20 h-[60px] flex items-center justify-between px-3 bg-bg2/80 backdrop-blur-md border-b-[0.5px] border-border shrink-0">
        <div className="flex items-center gap-2">
          <motion.div 
            whileTap={{ scale: 0.9 }} 
            className="cursor-pointer p-1"
            onClick={() => navigate('/chat')}
          >
            <ChevronLeft size={24} className="text-text cursor-pointer" />
          </motion.div>
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="w-[38px] h-[38px] rounded-full flex items-center justify-center shrink-0 shadow-sm" style={{ background: avatarGradient }}>
                <span className="text-[13px] font-bold text-white tracking-widest">{initials}</span>
              </div>
              {isOnline && (
                <div className="absolute bottom-[0px] right-[0px] w-[11px] h-[11px] bg-green rounded-full border-[2.5px] border-bg2"></div>
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-[15px] font-bold text-text leading-tight">{name}</span>
              <span className={`text-[11px] ${isOnline ? 'text-green font-medium' : 'text-text3'}`}>
                {isOnline ? 'Online' : 'Last seen 2h ago'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 pr-1">
          {isGroup ? (
            <motion.div 
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-[20px] cursor-pointer"
              style={{ background: 'rgba(108,60,225,0.12)', border: '0.5px solid var(--border2)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsFeaturesOpen(true)}
            >
              <LayoutGrid size={14} className="text-primary-light" />
              <span className="text-[12px] font-semibold text-primary-light tracking-wide">Features</span>
            </motion.div>
          ) : (
            <>
              <motion.div 
                className="flex items-center cursor-pointer"
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsTranslating(!isTranslating)}
              >
                {isTranslating ? (
                  <div className="flex items-center gap-1 bg-[rgba(108,60,225,0.12)] rounded-[20px] px-2.5 py-1">
                    <Globe size={14} className="text-primary" />
                    <span className="text-[11px] font-bold text-primary-light uppercase tracking-wider">HI→TE</span>
                  </div>
                ) : (
                   <div className="p-1">
                     <Globe size={20} className="text-text3" />
                   </div>
                )}
              </motion.div>
              <Video size={20} className="text-text2 cursor-pointer" />
              <Phone size={20} className="text-text2 cursor-pointer" />
            </>
          )}
        </div>
      </div>

      {/* Translation Banner */}
      <AnimatePresence>
        {isTranslating && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-[rgba(108,60,225,0.1)] border-b-[0.5px] border-border shrink-0"
          >
            <div className="py-[8px] px-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe size={12} className="text-primary-light" />
                <span className="text-[11px] font-medium text-text2">Translating Hindi → Telugu · Powered by offline AI</span>
              </div>
              <X size={14} className="text-text3 cursor-pointer" onClick={() => setIsTranslating(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 flex flex-col pt-3 pb-[100px]" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        
        {/* Streak Display (only non-group usually) */}
        {!isGroup && streaksOrEmoji && (
          <div className="flex justify-center mb-4 mt-1 shrink-0">
            <span className="text-[11px] font-medium text-text2 bg-card2 py-1 px-3 rounded-[20px] shadow-sm">
              {streaksOrEmoji} streak
            </span>
          </div>
        )}

        {/* Date Divider */}
        <div className="flex items-center justify-center gap-3 my-2 shrink-0">
          <div className="h-[0.5px] bg-border flex-1"></div>
          <span className="text-[11px] text-text3 font-semibold uppercase tracking-wider">Today</span>
          <div className="h-[0.5px] bg-border flex-1"></div>
        </div>

        {/* Messages */}
        <div className="flex flex-col gap-[6px]">
          {messages.map((msg, i) => {
            const isMe = msg.sender === 'me';
            return (
              <motion.div 
                key={msg.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.1, type: 'spring', bounce: 0.3 }}
                className={`flex flex-col w-full ${isMe ? 'items-end' : 'items-start'} mb-0.5 shrink-0`}
              >
                {msg.type === 'text' ? (
                  <div 
                    className={`max-w-[75%] px-[14px] py-[10px] flex flex-col gap-[2px] shadow-sm ${
                      isMe 
                        ? 'bg-[linear-gradient(135deg,#6C3CE1,#5B32CC)] rounded-[18px_4px_18px_18px] text-white' 
                        : 'bg-card2 rounded-[4px_18px_18px_18px] text-text border border-[rgba(255,255,255,0.02)]'
                    }`}
                  >
                    <span className="text-[14px] leading-[1.5]">{msg.text}</span>
                    
                    {/* Translation View */}
                    {!isMe && isTranslating && msg.originalText && (
                      <div className="mt-1 pt-1 border-t-[0.5px] border-border2 flex flex-col gap-1">
                        <span className="text-[11px] text-text3 italic leading-snug mt-0.5">{msg.originalText}</span>
                        <div className="border-[0.5px] border-primary-light/40 rounded-[4px] px-1.5 py-0.5 w-max mt-0.5 bg-primary/10">
                          <span className="text-[9px] text-primary-light font-bold tracking-wide uppercase">
                            Translated from {msg.originalLanguage}
                          </span>
                        </div>
                      </div>
                    )}
                    
                    <div className={`flex items-center justify-end gap-1 mt-0.5 ${isMe ? 'text-white/70' : 'text-text3'}`}>
                      <span className="text-[10px] leading-none font-medium">{msg.time}</span>
                      {isMe && (
                        msg.status === 'read' ? <CheckCheck size={12} className="text-[#22D3EE]" /> 
                        : msg.status === 'delivered' ? <CheckCheck size={12} /> 
                        : <Check size={12} />
                      )}
                    </div>
                  </div>
                ) : (
                  <div 
                    className={`max-w-[75%] px-[14px] py-[10px] flex flex-col gap-2 shadow-sm ${
                      isMe 
                        ? 'bg-[linear-gradient(135deg,#6C3CE1,#5B32CC)] rounded-[18px_4px_18px_18px] text-white' 
                        : 'bg-card2 rounded-[4px_18px_18px_18px] text-text border border-[rgba(255,255,255,0.02)]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <motion.div 
                        whileTap={{ scale: 0.9 }}
                        className="w-[36px] h-[36px] rounded-full flex items-center justify-center cursor-pointer shrink-0"
                        style={{ background: isMe ? 'rgba(255,255,255,0.2)' : 'rgba(108,60,225,0.2)' }}
                      >
                        <Play size={16} className={isMe ? 'text-white ml-0.5' : 'text-primary ml-0.5'} fill="currentColor" />
                      </motion.div>
                      
                      <div className="flex items-center gap-[2px]">
                        {Array.from({ length: 24 }).map((_, idx) => {
                          const height = Math.max(4, 4 + Math.random() * 16);
                          const isPlayed = idx < 8; // mock played portion
                          const bg = isMe 
                            ? (isPlayed ? 'white' : 'rgba(255,255,255,0.4)')
                            : (isPlayed ? '#8B5CF6' : 'rgba(108,60,225,0.4)');
                          return (
                            <motion.div 
                              key={idx}
                              initial={{ height: 4 }}
                              animate={{ height: height }}
                              transition={{ delay: 0.3 + idx * 0.02, duration: 0.3, type: "spring" }}
                              className="w-[2.5px] rounded-[2px]"
                              style={{ background: bg }}
                            />
                          );
                        })}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center w-full">
                      <span className="text-[11px] font-semibold tracking-wide ml-1">{msg.voiceDuration}</span>
                      <div className={`flex items-center gap-1 ${isMe ? 'text-white/70' : 'text-text3'}`}>
                        <span className="text-[10px] leading-none font-medium">{msg.time}</span>
                        {isMe && (
                          msg.status === 'read' ? <CheckCheck size={12} className="text-[#22D3EE]" /> 
                          : msg.status === 'delivered' ? <CheckCheck size={12} /> 
                          : <Check size={12} />
                        )}
                      </div>
                    </div>

                    {!isMe && isTranslating && msg.transcription && (
                      <div className="mt-1 pt-2 border-t-[0.5px] border-border2 flex flex-col gap-1">
                        <span className="text-[12px] text-text2 italic leading-[1.4]">"{msg.transcription}"</span>
                        <div className="border-[0.5px] border-primary-light/40 rounded-[4px] px-1.5 py-0.5 w-max mt-0.5 bg-primary/10">
                          <span className="text-[9px] text-primary-light font-bold tracking-wide uppercase">
                            Transcribed + Translated
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Sticky Input Bar */}
      <div className="absolute bottom-0 w-full flex flex-col bg-bg2/90 backdrop-blur-xl border-t-[0.5px] border-border z-20">
        
        <AnimatePresence>
          {isTranslating && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="w-full flex justify-start px-4 pt-2.5 pb-0"
            >
              <div className="flex items-center gap-1 px-3 py-1 bg-[rgba(108,60,225,0.12)] border-[0.5px] border-border2 rounded-[20px] cursor-pointer">
                <span className="text-[11px] text-primary font-bold tracking-wide">🌐 Hindi → Telugu ▾</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-end gap-2.5 px-4 py-[10px] pb-[16px] max-w-full">
          <div className="flex items-center gap-3 shrink-0 pb-[8px]">
            <PlusCircle size={24} className="text-text3 cursor-pointer hover:text-primary transition-colors" />
            <ImageIcon size={24} className="text-text3 cursor-pointer hover:text-primary transition-colors" />
          </div>
          
          <textarea 
            rows={1}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Message..."
            className="flex-1 bg-card border-[0.5px] border-border rounded-[24px] py-[10px] px-[16px] text-[14px] text-text placeholder-text3 outline-none resize-none leading-tight"
            style={{ minHeight: '40px', maxHeight: '120px' }}
          />

          <motion.div 
            className="w-[40px] h-[40px] mb-[2px] rounded-full bg-primary flex items-center justify-center cursor-pointer shrink-0 shadow-md"
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              if (inputText.trim().length > 0) {
                store.sendMessage(chatId, inputText.trim());
                setInputText('');
                store.simulateReply(chatId);
              }
            }}
          >
            {inputText.trim().length > 0 ? (
              <Send size={18} className="text-white ml-0.5" />
            ) : (
              <Mic size={18} className="text-white" />
            )}
          </motion.div>
        </div>
      </div>

      {isGroup && groupType && (
        <GroupFeatures 
          isOpen={isFeaturesOpen} 
          onClose={() => setIsFeaturesOpen(false)} 
          groupType={groupType} 
          groupName={name}
          groupEmoji={emoji}
        />
      )}

    </div>
  );
}
