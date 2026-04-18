import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  storiesData,
  newsItemsData,
  aiInsightsData,
  type Story,
  type NewsItem,
  type AiInsight,
} from '../data/home.data';

interface HomeState {
  stories: Story[];
  newsItems: NewsItem[];
  aiInsights: AiInsight[];

  seenStories: string[];
  dismissedInsights: string[];
  unreadNotifications: number;
  storyTab: string;

  // Actions
  markStorySeen: (id: string) => void;
  dismissInsight: (id: string) => void;
  setStoryTab: (tab: string) => void;
  clearNotifications: () => void;
  getGreeting: () => string;
  getVisibleInsights: () => AiInsight[];
}

export const useHomeStore = create<HomeState>()(
  persist(
    (set, get) => ({
      stories: storiesData,
      newsItems: newsItemsData,
      aiInsights: aiInsightsData,

      seenStories: [],
      dismissedInsights: [],
      unreadNotifications: 3,
      storyTab: 'Circle',

      markStorySeen: (id: string) => {
        set((state) => {
          if (state.seenStories.includes(id)) {
            return state;
          }
          return {
            seenStories: [...state.seenStories, id],
          };
        });
      },

      dismissInsight: (id: string) => {
        set((state) => ({
          dismissedInsights: [...state.dismissedInsights, id],
        }));
      },

      setStoryTab: (tab: string) => {
        set({ storyTab: tab });
      },

      clearNotifications: () => {
        set({ unreadNotifications: 0 });
      },

      getGreeting: () => {
        const hour = new Date().getHours();
        let greeting: string;

        if (hour >= 5 && hour <= 11) {
          greeting = 'Good morning';
        } else if (hour >= 12 && hour <= 16) {
          greeting = 'Good afternoon';
        } else if (hour >= 17 && hour <= 20) {
          greeting = 'Good evening';
        } else {
          greeting = 'Good night';
        }

        return `${greeting}, Vivek 👋`;
      },

      getVisibleInsights: () => {
        const { aiInsights, dismissedInsights } = get();
        return aiInsights.filter(
          (insight) => !dismissedInsights.includes(insight.id)
        );
      },
    }),
    {
      name: 'home-storage',
      partialize: (state) => ({
        seenStories: state.seenStories,
        dismissedInsights: state.dismissedInsights,
        unreadNotifications: state.unreadNotifications,
        storyTab: state.storyTab,
      }),
    }
  )
);
