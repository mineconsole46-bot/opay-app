import { Link } from "wouter";
import { useBalance } from "@/hooks/useBalance";
import { useState } from "react";
import { Eye, EyeOff, User, Bell, ChevronRight, Smartphone, Wifi, Gamepad2, Tv, Lightbulb, GraduationCap, Plane, MoreHorizontal, ArrowRightLeft, Plus, Download } from "lucide-react";

export default function Home() {
  const { balance } = useBalance();
  const [showBalance, setShowBalance] = useState(true);

  return (
    <div className="flex flex-col flex-1 bg-background pb-20">
      {/* Header */}
      <header className="flex items-center justify-between p-4 pt-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-card flex items-center justify-center overflow-hidden border border-border/50">
            <User className="w-6 h-6 text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm text-foreground font-semibold">Hi, OPay User</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/transactions" className="text-sm font-medium text-primary">History</Link>
          <Bell className="w-6 h-6" />
        </div>
      </header>

      {/* Main Content */}
      <div className="px-4 flex-1 flex flex-col gap-6">
        {/* Balance Card */}
        <div className="bg-primary rounded-2xl p-5 text-primary-foreground shadow-lg relative overflow-hidden shrink-0">
          <div className="absolute -right-4 -top-4 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          
          <div className="flex items-center justify-between mb-2 relative z-10">
            <p className="text-sm font-medium opacity-90 flex items-center gap-2">
              Total Balance
              <button onClick={() => setShowBalance(!showBalance)} className="p-1 active:scale-90 transition-transform">
                {showBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
            </p>
            <Link href="/transactions" className="text-xs opacity-90 hover:opacity-100 flex items-center">
              Transaction History <ChevronRight className="w-3 h-3 ml-0.5" />
            </Link>
          </div>
          <div className="mb-6 relative z-10">
            <h2 className="text-3xl font-bold tracking-tight">
              {showBalance ? `₦${balance.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '****'}
            </h2>
          </div>
          
          <div className="flex items-center justify-between relative z-10 bg-white/10 rounded-xl p-1">
            <button className="flex-1 py-2 flex flex-col items-center gap-1 hover:bg-white/10 rounded-lg transition-colors">
              <Plus className="w-5 h-5" />
              <span className="text-xs font-medium">Add Money</span>
            </button>
            <div className="w-[1px] h-8 bg-white/20" />
            <Link href="/transfer" className="flex-1 py-2 flex flex-col items-center gap-1 hover:bg-white/10 rounded-lg transition-colors">
              <ArrowRightLeft className="w-5 h-5" />
              <span className="text-xs font-medium">Transfer</span>
            </Link>
            <div className="w-[1px] h-8 bg-white/20" />
            <button className="flex-1 py-2 flex flex-col items-center gap-1 hover:bg-white/10 rounded-lg transition-colors">
              <Download className="w-5 h-5" />
              <span className="text-xs font-medium">Withdraw</span>
            </button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="bg-card rounded-2xl p-4 shadow-sm border border-border/50 shrink-0">
          <div className="grid grid-cols-4 gap-y-6 gap-x-2">
            <ServiceIcon icon={Smartphone} label="Airtime" color="text-blue-500" />
            <ServiceIcon icon={Wifi} label="Data" color="text-emerald-500" />
            <ServiceIcon icon={Gamepad2} label="Betting" color="text-purple-500" />
            <ServiceIcon icon={Tv} label="TV" color="text-orange-500" />
            <ServiceIcon icon={Lightbulb} label="Electricity" color="text-yellow-500" />
            <ServiceIcon icon={GraduationCap} label="Education" color="text-indigo-500" />
            <ServiceIcon icon={Plane} label="Travel" color="text-sky-500" />
            <ServiceIcon icon={MoreHorizontal} label="More" color="text-muted-foreground" />
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="absolute bottom-0 left-0 right-0 bg-card border-t border-border/50 flex justify-between items-center px-6 py-3 pb-8 z-50">
        <NavItem icon={HomeIcon} label="Home" active />
        <NavItem icon={RewardsIcon} label="Rewards" />
        <NavItem icon={FinanceIcon} label="Finance" />
        <NavItem icon={CardsIcon} label="Cards" />
        <NavItem icon={MeIcon} label="Me" />
      </div>
    </div>
  );
}

function ServiceIcon({ icon: Icon, label, color }: { icon: any, label: string, color: string }) {
  return (
    <div className="flex flex-col items-center gap-2 active:scale-95 transition-transform cursor-pointer">
      <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center border border-border/50 shadow-sm">
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
      <span className="text-[11px] text-muted-foreground font-medium">{label}</span>
    </div>
  );
}

// Simple icons for bottom nav
function HomeIcon({ active }: { active?: boolean }) { return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? "hsl(var(--primary))" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>; }
function RewardsIcon({ active }: { active?: boolean }) { return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? "hsl(var(--primary))" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>; }
function FinanceIcon({ active }: { active?: boolean }) { return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? "hsl(var(--primary))" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>; }
function CardsIcon({ active }: { active?: boolean }) { return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? "hsl(var(--primary))" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>; }
function MeIcon({ active }: { active?: boolean }) { return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? "hsl(var(--primary))" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>; }

function NavItem({ icon: Icon, label, active }: { icon: any, label: string, active?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-1 cursor-pointer">
      <Icon active={active} />
      <span className={`text-[10px] font-medium ${active ? 'text-primary' : 'text-muted-foreground'}`}>{label}</span>
    </div>
  );
}