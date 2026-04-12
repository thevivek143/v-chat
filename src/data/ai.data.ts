export const mockInsights = {
  urgent: [
    {
      id: 'ui-1',
      title: 'Electricity bill due in 2 days',
      desc: '₹1,340 via TSPCL',
      action: 'Pay Now',
      color: 'red'
    },
    {
      id: 'ui-2',
      title: 'Overdue task',
      desc: 'Submit weekly report to Priya',
      action: 'Mark Done',
      color: 'red'
    }
  ],
  today: [
    {
      id: 'ti-1',
      title: 'Rahul\'s Birthday',
      desc: 'He turns 28 today',
      action: 'Wish Him',
      color: 'amber'
    },
    {
      id: 'ti-2',
      title: 'Team Standup',
      desc: '10:00 AM • Work Group',
      action: 'Join Call',
      color: 'amber'
    }
  ],
  suggestions: [
    {
      id: 'su-1',
      title: 'Reconnect',
      desc: "Haven't spoken to Ravi in 3 weeks",
      action: 'Message',
      color: 'primary'
    },
    {
      id: 'su-2',
      title: 'Spending Alert',
      desc: "You've spent 40% more on food this month vs last month",
      action: 'See breakdown',
      color: 'primary'
    },
    {
      id: 'su-3',
      title: 'Scheme Eligibility',
      desc: "3 government schemes you qualify for — est. benefit ₹45,000",
      action: 'Check now',
      color: 'primary'
    }
  ],
  summaries: [
    {
      id: 'sum-1',
      group: 'Family Group',
      messages: '14 messages since your last visit',
      summary: 'Discussing weekend dinner plans. Mom suggested Paradise Biryani. Need your confirmation.',
      action: 'Read full'
    },
    {
      id: 'sum-2',
      group: 'GDG Agentathon',
      messages: '42 messages since your last visit',
      summary: 'Hackathon result links posted. Sanjay shared the GitHub repo for the main architecture.',
      action: 'Read full'
    }
  ]
};

export const mockAIChatSequence = [
  {
    id: 'm-0',
    sender: 'ai',
    text: "Good morning Vivek! Here's your daily briefing: Electricity bill due in 2 days, Rahul's birthday tomorrow, and you have a team standup at 10am. What can I help with?"
  },
  {
    id: 'm-1',
    sender: 'user',
    text: "Remind me to call Mom tonight at 8pm"
  },
  {
    id: 'm-2',
    sender: 'ai',
    text: "Done! I'll remind you at 8:00 PM tonight to call Mom. Should I also check if she's available by looking at her recent activity? 😊"
  },
  {
    id: 'm-3',
    sender: 'user',
    text: "Find that PDF about the project proposal"
  },
  {
    id: 'm-4',
    sender: 'ai',
    text: "Found it! 'TechCorp_Project_Proposal_Nov2024.pdf' — shared by Ankit in your Work group on November 28th. Open it?"
  }
];
