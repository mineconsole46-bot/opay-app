import { useLocation } from "wouter";
import { Check, Share2, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TransferSuccess() {
  const [, setLocation] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const txId = searchParams.get("txId");

  return (
    <div className="flex flex-col flex-1 bg-primary text-primary-foreground">
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center mt-12">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 animate-in zoom-in duration-500 shadow-2xl relative">
          <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-20" />
          <Check className="w-12 h-12 text-primary" strokeWidth={3} />
        </div>
        <h1 className="text-3xl font-bold mb-2 animate-in slide-in-from-bottom-4 duration-500 delay-150">Transfer Successful</h1>
        <p className="text-primary-foreground/80 animate-in slide-in-from-bottom-4 duration-500 delay-200">Your money has been sent successfully.</p>
        
        {/* Receipt stub aesthetic */}
        <div className="mt-12 w-full max-w-sm bg-card text-foreground rounded-2xl p-6 shadow-xl relative overflow-hidden animate-in slide-in-from-bottom-8 duration-700 delay-300">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-primary rounded-full" />
          
          <div className="flex flex-col gap-4 pt-2">
            <div className="flex justify-between items-center pb-4 border-b border-border/50">
              <span className="text-muted-foreground text-sm">Status</span>
              <span className="font-semibold text-primary">Successful</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground text-sm">Ref Number</span>
              <span className="font-mono text-sm">{txId || `TRX${Date.now()}`}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 bg-background rounded-t-3xl flex gap-4 shrink-0 animate-in slide-in-from-bottom-full duration-500 delay-500">
        <Button 
          variant="outline" 
          className="flex-1 h-14 rounded-2xl border-border bg-card hover:bg-muted font-semibold"
          onClick={() => {}}
        >
          <Share2 className="w-5 h-5 mr-2" />
          Share
        </Button>
        <Button 
          className="flex-1 h-14 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
          onClick={() => setLocation("/")}
        >
          <Home className="w-5 h-5 mr-2" />
          Done
        </Button>
      </div>
    </div>
  );
}