import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import PhoneFrame from './components/PhoneFrame';
import StatusBar from './components/StatusBar';
import BottomNav from './components/BottomNav';
import ToastContainer from './components/Toast';

import Home from './pages/Home';
import Chat from './pages/Chat';
import ChatDetail from './pages/ChatDetail';
import Explore from './pages/Explore';
import Hub from './pages/Hub';
import Me from './pages/Me';
import ReelPlayer from './pages/ReelPlayer';

import AITwin from './pages/AITwin';
import DrawCanvas from './pages/ai/DrawCanvas';

import VchatPay from './pages/hub/VchatPay';
import PaySend from './pages/hub/PaySend';
import ServiceDetail from './pages/hub/ServiceDetail';
import FoodDelivery from './pages/hub/FoodDelivery';
import Rides from './pages/hub/Rides';
import Jobs from './pages/hub/Jobs';
import Hackathons from './pages/hub/Hackathons';
import Tools from './pages/hub/Tools';
import HealthVault from './pages/hub/HealthVault';
import Agriculture from './pages/hub/Agriculture';

import EditProfile from './pages/profile/EditProfile';
import AITwinSettings from './pages/profile/AITwinSettings';
import LanguageSettings from './pages/profile/LanguageSettings';
import PrivacyDashboard from './pages/profile/PrivacyDashboard';
import VchatDrop from './pages/profile/VchatDrop';
import Streaks from './pages/profile/Streaks';
import Moments from './pages/profile/Moments';

import FamilyCalendar from './pages/features/FamilyCalendar';
import WorkTasks from './pages/features/WorkTasks';
import Assignments from './pages/features/Assignments';
import Maintenance from './pages/features/Maintenance';
import Voting from './pages/features/Voting';
import GroupForms from './pages/features/GroupForms';

import Placeholder from './pages/Placeholder';
import NotFound from './pages/NotFound';

import { useTheme } from './hooks/useTheme';

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="page-wrapper relative"
    >
      {children}
    </motion.div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        
        <Route path="/chat" element={<PageWrapper><Chat /></PageWrapper>} />
        <Route path="/chat/new" element={<PageWrapper><Placeholder title="New Chat" desc="Contact picker logic coming soon." /></PageWrapper>} />
        <Route path="/chat/:id" element={<PageWrapper><ChatDetail /></PageWrapper>} />
        <Route path="/chat/space/:id" element={<PageWrapper><Placeholder title="Space Room" desc="Audio space conferencing coming soon." /></PageWrapper>} />
        
        <Route path="/explore" element={<PageWrapper><Explore /></PageWrapper>} />
        <Route path="/reel/:id" element={<PageWrapper><ReelPlayer /></PageWrapper>} />
        
        <Route path="/hub" element={<PageWrapper><Hub /></PageWrapper>} />
        <Route path="/hub/pay" element={<PageWrapper><VchatPay /></PageWrapper>} />
        <Route path="/hub/pay/send" element={<PageWrapper><PaySend /></PageWrapper>} />
        <Route path="/hub/pay/receive" element={<PageWrapper><Placeholder title="Receive Money" desc="Scan QR to receive logic." /></PageWrapper>} />
        <Route path="/hub/pay/international" element={<PageWrapper><Placeholder title="Global Transfer" desc="Forex APIs integrating soon." /></PageWrapper>} />
        <Route path="/hub/pay/history" element={<PageWrapper><Placeholder title="History" desc="Transaction ledger." /></PageWrapper>} />
        <Route path="/hub/govt/:service" element={<PageWrapper><ServiceDetail /></PageWrapper>} />
        <Route path="/hub/food" element={<PageWrapper><FoodDelivery /></PageWrapper>} />
        <Route path="/hub/rides" element={<PageWrapper><Rides /></PageWrapper>} />
        <Route path="/hub/jobs" element={<PageWrapper><Jobs /></PageWrapper>} />
        <Route path="/hub/hackathons" element={<PageWrapper><Hackathons /></PageWrapper>} />
        <Route path="/hub/events" element={<PageWrapper><Placeholder title="Events" desc="Ticketing logic." /></PageWrapper>} />
        <Route path="/hub/network" element={<PageWrapper><Placeholder title="Network" desc="Professional connect nodes." /></PageWrapper>} />
        <Route path="/hub/tools" element={<PageWrapper><Tools /></PageWrapper>} />
        <Route path="/hub/health" element={<PageWrapper><HealthVault /></PageWrapper>} />
        <Route path="/hub/agriculture" element={<PageWrapper><Agriculture /></PageWrapper>} />
        <Route path="/hub/shop" element={<PageWrapper><Placeholder title="Shop" desc="Marketplace integration." /></PageWrapper>} />
        <Route path="/hub/travel" element={<PageWrapper><Placeholder title="Travel" desc="Flight and rail booking." /></PageWrapper>} />
        
        <Route path="/me" element={<PageWrapper><Me /></PageWrapper>} />
        <Route path="/me/edit" element={<PageWrapper><EditProfile /></PageWrapper>} />
        <Route path="/me/ai-settings" element={<PageWrapper><AITwinSettings /></PageWrapper>} />
        <Route path="/me/language" element={<PageWrapper><LanguageSettings /></PageWrapper>} />
        <Route path="/me/privacy" element={<PageWrapper><PrivacyDashboard /></PageWrapper>} />
        <Route path="/me/drop" element={<PageWrapper><VchatDrop /></PageWrapper>} />
        <Route path="/me/streaks" element={<PageWrapper><Streaks /></PageWrapper>} />
        <Route path="/me/moments" element={<PageWrapper><Moments /></PageWrapper>} />

        {/* Group Features Applet Routes */}
        <Route path="/group/family/calendar" element={<PageWrapper><FamilyCalendar /></PageWrapper>} />
        <Route path="/group/work/tasks" element={<PageWrapper><WorkTasks /></PageWrapper>} />
        <Route path="/group/education/assignments" element={<PageWrapper><Assignments /></PageWrapper>} />
        <Route path="/group/society/maintenance" element={<PageWrapper><Maintenance /></PageWrapper>} />
        <Route path="/group/society/voting" element={<PageWrapper><Voting /></PageWrapper>} />
        
        <Route path="/group/:type/forms" element={<PageWrapper><GroupForms /></PageWrapper>} />
        <Route path="/group/:type/:feature" element={<PageWrapper><Placeholder title="Group Applet" desc="This specific feature module is currently under development." /></PageWrapper>} />

        {/* AI & Placeholders */}
        <Route path="/ai-twin" element={<PageWrapper><AITwin /></PageWrapper>} />
        <Route path="/ai-twin/draw" element={<PageWrapper><DrawCanvas /></PageWrapper>} />
        <Route path="/story/:id" element={<PageWrapper><Placeholder title="Story View" desc="Story engine coming soon." /></PageWrapper>} />
        <Route path="/news/:id" element={<PageWrapper><Placeholder title="News Viewer" desc="News reader coming soon." /></PageWrapper>} />
        <Route path="/notifications" element={<PageWrapper><Placeholder title="Notifications" desc="Global activity ledger coming soon." /></PageWrapper>} />
        
        {/* 404 Catch All */}
        <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

function AppContent() {
  const { initTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    initTheme();
  }, [initTheme]);

  const hideBottomNav = location.pathname.startsWith('/reel/') || 
                        location.pathname === '/ai-twin/draw' ||
                        location.pathname.startsWith('/group/');
                        
  const hideStatusBarBg = location.pathname.startsWith('/reel/') || 
                          location.pathname === '/ai-twin/draw';

  return (
    <PhoneFrame>
      <div className={`relative z-[50] ${hideStatusBarBg ? 'opacity-0 pointer-events-none' : ''}`}>
        <StatusBar />
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden relative" style={{ marginTop: hideStatusBarBg ? '-44px' : '0' }}>
        <AnimatedRoutes />
      </div>
      
      <AnimatePresence>
        {!hideBottomNav && (
          <motion.div 
            initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }}
            className="absolute bottom-0 w-full z-40 bg-bg/80 backdrop-blur-xl"
          >
            <BottomNav />
          </motion.div>
        )}
      </AnimatePresence>
      
      <ToastContainer />
    </PhoneFrame>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
