import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { SplashScreen } from "@/components/SplashScreen";
import { RoleSelection } from "@/components/RoleSelection";
import { Auth } from "@/pages/Auth";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Dashboard } from "@/pages/admin/Dashboard";
import { Products } from "@/pages/admin/Products";
import Index from "./pages/Index";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

type AppState = 'splash' | 'role-selection' | 'auth' | 'customer-app' | 'admin-app';

const App = () => {
  const [appState, setAppState] = useState<AppState>('splash');
  const [userRole, setUserRole] = useState<'customer' | 'admin' | null>(null);

  const handleSplashComplete = () => {
    setAppState('role-selection');
  };

  const handleRoleSelect = (role: 'customer' | 'admin') => {
    setUserRole(role);
    setAppState('auth');
  };

  const handleAuthSuccess = () => {
    if (userRole === 'admin') {
      setAppState('admin-app');
    } else {
      setAppState('customer-app');
    }
  };

  const handleLogout = () => {
    setUserRole(null);
    setAppState('role-selection');
  };

  const handleBackToRoleSelection = () => {
    setAppState('role-selection');
  };

  if (appState === 'splash') {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  if (appState === 'role-selection') {
    return <RoleSelection onRoleSelect={handleRoleSelect} />;
  }

  if (appState === 'auth') {
    return <Auth onAuthSuccess={handleAuthSuccess} onBack={handleBackToRoleSelection} />;
  }

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            {appState === 'admin-app' ? (
              <Routes>
                <Route path="/" element={<AdminLayout onLogout={handleLogout} />}>
                  <Route index element={<Dashboard />} />
                  <Route path="admin" element={<Dashboard />} />
                  <Route path="admin/products" element={<Products />} />
                  <Route path="admin/orders" element={<div>Orders Page</div>} />
                  <Route path="admin/customers" element={<div>Customers Page</div>} />
                  <Route path="admin/promotions" element={<div>Promotions Page</div>} />
                  <Route path="admin/reviews" element={<div>Reviews Page</div>} />
                  <Route path="admin/payments" element={<div>Payments Page</div>} />
                  <Route path="admin/settings" element={<div>Settings Page</div>} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            ) : (
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            )}
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default App;
