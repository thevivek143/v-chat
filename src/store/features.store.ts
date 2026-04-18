import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface PollOption {
  id: string;
  text: string;
  votes: number;
  percentage: number;
}

export interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  totalVotes: number;
  deadline: string;
  createdBy: string;
  status: 'active' | 'closed';
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  type: string;
  color: string;
  participants?: string[];
}

export interface WorkTask {
  id: string;
  title: string;
  assignee: string;
  status: 'pending' | 'in-progress' | 'completed' | 'overdue';
  deadline: string;
  priority: 'high' | 'medium' | 'low';
  penalty?: number;
}

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
  grade?: string;
  description?: string;
}

interface FeaturesState {
  // Voting
  polls: Poll[];
  userVotes: Record<string, string>;

  // Calendar
  calendarEvents: CalendarEvent[];
  selectedDate: string;

  // Work Tasks
  workTasks: WorkTask[];
  taskFilter: string;

  // Assignments
  assignments: Assignment[];
  assignmentFilter: string;
  submissions: Record<string, string>;

  // Actions
  vote: (pollId: string, optionId: string) => void;
  addEvent: (event: Omit<CalendarEvent, 'id'>) => void;
  deleteEvent: (id: string) => void;
  addTask: (task: Omit<WorkTask, 'id'>) => void;
  toggleTaskComplete: (id: string) => void;
  setTaskFilter: (filter: string) => void;
  submitAssignment: (id: string, text: string) => void;
  setAssignmentFilter: (filter: string) => void;
}

// Generate unique ID
const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Get today's date as ISO string
const getTodayISO = (): string => {
  return new Date().toISOString().split('T')[0];
};

// Seed data from feature pages
const seedPolls = (): Poll[] => [
  {
    id: 'poll-1',
    question: 'Should we install CCTV at main gate?',
    options: [
      { id: 'opt-1', text: 'Yes', votes: 12, percentage: 68 },
      { id: 'opt-2', text: 'No', votes: 6, percentage: 32 },
    ],
    totalVotes: 18,
    deadline: '2024-12-13',
    createdBy: 'Admin',
    status: 'active',
  },
  {
    id: 'poll-2',
    question: 'New parking rule — odd/even days?',
    options: [
      { id: 'opt-3', text: 'Option A (odd/even)', votes: 5, percentage: 45 },
      { id: 'opt-4', text: 'Option B (keep current)', votes: 6, percentage: 55 },
    ],
    totalVotes: 11,
    deadline: '2024-12-15',
    createdBy: 'Admin',
    status: 'active',
  },
  {
    id: 'poll-3',
    question: 'Speed breaker near B block?',
    options: [
      { id: 'opt-5', text: 'Yes', votes: 97, percentage: 78 },
      { id: 'opt-6', text: 'No', votes: 27, percentage: 22 },
    ],
    totalVotes: 124,
    deadline: '2024-12-01',
    createdBy: 'Admin',
    status: 'closed',
  },
];

const seedCalendarEvents = (): CalendarEvent[] => [
  {
    id: 'evt-1',
    title: "Priya's Birthday",
    date: '2024-12-15',
    time: '09:00',
    type: 'family',
    color: 'var(--pink)',
    participants: ['Mom'],
  },
  {
    id: 'evt-2',
    title: "Dad's Doctor Appt",
    date: '2024-12-18',
    time: '09:00',
    type: 'medical',
    color: 'var(--red)',
    participants: ['Dad'],
  },
  {
    id: 'evt-3',
    title: "Arjun's Results",
    date: '2024-12-20',
    time: '09:00',
    type: 'social',
    color: 'var(--green)',
    participants: ['Arjun'],
  },
  {
    id: 'evt-4',
    title: 'Family Function',
    date: '2024-12-22',
    time: '09:00',
    type: 'family',
    color: 'var(--purple)',
    participants: ['Mom'],
  },
  {
    id: 'evt-5',
    title: 'Goa Trip',
    date: '2024-12-28',
    time: '09:00',
    type: 'social',
    color: 'var(--accent)',
    participants: ['Vivek'],
  },
];

const seedWorkTasks = (): WorkTask[] => [
  {
    id: 'task-1',
    title: 'Fix login bug',
    assignee: 'VK',
    status: 'in-progress',
    deadline: '2024-12-12',
    priority: 'high',
  },
  {
    id: 'task-2',
    title: 'Design new dashboard',
    assignee: 'AK',
    status: 'pending',
    deadline: '2024-12-15',
    priority: 'medium',
  },
  {
    id: 'task-3',
    title: 'Write API docs',
    assignee: 'MR',
    status: 'completed',
    deadline: '2024-12-10',
    priority: 'low',
  },
  {
    id: 'task-4',
    title: 'Review PR #234',
    assignee: 'VK',
    status: 'overdue',
    deadline: '2024-12-12',
    priority: 'high',
    penalty: 50,
  },
];

const seedAssignments = (): Assignment[] => [
  {
    id: 'asn-1',
    title: 'Data Structures Lab',
    subject: 'CS 401',
    dueDate: '2024-12-15T23:59:00',
    status: 'pending',
    description: 'Implement AVL Tree with rotations',
  },
  {
    id: 'asn-2',
    title: 'Assignment 3',
    subject: 'DBMS',
    dueDate: '2024-12-18T23:59:00',
    status: 'pending',
    description: 'ER Diagram for hospital system',
  },
  {
    id: 'asn-3',
    title: 'Mini Project',
    subject: 'OS',
    dueDate: '2024-12-20T23:59:00',
    status: 'submitted',
    description: 'Process Scheduling Simulator',
  },
  {
    id: 'asn-4',
    title: 'Assignment 1',
    subject: 'CN',
    dueDate: '2024-12-10T23:59:00',
    status: 'graded',
    grade: 'A / 92%',
    description: 'TCP/IP Protocol Analysis',
  },
];

export const useFeaturesStore = create<FeaturesState>()(
  persist(
    (set, get) => ({
      // Initial state
      polls: seedPolls(),
      userVotes: {},

      calendarEvents: seedCalendarEvents(),
      selectedDate: getTodayISO(),

      workTasks: seedWorkTasks(),
      taskFilter: 'All',

      assignments: seedAssignments(),
      assignmentFilter: 'All',
      submissions: {},

      // Actions
      vote: (pollId: string, optionId: string) => {
        const { polls, userVotes } = get();
        const poll = polls.find((p) => p.id === pollId);
        if (!poll || poll.status !== 'active') return;

        // Check if user already voted on this poll
        const previousVote = userVotes[pollId];
        if (previousVote === optionId) return; // Same vote, do nothing

        set((state) => {
          const newUserVotes = { ...state.userVotes, [pollId]: optionId };
          const newPolls = state.polls.map((p) => {
            if (p.id !== pollId) return p;

            const newOptions = p.options.map((opt) => {
              let newVotes = opt.votes;

              // Decrement previous vote if exists
              if (previousVote && opt.id === previousVote) {
                newVotes = Math.max(0, newVotes - 1);
              }

              // Increment new vote
              if (opt.id === optionId) {
                newVotes += 1;
              }

              return { ...opt, votes: newVotes };
            });

            // Recalculate percentages
            const totalVotes = newOptions.reduce((sum, opt) => sum + opt.votes, 0);
            const optionsWithPercentage = newOptions.map((opt) => ({
              ...opt,
              percentage: totalVotes > 0 ? Math.round((opt.votes / totalVotes) * 100) : 0,
            }));

            return {
              ...p,
              options: optionsWithPercentage,
              totalVotes,
            };
          });

          return { polls: newPolls, userVotes: newUserVotes };
        });
      },

      addEvent: (event: Omit<CalendarEvent, 'id'>) => {
        const newEvent: CalendarEvent = {
          ...event,
          id: generateId(),
        };
        set((state) => ({
          calendarEvents: [...state.calendarEvents, newEvent],
        }));
      },

      deleteEvent: (id: string) => {
        set((state) => ({
          calendarEvents: state.calendarEvents.filter((e) => e.id !== id),
        }));
      },

      addTask: (task: Omit<WorkTask, 'id'>) => {
        const newTask: WorkTask = {
          ...task,
          id: generateId(),
        };
        set((state) => ({
          workTasks: [...state.workTasks, newTask],
        }));
      },

      toggleTaskComplete: (id: string) => {
        set((state) => ({
          workTasks: state.workTasks.map((t) =>
            t.id === id
              ? { ...t, status: t.status === 'completed' ? 'pending' : 'completed' }
              : t
          ),
        }));
      },

      setTaskFilter: (filter: string) => {
        set({ taskFilter: filter });
      },

      submitAssignment: (id: string, text: string) => {
        set((state) => ({
          submissions: { ...state.submissions, [id]: text },
          assignments: state.assignments.map((a) =>
            a.id === id ? { ...a, status: 'submitted' } : a
          ),
        }));
      },

      setAssignmentFilter: (filter: string) => {
        set({ assignmentFilter: filter });
      },
    }),
    {
      name: 'features-storage',
      partialize: (state) => ({
        polls: state.polls,
        userVotes: state.userVotes,
        calendarEvents: state.calendarEvents,
        selectedDate: state.selectedDate,
        workTasks: state.workTasks,
        taskFilter: state.taskFilter,
        assignments: state.assignments,
        assignmentFilter: state.assignmentFilter,
        submissions: state.submissions,
      }),
    }
  )
);
