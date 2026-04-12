import { useNavigate, useLocation } from 'react-router-dom';
import { Home, MessageCircle, Compass, Grid, User } from 'lucide-react';
import { motion } from 'framer-motion';

const tabs = [
  { id: 'home', label: 'Home', icon: Home, path: '/' },
  { id: 'chat', label: 'Chat', icon: MessageCircle, path: '/chat', badge: 5 },
  { id: 'explore', label: 'Explore', icon: Compass, path: '/explore' },
  { id: 'hub', label: 'Hub', icon: Grid, path: '/hub' },
  { id: 'me', label: 'Me', icon: User, path: '/me' },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="h-[68px] bg-bg2 border-t-[0.5px] border-border flex items-center justify-between px-2 shrink-0 relative z-20 w-full">
      {tabs.map((tab) => {
        const isActive = tab.path === '/' 
          ? location.pathname === '/' 
          : location.pathname.startsWith(tab.path);
        
        return (
          <motion.div
            key={tab.id}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(tab.path)}
            onContextMenu={(e) => {
              if (tab.id === 'home') {
                e.preventDefault();
                navigate('/ai-twin');
              }
            }}
            className={`flex flex-col items-center justify-center w-full max-w-[64px] h-[52px] cursor-pointer transition-colors ${
              isActive ? 'bg-[rgba(108,60,225,0.15)] rounded-xl text-primary-light font-medium' : 'text-text3'
            }`}
          >
            <div className="relative mb-1">
              <tab.icon size={22} className={isActive ? 'text-primary-light' : 'text-text3'} />
              {tab.badge && (
                <div className="absolute -top-1.5 -right-2 bg-red text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {tab.badge}
                </div>
              )}
            </div>
            <span className={isActive ? 'text-[10px] text-primary-light' : 'text-[10px] text-text3'}>{tab.label}</span>
          </motion.div>
        );
      })}
    </div>
  );
}
