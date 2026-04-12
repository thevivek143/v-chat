import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Calendar as CalendarIcon, Download } from 'lucide-react';

const mockResidents = [
  { flat: 'A-101', name: 'Vivek Vardhan', amount: '₹2,500', status: 'Pending' },
  { flat: 'A-102', name: 'Rahul Kumar', amount: 'Paid', status: 'Paid' },
  { flat: 'A-103', name: 'Priya Desai', amount: 'Paid', status: 'Paid' },
  { flat: 'B-201', name: 'Ankit Sharma', amount: '₹2,500', status: 'Pending' },
  { flat: 'B-202', name: 'Meera Reddy', amount: 'Paid', status: 'Paid' },
];

export default function Maintenance() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');
  const tabs = ['All', 'Paid', 'Pending'];

  return (
    <div className="w-full flex-col flex bg-bg relative min-h-[100dvh]">
      {/* Header */}
      <div className="sticky top-0 z-20 h-[60px] flex items-center justify-between px-3 bg-bg2/80 backdrop-blur-md border-b-[0.5px] border-border shrink-0">
        <div className="flex items-center gap-2">
          <motion.div whileTap={{ scale: 0.9 }} className="p-1 cursor-pointer" onClick={() => navigate(-1)}>
            <ChevronLeft size={24} className="text-text" />
          </motion.div>
          <span className="text-[18px] font-bold text-text">Maintenance</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 bg-card2 rounded-[12px]">
          <CalendarIcon size={14} className="text-text2" />
          <span className="text-[12px] font-medium text-text2">Dec</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-10" style={{ scrollbarWidth: 'none' }}>
        
        {/* Summary Card */}
        <div 
          className="mt-4 rounded-[20px] p-5 flex flex-col relative overflow-hidden shadow-lg"
          style={{ background: 'linear-gradient(135deg, #6C3CE1, #4C1D95)' }}
        >
          {/* subtle mesh decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full blur-2xl transform translate-x-10 -translate-y-10" />
          
          <div className="flex items-center gap-2 mb-4 relative z-10">
            <span className="bg-white/20 px-2.5 py-1 rounded-[8px] text-[11px] font-bold text-white uppercase tracking-wider backdrop-blur-sm border border-white/10">December 2024</span>
          </div>
          
          <div className="flex items-end justify-between relative z-10">
            <div className="flex flex-col">
              <span className="text-[32px] font-bold text-white leading-tight">₹2,500</span>
              <span className="text-[13px] text-white/80 font-medium tracking-wide">Due by Dec 31</span>
            </div>
            
            <motion.button 
              className="bg-white text-[#4C1D95] font-bold px-5 py-2.5 rounded-[12px] text-[13px] shadow-sm"
              whileTap={{ scale: 0.95 }}
            >
              Pay Now
            </motion.button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto py-5 shrink-0" style={{ scrollbarWidth: 'none' }}>
          {tabs.map((tab) => {
            const isActive = tab === activeTab;
            return (
              <div 
                key={tab} 
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-[20px] text-[12px] shrink-0 cursor-pointer transition-colors ${
                  isActive ? 'bg-primary text-white font-medium' : 'bg-transparent text-text2 border-[0.5px] border-border2'
                }`}
              >
                {tab}
              </div>
            );
          })}
        </div>

        {/* Residents List */}
        <h3 className="text-[13px] font-bold text-text3 uppercase tracking-wide mb-3">All Residents (24 flats)</h3>
        
        <div className="bg-card rounded-[16px] border-[0.5px] border-border overflow-hidden flex flex-col shadow-sm mb-6">
          {mockResidents.map((r, i) => (
            <div key={i} className={`flex items-center justify-between p-4 ${i !== mockResidents.length - 1 ? 'border-b-[0.5px] border-border2' : ''}`}>
              <div className="flex flex-col">
                <span className="text-[14px] font-bold text-text">{r.flat}</span>
                <span className="text-[12px] text-text3">{r.name}</span>
              </div>
              
              <div className="flex flex-col items-end gap-1">
                {r.status === 'Paid' ? (
                  <>
                    <span className="text-[13px] font-bold text-green flex items-center gap-1">Paid ✓</span>
                    <span className="text-[10px] bg-green/10 text-green px-2 py-[2px] rounded-[6px]">Receipt</span>
                  </>
                ) : (
                  <>
                    <span className="text-[13px] font-bold text-text">{r.amount}</span>
                    <span className="text-[10px] bg-red/10 text-red px-2 py-[2px] rounded-[6px] font-bold">Pending</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Payment History */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[13px] font-bold text-text3 uppercase tracking-wide">Payment History</h3>
          <Download size={16} className="text-primary-light cursor-pointer" />
        </div>
        
        <div className="flex flex-col gap-2">
          <div className="bg-card2 rounded-[12px] p-4 flex justify-between items-center border-[0.5px] border-border">
            <span className="text-[14px] font-semibold text-text">November 2024</span>
            <span className="text-[12px] text-text3">Paid on Nov 28</span>
          </div>
          <div className="bg-card2 rounded-[12px] p-4 flex justify-between items-center border-[0.5px] border-border">
            <span className="text-[14px] font-semibold text-text">October 2024</span>
            <span className="text-[12px] text-text3">Paid on Oct 30</span>
          </div>
        </div>
        
      </div>
    </div>
  );
}
