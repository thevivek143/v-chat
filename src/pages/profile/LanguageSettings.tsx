import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Check, DownloadCloud } from 'lucide-react';
import { mockLanguages } from '../../data/profile.data';

export default function LanguageSettings() {
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
      <div className="sticky top-0 z-20 px-4 pt-6 pb-4 bg-bg/90 backdrop-blur-md flex items-center gap-3 border-b-[0.5px] border-border">
        <motion.div whileTap={{ scale: 0.9 }} onClick={() => navigate(-1)} className="cursor-pointer">
          <ChevronLeft size={24} className="text-text" />
        </motion.div>
        <span className="text-[18px] font-bold text-text">Language & Translation</span>
      </div>

      <div className="px-4 mt-6">
         {/* Primary Language */}
         <div className="mb-8">
            <h3 className="text-[14px] font-bold tracking-wider uppercase text-text3 mb-3">Your primary language</h3>
            <div className="bg-card border-[0.5px] border-border rounded-[20px] p-4 flex justify-between items-center shadow-sm">
               <div className="flex items-center gap-3">
                 <span className="text-[32px]">🇮🇳</span>
                 <span className="text-[18px] font-bold text-text">Telugu</span>
               </div>
               <span className="text-[13px] font-bold text-primary-light cursor-pointer">Change</span>
            </div>
         </div>

         {/* Auto Toggle Settings */}
         <div className="mb-8">
           <h3 className="text-[14px] font-bold tracking-wider uppercase text-text3 mb-3">Auto-Translate Settings</h3>
           <div className="bg-card border-[0.5px] border-border rounded-[20px] flex flex-col shadow-sm">
             {[
               { t: 'Auto-translate incoming messages', on: true },
               { t: 'Show original below translation', on: true },
               { t: 'Translate voice notes', on: true }
             ].map((s, i) => (
                <div key={i} className="flex justify-between items-center p-4 border-b-[0.5px] border-border last:border-none">
                   <span className="text-[14px] font-bold text-text">{s.t}</span>
                   <Toggle on={s.on} />
                </div>
             ))}
             <div className="flex justify-between items-center p-4 border-t-[0.5px] border-border">
                <span className="text-[14px] font-bold text-text">Voice output language</span>
                <span className="text-[13px] font-bold text-primary-light">Telugu ▾</span>
             </div>
           </div>
         </div>

         {/* Offline Packs */}
         <div className="mb-8">
            <h3 className="text-[14px] font-bold tracking-wider uppercase text-text3 mb-1">Offline Translation Packs</h3>
            <span className="text-[12px] font-medium text-text3 mb-4 block">Translate without internet</span>

            <div className="bg-card border-[0.5px] border-border rounded-[20px] flex flex-col shadow-sm overflow-hidden">
               {mockLanguages.map((l, i) => (
                  <div key={l.id} className="flex justify-between items-center p-4 border-b-[0.5px] border-border last:border-none">
                     <div className="flex items-center gap-3">
                        <span className="text-[24px]">{l.flag}</span>
                        <div className="flex flex-col">
                           <span className="text-[15px] font-bold text-text">{l.name}</span>
                           <span className="text-[11px] font-medium text-text3">{l.size}</span>
                        </div>
                     </div>
                     {l.downloaded ? (
                        <div className="w-[28px] h-[28px] rounded-full bg-[rgba(16,185,129,0.15)] flex justify-center items-center">
                           <Check size={14} className="text-[#10B981]" strokeWidth={3} />
                        </div>
                     ) : (
                        <button className="flex items-center gap-1.5 border border-border2 bg-card2 px-3 py-1.5 rounded-[12px]">
                           <DownloadCloud size={14} className="text-text2" />
                           <span className="text-[11px] font-bold text-text2">Download</span>
                        </button>
                     )}
                  </div>
               ))}
            </div>
         </div>

         {/* Fallback Setting */}
         <div className="bg-card border-[0.5px] border-border rounded-[20px] p-4 flex justify-between items-center shadow-sm mb-6">
             <span className="text-[13px] font-medium text-text leading-relaxed pr-4">
               When offline translation confidence is low, use online AI for better accuracy
             </span>
             <Toggle on={true} />
         </div>

      </div>
    </motion.div>
  );
}
