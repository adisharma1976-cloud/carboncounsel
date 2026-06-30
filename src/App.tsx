import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import DashboardLayout from "@/components/layout/DashboardLayout";
import RegulatoryFeed from "@/pages/dashboard/RegulatoryFeed";
import SectorTracker from "@/pages/dashboard/SectorTracker";
import CompanySnapshot from "@/pages/dashboard/CompanySnapshot";
import AskAI from "@/pages/dashboard/AskAI";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <DashboardLayout>
      <Switch>
        <Route path="/" component={() => <Redirect to="/dashboard/regulatory" />} />
        <Route path="/dashboard/regulatory" component={RegulatoryFeed} />
        <Route path="/dashboard/sectors" component={SectorTracker} />
        <Route path="/dashboard/companies" component={CompanySnapshot} />
        <Route path="/dashboard/ai" component={AskAI} />
        <Route component={NotFound} />
      </Switch>
    </DashboardLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
