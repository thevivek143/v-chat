import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, MapPin, Navigation } from 'lucide-react';

export default function Rides() {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
      className="absolute inset-0 bg-bg overflow-hidden flex flex-col z-50"
    >
      <div className="absolute top-0 z-20 w-full px-4 pt-6 pb-4 bg-bg/90 backdrop-blur-md flex items-center gap-3">
        <motion.div whileTap={{ scale: 0.9 }} onClick={() => navigate(-1)} className="cursor-pointer">
          <ChevronLeft size={24} className="text-text" />
        </motion.div>
        <span className="text-[18px] font-bold text-text">Vchat Rides</span>
      </div>

      {/* Simulated Map Background */}
      <div className="flex-1 bg-card2 relative overflow-hidden flex items-center justify-center opacity-50">
        <div className="absolute w-[2px] h-full bg-border rotate-45 transform origin-center"></div>
        <div className="absolute w-[2px] h-full bg-border -rotate-45 transform origin-center"></div>
        <div className="text-[40px] z-10 filter blur-[1px]">🗺️ Map View</div>
        <div className="absolute w-20 h-20 bg-[rgba(59,130,246,0.2)] rounded-full blur-xl"></div>
      </div>

      <div className="bg-bg rounded-t-[32px] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] pt-6 pb-10 px-4 relative z-20 -mt-6">
        <div className="w-12 h-1.5 bg-border rounded-full mx-auto mb-6 absolute top-3 left-1/2 -translate-x-1/2"></div>
        
        <h3 className="text-[20px] font-bold text-text mb-6">Where to?</h3>
        
        <div className="flex flex-col gap-0 relative mb-6">
          <div className="absolute left-4 top-5 w-[2px] h-12 bg-border border-dashed"></div>
          
          <div className="flex items-center gap-3 bg-card border-[0.5px] border-border rounded-t-[16px] p-4 text-[14px]">
            <div className="w-2.5 h-2.5 rounded-full bg-[#10B981] z-10 shrink-0"></div>
            <span className="text-text font-bold w-full truncate">Kondapur, Hyderabad</span>
          </div>

          <div className="flex items-center gap-3 bg-card border-[0.5px] border-t-0 border-border rounded-b-[16px] p-4 text-[14px] shadow-sm">
            <div className="w-2.5 h-2.5 bg-red z-10 shrink-0"></div>
            <input type="text" placeholder="Search destination" className="w-full bg-transparent border-none outline-none text-text placeholder:text-text3" />
          </div>
        </div>

        <div className="flex justify-between gap-3 mb-6">
           <div className="flex-1 bg-card border-[0.5px] border-border rounded-[16px] p-3 flex flex-col items-center shadow-sm">
             <span className="text-[32px] mb-1 drop-shadow-md">🛺</span>
             <span className="text-[13px] font-bold text-text">Auto</span>
             <span className="text-[11px] font-medium text-text3">3 min</span>
           </div>
           <div className="flex-1 bg-[rgba(59,130,246,0.1)] border-[0.5px] border-blue-500/30 rounded-[16px] p-3 flex flex-col items-center shadow-md scale-105 relative">
             <div className="absolute top-0 right-0 bg-[#3B82F6] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-bl-[8px] rounded-tr-[16px]">FASTEST</div>
             <span className="text-[32px] mb-1 drop-shadow-md">🚗</span>
             <span className="text-[13px] font-bold text-[#3B82F6]">Cab</span>
             <span className="text-[11px] font-medium text-text3">1 min</span>
           </div>
           <div className="flex-1 bg-card border-[0.5px] border-border rounded-[16px] p-3 flex flex-col items-center shadow-sm">
             <span className="text-[32px] mb-1 drop-shadow-md">🏍️</span>
             <span className="text-[13px] font-bold text-text">Bike</span>
             <span className="text-[11px] font-medium text-text3">5 min</span>
           </div>
        </div>

        <button className="w-full bg-primary text-white font-bold py-4 rounded-[16px] text-[16px] shadow-lg flex justify-center items-center gap-2">
          <Navigation size={18} /> Confirm Cab
        </button>
      </div>
    </motion.div>
  );
}
