'use client';

import { useEffect, useState } from 'react';

export default function MobileBlocker() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      // 1. Check user agent for common mobile patterns
      const ua = navigator.userAgent;
      const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i.test(ua);
      
      // 2. Check physical screen size. 
      // When "Request Desktop Site" is used, window.innerWidth might be 980px,
      // but window.screen.width remains the physical device width (e.g., 390px, 412px).
      const isSmallScreen = window.screen.width <= 768 || window.screen.height <= 768;
      
      // 3. Check for iOS desktop mode spoofing (iPad/iPhone pretending to be Mac)
      const isIOSDesktop = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;

      if (isMobileUA || isSmallScreen || isIOSDesktop) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isMobile) return null;

  return (
    <div className="fixed inset-0 z-[99999] bg-[#0a0a1a] flex flex-col items-center justify-center p-8 text-center">
      <svg className="w-20 h-20 text-purple-500 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
      <h1 className="text-3xl font-black text-white mb-4 tracking-wider uppercase">Laptop Required</h1>
      <p className="text-slate-400 text-lg max-w-md mx-auto">
        This contest must be strictly attended on a laptop or desktop computer. Mobile devices (including "Desktop Site" mode) are not supported.
      </p>
    </div>
  );
}
