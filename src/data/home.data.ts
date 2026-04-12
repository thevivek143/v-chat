export type Story = {
  id: string;
  name: string;
  emoji: string;
  seen: boolean;
};

export type NewsItem = {
  id: string;
  emoji: string;
  bgColor: string;
  title: string;
  location: string;
  time: string;
  category: string;
  categoryColor: string; // Tailwind class background variant if needed, but we'll use inline styles or specific var color mappings
};

export type AiInsight = {
  id: string;
  type: string;
  label: string;
  labelColor: string; // The hex color or rbga for text/border
  labelBg: string;    // bg color
  text: React.ReactNode;
  action: string;
  actionRoute: string;
};

export const storiesData: Story[] = [
  { id: '1', name: 'Priya', emoji: '👩', seen: false },
  { id: '2', name: 'Rahul', emoji: '👨', seen: false },
  { id: '3', name: 'Dad', emoji: '👴', seen: true },
  { id: '4', name: 'Meera', emoji: '👩‍💼', seen: false },
  { id: '5', name: 'Arjun', emoji: '👦', seen: true },
  { id: '6', name: 'Ankit', emoji: '🧑‍💻', seen: false },
];

export const newsItemsData: NewsItem[] = [
  {
    id: '1',
    emoji: '🏗️',
    bgColor: 'rgba(245,158,11,0.12)',
    title: 'Hyderabad Metro Phase 3 approved — New routes from Hitec City',
    location: 'Hitec City',
    time: '2h ago',
    category: 'Local',
    categoryColor: 'cyan',
  },
  {
    id: '2',
    emoji: '💧',
    bgColor: 'rgba(6,182,212,0.12)',
    title: 'Water supply disruption in Kondapur area tomorrow 6am-10am',
    location: 'Kondapur',
    time: '4h ago',
    category: 'Alert',
    categoryColor: 'red',
  },
  {
    id: '3',
    emoji: '🚀',
    bgColor: 'rgba(108,60,225,0.12)',
    title: 'GDG Hyderabad Agentathon 2025 registrations now open',
    location: 'Tech',
    time: '6h ago',
    category: 'Event',
    categoryColor: 'primary',
  },
];

export const aiInsightsData: AiInsight[] = [
  {
    id: '1',
    type: 'BILL',
    label: 'BILL',
    labelColor: '#EF4444',
    labelBg: 'rgba(239,68,68,0.15)',
    text: 'Electricity 15% higher · ₹1,340 due in 2 days',
    action: 'Pay →',
    actionRoute: '/pay',
  },
  {
    id: '2',
    type: 'BDAY',
    label: 'BDAY',
    labelColor: '#F59E0B',
    labelBg: 'rgba(245,158,11,0.15)',
    text: 'Rahul\'s birthday tomorrow',
    action: 'Wish →',
    actionRoute: '/chat/rahul',
  },
  {
    id: '3',
    type: 'CHAT',
    label: 'CHAT',
    labelColor: '#06B6D4',
    labelBg: 'rgba(6,182,212,0.15)',
    text: 'Family: 12 msgs · Sunday function confirmed',
    action: 'Read →',
    actionRoute: '/chat/family',
  },
];
