import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Hammer } from 'lucide-react';
import { useToastStore } from '../store/toast.store';

export default function Placeholder({ title = 'Coming Soon', desc = 'This feature is currently under active development. Stay tuned for the next update!' }) {
  const navigate = useNavigate();
  const addToast = useToastStore(s => s.addToast);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
      className="absolute inset-0 bg-bg flex flex-col z-[40]"
    >
      <div className="px-4 pt-6 pb-4 flex items-center gap-3 shrink-0">
        <motion.div whileTap={{ scale: 0.9 }} onClick={() => navigate(-1)} className="cursor-pointer p-1 -ml-1">
          <ChevronLeft size={24} className="text-text" />
        </motion.div>
        <span className="text-[18px] font-bold text-text">{title}</span>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center p-6 -mt-10">
         <div className="w-[80px] h-[80px] rounded-[24px] bg-card border-[0.5px] border-border shadow-md flex items-center justify-center mb-6">
            <Hammer size={32} className="text-primary will-change-transform" />
         </div>
         <h2 className="text-[20px] font-bold text-text mb-3 text-center">{title}</h2>
         <p className="text-[14px] font-medium text-text3 text-center mb-10 max-w-[280px] leading-relaxed">
            {desc}
         </p>
         
         <motion.button 
           whileTap={{ scale: 0.95 }}
           onClick={() => addToast('We will notify you when this is ready!', 'info')}
           className="bg-primary hover:bg-primary-light text-white font-bold py-3.5 px-8 rounded-full text-[14px] shadow-lg shadow-[rgba(108,60,225,0.25)] transition-colors w-full max-w-[240px]"
         >
           Notify me
         </motion.button>
      </div>
    </motion.div>
  );
}
