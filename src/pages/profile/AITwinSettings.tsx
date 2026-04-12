import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Sparkles, Plus } from 'lucide-react';
import { mockMemoryVault } from '../../data/profile.data';

export default function AITwinSettings() {
  const navigate = useNavigate();

  const Toggle = ({ on }: { on: boolean }) => (
    <div className={`w-[40px] h-[22px] rounded-full flex items-center px-1 transition-colors ${on ? 'bg-primary-light' : 'bg-border'}`}>
       <div className={`w-[16px] h-[16px] bg-white rounded-full shadow-sm transition-transform ${on ? 'translate-x-[16px]' : 'translate-x-0'}`}></div>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
      className="absolute inset-0 bg-bg overflow-y-auto flex flex-col z-50 pb-10"
    >
      <div className="sticky top-0 z-20 px-4 pt-6 pb-4 bg-bg/90 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.div whileTap={{ scale: 0.9 }} onClick={() => navigate(-1)} className="cursor-pointer">
            <ChevronLeft size={24} className="text-text" />
          </motion.div>
          <span className="text-[18px] font-bold text-text">AI Twin</span>
        </div>
      </div>

      <div className="px-4 mt-2">
        {/* Status Card */}
        <div className="relative overflow-hidden rounded-[20px] p-6 text-center mb-8 shadow-lg" style={{ background: 'linear-gradient(135deg, #6C3CE1, #06B6D4)' }}>
           <div className="w-[56px] h-[56px] bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-sm border border-white/30">
              <Sparkles size={28} className="text-white" />
           </div>
           <h3 className="text-[18px] font-bold text-white mb-1">Your AI Twin is Active</h3>
           <p className="text-[12px] text-white/80 font-medium mb-4">Learning your patterns since Nov 2024</p>
           <div className="bg-white/20 border border-white/20 rounded-[12px] px-4 py-2 inline-block">
              <span className="text-[14px] font-bold text-white tracking-widest">1,247 INSIGHTS</span>
           </div>
        </div>

        {/* Offline AI */}
        <div className="mb-8">
           <h3 className="text-[14px] font-bold tracking-wider uppercase text-text3 mb-4">Offline AI</h3>
           <div className="bg-card border-[0.5px] border-border rounded-[20px] flex flex-col shadow-sm">
             {[
               { t: 'Personal Memory', d: 'Remembers your important info', on: true },
               { t: 'Smart Replies', d: 'Suggests replies in your style', on: true },
               { t: 'File Intelligence', d: 'Search your local files', on: true },
               { t: 'Translation', d: 'Offline language processing', on: true }
             ].map((s, i) => (
                <div key={i} className="flex justify-between items-center p-4 border-b-[0.5px] border-border last:border-none">
                   <div className="flex flex-col">
                     <span className="text-[15px] font-bold text-text mb-0.5">{s.t}</span>
                     <span className="text-[12px] font-medium text-text3">{s.d}</span>
                   </div>
                   <Toggle on={s.on} />
                </div>
             ))}
           </div>
        </div>

        {/* Online AI */}
        <div className="mb-8">
           <h3 className="text-[14px] font-bold tracking-wider uppercase text-text3 mb-4">Online AI</h3>
           <div className="bg-card border-[0.5px] border-border rounded-[20px] flex flex-col shadow-sm">
             {[
               { t: 'Internet Queries', d: 'Real-time info & news', on: true },
               { t: 'Fact Checking', d: 'Verify news accuracy', on: true }
             ].map((s, i) => (
                <div key={i} className="flex justify-between items-center p-4 border-b-[0.5px] border-border last:border-none">
                   <div className="flex flex-col">
                     <span className="text-[15px] font-bold text-text mb-0.5">{s.t}</span>
                     <span className="text-[12px] font-medium text-text3">{s.d}</span>
                   </div>
                   <Toggle on={s.on} />
                </div>
             ))}
           </div>
        </div>

        {/* AI Memory Vault */}
        <div className="mb-8">
           <h3 className="text-[14px] font-bold tracking-wider uppercase text-text3 mb-2">AI Memory Vault</h3>
           <span className="text-[12px] font-medium text-text3 mb-4 block">Things your AI remembers</span>
           
           <div className="flex flex-col gap-3 mb-4">
             {mockMemoryVault.map(m => (
               <div key={m.id} className="bg-card border-[0.5px] border-border rounded-[14px] p-3 flex gap-3 items-center shadow-sm">
                 <span className="text-[20px]">{m.icon}</span>
                 <span className="text-[13px] font-bold text-text">{m.desc}</span>
               </div>
             ))}
           </div>
           <button className="border border-border2 text-primary-light font-bold text-[13px] py-2 px-4 rounded-[12px] flex items-center justify-center gap-2">
             <Plus size={16} /> Add Memory
           </button>
        </div>

        {/* Proactive Insights */}
        <div className="mb-8">
           <h3 className="text-[14px] font-bold tracking-wider uppercase text-text3 mb-4">Proactive Insights</h3>
           <div className="bg-card border-[0.5px] border-border rounded-[20px] flex flex-col shadow-sm">
             {[
               { t: 'Bill Alerts', on: true },
               { t: 'Birthday Reminders', on: true },
               { t: 'Group Digests', on: true },
               { t: 'Spending Analysis', on: true },
               { t: 'Reconnect Suggestions', on: true }
             ].map((s, i) => (
                <div key={i} className="flex justify-between items-center p-4 border-b-[0.5px] border-border last:border-none">
                   <span className="text-[15px] font-bold text-text">{s.t}</span>
                   <Toggle on={s.on} />
                </div>
             ))}
           </div>
        </div>

        {/* Privacy Note */}
        <div className="bg-[rgba(108,60,225,0.05)] border border-primary/20 rounded-[20px] p-4 text-[13px] font-medium text-primary-light leading-relaxed">
           All AI processing is end-to-end encrypted. Offline AI never leaves your device.
        </div>
      </div>
    </motion.div>
  );
}
