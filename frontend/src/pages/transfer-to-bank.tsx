import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { ChevronLeft, Search, CheckCircle2, Loader2, Info } from "lucide-react";
import { useGetBanks, useResolveAccount } from "@/hooks/useBankingApi";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function TransferToBank() {
  const [, setLocation] = useLocation();
  const [accountNumber, setAccountNumber] = useState("");
  const [selectedBank, setSelectedBank] = useState<any>(null);
  const [showBankSelect, setShowBankSelect] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data: banks = [], isLoading: isLoadingBanks } = useGetBanks();
  const resolveAccount = useResolveAccount();

  const [resolvedName, setResolvedName] = useState<string | null>(null);
  const [resolveError, setResolveError] = useState<string | null>(null);

  // Trigger auto-resolve at 10 digits
  useEffect(() => {
    if (accountNumber.length === 10 && selectedBank) {
      setResolvedName(null);
      setResolveError(null);
      resolveAccount.mutate({
        data: {
          account_number: accountNumber,
          account_bank: selectedBank.code
        }
      }, {
        onSuccess: (res) => {
          setResolvedName(res.account_name);
        },
        onError: () => {
          setResolveError("Could not verify account. Please check details.");
        }
      });
    } else {
      setResolvedName(null);
      setResolveError(null);
    }
  }, [accountNumber, selectedBank]);

  const filteredBanks = banks.filter((b: any) => 
    b.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNext = () => {
    if (accountNumber.length === 10 && selectedBank && resolvedName) {
      setLocation(
        `/transfer/bank/amount/${accountNumber}/${selectedBank.code}?name=${encodeURIComponent(resolvedName)}&bank=${encodeURIComponent(selectedBank.name)}`
      );
    }
  };

  return (
    <div className="flex flex-col flex-1 bg-background relative">
      <header className="flex items-center px-4 py-4 pt-4 bg-card border-b border-border/50 sticky top-0 z-10 shrink-0">
        <button onClick={() => setLocation("/transfer")} className="p-2 -ml-2 text-foreground active:scale-90 transition-transform">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold ml-2">Transfer to Bank</h1>
      </header>

      <div className="p-4 flex flex-col gap-6 mt-2 flex-1 relative">
        <div className="bg-card p-4 rounded-2xl border border-border/50 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Recipient Account</label>
            <div className="relative">
              <Input
                type="tel"
                maxLength={10}
                placeholder="10-digit Account Number"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value.replace(/[^0-9]/g, ''))}
                className="h-14 text-lg bg-background border-none rounded-xl pl-4 pr-10 font-medium"
              />
              {accountNumber.length === 10 && !resolveAccount.isPending && resolvedName && (
                <CheckCircle2 className="absolute right-3 top-4 w-6 h-6 text-primary" />
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Select Bank</label>
            <button 
              onClick={() => setShowBankSelect(true)}
              className="w-full h-14 bg-background rounded-xl px-4 flex items-center justify-between text-left border-none"
            >
              <span className={`text-lg font-medium ${!selectedBank ? 'text-muted-foreground' : 'text-foreground'}`}>
                {selectedBank ? selectedBank.name : "Choose Bank"}
              </span>
              <ChevronLeft className="w-5 h-5 text-muted-foreground rotate-180" />
            </button>
          </div>

          {resolveAccount.isPending && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-background p-3 rounded-xl animate-in fade-in">
              <Loader2 className="w-4 h-4 animate-spin text-primary" />
              Verifying account...
            </div>
          )}

          {resolvedName && (
            <div className="bg-primary/10 text-primary p-3 rounded-xl flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-semibold">{resolvedName}</span>
            </div>
          )}

          {resolveError && (
            <div className="bg-destructive/10 text-destructive p-3 rounded-xl flex items-start gap-2 animate-in fade-in">
              <Info className="w-5 h-5 shrink-0 mt-0.5" />
              <span className="text-sm">{resolveError}</span>
            </div>
          )}
        </div>

        <div className="mt-auto pt-6 pb-8">
          <Button 
            className="w-full h-14 text-lg font-semibold rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all active:scale-[0.98]"
            disabled={!resolvedName || accountNumber.length !== 10}
            onClick={handleNext}
          >
            Next
          </Button>
        </div>
      </div>

      {/* Bank Selection Bottom Sheet */}
      <AnimatePresence>
        {showBankSelect && (
          <div className="absolute inset-0 z-50 flex flex-col justify-end overflow-hidden">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60" 
              onClick={() => setShowBankSelect(false)} 
            />
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="bg-card w-full h-[85%] rounded-t-3xl flex flex-col relative z-10"
            >
              <div className="flex items-center justify-center p-4 border-b border-border/50 shrink-0 relative">
                <div className="w-12 h-1.5 bg-muted rounded-full absolute top-2" />
                <h2 className="font-semibold text-lg mt-2">Select Bank</h2>
              </div>
              
              <div className="p-4 border-b border-border/50 shrink-0">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search bank"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 bg-background border-none rounded-xl text-base"
                  />
                </div>
              </div>

              <div className="overflow-y-auto flex-1 p-2 pb-8 scrollbar-hide">
                {isLoadingBanks ? (
                  <div className="flex justify-center p-8">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  </div>
                ) : filteredBanks.length === 0 ? (
                  <div className="text-center p-8 text-muted-foreground">No banks found</div>
                ) : (
                  filteredBanks.map((bank: any) => (
                    <button
                      key={bank.code}
                      onClick={() => {
                        setSelectedBank(bank);
                        setShowBankSelect(false);
                        setSearchQuery("");
                      }}
                      className="w-full flex items-center p-4 hover:bg-white/5 rounded-xl transition-colors text-left"
                    >
                      <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center mr-4 shrink-0 text-sm font-bold border border-border/50 text-foreground">
                        {bank.name.substring(0, 2).toUpperCase()}
                      </div>
                      <span className="font-medium text-foreground text-base">{bank.name}</span>
                    </button>
                  ))
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}