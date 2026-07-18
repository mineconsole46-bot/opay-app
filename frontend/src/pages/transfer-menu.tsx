import { Link, useLocation } from "wouter";
import { ChevronLeft, Building2, Smartphone } from "lucide-react";

export default function TransferMenu() {
  const [, setLocation] = useLocation();

  return (
    <div className="flex flex-col flex-1 bg-background">
      {/* Header */}
      <header className="flex items-center px-4 py-4 pt-4 bg-card border-b border-border/50 sticky top-0 z-10 shrink-0">
        <button onClick={() => setLocation("/")} className="p-2 -ml-2 text-foreground active:scale-90 transition-transform">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold ml-2">Transfer</h1>
      </header>

      <div className="p-4 flex flex-col gap-4 mt-2">
        <Link href="/transfer/opay" className="flex items-center gap-4 p-4 bg-card rounded-2xl active:scale-95 transition-transform border border-border/50 hover:bg-muted/50">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
            <Smartphone className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">To OPay Account</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Free, instant transfer to any OPay user</p>
          </div>
        </Link>

        <Link href="/transfer/bank" className="flex items-center gap-4 p-4 bg-card rounded-2xl active:scale-95 transition-transform border border-border/50 hover:bg-muted/50">
          <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center shrink-0">
            <Building2 className="w-6 h-6 text-blue-500" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">To Bank Account</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Send to any local bank account</p>
          </div>
        </Link>
      </div>
    </div>
  );
}