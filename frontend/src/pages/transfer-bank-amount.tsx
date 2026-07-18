import { useState } from "react";
import { useLocation, useParams } from "wouter";
import { ChevronLeft, Building2, ScanFace } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBalance } from "@/hooks/useBalance";
import { useTransactions } from "@/hooks/useTransactions";
import { motion, AnimatePresence } from "framer-motion";

const QUICK_AMOUNTS = [500, 1000, 2000, 5000, 9999, 10000];

export default function TransferBankAmount() {
  const [, setLocation] = useLocation();
  const params = useParams();
  const searchParams = new URLSearchParams(window.location.search);
  const accountName = searchParams.get("name") || "Unknown Account";
  const bankName = searchParams.get("bank") || "Bank";

  const [amount, setAmount] = useState("");
  const [remark, setRemark] = useState("");
  const { balance, deductBalance } = useBalance();
  const { addTransaction } = useTransactions();
  const [isProcessing, setIsProcessing] = useState(false);

  const numAmount = parseFloat(amount || "0");
  const isValid = numAmount >= 100 && numAmount <= 5000000 && numAmount <= balance;

  const handleTransfer = () => {
    if (!isValid) return;

    setIsProcessing(true);

    // Simulate Face ID / Processing delay
    setTimeout(() => {
      const tx = addTransaction({
        type: "bank",
        recipientName: accountName,
        recipientAccount: params.account || "",
        bank: bankName,
        bankCode: params.bankId || "",
        amount: -numAmount, // negative = outgoing
        remark,
      });
      deductBalance(numAmount);
      setLocation(`/transfer/success?txId=${tx.id}`);
    }, 1500);
  };

  return (
    <div className="flex flex-col flex-1 bg-background relative">
      <header className="flex items-center px-4 py-4 pt-4 bg-card border-b border-border/50 sticky top-0 z-10 shrink-0">
        <button
          onClick={() => window.history.back()}
          className="p-2 -ml-2 text-foreground active:scale-90 transition-transform"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold ml-2">Transfer To Bank Account</h1>
      </header>

      <div className="p-4 flex flex-col gap-4 mt-2 flex-1">
        {/* Recipient Card */}
        <div className="bg-card p-4 rounded-2xl border border-border/50 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center shrink-0 border-2 border-orange-500/30">
            <Building2 className="w-6 h-6 text-orange-400" />
          </div>
          <div className="overflow-hidden">
            <h2 className="font-bold text-foreground truncate">{accountName}</h2>
            <p className="text-sm text-muted-foreground">
              {params.account} &bull; {bankName}
            </p>
          </div>
        </div>

        {/* Amount Input */}
        <div className="bg-card rounded-2xl border border-border/50 p-4">
          <p className="text-sm text-muted-foreground mb-3">Amount</p>
          <div className="flex items-center border-b-2 border-primary pb-2 mb-4">
            <span className="text-3xl font-semibold mr-2 text-muted-foreground">₦</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="100.00-5,000,000.00"
              className="flex-1 text-2xl font-bold bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground/40"
              autoFocus
            />
          </div>

          {/* Quick Amount Chips */}
          <div className="grid grid-cols-3 gap-2">
            {QUICK_AMOUNTS.map((amt) => (
              <button
                key={amt}
                onClick={() => setAmount(String(amt))}
                className={`py-2.5 px-3 rounded-xl text-sm font-semibold transition-all active:scale-95 border ${
                  numAmount === amt
                    ? "bg-primary/20 border-primary text-primary"
                    : "bg-background border-border/50 text-foreground"
                }`}
              >
                ₦{amt.toLocaleString()}
              </button>
            ))}
          </div>
        </div>

        {/* Remark */}
        <div className="bg-card rounded-2xl border border-border/50 p-4">
          <p className="text-sm text-muted-foreground mb-2">Remark</p>
          <input
            type="text"
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            placeholder="What's this for? (Optional)"
            className="w-full bg-transparent outline-none text-foreground placeholder:text-muted-foreground/50 text-sm"
            maxLength={50}
          />
        </div>

        {numAmount > balance && (
          <p className="text-destructive text-sm text-center">
            Insufficient balance. Available: ₦{balance.toLocaleString("en-NG", { minimumFractionDigits: 2 })}
          </p>
        )}

        <div className="mt-auto pt-4 pb-8">
          <Button
            className="w-full h-14 text-lg font-semibold rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-transform active:scale-[0.98]"
            disabled={!isValid || isProcessing}
            onClick={handleTransfer}
          >
            {isProcessing ? "Processing..." : "Confirm"}
          </Button>
        </div>
      </div>

      {/* Face ID Processing Overlay */}
      <AnimatePresence>
        {isProcessing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card p-8 rounded-3xl flex flex-col items-center shadow-2xl border border-border/50"
            >
              <div className="relative mb-6">
                <div className="absolute inset-0 border-4 border-primary/30 rounded-lg animate-pulse" />
                <ScanFace className="w-16 h-16 text-primary" strokeWidth={1} />
                <div className="absolute top-0 left-0 w-full h-1 bg-primary rounded-full animate-[scan_2s_ease-in-out_infinite]" />
              </div>
              <p className="font-semibold text-lg text-foreground">Authenticating...</p>
              <p className="text-sm text-muted-foreground mt-1">Face ID</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
