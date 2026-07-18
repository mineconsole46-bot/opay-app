import { useLocation, Link } from "wouter";
import { ChevronLeft, ArrowDownLeft, ArrowUpRight, Search, Filter, TrendingUp } from "lucide-react";
import { useTransactions, type Transaction } from "@/hooks/useTransactions";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { useState } from "react";

function getDisplayTitle(tx: Transaction): string {
  if (tx.recipientName === "OWealth") return "OWealth Interest Earned";
  if (tx.recipientName === "Betting") return "Betting";
  if (tx.recipientName === "Airtime") return "Airtime";
  if (tx.recipientName === "Airtime Purchase") return "Bonus from Airtime Purchase";
  if (tx.amount > 0) return `Transfer from ${tx.recipientName}`;
  return `Transfer to ${tx.recipientName}`;
}

function getIconConfig(tx: Transaction): { bg: string; icon: string } {
  if (tx.recipientName === "OWealth") return { bg: "bg-purple-500/20", icon: "purple" };
  if (tx.recipientName === "Betting") return { bg: "bg-teal-500/20", icon: "teal" };
  if (tx.recipientName === "Airtime" || tx.recipientName === "Airtime Purchase")
    return { bg: "bg-green-500/20", icon: "green" };
  if (tx.amount > 0) return { bg: "bg-primary/10", icon: "primary" };
  return { bg: "bg-destructive/10", icon: "destructive" };
}

export default function TransactionHistory() {
  const [, setLocation] = useLocation();
  const { transactions } = useTransactions();
  const [search, setSearch] = useState("");

  const filtered = transactions.filter((tx) =>
    getDisplayTitle(tx).toLowerCase().includes(search.toLowerCase())
  );

  const totalIn = transactions.filter((t) => t.amount > 0).reduce((s, t) => s + t.amount, 0);
  const totalOut = transactions.filter((t) => t.amount < 0).reduce((s, t) => s + Math.abs(t.amount), 0);

  return (
    <div className="flex flex-col flex-1 bg-background">
      <header className="flex flex-col px-4 pt-4 bg-card border-b border-border/50 sticky top-0 z-10 shrink-0">
        <div className="flex items-center justify-between py-2 mb-2">
          <div className="flex items-center">
            <button
              onClick={() => setLocation("/")}
              className="p-2 -ml-2 text-foreground active:scale-90 transition-transform"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-semibold ml-2">Transactions</h1>
          </div>
          <span className="text-primary text-sm font-medium">Download</span>
        </div>

        {/* Filters row */}
        <div className="flex gap-2 pb-3">
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-background border border-border/50 rounded-lg text-xs font-medium text-foreground">
            All Categories <Filter className="w-3 h-3" />
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-background border border-border/50 rounded-lg text-xs font-medium text-foreground">
            All Status <Filter className="w-3 h-3" />
          </button>
        </div>

        {/* Search */}
        <div className="relative pb-3">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search transactions"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9 bg-background border-border/50 rounded-xl text-sm"
          />
        </div>
      </header>

      <div className="flex-1 overflow-y-auto pb-6">
        {/* Month summary */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/30">
          <div className="flex items-center gap-1">
            <span className="font-semibold text-foreground">Jul</span>
            <ChevronLeft className="w-4 h-4 rotate-[-90deg] text-muted-foreground" />
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="text-primary font-medium">
              In ₦{totalIn.toLocaleString("en-NG", { minimumFractionDigits: 2 })}
            </span>
            <span className="text-muted-foreground">
              Out ₦{totalOut.toLocaleString("en-NG", { minimumFractionDigits: 2 })}
            </span>
          </div>
          <button className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> Analysis
          </button>
        </div>

        <div className="p-4 flex flex-col gap-1">
          {filtered.map((tx) => {
            const isOut = tx.amount < 0;
            const iconCfg = getIconConfig(tx);
            const title = getDisplayTitle(tx);
            const displayAmt = Math.abs(tx.amount);

            return (
              <Link key={tx.id} href={`/transactions/${tx.id}`} className="block">
                <div className="flex items-center justify-between py-3.5 border-b border-border/20 active:opacity-70 transition-opacity">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${iconCfg.bg}`}
                    >
                      {isOut ? (
                        <ArrowUpRight
                          className={`w-5 h-5 ${
                            iconCfg.icon === "destructive"
                              ? "text-destructive"
                              : "text-primary"
                          }`}
                        />
                      ) : (
                        <ArrowDownLeft className="w-5 h-5 text-primary" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-sm text-foreground line-clamp-1">{title}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {format(new Date(tx.createdAt), "MMM do, HH:mm:ss")}
                      </p>
                    </div>
                  </div>
                  <div className="text-right pl-4 shrink-0">
                    <p className={`font-semibold text-sm ${isOut ? "text-foreground" : "text-primary"}`}>
                      {isOut ? "-" : "+"}₦{displayAmt.toLocaleString("en-NG", { minimumFractionDigits: 2 })}
                    </p>
                    <p className="text-[10px] mt-0.5 font-medium text-primary">{tx.status}</p>
                  </div>
                </div>
              </Link>
            );
          })}

          {filtered.length === 0 && (
            <div className="text-center p-12 text-muted-foreground">
              <p>No transactions found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
