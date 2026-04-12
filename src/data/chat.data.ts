export type ContextGroup = {
  id: string;
  name: string;
  gradient: string;
  emoji: string;
  tagLabel: string;
  tagBg: string;
  tagColor: string;
  lastMessage: string;
  time: string;
  unread: number;
  badgeBg?: string;
};

export type DirectMessage = {
  id: string;
  name: string;
  gradient: string;
  initials: string;
  isOnline: boolean;
  streak: string;
  lastMessage: string;
  time: string;
  unread: number;
};

export type Space = {
  id: string;
  name: string;
  gradient: string;
  emoji: string;
  subtitle: string;
};

export const contextGroups: ContextGroup[] = [
  {
    id: 'group-family',
    name: 'Family',
    gradient: 'linear-gradient(135deg, #EC4899, #F59E0B)',
    emoji: '🏠',
    tagLabel: 'Family',
    tagBg: 'rgba(245,158,11,0.12)',
    tagColor: '#F59E0B',
    lastMessage: 'Dad: Function confirmed 🎉',
    time: '10:32',
    unread: 12,
    badgeBg: 'var(--primary)'
  },
  {
    id: 'group-work',
    name: 'TechCorp Team',
    gradient: 'linear-gradient(135deg, #3B82F6, #06B6D4)',
    emoji: '💼',
    tagLabel: 'Work',
    tagBg: 'rgba(6,182,212,0.15)',
    tagColor: '#06B6D4',
    lastMessage: 'Ankit: PR review by 5pm',
    time: '9:15',
    unread: 3,
    badgeBg: 'var(--red)'
  },
  {
    id: 'group-education',
    name: 'JNTU CS Batch',
    gradient: 'linear-gradient(135deg, #10B981, #06B6D4)',
    emoji: '🎓',
    tagLabel: 'Education',
    tagBg: 'rgba(16,185,129,0.15)',
    tagColor: '#10B981',
    lastMessage: 'Prof: Assignment extended',
    time: '8:50',
    unread: 5,
    badgeBg: 'var(--primary)'
  },
  {
    id: 'group-society',
    name: 'Brigade Apts',
    gradient: 'linear-gradient(135deg, #8B5CF6, #EC4899)',
    emoji: '🏘️',
    tagLabel: 'Society',
    tagBg: 'rgba(139,92,246,0.15)',
    tagColor: '#8B5CF6',
    lastMessage: 'Water supply off 6-10am',
    time: 'Yesterday',
    unread: 0
  }
];

export const directMessages: DirectMessage[] = [
  {
    id: 'rahul',
    name: 'Rahul Kumar',
    gradient: 'linear-gradient(135deg, #6C3CE1, #06B6D4)',
    initials: 'RK',
    isOnline: true,
    streak: '🌱 (day 47)',
    lastMessage: '🎤 Voice · 0:23 · Translated',
    time: '11:02',
    unread: 2
  },
  {
    id: 'priya',
    name: 'Priya Desai',
    gradient: 'linear-gradient(135deg, #F59E0B, #EF4444)',
    initials: 'PD',
    isOnline: false,
    streak: '🌸 (day 23)',
    lastMessage: "Okay let's meet Sunday!",
    time: 'Yesterday',
    unread: 0
  },
  {
    id: 'arjun',
    name: 'Arjun Mehta',
    gradient: 'linear-gradient(135deg, #10B981, #8B5CF6)',
    initials: 'AM',
    isOnline: true,
    streak: '🔥 (day 12)',
    lastMessage: 'Did you see the GDG update?',
    time: 'Mon',
    unread: 0
  }
];

export const spaces: Space[] = [
  {
    id: 'gdg-gaming',
    name: 'GDG Gaming Lounge',
    gradient: 'linear-gradient(135deg, #6C3CE1, #06B6D4)',
    emoji: '🎮',
    subtitle: '8 people · Voice active'
  }
];
