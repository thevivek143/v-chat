import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Radio, Plus, X, Link as LinkIcon, Zap } from 'lucide-react';
import { contextGroups, directMessages, spaces } from '../data/chat.data';

const FILTER_TABS = ['All', 'Unread', 'Groups', 'Spaces', 'Archived'];

function VchatDropModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="absolute inset-0 z-40 bg-black/50"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: 300 }}
            animate={{ y: 0 }}
            exit={{ y: 300 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="absolute bottom-0 left-0 w-full z-50 bg-card rounded-t-[24px] p-5 pb-8 shadow-2xl border-t border-border"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-[18px] font-bold text-text">Vchat Drop</h3>
                <span className="text-[13px] text-text3">Share without sharing your number</span>
              </div>
              <div 
                className="w-8 h-8 rounded-full bg-card2 flex items-center justify-center cursor-pointer"
                onClick={onClose}
              >
                <X size={18} className="text-text2" />
              </div>
            </div>

            <div className="flex flex-row gap-3">
              <div className="flex-1 bg-card2 rounded-[16px] p-4 flex flex-col gap-2 cursor-pointer items-center text-center">
                <Radio size={24} className="text-green" />
                <span className="text-[13px] font-bold text-text">Nearby</span>
                <span className="text-[11px] text-text3">Bluetooth & WiFi</span>
              </div>
              <div className="flex-1 bg-card2 rounded-[16px] p-4 flex flex-col gap-2 cursor-pointer items-center text-center">
                <LinkIcon size={24} className="text-primary-light" />
                <span className="text-[13px] font-bold text-text">Remote</span>
                <span className="text-[11px] text-text3">Send via link</span>
              </div>
              <div className="flex-1 bg-card2 rounded-[16px] p-4 flex flex-col gap-2 cursor-pointer items-center text-center">
                <Zap size={24} className="text-accent" />
                <span className="text-[13px] font-bold text-text">NFC</span>
                <span className="text-[11px] text-text3">Tap phones</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function Chat() {
  const navigate = useNavigate();
  const [isDropModalOpen, setIsDropModalOpen] = useState(false);

  return (
    <div className="w-full flex-col flex" style={{ minHeight: '100%', scrollbarWidth: 'none', paddingBottom: '80px' }}>
      
      {/* Top Bar */}
      <div className="sticky top-0 z-10 px-4 flex items-center justify-between shrink-0"
           style={{
             position: 'sticky',
             top: 0,
             zIndex: 10,
             height: '56px',
             backdropFilter: 'blur(12px)',
             WebkitBackdropFilter: 'blur(12px)',
             background: 'color-mix(in srgb, var(--bg) 80%, transparent)'
           }}>
        <h1 className="text-[22px] font-bold text-text">Chats</h1>
        <div className="flex items-center gap-3">
          <motion.div 
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-[20px] cursor-pointer"
            style={{ background: 'rgba(108,60,225,0.12)', border: '0.5px solid var(--border2)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsDropModalOpen(true)}
          >
            <Radio size={16} className="text-[#8B5CF6]" />
            <span className="text-[12px] font-medium text-[#8B5CF6]">Drop</span>
          </motion.div>
          
          <motion.div 
            className="w-[36px] h-[36px] rounded-full bg-card2 flex items-center justify-center cursor-pointer"
            whileTap={{ scale: 0.97 }}
          >
            <Search size={18} className="text-text2" />
          </motion.div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mx-4 mt-2 mb-2 bg-card border-[0.5px] border-border rounded-[14px] p-[10px] px-[14px] flex items-center gap-2">
        <Search size={16} className="text-text3 shrink-0" />
        <input 
          type="text" 
          placeholder="Search or @username..." 
          className="bg-transparent outline-none flex-1 text-[13px] text-text placeholder-text3"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex px-4 gap-2 overflow-x-auto py-2 shrink-0" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {FILTER_TABS.map((tab, i) => {
          const isActive = i === 0;
          return (
            <div 
              key={tab} 
              className={`whitespace-nowrap px-4 py-1.5 rounded-[20px] text-[12px] shrink-0 cursor-pointer ${
                isActive 
                  ? 'bg-primary text-white font-medium border border-transparent' 
                  : 'bg-transparent text-text2 border-[0.5px] border-border2'
              }`}
            >
              {tab}
            </div>
          );
        })}
      </div>

      {/* Context Groups */}
      <div className="mt-2 flex flex-col">
        <span className="text-[11px] font-semibold tracking-[0.08em] text-text3 uppercase px-4 mb-2">Context Groups</span>
        {contextGroups.map((group, i) => (
          <motion.div 
            key={group.id}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.05 }}
            className="h-[72px] px-4 flex items-center gap-3 cursor-pointer bg-transparent"
            style={{ borderBottom: '0.5px solid rgba(108,60,225,0.08)' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(`/chat/${group.id}`, { state: group })}
          >
            <div 
              className="w-[48px] h-[48px] rounded-[16px] flex items-center justify-center shrink-0"
              style={{ background: group.gradient }}
            >
              <span className="text-[20px]">{group.emoji}</span>
            </div>
            
            <div className="flex flex-col flex-1 overflow-hidden justify-center h-full">
              <div className="flex items-center gap-2">
                <span className="text-[14px] font-semibold text-text truncate">{group.name}</span>
                <span 
                  className="text-[10px] font-semibold px-2 py-[2px] rounded-[10px] shrink-0"
                  style={{ background: group.tagBg, color: group.tagColor }}
                >
                  {group.tagLabel}
                </span>
              </div>
              <span className="text-[12px] text-text3 truncate mt-0.5">{group.lastMessage}</span>
            </div>
            
            <div className="flex flex-col items-end gap-[4px] shrink-0 mt-0.5">
              <span className="text-[11px] text-text3 leading-none">{group.time}</span>
              {group.unread > 0 && (
                <div 
                  className="min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center"
                  style={{ background: group.badgeBg || 'var(--primary)', color: 'white' }}
                >
                  <span className="text-[10px] font-semibold">{group.unread}</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Direct Messages */}
      <div className="mt-2 flex flex-col">
        <span className="text-[11px] font-semibold tracking-[0.08em] text-text3 uppercase px-4 mb-2 mt-2">Direct Messages</span>
        {directMessages.map((dm, i) => (
          <motion.div 
            key={dm.id}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 + i * 0.05 }}
            className="h-[72px] px-4 flex items-center gap-3 cursor-pointer bg-transparent"
            style={{ borderBottom: '0.5px solid rgba(108,60,225,0.08)' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(`/chat/${dm.id}`, { state: dm })}
          >
            <div className="relative shrink-0">
              <div 
                className="w-[48px] h-[48px] rounded-full flex items-center justify-center shrink-0"
                style={{ background: dm.gradient }}
              >
                <span className="text-[16px] font-bold text-white tracking-widest">{dm.initials}</span>
              </div>
              {dm.isOnline && (
                <div className="absolute bottom-[0px] right-[2px] w-[11px] h-[11px] bg-green rounded-full border-[2px] border-bg"></div>
              )}
            </div>
            
            <div className="flex flex-col flex-1 overflow-hidden justify-center h-full">
              <div className="flex items-center">
                <span className="text-[14px] font-semibold text-text truncate">{dm.name}</span>
                <span className="text-[14px] ml-1 shrink-0">{dm.streak.split(' ')[0]}</span>
              </div>
              <span className="text-[12px] text-text3 truncate mt-0.5">{dm.lastMessage}</span>
            </div>
            
            <div className="flex flex-col items-end gap-[4px] shrink-0 mt-0.5">
              <span className="text-[11px] text-text3 leading-none">{dm.time}</span>
              {dm.unread > 0 && (
                <div 
                  className="min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center"
                  style={{ background: 'var(--primary)', color: 'white' }}
                >
                  <span className="text-[10px] font-semibold">{dm.unread}</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Spaces Section */}
      <div className="mt-2 flex flex-col mb-4 bg-bg">
        <span className="text-[11px] font-semibold tracking-[0.08em] text-text3 uppercase px-4 my-2">Spaces</span>
        {spaces.map(space => (
          <div 
            key={space.id}
            className="mx-4 bg-card border-[0.5px] border-border rounded-[16px] p-3.5 flex items-center gap-3 shadow-sm cursor-pointer"
          >
            <div 
              className="w-[44px] h-[44px] rounded-xl flex items-center justify-center shrink-0"
              style={{ background: space.gradient }}
            >
              <span className="text-[20px]">{space.emoji}</span>
            </div>
            <div className="flex flex-col flex-1">
              <span className="text-[14px] font-semibold text-text">{space.name}</span>
              <span className="text-[12px] text-text3 mt-0.5">{space.subtitle}</span>
            </div>
            <div className="flex flex-col items-end gap-1.5 shrink-0">
               <div className="flex items-center gap-1 px-[8px] py-[2px] rounded-[20px]"
                    style={{ background: 'rgba(16,185,129,0.15)', border: '0.5px solid rgba(16,185,129,0.3)' }}>
                 <div className="w-[5px] h-[5px] bg-[#10B981] rounded-full animate-pulse"></div>
                 <span className="text-[10px] font-semibold text-[#10B981]">LIVE</span>
               </div>
               <motion.button 
                 className="bg-primary text-white text-[12px] font-semibold px-4 py-[5px] rounded-[10px]"
                 whileTap={{ scale: 0.95 }}
               >
                 Join
               </motion.button>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Compose */}
      <motion.div 
        className="fixed bottom-[80px] right-[16px] w-[52px] h-[52px] bg-primary rounded-full flex items-center justify-center cursor-pointer z-10"
        style={{ boxShadow: '0 4px 20px rgba(108,60,225,0.45)' }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => navigate('/chat/new')}
      >
        <Plus size={24} className="text-white" />
      </motion.div>

      <VchatDropModal isOpen={isDropModalOpen} onClose={() => setIsDropModalOpen(false)} />
    </div>
  );
}
