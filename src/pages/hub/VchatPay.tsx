import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ArrowUpRight, ArrowDownLeft, Receipt, ScanLine, Smartphone } from 'lucide-react';
import { useHubStore } from '../../store/hub.store';

export default function VchatPay() {
  const navigate = useNavigate();
  const store = useHubStore();

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
      className="absolute inset-0 bg-bg overflow-y-auto flex flex-col z-50 pb-10"
    >
      <div className="sticky top-0 z-20 px-4 pt-6 pb-4 bg-bg/90 backdrop-blur-md flex items-center gap-3">
        <motion.div whileTap={{ scale: 0.9 }} onClick={() => navigate(-1)} className="cursor-pointer">
          <ChevronLeft size={24} className="text-text" />
        </motion.div>
        <span className="text-[18px] font-bold text-text">Vchat Pay</span>
      </div>

      <div className="px-4 mt-2">
        {/* Balance Card */}
        <div 
          className="relative overflow-hidden rounded-[24px] p-6 shadow-lg mb-6"
          style={{ background: 'linear-gradient(135deg, #4C1D95, #6C3CE1, #5B32CC)' }}
        >
          <div className="absolute -top-10 -right-10 w-[120px] h-[120px] rounded-full bg-white/5 blur-2xl"></div>
          <div className="absolute -bottom-8 -left-8 w-[80px] h-[80px] rounded-full bg-white/5 blur-xl"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            <span className="text-[13px] text-white/70 font-semibold tracking-wide">Available Balance</span>
            <div className="text-[40px] font-bold text-white tracking-tight mt-1 mb-2">₹{store.balance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            <div className="bg-white/10 border border-white/20 rounded-full px-4 py-1.5 backdrop-blur-sm">
              <span className="text-[12px] text-white font-medium">UPI: vivek@vchat</span>
            </div>
          </div>
        </div>

        {/* Quick Actions Row */}
        <div className="bg-card border-[0.5px] border-border rounded-[20px] p-4 flex justify-between mb-8 shadow-sm">
           <div className="flex flex-col items-center gap-1.5 cursor-pointer" onClick={() => navigate('/hub/pay/send')}>
             <div className="w-[48px] h-[48px] rounded-full bg-[rgba(108,60,225,0.1)] flex items-center justify-center border border-[rgba(108,60,225,0.2)]">
               <ArrowUpRight size={22} className="text-primary-light" />
             </div>
             <span className="text-[11px] font-semibold text-text">Send</span>
           </div>
           <div className="flex flex-col items-center gap-1.5 cursor-pointer">
             <div className="w-[48px] h-[48px] rounded-full bg-[rgba(16,185,129,0.1)] flex items-center justify-center border border-[rgba(16,185,129,0.2)]">
               <ArrowDownLeft size={22} className="text-[#10B981]" />
             </div>
             <span className="text-[11px] font-semibold text-text">Receive</span>
           </div>
           <div className="flex flex-col items-center gap-1.5 cursor-pointer">
             <div className="w-[48px] h-[48px] rounded-full bg-[rgba(6,182,212,0.1)] flex items-center justify-center border border-[rgba(6,182,212,0.2)]">
               <Smartphone size={22} className="text-[#06B6D4]" />
             </div>
             <span className="text-[11px] font-semibold text-text">Recharge</span>
           </div>
           <div className="flex flex-col items-center gap-1.5 cursor-pointer">
             <div className="w-[48px] h-[48px] rounded-full bg-[rgba(245,158,11,0.1)] flex items-center justify-center border border-[rgba(245,158,11,0.2)]">
               <Receipt size={22} className="text-[#F59E0B]" />
             </div>
             <span className="text-[11px] font-semibold text-text">Bills</span>
           </div>
        </div>

        {/* UPI QR Code Section */}
        <div className="bg-bg flex flex-col items-center mb-8 border border-border bg-card p-6 rounded-[24px]">
           <h3 className="text-[16px] font-bold text-text mb-4">Your UPI QR</h3>
           <div className="bg-white p-2 rounded-[16px] mb-4">
             {/* Simple structural QR mock using SVG dots pattern */}
             <svg width="180" height="180" viewBox="0 0 100 100">
                <rect width="100" height="100" fill="white" />
                <path d="M10,10 h30 v30 h-30 z M15,15 h20 v20 h-20 z" fill="black" />
                <path d="M60,10 h30 v30 h-30 z M65,15 h20 v20 h-20 z" fill="black" />
                <path d="M10,60 h30 v30 h-30 z M15,65 h20 v20 h-20 z" fill="black" />
                <rect x="50" y="60" width="10" height="10" fill="black" />
                <rect x="70" y="80" width="10" height="10" fill="black" />
                <rect x="80" y="50" width="10" height="10" fill="black" />
                <rect x="60" y="70" width="10" height="10" fill="black" />
                <rect x="30" y="50" width="10" height="10" fill="black" />
                <rect x="45" y="45" width="20" height="20" fill="black" />
             </svg>
           </div>
           <span className="text-[14px] font-bold text-text2 mb-4">vivek@vchat</span>
           <button className="bg-[rgba(108,60,225,0.1)] text-primary-light font-bold py-2 px-6 rounded-full border border-[rgba(108,60,225,0.2)] flex items-center gap-2">
             <ScanLine size={16} /> Share QR
           </button>
        </div>

        {/* Recent Transactions List */}
        <div>
          <h3 className="text-[16px] font-bold text-text mb-4">Recent Transactions</h3>
          <div className="flex flex-col gap-0">
            {store.transactions.map((tx) => (
              <div key={tx.id} className="flex justify-between items-center py-4 border-b-[0.5px] border-border">
                <div className="flex items-center gap-3">
                  <div className="w-[44px] h-[44px] rounded-full bg-card2 border border-border2 flex items-center justify-center text-[20px]">
                    {tx.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[15px] font-bold text-text mb-0.5">{tx.name}</span>
                    <span className="text-[12px] font-medium text-text3">{tx.desc} · {tx.date}</span>
                  </div>
                </div>
                <span className={`text-[15px] font-bold ${tx.isPositive ? 'text-[#10B981]' : 'text-text'}`}>
                  {tx.amount}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  );
}
