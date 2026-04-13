import React from 'react';
import { Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import StatusBar from '../StatusBar';
import BottomNav from '../BottomNav';

export default function MainLayout() {
  return (
    <>
      <div className="relative z-[50]">
        <StatusBar />
      </div>
      
      <div className="flex-1 overflow-hidden relative">
        <React.Suspense fallback={<div className="flex-1 bg-bg flex items-center justify-center"><div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div></div>}>
          <Outlet />
        </React.Suspense>
      </div>
      
      <AnimatePresence>
        <motion.div 
          initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }}
          className="absolute bottom-0 w-full z-40 bg-bg/80 backdrop-blur-xl"
        >
          <BottomNav />
        </motion.div>
      </AnimatePresence>
    </>
  );
}