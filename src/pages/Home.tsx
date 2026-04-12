import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bell, Sparkles, Plus } from 'lucide-react';
import { aiInsightsData, newsItemsData, storiesData } from '../data/home.data';

// ============================================
// TOP BAR
// ============================================
function TopBar() {
  const navigate = useNavigate();
  return (
    <div 
      className="px-4 flex items-center justify-between shrink-0"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        height: '56px',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        background: 'color-mix(in srgb, var(--bg) 80%, transparent)'
      }}
    >
      <div className="flex flex-col">
        <span className="text-[12px] text-text3 font-medium leading-none">Good morning,</span>
        <span className="text-[22px] font-bold text-text leading-tight mt-0.5">Vivek 👋</span>
      </div>
      <div className="flex items-center gap-4">
        <motion.div 
          className="relative cursor-pointer flex items-center justify-center w-8 h-8"
          whileTap={{ scale: 0.90 }}
          transition={{ duration: 0.15 }}
          onClick={() => navigate('/notifications')}
        >
          <Bell size={20} className="text-text2" />
          <div className="absolute top-[3px] right-[4px] w-2 h-2 bg-red rounded-full border-[1.5px] border-bg"></div>
        </motion.div>
        
        <motion.div 
          className="relative w-[38px] h-[38px] rounded-full flex items-center justify-center cursor-pointer border-[2px] border-bg shrink-0"
          style={{ background: 'linear-gradient(135deg, #6C3CE1, #06B6D4)' }}
          whileTap={{ scale: 0.90 }}
          transition={{ duration: 0.15 }}
          onClick={() => navigate('/me')}
        >
          <span className="text-white text-[15px] font-semibold">V</span>
          <div className="absolute -bottom-[2px] -right-[2px] w-[11px] h-[11px] bg-green rounded-full border-[2px] border-bg"></div>
        </motion.div>
      </div>
    </div>
  );
}

// ============================================
// AI TWIN CARD
// ============================================
function AITwinCard() {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
      className="mx-4 mt-1 p-4 rounded-[20px] cursor-pointer"
      style={{
        background: 'linear-gradient(135deg, rgba(108,60,225,0.18), rgba(6,182,212,0.10))',
        border: '0.5px solid rgba(108,60,225,0.4)',
      }}
      whileTap={{ scale: 0.97 }}
      onClick={() => navigate('/ai-twin')}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex flex-row items-center gap-3">
          <div className="w-[36px] h-[36px] rounded-full flex items-center justify-center shrink-0 shadow-sm" 
            style={{ background: 'linear-gradient(135deg, #6C3CE1, #06B6D4)' }}>
            <Sparkles size={18} className="text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-[15px] font-semibold text-text leading-tight">AI Twin</span>
            <span className="text-[11px] text-text3">3 new insights</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-[10px] py-[4px] rounded-[20px]"
             style={{ background: 'rgba(16,185,129,0.15)', border: '0.5px solid rgba(16,185,129,0.3)' }}>
          <div className="w-[6px] h-[6px] bg-[#10B981] rounded-full animate-pulse"></div>
          <span className="text-[11px] font-semibold text-[#10B981]">LIVE</span>
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-3">
        {aiInsightsData.map(insight => (
          <div 
            key={insight.id} 
            className="flex items-center p-[10px] px-[12px] bg-card2 rounded-xl gap-2 cursor-pointer shadow-sm"
            onClick={(e) => { e.stopPropagation(); navigate(insight.actionRoute); }}
          >
            <div className="px-2 py-0.5 rounded flex items-center justify-center shrink-0"
                 style={{ background: insight.labelBg, border: `0.5px solid ${insight.labelBg}` }}>
              <span className="text-[9px] font-bold tracking-wider uppercase" style={{ color: insight.labelColor }}>{insight.label}</span>
            </div>
            <div className="text-[12px] text-text flex-1 overflow-hidden">
              <span className="block truncate">{insight.text}</span>
            </div>
            <div className="text-[11px] font-semibold shrink-0" style={{ color: '#6C3CE1' }}>{insight.action}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ============================================
// STORIES SECTION
// ============================================
const STORY_TABS = ['Circle', 'Following', 'Groups', 'Nearby'];

function StoriesSection() {
  const navigate = useNavigate();
  return (
    <div className="mt-3 flex flex-col gap-3">
      <h2 className="text-[11px] font-semibold tracking-[0.08em] text-text3 uppercase px-4">Stories</h2>
      
      {/* Tabs */}
      <div className="flex items-center px-4 gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {STORY_TABS.map((tab, i) => {
          const isActive = i === 0;
          return (
            <div 
              key={tab} 
              className={`whitespace-nowrap px-4 py-1.5 rounded-[20px] text-[12px] shrink-0 cursor-pointer ${
                isActive 
                  ? 'bg-primary text-white font-medium border border-transparent' 
                  : 'bg-transparent text-text2 border-[0.5px] border-border2'
              }`}
            >
              {tab}
            </div>
          );
        })}
      </div>

      {/* Stories list */}
      <div className="flex items-center px-4 gap-3 py-1 overflow-x-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {/* Add Story */}
        <motion.div 
          className="flex flex-col items-center gap-1 cursor-pointer shrink-0"
          whileTap={{ scale: 0.90 }}
        >
          <div className="w-[60px] h-[60px] rounded-full border-[1.5px] border-dashed border-border2 bg-card flex flex-col items-center justify-center">
            <Plus size={20} className="text-primary" />
          </div>
          <span className="text-[10px] text-text3 pt-0.5">Add</span>
        </motion.div>

        {storiesData.map((story, i) => (
          <motion.div 
            key={story.id}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 + i * 0.05 }}
            className="flex flex-col items-center gap-1 cursor-pointer shrink-0 relative"
            whileTap={{ scale: 0.90 }}
            onClick={() => navigate(`/story/${story.id}`)}
          >
            <div 
              className="w-[60px] h-[60px] rounded-full p-[2.5px] flex items-center justify-center"
              style={{ background: story.seen ? 'var(--border2)' : 'linear-gradient(135deg, #6C3CE1, #06B6D4)' }}
            >
              <div className="w-[100%] h-[100%] bg-bg2 rounded-full border-[2.5px] border-bg flex items-center justify-center overflow-hidden">
                <span className="text-[22px]">{story.emoji}</span>
              </div>
            </div>
            <span className="text-[10px] text-text2 max-w-[60px] w-full truncate block text-center pt-0.5">
              {story.name}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ============================================
// NEWS FEED SECTION
// ============================================
function NewsFeedSection() {
  const navigate = useNavigate();

  const getPillColor = (colorCode: string) => {
    switch (colorCode) {
      case 'cyan': return { bg: 'rgba(6,182,212,0.15)', text: '#06B6D4', border: 'rgba(6,182,212,0.3)' };
      case 'red': return { bg: 'rgba(239,68,68,0.15)', text: '#EF4444', border: 'rgba(239,68,68,0.3)' };
      case 'primary': return { bg: 'rgba(108,60,225,0.15)', text: '#8B5CF6', border: 'rgba(108,60,225,0.3)' };
      default: return { bg: 'var(--card2)', text: 'var(--text2)', border: 'var(--border)' };
    }
  };

  return (
    <div className="mt-3 flex flex-col gap-3 pb-24">
      <div className="flex items-center justify-between px-4">
        <h2 className="text-[16px] font-semibold text-text tracking-tight">Nearby News</h2>
        <div className="flex items-center px-[10px] py-[4px] rounded-[20px]"
             style={{ background: 'rgba(16,185,129,0.15)', border: '0.5px solid rgba(16,185,129,0.3)' }}>
          <span className="text-[11px] font-semibold text-[#10B981]">AI Curated</span>
        </div>
      </div>

      <div className="px-4 flex flex-col gap-2.5">
        {newsItemsData.map((news, i) => {
          const pillStyle = getPillColor(news.categoryColor);
          return (
            <motion.div
              key={news.id}
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.08, duration: 0.3 }}
              className="bg-card border border-border rounded-[16px] p-3 flex gap-3 cursor-pointer shadow-sm"
              style={{ borderWidth: '0.5px' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate(`/news/${news.id}`)}
            >
              <div 
                className="w-[64px] h-[54px] min-w-[64px] rounded-xl flex items-center justify-center shrink-0"
                style={{ background: news.bgColor }}
              >
                <span className="text-[24px]">{news.emoji}</span>
              </div>
              
              <div className="flex flex-col justify-between flex-1 overflow-hidden pt-0.5">
                <h3 className="text-[14px] font-medium text-text leading-snug line-clamp-2 pr-2">
                  {news.title}
                </h3>
                <div className="flex justify-between items-center mt-1.5">
                  <span className="text-[11px] text-text3 font-medium">{news.location} · {news.time}</span>
                  <div 
                    className="px-2 py-[2px] rounded-[12px] flex items-center justify-center shrink-0"
                    style={{ background: pillStyle.bg, border: `0.5px solid ${pillStyle.border}` }}
                  >
                    <span className="text-[9px] font-semibold tracking-wide" style={{ color: pillStyle.text }}>
                      {news.category}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================
// MAIN PAGE EXPORT
// ============================================
export default function Home() {
  return (
    <div className="w-full flex-col flex" style={{ minHeight: '100%', scrollbarWidth: 'none' }}>
      {/* Top Bar (Sticky) */}
      <TopBar />

      {/* Content Flow */}
      <div className="flex flex-col gap-3 flex-1 overflow-visible">
        <AITwinCard />
        <StoriesSection />
        <NewsFeedSection />
      </div>
    </div>
  );
}
