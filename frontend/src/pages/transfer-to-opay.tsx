import { useState } from "react";
import { useLocation } from "wouter";
import { ChevronLeft, User, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function TransferToOpay() {
  const [, setLocation] = useLocation();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [resolvedName, setResolvedName] = useState<string | null>(null);

  // Mock resolve logic
  const handlePhoneChange = (val: string) => {
    const numeric = val.replace(/[^0-9]/g, '');
    setPhoneNumber(numeric);
    
    if (numeric.length === 11 || numeric.length === 10) {
      setResolvedName("Jane Doe");
    } else {
      setResolvedName(null);
    }
  };

  const handleNext = () => {
    if (resolvedName) {
      setLocation(`/transfer/bank/amount/${phoneNumber}/opay?name=${encodeURIComponent(resolvedName)}`);
    }
  };

  return (
    <div className="flex flex-col flex-1 bg-background">
      <header className="flex items-center px-4 py-4 pt-4 bg-card border-b border-border/50 sticky top-0 z-10 shrink-0">
        <button onClick={() => setLocation("/transfer")} className="p-2 -ml-2 text-foreground active:scale-90 transition-transform">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold ml-2">To OPay Account</h1>
      </header>

      <div className="p-4 flex flex-col gap-6 mt-2 flex-1">
        <div className="bg-card p-4 rounded-2xl border border-border/50 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Recipient Phone / Account</label>
            <div className="relative">
              <Input
                type="tel"
                placeholder="Mobile number or account"
                value={phoneNumber}
                onChange={(e) => handlePhoneChange(e.target.value)}
                className="h-14 text-lg bg-background border-none rounded-xl pl-4 pr-10 font-medium"
              />
              {resolvedName && (
                <CheckCircle2 className="absolute right-3 top-4 w-6 h-6 text-primary" />
              )}
            </div>
          </div>

          {resolvedName && (
            <div className="bg-primary/10 text-primary p-3 rounded-xl flex items-center gap-3 mt-4 animate-in fade-in">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold">{resolvedName}</p>
                <p className="text-xs opacity-80">OPay Account</p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-auto pt-6 pb-8">
          <Button 
            className="w-full h-14 text-lg font-semibold rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 transition-transform active:scale-[0.98]"
            disabled={!resolvedName}
            onClick={handleNext}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}