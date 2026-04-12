// FinTech Hub Mock Data
export const mockTransactions = [
  {
    id: 'tx-1',
    type: 'receive',
    icon: '👤',
    name: 'Rahul Kumar',
    desc: 'Dinner split',
    date: 'Dec 10',
    amount: '+₹500',
    isPositive: true
  },
  {
    id: 'tx-2',
    type: 'send',
    icon: '🌸',
    name: 'Priya Desai',
    desc: 'Concert tickets',
    date: 'Dec 9',
    amount: '-₹1,200',
    isPositive: false
  },
  {
    id: 'tx-3',
    type: 'bill',
    icon: '⚡',
    name: 'Electricity Bill',
    desc: 'TSSPDCL',
    date: 'Dec 8',
    amount: '-₹1,340',
    isPositive: false
  },
  {
    id: 'tx-4',
    type: 'merchant',
    icon: '🍔',
    name: 'Swiggy Order',
    desc: 'Food delivery',
    date: 'Dec 7',
    amount: '-₹450',
    isPositive: false
  },
  {
    id: 'tx-5',
    type: 'send',
    icon: '👨',
    name: 'Dad',
    desc: 'Monthly',
    date: 'Dec 1',
    amount: '-₹5,000',
    isPositive: false
  }
];

export const mockContacts = [
  { id: 'c1', name: 'Rahul Kumar', initials: 'RK', grad: 'linear-gradient(135deg, #6C3CE1, #06B6D4)', lastPaid: 'Yesterday' },
  { id: 'c2', name: 'Priya Desai', initials: 'PD', grad: 'linear-gradient(135deg, #F59E0B, #EF4444)', lastPaid: 'Dec 9' },
  { id: 'c3', name: 'Arjun Mehta', initials: 'AM', grad: 'linear-gradient(135deg, #10B981, #8B5CF6)', lastPaid: 'Nov 23' },
  { id: 'c4', name: 'Dad', initials: 'D', grad: 'linear-gradient(135deg, #EC4899, #F59E0B)', lastPaid: 'Dec 1' }
];

export const mockRestaurants = [
  {
    id: 'r-1',
    name: 'Paradise Biryani Palace',
    tags: 'Biryani, Mughlai',
    rating: '4.8',
    time: '20-30 min',
    fee: 'Free delivery',
    badge: 'Bestseller',
    emoji: '🍛',
    grad: 'linear-gradient(135deg, #F59E0B, #EF4444)'
  },
  {
    id: 'r-2',
    name: 'Pizza Hub',
    tags: 'Pizza, Italian',
    rating: '4.2',
    time: '30-40 min',
    fee: '₹30',
    badge: '',
    emoji: '🍕',
    grad: 'linear-gradient(135deg, #6C3CE1, #EC4899)'
  },
  {
    id: 'r-3',
    name: 'Green Bowl',
    tags: 'Healthy, Salads',
    rating: '4.5',
    time: '15-25 min',
    fee: '₹20',
    badge: 'Trending',
    emoji: '🥗',
    grad: 'linear-gradient(135deg, #10B981, #06B6D4)'
  },
  {
    id: 'r-4',
    name: 'Burger Farm',
    tags: 'Burgers, American',
    rating: '4.1',
    time: '25-35 min',
    fee: '₹25',
    badge: '',
    emoji: '🍔',
    grad: 'linear-gradient(135deg, #8B5CF6, #3B82F6)'
  },
  {
    id: 'r-5',
    name: 'Cafe Coffee Central',
    tags: 'Cafe, Beverages',
    rating: '4.6',
    time: '10-20 min',
    fee: '₹15',
    badge: '',
    emoji: '☕',
    grad: 'linear-gradient(135deg, #A855F7, #EC4899)'
  }
];

export const mockJobs = [
  {
    id: 'j-1',
    title: 'Frontend Developer',
    company: 'Google',
    loc: 'Hyderabad',
    salary: '₹12-18 LPA',
    type: 'Full-time',
    skills: ['React', 'TypeScript', 'CSS'],
    matchScore: 95,
    posted: '2 days ago',
    grad: 'linear-gradient(135deg, #3B82F6, #10B981)'
  },
  {
    id: 'j-2',
    title: 'UI/UX Designer',
    company: 'Swiggy',
    loc: 'Remote',
    salary: '₹8-14 LPA',
    type: 'Full-time',
    skills: ['Figma', 'Design Systems'],
    matchScore: 88,
    posted: '1 week ago',
    grad: 'linear-gradient(135deg, #F59E0B, #EC4899)'
  },
  {
    id: 'j-3',
    title: 'Flutter Developer',
    company: 'PhonePe',
    loc: 'Bangalore',
    salary: '₹15-22 LPA',
    type: 'Full-time',
    skills: ['Flutter', 'Dart', 'Firebase'],
    matchScore: 82,
    posted: '3 days ago',
    grad: 'linear-gradient(135deg, #6C3CE1, #8B5CF6)'
  },
  {
    id: 'j-4',
    title: 'Full Stack Developer',
    company: 'Startup',
    loc: 'Hyderabad',
    salary: '₹6-10 LPA',
    type: 'Full-time',
    skills: ['Node.js', 'React', 'MongoDB'],
    matchScore: 79,
    posted: 'Today',
    grad: 'linear-gradient(135deg, #10B981, #06B6D4)'
  }
];

export const mockHackathons = [
  {
    id: 'h-1',
    title: 'GDG Solution Challenge 2025',
    org: 'Google',
    mode: 'Online',
    perk: 'Top teams get Google internship',
    members: '1-4',
    deadline: 'Dec 20',
    emoji: '🚀',
    grad: 'linear-gradient(135deg, #4285F4, #34A853)'
  },
  {
    id: 'h-2',
    title: 'T-Hub Innovation Challenge',
    org: 'T-Hub Hyderabad',
    mode: 'Offline',
    perk: '₹5 Lakh prize',
    members: '2-5',
    deadline: 'Jan 15',
    emoji: '💡',
    grad: 'linear-gradient(135deg, #EA4335, #FBBC05)'
  },
  {
    id: 'h-3',
    title: 'AgriTech Hackathon',
    org: 'NABARD',
    mode: 'Online',
    perk: '₹2 Lakh',
    members: '1-3',
    deadline: 'Jan 30',
    emoji: '🌾',
    grad: 'linear-gradient(135deg, #34A853, #10B981)'
  }
];

export const mockMedicalRecords = [
  {
    id: 'm-1',
    title: 'Complete Blood Count',
    date: 'Dec 5, 2024',
    hospital: 'Apollo Diagnostics',
    isAiAnalyzed: true,
    icon: '🔬',
    bg: 'rgba(108,60,225,0.15)',
    color: 'var(--primary-light)'
  },
  {
    id: 'm-2',
    title: 'Prescription — Dr. Sharma',
    date: 'Nov 20, 2024',
    hospital: 'Yashoda Hospital',
    isAiAnalyzed: false,
    icon: '💊',
    bg: 'rgba(239,68,68,0.15)',
    color: '#EF4444'
  },
  {
    id: 'm-3',
    title: 'Chest X-Ray',
    date: 'Oct 15, 2024',
    hospital: 'Care Hospitals',
    isAiAnalyzed: false,
    icon: '🫁',
    bg: 'rgba(6,182,212,0.15)',
    color: '#06B6D4'
  }
];

export const mockMandiPrices = [
  { crop: '🌾 Rice', price: '₹2,180', change: '+₹45', isUp: true },
  { crop: '🌽 Maize', price: '₹1,850', change: '-₹20', isUp: false },
  { crop: '🫘 Soybean', price: '₹4,200', change: '+₹120', isUp: true },
  { crop: '🧅 Onion', price: '₹1,450', change: '+₹80', isUp: true },
  { crop: '🍅 Tomato', price: '₹890', change: '-₹45', isUp: false }
];
