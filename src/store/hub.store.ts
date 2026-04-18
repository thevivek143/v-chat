import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  mockTransactions,
  mockRestaurants,
  mockJobs,
  mockHackathons
} from '../data/hub.data';

// Types based on hub.data.ts structures
export interface Transaction {
  id: string;
  type: 'receive' | 'send' | 'bill' | 'merchant';
  icon: string;
  name: string;
  desc: string;
  date: string;
  amount: string;
  isPositive: boolean;
}

export interface Restaurant {
  id: string;
  name: string;
  tags: string;
  rating: string;
  time: string;
  fee: string;
  badge: string;
  emoji: string;
  grad: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  loc: string;
  salary: string;
  type: string;
  skills: string[];
  matchScore: number;
  posted: string;
  grad: string;
}

export interface Hackathon {
  id: string;
  title: string;
  org: string;
  mode: string;
  perk: string;
  members: string;
  deadline: string;
  emoji: string;
  grad: string;
}

export interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

export interface Cart {
  restaurantId: string | null;
  items: CartItem[];
}

interface HubState {
  // Location/State
  selectedState: string;
  searchQuery: string;

  // Finance
  balance: number;
  transactions: Transaction[];

  // Services data
  restaurants: Restaurant[];
  jobs: Job[];
  hackathons: Hackathon[];

  // User interaction tracking
  appliedJobs: string[];
  savedJobs: string[];
  cart: Cart;

  // Actions
  setSelectedState: (state: string) => void;
  setSearchQuery: (query: string) => void;
  sendMoney: (to: string, amount: number) => void;
  applyJob: (id: string) => void;
  toggleSaveJob: (id: string) => void;
  addToCart: (restaurantId: string, item: CartItem) => void;
  removeFromCart: (itemIndex: number) => void;
  clearCart: () => void;
  getFilteredRestaurants: () => Restaurant[];
  getFilteredJobs: () => Job[];
}

// Generate unique ID for transactions
const generateId = (): string => {
  return `tx-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Get avatar emoji based on name
const getAvatarEmoji = (name: string): string => {
  const emojiMap: Record<string, string> = {
    'Rahul Kumar': '👤',
    'Priya Desai': '🌸',
    'Dad': '👨',
    'Mom': '👩'
  };
  return emojiMap[name] || '👤';
};

export const useHubStore = create<HubState>()(
  persist(
    (set, get) => ({
      // Initial state
      selectedState: 'Telangana',
      searchQuery: '',
      balance: 24850,
      transactions: [...mockTransactions] as Transaction[],
      restaurants: [...mockRestaurants],
      jobs: [...mockJobs],
      hackathons: [...mockHackathons],
      appliedJobs: [],
      savedJobs: [],
      cart: {
        restaurantId: null,
        items: []
      },

      // Actions
      setSelectedState: (state: string) => {
        set({ selectedState: state });
      },

      setSearchQuery: (query: string) => {
        set({ searchQuery: query });
      },

      sendMoney: (to: string, amount: number) => {
        const { balance, transactions } = get();
        
        if (amount <= 0 || amount > balance) {
          return; // Don't proceed if invalid amount or insufficient balance
        }

        const newTransaction: Transaction = {
          id: generateId(),
          type: 'send',
          icon: getAvatarEmoji(to),
          name: to,
          desc: 'Sent via Vchat Pay',
          date: 'Just now',
          amount: `-₹${amount.toLocaleString()}`,
          isPositive: false
        };

        set({
          balance: balance - amount,
          transactions: [newTransaction, ...transactions]
        });
      },

      applyJob: (id: string) => {
        const { appliedJobs } = get();
        if (!appliedJobs.includes(id)) {
          set({ appliedJobs: [...appliedJobs, id] });
        }
      },

      toggleSaveJob: (id: string) => {
        const { savedJobs } = get();
        if (savedJobs.includes(id)) {
          set({ savedJobs: savedJobs.filter(jobId => jobId !== id) });
        } else {
          set({ savedJobs: [...savedJobs, id] });
        }
      },

      addToCart: (restaurantId: string, item: CartItem) => {
        const { cart } = get();
        
        // If cart is empty or from same restaurant, add item
        if (cart.restaurantId === null || cart.restaurantId === restaurantId) {
          set({
            cart: {
              restaurantId,
              items: [...cart.items, item]
            }
          });
        } else {
          // Different restaurant - clear cart first then add
          set({
            cart: {
              restaurantId,
              items: [item]
            }
          });
        }
      },

      removeFromCart: (itemIndex: number) => {
        const { cart } = get();
        const newItems = cart.items.filter((_, index) => index !== itemIndex);
        
        set({
          cart: {
            restaurantId: newItems.length > 0 ? cart.restaurantId : null,
            items: newItems
          }
        });
      },

      clearCart: () => {
        set({
          cart: {
            restaurantId: null,
            items: []
          }
        });
      },

      getFilteredRestaurants: () => {
        const { restaurants, searchQuery } = get();
        
        if (!searchQuery.trim()) {
          return restaurants;
        }
        
        const query = searchQuery.toLowerCase();
        return restaurants.filter(
          restaurant =>
            restaurant.name.toLowerCase().includes(query) ||
            restaurant.tags.toLowerCase().includes(query)
        );
      },

      getFilteredJobs: () => {
        const { jobs, searchQuery } = get();
        
        if (!searchQuery.trim()) {
          return jobs;
        }
        
        const query = searchQuery.toLowerCase();
        return jobs.filter(
          job =>
            job.title.toLowerCase().includes(query) ||
            job.company.toLowerCase().includes(query)
        );
      }
    }),
    {
      name: 'hub-storage',
      partialize: (state) => ({
        selectedState: state.selectedState,
        balance: state.balance,
        transactions: state.transactions,
        appliedJobs: state.appliedJobs,
        savedJobs: state.savedJobs,
        cart: state.cart
      })
    }
  )
);
