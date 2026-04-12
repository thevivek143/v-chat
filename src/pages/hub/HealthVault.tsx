import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ShieldCheck, Eye, Share2, Sparkles, Plus, Calendar } from 'lucide-react';
import { mockMedicalRecords } from '../../data/hub.data';

export default function HealthVault() {
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
          <span className="text-[18px] font-bold text-text">Health Vault</span>
        </div>
        <ShieldCheck size={20} className="text-[#10B981]" />
      </div>

      <div className="px-4 mt-2 mb-6">
        {/* Emergency Card */}
        <div className="relative overflow-hidden rounded-[24px] p-5 shadow-lg mb-8" style={{ background: 'linear-gradient(135deg, #EF4444, #991B1B)' }}>
          <div className="absolute -top-10 -right-10 w-[120px] h-[120px] rounded-full bg-white/10 blur-2xl"></div>
          
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[40px] font-bold text-white tracking-tight leading-none">🩸 B+</span>
              <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-1 rounded-[6px] uppercase tracking-wider backdrop-blur-sm">Emergency Info</span>
            </div>
            <div className="flex flex-col gap-1.5 mb-4 text-[13px] font-medium text-white/90">
               <span>Allergies: <strong className="text-white">Penicillin</strong></span>
               <span>Emergency Contact: <strong className="text-white">Dad +91 9876543210</strong></span>
            </div>
            <button className="w-full bg-white/20 border border-white/30 backdrop-blur-md text-white font-bold py-2.5 rounded-[12px] text-[13px]">
              Share with Doctor
            </button>
          </div>
        </div>

        {/* Recent Reports */}
        <div className="mb-8">
           <h3 className="text-[16px] font-bold text-text mb-4">Recent Reports</h3>
           <div className="flex flex-col gap-4">
             {mockMedicalRecords.map((rec) => (
                <div key={rec.id} className="bg-card border-[0.5px] border-border rounded-[20px] p-4 flex flex-col shadow-sm">
                  <div className="flex gap-4">
                    <div className="w-[48px] h-[48px] rounded-[16px] flex items-center justify-center shrink-0 border-[0.5px] border-border2" style={{ background: rec.bg }}>
                       <span className="text-[22px]">{rec.icon}</span>
                    </div>
                    <div className="flex flex-col py-1 flex-1">
                       <h4 className="text-[15px] font-bold text-text leading-tight mb-0.5">{rec.title}</h4>
                       <span className="text-[12px] font-medium text-text3 mb-2">{rec.date} · {rec.hospital}</span>
                       <div className="flex gap-2">
                         {rec.isAiAnalyzed && (
                           <span className="bg-[rgba(16,185,129,0.15)] text-[#10B981] border-[0.5px] border-[rgba(16,185,129,0.3)] px-2 py-0.5 rounded-[6px] text-[10px] font-bold flex items-center gap-1">
                              <Sparkles size={10} /> AI Explained ✓
                           </span>
                         )}
                       </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-3 mt-3 pt-3 border-t-[0.5px] border-border">
                     <span className="text-[12px] font-bold text-text2 flex items-center gap-1 cursor-pointer"><Share2 size={14}/> Share</span>
                     <span className="text-[12px] font-bold text-primary-light flex items-center gap-1 cursor-pointer"><Eye size={14}/> View</span>
                  </div>

                  {rec.isAiAnalyzed && (
                     <div className="mt-3 bg-[rgba(108,60,225,0.05)] border-[0.5px] border-primary/20 p-3 rounded-[12px]">
                       <div className="flex items-center gap-1.5 mb-1.5">
                         <Sparkles size={14} className="text-primary-light" />
                         <span className="text-[11px] font-bold text-primary-light uppercase">AI Summary</span>
                       </div>
                       <p className="text-[12px] text-text font-medium leading-[1.5]">
                         Your haemoglobin (11.2 g/dL) is slightly below normal range. This may cause mild fatigue. Eat more: spinach, pomegranate, beetroot. Consult doctor if symptoms persist.
                       </p>
                     </div>
                  )}
                </div>
             ))}
           </div>
        </div>

        {/* Medicines */}
        <div className="mb-8">
           <h3 className="text-[16px] font-bold text-text mb-4">Active Medicines</h3>
           <div className="bg-card border-[0.5px] border-border rounded-[20px] flex flex-col p-2 shadow-sm">
             <div className="flex items-center justify-between p-3 border-b-[0.5px] border-border">
                <div className="flex items-center gap-3">
                  <span className="text-[20px]">💊</span>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-text">Dolo 650mg</span>
                    <span className="text-[12px] font-medium text-text3">Take 1 tablet · Morning</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="w-[36px] h-[20px] bg-primary-light rounded-full relative shadow-inner cursor-pointer">
                    <div className="w-[16px] h-[16px] bg-white rounded-full absolute right-1 top-[2px] shadow-sm"></div>
                  </div>
                  <span className="text-[10px] font-bold text-red">5 days left</span>
                </div>
             </div>
           </div>
        </div>

        {/* Appointments */}
        <div>
           <h3 className="text-[16px] font-bold text-text mb-4">Upcoming Appointments</h3>
           <div className="bg-card border-[0.5px] border-border rounded-[20px] p-4 shadow-sm">
             <h4 className="text-[15px] font-bold text-text mb-1">Dr. Venkat (Cardiologist)</h4>
             <span className="text-[12px] font-medium text-text3 flex items-center gap-1.5 mb-3"><Calendar size={12}/> Dec 18 · 10:30 AM · Yashoda Hospital</span>
             <span className="text-[12px] font-bold text-primary-light cursor-pointer">Add to Calendar</span>
           </div>
        </div>

      </div>

      <motion.button 
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-4 bg-primary text-white font-bold p-4 rounded-full shadow-[0_8px_30px_rgb(108,60,225,0.4)] flex items-center justify-center gap-2 z-50 px-6"
      >
        <Plus size={20} /> <span className="text-[14px]">Add Record</span>
      </motion.button>
    </motion.div>
  );
}
