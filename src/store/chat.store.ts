import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { contextGroups, directMessages, spaces } from '../data/chat.data';
import { rahulMessages, type ChatMessage } from '../data/chatDetail.data';

export type MessageType = 'text' | 'voice' | 'image';
export type Sender = 'me' | string;

export interface Message {
  id: string;
  type: MessageType;
  sender: Sender;
  text?: string;
  time: string;
  status?: 'sent' | 'delivered' | 'read';
  isRead?: boolean;
  isDelivered?: boolean;
  originalText?: string;
  originalLanguage?: string;
  voiceDuration?: string;
  transcription?: string;
}

export interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online?: boolean;
  type: 'dm' | 'group' | 'space';
  // Additional fields from original data
  gradient?: string;
  emoji?: string;
  initials?: string;
  streak?: string;
  tagLabel?: string;
  tagBg?: string;
  tagColor?: string;
  badgeBg?: string;
  subtitle?: string;
}

interface ChatState {
  chats: Chat[];
  messages: Record<string, Message[]>;
  activeFilter: string;
  searchQuery: string;

  // Actions
  sendMessage: (chatId: string, text: string) => void;
  markAsRead: (chatId: string) => void;
  setFilter: (filter: string) => void;
  setSearchQuery: (query: string) => void;
  getFilteredChats: () => Chat[];
  createChat: (contactName: string, emoji?: string) => string;
  simulateReply: (chatId: string) => void;
}

// Helper to convert ChatMessage to Message
const convertChatMessage = (msg: ChatMessage): Message => ({
  id: msg.id,
  type: msg.type,
  sender: msg.sender === 'them' ? 'rahul' : 'me',
  text: msg.text,
  time: msg.time,
  isRead: msg.isRead,
  isDelivered: msg.isDelivered,
  originalText: msg.originalText,
  originalLanguage: msg.originalLanguage,
  voiceDuration: msg.voiceDuration,
  transcription: msg.transcription,
  status: msg.isRead ? 'read' : msg.isDelivered ? 'delivered' : 'sent'
});

// Helper to get current time string
const getCurrentTime = (): string => {
  const now = new Date();
  return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
};

// Generate unique ID
const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Reply messages for simulation
const replyMessages = [
  "Sure, sounds good!",
  "I'll check and get back to you",
  "That's interesting!",
  "Got it! 👍",
  "Let me think about it",
  "Thanks for letting me know!",
  "Haha, exactly!",
  "Can you explain more?",
  "Awesome! 🎉",
  "See you soon!"
];

// Seed chats from existing data
const seedChats = (): Chat[] => {
  const chats: Chat[] = [];

  // Add context groups
  contextGroups.forEach(group => {
    chats.push({
      id: group.id,
      name: group.name,
      avatar: group.emoji,
      lastMessage: group.lastMessage,
      time: group.time,
      unread: group.unread,
      type: 'group',
      gradient: group.gradient,
      emoji: group.emoji,
      tagLabel: group.tagLabel,
      tagBg: group.tagBg,
      tagColor: group.tagColor,
      badgeBg: group.badgeBg
    });
  });

  // Add direct messages
  directMessages.forEach(dm => {
    chats.push({
      id: dm.id,
      name: dm.name,
      avatar: dm.initials,
      lastMessage: dm.lastMessage,
      time: dm.time,
      unread: dm.unread,
      online: dm.isOnline,
      type: 'dm',
      gradient: dm.gradient,
      initials: dm.initials,
      streak: dm.streak
    });
  });

  // Add spaces
  spaces.forEach(space => {
    chats.push({
      id: space.id,
      name: space.name,
      avatar: space.emoji,
      lastMessage: space.subtitle,
      time: '',
      unread: 0,
      type: 'space',
      gradient: space.gradient,
      emoji: space.emoji,
      subtitle: space.subtitle
    });
  });

  return chats;
};

// Seed messages from existing data
const seedMessages = (): Record<string, Message[]> => {
  const messages: Record<string, Message[]> = {};

  // Seed rahul messages
  messages['rahul'] = rahulMessages.map(convertChatMessage);

  return messages;
};

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      chats: seedChats(),
      messages: seedMessages(),
      activeFilter: 'All',
      searchQuery: '',

      sendMessage: (chatId: string, text: string) => {
        const newMessage: Message = {
          id: generateId(),
          type: 'text',
          sender: 'me',
          text,
          time: getCurrentTime(),
          status: 'sent'
        };

        set((state) => ({
          messages: {
            ...state.messages,
            [chatId]: [...(state.messages[chatId] || []), newMessage]
          },
          chats: state.chats.map(chat =>
            chat.id === chatId
              ? { ...chat, lastMessage: text, time: getCurrentTime() }
              : chat
          )
        }));
      },

      markAsRead: (chatId: string) => {
        set((state) => ({
          chats: state.chats.map(chat =>
            chat.id === chatId ? { ...chat, unread: 0 } : chat
          )
        }));
      },

      setFilter: (filter: string) => {
        set({ activeFilter: filter });
      },

      setSearchQuery: (query: string) => {
        set({ searchQuery: query });
      },

      getFilteredChats: () => {
        const { chats, activeFilter, searchQuery } = get();

        let filtered = [...chats];

        // Apply filter
        switch (activeFilter) {
          case 'Unread':
            filtered = filtered.filter(chat => chat.unread > 0);
            break;
          case 'Groups':
            filtered = filtered.filter(chat => chat.type === 'group');
            break;
          case 'Spaces':
            filtered = filtered.filter(chat => chat.type === 'space');
            break;
          case 'Archived':
            filtered = []; // Empty for now
            break;
          case 'All':
          default:
            break;
        }

        // Apply search
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          filtered = filtered.filter(
            chat =>
              chat.name.toLowerCase().includes(query) ||
              chat.lastMessage.toLowerCase().includes(query)
          );
        }

        // Sort by time (most recent first)
        // Simple sort: empty time at bottom, then by time string
        filtered.sort((a, b) => {
          if (!a.time && !b.time) return 0;
          if (!a.time) return 1;
          if (!b.time) return -1;

          // Convert time strings for comparison
          const timeA = parseTime(a.time);
          const timeB = parseTime(b.time);
          return timeB - timeA;
        });

        return filtered;
      },

      createChat: (contactName: string, emoji?: string) => {
        const chatId = generateId();
        const newChat: Chat = {
          id: chatId,
          name: contactName,
          avatar: emoji || contactName.charAt(0).toUpperCase(),
          lastMessage: '',
          time: getCurrentTime(),
          unread: 0,
          type: 'dm'
        };

        set((state) => ({
          chats: [newChat, ...state.chats],
          messages: { ...state.messages, [chatId]: [] }
        }));

        return chatId;
      },

      simulateReply: (chatId: string) => {
        const { chats } = get();
        const chat = chats.find(c => c.id === chatId);
        if (!chat) return;

        const delay = 1000 + Math.random() * 2000; // 1-3 seconds

        setTimeout(() => {
          const replyText = replyMessages[Math.floor(Math.random() * replyMessages.length)];
          const replyMessage: Message = {
            id: generateId(),
            type: 'text',
            sender: chat.name,
            text: replyText,
            time: getCurrentTime(),
            status: 'read'
          };

          set((state) => ({
            messages: {
              ...state.messages,
              [chatId]: [...(state.messages[chatId] || []), replyMessage]
            },
            chats: state.chats.map(c =>
              c.id === chatId
                ? { ...c, lastMessage: replyText, time: getCurrentTime(), unread: c.unread + 1 }
                : c
            )
          }));
        }, delay);
      }
    }),
    {
      name: 'chat-storage',
      partialize: (state) => ({
        chats: state.chats,
        messages: state.messages,
        activeFilter: state.activeFilter,
        searchQuery: state.searchQuery
      })
    }
  )
);

// Helper to parse time string for sorting
function parseTime(timeStr: string): number {
  // Handle special cases like "Yesterday", "Mon", etc.
  if (timeStr.includes(':')) {
    // It's a time like "10:32"
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  }

  // For non-time strings, assign lower priority
  if (timeStr === 'Yesterday') return -1;
  if (['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].some(d => timeStr.includes(d))) {
    return -2;
  }

  return -3;
}
