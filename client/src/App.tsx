import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Leaderboard from "./pages/Leaderboard";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { UserNameDialog } from "./components/UserNameDialog";

/**
 * PairUp App Router
 * 
 * Routes:
 * - / : Main game page
 * - /leaderboard : Leaderboard page
 * - /about : About page
 * - /404 : Not found page
 */
function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/leaderboard"} component={Leaderboard} />
      <Route path={"/about"} component={About} />
      <Route path={"/privacy"} component={Privacy} />
      <Route path={"/terms"} component={Terms} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

/**
 * Main App Component
 * 
 * Theme: Light mode with soft pastel colors
 * - Background: Warm white (#F8F7F4)
 * - Primary: Soft purple (#D4B5E0)
 * - Secondary: Mint green (#A8E6D5)
 */
function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light" switchable={true}>
        <TooltipProvider>
          <Toaster />
          <UserNameDialog />
          <div className="flex min-h-screen flex-col bg-background text-foreground transition-colors duration-300">
            <Header />
            <main className="flex-1">
              <Router />
            </main>
            <Footer />
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
