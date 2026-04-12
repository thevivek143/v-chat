import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowUpRight, ArrowDownLeft, Globe, Clock, ChevronRight } from 'lucide-react';

export default function Hub() {
  const navigate = useNavigate();
  const [showStatePicker, setShowStatePicker] = useState(false);

  return (
    <div className="w-full flex-col flex bg-bg relative min-h-[100dvh]">
      
      {/* Top Bar */}
      <div className="sticky top-0 z-20 px-4 pt-4 pb-2 bg-bg/90 backdrop-blur-md shrink-0 flex flex-col gap-3">
        <div>
          <span className="text-[22px] font-bold text-text block">Hub</span>
          <span className="text-[12px] text-text3 font-medium">Your digital life</span>
        </div>
        <div className="w-full h-[40px] bg-card border-[0.5px] border-border rounded-[16px] flex items-center px-4 gap-2">
          <Search size={16} className="text-text3" />
          <input 
            type="text" 
            placeholder="Search services..." 
            className="bg-transparent border-none outline-none text-text text-[14px] w-full placeholder:text-text3"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-[100px]" style={{ scrollbarWidth: 'none' }}>
        
        {/* VCHAT PAY CARD */}
        <motion.div 
          onClick={() => navigate('/hub/pay')}
          whileTap={{ scale: 0.95 }}
          className="mx-4 mt-4 relative overflow-hidden rounded-[24px] p-5 cursor-pointer shadow-lg"
          style={{ background: 'linear-gradient(135deg, #4C1D95, #6C3CE1, #5B32CC)' }}
        >
          {/* Decorative Circles */}
          <div className="absolute -top-10 -right-10 w-[120px] h-[120px] rounded-full bg-white/5 blur-2xl"></div>
          <div className="absolute -bottom-8 -left-8 w-[80px] h-[80px] rounded-full bg-white/5 blur-xl"></div>
          
          <div className="relative z-10">
            <span className="text-[12px] text-white/60 font-semibold tracking-wide">Total Balance</span>
            <div className="text-[32px] font-bold text-white tracking-tight mt-1 mb-1">₹24,850.00</div>
            <span className="text-[11px] text-white/50 font-bold tracking-widest uppercase">Vchat Pay</span>

            {/* Action Buttons */}
            <div className="flex justify-between mt-5">
              <div className="flex flex-col items-center gap-1.5" onClick={(e) => { e.stopPropagation(); navigate('/hub/pay/send'); }}>
                <motion.div whileTap={{ scale: 0.9 }} className="w-[40px] h-[40px] rounded-full bg-white/15 flex items-center justify-center">
                  <ArrowUpRight size={20} className="text-white" />
                </motion.div>
                <span className="text-[11px] font-semibold text-white">Send</span>
              </div>
              <div className="flex flex-col items-center gap-1.5" onClick={(e) => { e.stopPropagation(); navigate('/hub/pay/receive'); }}>
                <motion.div whileTap={{ scale: 0.9 }} className="w-[40px] h-[40px] rounded-full bg-white/15 flex items-center justify-center">
                  <ArrowDownLeft size={20} className="text-white" />
                </motion.div>
                <span className="text-[11px] font-semibold text-white">Receive</span>
              </div>
              <div className="flex flex-col items-center gap-1.5" onClick={(e) => { e.stopPropagation(); navigate('/hub/pay/international'); }}>
                <motion.div whileTap={{ scale: 0.9 }} className="w-[40px] h-[40px] rounded-full bg-white/15 flex items-center justify-center">
                  <Globe size={20} className="text-white" />
                </motion.div>
                <span className="text-[11px] font-semibold text-white">Global</span>
              </div>
              <div className="flex flex-col items-center gap-1.5" onClick={(e) => { e.stopPropagation(); navigate('/hub/pay/history'); }}>
                <motion.div whileTap={{ scale: 0.9 }} className="w-[40px] h-[40px] rounded-full bg-white/15 flex items-center justify-center">
                  <Clock size={20} className="text-white" />
                </motion.div>
                <span className="text-[11px] font-semibold text-white">History</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* GOVERNMENT SERVICES */}
        <div className="mt-8 px-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-[16px] font-bold text-text">Government Services</h3>
            <div 
              onClick={() => setShowStatePicker(true)}
              className="bg-[rgba(245,158,11,0.12)] border-[0.5px] border-[rgba(245,158,11,0.3)] px-3 py-1.5 rounded-full flex items-center gap-1 cursor-pointer"
            >
              <span className="text-[11px] font-bold text-amber-500">📍 Telangana ▾</span>
            </div>
          </div>

          <div className="bg-card border-[0.5px] border-border rounded-[24px] p-4 flex flex-wrap gap-y-4 shadow-sm">
            {[
              { icon: '⚡', label: 'Electricity', bg: 'rgba(239,68,68,0.1)', route: '/hub/govt/electricity' },
              { icon: '💧', label: 'Water', bg: 'rgba(6,182,212,0.1)', route: '/hub/govt/water' },
              { icon: '📄', label: 'Certificates', bg: 'rgba(16,185,129,0.1)', route: '/hub/govt/certs' },
              { icon: '🚗', label: 'RTA', bg: 'rgba(245,158,11,0.1)', route: '/hub/govt/rta' },
              { icon: '🪪', label: 'Aadhaar', bg: 'rgba(139,92,246,0.1)', route: '/hub/govt/aadhaar' },
              { icon: '🧾', label: 'Income Tax', bg: 'rgba(236,72,153,0.1)', route: '/hub/govt/tax' },
              { icon: '🛂', label: 'Passport', bg: 'rgba(6,182,212,0.1)', route: '/hub/govt/passport' },
              { icon: '🌾', label: 'Rythu Bandhu', bg: 'rgba(16,185,129,0.1)', route: '/hub/govt/rythu' }
            ].map((app, idx) => (
              <motion.div 
                key={idx}
                whileTap={{ scale: 0.92 }}
                onClick={() => navigate(app.route)}
                className="flex flex-col items-center justify-start gap-1.5 cursor-pointer"
                style={{ width: '25%' }}
              >
                <div className="w-[54px] h-[54px] rounded-[14px] flex items-center justify-center border-[0.5px] border-border/50" style={{ background: app.bg }}>
                  <span className="text-[22px] drop-shadow-sm">{app.icon}</span>
                </div>
                <span className="text-[10px] font-semibold text-text2 text-center leading-tight max-w-[90%]">{app.label}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* DAILY SERVICES */}
        <div className="mt-8 px-4">
          <h3 className="text-[16px] font-bold text-text mb-4">Daily Services</h3>
          <div className="grid grid-cols-2 gap-3">
             <motion.div whileTap={{ scale: 0.95 }} onClick={() => navigate('/hub/food')} className="bg-card border-[0.5px] border-border rounded-[20px] p-4 aspect-square flex flex-col justify-between shadow-sm cursor-pointer relative overflow-hidden">
               <span className="text-[32px] drop-shadow-md z-10">🍔</span>
               <div className="flex flex-col z-10">
                 <span className="text-[14px] font-bold text-text">Food</span>
                 <span className="text-[11px] font-medium text-text3">Order in 30 min</span>
               </div>
               <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-[rgba(245,158,11,0.05)] rounded-full blur-xl"></div>
               <ChevronRight size={16} className="absolute bottom-4 right-4 text-text3 opacity-50" />
             </motion.div>

             <motion.div whileTap={{ scale: 0.95 }} onClick={() => navigate('/hub/shop')} className="bg-card border-[0.5px] border-border rounded-[20px] p-4 aspect-square flex flex-col justify-between shadow-sm cursor-pointer relative overflow-hidden">
               <span className="text-[32px] drop-shadow-md z-10">🛒</span>
               <div className="flex flex-col z-10">
                 <span className="text-[14px] font-bold text-text">Shop</span>
                 <span className="text-[11px] font-medium text-text3">10M+ products</span>
               </div>
               <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-[rgba(139,92,246,0.05)] rounded-full blur-xl"></div>
               <ChevronRight size={16} className="absolute bottom-4 right-4 text-text3 opacity-50" />
             </motion.div>

             <motion.div whileTap={{ scale: 0.95 }} onClick={() => navigate('/hub/rides')} className="bg-card border-[0.5px] border-border rounded-[20px] p-4 aspect-square flex flex-col justify-between shadow-sm cursor-pointer relative overflow-hidden">
               <span className="text-[32px] drop-shadow-md z-10">🚗</span>
               <div className="flex flex-col z-10">
                 <span className="text-[14px] font-bold text-text">Rides</span>
                 <span className="text-[11px] font-medium text-text3">Auto, Cab, Bike</span>
               </div>
               <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-[rgba(59,130,246,0.05)] rounded-full blur-xl"></div>
               <ChevronRight size={16} className="absolute bottom-4 right-4 text-text3 opacity-50" />
             </motion.div>

             <motion.div whileTap={{ scale: 0.95 }} onClick={() => navigate('/hub/travel')} className="bg-card border-[0.5px] border-border rounded-[20px] p-4 aspect-square flex flex-col justify-between shadow-sm cursor-pointer relative overflow-hidden">
               <span className="text-[32px] drop-shadow-md z-10">✈️</span>
               <div className="flex flex-col z-10">
                 <span className="text-[14px] font-bold text-text">Travel</span>
                 <span className="text-[11px] font-medium text-text3">Flights & Hotels</span>
               </div>
               <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-[rgba(16,185,129,0.05)] rounded-full blur-xl"></div>
               <ChevronRight size={16} className="absolute bottom-4 right-4 text-text3 opacity-50" />
             </motion.div>
          </div>
        </div>

        {/* PROFESSIONAL */}
        <div className="mt-8 px-4">
          <h3 className="text-[16px] font-bold text-text mb-4">Professional</h3>
          <div className="bg-card border-[0.5px] border-border rounded-[24px] p-4 flex flex-wrap gap-y-4 shadow-sm">
            {[
              { icon: '💼', label: 'Jobs', bg: 'rgba(59,130,246,0.1)', route: '/hub/jobs' },
              { icon: '🏆', label: 'Hackathons', bg: 'rgba(236,72,153,0.1)', route: '/hub/hackathons' },
              { icon: '🎪', label: 'Events', bg: 'rgba(16,185,129,0.1)', route: '/hub/events' },
              { icon: '🤝', label: 'Network', bg: 'rgba(139,92,246,0.1)', route: '/hub/network' }
            ].map((app, idx) => (
              <motion.div 
                key={idx}
                whileTap={{ scale: 0.92 }}
                onClick={() => navigate(app.route)}
                className="flex flex-col items-center justify-start gap-1.5 cursor-pointer"
                style={{ width: '25%' }}
              >
                <div className="w-[54px] h-[54px] rounded-[14px] flex items-center justify-center border-[0.5px] border-border/50" style={{ background: app.bg }}>
                  <span className="text-[22px] drop-shadow-sm">{app.icon}</span>
                </div>
                <span className="text-[10px] font-semibold text-text2 text-center leading-tight">{app.label}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* TOOLS */}
        <div className="mt-8 px-4">
          <h3 className="text-[16px] font-bold text-text mb-4">Tools</h3>
          <div className="bg-card flex flex-wrap gap-y-4 shadow-sm border-[0.5px] border-border rounded-[24px] p-4">
            {[
              { icon: '📄', label: 'PDF Tools', bg: 'rgba(239,68,68,0.1)', route: '/hub/tools' },
              { icon: '🖼️', label: 'Images', bg: 'rgba(6,182,212,0.1)', route: '/hub/tools' },
              { icon: '📊', label: 'Office', bg: 'rgba(16,185,129,0.1)', route: '/hub/tools' },
              { icon: '🎮', label: 'Games', bg: 'rgba(245,158,11,0.1)', route: '/hub/tools' }
            ].map((app, idx) => (
              <motion.div 
                key={idx}
                whileTap={{ scale: 0.92 }}
                onClick={() => navigate(app.route)}
                className="flex flex-col items-center justify-start gap-1.5 cursor-pointer"
                style={{ width: '25%' }}
              >
                <div className="w-[54px] h-[54px] rounded-[14px] flex items-center justify-center border-[0.5px] border-border/50" style={{ background: app.bg }}>
                  <span className="text-[22px] drop-shadow-sm">{app.icon}</span>
                </div>
                <span className="text-[10px] font-semibold text-text2 text-center leading-tight">{app.label}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* HEALTH & AGRICULTURE */}
        <div className="mt-8 px-4 mb-6">
          <h3 className="text-[16px] font-bold text-text mb-4">Health & More</h3>
          <div className="flex gap-3">
             <motion.div 
               whileTap={{ scale: 0.95 }} 
               onClick={() => navigate('/hub/health')} 
               className="flex-1 rounded-[20px] p-4 flex flex-col justify-between shadow-sm cursor-pointer relative overflow-hidden"
               style={{ background: 'linear-gradient(135deg, #EF4444, #B91C1C)' }}
             >
               <span className="text-[28px] drop-shadow-md z-10 mb-2">❤️</span>
               <div className="flex flex-col z-10">
                 <span className="text-[14px] font-bold text-white">Health Vault</span>
                 <span className="text-[11px] font-medium text-white/70">Medical records</span>
               </div>
             </motion.div>

             <motion.div 
               whileTap={{ scale: 0.95 }} 
               onClick={() => navigate('/hub/agriculture')} 
               className="flex-1 rounded-[20px] p-4 flex flex-col justify-between shadow-sm cursor-pointer relative overflow-hidden"
               style={{ background: 'linear-gradient(135deg, #10B981, #047857)' }}
             >
               <span className="text-[28px] drop-shadow-md z-10 mb-2">🌾</span>
               <div className="flex flex-col z-10">
                 <span className="text-[14px] font-bold text-white">For Farmers</span>
                 <span className="text-[11px] font-medium text-white/70">Prices & schemes</span>
               </div>
             </motion.div>
          </div>
        </div>

      </div>

      {/* State Picker Bottom Sheet */}
      <AnimatePresence>
        {showStatePicker && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-black/60 flex flex-col justify-end"
            onClick={() => setShowStatePicker(false)}
          >
            <motion.div 
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="bg-bg w-full h-[70vh] rounded-t-[24px] p-5 flex flex-col"
              onClick={e => e.stopPropagation()}
            >
              <div className="w-12 h-1.5 bg-border rounded-full mx-auto mb-6"></div>
              <h2 className="text-[18px] font-bold text-text mb-4">Select your state</h2>
              <div className="w-full h-[40px] bg-card border-[0.5px] border-border rounded-[12px] flex items-center px-4 gap-2 mb-4">
                <Search size={16} className="text-text3" />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="bg-transparent border-none outline-none text-text text-[14px] w-full"
                />
              </div>
              <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
                <div className="flex flex-col">
                  {['Central Government', 'Telangana', 'Andhra Pradesh', 'Karnataka', 'Tamil Nadu', 'Maharashtra', 'Delhi', 'Gujarat'].map(state => (
                    <div 
                      key={state}
                      className="py-3 border-b-[0.5px] border-border flex justify-between items-center cursor-pointer"
                      onClick={() => setShowStatePicker(false)}
                    >
                      <span className={`text-[15px] font-medium ${state === 'Telangana' ? 'text-primary' : 'text-text'}`}>{state}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
