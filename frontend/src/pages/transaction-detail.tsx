import { useLocation, useParams } from "wouter";
import { ChevronLeft, Share2, Copy, Check, ArrowUpRight } from "lucide-react";
import { useTransactions, type Transaction } from "@/hooks/useTransactions";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion } from "framer-motion";

function getDisplayTitle(tx: Transaction): string {
  if (tx.recipientName === "OWealth") return "OWealth Interest Earned";
  if (tx.recipientName === "Betting") return "Betting";
  if (tx.recipientName === "Airtime") return "Airtime";
  if (tx.recipientName === "Airtime Purchase") return "Bonus from Airtime Purchase";
  if (tx.amount > 0) return `Transfer from ${tx.recipientName}`;
  return `Transfer to ${tx.recipientName}`;
}

function CopyField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="flex justify-between items-start gap-4">
      <span className="text-sm text-muted-foreground shrink-0">{label}</span>
      <div className="flex items-center gap-2 text-right">
        <span className="text-sm font-medium text-foreground font-mono break-all">{value}</span>
        <button onClick={copy} className="text-muted-foreground active:scale-90 transition-transform shrink-0">
          {copied ? <Check className="w-3.5 h-3.5 text-primary" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-start gap-4">
      <span className="text-sm text-muted-foreground shrink-0">{label}</span>
      <span className="text-sm font-medium text-right text-foreground">{value}</span>
    </div>
  );
}

export default function TransactionDetail() {
  const [, setLocation] = useLocation();
  const params = useParams();
  const { getTransaction } = useTransactions();

  const tx = getTransaction(params.id || "");

  if (!tx) {
    return (
      <div className="flex flex-col flex-1 bg-background items-center justify-center gap-4">
        <p className="text-muted-foreground">Transaction not found</p>
        <Button variant="link" onClick={() => setLocation("/transactions")}>
          Go Back
        </Button>
      </div>
    );
  }

  const isOut = tx.amount < 0;
  const displayAmt = Math.abs(tx.amount);
  const title = getDisplayTitle(tx);
  const txDate = new Date(tx.createdAt);

  return (
    <div className="flex flex-col flex-1 bg-background">
      <header className="flex items-center justify-between px-4 py-4 pt-4 bg-card border-b border-border/50 sticky top-0 z-10 shrink-0">
        <div className="flex items-center">
          <button
            onClick={() => window.history.back()}
            className="p-2 -ml-2 text-foreground active:scale-90 transition-transform"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold ml-2">Transaction Details</h1>
        </div>
        <span className="text-primary text-sm font-medium cursor-pointer">
          <ArrowUpRight className="w-5 h-5" />
        </span>
      </header>

      <div className="p-4 flex flex-col gap-4 mt-2 overflow-y-auto pb-8">
        {/* Main Status Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-3xl border border-border/50 py-6 px-4 flex flex-col items-center text-center"
        >
          <div className="w-16 h-16 rounded-full bg-background border border-border/50 flex items-center justify-center mb-4 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
              <span className="text-white font-bold text-lg">
                {tx.recipientName.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
          <h2 className="font-semibold text-foreground mb-1 px-4">{title}</h2>
          <p className="text-4xl font-bold text-foreground mb-2">
            ₦{displayAmt.toLocaleString("en-NG", { minimumFractionDigits: 2 })}
          </p>
          <span className="text-primary font-semibold">{tx.status}</span>
        </motion.div>

        {/* 3-Step Progress (bank transfers) */}
        {tx.type === "bank" && (
          <div className="bg-card rounded-2xl border border-border/50 p-4">
            <div className="flex items-center justify-between">
              {[
                { label: "Payment successful", sub: format(txDate, "MM-dd HH:mm:ss") },
                { label: "Processing by bank", sub: format(txDate, "MM-dd HH:mm:ss") },
                { label: "Received by bank", sub: format(new Date(txDate.getTime() + 26000), "MM-dd HH:mm:ss") },
              ].map((step, i, arr) => (
                <div key={i} className="flex flex-col items-center text-center flex-1">
                  {i < arr.length - 1 && (
                    <div className="absolute" style={{ left: `${(i + 0.9) * 33}%`, transform: "translateX(-50%)", top: "12px" }} />
                  )}
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center mb-2 shadow-sm">
                    <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                  </div>
                  <p className="text-[10px] text-foreground font-medium leading-tight">{step.label}</p>
                  <p className="text-[9px] text-muted-foreground mt-0.5">{step.sub}</p>
                  {i < arr.length - 1 && (
                    <div className="absolute h-0.5 bg-primary" style={{ width: "28%", left: `${(i + 1) * 33 - 14}%`, top: "12px" }} />
                  )}
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-4 text-center leading-relaxed bg-background/50 p-3 rounded-xl">
              The recipient account is expected to be credited within 5 minutes, subject to notification by the bank.
            </p>
          </div>
        )}

        {/* Transaction Details */}
        <div className="bg-card rounded-2xl border border-border/50 p-4 flex flex-col gap-4">
          <h3 className="font-semibold text-foreground">Transaction Details</h3>
          <div className="h-px bg-border/40" />
          <DetailRow
            label="Recipient Details"
            value={`${tx.recipientName}${tx.bank ? ` / ${tx.bank}` : ""}${tx.recipientAccount ? ` | ${tx.recipientAccount}` : ""}`}
          />
          <CopyField label="Transaction No." value={tx.ref} />
          <DetailRow label="Payment Method" value="OWealth" />
          <DetailRow label="Transaction Date" value={format(txDate, "MMM do, yyyy HH:mm:ss")} />
          <CopyField label="Session ID" value={tx.sessionId} />
        </div>

        {/* More Actions */}
        <div className="bg-card rounded-2xl border border-border/50 p-4">
          <h3 className="font-semibold text-foreground mb-4">More Actions</h3>
          <div className="h-px bg-border/40 mb-4" />
          <div className="flex items-center justify-around">
            <button
              onClick={() => setLocation("/transfer/bank")}
              className="flex items-center gap-2 text-primary font-medium text-sm active:scale-95 transition-transform"
            >
              <span className="text-lg">⟲</span> Transfer Again
            </button>
            <div className="w-px h-5 bg-border/50" />
            <button
              onClick={() => setLocation("/transactions")}
              className="flex items-center gap-2 text-primary font-medium text-sm active:scale-95 transition-transform"
            >
              <span className="text-lg">⏱</span> View Records
            </button>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex gap-3 mt-2">
          <Button
            variant="outline"
            className="flex-1 h-12 rounded-full border-border/50 bg-card text-foreground font-semibold"
          >
            Report Issue
          </Button>
          <Button className="flex-1 h-12 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90">
            <Share2 className="w-4 h-4 mr-2" />
            Share Receipt
          </Button>
        </div>
      </div>
    </div>
  );
}
