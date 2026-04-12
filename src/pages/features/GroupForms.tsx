import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Plus, X, ClipboardList, AlignLeft, List, Star, ToggleLeft } from 'lucide-react';

const mockForms = [
  { id: 1, title: 'December Trip Interest', author: 'Mom', reps: 8, status: 'Open' },
  { id: 2, title: 'Annual Gathering Preferences', author: 'Dad', reps: 5, status: 'Open' },
  { id: 3, title: 'Diwali Menu Requests', author: 'Priya', reps: 12, status: 'Closed' }
];

export default function GroupForms() {
  const navigate = useNavigate();
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <div className="w-full flex-col flex bg-bg relative min-h-[100dvh]">
      {/* Header */}
      <div className="sticky top-0 z-20 h-[60px] flex items-center justify-between px-3 bg-bg2/80 backdrop-blur-md border-b-[0.5px] border-border shrink-0">
        <div className="flex items-center gap-2">
          <motion.div whileTap={{ scale: 0.9 }} className="p-1 cursor-pointer" onClick={() => navigate(-1)}>
            <ChevronLeft size={24} className="text-text" />
          </motion.div>
          <span className="text-[18px] font-bold text-text">Forms</span>
        </div>
        <motion.div 
          className="px-3 py-1.5 rounded-[20px] bg-[rgba(108,60,225,0.12)] flex items-center gap-1.5 cursor-pointer border-[0.5px] border-border2 mr-1"
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsCreateOpen(true)}
        >
          <Plus size={16} className="text-primary-light" />
          <span className="text-[12px] font-semibold text-primary-light">Create Form</span>
        </motion.div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-10 pt-4" style={{ scrollbarWidth: 'none' }}>
        
        <div className="flex flex-col gap-3">
          {mockForms.map((f) => (
            <motion.div 
              key={f.id}
              whileTap={{ scale: 0.98 }}
              className="bg-card cursor-pointer rounded-[16px] p-4 flex flex-col gap-3 shadow-sm border-[0.5px] border-border"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-card2 flex items-center justify-center shrink-0 border border-border2">
                  <ClipboardList size={20} className="text-primary-light" />
                </div>
                <div className="flex flex-col flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-[15px] font-bold text-text leading-snug pr-2">{f.title}</h3>
                    <span 
                      className={`text-[10px] font-bold px-2 py-1 rounded-[6px] shrink-0 ${f.status === 'Open' ? 'bg-[rgba(16,185,129,0.15)] text-[#10B981]' : 'bg-card2 text-text3'}`}
                    >
                      {f.status}
                    </span>
                  </div>
                  <span className="text-[12px] text-text3 mt-0.5">Created by {f.author} • Oct 12</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between border-t-[0.5px] border-border2 pt-3 mt-1">
                <span className="text-[12px] font-medium text-text2">{f.reps} responses</span>
                <button className="bg-primary/10 text-primary font-bold text-[12px] px-4 py-1.5 rounded-[12px]">
                  Fill Form
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Create Form Modal */}
      <AnimatePresence>
        {isCreateOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
              className="absolute inset-0 z-40 bg-black/50 backdrop-blur-[2px]" onClick={() => setIsCreateOpen(false)}
            />
            <motion.div
              initial={{ y: 500 }} animate={{ y: 0 }} exit={{ y: 500 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="absolute bottom-0 left-0 w-full z-50 bg-card rounded-t-[24px] p-5 pb-8 shadow-2xl border-t border-border"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-[18px] font-bold text-text">New Form</h3>
                <div className="w-8 h-8 rounded-full bg-card2 flex items-center justify-center cursor-pointer" onClick={() => setIsCreateOpen(false)}>
                  <X size={18} className="text-text2" />
                </div>
              </div>
              
              <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto pb-4" style={{ scrollbarWidth: 'none' }}>
                <input type="text" placeholder="Form Title" className="w-full bg-transparent border-b border-border py-2 text-[18px] font-bold text-text outline-none focus:border-primary transition-colors placeholder-text3" />
                <input type="text" placeholder="Description (optional)" className="w-full bg-transparent border-b border-border py-2 text-[13px] text-text2 outline-none focus:border-primary transition-colors placeholder-text3" />
                
                <div className="flex flex-col gap-2 mt-2">
                  <span className="text-[12px] font-bold text-text3 uppercase tracking-wider mb-1">Add Question Type</span>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-card2 border-[0.5px] border-border2 rounded-[12px] p-3 flex flex-col items-center gap-1.5 cursor-pointer hover:border-primary">
                      <AlignLeft size={18} className="text-primary-light" />
                      <span className="text-[11px] font-medium text-text">Short Text</span>
                    </div>
                    <div className="bg-card2 border-[0.5px] border-border2 rounded-[12px] p-3 flex flex-col items-center gap-1.5 cursor-pointer hover:border-primary">
                      <List size={18} className="text-cyan-400" />
                      <span className="text-[11px] font-medium text-text">Multiple Choice</span>
                    </div>
                    <div className="bg-card2 border-[0.5px] border-border2 rounded-[12px] p-3 flex flex-col items-center gap-1.5 cursor-pointer hover:border-primary">
                      <Star size={18} className="text-amber-400" />
                      <span className="text-[11px] font-medium text-text">Rating Scale</span>
                    </div>
                    <div className="bg-card2 border-[0.5px] border-border2 rounded-[12px] p-3 flex flex-col items-center gap-1.5 cursor-pointer hover:border-primary">
                      <ToggleLeft size={18} className="text-green-400" />
                      <span className="text-[11px] font-medium text-text">Yes / No</span>
                    </div>
                  </div>
                </div>

                <div className="border-[0.5px] border-border rounded-[16px] p-4 mt-2">
                  <input type="text" placeholder="Question 1..." className="w-full bg-transparent text-[14px] font-medium text-text outline-none mb-3" autoFocus />
                  <div className="h-[1px] w-full bg-border2 mb-3"></div>
                  <span className="text-[12px] text-text3 italic">Short answer text</span>
                </div>

                <motion.button 
                  className="w-full bg-primary text-white font-bold py-3.5 rounded-xl mt-4 text-[15px] shadow-md"
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsCreateOpen(false)}
                >
                  Publish to Group
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
