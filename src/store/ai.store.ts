import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AIMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  time: string;
}

interface AIState {
  messages: AIMessage[];
  isTyping: boolean;

  sendMessage: (text: string) => void;
  clearHistory: () => void;
}

// Initial seed messages from mockAIChatSequence
const initialMessages: AIMessage[] = [
  {
    id: 'm-0',
    sender: 'ai',
    text: "Good morning Vivek! Here's your daily briefing: Electricity bill due in 2 days, Rahul's birthday tomorrow, and you have a team standup at 10am. What can I help with?",
    time: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
  },
  {
    id: 'm-1',
    sender: 'user',
    text: "Remind me to call Mom tonight at 8pm",
    time: new Date(Date.now() - 1000 * 60 * 60 * 1.5).toISOString(), // 1.5 hours ago
  },
  {
    id: 'm-2',
    sender: 'ai',
    text: "Done! I'll remind you at 8:00 PM tonight to call Mom. Should I also check if she's available by looking at her recent activity? 😊",
    time: new Date(Date.now() - 1000 * 60 * 60 * 1.5).toISOString(),
  },
  {
    id: 'm-3',
    sender: 'user',
    text: "Find that PDF about the project proposal",
    time: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
  },
  {
    id: 'm-4',
    sender: 'ai',
    text: "Found it! 'TechCorp_Project_Proposal_Nov2024.pdf' — shared by Ankit in your Work group on November 28th. Open it?",
    time: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
];

// Default responses when no keyword matches
const defaultResponses = [
  "That's a great point! Let me look into that for you.",
  "I understand. Would you like me to help you with anything specific about that?",
  "Interesting! I'm processing that. Is there anything else you'd like to know?",
  "Got it! I'll keep that in mind. Anything else I can help with?",
];

function simulateAIResponse(userText: string): string {
  const lowerText = userText.toLowerCase();

  // Weather-related queries
  if (lowerText.includes('weather') || lowerText.includes('temperature')) {
    return "Currently it's 28°C and partly cloudy in your area. Would you like me to set up a weather alert for tomorrow?";
  }

  // Reminder/schedule-related queries
  if (lowerText.includes('remind') || lowerText.includes('reminder') || lowerText.includes('schedule')) {
    return "I've noted that! I'll remind you at the right time. Would you like me to add this to your calendar as well?";
  }

  // Translation queries
  if (lowerText.includes('translate')) {
    return "I can help with that! Just send me the text and tell me the target language. I support Hindi, Telugu, Tamil, Bengali, and 20+ more languages.";
  }

  // Help/what can you do queries
  if (lowerText.includes('help') || lowerText.includes('what can you')) {
    return "I can help you with: 📅 Scheduling & reminders, 🌤️ Weather updates, 🔄 Translation, 📝 Summarizing chats, 💡 Smart suggestions, and much more! Just ask away.";
  }

  // Summary queries
  if (lowerText.includes('summarize') || lowerText.includes('summary')) {
    return "Here's a quick summary of your recent activity: You have 3 unread messages from Rahul, a pending family calendar event tomorrow, and Priya shared 2 new photos in the group.";
  }

  // Greeting queries
  if (lowerText.includes('hello') || lowerText.includes('hi') || lowerText.includes('hey')) {
    return "Hey there! 👋 How can I help you today? I'm ready to assist with anything you need.";
  }

  // Thank you queries
  if (lowerText.includes('thank')) {
    return "You're welcome! 😊 Let me know if there's anything else I can help with.";
  }

  // Food-related queries
  if (lowerText.includes('food') || lowerText.includes('eat') || lowerText.includes('hungry')) {
    return "I can help you order food! There are 3 restaurants nearby with great ratings. Want me to show you options on VChat Food Delivery?";
  }

  // Payment-related queries
  if (lowerText.includes('pay') || lowerText.includes('send money') || lowerText.includes('payment')) {
    return "I can help with payments through VChat Pay. Who would you like to send money to, and how much?";
  }

  // Default: random response
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

export const useAIStore = create<AIState>()(
  persist(
    (set) => ({
      messages: initialMessages,
      isTyping: false,

      sendMessage: (text: string) => {
        const userMessage: AIMessage = {
          id: Date.now().toString(),
          text,
          sender: 'user',
          time: new Date().toISOString(),
        };

        set((state) => ({
          messages: [...state.messages, userMessage],
          isTyping: true,
        }));

        // Simulate AI response after 1-2 second delay
        const delay = 1000 + Math.random() * 1000;

        setTimeout(() => {
          const aiResponse: AIMessage = {
            id: (Date.now() + 1).toString(),
            text: simulateAIResponse(text),
            sender: 'ai',
            time: new Date().toISOString(),
          };

          set((state) => ({
            messages: [...state.messages, aiResponse],
            isTyping: false,
          }));
        }, delay);
      },

      clearHistory: () => {
        set({
          messages: initialMessages,
          isTyping: false,
        });
      },
    }),
    {
      name: 'ai-chat-storage',
    }
  )
);
