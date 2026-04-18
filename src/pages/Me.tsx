import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Camera, ChevronRight, MessageSquare } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useProfileStore } from '../store/profile.store';

export default function Me() {
  const navigate = useNavigate();
  const { isDark, toggle: toggleTheme } = useTheme();
  const store = useProfileStore();

  return (
    <div className="w-full flex-col flex bg-bg relative min-h-[100dvh]">
      <div className="flex-1 overflow-y-auto pb-[100px]" style={{ scrollbarWidth: 'none' }}>
        
        {/* Profile Hero */}
        <div className="pt-6 px-4 flex flex-col items-center relative">
           <div className="relative mb-3 cursor-pointer" onClick={() => navigate('/me/edit')}>
             <div className="w-[80px] h-[80px] rounded-full flex justify-center items-center shadow-lg" style={{ background: store.profile.avatarGradient }}>
                <span className="text-[32px] font-bold text-white leading-none pb-1">{store.profile.name.charAt(0)}</span>
             </div>
             <div className="absolute bottom-0 right-0 w-[24px] h-[24px] bg-[#10B981] rounded-full border-[3px] border-bg flex items-center justify-center">
                <Check size={12} className="text-white" strokeWidth={3} />
             </div>
             
             {/* Edit Overlay */}
             <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
               <Camera size={24} className="text-white" />
             </div>
           </div>

           <h2 className="text-[20px] font-bold text-text mb-0.5">{store.profile.name}</h2>
           <span className="text-[14px] font-semibold text-primary-light mb-1">{store.profile.username}</span>
           <span className="text-[12px] font-medium text-text3">📍 {store.profile.location}</span>

           <div className="flex flex-wrap justify-center gap-2 mt-4">
             {store.profile.badges.map((badge, idx) => {
               const colors = [
                 'bg-[rgba(108,60,225,0.1)] text-primary-light border-[rgba(108,60,225,0.2)]',
                 'bg-[rgba(6,182,212,0.1)] text-[#06B6D4] border-[rgba(6,182,212,0.2)]',
                 'bg-[rgba(16,185,129,0.1)] text-[#10B981] border-[rgba(16,185,129,0.2)]',
                 'bg-[rgba(245,158,11,0.1)] text-[#F59E0B] border-[rgba(245,158,11,0.2)]'
               ];
               const icons = ['✓', '⚡', '🎬', '🎓'];
               return (
                 <span key={idx} className={`${colors[idx % colors.length]} text-[11px] font-bold px-3 py-1 rounded-[12px] border`}>
                   {icons[idx % icons.length]} {badge}
                 </span>
               );
             })}
           </div>

           <button onClick={() => navigate('/me/edit')} className="mt-5 border-[1.5px] border-border2 text-primary-light font-bold text-[13px] px-6 py-2 rounded-[20px]">
             Edit Profile
           </button>
        </div>

        {/* Stats Bar */}
        <div className="mx-4 mt-6 bg-card2 border-[0.5px] border-border rounded-[16px] p-4 grid grid-cols-4 shadow-sm text-center">
            <div className="flex flex-col cursor-pointer" onClick={() => {}}>
              <span className="text-[18px] font-bold text-text">{store.stats.friends}</span>
              <span className="text-[11px] font-medium text-text3">Friends</span>
            </div>
            <div className="flex flex-col cursor-pointer border-l-[0.5px] border-border" onClick={() => {}}>
              <span className="text-[18px] font-bold text-text">{store.stats.followers >= 1000 ? `${(store.stats.followers / 1000).toFixed(1)}K` : store.stats.followers}</span>
              <span className="text-[11px] font-medium text-text3">Followers</span>
            </div>
            <div className="flex flex-col cursor-pointer border-l-[0.5px] border-border" onClick={() => {}}>
              <span className="text-[18px] font-bold text-text">{store.stats.following}</span>
              <span className="text-[11px] font-medium text-text3">Following</span>
            </div>
            <div className="flex flex-col cursor-pointer border-l-[0.5px] border-border" onClick={() => {}}>
              <span className="text-[18px] font-bold text-text">{store.stats.posts}</span>
              <span className="text-[11px] font-medium text-text3">Posts</span>
            </div>
        </div>

        {/* Active Streaks */}
        <div className="mt-8 px-4">
          <div className="flex justify-between items-end mb-3">
            <h3 className="text-[16px] font-bold text-text">Active Streaks</h3>
            <span className="text-[12px] font-bold text-primary-light cursor-pointer" onClick={() => navigate('/me/streaks')}>View All</span>
          </div>
          
          <div className="flex flex-col gap-2">
             {store.streaks.slice(0,3).map(streak => (
                <div key={streak.id} className="bg-card border-[0.5px] border-border rounded-[14px] p-3 flex justify-between items-center shadow-sm">
                   <div className="flex items-center gap-3">
                     <span className="text-[28px]">{streak.emoji}</span>
                     <div className="flex flex-col">
                       <span className="text-[14px] font-bold text-text">{streak.participant}</span>
                       <span className="text-[12px] font-medium text-text3">{streak.theme}</span>
                     </div>
                   </div>
                   <div className="flex items-center gap-1.5">
                     {streak.status === 'safe' ? (
                       <span className="bg-[rgba(16,185,129,0.15)] text-[#10B981] text-[11px] font-bold px-3 py-1 rounded-[8px]">{streak.days} days</span>
                     ) : (
                       <>
                         <span className="bg-[rgba(245,158,11,0.15)] text-[#F59E0B] text-[11px] font-bold px-3 py-1 rounded-[8px]">{streak.days} days</span>
                         <span className="text-[14px] animate-pulse">🔥</span>
                       </>
                     )}
                   </div>
                </div>
             ))}
          </div>
        </div>

        {/* Recent Connections */}
        <div className="mt-8 px-4">
          <div className="flex justify-between items-end mb-3">
            <h3 className="text-[16px] font-bold text-text">Recent Connections</h3>
            <span className="text-[12px] font-bold text-primary-light cursor-pointer">See All</span>
          </div>

          <div className="bg-card border-[0.5px] border-border rounded-[20px] p-4 flex flex-col shadow-sm">
             {store.connections.map((c, i) => (
                <div key={c.id} className={`py-4 flex items-center justify-between ${i === 0 ? 'border-b-[0.5px] border-border' : ''}`}>
                   <div className="flex items-center gap-3">
                     <div className="w-[44px] h-[44px] rounded-full flex items-center justify-center shrink-0" style={{ background: c.grad }}>
                        <span className="text-[14px] font-bold text-white tracking-widest">{c.initials}</span>
                     </div>
                     <div className="flex flex-col">
                       <span className="text-[14px] font-bold text-text mb-0.5">{c.name}</span>
                       <span className="text-[12px] font-medium text-text2 mb-0.5">{c.context}</span>
                       <span className="text-[11px] font-medium text-text3">{c.how}</span>
                     </div>
                   </div>
                   <button className="border border-border2 text-text3 rounded-full w-[36px] h-[36px] flex items-center justify-center shrink-0 ml-2">
                      <MessageSquare size={16} />
                   </button>
                </div>
             ))}
          </div>
        </div>

        {/* Vchat Moments */}
        <div className="mt-8 px-4">
          <div className="flex justify-between items-end mb-3">
            <h3 className="text-[16px] font-bold text-text">Your Moments</h3>
            <span className="text-[12px] font-bold text-primary-light cursor-pointer" onClick={() => navigate('/me/moments')}>View All</span>
          </div>

          <div className="relative overflow-hidden rounded-[20px] p-4 shadow-md text-white" style={{ background: 'linear-gradient(135deg, #6C3CE1, #06B6D4)' }}>
             <span className="bg-white/20 px-2 py-1 rounded-[6px] text-[10px] font-bold uppercase tracking-wider mb-2 block w-max backdrop-blur-sm">This Week</span>
             <p className="text-[14px] font-medium leading-relaxed mb-4 text-white/90">
               You attended GDG, connected with 3 new people, and spent ₹4,200 across 12 transactions.
             </p>
             <div className="flex flex-wrap gap-2">
                <span className="bg-white/20 text-[11px] font-bold px-3 py-1.5 rounded-[12px] border border-white/20 backdrop-blur-sm">3 events</span>
                <span className="bg-white/20 text-[11px] font-bold px-3 py-1.5 rounded-[12px] border border-white/20 backdrop-blur-sm">3 contacts</span>
                <span className="bg-white/20 text-[11px] font-bold px-3 py-1.5 rounded-[12px] border border-white/20 backdrop-blur-sm">₹4,200</span>
             </div>
          </div>
        </div>

        {/* Settings List */}
        <div className="mt-8 px-4 mb-4">
          <h3 className="text-[16px] font-bold text-text mb-3">Settings & More</h3>
          <div className="flex flex-col gap-2">
             {[
               { i: '🤖', t: 'AI Twin Settings', d: 'Manage offline & online AI', r: '/me/ai-settings' },
               { i: '🌐', t: 'Language & Translation', d: 'Telugu · 8 language packs installed', r: '/me/language' },
               { i: '🔒', t: 'Privacy Dashboard', d: 'Control your data', r: '/me/privacy' },
               { i: '📡', t: 'Vchat Drop', d: 'Nearby, Remote & NFC sharing', r: '/me/drop' },
               { i: '❤️', t: 'Health Profile', d: 'Emergency info & blood group', r: '/hub/health' },
               { i: '💰', t: 'Vchat Pay Settings', d: 'UPI, linked accounts', r: '/hub/pay' },
             ].map((s, idx) => (
                <motion.div 
                  key={idx}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(s.r)}
                  className="bg-card border-[0.5px] border-border rounded-[14px] p-3.5 flex items-center justify-between cursor-pointer shadow-sm"
                >
                   <div className="flex items-center gap-3">
                     <span className="text-[22px]">{s.i}</span>
                     <div className="flex flex-col">
                       <span className="text-[14px] font-bold text-text">{s.t}</span>
                       <span className="text-[12px] font-medium text-text3">{s.d}</span>
                     </div>
                   </div>
                   <ChevronRight size={18} className="text-text3" />
                </motion.div>
             ))}

             {/* Inline Theme Toggle */}
             <motion.div 
               whileTap={{ scale: 0.98 }}
               onClick={toggleTheme}
               className="bg-card border-[0.5px] border-border rounded-[14px] p-3.5 flex items-center justify-between cursor-pointer shadow-sm"
             >
                <div className="flex items-center gap-3">
                  <span className="text-[22px]">🌙</span>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-text">Theme</span>
                    <span className="text-[12px] font-medium text-text3">Toggle dark/light mode</span>
                  </div>
                </div>
                <div className={`w-[40px] h-[22px] rounded-full flex items-center px-1 transition-colors ${isDark ? 'bg-primary-light' : 'bg-border'}`}>
                   <div className={`w-[16px] h-[16px] bg-white rounded-full transition-transform ${isDark ? 'translate-x-[16px]' : 'translate-x-0'}`}></div>
                </div>
             </motion.div>

             <motion.div 
               whileTap={{ scale: 0.98 }}
               onClick={() => {}}
               className="bg-card border-[0.5px] border-border rounded-[14px] p-3.5 flex items-center justify-between cursor-pointer shadow-sm"
             >
                <div className="flex items-center gap-3">
                  <span className="text-[22px]">ℹ️</span>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-text">About Vchat</span>
                    <span className="text-[12px] font-medium text-text3">Version 1.0.0 · Vivek Vardhan</span>
                  </div>
                </div>
                <ChevronRight size={18} className="text-text3" />
             </motion.div>
          </div>
        </div>

        <button className="w-full text-center py-4 mb-4 text-[14px] font-bold text-red">Sign Out</button>

      </div>
    </div>
  );
}
