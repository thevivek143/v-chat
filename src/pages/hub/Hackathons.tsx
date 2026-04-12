import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, CalendarPlus } from 'lucide-react';
import { mockHackathons } from '../../data/hub.data';

export default function Hackathons() {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
      className="absolute inset-0 bg-bg overflow-y-auto flex flex-col z-50 pb-20 pt-6"
    >
      <div className="sticky top-0 z-20 px-4 pb-4 bg-bg/90 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.div whileTap={{ scale: 0.9 }} onClick={() => navigate(-1)} className="cursor-pointer">
            <ChevronLeft size={24} className="text-text" />
          </motion.div>
          <span className="text-[18px] font-bold text-text">Hackathons & Events</span>
        </div>
      </div>

      <div className="px-4 mt-2">
        <div className="flex gap-4 border-b border-border mb-6">
           {['Upcoming', 'Registered', 'Past'].map((tab, i) => (
             <span key={i} className={`pb-2 text-[14px] font-bold ${i === 0 ? 'text-primary border-b-2 border-primary' : 'text-text3'}`}>{tab}</span>
           ))}
        </div>

        {/* Featured Banner */}
        <div className="relative overflow-hidden rounded-[20px] p-5 mb-6 shadow-md" style={{ background: 'linear-gradient(135deg, #10B981, #06B6D4)' }}>
           <div className="relative z-10 flex flex-col items-start">
             <span className="text-[20px] font-bold text-white leading-tight mb-1">Smart India Hackathon 2025</span>
             <span className="text-[14px] font-bold text-white bg-black/20 px-2 py-1 rounded-[6px] mb-3 backdrop-blur-md">₹1 Crore Prize Pool</span>
             <span className="text-[11px] text-white/90 font-medium mb-3">Registrations close in 5 days</span>
             <button className="bg-white text-[#10B981] text-[12px] font-bold px-4 py-2 rounded-xl">Register Now</button>
           </div>
        </div>

        <div className="flex flex-col gap-4">
          {mockHackathons.map((hack) => (
             <div key={hack.id} className="bg-card border-[0.5px] border-border rounded-[20px] p-4 shadow-sm relative overflow-hidden">
                <div className="w-[48px] h-[48px] rounded-[16px] flex items-center justify-center mb-3" style={{ background: hack.grad }}>
                  <span className="text-[22px] drop-shadow-md pb-1">{hack.emoji}</span>
                </div>
                
                <h4 className="text-[16px] font-bold text-text leading-tight mb-1">{hack.title}</h4>
                <span className="text-[13px] font-medium text-text2 block mb-2">{hack.org} · {hack.mode}</span>
                
                <div className="bg-[rgba(16,185,129,0.1)] border-[0.5px] border-[#10B981]/30 p-2 rounded-[8px] mb-3">
                  <span className="text-[12px] font-bold text-[#10B981]">{hack.perk}</span>
                </div>

                <div className="flex justify-between items-center text-[11px] font-medium text-text3 mb-4">
                  <span>Team: {hack.members} members</span>
                  <span>Deadline: {hack.deadline}</span>
                </div>

                <button className="w-full bg-primary-light text-white text-[13px] font-bold py-2.5 rounded-[12px]">Register</button>
             </div>
          ))}
        </div>
      </div>

      <motion.button 
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-4 bg-primary text-white font-bold w-[60px] h-[60px] rounded-[24px] shadow-[0_8px_30px_rgb(108,60,225,0.4)] flex items-center justify-center gap-2 z-50 transform rotate-45 hover:rotate-0 transition-transform"
      >
        <CalendarPlus size={24} className="-rotate-45 hover:rotate-0" />
      </motion.button>

    </motion.div>
  );
}
