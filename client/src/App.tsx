import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

import Onboard from "./pages/Onboard";
import Delete from "./pages/Delete";
import FAQ from "./pages/FAQ";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import Accessibility from "./pages/Accessibility";
import CookieNotice from "./components/CookieNotice";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />

      <Route path={"/onboard/:client_id"} component={Onboard} />
      <Route path={"/delete"} component={Delete} />
      <Route path={"/faq"} component={FAQ} />
      <Route path={"/privacy"} component={PrivacyPolicy} />
      <Route path={"/terms"} component={TermsOfUse} />
      <Route path={"/accessibility"} component={Accessibility} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
          <CookieNotice />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
