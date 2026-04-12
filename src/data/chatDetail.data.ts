export type MessageType = 'text' | 'voice';
export type Sender = 'me' | 'them';

export type ChatMessage = {
  id: string;
  type: MessageType;
  sender: Sender;
  text?: string;
  time: string;
  isRead?: boolean;
  isDelivered?: boolean;
  originalText?: string;
  originalLanguage?: string;
  voiceDuration?: string;
  transcription?: string;
};

// Mock conversation between Vivek and Rahul
export const rahulMessages: ChatMessage[] = [
  {
    id: 'msg1',
    type: 'text',
    sender: 'them',
    text: "Hey da! Ready for Sunday's function? 🎉",
    originalText: "भाई! रविवार के function के लिए तैयार हो?",
    originalLanguage: 'Hindi',
    time: '10:15'
  },
  {
    id: 'msg2',
    type: 'text',
    sender: 'me',
    text: "Haha yes! What time should I come?",
    time: '10:16',
    isRead: true
  },
  {
    id: 'msg3',
    type: 'voice',
    sender: 'them',
    voiceDuration: '0:23',
    transcription: "Bhai come by 6pm, we have arranged everything at home itself",
    originalLanguage: 'Hindi', // To show translation label if active
    time: '10:18'
  },
  {
    id: 'msg4',
    type: 'text',
    sender: 'me',
    text: "Perfect! I'll bring the cake 🎂",
    time: '10:19',
    isDelivered: true,
    isRead: false
  },
  {
    id: 'msg5',
    type: 'text',
    sender: 'them',
    text: "Amazing! Also Priya is coming, she wanted to know if you are free after?",
    time: '10:32'
  },
  {
    id: 'msg6',
    type: 'text',
    sender: 'me',
    text: "On my way! See you in 10 mins 🚗",
    time: '11:02',
    isRead: true
  }
];
