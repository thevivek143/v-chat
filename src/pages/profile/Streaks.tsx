import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { mockStreaks } from '../../data/profile.data';

export default function Streaks() {
  const navigate = useNavigate();
  const [showPicker, setShowPicker] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
      className="absolute inset-0 bg-bg overflow-y-auto flex flex-col z-50 pb-10"
    >
      <div className="sticky top-0 z-20 px-4 pt-6 pb-4 bg-bg/90 backdrop-blur-md flex items-center gap-3 border-b-[0.5px] border-border">
        <motion.div whileTap={{ scale: 0.9 }} onClick={() => navigate(-1)} className="cursor-pointer">
          <ChevronLeft size={24} className="text-text" />
        </motion.div>
        <span className="text-[18px] font-bold text-text">Your Streaks</span>
      </div>

      <div className="px-4 mt-6">
        
        {/* Highlight Summary Card */}
        <div className="relative overflow-hidden rounded-[20px] p-6 text-white mb-8 shadow-md text-center" style={{ background: 'linear-gradient(135deg, #6C3CE1, #EC4899)' }}>
           <span className="text-[28px] mb-2 block drop-shadow-md">🔥</span>
           <h3 className="text-[20px] font-bold leading-tight mb-1">Total Active Streaks: 4</h3>
           <p className="text-[12px] font-medium text-white/90">Longest streak: 47 days with Rahul</p>
        </div>

        {/* All streaks */}
        <div className="flex flex-col gap-6">
          {mockStreaks.map(streak => (
            <div key={streak.id} className="bg-card border-[0.5px] border-border rounded-[24px] p-5 shadow-sm flex flex-col relative overflow-hidden">
               {streak.status !== 'safe' && (
                 <div className="absolute top-0 right-0 bg-red text-white text-[10px] font-bold px-3 py-1 rounded-bl-[16px] animate-pulse">AT RISK</div>
               )}

               <div className="flex gap-4 items-center mb-6">
                 <div className="w-[60px] h-[60px] rounded-[18px] bg-card2 border-[0.5px] border-border2 flex items-center justify-center shrink-0 shadow-inner">
                    <span className="text-[32px]">{streak.emoji}</span>
                 </div>
                 <div className="flex flex-col">
                    <span className="text-[16px] font-bold text-text leading-tight mb-0.5">{streak.participant}</span>
                    <span className="text-[12px] text-primary-light font-medium">{streak.theme} Theme</span>
                 </div>
               </div>

               {/* Progress UI */}
               <div className="bg-[rgba(108,60,225,0.05)] border border-[rgba(108,60,225,0.15)] rounded-[16px] p-4 mb-5">
                  <span className="text-[13px] font-bold text-text mb-2 block text-center">{streak.stage}</span>
                  <div className="w-full bg-border h-3 rounded-full overflow-hidden shadow-inner flex">
                     {/* Stage ticks visualization */}
                     <div className="h-full bg-primary-light rounded-full border-r-[2px] border-bg" style={{ width: '80%' }}></div>
                  </div>
               </div>

               <div className="flex justify-between items-end border-t-[0.5px] border-border pt-4">
                  <div className="flex flex-col">
                     <span className="text-[36px] font-bold text-text leading-none tracking-tight -mb-1">{streak.days}</span>
                     <span className="text-[12px] font-medium text-text3 ml-1">Days</span>
                  </div>
                  <button onClick={() => setShowPicker(true)} className="border border-border2 text-text3 font-bold text-[12px] px-4 py-2 rounded-xl h-max">
                     Change Theme
                  </button>
               </div>
               
               <p className="text-[11px] text-text3 mt-4 text-center">
                 Keep going! Next milestone: Day {streak.days < 50 ? '50' : '100'}
               </p>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {showPicker && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 flex flex-col justify-end px-4 pb-4"
            onClick={() => setShowPicker(false)}
          >
            <motion.div 
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="bg-bg w-full rounded-[24px] p-5 flex flex-col max-h-[80vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
               <h2 className="text-[18px] font-bold text-text mb-4 text-center">Select Theme</h2>
               
               <div className="grid grid-cols-2 gap-3 mb-6">
                 {[
                   { i: '🌱', n: 'Nature' },
                   { i: '⭐', n: 'Space' },
                   { i: '🔥', n: 'Fire' },
                   { i: '💎', n: 'Crystal' },
                   { i: '🐣', n: 'Life' },
                   { i: '🏔️', n: 'Journey' }
                 ].map((t, idx) => (
                    <div key={idx} className={`bg-card rounded-[16px] p-3 border-[1.5px] text-center cursor-pointer ${idx === 0 ? 'border-primary shadow-[0_0_15px_rgba(108,60,225,0.2)]' : 'border-border'}`}>
                       <span className="text-[28px] mb-1 block">{t.i}</span>
                       <span className="text-[13px] font-bold text-text">{t.n}</span>
                       <span className="text-[10px] text-text3 mt-1 block">5 stages</span>
                    </div>
                 ))}
               </div>

               <button onClick={() => setShowPicker(false)} className="w-full bg-primary text-white font-bold py-4 rounded-[16px] text-[16px] shadow-lg">
                  Confirm Selection
               </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
