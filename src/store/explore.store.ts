import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockReels, mockPosts, mockLiveStreams, mockCommunities, type Reel, type Post, type LiveStream, type Community } from '../data/explore.data';

interface ExploreState {
  reels: Reel[];
  posts: Post[];
  liveStreams: LiveStream[];
  communities: Community[];

  likedReels: string[];
  savedPosts: string[];
  followedUsers: string[];
  joinedCommunities: string[];

  // Actions
  toggleLikeReel: (id: string) => void;
  toggleSavePost: (id: string) => void;
  toggleFollow: (userId: string) => void;
  toggleJoinCommunity: (id: string) => void;
  incrementViews: () => void;
}

// Helper to parse likes string (e.g., "24.5K" -> 24500)
const parseLikes = (likes: string): number => {
  const clean = likes.replace(/,/g, '');
  if (clean.includes('K')) {
    return parseFloat(clean.replace('K', '')) * 1000;
  }
  if (clean.includes('M')) {
    return parseFloat(clean.replace('M', '')) * 1000000;
  }
  return parseFloat(clean) || 0;
};

// Helper to format likes number back to string
const formatLikes = (likes: number): string => {
  if (likes >= 1000000) {
    return (likes / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (likes >= 1000) {
    return (likes / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return likes.toString();
};

// Helper to parse members string (e.g., "145K" -> 145000)
const parseMembers = (members: string): number => {
  const clean = members.replace(/,/g, '');
  if (clean.includes('K')) {
    return parseFloat(clean.replace('K', '')) * 1000;
  }
  if (clean.includes('M')) {
    return parseFloat(clean.replace('M', '')) * 1000000;
  }
  return parseFloat(clean) || 0;
};

// Helper to format members number back to string
const formatMembers = (members: number): string => {
  if (members >= 1000000) {
    return (members / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (members >= 1000) {
    return (members / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return members.toString();
};

export const useExploreStore = create<ExploreState>()(
  persist(
    (set, get) => ({
      reels: mockReels,
      posts: mockPosts,
      liveStreams: mockLiveStreams,
      communities: mockCommunities,

      likedReels: [],
      savedPosts: [],
      followedUsers: [],
      joinedCommunities: [],

      toggleLikeReel: (id: string) => {
        const { likedReels, reels } = get();
        const isLiked = likedReels.includes(id);

        set({
          likedReels: isLiked
            ? likedReels.filter(reelId => reelId !== id)
            : [...likedReels, id],
          reels: reels.map(reel => {
            if (reel.id === id) {
              const currentLikes = parseLikes(reel.likes);
              const newLikes = isLiked ? currentLikes - 1 : currentLikes + 1;
              return { ...reel, likes: formatLikes(newLikes) };
            }
            return reel;
          })
        });
      },

      toggleSavePost: (id: string) => {
        const { savedPosts } = get();
        const isSaved = savedPosts.includes(id);

        set({
          savedPosts: isSaved
            ? savedPosts.filter(postId => postId !== id)
            : [...savedPosts, id]
        });
      },

      toggleFollow: (userId: string) => {
        const { followedUsers } = get();
        const isFollowing = followedUsers.includes(userId);

        set({
          followedUsers: isFollowing
            ? followedUsers.filter(id => id !== userId)
            : [...followedUsers, userId]
        });
      },

      toggleJoinCommunity: (id: string) => {
        const { joinedCommunities, communities } = get();
        const isJoined = joinedCommunities.includes(id);

        set({
          joinedCommunities: isJoined
            ? joinedCommunities.filter(commId => commId !== id)
            : [...joinedCommunities, id],
          communities: communities.map(community => {
            if (community.id === id) {
              const currentMembers = parseMembers(community.members);
              const newMembers = isJoined ? currentMembers - 1 : currentMembers + 1;
              return {
                ...community,
                members: formatMembers(newMembers),
                isJoined: !isJoined
              };
            }
            return community;
          })
        });
      },

      incrementViews: () => {
        // Views are not stored in the Reel type, but we could track them separately
        // For now, this is a placeholder for future view tracking
        // Could add a viewsRecord: Record<string, number> to state if needed
      }
    }),
    {
      name: 'explore-storage',
      partialize: (state) => ({
        likedReels: state.likedReels,
        savedPosts: state.savedPosts,
        followedUsers: state.followedUsers,
        joinedCommunities: state.joinedCommunities
      })
    }
  )
);
