import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Share2, Heart, MessageCircle, Bookmark, MoreVertical, Music } from 'lucide-react';
import { useExploreStore } from '../store/explore.store';

export default function ReelPlayer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showHeart, setShowHeart] = useState(false);
  
  const reels = useExploreStore(s => s.reels);
  const likedReels = useExploreStore(s => s.likedReels);
  const savedPosts = useExploreStore(s => s.savedPosts);
  const followedUsers = useExploreStore(s => s.followedUsers);
  const toggleLikeReel = useExploreStore(s => s.toggleLikeReel);
  const toggleSavePost = useExploreStore(s => s.toggleSavePost);
  const toggleFollow = useExploreStore(s => s.toggleFollow);
  
  const currentIdx = reels.findIndex(r => r.id === id);
  const reel = currentIdx >= 0 ? reels[currentIdx] : reels[0];
  const currentReelId = reel?.id || '';
  const isLiked = likedReels.includes(currentReelId);
  const isSaved = savedPosts.includes(currentReelId);
  const isFollowing = followedUsers.includes(reel?.username || '');

  const handleDragEnd = (_event: unknown, info: { offset: { y: number } }) => {
    const threshold = 80;
    if (info.offset.y < -threshold) {
      // Swiped UP -> Next reel
      if (currentIdx < reels.length - 1) {
        navigate(`/reel/${reels[currentIdx + 1].id}`, { replace: true });
      }
    } else if (info.offset.y > threshold) {
      // Swiped DOWN -> Prev reel
      if (currentIdx > 0) {
        navigate(`/reel/${reels[currentIdx - 1].id}`, { replace: true });
      } else {
        navigate('/explore');
      }
    }
  };

  const handleDoubleClick = () => {
    if (!isLiked) {
      toggleLikeReel(currentReelId);
    }
    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 800);
  };

  if (!reel) return null;

  return (
    <motion.div 
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 overflow-hidden text-white"
      style={{ background: reel.bgGradient }}
    >
      {/* Draggable viewport surface */}
      <motion.div 
        className="absolute inset-0 z-10 touch-pan-x touch-pan-y"
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        onDragEnd={handleDragEnd}
        onDoubleClick={handleDoubleClick}
      >
        
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-[3px] bg-white/20 z-50">
          <motion.div 
            className="h-full bg-primary"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 15, ease: 'linear' }}
          />
        </div>

        {/* Top Header */}
        <div className="absolute top-0 w-full px-4 py-5 pt-6 flex justify-between items-center z-40 bg-gradient-to-b from-black/60 to-transparent">
          <motion.div whileTap={{ scale: 0.9 }} onClick={() => navigate(-1)} className="cursor-pointer p-2 -ml-2">
            <ChevronLeft size={28} className="text-white drop-shadow-md" />
          </motion.div>
          <span className="text-[16px] font-bold tracking-wide drop-shadow-md">Reels</span>
          <motion.div whileTap={{ scale: 0.9 }} className="cursor-pointer p-2 -mr-2">
            <Share2 size={24} className="text-white drop-shadow-md" />
          </motion.div>
        </div>

        {/* Center Content Placeholder (Video Simulation) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center -mt-10 pointer-events-none">
          <motion.span 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="text-[100px] filter drop-shadow-2xl"
          >
            {reel.emoji}
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-[20px] font-bold mt-4 tracking-wide text-center px-10 drop-shadow-lg leading-snug"
          >
            {reel.videoTitle}
          </motion.h2>
        </div>

        {/* Action Bar Right */}
        <div className="absolute right-4 bottom-[20%] flex flex-col gap-6 items-center z-30">
          <motion.div 
            className="flex flex-col items-center gap-1.5 cursor-pointer"
            whileTap={{ scale: 0.8 }}
            onClick={() => toggleLikeReel(currentReelId)}
          >
            <Heart size={30} className={isLiked ? 'text-pink drop-shadow-md fill-pink' : 'text-white drop-shadow-md'} strokeWidth={2.5} />
            <span className="text-[11px] font-bold drop-shadow-md">{reel.likes}</span>
          </motion.div>

          <motion.div className="flex flex-col items-center gap-1.5 cursor-pointer" whileTap={{ scale: 0.8 }}>
            <MessageCircle size={30} className="text-white drop-shadow-md" strokeWidth={2.5} />
            <span className="text-[11px] font-bold drop-shadow-md">{reel.comments}</span>
          </motion.div>

          <motion.div className="flex flex-col items-center gap-1.5 cursor-pointer" whileTap={{ scale: 0.8 }}>
            <Share2 size={30} className="text-white drop-shadow-md" strokeWidth={2.5} />
            <span className="text-[11px] font-bold drop-shadow-md">Share</span>
          </motion.div>

          <motion.div 
            className="flex flex-col items-center gap-1.5 cursor-pointer" 
            whileTap={{ scale: 0.8 }}
            onClick={() => toggleSavePost(currentReelId)}
          >
            <Bookmark size={30} className={isSaved ? 'text-primary drop-shadow-md fill-primary' : 'text-white drop-shadow-md'} strokeWidth={2.5} />
            <span className="text-[11px] font-bold drop-shadow-md">{isSaved ? 'Saved' : 'Save'}</span>
          </motion.div>

          <motion.div className="flex flex-col items-center gap-1.5 cursor-pointer" whileTap={{ scale: 0.8 }}>
            <MoreVertical size={30} className="text-white drop-shadow-md" strokeWidth={2.5} />
          </motion.div>
        </div>

        {/* Creator Info Bottom Left */}
        <div className="absolute bottom-[90px] left-4 right-[80px] z-30 flex flex-col gap-3 drop-shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-[44px] h-[44px] rounded-full outline outline-2 outline-white/30 flex items-center justify-center shrink-0" style={{ background: reel.creatorAvatarGrad }}>
              <span className="text-[13px] font-bold text-white uppercase">{reel.username.substring(0,2)}</span>
            </div>
            <span className="text-[16px] font-bold tracking-wide">@{reel.username}</span>
            <button 
              onClick={() => toggleFollow(reel.username)}
              className={isFollowing 
                ? "px-3 py-1.5 bg-white text-black rounded-[16px] text-[11px] font-bold ml-1 transition-colors"
                : "px-3 py-1.5 border border-white rounded-[16px] text-[11px] font-bold ml-1 hover:bg-white hover:text-black transition-colors"
              }
            >
              {isFollowing ? 'Following' : 'Follow'}
            </button>
          </div>
          
          <p className="text-[14px] leading-[1.4] font-medium opacity-90 line-clamp-2 pr-4 shadow-black drop-shadow-md">
            {reel.caption}
          </p>
          
          <div className="flex items-center gap-2 mt-1 -ml-1">
            <div className="bg-black/30 backdrop-blur-sm border border-white/20 rounded-[20px] px-3 py-1.5 flex items-center gap-2 max-w-max shrink-0">
               <Music size={14} className="text-white" />
               <div className="overflow-hidden w-[120px]">
                 <motion.div 
                   animate={{ x: [0, -100] }}
                   transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                   className="whitespace-nowrap flex gap-4"
                 >
                   <span className="text-[12px] font-medium pr-10">{reel.soundName} • Base Audio</span>
                   <span className="text-[12px] font-medium">{reel.soundName} • Base Audio</span>
                 </motion.div>
               </div>
            </div>
          </div>
        </div>

        {/* Bottom Interaction Pills */}
        <div className="absolute bottom-0 w-full px-4 pb-6 pt-10 bg-gradient-to-t from-black via-black/60 to-transparent z-20 flex gap-2">
          <motion.div whileTap={{ scale: 0.95 }} className="flex-1 flex justify-center items-center gap-1.5 bg-black/40 backdrop-blur-md border border-[rgba(108,60,225,0.4)] rounded-[12px] py-2.5 cursor-pointer">
            <span className="text-[13px] font-bold text-primary-light">⚡ Duet</span>
          </motion.div>
          <motion.div whileTap={{ scale: 0.95 }} className="flex-1 flex justify-center items-center gap-1.5 bg-black/40 backdrop-blur-md border border-cyan-400/40 rounded-[12px] py-2.5 cursor-pointer">
            <span className="text-[13px] font-bold text-cyan-400">✂️ Stitch</span>
          </motion.div>
          <motion.div whileTap={{ scale: 0.95 }} className="flex-1 flex justify-center items-center gap-1.5 bg-black/40 backdrop-blur-md border border-amber-400/40 rounded-[12px] py-2.5 cursor-pointer">
            <span className="text-[13px] font-bold text-amber-400">🛒 Shop</span>
          </motion.div>
        </div>

      </motion.div>

      {/* Double Tap Heart Animation */}
      <AnimatePresence>
        {showHeart && (
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 2, opacity: 1 }}
            exit={{ opacity: 0, scale: 2.2 }}
            transition={{ type: "spring", damping: 10, stiffness: 200 }}
            className="absolute inset-0 pointer-events-none z-50 flex items-center justify-center filter drop-shadow-[0_0_20px_rgba(236,72,153,0.5)]"
          >
            <Heart size={80} className="text-pink fill-pink" />
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
