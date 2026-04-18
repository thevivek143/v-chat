import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Filter, X } from 'lucide-react';
import { useFeaturesStore } from '../../store/features.store';
import { useToastStore } from '../../store/toast.store';

export default function Assignments() {
  const navigate = useNavigate();
  const { assignments, assignmentFilter, setAssignmentFilter, submitAssignment, submissions } = useFeaturesStore();
  const { addToast } = useToastStore();
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<string | null>(null);
  const [submissionText, setSubmissionText] = useState('');

  const tabs = ['All', 'Pending', 'Submitted', 'Graded'];

  const getSubjectColor = (subject: string) => {
    const colors: Record<string, string> = {
      'CS 401': '#3B82F6',
      'DBMS': '#F59E0B',
      'OS': '#10B981',
      'CN': '#8B5CF6',
    };
    return colors[subject] || '#6B7280';
  };

  const getDaysLeft = (dueDate: string) => {
    const due = new Date(dueDate);
    const now = new Date();
    const diff = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  const handleSubmit = () => {
    if (!selectedAssignmentId || !submissionText.trim()) {
      addToast('Please enter submission text', 'warning');
      return;
    }
    submitAssignment(selectedAssignmentId, submissionText);
    addToast('Assignment submitted successfully!', 'success');
    setIsSubmitOpen(false);
    setSubmissionText('');
    setSelectedAssignmentId(null);
  };

  const openSubmitModal = (assignmentId: string) => {
    setSelectedAssignmentId(assignmentId);
    setSubmissionText('');
    setIsSubmitOpen(true);
  };

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
            const isActive = tab === assignmentFilter;
            return (
              <div 
                key={tab} 
                onClick={() => setAssignmentFilter(tab)}
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
          {assignments
            .filter((a) => {
              if (assignmentFilter === 'All') return true;
              return a.status.toLowerCase() === assignmentFilter.toLowerCase();
            })
            .map((a) => {
              const subjectColor = getSubjectColor(a.subject);
              const daysLeft = getDaysLeft(a.dueDate);
              const isSubmitted = a.status === 'submitted' || submissions[a.id];
              
              return (
                <motion.div 
                  key={a.id}
                  whileTap={{ scale: 0.98 }}
                  className="bg-card cursor-pointer rounded-[16px] p-4 flex flex-col gap-2.5 shadow-sm border border-border"
                >
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold px-2 py-1 rounded-[6px]" style={{ background: `${subjectColor}20`, color: subjectColor }}>
                      {a.subject}
                    </span>
                  </div>
                  
                  <div className="flex flex-col">
                    <h3 className="text-[16px] font-bold text-text">{a.title}</h3>
                    <p className="text-[12px] text-text3 mt-0.5 line-clamp-2 leading-snug">{a.description}</p>
                  </div>
                  
                  <div className="flex items-end justify-between mt-1 pt-3 border-t-[0.5px] border-border">
                    <div className="flex flex-col gap-1">
                      <span className="text-[11px] font-medium text-text3">
                        Due: {new Date(a.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
                      </span>
                      {a.status === 'pending' && (
                        <span className={`text-[11px] font-bold ${daysLeft <= 3 ? 'text-red' : 'text-amber'}`}>
                          ⏳ {daysLeft} days left
                        </span>
                      )}
                    </div>
                    
                    {a.status === 'pending' ? (
                      <button 
                        onClick={() => openSubmitModal(a.id)}
                        className="bg-primary text-white text-[12px] font-bold px-4 py-[6px] rounded-[10px]"
                      >
                        Submit
                      </button>
                    ) : a.status === 'submitted' || isSubmitted ? (
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
              );
            })}
        </div>
      </div>

      {/* Submit Assignment Modal */}
      <AnimatePresence>
        {isSubmitOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
              className="absolute inset-0 z-40 bg-black/50" onClick={() => setIsSubmitOpen(false)}
            />
            <motion.div
              initial={{ y: 300 }} animate={{ y: 0 }} exit={{ y: 300 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="absolute bottom-0 left-0 w-full z-50 bg-card rounded-t-[24px] p-5 pb-8"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-[18px] font-bold text-text">Submit Assignment</h3>
                <div className="w-8 h-8 rounded-full bg-card2 flex items-center justify-center cursor-pointer" onClick={() => setIsSubmitOpen(false)}>
                  <X size={18} className="text-text2" />
                </div>
              </div>
              
              <div className="flex flex-col gap-4">
                <textarea 
                  placeholder="Enter your submission..."
                  value={submissionText}
                  onChange={(e) => setSubmissionText(e.target.value)}
                  className="w-full bg-card2 border-[0.5px] border-border rounded-xl px-4 py-3 text-[14px] text-text outline-none focus:border-primary transition-colors min-h-[120px] resize-none"
                />

                <motion.button 
                  className="w-full bg-primary text-white font-bold py-3.5 rounded-xl mt-2 text-[15px]"
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSubmit}
                >
                  Submit Assignment
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
