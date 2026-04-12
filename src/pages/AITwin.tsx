import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Settings } from 'lucide-react';
import { mockInsights } from '../data/ai.data';
import AIChat from './ai/AIChat';

export default function AITwin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'Insights' | 'Chat'>('Insights');

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
      className="absolute inset-0 bg-bg overflow-hidden flex flex-col z-50"
    >
      <div className="absolute top-0 z-30 w-full px-4 pt-6 pb-2 backdrop-blur-xl border-b-[0.5px] border-border" style={{ background: 'linear-gradient(to bottom, var(--bg) 80%, transparent)' }}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <motion.div whileTap={{ scale: 0.9 }} onClick={() => navigate(-1)} className="cursor-pointer">
              <ChevronLeft size={24} className="text-text" />
            </motion.div>
            <div className="flex flex-col">
               <span className="text-[18px] font-bold text-text">AI Twin</span>
               <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse"></div>
                  <span className="text-[9px] font-bold text-text3 tracking-wider uppercase">Offline + Online</span>
               </div>
            </div>
          </div>
          <Settings size={22} className="text-text3 cursor-pointer" onClick={() => navigate('/me/ai-settings')} />
        </div>

        <div className="flex gap-4">
           {['Insights', 'Chat'].map((tab) => (
             <div key={tab} className="relative pb-2 cursor-pointer px-1" onClick={() => setActiveTab(tab as any)}>
               <span className={`text-[15px] font-bold ${activeTab === tab ? 'text-primary' : 'text-text3'}`}>{tab}</span>
               {activeTab === tab && <motion.div layoutId="aitwinTab" className="absolute bottom-0 left-0 w-full h-[3px] bg-primary rounded-t-lg" />}
             </div>
           ))}
        </div>
      </div>

      <div className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
           {activeTab === 'Insights' ? (
             <motion.div 
               key="insights" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
               className="absolute inset-0 overflow-y-auto pt-[110px] pb-10 px-4"
             >
                {/* Urgent */}
                <div className="mb-6">
                   <h3 className="text-[13px] font-bold tracking-wider uppercase text-red mb-3 ml-1 flex items-center gap-2">
                     <div className="w-1.5 h-4 bg-red rounded-full"></div> Urgent
                   </h3>
                   <div className="flex flex-col gap-3">
                     {mockInsights.urgent.map(item => (
                       <div key={item.id} className="bg-card border-[0.5px] border-border rounded-[16px] p-4 flex justify-between items-center shadow-sm">
                          <div className="flex flex-col pr-4">
                             <span className="text-[14px] font-bold text-text">{item.title}</span>
                             <span className="text-[12px] font-medium text-text3">{item.desc}</span>
                          </div>
                          <button className="bg-[rgba(239,68,68,0.1)] text-red font-bold text-[11px] px-3 py-1.5 rounded-[8px] shrink-0 whitespace-nowrap">{item.action}</button>
                       </div>
                     ))}
                   </div>
                </div>

                {/* Today */}
                <div className="mb-6">
                   <h3 className="text-[13px] font-bold tracking-wider uppercase text-amber-500 mb-3 ml-1 flex items-center gap-2">
                     <div className="w-1.5 h-4 bg-amber-500 rounded-full"></div> Today
                   </h3>
                   <div className="flex flex-col gap-3">
                     {mockInsights.today.map(item => (
                       <div key={item.id} className="bg-card border-[0.5px] border-border rounded-[16px] p-4 flex justify-between items-center shadow-sm">
                          <div className="flex flex-col pr-4">
                             <span className="text-[14px] font-bold text-text">{item.title}</span>
                             <span className="text-[12px] font-medium text-text3">{item.desc}</span>
                          </div>
                          <button className="bg-[rgba(245,158,11,0.1)] text-amber-500 font-bold text-[11px] px-3 py-1.5 rounded-[8px] shrink-0 whitespace-nowrap">{item.action}</button>
                       </div>
                     ))}
                   </div>
                </div>

                {/* Suggestions */}
                <div className="mb-6">
                   <h3 className="text-[13px] font-bold tracking-wider uppercase text-primary-light mb-3 ml-1 flex items-center gap-2">
                     <div className="w-1.5 h-4 bg-primary-light rounded-full"></div> Suggestions
                   </h3>
                   <div className="flex flex-col gap-3">
                     {mockInsights.suggestions.map(item => (
                       <div key={item.id} className="bg-card border-[0.5px] border-border rounded-[16px] p-4 flex flex-col items-start shadow-sm gap-3">
                          <p className="text-[14px] font-medium text-text leading-snug">{item.desc}</p>
                          <button className="bg-[rgba(108,60,225,0.1)] text-primary-light border border-[rgba(108,60,225,0.2)] font-bold text-[11px] px-4 py-2 rounded-[10px] whitespace-nowrap">{item.action}</button>
                       </div>
                     ))}
                   </div>
                </div>

                {/* Summaries */}
                <div className="mb-6">
                   <h3 className="text-[13px] font-bold tracking-wider uppercase text-text3 mb-3 ml-1 flex items-center gap-2">
                     <div className="w-1.5 h-4 bg-border rounded-full"></div> Summaries
                   </h3>
                   <div className="flex flex-col gap-3">
                     {mockInsights.summaries.map(item => (
                       <div key={item.id} className="bg-card border-[0.5px] border-border rounded-[16px] p-4 shadow-sm flex flex-col">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-[14px] font-bold text-text">{item.group}</span>
                            <span className="text-[10px] font-bold text-primary-light">{item.messages}</span>
                          </div>
                          <p className="text-[13px] font-medium text-text2 mb-3 leading-relaxed mt-1">"{item.summary}"</p>
                          <span className="text-[12px] font-bold text-text3 cursor-pointer">{item.action}</span>
                       </div>
                     ))}
                   </div>
                </div>

             </motion.div>
           ) : (
             <motion.div 
               key="chat" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
               className="absolute inset-0"
             >
                <AIChat />
             </motion.div>
           )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
