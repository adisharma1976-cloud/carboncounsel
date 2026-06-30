import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
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

const queryClient = new QueryClient();

function Layout({ children }: { children: React.ReactNode }) {
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
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/product" component={Product} />
        <Route path="/solutions" component={Solutions} />
        <Route path="/ccts-tracker" component={CCTSTracker} />
        <Route path="/company-intelligence" component={CompanyIntelligence} />
        <Route path="/project-due-diligence" component={ProjectDueDiligence} />
        <Route path="/resources" component={Resources} />
        <Route path="/about" component={About} />
        <Route path="/early-access" component={EarlyAccess} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
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
