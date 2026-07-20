import { Link } from "wouter";
import { useBalance } from "@/hooks/useBalance";
import { useState } from "react";
import { Eye, EyeOff, Bell, ChevronRight, MoreVertical, Plus, Zap, Home, Gift, TrendingUp, Wallet } from "lucide-react";

export default function Home() {
  const { balance } = useBalance();
  const [showBalance, setShowBalance] = useState(true);

  return (
    <div className="flex flex-col flex-1 bg-background pb-24">
      {/* Header with Status Bar Info */}
      <header className="flex items-center justify-between p-4 pt-3 shrink-0 text-foreground">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-sm">
            OP
          </div>
          <div>
            <p className="text-sm text-foreground font-semibold">Hi, OPEYEMI</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
              !
            </div>
            <span className="absolute -top-1 -right-1 text-[10px] font-bold text-pink-500">HELP</span>
          </div>
          <button className="p-1.5 hover:bg-card rounded-lg transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
          </button>
          <Bell className="w-5 h-5" />
        </div>
      </header>

      {/* Main Content */}
      <div className="px-4 flex-1 flex flex-col gap-4">
        {/* Balance Card - Teal/Cyan */}
        <div className="bg-gradient-to-br from-teal-400 to-teal-500 rounded-3xl p-6 text-black shadow-lg relative overflow-hidden shrink-0">
          <div className="absolute -right-8 -top-8 w-40 h-40 bg-white/20 rounded-full blur-3xl" />
          <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
          
          <div className="flex items-start justify-between mb-4 relative z-10">
            <div className="flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm font-semibold">Available Balance</p>
              <button onClick={() => setShowBalance(!showBalance)} className="p-0.5 hover:bg-white/20 rounded transition-colors">
                {showBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
            </div>
            <Link href="/transactions" className="text-xs font-medium flex items-center gap-1 hover:opacity-80 transition-opacity">
              Transaction History <ChevronRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="mb-6 relative z-10">
            <p className="text-sm font-medium opacity-90 mb-1">Balance</p>
            <h2 className="text-4xl font-bold tracking-tight">
              {showBalance ? `₦${balance.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '****'}
            </h2>
          </div>
          
          <div className="flex items-center justify-between relative z-10">
            <button className="flex items-center gap-2 px-4 py-2 bg-black/30 hover:bg-black/40 rounded-full transition-colors text-sm font-medium">
              <Plus className="w-4 h-4" />
              Add Money
            </button>
          </div>
        </div>

        {/* Business Service Card - Dark Teal */}
        <div className="bg-gradient-to-r from-teal-900/40 to-teal-800/40 border border-teal-700/50 rounded-2xl p-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-500/20 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-teal-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Business Service - Today's Sales:</p>
              <p className="text-lg font-bold text-teal-400">₦0.00</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-3 gap-3 shrink-0">
          <QuickActionCard icon="💬" label="To OPay" />
          <QuickActionCard icon="🏦" label="To Bank" />
          <QuickActionCard icon="⬆️" label="Withdraw" />
        </div>

        {/* Newsletter Card */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-2xl p-4 flex items-center gap-3 shrink-0">
          <div className="text-2xl">📧</div>
          <div className="flex-1">
            <p className="text-sm font-bold text-foreground">Take Control, Stay Informed</p>
            <p className="text-xs text-muted-foreground">Add your email, get the latest from OPay</p>
          </div>
        </div>

        {/* Services Grid - 4x2 */}
        <div className="grid grid-cols-4 gap-3 shrink-0">
          <ServiceIcon emoji="📱" label="Airtime" />
          <ServiceIcon emoji="📊" label="Data" />
          <ServiceIcon emoji="🎮" label="Betting" />
          <ServiceIcon emoji="📺" label="TV" />
          <ServiceIcon emoji="🔒" label="SafeBox" />
          <ServiceIcon emoji="💰" label="Loan" />
          <ServiceIcon emoji="🎯" label="GameCenter" />
          <ServiceIcon emoji="⋯" label="More" />
        </div>

        {/* Smart Picks Section */}
        <div className="shrink-0">
          <p className="text-sm font-bold text-foreground mb-3">Smart Picks for You</p>
          <div className="bg-gradient-to-r from-teal-900/30 to-teal-800/30 border border-teal-700/50 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-2xl">💰</div>
              <div>
                <p className="text-sm font-bold text-foreground">SafeBox</p>
                <p className="text-xs text-muted-foreground">Deposit & earn massive returns</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-black font-semibold rounded-full text-sm transition-colors">
              Go
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[390px] mx-auto bg-background border-t border-border/50 flex justify-between items-center px-4 py-3 pb-6 z-50">
        <NavItem icon="🏠" label="Home" active />
        <NavItem icon="🎁" label="Rewards" />
        <NavItem icon="📈" label="Finance" />
        <NavItem icon="💳" label="Cards" />
        <NavItem icon="👤" label="Me" />
      </div>
    </div>
  );
}

function QuickActionCard({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-4 flex flex-col items-center gap-3 active:scale-95 transition-transform cursor-pointer hover:bg-slate-800/70">
      <div className="w-12 h-12 bg-teal-500/20 rounded-2xl flex items-center justify-center text-xl">
        {icon}
      </div>
      <span className="text-xs font-medium text-foreground text-center">{label}</span>
    </div>
  );
}

function ServiceIcon({ emoji, label }: { emoji: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2 active:scale-95 transition-transform cursor-pointer">
      <div className="w-12 h-12 rounded-2xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-lg hover:bg-slate-800/70 transition-colors">
        {emoji}
      </div>
      <span className="text-[11px] text-muted-foreground font-medium text-center">{label}</span>
    </div>
  );
}

function NavItem({ icon, label, active }: { icon: string; label: string; active?: boolean }) {
  return (
    <div className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${active ? 'text-teal-500' : 'text-muted-foreground'}`}>
      <span className="text-lg">{icon}</span>
      <span className={`text-[10px] font-medium ${active ? 'text-teal-500' : 'text-muted-foreground'}`}>{label}</span>
    </div>
  );
}
