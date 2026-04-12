import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Trash2, Eye } from 'lucide-react';

export default function PrivacyDashboard() {
  const navigate = useNavigate();

  const Toggle = ({ on }: { on: boolean }) => (
    <div className={`w-[40px] h-[22px] rounded-full flex items-center px-1 transition-colors ${on ? 'bg-primary-light' : 'bg-border'}`}>
       <div className={`w-[16px] h-[16px] bg-white rounded-full shadow-sm transition-transform ${on ? 'translate-x-[16px]' : 'translate-x-0'}`}></div>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
      className="absolute inset-0 bg-bg overflow-y-auto flex flex-col z-50 pb-10 pt-6"
    >
      <div className="sticky top-0 z-20 px-4 pb-4 bg-bg/90 backdrop-blur-md flex items-center gap-3">
        <motion.div whileTap={{ scale: 0.9 }} onClick={() => navigate(-1)} className="cursor-pointer">
          <ChevronLeft size={24} className="text-text" />
        </motion.div>
        <span className="text-[18px] font-bold text-text">Privacy Dashboard</span>
      </div>

      <div className="px-4 mt-2">
         {/* Privacy Score Card */}
         <div className="bg-card border-[0.5px] border-border rounded-[24px] p-6 mb-8 flex flex-col items-center shadow-sm relative overflow-hidden">
            <h3 className="text-[14px] font-bold text-text mb-4">Your Privacy Score</h3>
            
            <div className="relative w-[140px] h-[70px] flex justify-center items-end mb-2">
               <svg className="absolute w-full h-[140px] top-0" viewBox="0 0 100 50">
                  <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="var(--border)" strokeWidth="8" strokeLinecap="round" />
                  <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#10B981" strokeWidth="8" strokeLinecap="round" strokeDasharray="125" strokeDashoffset="25" />
               </svg>
               <span className="text-[40px] font-bold text-[#10B981] leading-none z-10 block translate-y-2">82</span>
            </div>
            <span className="text-[12px] font-bold text-text3">/100</span>
            <span className="bg-[rgba(16,185,129,0.1)] text-[#10B981] px-3 py-1 mt-4 rounded-full text-[11px] font-bold">Good privacy settings</span>
         </div>

         {/* Data Categories */}
         <div className="mb-8">
            <h3 className="text-[14px] font-bold tracking-wider uppercase text-text3 mb-3">Data Vchat stores about you</h3>
            
            <div className="bg-card border-[0.5px] border-border rounded-[20px] shadow-sm flex flex-col">
               {[
                 { i: '💬', n: 'Messages', c: '2,847 items' },
                 { i: '📍', n: 'Location History', c: '156 items' },
                 { i: '💰', n: 'Payment Records', c: '43 transactions' },
                 { i: '🤖', n: 'AI Memories', c: '12 items', r: '/me/ai-settings' },
                 { i: '📸', n: 'Shared Media', c: '891 items' },
                 { i: '👥', n: 'Contacts', c: '248 contacts' }
               ].map((d, i) => (
                 <div key={i} className="flex justify-between items-center p-4 border-b-[0.5px] border-border last:border-none">
                    <div className="flex items-center gap-3">
                       <span className="text-[20px]">{d.i}</span>
                       <div className="flex flex-col">
                          <span className="text-[14px] font-bold text-text">{d.n}</span>
                          <span className="text-[11px] font-medium text-text3">{d.c}</span>
                       </div>
                    </div>
                    <div className="flex items-center gap-4">
                       <Eye size={16} className="text-primary-light cursor-pointer" onClick={() => d.r && navigate(d.r)} />
                       <Trash2 size={16} className="text-red/70 cursor-pointer hover:text-red" />
                    </div>
                 </div>
               ))}
            </div>
         </div>

         {/* Stealth Mode */}
         <div className="mb-8">
            <h3 className="text-[14px] font-bold tracking-wider uppercase text-text3 mb-3">Stealth Mode</h3>
            <div className="bg-card border-[0.5px] border-border rounded-[20px] shadow-sm p-4">
               <div className="flex justify-between items-center mb-3">
                 <div className="flex flex-col pr-4">
                    <span className="text-[15px] font-bold text-text mb-0.5">Enable Stealth Mode</span>
                    <span className="text-[12px] font-medium text-text3">Appear offline to specific people</span>
                 </div>
                 <Toggle on={false} />
               </div>
            </div>
         </div>

         {/* Read Receipts */}
         <div className="mb-8">
            <h3 className="text-[14px] font-bold tracking-wider uppercase text-text3 mb-3">Read Receipts</h3>
            <div className="bg-card border-[0.5px] border-border rounded-[20px] shadow-sm flex flex-col">
               <div className="flex justify-between items-center border-b-[0.5px] border-border p-4">
                 <span className="text-[15px] font-bold text-text">Show read receipts</span>
                 <Toggle on={true} />
               </div>
               <div className="flex justify-between items-center p-4 cursor-pointer">
                 <span className="text-[14px] font-bold text-primary-light">Per-contact exceptions</span>
                 <span className="text-[12px] font-medium text-text3">None selected ▾</span>
               </div>
            </div>
         </div>

         {/* Account Actions */}
         <div className="flex flex-col gap-4 mt-8">
            <div className="border border-border2 bg-card2 rounded-[16px] p-4 flex flex-col cursor-pointer items-center justify-center">
               <span className="text-[14px] font-bold text-text mb-1">Download my data</span>
               <span className="text-[11px] text-text3 text-center">Get a copy of everything Vchat has about you</span>
            </div>

            <span className="text-[14px] font-bold text-red text-center w-full py-4 cursor-pointer">Delete Account</span>
         </div>
      </div>
    </motion.div>
  );
}
