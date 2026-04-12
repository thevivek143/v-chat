export type Reel = {
  id: string;
  emoji: string;
  videoTitle: string;
  username: string;
  creatorAvatarGrad: string;
  isLive: boolean;
  caption: string;
  hashtags: string;
  soundName: string;
  likes: string;
  comments: string;
  bgGradient: string;
};

export type Post = {
  id: string;
  username: string;
  avatarGrad: string;
  timeLoc: string;
  isFollowing: boolean;
  content: string;
  hashtags: string[];
  likes: number;
  comments: number;
};

export const mockReels: Reel[] = [
  {
    id: 'reel-1',
    emoji: '🍛',
    videoTitle: 'Secret Hyderabad Biryani tip!',
    username: 'aryan_cooks',
    creatorAvatarGrad: 'linear-gradient(135deg, #F59E0B, #EF4444)',
    isLive: false,
    caption: 'You will never make Biryani the same way after learning this trick about Dum! Let me know if you tried it out 🔥',
    hashtags: '#hyderabad #food #biryani',
    soundName: 'Kala Chashma remix',
    likes: '24.5K',
    comments: '1.2K',
    bgGradient: 'linear-gradient(135deg, #1A1A3E, #0A0A1F)'
  },
  {
    id: 'reel-2',
    emoji: '🏍️',
    videoTitle: 'Testing new Royal Enfield!',
    username: 'bike_vivek',
    creatorAvatarGrad: 'linear-gradient(135deg, #6C3CE1, #06B6D4)',
    isLive: true,
    caption: 'Took the new Hunter 350 for a spin on the ORR highway. Suspension is butter smooth! Check out the engine rev.',
    hashtags: '#bikes #royalenfield #motovlog',
    soundName: 'Trending sound #2',
    likes: '18.2K',
    comments: '850',
    bgGradient: 'linear-gradient(135deg, #0F3460, #16213E)'
  },
  {
    id: 'reel-3',
    emoji: '💻',
    videoTitle: 'Built full app in 2 hours with AI',
    username: 'tech_priya',
    creatorAvatarGrad: 'linear-gradient(135deg, #10B981, #3B82F6)',
    isLive: false,
    caption: 'Using deep agentic AI to scaffold entire SaaS products. Workflow is changed forever! Who wants the GitHub repo?',
    hashtags: '#coding #ai #webdev',
    soundName: 'Lo-fi coding beats',
    likes: '45.1K',
    comments: '2.1K',
    bgGradient: 'linear-gradient(135deg, #2A1B38, #1A1A2E)'
  },
  {
    id: 'reel-4',
    emoji: '🌺',
    videoTitle: 'Charminar sunset shots 📸',
    username: 'hyd_frames',
    creatorAvatarGrad: 'linear-gradient(135deg, #EC4899, #8B5CF6)',
    isLive: false,
    caption: 'Captured some absolute bangers of the Charminar as the sun went down. The colors were unreal today 🌇',
    hashtags: '#photography #sunset #vibe',
    soundName: 'Instrumental trending',
    likes: '31.8K',
    comments: '1.5K',
    bgGradient: 'linear-gradient(135deg, #3E1A2A, #1A0F1A)'
  },
  {
    id: 'reel-5',
    emoji: '🍜',
    videoTitle: 'Street food tour — Abids!',
    username: 'foodie_telugu',
    creatorAvatarGrad: 'linear-gradient(135deg, #F59E0B, #10B981)',
    isLive: false,
    caption: 'Best dosas and mirchi bajjis you will find in Abids lane. Highly recommend grabbing a plate before 8pm!',
    hashtags: '#streetfood #foodvlog',
    soundName: 'Telugu folk remix',
    likes: '52.3K',
    comments: '4.8K',
    bgGradient: 'linear-gradient(135deg, #1A2A1A, #0F1A0F)'
  }
];

export const mockPosts: Post[] = [
  {
    id: 'post-1',
    username: 'vivek_tech',
    avatarGrad: 'linear-gradient(135deg, #6C3CE1, #06B6D4)',
    timeLoc: '2h ago · Hyderabad',
    isFollowing: true,
    content: 'Just attended GDG Agentathon — the AI demos were absolutely insane! Met amazing people using Vchat Drop to connect instantly 🔥',
    hashtags: ['#GDGHyderabad', '#AI', '#Tech'],
    likes: 342,
    comments: 48
  },
  {
    id: 'post-2',
    username: 'priya_designs',
    avatarGrad: 'linear-gradient(135deg, #EC4899, #F59E0B)',
    timeLoc: '5h ago · Bengaluru',
    isFollowing: false,
    content: 'New UI design completed for a healthcare startup! Dark mode + glassmorphism = perfection ✨\nDM for freelance work!',
    hashtags: ['#UIDesign', '#Figma', '#Freelance'],
    likes: 156,
    comments: 23
  }
];

export type LiveStream = {
  id: string;
  creator: string;
  viewers: string;
  title: string;
  thumbnailGrad: string;
};

export const mockLiveStreams: LiveStream[] = [
  {
    id: 'live-1',
    creator: 'gaming_ninja',
    viewers: '12.4K',
    title: 'Ranked Push - Road to Radiant! 🎮',
    thumbnailGrad: 'linear-gradient(135deg, #1A1A2E, #16213E)'
  },
  {
    id: 'live-2',
    creator: 'tech_talks',
    viewers: '3.2K',
    title: 'React 19 Deep Dive Q&A',
    thumbnailGrad: 'linear-gradient(135deg, #0F3460, #E94560)'
  },
  {
    id: 'live-3',
    creator: 'study_with_me',
    viewers: '850',
    title: 'Late Night Pomodoro Session 📚',
    thumbnailGrad: 'linear-gradient(135deg, #2A1B38, #6C3CE1)'
  }
];

export type Community = {
  id: string;
  name: string;
  icon: string;
  members: string;
  recentPost: string;
  isJoined: boolean;
};

export const mockCommunities: Community[] = [
  {
    id: 'comm-1',
    name: 'Frontend Developers Network',
    icon: '💻',
    members: '145K',
    recentPost: '"What is your favorite CSS framework in 2024?"',
    isJoined: true
  },
  {
    id: 'comm-2',
    name: 'Hyderabad Photographers',
    icon: '📸',
    members: '42K',
    recentPost: '"Street photography spots near old city?"',
    isJoined: false
  },
  {
    id: 'comm-3',
    name: 'AI Engineering Hub',
    icon: '🤖',
    members: '210K',
    recentPost: '"Deploying Agentic workflows natively..."',
    isJoined: false
  }
];
