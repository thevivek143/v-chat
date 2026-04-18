import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Lock, Search } from 'lucide-react';
import { useProfileStore } from '../../store/profile.store';

const weekTabs = ['This Week', 'This Month', '2024', 'All'];

export default function Moments() {
  const navigate = useNavigate();
  const store = useProfileStore();
  const [selectedTab, setSelectedTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMoments = useMemo(() => {
    let moments = store.moments;
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      moments = moments.filter(m => 
        m.title.toLowerCase().includes(query) || 
        m.subtitle.toLowerCase().includes(query)
      );
    }
    
    return moments;
  }, [store.moments, searchQuery]);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
      className="absolute inset-0 bg-bg overflow-y-auto flex flex-col z-50 pb-10"
    >
      <div className="sticky top-0 z-20 px-4 pt-6 pb-2 bg-bg/90 backdrop-blur-md flex flex-col gap-2 border-b-[0.5px] border-border">
        <div className="flex items-center gap-3">
          <motion.div whileTap={{ scale: 0.9 }} onClick={() => navigate(-1)} className="cursor-pointer">
            <ChevronLeft size={24} className="text-text" />
          </motion.div>
          <div className="flex flex-col">
            <span className="text-[18px] font-bold text-text">Your Moments</span>
            <span className="text-[11px] font-medium text-text3 flex items-center gap-1"><Lock size={10}/> Private · Only you can see this</span>
          </div>
        </div>

        <div className="flex gap-4 mt-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
           {weekTabs.map((tab, i) => (
             <span 
               key={i} 
               onClick={() => setSelectedTab(i)}
               className={`text-[14px] font-bold shrink-0 pb-1 cursor-pointer transition-colors ${i === selectedTab ? 'text-text border-b-2 border-primary' : 'text-text3 hover:text-text2'}`}
             >
               {tab}
             </span>
           ))}
        </div>
      </div>

      <div className="px-4 mt-6">
         {/* Feature Card */}
         <div className="relative overflow-hidden rounded-[20px] p-5 shadow-lg text-white mb-8" style={{ background: 'linear-gradient(135deg, #10B981, #0E7490)' }}>
            <span className="bg-black/20 px-3 py-1 rounded-[8px] text-[10px] font-bold uppercase tracking-widest mb-4 inline-block backdrop-blur-sm border border-white/20">Week of Dec 9-15, 2024</span>
            
            <div className="grid grid-cols-2 gap-3 mb-4">
               <div className="bg-black/10 border border-white/10 rounded-[12px] p-2 flex items-center gap-2">
                 <span className="text-[16px]">🗓️</span><span className="text-[11px] font-bold">2 events attended</span>
               </div>
               <div className="bg-black/10 border border-white/10 rounded-[12px] p-2 flex items-center gap-2">
                 <span className="text-[16px]">👥</span><span className="text-[11px] font-bold">3 new connections</span>
               </div>
               <div className="bg-black/10 border border-white/10 rounded-[12px] p-2 flex items-center gap-2">
                 <span className="text-[16px]">💰</span><span className="text-[11px] font-bold">₹4,200 spent</span>
               </div>
               <div className="bg-black/10 border border-white/10 rounded-[12px] p-2 flex items-center gap-2">
                 <span className="text-[16px]">💬</span><span className="text-[11px] font-bold">847 messages sent</span>
               </div>
            </div>

            <p className="text-[13px] font-medium leading-relaxed text-white/90">
              You had an active week! Attended GDG Agentathon and a team meeting. 
              Met Sanjay and 2 others via Vchat Drop. Your top spending 
              was on Food (₹1,250).
            </p>
         </div>

         {/* AI Search Box */}
         <div className="w-full bg-card border-[0.5px] border-border rounded-[16px] px-4 py-3 flex items-center gap-3 mb-8 shadow-sm">
            <Search size={18} className="text-primary-light" />
            <div className="flex flex-col flex-1">
               <input 
                 type="text" 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 placeholder="Ask about your moments..." 
                 className="w-full bg-transparent border-none outline-none text-[14px] text-text mb-1" 
               />
               <div className="flex gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
                  <span className="shrink-0 bg-card2 border-[0.5px] border-border2 px-2 py-0.5 rounded-[6px] text-[10px] text-text3">Who did I meet at GDG?</span>
                  <span className="shrink-0 bg-card2 border-[0.5px] border-border2 px-2 py-0.5 rounded-[6px] text-[10px] text-text3">Spend on food in Nov?</span>
               </div>
            </div>
         </div>

         {/* Timeline */}
         <h3 className="text-[16px] font-bold text-text mb-4">Timeline</h3>
         
         <div className="flex flex-col pl-4 relative">
            <div className="absolute left-[23px] top-0 bottom-0 w-[2px] bg-border"></div>

            {filteredMoments.length === 0 ? (
              <div className="text-center py-8 text-text3">
                <span className="text-[32px] block mb-2">🔍</span>
                <p className="text-[14px]">No moments found</p>
              </div>
            ) : (
              filteredMoments.map((moment) => (
                <div key={moment.id} className="flex gap-6 mb-6 relative">
                  <div className="w-[18px] h-[18px] rounded-full bg-primary border-[4px] border-bg z-10 shrink-0 mt-0.5 relative -left-[1px]"></div>
                  <div className="flex flex-col flex-1 bg-card border-[0.5px] border-border rounded-[16px] p-4 shadow-sm -mt-2">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[11px] font-bold text-text3 uppercase tracking-wider">{moment.date}</span>
                      <span className="text-[18px]">{moment.icon}</span>
                    </div>
                    <span className="text-[14px] font-bold text-text mb-1">{moment.title}</span>
                    <span className="text-[12px] font-medium text-text2">{moment.subtitle}</span>
                  </div>
                </div>
              ))
            )}
         </div>
      </div>
    </motion.div>
  );
}
