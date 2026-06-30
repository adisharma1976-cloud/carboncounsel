import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Marketing
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import Product from "@/pages/Product";
import Solutions from "@/pages/Solutions";
import CCTSTracker from "@/pages/CCTSTracker";
import CompanyIntelligence from "@/pages/CompanyIntelligence";
import ProjectDueDiligence from "@/pages/ProjectDueDiligence";
import Resources from "@/pages/Resources";
import About from "@/pages/About";
import EarlyAccess from "@/pages/EarlyAccess";
import NotFound from "@/pages/not-found";

// Dashboard
import DashboardLayout from "@/components/layout/DashboardLayout";
import RegulatoryFeed from "@/pages/dashboard/RegulatoryFeed";
import SectorTracker from "@/pages/dashboard/SectorTracker";
import CompanySnapshot from "@/pages/dashboard/CompanySnapshot";
import AskAI from "@/pages/dashboard/AskAI";

const queryClient = new QueryClient();

function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}

function Router() {
  return (
    <Switch>
      {/* Dashboard Routes */}
      <Route path="/dashboard" component={() => <DashboardLayout><RegulatoryFeed /></DashboardLayout>} />
      <Route path="/dashboard/regulatory" component={() => <DashboardLayout><RegulatoryFeed /></DashboardLayout>} />
      <Route path="/dashboard/sectors" component={() => <DashboardLayout><SectorTracker /></DashboardLayout>} />
      <Route path="/dashboard/companies" component={() => <DashboardLayout><CompanySnapshot /></DashboardLayout>} />
      <Route path="/dashboard/ai" component={() => <DashboardLayout><AskAI /></DashboardLayout>} />

      {/* Marketing Routes */}
      <Route path="/product" component={() => <MarketingLayout><Product /></MarketingLayout>} />
      <Route path="/solutions" component={() => <MarketingLayout><Solutions /></MarketingLayout>} />
      <Route path="/ccts-tracker" component={() => <MarketingLayout><CCTSTracker /></MarketingLayout>} />
      <Route path="/company-intelligence" component={() => <MarketingLayout><CompanyIntelligence /></MarketingLayout>} />
      <Route path="/project-due-diligence" component={() => <MarketingLayout><ProjectDueDiligence /></MarketingLayout>} />
      <Route path="/resources" component={() => <MarketingLayout><Resources /></MarketingLayout>} />
      <Route path="/about" component={() => <MarketingLayout><About /></MarketingLayout>} />
      <Route path="/early-access" component={() => <MarketingLayout><EarlyAccess /></MarketingLayout>} />
      <Route path="/" component={() => <MarketingLayout><Home /></MarketingLayout>} />
      
      {/* 404 */}
      <Route component={NotFound} />
    </Switch>
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
