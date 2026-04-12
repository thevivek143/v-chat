import React, { useEffect, useState } from 'react';

export default function PhoneFrame({ children }: { children: React.ReactNode }) {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isDesktop) {
    // True mobile viewport
    return (
      <div className="w-[100vw] h-[100vh] bg-bg relative overflow-hidden flex flex-col">
        {children}
      </div>
    );
  }

  // Desktop simulated bezel representation
  return (
    <div 
      className="fixed inset-0 flex items-center justify-center p-4 z-[99999]"
      style={{
        background: 'radial-gradient(ellipse at center, rgba(108,60,225,0.08) 0%, var(--bg) 70%)'
      }}
    >
      <div 
        className="relative bg-bg overflow-hidden flex flex-col shrink-0"
        style={{
          width: '390px',
          height: '844px',
          borderRadius: '44px',
          border: '1px solid var(--border)',
          boxShadow: '0 0 0 1px rgba(108,60,225,0.1), 0 25px 60px rgba(0,0,0,0.6), 0 0 80px rgba(108,60,225,0.15)'
        }}
      >
        {/* Hardware Elements */}
        {/* Dynamic Island */}
        <div className="absolute top-[12px] left-1/2 -translate-x-1/2 w-[120px] h-[34px] bg-black rounded-full z-[100]" />
        
        {/* Home Indicator */}
        <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-[#E5E5EA] dark:bg-[#3A3A3C] rounded-full z-[100] opacity-40 pointer-events-none" />

        <div className="w-full h-full relative z-0 flex flex-col pt-1">
          {children}
        </div>
      </div>
    </div>
  );
}
