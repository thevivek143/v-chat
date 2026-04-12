import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { X, Calendar, ShoppingCart, MapPin, Pill, Wallet, AlertTriangle, Image as ImageIcon, Baby, CheckSquare, Users, FileText, BedDouble, CheckCircle, BarChart3, Clock, ClipboardList, BookOpen, UserCheck, HelpCircle, GraduationCap, Bell, ClipboardEdit, Book, Trophy, Wrench, Contact, ThumbsUp, Car, PhoneCall, Newspaper, Search, ShoppingBag, Zap, ShieldCheck } from 'lucide-react';

type GroupFeaturesProps = {
  isOpen: boolean;
  onClose: () => void;
  groupType: 'family' | 'work' | 'education' | 'society' | 'colony';
  groupName: string;
  groupEmoji: string;
};

export default function GroupFeatures({ isOpen, onClose, groupType, groupName, groupEmoji }: GroupFeaturesProps) {
  const navigate = useNavigate();

  const getTagStyle = () => {
    switch (groupType) {
      case 'family': return { bg: 'rgba(245,158,11,0.12)', color: '#F59E0B', label: 'Family' };
      case 'work': return { bg: 'rgba(6,182,212,0.15)', color: '#06B6D4', label: 'Work' };
      case 'education': return { bg: 'rgba(16,185,绿129,0.15)', color: '#10B981', label: 'Education' };
      case 'society': return { bg: 'rgba(139,92,246,0.15)', color: '#8B5CF6', label: 'Society' };
      case 'colony': return { bg: 'rgba(59,130,246,0.15)', color: '#3B82F6', label: 'Colony' };
      default: return { bg: 'rgba(108,60,225,0.15)', color: '#6C3CE1', label: 'Group' };
    }
  };

  const getFeatures = () => {
    switch (groupType) {
      case 'family':
        return [
          { id: 'calendar', icon: <Calendar size={20} className="text-[#8B5CF6]" />, title: 'Shared Calendar', desc: 'Family events & functions', route: '/group/family/calendar' },
          { id: 'lists', icon: <ShoppingCart size={20} className="text-[#06B6D4]" />, title: 'Sync List', desc: 'Shopping & trip lists', route: '/group/family/lists' },
          { id: 'location', icon: <MapPin size={20} className="text-[#10B981]" />, title: 'Live Location', desc: 'See family members', route: '/group/family/location' },
          { id: 'medicines', icon: <Pill size={20} className="text-[#EC4899]" />, title: 'Medicine Reminders', desc: 'Health alerts', route: '/group/family/medicines' },
          { id: 'wallet', icon: <Wallet size={20} className="text-[#F59E0B]" />, title: 'Family Wallet', desc: 'Shared expenses', route: '/group/family/wallet' },
          { id: 'sos', icon: <AlertTriangle size={20} className="text-white" />, title: 'Emergency SOS', desc: 'Alert all members', route: '/group/family/sos', isAlert: true },
          { id: 'album', icon: <ImageIcon size={20} className="text-[#6C3CE1]" />, title: 'Family Album', desc: 'Shared photos & memories', route: '/group/family/album' },
          { id: 'kids', icon: <Baby size={20} className="text-[#8B5CF6]" />, title: 'Kids Mode', desc: 'Safe content for children', route: '/group/family/kids' },
        ];
      case 'work':
        return [
          { id: 'tasks', icon: <CheckSquare size={20} className="text-[#F59E0B]" />, title: 'Tasks', desc: 'Assign & track work', route: '/group/work/tasks' },
          { id: 'meetings', icon: <Users size={20} className="text-[#06B6D4]" />, title: 'Meetings', desc: 'Schedule with agenda', route: '/group/work/meetings' },
          { id: 'files', icon: <FileText size={20} className="text-[#8B5CF6]" />, title: 'Files', desc: 'Team documents', route: '/group/work/files' },
          { id: 'leaves', icon: <BedDouble size={20} className="text-[#10B981]" />, title: 'Leave Requests', desc: 'Apply & approve leaves', route: '/group/work/leaves' },
          { id: 'approvals', icon: <CheckCircle size={20} className="text-[#EC4899]" />, title: 'Approvals', desc: 'Pending approvals', route: '/group/work/approvals' },
          { id: 'projects', icon: <BarChart3 size={20} className="text-[#3B82F6]" />, title: 'Projects', desc: 'Progress boards', route: '/group/work/projects' },
          { id: 'attendance', icon: <Clock size={20} className="text-[#F59E0B]" />, title: 'Attendance', desc: 'Mark & track', route: '/group/work/attendance' },
          { id: 'forms', icon: <ClipboardList size={20} className="text-[#8B5CF6]" />, title: 'Forms', desc: 'Surveys & feedback', route: '/group/work/forms' },
        ];
      case 'education':
        return [
          { id: 'assignments', icon: <BookOpen size={20} className="text-[#EAB308]" />, title: 'Assignments', desc: 'Submit & track deadlines', route: '/group/education/assignments' },
          { id: 'attendance', icon: <UserCheck size={20} className="text-[#10B981]" />, title: 'Attendance', desc: 'Student tracking', route: '/group/education/attendance' },
          { id: 'doubts', icon: <HelpCircle size={20} className="text-[#EC4899]" />, title: 'Doubt Thread', desc: 'Ask per subject', route: '/group/education/doubts' },
          { id: 'timetable', icon: <Calendar size={20} className="text-[#3B82F6]" />, title: 'Timetable', desc: 'Exam & class schedule', route: '/group/education/timetable' },
          { id: 'announcements', icon: <Bell size={20} className="text-[#F97316]" />, title: 'Announcements', desc: 'Teacher notices', route: '/group/education/announcements' },
          { id: 'quiz', icon: <ClipboardEdit size={20} className="text-[#8B5CF6]" />, title: 'Quiz & Forms', desc: 'Tests & surveys', route: '/group/education/quiz' },
          { id: 'materials', icon: <Book size={20} className="text-[#14B8A6]" />, title: 'Study Material', desc: 'Notes & resources', route: '/group/education/materials' },
          { id: 'leaderboard', icon: <Trophy size={20} className="text-[#F59E0B]" />, title: 'Leaderboard', desc: 'Top performers', route: '/group/education/leaderboard' },
        ];
      case 'society':
        return [
          { id: 'maintenance', icon: <Wallet size={20} className="text-[#8B5CF6]" />, title: 'Maintenance', desc: 'Pay & track dues', route: '/group/society/maintenance' },
          { id: 'visitors', icon: <Contact size={20} className="text-[#3B82F6]" />, title: 'Visitor Log', desc: 'Entry & exit records', route: '/group/society/visitors' },
          { id: 'complaints', icon: <AlertTriangle size={20} className="text-[#EF4444]" />, title: 'Complaints', desc: 'Raise & track issues', route: '/group/society/complaints' },
          { id: 'voting', icon: <ThumbsUp size={20} className="text-[#10B981]" />, title: 'Voting', desc: 'Community decisions', route: '/group/society/voting' },
          { id: 'notices', icon: <ClipboardList size={20} className="text-[#F59E0B]" />, title: 'Notice Board', desc: 'Official announcements', route: '/group/society/notices' },
          { id: 'parking', icon: <Car size={20} className="text-[#06B6D4]" />, title: 'Parking', desc: 'Slot management', route: '/group/society/parking' },
          { id: 'directory', icon: <PhoneCall size={20} className="text-[#6C3CE1]" />, title: 'Directory', desc: 'Emergency contacts', route: '/group/society/directory' },
          { id: 'forms', icon: <FileText size={20} className="text-[#8B5CF6]" />, title: 'Forms', desc: 'Requests & surveys', route: '/group/society/forms' },
        ];
      case 'colony':
        return [
          { id: 'news', icon: <Newspaper size={20} className="text-[#3B82F6]" />, title: 'Local News', desc: 'Colony alerts & updates', route: '/group/colony/news' },
          { id: 'lostfound', icon: <Search size={20} className="text-[#F59E0B]" />, title: 'Lost & Found', desc: 'Report & find items', route: '/group/colony/lostfound' },
          { id: 'market', icon: <ShoppingBag size={20} className="text-[#10B981]" />, title: 'Local Market', desc: 'Buy & sell nearby', route: '/group/colony/market' },
          { id: 'events', icon: <Calendar size={20} className="text-[#8B5CF6]" />, title: 'Events', desc: 'Colony events calendar', route: '/group/colony/events' },
          { id: 'alerts', icon: <Zap size={20} className="text-[#EF4444]" />, title: 'Utility Alerts', desc: 'Power & water outages', route: '/group/colony/alerts' },
          { id: 'vendors', icon: <Wrench size={20} className="text-[#06B6D4]" />, title: 'Vendors', desc: 'Trusted local services', route: '/group/colony/vendors' },
          { id: 'polls', icon: <BarChart3 size={20} className="text-[#8B5CF6]" />, title: 'Polls', desc: 'Community opinions', route: '/group/colony/polls' },
          { id: 'forms', icon: <FileText size={20} className="text-[#6C3CE1]" />, title: 'Forms', desc: 'Registrations & requests', route: '/group/colony/forms' },
        ];
      default: return [];
    }
  };

  const tagStyle = getTagStyle();
  const features = getFeatures();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="absolute inset-0 z-40 bg-black/50 backdrop-blur-[2px]"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: 500 }}
            animate={{ y: 0 }}
            exit={{ y: 500 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="absolute bottom-0 left-0 w-full z-50 bg-card rounded-t-[24px] p-5 pb-10 shadow-2xl border-t border-border"
          >
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <span className="text-[20px]">{groupEmoji}</span>
                <h3 className="text-[16px] font-bold text-text">{groupName}</h3>
                <span 
                  className="text-[10px] font-semibold px-2 py-[3px] rounded-[10px]"
                  style={{ background: tagStyle.bg, color: tagStyle.color }}
                >
                  {tagStyle.label}
                </span>
              </div>
              <div 
                className="w-8 h-8 rounded-full bg-card2 flex items-center justify-center cursor-pointer"
                onClick={onClose}
              >
                <X size={18} className="text-text2" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {features.map((feature) => (
                <motion.div
                  key={feature.id}
                  className={`flex flex-col gap-2 rounded-[16px] p-3.5 border border-border cursor-pointer shadow-sm ${feature.isAlert ? 'bg-red border-red-500/50' : 'bg-card2'}`}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    onClose();
                    navigate(feature.route);
                  }}
                >
                  <div className="mb-0.5">{feature.icon}</div>
                  <div className="flex flex-col">
                    <span className={`text-[13px] font-bold ${feature.isAlert ? 'text-white' : 'text-text'}`}>{feature.title}</span>
                    <span className={`text-[11px] leading-tight mt-0.5 ${feature.isAlert ? 'text-white/80' : 'text-text3'}`}>{feature.desc}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
