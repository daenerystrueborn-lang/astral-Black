import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/auth";
import { Layout } from "@/components/Layout";
import { LoadingScreen } from "@/components/LoadingScreen";
import NotFound from "@/pages/not-found";

import Home from "@/pages/home";
import Topup from "@/pages/topup";
import Cards from "@/pages/cards";
import Shops from "@/pages/shops";
import Terms from "@/pages/terms";
import Privacy from "@/pages/privacy";
import Login from "@/pages/login";
import Signup from "@/pages/signup";
import Profile from "@/pages/profile";

const queryClient = new QueryClient();

function RouterInner() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <LoadingScreen />
      <Switch>
        {/* Auth pages — rendered outside Layout (full-screen) */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />

        {/* All other pages inside Layout */}
        <Route>
          <Layout>
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/topup" component={Topup} />
              <Route path="/cards" component={Cards} />
              <Route path="/shops" component={Shops} />
              <Route path="/profile" component={Profile} />
              <Route path="/terms" component={Terms} />
              <Route path="/privacy" component={Privacy} />
              <Route component={NotFound} />
            </Switch>
          </Layout>
        </Route>
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <RouterInner />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
