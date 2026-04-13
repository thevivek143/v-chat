import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Radio, Link as LinkIcon, Zap, Wifi } from 'lucide-react';
import { mockConnections } from '../../data/profile.data';

export default function VchatDrop() {
  const navigate = useNavigate();
  const [inSpace, setInSpace] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
      className="absolute inset-0 bg-bg overflow-y-auto flex flex-col z-50 pb-20 pt-6"
    >
      <div className="sticky top-0 z-20 px-4 pb-4 bg-bg/90 backdrop-blur-md flex items-center gap-3">
        <motion.div whileTap={{ scale: 0.9 }} onClick={() => navigate(-1)} className="cursor-pointer">
          <ChevronLeft size={24} className="text-text" />
        </motion.div>
        <span className="text-[18px] font-bold text-text">Vchat Drop</span>
      </div>

      <div className="px-4 mt-2 flex flex-col gap-6">

        {/* Ephemeral Spaces Card - NEW FEATURE */}
        <div className="relative overflow-hidden rounded-[24px] p-6 shadow-[0_4px_24px_rgba(255,59,48,0.2)] bg-gradient-to-tr from-[#FF3B30] to-[#FF9500] text-white cursor-pointer transition-transform hover:scale-[1.01]" onClick={() => setInSpace(!inSpace)}>
           <div className="absolute top-0 right-0 p-4 opacity-20 transform translate-x-4 -translate-y-4">
              <Wifi size={140} className="text-white" />
           </div>
           
           <div className="relative z-10">
              <div className="bg-white/20 backdrop-blur-md self-start w-max rounded-full p-2.5 mb-5 shadow-inner">
                 <Radio size={24} className="text-white" />
              </div>
              <h2 className="text-[22px] font-bold mb-2">Ephemeral Spaces</h2>
              <p className="text-[14px] text-white/90 mb-5 max-w-[200px]">Create an instant, geo-fenced mesh network right here for you and the people around you.</p>
              
              {inSpace ? (
                  <div className="space-y-3">
                    <div className="p-3 bg-black/20 rounded-xl backdrop-blur-md flex flex-col gap-2">
                       <span className="text-xs font-bold uppercase tracking-wider text-white/80">Space Active</span>
                       <div className="flex gap-2 items-center">
                          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#FF3B30] font-bold text-[10px]">You</div>
                          <div className="w-8 h-8 rounded-full border border-dashed border-white/50 flex items-center justify-center text-white/50 text-[10px]">+</div>
                       </div>
                       <span className="text-[11px] text-white/80">Room will dissolve when participants leave WiFi range.</span>
                    </div>
                    <button className="bg-white/10 text-white font-bold py-3 px-6 rounded-[12px] w-full mt-2" onClick={(e) => { e.stopPropagation(); setInSpace(false); }}>Disband Space</button>
                  </div>
              ) : (
                  <button className="bg-white text-[#FF3B30] font-bold py-3 px-6 rounded-[12px] w-max shadow-sm" onClick={(e) => { e.stopPropagation(); setInSpace(true); }}>
                   Create Nearby Space
                  </button>
              )}
           </div>
        </div>

        {/* Nearby Share Card */}
        <div className="relative overflow-hidden rounded-[24px] p-6 shadow-lg text-white" style={{ background: 'linear-gradient(135deg, #10B981, #047857)' }}>
           <div className="absolute top-0 right-0 p-4 opacity-20 transform translate-x-4 -translate-y-4">
              <Radio size={140} className="text-white" />
           </div>
           
           <div className="relative z-10">
              <span className="bg-white/20 px-3 py-1 rounded-[8px] text-[10px] font-bold uppercase tracking-widest mb-4 inline-block backdrop-blur-sm border border-white/20">Active</span>
              <h2 className="text-[24px] font-bold leading-tight mb-2">Nearby Share</h2>
              <div className="flex flex-col gap-1 text-[13px] font-medium text-white/80 mb-6">
                 <span>Bluetooth & WiFi Direct</span>
                 <span>Works without internet</span>
                 <span>Range: up to 100 meters</span>
              </div>
              <button className="bg-white text-[#047857] font-bold py-3 px-6 rounded-[12px] text-[14px] shadow-sm">
                 Enable Nearby
              </button>
           </div>
        </div>

        {/* Remote Share Card */}
        <div className="relative overflow-hidden rounded-[24px] p-6 shadow-lg text-white" style={{ background: 'linear-gradient(135deg, #6C3CE1, #4C1D95)' }}>
           <div className="relative z-10 flex">
              <div className="flex flex-col flex-1">
                 <h2 className="text-[20px] font-bold leading-tight mb-2 flex items-center gap-2"><LinkIcon size={20} /> Remote Share</h2>
                 <p className="text-[13px] font-medium text-white/70 mb-5 leading-relaxed pr-6">
                   Send to anyone, anywhere via secure encrypted link
                 </p>
                 <button className="bg-white/20 border border-white/30 text-white font-bold py-2.5 px-6 rounded-[12px] text-[13px] backdrop-blur-sm w-max">
                    Create Link
                 </button>
              </div>
           </div>
        </div>

        {/* NFC Card */}
        <div className="relative overflow-hidden rounded-[24px] p-6 shadow-lg text-white" style={{ background: 'linear-gradient(135deg, #06B6D4, #0369A1)' }}>
           <div className="relative z-10 flex items-center justify-between">
              <div className="flex flex-col pr-4">
                 <h2 className="text-[20px] font-bold leading-tight mb-1 flex items-center gap-2"><Zap size={20} /> NFC Tap</h2>
                 <p className="text-[12px] font-medium text-white/80 mb-3">
                   Tap phones to connect instantly. Requires NFC-enabled phone.
                 </p>
                 <button className="text-white font-bold text-[13px] self-start border-b border-dashed border-white/50 pb-0.5 mt-1">
                    Enable NFC
                 </button>
              </div>
              <div className="w-[60px] h-[60px] bg-white/20 rounded-full flex items-center justify-center shrink-0 border border-white/30 backdrop-blur-sm">
                 <span className="text-[24px]">📱</span>
              </div>
           </div>
        </div>

        {/* Recent Drop History */}
        <div className="mt-2">
           <h3 className="text-[14px] font-bold tracking-wider uppercase text-text3 mb-4">Recent Connections via Drop</h3>
           <div className="flex flex-col gap-4">
             {mockConnections.map(c => (
                <div key={c.id} className="flex gap-3 items-center">
                   <div className="w-[48px] h-[48px] rounded-full flex items-center justify-center shrink-0" style={{ background: c.grad }}>
                      <span className="text-[14px] font-bold text-white tracking-widest">{c.initials}</span>
                   </div>
                   <div className="flex flex-col">
                      <span className="text-[15px] font-bold text-text">{c.name}</span>
                      <span className="text-[12px] font-medium text-text3">{c.how}</span>
                   </div>
                </div>
             ))}
           </div>
        </div>

        {/* QR Section */}
        <div className="mt-8 bg-card border-[0.5px] border-border rounded-[24px] p-6 flex flex-col items-center shadow-sm">
           <h3 className="text-[16px] font-bold text-text mb-6">Your Vchat QR</h3>
           
           <div className="w-[180px] h-[180px] bg-white rounded-[16px] flex flex-col items-center justify-center mb-4 border border-[rgba(108,60,225,0.2)] shadow-inner p-2">
              <svg width="100%" height="100%" viewBox="0 0 100 100">
                <rect width="100" height="100" fill="none" />
                {/* Simulated QR pattern mapping */}
                {[...Array(6)].map((_, r) => (
                  <g key={r}>
                    {[...Array(6)].map((_, c) => {
                      if ((r===0&&c===0)||(r===0&&c===5)||(r===5&&c===0)) return <rect key={c} x={c*18+1} y={r*18+1} width="16" height="16" fill="#6C3CE1" rx="4" />;
                      return Math.random() > 0.4 ? <rect key={c} x={c*18+4} y={r*18+4} width="10" height="10" fill="var(--text)" rx="2" /> : null
                    })}
                  </g>
                ))}
                {/* Center Logo Area */}
                <rect x="35" y="35" width="30" height="30" fill="white" />
                <text x="50" y="55" fontSize="20" fontWeight="bold" fill="#6C3CE1" textAnchor="middle">V</text>
              </svg>
           </div>
           
           <span className="text-[15px] font-bold text-text mb-6">@vivek_hyd</span>
           
           <div className="flex gap-4 w-full">
              <button className="flex-1 border-[0.5px] border-border2 bg-card2 text-text font-bold py-3 rounded-[12px] text-[13px]">Save QR</button>
              <button className="flex-1 bg-primary text-white font-bold py-3 rounded-[12px] text-[13px] shadow-md">Share QR</button>
         </div>
        </div>

      </div>
    </motion.div>
  );
}
