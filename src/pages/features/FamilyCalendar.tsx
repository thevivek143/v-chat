import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Plus, ChevronRight, X, Bot, Sparkles } from 'lucide-react';

const mockEvents = [
  { id: 1, date: 15, title: "Priya's Birthday", addedBy: "Mom", color: "var(--pink)" },
  { id: 2, date: 18, title: "Dad's Doctor Appt", addedBy: "Dad", color: "var(--red)" },
  { id: 3, date: 20, title: "Arjun's Results", addedBy: "Arjun", color: "var(--green)" },
  { id: 4, date: 22, title: "Family Function", addedBy: "Mom", color: "var(--purple)" },
  { id: 5, date: 28, title: "Goa Trip", addedBy: "Vivek", color: "var(--accent)" },
];

export default function FamilyCalendar() {
  const navigate = useNavigate();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isNegotiating, setIsNegotiating] = useState(false);
  const [negotiationResult, setNegotiationResult] = useState<string | null>(null);

  const startAiNegotiation = () => {
    setIsNegotiating(true);
    setNegotiationResult(null);
    setTimeout(() => {
      setIsNegotiating(false);
      setNegotiationResult("AI Twins have negotiated successfully: The 'Dinner Gathering' can overlap next Friday at 7 PM. All family schedules align.");
    }, 3000);
  };

  // Simple static days for visual
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const today = 12;

  const getEventsForDate = (day: number) => mockEvents.filter(e => e.date === day);

  return (
    <div className="w-full flex-col flex bg-bg relative min-h-full">
      {/* Header */}
      <div className="sticky top-0 z-20 h-[60px] flex items-center justify-between px-3 bg-bg2/80 backdrop-blur-md border-b-[0.5px] border-border shrink-0">
        <div className="flex items-center gap-2">
          <motion.div whileTap={{ scale: 0.9 }} className="p-1 cursor-pointer" onClick={() => navigate(-1)}>
            <ChevronLeft size={24} className="text-text" />
          </motion.div>
          <span className="text-[18px] font-bold text-text">Family Calendar</span>
        </div>
        <motion.div 
          className="w-9 h-9 rounded-full bg-[rgba(108,60,225,0.12)] flex items-center justify-center cursor-pointer mr-1"
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsAddOpen(true)}
        >
          <Plus size={20} className="text-primary-light" />
        </motion.div>
      </div>

      <div className="flex-1 overflow-y-auto pb-6" style={{ scrollbarWidth: 'none' }}>
        
        {/* Month Selector */}
        <div className="px-4 py-5 flex items-center justify-between">
          <ChevronLeft size={20} className="text-text3 cursor-pointer" />
          <h2 className="text-[16px] font-bold text-text">December 2024</h2>
          <ChevronRight size={20} className="text-text3 cursor-pointer" />
        </div>

        {/* Calendar Grid */}
        <div className="px-5 mb-6">
          <div className="grid grid-cols-7 gap-y-4">
            {weekDays.map((d, i) => (
              <div key={`wd-${i}`} className="text-center text-[11px] font-semibold text-text3 mb-2">{d}</div>
            ))}
            
            {/* offset for Dec 2024 mapping visually */}
            <div className="col-span-0" /> 
            
            {daysInMonth.map(day => {
              const dayEvents = getEventsForDate(day);
              const isToday = day === today;
              return (
                <div key={day} className="flex flex-col items-center justify-start h-10">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-medium
                    ${isToday ? 'bg-primary text-white' : 'text-text'}`}>
                    {day}
                  </div>
                  {dayEvents.length > 0 && (
                    <div className="flex gap-1 mt-0.5">
                      {dayEvents.map((e, idx) => (
                        <div key={idx} className="w-[4px] h-[4px] rounded-full" style={{ background: e.color }} />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Events List */}
        <div className="px-4">
          <h3 className="text-[13px] font-bold text-text3 uppercase tracking-wide mb-3">Events this month</h3>
          <div className="flex flex-col gap-3">
            {mockEvents.map(ev => (
              <motion.div 
                key={ev.id}
                className="bg-card border-[0.5px] border-border rounded-[16px] flex overflow-hidden shadow-sm cursor-pointer"
                whileTap={{ scale: 0.98 }}
              >
                <div className="w-[4px] shrink-0" style={{ background: ev.color }} />
                <div className="flex-1 p-3.5 flex justify-between items-center">
                  <div className="flex flex-col gap-1">
                    <span className="text-[14px] font-bold text-text">{ev.title}</span>
                    <div className="flex items-center gap-2 text-[11px] text-text2 font-medium">
                      <span>Dec {ev.date}, 09:00 AM</span>
                      <span>·</span>
                      <span>Added by {ev.addedBy}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* AI Negotiation Banner */}
        <div className="px-4 py-4 mt-2">
          <div className="bg-gradient-to-r from-primary-dark via-primary to-accent rounded-xl p-4 text-white shadow-[0_4px_16px_rgba(108,60,225,0.2)]">
            <div className="flex items-center gap-2 mb-2">
              <Bot size={20} />
              <h3 className="font-bold text-[14px]">AI Twin Scheduler</h3>
            </div>
            <p className="text-[12px] opacity-90 mb-4">Let your AI agents negotiate the perfect time for the next family gathering without texting everyone.</p>
            
            {isNegotiating ? (
              <div className="flex items-center justify-center p-3 bg-white/20 rounded-lg animate-pulse backdrop-blur-sm">
                <Sparkles size={16} className="mr-2 animate-spin" />
                <span className="text-[12px] font-bold">Agents are communicating...</span>
              </div>
            ) : negotiationResult ? (
              <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm border-[0.5px] border-white/30">
                <p className="text-[12px] font-bold">{negotiationResult}</p>
                <button className="mt-2 w-full py-1.5 bg-white text-primary font-bold rounded-md text-[12px]">Schedule It</button>
              </div>
            ) : (
              <button 
                onClick={startAiNegotiation}
                className="w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg text-[13px] font-bold backdrop-blur-md transition cursor-pointer"
              >
                Start Auto-Negotiate
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Add Event Modal */}
      <AnimatePresence>
        {isAddOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
              className="absolute inset-0 z-40 bg-black/50" onClick={() => setIsAddOpen(false)}
            />
            <motion.div
              initial={{ y: 300 }} animate={{ y: 0 }} exit={{ y: 300 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="absolute bottom-0 left-0 w-full z-50 bg-card rounded-t-[24px] p-5 pb-8"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-[18px] font-bold text-text">New Event</h3>
                <div className="w-8 h-8 rounded-full bg-card2 flex items-center justify-center cursor-pointer" onClick={() => setIsAddOpen(false)}>
                  <X size={18} className="text-text2" />
                </div>
              </div>
              
              <div className="flex flex-col gap-4">
                <input type="text" placeholder="Event Title" className="w-full bg-card2 border-[0.5px] border-border rounded-xl px-4 py-3 text-[14px] text-text outline-none focus:border-primary transition-colors" />
                
                <div className="flex gap-3">
                  <input type="date" className="flex-1 bg-card2 border-[0.5px] border-border rounded-xl px-4 py-3 text-[14px] text-text outline-none" />
                  <input type="time" className="flex-1 bg-card2 border-[0.5px] border-border rounded-xl px-4 py-3 text-[14px] text-text outline-none" />
                </div>

                <div className="flex items-center justify-between bg-card2 border-[0.5px] border-border rounded-xl px-4 py-3">
                  <span className="text-[14px] font-medium text-text">Add for everyone</span>
                  <div className="w-10 h-6 bg-primary rounded-full relative cursor-pointer">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                  </div>
                </div>

                <motion.button 
                  className="w-full bg-primary text-white font-bold py-3.5 rounded-xl mt-2 text-[15px]"
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsAddOpen(false)}
                >
                  Save Event
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
