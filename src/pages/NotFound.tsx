import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
      className="absolute inset-0 bg-bg overflow-hidden flex flex-col items-center justify-center z-50 p-6"
    >
      <motion.div whileTap={{ scale: 0.9 }} onClick={() => navigate(-1)} className="absolute top-6 left-4 cursor-pointer p-2">
        <ChevronLeft size={28} className="text-text" />
      </motion.div>
      
      <span className="text-[72px] mb-6 drop-shadow-lg will-change-transform">🔍</span>
      <h2 className="text-[24px] font-bold text-text mb-2 text-center text-balance">Page not found</h2>
      <p className="text-[14px] font-medium text-text3 text-center mb-10 max-w-[280px]">
        The route you are looking for doesn't exist or has been moved.
      </p>
      
      <button 
        onClick={() => navigate('/')} 
        className="bg-primary text-white font-bold py-3.5 px-8 rounded-full text-[15px] shadow-lg shadow-primary/20 hover:bg-primary-light transition-colors"
      >
        Return Home
      </button>
    </motion.div>
  );
}
