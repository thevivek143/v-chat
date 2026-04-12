import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Search, Star, Clock } from 'lucide-react';
import { mockRestaurants } from '../../data/hub.data';

export default function FoodDelivery() {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
      className="absolute inset-0 bg-bg overflow-y-auto flex flex-col z-50 pb-10"
    >
      <div className="sticky top-0 z-20 px-4 pt-6 pb-4 bg-bg/90 backdrop-blur-md flex flex-col gap-3 border-b-[0.5px] border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div whileTap={{ scale: 0.9 }} onClick={() => navigate(-1)} className="cursor-pointer">
              <ChevronLeft size={24} className="text-text" />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-[18px] font-bold text-text leading-tight">Vchat Food</span>
              <span className="text-[11px] font-bold text-amber-500">📍 Kondapur, Hyderabad ▾</span>
            </div>
          </div>
        </div>
        <div className="w-full h-[40px] bg-card border-[0.5px] border-border rounded-[12px] flex items-center px-4 gap-2">
          <Search size={16} className="text-text3" />
          <input 
            type="text" 
            placeholder="Search restaurants or dishes" 
            className="bg-transparent border-none outline-none text-text text-[14px] w-full"
          />
        </div>
      </div>

      <div className="px-4 mt-4">
        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-4" style={{ scrollbarWidth: 'none' }}>
           {['🍕 Pizza', '🍛 Biryani', '🍔 Burger', '🌮 Rolls', '🥗 Healthy', '🍰 Desserts'].map((cat, i) => (
             <div key={i} className="bg-card border-[0.5px] border-border rounded-full px-4 py-2 shrink-0 md wmax flex items-center whitespace-nowrap shadow-sm">
               <span className="text-[13px] font-bold text-text">{cat}</span>
             </div>
           ))}
        </div>

        {/* Offer Banner */}
        <div className="relative overflow-hidden rounded-[20px] p-5 mb-6 shadow-md" style={{ background: 'linear-gradient(135deg, #4C1D95, #EC4899)' }}>
           <div className="absolute top-0 right-0 p-4 opacity-20 transform rotate-12 scale-150">🍔</div>
           <div className="relative z-10 flex flex-col items-start">
             <span className="bg-white/20 px-2 py-1 rounded-[6px] text-[10px] font-bold text-white uppercase tracking-widest mb-2 backdrop-blur-md">Ends in 2h 45m</span>
             <span className="text-[24px] font-bold text-white leading-tight mb-1 tracking-tight">50% OFF up to ₹100</span>
             <span className="text-[13px] text-white/80 font-medium">Use code: <span className="font-bold text-white bg-black/20 px-2 py-0.5 rounded-[4px]">VCHAT50</span></span>
           </div>
        </div>

        {/* Restaurants List */}
        <h3 className="text-[16px] font-bold text-text mb-4">Restaurants near you</h3>
        <div className="flex flex-col gap-4">
          {mockRestaurants.map((res) => (
            <div key={res.id} className="bg-card border-[0.5px] border-border rounded-[20px] p-3 flex gap-4 shadow-sm cursor-pointer">
               <div className="w-[90px] h-[90px] rounded-[16px] flex items-center justify-center shrink-0 relative overflow-hidden" style={{ background: res.grad }}>
                 <span className="text-[40px] drop-shadow-md relative z-10">{res.emoji}</span>
                 {res.badge && (
                   <div className="absolute bottom-0 w-full bg-black/60 backdrop-blur-md text-white text-[9px] font-bold text-center py-1 z-20">
                     {res.badge.toUpperCase()}
                   </div>
                 )}
               </div>
               <div className="flex flex-col py-1 justify-between flex-1">
                 <div>
                   <h4 className="text-[15px] font-bold text-text leading-tight mb-0.5">{res.name}</h4>
                   <span className="text-[12px] font-medium text-text3">{res.tags}</span>
                 </div>
                 <div className="flex items-center gap-3">
                   <div className="flex items-center gap-1 bg-[rgba(16,185,129,0.1)] px-2 py-0.5 rounded-[6px]">
                     <Star size={10} className="text-[#10B981] fill-current" />
                     <span className="text-[11px] font-bold text-[#10B981]">{res.rating}</span>
                   </div>
                   <div className="flex items-center gap-1 text-[11px] font-medium text-text2">
                     <Clock size={12} /> {res.time}
                   </div>
                   <span className="text-[11px] font-medium text-text2">• {res.fee}</span>
                 </div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
