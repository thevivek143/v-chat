import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ShieldCheck, Check, Sparkles } from 'lucide-react';

export default function ServiceDetail() {
  const navigate = useNavigate();
  const { service } = useParams();
  const [showPaySheet, setShowPaySheet] = useState(false);

  const titleStr = service === 'electricity' ? 'Electricity Bill' : 
                   service === 'water' ? 'Water Bill' : 'Government Service';

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
      className="absolute inset-0 bg-bg overflow-y-auto flex flex-col z-50 pb-10"
    >
      <div className="sticky top-0 z-20 px-4 pt-6 pb-4 bg-bg/90 backdrop-blur-md flex justify-between items-center">
        <div className="flex items-center gap-3">
          <motion.div whileTap={{ scale: 0.9 }} onClick={() => navigate(-1)} className="cursor-pointer">
            <ChevronLeft size={24} className="text-text" />
          </motion.div>
          <span className="text-[18px] font-bold text-text">{titleStr}</span>
        </div>
        <div className="bg-[rgba(245,158,11,0.12)] border-[0.5px] border-[rgba(245,158,11,0.3)] px-3 py-1.5 rounded-full flex items-center gap-1">
          <span className="text-[11px] font-bold text-amber-500">📍 Telangana ▾</span>
        </div>
      </div>

      <div className="px-4 mt-2">
        {/* Consumer Details Card */}
        <div className="bg-card border-[0.5px] border-border rounded-[20px] p-4 mb-4 shadow-sm flex flex-col gap-2">
          <div className="flex items-center justify-between border-b-[0.5px] border-border pb-3 mb-1">
            <span className="text-[12px] font-semibold text-text3">Consumer No:</span>
            <span className="text-[14px] font-bold text-text">1234 5678 90</span>
          </div>
          <div className="flex justify-between items-center text-[13px]">
             <span className="text-text2">Name</span>
             <span className="text-text font-bold">Vivek Vardhan</span>
          </div>
          <div className="flex justify-between items-center text-[13px]">
             <span className="text-text2">Address</span>
             <span className="text-text font-bold">Kondapur, Hyderabad</span>
          </div>
          <div className="flex justify-between items-center text-[13px]">
             <span className="text-text2">Meter</span>
             <span className="text-text font-bold">Single Phase</span>
          </div>
        </div>

        {/* Current Bill Card */}
        <div className="relative overflow-hidden rounded-[24px] p-5 mb-6 shadow-lg border border-[rgba(108,60,225,0.3)]" style={{ background: 'linear-gradient(135deg, #4C1D95, #2A1054)' }}>
           <div className="flex justify-between items-start mb-4">
             <div className="bg-white/10 px-3 py-1 rounded-[8px] text-[12px] font-bold text-white uppercase tracking-wider">
               December 2024
             </div>
             <span className="bg-red px-3 py-1 rounded-[8px] text-[11px] font-bold text-white uppercase tracking-wider">Unpaid</span>
           </div>
           
           <div className="text-[42px] font-bold text-white tracking-tight leading-none mb-1">₹1,340</div>
           <span className="text-[13px] text-white/70 font-medium">Due: Dec 31, 2024</span>

           <div className="mt-4 bg-[rgba(245,158,11,0.2)] border border-[rgba(245,158,11,0.4)] rounded-[12px] p-2.5 flex items-center gap-2">
             <span className="text-[16px]">⚠️</span>
             <span className="text-[12px] text-amber-500 font-bold">15% higher than last month</span>
           </div>

           <button onClick={() => setShowPaySheet(true)} className="w-full bg-white text-[#4C1D95] font-bold py-3.5 rounded-[12px] mt-4 flex justify-center items-center gap-2 shadow-md">
             <ShieldCheck size={18} /> Pay Now
           </button>
        </div>

        {/* AI Insight */}
        <div className="bg-[rgba(108,60,225,0.05)] border border-primary/30 rounded-[20px] p-4 mb-6 relative overflow-hidden">
           <div className="absolute -right-4 -top-4 text-[60px] opacity-10">🤖</div>
           <div className="flex items-center gap-2 mb-2">
             <Sparkles size={16} className="text-primary-light" />
             <span className="text-[13px] font-bold text-primary-light uppercase tracking-wider">AI Insight</span>
           </div>
           <p className="text-[14px] text-text font-medium leading-relaxed z-10 relative">
             Your usage peaks on weekends. Running AC at 24°C instead of 22°C can save <span className="text-primary-light font-bold">~₹200/month</span>.
           </p>
        </div>

        {/* Eligibility Header */}
        <div className="bg-card border-[0.5px] border-[#10B981]/30 rounded-[20px] p-4 mb-6 shadow-sm">
           <span className="block text-[14px] font-bold text-text mb-2 text-center">
             You may be eligible for subsidized rates under Telangana Free Power Scheme
           </span>
           <button className="w-full border border-[#10B981] text-[#10B981] font-bold py-2 rounded-[12px]">Check Eligibility</button>
        </div>

        {/* Bill History */}
        <div>
           <h3 className="text-[16px] font-bold text-text mb-4">Payment History</h3>
           <div className="flex flex-col gap-3">
              {[
                { m: 'Nov', u: '312 units', a: '₹1,163' },
                { m: 'Oct', u: '298 units', a: '₹1,110' },
                { m: 'Sep', u: '341 units', a: '₹1,271' }
              ].map((h, i) => (
                <div key={i} className="flex justify-between items-center bg-card border-[0.5px] border-border rounded-[16px] p-4">
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-text">{h.m} 2024</span>
                    <span className="text-[12px] text-text3 font-medium">{h.u}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[14px] font-bold text-text">{h.a}</span>
                    <span className="text-[11px] font-bold text-[#10B981] flex items-center gap-1"><Check size={10}/> Paid</span>
                  </div>
                </div>
              ))}
           </div>
        </div>
      </div>

      <AnimatePresence>
        {showPaySheet && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-black/60 flex flex-col justify-end px-4 pb-4"
            onClick={() => setShowPaySheet(false)}
          >
            <motion.div 
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="bg-bg w-full rounded-[24px] p-5 flex flex-col"
              onClick={e => e.stopPropagation()}
            >
               <h2 className="text-[18px] font-bold text-text mb-4 text-center">Confirm Payment</h2>
               <div className="text-[40px] font-bold text-text tracking-tight text-center mb-6">₹1,340</div>
               
               <div className="flex flex-col gap-3 mb-6">
                 <div className="bg-[rgba(108,60,225,0.1)] border border-[rgba(108,60,225,0.3)] rounded-[16px] p-4 flex items-center justify-between cursor-pointer">
                    <span className="text-[15px] font-bold text-primary-light">Vchat Pay Balance</span>
                    <span className="text-[15px] font-bold text-text">₹24,850.00</span>
                 </div>
               </div>

               <button className="w-full bg-primary text-white font-bold py-4 rounded-[16px] text-[16px]">
                  Pay ₹1,340
               </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
