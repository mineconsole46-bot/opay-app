import { ReactNode } from "react";

export function MobileLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] flex items-center justify-center font-sans">
      <div className="w-full max-w-[390px] h-[100dvh] sm:h-[844px] sm:rounded-[40px] sm:border-[8px] sm:border-[#2a2a2a] bg-background relative overflow-hidden shadow-2xl flex flex-col">
        {/* Fake iOS Status Bar */}
        <div className="h-12 w-full shrink-0 flex items-center justify-between px-6 z-50 text-foreground text-xs font-semibold relative bg-background">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-6 bg-[#2a2a2a] rounded-b-3xl sm:block hidden" />
          <span>9:41</span>
          <div className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21L1 10C5 6 19 6 23 10L12 21Z"/></svg>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="16" height="10" rx="2" ry="2"/><path d="M22 11v2"/></svg>
          </div>
        </div>
        
        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden relative scrollbar-hide flex flex-col">
          {children}
        </div>
      </div>
    </div>
  );
}