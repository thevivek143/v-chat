import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Check } from 'lucide-react';

export default function Voting() {
  const navigate = useNavigate();

  return (
    <div className="w-full flex-col flex bg-bg relative min-h-[100dvh]">
      {/* Header */}
      <div className="sticky top-0 z-20 h-[60px] flex items-center justify-between px-3 bg-bg2/80 backdrop-blur-md border-b-[0.5px] border-border shrink-0">
        <div className="flex items-center gap-2">
          <motion.div whileTap={{ scale: 0.9 }} className="p-1 cursor-pointer" onClick={() => navigate(-1)}>
            <ChevronLeft size={24} className="text-text" />
          </motion.div>
          <span className="text-[18px] font-bold text-text">Community Voting</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-10 pt-4" style={{ scrollbarWidth: 'none' }}>
        
        <h3 className="text-[13px] font-bold text-text3 uppercase tracking-wide mb-3">Active Polls</h3>
        
        <div className="flex flex-col gap-4 mb-6">
          {/* Voted Poll */}
          <div className="bg-card rounded-[16px] p-4 flex flex-col shadow-sm border-[0.5px] border-border">
            <h4 className="text-[15px] font-bold text-text mb-1.5 leading-snug">Should we install CCTV at main gate?</h4>
            <div className="flex justify-between items-center text-[11px] text-text3 mb-3">
              <span>Total: 18 votes</span>
              <span className="text-primary font-medium">Ends in 1 day</span>
            </div>
            
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center text-[12px]">
                  <span className="font-semibold text-text flex items-center gap-1.5">
                    Yes <Check size={14} className="text-primary" />
                  </span>
                  <span className="font-bold text-primary">68%</span>
                </div>
                <div className="w-full h-[8px] bg-card2 rounded-[4px] overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: '68%' }} transition={{ duration: 1 }} className="h-full bg-primary rounded-[4px]" />
                </div>
              </div>
              
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center text-[12px]">
                  <span className="font-medium text-text2">No</span>
                  <span className="font-bold text-text2">32%</span>
                </div>
                <div className="w-full h-[8px] bg-card2 rounded-[4px] overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: '32%' }} transition={{ duration: 1 }} className="h-full bg-text3 rounded-[4px]" />
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-3 border-t-[0.5px] border-border2">
              <span className="text-[11px] font-medium text-text3">You voted Yes ✓</span>
            </div>
          </div>

          {/* Unvoted Poll */}
          <div className="bg-card rounded-[16px] p-4 flex flex-col shadow-sm border-[0.5px] border-border">
            <h4 className="text-[15px] font-bold text-text mb-1.5 leading-snug">New parking rule — odd/even days?</h4>
            <div className="flex justify-between items-center text-[11px] text-text3 mb-4">
              <span>Total: 11 votes</span>
              <span className="text-amber font-medium">Ends in 3 days</span>
            </div>
            
            <div className="flex flex-col gap-2.5">
              <motion.button 
                className="w-full bg-card2 border-[0.5px] border-border2 p-3 rounded-[12px] text-[13px] font-medium text-text text-left hover:bg-border transition-colors flex justify-between items-center"
                whileTap={{ scale: 0.98 }}
              >
                <span>Option A (odd/even)</span>
                <span className="text-[11px] text-text3">45%</span>
              </motion.button>
              
              <motion.button 
                className="w-full bg-card2 border-[0.5px] border-border2 p-3 rounded-[12px] text-[13px] font-medium text-text text-left hover:bg-border transition-colors flex justify-between items-center"
                whileTap={{ scale: 0.98 }}
              >
                <span>Option B (keep current)</span>
                <span className="text-[11px] text-text3">55%</span>
              </motion.button>
            </div>
          </div>
        </div>

        <h3 className="text-[13px] font-bold text-text3 uppercase tracking-wide mb-3">Past Polls</h3>
        
        <div className="bg-card2 rounded-[16px] p-4 flex justify-between items-center border-[0.5px] border-border shadow-sm opacity-70">
          <div className="flex flex-col">
            <span className="text-[14px] font-semibold text-text">Speed breaker near B block?</span>
            <span className="text-[12px] text-green font-medium mt-0.5">Passed — Yes 78%</span>
          </div>
          <span className="text-[11px] text-text3 leading-tight text-right">Dec 1<br/>124 votes</span>
        </div>
        
      </div>
    </div>
  );
}
