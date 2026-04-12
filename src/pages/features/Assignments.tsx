import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Filter } from 'lucide-react';

const mockAssignments = [
  { id: 1, subject: 'CS 401', subjectColor: '#3B82F6', title: 'Data Structures Lab', desc: 'Implement AVL Tree with rotations', status: 'Pending', due: 'Dec 15, 11:59 PM', daysLeft: 3 },
  { id: 2, subject: 'DBMS', subjectColor: '#F59E0B', title: 'Assignment 3', desc: 'ER Diagram for hospital system', status: 'Pending', due: 'Dec 18, 11:59 PM', daysLeft: 6 },
  { id: 3, subject: 'OS', subjectColor: '#10B981', title: 'Mini Project', desc: 'Process Scheduling Simulator', status: 'Submitted', due: 'Dec 20, 11:59 PM', grade: null },
  { id: 4, subject: 'CN', subjectColor: '#8B5CF6', title: 'Assignment 1', desc: 'TCP/IP Protocol Analysis', status: 'Graded', due: 'Dec 10, 11:59 PM', grade: 'A / 92%' },
];

export default function Assignments() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');
  const tabs = ['All', 'Pending', 'Submitted', 'Graded'];

  return (
    <div className="w-full flex-col flex bg-bg relative min-h-[100dvh]">
      {/* Header */}
      <div className="sticky top-0 z-20 h-[60px] flex items-center justify-between px-3 bg-bg2/80 backdrop-blur-md border-b-[0.5px] border-border shrink-0">
        <div className="flex items-center gap-2">
          <motion.div whileTap={{ scale: 0.9 }} className="p-1 cursor-pointer" onClick={() => navigate(-1)}>
            <ChevronLeft size={24} className="text-text" />
          </motion.div>
          <span className="text-[18px] font-bold text-text">Assignments</span>
        </div>
        <motion.div whileTap={{ scale: 0.9 }} className="p-2 cursor-pointer">
          <Filter size={20} className="text-text2" />
        </motion.div>
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

        {/* Assignments List */}
        <div className="px-4 pb-10 flex flex-col gap-3">
          {mockAssignments.map((a) => (
            <motion.div 
              key={a.id}
              whileTap={{ scale: 0.98 }}
              className="bg-card cursor-pointer rounded-[16px] p-4 flex flex-col gap-2.5 shadow-sm border border-border"
            >
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-bold px-2 py-1 rounded-[6px]" style={{ background: `${a.subjectColor}20`, color: a.subjectColor }}>
                  {a.subject}
                </span>
              </div>
              
              <div className="flex flex-col">
                <h3 className="text-[16px] font-bold text-text">{a.title}</h3>
                <p className="text-[12px] text-text3 mt-0.5 line-clamp-2 leading-snug">{a.desc}</p>
              </div>
              
              <div className="flex items-end justify-between mt-1 pt-3 border-t-[0.5px] border-border">
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-medium text-text3">Due: {a.due}</span>
                  {a.status === 'Pending' && (
                    <span className={`text-[11px] font-bold ${(a.daysLeft ?? 99) <= 3 ? 'text-red' : 'text-amber'}`}>
                      ⏳ {a.daysLeft} days left
                    </span>
                  )}
                </div>
                
                {a.status === 'Pending' ? (
                  <button className="bg-primary text-white text-[12px] font-bold px-4 py-[6px] rounded-[10px]">
                    Submit
                  </button>
                ) : a.status === 'Submitted' ? (
                  <span className="bg-[rgba(16,185,129,0.15)] text-[#10B981] text-[12px] font-bold px-3 py-[6px] rounded-[10px]">
                    Submitted ✓
                  </span>
                ) : (
                  <span className="bg-[rgba(16,185,129,0.15)] text-[#10B981] text-[12px] font-bold px-3 py-[6px] rounded-[10px]">
                    {a.grade}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
