import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { MobileLayout } from './components/mobile-layout';

import Home from '@/pages/home';
import TransferMenu from '@/pages/transfer-menu';
import TransferToBank from '@/pages/transfer-to-bank';
import TransferToOpay from '@/pages/transfer-to-opay';
import TransferBankAmount from '@/pages/transfer-bank-amount';
import TransferSuccess from '@/pages/transfer-success';
import TransactionHistory from '@/pages/transaction-history';
import TransactionDetail from '@/pages/transaction-detail';
import NotFound from '@/pages/not-found';

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/transfer" component={TransferMenu} />
      <Route path="/transfer/bank" component={TransferToBank} />
      <Route path="/transfer/opay" component={TransferToOpay} />
      <Route path="/transfer/bank/amount/:account/:bankId" component={TransferBankAmount} />
      <Route path="/transfer/success" component={TransferSuccess} />
      <Route path="/transactions" component={TransactionHistory} />
      <Route path="/transactions/:id" component={TransactionDetail} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL?.replace(/\/$/, '') || ''}>
          <MobileLayout>
            <Router />
          </MobileLayout>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;