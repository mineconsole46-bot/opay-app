import { ReactNode } from "react";

export function MobileLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] flex items-center justify-center font-sans">
      <div className="w-full max-w-[390px] h-[100dvh] sm:h-[844px] sm:rounded-[40px] sm:border-[8px] sm:border-[#2a2a2a] bg-background relative overflow-hidden shadow-2xl flex flex-col">
        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden relative scrollbar-hide flex flex-col">
          {children}
        </div>
      </div>
    </div>
  );
}
