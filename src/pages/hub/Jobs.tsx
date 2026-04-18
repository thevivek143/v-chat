import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Sparkles, MapPin, Briefcase, Bookmark } from 'lucide-react';
import { useHubStore } from '../../store/hub.store';
import { useToastStore } from '../../store/toast.store';

export default function Jobs() {
  const navigate = useNavigate();
  const store = useHubStore();
  const toast = useToastStore();
  const [activeTab, setActiveTab] = useState('All');

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
      className="absolute inset-0 bg-bg overflow-y-auto flex flex-col z-50 pb-10"
    >
      <div className="sticky top-0 z-20 px-4 pt-6 pb-2 bg-bg/90 backdrop-blur-md flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <motion.div whileTap={{ scale: 0.9 }} onClick={() => navigate(-1)} className="cursor-pointer">
            <ChevronLeft size={24} className="text-text" />
          </motion.div>
          <div className="flex flex-col">
            <span className="text-[18px] font-bold text-text">Jobs & Careers</span>
            <span className="text-[11px] font-bold text-[#10B981] flex items-center gap-1"><Sparkles size={10}/> AI-matched for you</span>
          </div>
        </div>
      </div>

      <div className="px-4 mt-4">
        {/* Profile Completeness Card */}
        <div className="bg-card border-[0.5px] border-border rounded-[20px] p-4 mb-6 shadow-sm">
           <div className="flex justify-between items-center mb-2">
             <span className="text-[13px] font-bold text-text">Your profile is 75% complete</span>
             <span className="text-[12px] font-bold text-primary-light">75%</span>
           </div>
           <div className="w-full bg-border h-2 rounded-full mb-3 overflow-hidden">
             <div className="bg-primary-light h-full rounded-full" style={{ width: '75%' }}></div>
           </div>
           <p className="text-[11px] text-text3 font-medium">Complete to get better matches</p>
        </div>

        {/* Filter Row */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-2" style={{ scrollbarWidth: 'none' }}>
           {['All', 'Remote', 'Full-time', 'Internship', 'Fresher'].map((filter, i) => (
             <motion.div 
               key={i} 
               whileTap={{ scale: 0.95 }}
               onClick={() => setActiveTab(filter)}
               className={`border-[0.5px] rounded-full px-4 py-1.5 shrink-0 flex items-center shadow-sm cursor-pointer ${activeTab === filter ? 'bg-primary border-primary text-white' : 'bg-card border-border text-text'}`}
             >
               <span className={`text-[12px] font-bold ${activeTab === filter ? 'text-white' : 'text-text'}`}>{filter}</span>
             </motion.div>
           ))}
        </div>

        {/* Job Cards */}
        <div className="flex flex-col gap-4">
          {store.jobs
            .filter(job => activeTab === 'All' || job.type.toLowerCase().includes(activeTab.toLowerCase()))
            .map((job) => (
            <div key={job.id} className="bg-card border-[0.5px] border-border rounded-[20px] p-4 shadow-sm relative overflow-hidden">
               {/* Bookmark button */}
               <motion.div 
                 whileTap={{ scale: 0.9 }}
                 onClick={() => {
                   store.toggleSaveJob(job.id);
                   const isSaved = store.savedJobs.includes(job.id);
                   toast.addToast(isSaved ? 'Removed from saved jobs' : 'Job saved!', 'success');
                 }}
                 className="absolute top-4 right-4 z-10 cursor-pointer"
               >
                 <Bookmark 
                   size={20} 
                   className={store.savedJobs.includes(job.id) ? 'text-primary fill-primary' : 'text-text3'} 
                 />
               </motion.div>
               <div className="absolute top-4 right-4 bg-[rgba(16,185,129,0.15)] text-[#10B981] border-[0.5px] border-[rgba(16,185,129,0.3)] px-2 py-1 rounded-[8px] text-[10px] font-bold flex items-center gap-1">
                  <Sparkles size={10} /> AI Match: {job.matchScore}%
               </div>

               <div className="flex items-start gap-3 mb-4">
                 <div className="w-[48px] h-[48px] rounded-[14px] flex items-center justify-center shrink-0" style={{ background: job.grad }}>
                   <span className="text-[18px] font-bold tracking-widest text-white">{job.company.substring(0,1)}</span>
                 </div>
                 <div className="flex flex-col pr-24">
                   <h4 className="text-[15px] font-bold text-text leading-tight mb-1">{job.title}</h4>
                   <span className="text-[12px] font-medium text-text2 mb-1">{job.company}</span>
                   <div className="flex items-center gap-2 text-[11px] font-semibold text-text3">
                      <span className="flex items-center gap-1"><MapPin size={10} /> {job.loc}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Briefcase size={10} /> {job.type}</span>
                   </div>
                 </div>
               </div>

               <div className="flex items-center gap-2 mb-4">
                  {job.skills.map((skill, i) => (
                    <span key={i} className="bg-card2 border-[0.5px] border-border2 px-2 py-1 rounded-[6px] text-[10px] font-medium text-text2">
                       {skill}
                    </span>
                  ))}
               </div>

               <div className="flex items-center justify-between pt-3 border-t-[0.5px] border-border">
                  <span className="text-[14px] font-bold text-text">{job.salary}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-medium text-text3">{job.posted}</span>
                    {store.appliedJobs.includes(job.id) ? (
                      <span className="bg-[rgba(16,185,129,0.15)] text-[#10B981] text-[12px] font-bold px-5 py-2 rounded-xl border border-[rgba(16,185,129,0.3)]">Applied</span>
                    ) : (
                      <motion.button 
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          store.applyJob(job.id);
                          toast.addToast('Application submitted successfully!', 'success');
                        }}
                        className="bg-primary text-white text-[12px] font-bold px-5 py-2 rounded-xl"
                      >
                        Apply
                      </motion.button>
                    )}
                  </div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
