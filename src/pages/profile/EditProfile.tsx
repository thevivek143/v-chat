import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';

export default function EditProfile() {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
      className="absolute inset-0 bg-bg overflow-y-auto flex flex-col z-50 pt-6"
    >
      <div className="sticky top-0 z-20 px-4 pb-4 bg-bg/90 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.div whileTap={{ scale: 0.9 }} onClick={() => navigate(-1)} className="cursor-pointer">
            <ChevronLeft size={24} className="text-text" />
          </motion.div>
          <span className="text-[18px] font-bold text-text">Edit Profile</span>
        </div>
        <span className="text-[14px] font-bold text-primary-light cursor-pointer">Save</span>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center p-4">
         <span className="text-[48px] mb-4">🚧</span>
         <h2 className="text-[18px] font-bold text-text mb-2">Edit Profile (Stub)</h2>
         <p className="text-[13px] text-text3 text-center">Implementation under construction</p>
      </div>
    </motion.div>
  );
}
