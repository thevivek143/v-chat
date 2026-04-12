import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Flame, Heart, MessageCircle, Share2, Bookmark, MoreVertical, Music, Check, Play, Users, UsersRound } from 'lucide-react';
import { mockReels, mockPosts, mockLiveStreams, mockCommunities } from '../data/explore.data';

export default function Explore() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('For You');
  
  const tabs = ['For You', 'Reels', 'Videos', 'Live', 'Posts', 'Communities'];

  // Helper component for repeating Text Posts
  const TextPostCard = ({ post }: { post: any }) => (
    <motion.div 
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-4 mb-4 bg-card border-[0.5px] border-border rounded-[20px] p-4 shadow-sm"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-[38px] h-[38px] rounded-full flex justify-center items-center" style={{ background: post.avatarGrad }}>
            <span className="text-[12px] font-bold text-white uppercase">{post.username.substring(0,2)}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[14px] font-bold text-text leading-tight tracking-wide">@{post.username}</span>
            <span className="text-[11px] font-medium text-text3 mt-0.5">{post.timeLoc}</span>
          </div>
        </div>
        {post.isFollowing ? (
          <span className="bg-[rgba(16,185,129,0.15)] text-[#10B981] text-[11px] font-bold px-3 py-1.5 rounded-[12px] flex items-center gap-1"><Check size={12}/> Following</span>
        ) : (
          <span className="bg-[rgba(108,60,225,0.15)] text-primary-light text-[11px] font-bold px-4 py-1.5 rounded-[12px]">Follow</span>
        )}
      </div>

      <p className="text-[14px] text-text leading-[1.5] mb-2">{post.content}</p>
      
      <div className="flex flex-wrap gap-1.5 mb-4">
        {post.hashtags.map((ht: string, i: number) => (
          <span key={i} className="text-[12px] font-bold text-primary-light cursor-pointer hover:underline">{ht}</span>
        ))}
      </div>

      <div className="flex items-center justify-between border-t-[0.5px] border-border pt-3">
        <div className="flex gap-4">
          <div className="flex items-center gap-1.5 cursor-pointer">
            <Heart size={18} className="text-text2" />
            <span className="text-[12px] font-semibold text-text2">{post.likes}</span>
          </div>
          <div className="flex items-center gap-1.5 cursor-pointer">
            <MessageCircle size={18} className="text-text2" />
            <span className="text-[12px] font-semibold text-text2">{post.comments}</span>
          </div>
          <div className="flex items-center gap-1.5 cursor-pointer">
            <Share2 size={18} className="text-text2" />
            <span className="text-[12px] font-semibold text-text2">24</span>
          </div>
        </div>
        <Bookmark size={18} className="text-text2 cursor-pointer" />
      </div>
    </motion.div>
  );

  return (
    <div className="w-full flex-col flex bg-bg relative min-h-[100dvh]">
      
      {/* Top Bar */}
      <div className="sticky top-0 z-20 h-[56px] flex items-center justify-between px-4 bg-bg/80 backdrop-blur-md shrink-0">
        <span className="text-[22px] font-bold text-text">Explore</span>
        <div className="flex items-center gap-2">
          <motion.div whileTap={{ scale: 0.9 }} className="w-[36px] h-[36px] rounded-full bg-card2 flex items-center justify-center cursor-pointer border-[0.5px] border-border">
            <Search size={18} className="text-text2" />
          </motion.div>
          <motion.div whileTap={{ scale: 0.9 }} className="w-[36px] h-[36px] rounded-full bg-card2 flex items-center justify-center cursor-pointer border-[0.5px] border-border">
            <Flame size={18} className="text-primary-light" />
          </motion.div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex px-4 gap-2 overflow-x-auto py-2 shrink-0 border-b-[0.5px] border-border" style={{ scrollbarWidth: 'none' }}>
        {tabs.map((tab) => {
          const isActive = tab === activeTab;
          return (
            <motion.div 
              key={tab}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap px-4 py-[7px] rounded-[20px] text-[13px] tracking-wide shrink-0 cursor-pointer transition-colors ${
                isActive ? 'bg-primary text-white font-bold' : 'bg-transparent text-text2 border-[0.5px] border-border2 font-semibold'
              }`}
            >
              {tab}
            </motion.div>
          );
        })}
      </div>

      {/* Feed Content */}
      <div className="flex-1 overflow-y-auto pb-[100px] pt-4" style={{ scrollbarWidth: 'none' }}>
        <AnimatePresence mode="popLayout">
          
          {(activeTab === 'For You' || activeTab === 'Reels') && (
            <motion.div 
              key="reels-feed"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex flex-col"
            >
              {/* Combine items to simulate mix feed */}
              {mockReels.map((reel, idx) => {
                const post = activeTab === 'For You' && idx % 2 === 1 ? mockPosts[Math.floor(idx/2)] : null;
                
                return (
                  <React.Fragment key={reel.id}>
                    {/* Reel Card */}
                    <motion.div 
                      key={reel.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="mb-3"
                    >
                      <div 
                        className="mx-4 bg-card rounded-[20px] overflow-hidden relative cursor-pointer shadow-sm border border-border"
                        style={{ height: '320px' }}
                        onClick={() => navigate(`/reel/${reel.id}`)}
                      >
                        <div className="absolute inset-0 z-0 flex items-center justify-center flex-col" style={{ background: reel.bgGradient }}>
                          <span className="text-[48px] filter drop-shadow-lg">{reel.emoji}</span>
                          <span className="text-white font-bold mt-2 text-[15px] tracking-wide filter drop-shadow-md px-6 text-center leading-snug">
                            {reel.videoTitle}
                          </span>
                        </div>

                        {/* Top Overlay */}
                        <div className="absolute top-0 w-full p-4 bg-gradient-to-b from-black/60 to-transparent z-10 flex justify-between items-start">
                          <div className="flex items-center gap-2">
                            <div className="w-[32px] h-[32px] rounded-full flex items-center justify-center outline outline-2 outline-white/20" style={{ background: reel.creatorAvatarGrad }}>
                              <span className="text-[11px] font-bold text-white uppercase">{reel.username.substring(0,2)}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[13px] font-bold text-white tracking-wide">@{reel.username}</span>
                              <span className="text-[12px] text-white/70 font-medium">· Follow</span>
                            </div>
                          </div>
                          {reel.isLive && (
                            <span className="bg-red text-white text-[10px] font-bold px-2 py-1 rounded-[6px] tracking-widest animate-pulse">LIVE</span>
                          )}
                        </div>

                        {/* Right Action Bar */}
                        <div className="absolute right-3 bottom-[60px] z-10 flex flex-col gap-5 items-center">
                          <div className="flex flex-col items-center gap-1 opacity-90 cursor-default">
                            <Heart size={24} className="text-white fill-transparent" />
                            <span className="text-[10px] font-bold text-white tracking-wide">{reel.likes}</span>
                          </div>
                          <div className="flex flex-col items-center gap-1 opacity-90">
                            <MessageCircle size={24} className="text-white fill-transparent" />
                            <span className="text-[10px] font-bold text-white tracking-wide">{reel.comments}</span>
                          </div>
                          <div className="flex flex-col items-center gap-1 opacity-90">
                            <Share2 size={24} className="text-white" />
                            <span className="text-[10px] font-bold text-white tracking-wide">Share</span>
                          </div>
                          <div className="flex flex-col items-center gap-1 opacity-90">
                            <Bookmark size={24} className="text-white" />
                            <span className="text-[10px] font-bold text-white tracking-wide">Save</span>
                          </div>
                          <div className="flex flex-col items-center gap-1 opacity-90">
                            <MoreVertical size={24} className="text-white" />
                            <span className="text-[10px] font-bold text-white tracking-wide">More</span>
                          </div>
                        </div>

                        {/* Bottom Overlay */}
                        <div className="absolute bottom-0 w-full p-4 pt-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10 pr-[60px]">
                          <p className="text-[13px] text-white font-medium line-clamp-2 leading-snug drop-shadow-sm mb-1.5">{reel.caption}</p>
                          <p className="text-[12px] text-white/80 font-medium mb-3">{reel.hashtags}</p>
                          <div className="bg-white/15 backdrop-blur-md rounded-[20px] px-2.5 py-1 w-max flex items-center gap-1.5 border border-white/10">
                            <Music size={10} className="text-white" />
                            <span className="text-[11px] text-white font-semibold tracking-wide">{reel.soundName}</span>
                          </div>
                        </div>
                      </div>

                      {/* Pill Row Below Card */}
                      <div className="px-4 mt-3 flex gap-2 w-full">
                        <motion.div whileTap={{ scale: 0.95 }} className="flex-1 flex justify-center items-center gap-1.5 bg-[rgba(108,60,225,0.12)] border-[0.5px] border-border2 rounded-[12px] py-2 cursor-pointer">
                          <span className="text-[13px] font-bold text-primary-light">⚡ Duet</span>
                        </motion.div>
                        <motion.div whileTap={{ scale: 0.95 }} className="flex-1 flex justify-center items-center gap-1.5 bg-[rgba(6,182,212,0.12)] border-[0.5px] border-[rgba(6,182,212,0.3)] rounded-[12px] py-2 cursor-pointer">
                          <span className="text-[13px] font-bold text-cyan-400">✂️ Stitch</span>
                        </motion.div>
                        <motion.div whileTap={{ scale: 0.95 }} className="flex-1 flex justify-center items-center gap-1.5 bg-[rgba(245,158,11,0.12)] border-[0.5px] border-[rgba(245,158,11,0.3)] rounded-[12px] py-2 cursor-pointer">
                          <span className="text-[13px] font-bold text-amber-400">🛒 Shop</span>
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* Text Post Entry */}
                    {post && <TextPostCard post={post} />}
                  </React.Fragment>
                );
              })}
            </motion.div>
          )}

          {activeTab === 'Posts' && (
            <motion.div 
              key="posts-feed"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex flex-col mt-2"
            >
               {mockPosts.map((post) => (
                 <TextPostCard key={post.id} post={post} />
               ))}
            </motion.div>
          )}

          {activeTab === 'Videos' && (
            <motion.div 
              key="videos-feed"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex flex-col gap-4 px-4"
            >
               {mockReels.map((reel, idx) => (
                 <motion.div 
                   key={reel.id}
                   initial={{ opacity: 0, y: 16 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: idx * 0.1 }}
                   className="bg-card rounded-[20px] overflow-hidden border border-border shadow-sm cursor-pointer"
                 >
                   <div className="w-full aspect-video relative" style={{ background: reel.bgGradient }}>
                     <div className="absolute inset-0 flex flex-col items-center justify-center">
                       <span className="text-[40px] drop-shadow-md">{reel.emoji}</span>
                     </div>
                     <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm text-white px-2 py-0.5 rounded-[6px] text-[10px] font-bold">
                       04:15
                     </div>
                     <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/10 transition-colors">
                       <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center pl-1 border border-white/30">
                         <Play size={20} className="text-white drop-shadow-md" />
                       </div>
                     </div>
                   </div>
                   <div className="p-4 flex gap-3">
                     <div className="w-[40px] h-[40px] rounded-full shrink-0 flex items-center justify-center" style={{ background: reel.creatorAvatarGrad }}>
                       <span className="text-[12px] font-bold text-white uppercase">{reel.username.substring(0,2)}</span>
                     </div>
                     <div className="flex flex-col">
                       <span className="text-[14px] font-bold text-text leading-tight mb-1">{reel.videoTitle}</span>
                       <div className="flex items-center text-[12px] font-medium text-text3">
                         <span>{reel.username}</span>
                         <span className="mx-1.5">•</span>
                         <span>{reel.likes} views</span>
                       </div>
                     </div>
                   </div>
                 </motion.div>
               ))}
            </motion.div>
          )}

          {activeTab === 'Live' && (
            <motion.div 
              key="live-feed"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex flex-col gap-4 px-4"
            >
               {mockLiveStreams.map((stream, idx) => (
                 <motion.div 
                   key={stream.id}
                   initial={{ opacity: 0, y: 16 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: idx * 0.1 }}
                   className="bg-card rounded-[20px] overflow-hidden border border-border shadow-sm cursor-pointer relative"
                 >
                   <div className="w-full h-[220px] relative" style={{ background: stream.thumbnailGrad }}>
                      {/* LIVE Badge */}
                      <div className="absolute top-4 left-4 bg-red text-white text-[11px] font-bold px-3 py-1 rounded-[8px] tracking-widest animate-pulse flex items-center gap-1.5 shadow-lg">
                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                        LIVE
                      </div>
                      <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-[8px] flex items-center gap-1.5 outline outline-1 outline-white/20">
                        <Users size={12} /> {stream.viewers}
                      </div>

                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-20">
                         <span className="text-[80px] filter blur-[2px]">🔴</span>
                      </div>

                      {/* Streamer Bottom Info */}
                      <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent z-10">
                        <span className="text-white font-bold text-[18px] drop-shadow-md leading-snug">{stream.title}</span>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center border border-white/50">
                            <span className="text-[9px] text-white font-bold uppercase">{stream.creator.substring(0,2)}</span>
                          </div>
                          <span className="text-white/90 text-[12px] font-medium tracking-wide">@{stream.creator} is live</span>
                        </div>
                      </div>
                   </div>
                   <div className="bg-card2 p-3 px-4 flex justify-between items-center border-t-[0.5px] border-border2">
                      <span className="text-[12px] font-semibold text-text3">Streaming High Quality</span>
                      <button className="bg-primary-light text-white text-[12px] font-bold px-5 py-2 rounded-xl">Watch Live</button>
                   </div>
                 </motion.div>
               ))}
            </motion.div>
          )}

          {activeTab === 'Communities' && (
            <motion.div 
              key="communities-feed"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex flex-col gap-3 px-4"
            >
               {mockCommunities.map((comm, idx) => (
                 <motion.div 
                   key={comm.id}
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ delay: idx * 0.05 }}
                   className="bg-card rounded-[20px] p-4 border border-border shadow-sm flex flex-col"
                 >
                   <div className="flex justify-between items-start mb-3">
                     <div className="flex items-center gap-3">
                       <div className="w-[48px] h-[48px] rounded-[14px] bg-card2 border border-border2 flex items-center justify-center text-[24px]">
                         {comm.icon}
                       </div>
                       <div className="flex flex-col">
                         <span className="text-[15px] font-bold text-text leading-tight">{comm.name}</span>
                         <span className="text-[12px] font-medium text-text2 mt-0.5 flex items-center gap-1">
                           <UsersRound size={12} /> {comm.members} Members
                         </span>
                       </div>
                     </div>
                   </div>
                   
                   <div className="bg-card2 rounded-[12px] p-3 mb-3 border border-border/50">
                     <span className="text-[12px] font-bold text-primary-light mb-1 block">Trending Post</span>
                     <p className="text-[13px] text-text3 italic">{comm.recentPost}</p>
                   </div>

                   {comm.isJoined ? (
                     <button className="w-full bg-[rgba(16,185,129,0.12)] border-[0.5px] border-[rgba(16,185,129,0.3)] text-[#10B981] font-bold rounded-[12px] py-2.5 text-[13px] flex justify-center items-center gap-1.5">
                       <Check size={14} /> Joined
                     </button>
                   ) : (
                     <button className="w-full bg-primary text-white font-bold rounded-[12px] py-2.5 text-[13px]">
                       Join Community
                     </button>
                   )}
                 </motion.div>
               ))}
            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
}
