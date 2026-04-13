import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Plus, X, Coins } from 'lucide-react';

const mockTasks = [
  { id: 1, title: 'Fix login bug', assignee: 'VK', assigneeBg: '#6C3CE1', priority: '#EF4444', status: 'In Progress', statusColor: '#F59E0B', due: 'Today' },
  { id: 2, title: 'Design new dashboard', assignee: 'AK', assigneeBg: '#06B6D4', priority: '#F59E0B', status: 'To Do', statusColor: '#6B7280', due: 'Dec 15' },
  { id: 3, title: 'Write API docs', assignee: 'MR', assigneeBg: '#10B981', priority: '#10B981', status: 'Done', statusColor: '#10B981', due: 'Dec 10' },
  { id: 4, title: 'Review PR #234', assignee: 'VK', assigneeBg: '#6C3CE1', priority: '#EF4444', status: 'Overdue', statusColor: '#EF4444', due: 'Today', penalty: 50 },
];

export default function WorkTasks() {
  const navigate = useNavigate();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'My Tasks', 'Assigned', 'Done'];

  return (
    <div className="w-full flex-col flex bg-bg relative min-h-[100dvh]">
      {/* Header */}
      <div className="sticky top-0 z-20 h-[60px] flex items-center justify-between px-3 bg-bg2/80 backdrop-blur-md border-b-[0.5px] border-border shrink-0">
        <div className="flex items-center gap-2">
          <motion.div whileTap={{ scale: 0.9 }} className="p-1 cursor-pointer" onClick={() => navigate(-1)}>
            <ChevronLeft size={24} className="text-text" />
          </motion.div>
          <span className="text-[18px] font-bold text-text">Tasks</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 px-2 py-0.5 rounded-full flex items-center gap-1 text-[11px] font-bold">
             <Coins size={12} /> ₹450
          </div>
          <motion.div 
          className="px-3 py-1.5 rounded-[20px] bg-[rgba(108,60,225,0.12)] flex items-center gap-1.5 cursor-pointer border-[0.5px] border-border2"
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsAddOpen(true)}
        >
          <Plus size={16} className="text-primary-light" />
        </motion.div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
        
        {/* Filters */}
        <div className="flex px-4 gap-2 overflow-x-auto py-4 shrink-0" style={{ scrollbarWidth: 'none' }}>
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

        {/* Tasks List */}
        <div className="px-4 pb-20 flex flex-col gap-2.5">
          {mockTasks.map((t) => (
            <motion.div 
              key={t.id}
              whileTap={{ scale: 0.98 }}
              className="bg-card cursor-pointer rounded-[12px] p-[14px] flex flex-col gap-3 shadow-sm"
              style={{ borderLeft: `4px solid ${t.priority}` }}
            >
              <div className="flex justify-between items-start">
                <h3 className="text-[14px] font-bold text-text mb-1 leading-snug">{t.title}</h3>
                <div 
                  className="w-[24px] h-[24px] rounded-full flex items-center justify-center shrink-0"
                  style={{ background: t.assigneeBg }}
                >
                  <span className="text-[9px] font-bold text-white">{t.assignee}</span>
                </div>
              </div>
              
              {t.penalty && (
                <div className="bg-red/10 border border-red/20 text-red text-[11px] font-bold px-2 py-1 rounded-md flex items-center w-max gap-1">
                  <Coins size={12} /> Penalty: ₹{t.penalty} added to Team Fund!
                </div>
              )}

              <div className="flex items-center justify-between border-t border-border pt-2.5">
                <span className="text-[12px] font-medium text-text3">Due: {t.due}</span>
                <span 
                  className="text-[10px] font-bold px-2 py-1 rounded-[8px]"
                  style={{ background: `${t.statusColor}20`, color: t.statusColor }}
                >
                  {t.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Add Task Modal */}
      <AnimatePresence>
        {isAddOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
              className="absolute inset-0 z-40 bg-black/50 backdrop-blur-[2px]" onClick={() => setIsAddOpen(false)}
            />
            <motion.div
              initial={{ y: 300 }} animate={{ y: 0 }} exit={{ y: 300 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="absolute bottom-0 left-0 w-full z-50 bg-card rounded-t-[24px] p-5 pb-8 shadow-2xl border-t border-border"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-[18px] font-bold text-text">New Task</h3>
                <div className="w-8 h-8 rounded-full bg-card2 flex items-center justify-center cursor-pointer" onClick={() => setIsAddOpen(false)}>
                  <X size={18} className="text-text2" />
                </div>
              </div>
              
              <div className="flex flex-col gap-4">
                <input type="text" placeholder="Task Title" className="w-full bg-card2 border-[0.5px] border-border rounded-xl px-4 py-3 text-[14px] text-text outline-none focus:border-primary transition-colors" />
                
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-semibold text-text w-[80px]">Assign to:</span>
                  <div className="flex gap-2">
                     {['VK', 'AK', 'MR'].map((init, i) => (
                       <div key={i} className={`w-[32px] h-[32px] rounded-full flex items-center justify-center cursor-pointer ${i===0 ? 'ring-2 ring-primary bg-[#6C3CE1]' : 'bg-card2 border border-border2 text-text3'}`}>
                         <span className={`text-[11px] font-bold ${i===0 ? 'text-white' : ''}`}>{init}</span>
                       </div>
                     ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-semibold text-text w-[80px]">Priority:</span>
                  <div className="flex gap-2">
                    <span className="px-3 py-1.5 rounded-[12px] bg-[rgba(239,68,68,0.15)] text-red font-bold text-[11px] cursor-pointer ring-1 ring-red/50">High</span>
                    <span className="px-3 py-1.5 rounded-[12px] bg-card2 text-text3 font-bold text-[11px] cursor-pointer">Med</span>
                    <span className="px-3 py-1.5 rounded-[12px] bg-card2 text-text3 font-bold text-[11px] cursor-pointer">Low</span>
                  </div>
                </div>

                <input type="date" className="w-full bg-card2 border-[0.5px] border-border rounded-xl px-4 py-3 text-[14px] text-text outline-none mt-1" />

                <motion.button 
                  className="w-full bg-primary text-white font-bold py-3.5 rounded-xl mt-2 text-[15px] shadow-md"
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsAddOpen(false)}
                >
                  Create Task
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
