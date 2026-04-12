import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, CloudSun, Target, AlertTriangle, MessageCircle, ArrowRight } from 'lucide-react';
import { mockMandiPrices } from '../../data/hub.data';

export default function Agriculture() {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
      className="absolute inset-0 bg-bg overflow-y-auto flex flex-col z-50 pb-24 pt-6"
    >
      <div className="sticky top-0 z-20 px-4 pb-4 bg-bg/90 backdrop-blur-md flex flex-col gap-3 border-b-[0.5px] border-border">
        <div className="flex items-center gap-3">
          <motion.div whileTap={{ scale: 0.9 }} onClick={() => navigate(-1)} className="cursor-pointer">
            <ChevronLeft size={24} className="text-text" />
          </motion.div>
          <div className="flex flex-col">
            <span className="text-[18px] font-bold text-text">Kisan Hub 🌾</span>
            <span className="text-[11px] font-bold text-[#10B981]">For Farmers of India</span>
          </div>
        </div>
        <div className="bg-[rgba(16,185,129,0.12)] border-[0.5px] border-[rgba(16,185,129,0.3)] px-3 py-1.5 rounded-full flex items-center gap-1 w-max">
          <span className="text-[11px] font-bold text-[#10B981]">📍 Nalgonda, Telangana ▾</span>
        </div>
      </div>

      <div className="px-4 mt-4">
        {/* Weather Card */}
        <div className="relative overflow-hidden rounded-[20px] p-5 mb-6 shadow-md" style={{ background: 'linear-gradient(135deg, #3B82F6, #1E3A8A)' }}>
           <div className="absolute top-0 right-0 p-4 opacity-70 transform rotate-12 scale-150"><CloudSun size={80} className="text-white" /></div>
           <div className="relative z-10 flex flex-col items-start bg-black/10 p-4 backdrop-blur-sm rounded-[16px] border border-white/20">
             <span className="text-[42px] font-bold text-white tracking-tight leading-none mb-1 shadow-sm">⛅ 28°C</span>
             <span className="text-[14px] text-white font-bold mb-3">Partly cloudy · Good for spraying</span>
             
             <div className="flex flex-col gap-1 text-[12px] text-white/80 font-medium">
                <span>Rain expected: Dec 18-19</span>
                <span>Frost alert: None this week</span>
             </div>
           </div>
        </div>

        {/* Pest Alert Card */}
        <div className="bg-[#FEF2F2] dark:bg-[rgba(239,68,68,0.1)] border-[0.5px] border-red rounded-[20px] p-4 mb-6 shadow-sm">
           <div className="flex items-start gap-2 mb-2">
             <AlertTriangle size={18} className="text-red mt-0.5 shrink-0" />
             <span className="text-[13px] font-bold text-red leading-tight">Fall Armyworm detected in Nalgonda district this week</span>
           </div>
           <p className="text-[12px] text-text font-medium ml-6 mb-2">
             Treatment: Spray Chlorpyrifos 2.5ml/litre water
           </p>
           <button className="text-[11px] font-bold text-red ml-6 flex items-center gap-1 uppercase tracking-wider">
             See more <ArrowRight size={12} />
           </button>
        </div>

        {/* Mandi Prices */}
        <div className="mb-6">
           <div className="flex justify-between items-end mb-3">
             <h3 className="text-[16px] font-bold text-text">Today's Crop Prices</h3>
             <span className="text-[10px] font-medium text-text3">Updated: 9:00 AM</span>
           </div>
           <span className="text-[11px] font-bold text-primary-light mb-3 block">Nearest Mandi</span>
           
           <div className="bg-card border-[0.5px] border-border rounded-[20px] overflow-hidden shadow-sm">
             <div className="grid grid-cols-3 bg-card2 p-3 border-b-[0.5px] border-border2">
                <span className="text-[11px] font-bold text-text3 uppercase">Crop</span>
                <span className="text-[11px] font-bold text-text3 uppercase text-center">Quintal</span>
                <span className="text-[11px] font-bold text-text3 uppercase text-right">Change</span>
             </div>
             {mockMandiPrices.map((item, i) => (
                <div key={i} className="grid grid-cols-3 p-3 border-b-[0.5px] border-border last:border-none items-center">
                  <span className="text-[13px] font-bold text-text">{item.crop}</span>
                  <span className="text-[13px] font-medium text-text text-center">{item.price}</span>
                  <span className={`text-[12px] font-bold text-right flex items-center justify-end gap-0.5 ${item.isUp ? 'text-[#10B981]' : 'text-red'}`}>
                    {item.change} {item.isUp ? '↑' : '↓'}
                  </span>
                </div>
             ))}
           </div>
        </div>

        {/* Scheme Eligibility */}
        <div className="mb-6">
           <h3 className="text-[16px] font-bold text-text mb-1">Scheme Eligibility</h3>
           <span className="text-[12px] font-medium text-text3 mb-3 block">3 schemes you qualify for:</span>

           <div className="flex flex-col gap-3">
             <div className="bg-card border-[0.5px] border-border rounded-[16px] p-3 flex justify-between items-center shadow-sm">
               <div className="flex flex-col">
                 <span className="text-[14px] font-bold text-text mb-0.5">PM-KISAN</span>
                 <span className="text-[12px] font-bold text-[#10B981]">Benefit: ₹6,000/year</span>
               </div>
               <button className="bg-primary text-white text-[11px] font-bold px-4 py-1.5 rounded-[8px] flex items-center gap-1">Apply <ArrowRight size={10}/></button>
             </div>
             <div className="bg-card border-[0.5px] border-border rounded-[16px] p-3 flex justify-between items-center shadow-sm opacity-70">
               <div className="flex flex-col">
                 <span className="text-[14px] font-bold text-text mb-0.5">Rythu Bandhu</span>
                 <span className="text-[12px] font-bold text-[#10B981]">Benefit: ₹5,000/acre</span>
               </div>
               <span className="text-[11px] font-bold text-[#10B981] px-4 py-1.5 flex items-center gap-1">Applied ✓</span>
             </div>
             <div className="bg-card border-[0.5px] border-border rounded-[16px] p-3 flex justify-between items-center shadow-sm">
               <div className="flex flex-col">
                 <span className="text-[14px] font-bold text-text mb-0.5">Crop Insurance</span>
                 <span className="text-[11px] text-text3 font-medium">Apply before Dec 31</span>
               </div>
               <button className="text-primary-light text-[11px] font-bold px-2 py-1.5 rounded-[8px] flex items-center gap-1">Apply <ArrowRight size={10}/></button>
             </div>
           </div>
        </div>

      </div>

      {/* FAB AI Assistant Chat */}
      <div className="bg-bg/90 backdrop-blur-md p-4 fixed bottom-0 w-full border-t border-border z-50">
         <motion.button 
           whileTap={{ scale: 0.98 }}
           className="w-full bg-[#10B981] text-white font-bold py-3.5 rounded-[12px] flex flex-col justify-center items-center shadow-[0_8px_30px_rgb(16,185,129,0.3)]"
         >
           <span className="flex items-center gap-2 text-[15px]"><MessageCircle size={18}/> Ask Kisan AI 🌱</span>
           <span className="text-[10px] text-white/80 font-medium">Ask about crops, weather, schemes</span>
         </motion.button>
      </div>

    </motion.div>
  );
}
