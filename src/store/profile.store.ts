import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockStreaks, mockConnections } from '../data/profile.data';

// Types from profile.data.ts
export interface Streak {
  id: string;
  participant: string;
  theme: string;
  emoji: string;
  stage: string;
  days: number;
  status: 'safe' | 'warning';
}

export interface Connection {
  id: string;
  initials: string;
  name: string;
  context: string;
  how: string;
  grad: string;
}

export interface Moment {
  id: string;
  date: string;
  icon: string;
  title: string;
  subtitle: string;
}

export interface Profile {
  name: string;
  username: string;
  location: string;
  bio: string;
  avatarGradient: string;
  badges: string[];
}

export interface Stats {
  friends: number;
  followers: number;
  following: number;
  posts: number;
}

interface ProfileState {
  profile: Profile;
  stats: Stats;
  streaks: Streak[];
  connections: Connection[];
  moments: Moment[];

  // Actions
  updateProfile: (fields: Partial<Profile>) => void;
  updateStreakTheme: (streakId: string, theme: string) => void;
  incrementStat: (field: keyof Stats, amount?: number) => void;
}

// Seed data from Me.tsx hardcoded values
const seedProfile = (): Profile => ({
  name: 'Vivek Vardhan',
  username: '@vivek_hyd',
  location: 'Hyderabad, Telangana',
  bio: 'Tech enthusiast & community builder',
  avatarGradient: 'linear-gradient(135deg, #6C3CE1, #06B6D4)',
  badges: ['Aadhaar Verified', 'Developer', 'Creator', 'Student']
});

// Seed stats from Me.tsx hardcoded values
const seedStats = (): Stats => ({
  friends: 248,
  followers: 1200,
  following: 86,
  posts: 34
});

// Seed streaks from profile.data.ts
const seedStreaks = (): Streak[] => [...mockStreaks] as Streak[];

// Seed connections from profile.data.ts
const seedConnections = (): Connection[] => [...mockConnections];

// Seed moments from Moments.tsx hardcoded timeline
const seedMoments = (): Moment[] => [
  { id: 'm-1', date: 'Dec 12', icon: '🎪', title: 'Attended GDG Agentathon', subtitle: 'Madhapur, Hyd' },
  { id: 'm-2', date: 'Dec 10', icon: '👥', title: 'Connected with 3 people', subtitle: 'via Vchat Drop' },
  { id: 'm-3', date: 'Dec 8', icon: '⚡', title: 'Paid electricity bill', subtitle: '₹1,340 via Vchat Pay' },
  { id: 'm-4', date: 'Dec 5', icon: '🎂', title: 'Wished 2 friends birthday', subtitle: 'Priya and Arjun' },
  { id: 'm-5', date: 'Dec 1', icon: '💸', title: 'Sent ₹5,000 to Dad', subtitle: 'Monthly transfer' }
];

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      profile: seedProfile(),
      stats: seedStats(),
      streaks: seedStreaks(),
      connections: seedConnections(),
      moments: seedMoments(),

      updateProfile: (fields: Partial<Profile>) => {
        set((state) => ({
          profile: { ...state.profile, ...fields }
        }));
      },

      updateStreakTheme: (streakId: string, theme: string) => {
        set((state) => ({
          streaks: state.streaks.map((streak) =>
            streak.id === streakId ? { ...streak, theme } : streak
          )
        }));
      },

      incrementStat: (field: keyof Stats, amount: number = 1) => {
        set((state) => ({
          stats: {
            ...state.stats,
            [field]: state.stats[field] + amount
          }
        }));
      }
    }),
    {
      name: 'profile-storage',
      partialize: (state) => ({
        profile: state.profile,
        stats: state.stats,
        streaks: state.streaks,
        connections: state.connections,
        moments: state.moments
      })
    }
  )
);
