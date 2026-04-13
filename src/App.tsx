import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import PhoneFrame from './components/PhoneFrame';
import ToastContainer from './components/Toast';
import MainLayout from './components/layouts/MainLayout';
import ImmersiveLayout from './components/layouts/ImmersiveLayout';

import { useTheme } from './hooks/useTheme';

const Home = React.lazy(() => import('./pages/Home'));
const Chat = React.lazy(() => import('./pages/Chat'));
const ChatDetail = React.lazy(() => import('./pages/ChatDetail'));
const Explore = React.lazy(() => import('./pages/Explore'));
const Hub = React.lazy(() => import('./pages/Hub'));
const Me = React.lazy(() => import('./pages/Me'));
const ReelPlayer = React.lazy(() => import('./pages/ReelPlayer'));

const AITwin = React.lazy(() => import('./pages/AITwin'));
const DrawCanvas = React.lazy(() => import('./pages/ai/DrawCanvas'));

const VchatPay = React.lazy(() => import('./pages/hub/VchatPay'));
const PaySend = React.lazy(() => import('./pages/hub/PaySend'));
const ServiceDetail = React.lazy(() => import('./pages/hub/ServiceDetail'));
const FoodDelivery = React.lazy(() => import('./pages/hub/FoodDelivery'));
const Rides = React.lazy(() => import('./pages/hub/Rides'));
const Jobs = React.lazy(() => import('./pages/hub/Jobs'));
const Hackathons = React.lazy(() => import('./pages/hub/Hackathons'));
const Tools = React.lazy(() => import('./pages/hub/Tools'));
const HealthVault = React.lazy(() => import('./pages/hub/HealthVault'));
const Agriculture = React.lazy(() => import('./pages/hub/Agriculture'));

const EditProfile = React.lazy(() => import('./pages/profile/EditProfile'));
const AITwinSettings = React.lazy(() => import('./pages/profile/AITwinSettings'));
const LanguageSettings = React.lazy(() => import('./pages/profile/LanguageSettings'));
const PrivacyDashboard = React.lazy(() => import('./pages/profile/PrivacyDashboard'));
const VchatDrop = React.lazy(() => import('./pages/profile/VchatDrop'));
const Streaks = React.lazy(() => import('./pages/profile/Streaks'));
const Moments = React.lazy(() => import('./pages/profile/Moments'));

const FamilyCalendar = React.lazy(() => import('./pages/features/FamilyCalendar'));
const WorkTasks = React.lazy(() => import('./pages/features/WorkTasks'));
const Assignments = React.lazy(() => import('./pages/features/Assignments'));
const Maintenance = React.lazy(() => import('./pages/features/Maintenance'));
const Voting = React.lazy(() => import('./pages/features/Voting'));
const GroupForms = React.lazy(() => import('./pages/features/GroupForms'));

const Placeholder = React.lazy(() => import('./pages/Placeholder'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="page-wrapper relative h-full w-full overflow-y-auto"
    >
      {children}
    </motion.div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="popLayout">
      <Routes location={location} key={location.pathname}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
          
          <Route path="/chat" element={<PageWrapper><Chat /></PageWrapper>} />
          <Route path="/chat/new" element={<PageWrapper><Placeholder title="New Chat" desc="Contact picker logic coming soon." /></PageWrapper>} />
          <Route path="/chat/:id" element={<PageWrapper><ChatDetail /></PageWrapper>} />
          <Route path="/chat/space/:id" element={<PageWrapper><Placeholder title="Space Room" desc="Audio space conferencing coming soon." /></PageWrapper>} />
          
          <Route path="/explore" element={<PageWrapper><Explore /></PageWrapper>} />
          
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

          <Route path="/ai-twin" element={<PageWrapper><AITwin /></PageWrapper>} />
          <Route path="/story/:id" element={<PageWrapper><Placeholder title="Story View" desc="Story engine coming soon." /></PageWrapper>} />
          <Route path="/news/:id" element={<PageWrapper><Placeholder title="News Viewer" desc="News reader coming soon." /></PageWrapper>} />
          <Route path="/notifications" element={<PageWrapper><Placeholder title="Notifications" desc="Global activity ledger coming soon." /></PageWrapper>} />
          
          <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
        </Route>

        <Route element={<ImmersiveLayout />}>
          <Route path="/reel/:id" element={<PageWrapper><ReelPlayer /></PageWrapper>} />
          <Route path="/ai-twin/draw" element={<PageWrapper><DrawCanvas /></PageWrapper>} />
          
          <Route path="/group/family/calendar" element={<PageWrapper><FamilyCalendar /></PageWrapper>} />
          <Route path="/group/work/tasks" element={<PageWrapper><WorkTasks /></PageWrapper>} />
          <Route path="/group/education/assignments" element={<PageWrapper><Assignments /></PageWrapper>} />
          <Route path="/group/society/maintenance" element={<PageWrapper><Maintenance /></PageWrapper>} />
          <Route path="/group/society/voting" element={<PageWrapper><Voting /></PageWrapper>} />
          <Route path="/group/:type/forms" element={<PageWrapper><GroupForms /></PageWrapper>} />
          <Route path="/group/:type/:feature" element={<PageWrapper><Placeholder title="Group Applet" desc="This specific feature module is currently under development." /></PageWrapper>} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

function AppContent() {
  const { initTheme } = useTheme();

  useEffect(() => {
    initTheme();
  }, [initTheme]);

  return (
    <PhoneFrame>
      <AnimatedRoutes />
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