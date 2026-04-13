import React from 'react';
import { Outlet } from 'react-router-dom';
import StatusBar from '../StatusBar';

export default function ImmersiveLayout() {
  return (
    <>
      <div className="relative z-[50] opacity-0 pointer-events-none">
        <StatusBar />
      </div>
      
      <div className="flex-1 overflow-hidden relative" style={{ marginTop: '-44px' }}>
        <React.Suspense fallback={<div className="flex-1 bg-black flex items-center justify-center"><div className="w-6 h-6 border-2 border-white/50 border-t-transparent rounded-full animate-spin"></div></div>}>
          <Outlet />
        </React.Suspense>
      </div>
    </>
  );
}