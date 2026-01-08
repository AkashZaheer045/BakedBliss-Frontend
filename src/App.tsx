import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { SplashScreen } from "@/components/SplashScreen";
import { RoleSelection } from "@/components/RoleSelection";
import { Auth } from "@/pages/Auth";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Dashboard } from "@/pages/admin/Dashboard";
import { Products } from "@/pages/admin/Products";
import { Orders } from "@/pages/admin/Orders";
import { Customers } from "@/pages/admin/Customers";
import { Payments } from "@/pages/admin/Payments";
import { Reviews } from "@/pages/admin/Reviews";
import { Promotions } from "@/pages/admin/Promotions";
import { Settings } from "@/pages/admin/Settings";
import { ActivityLogs } from "@/pages/admin/ActivityLogs";
import Index from "./pages/Index";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import ProductDetails from "./pages/ProductDetails";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

type AppState = 'splash' | 'role-selection' | 'auth' | 'customer-app' | 'admin-app';

// Main App Content - handles routing based on state
const AppContent = () => {
  const [appState, setAppState] = useState<AppState>('splash');
  const [userRole, setUserRole] = useState<'customer' | 'admin' | null>(null);
  const { logout, isAuthenticated, user, isLoading } = useAuth();

  // Check if user is already authenticated on mount
  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'admin') {
        setAppState('admin-app');
        setUserRole('admin');
      } else {
        setAppState('customer-app');
        setUserRole('customer');
      }
    }
  }, [isAuthenticated, user]);

  // Handle logout (redirect to role selection when authenticated becomes false)
  useEffect(() => {
    if (!isLoading && !isAuthenticated && (appState === 'customer-app' || appState === 'admin-app')) {
      setAppState('role-selection');
      setUserRole(null);
    }
  }, [isAuthenticated, isLoading, appState]);

  const handleSplashComplete = () => {
    // Check if already authenticated
    if (isAuthenticated && user) {
      if (user.role === 'admin') {
        setAppState('admin-app');
        setUserRole('admin');
      } else {
        setAppState('customer-app');
        setUserRole('customer');
      }
    } else {
      setAppState('role-selection');
    }
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
    logout(); // This clears tokens from localStorage
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
    return <Auth onAuthSuccess={handleAuthSuccess} onBack={handleBackToRoleSelection} role={userRole} />;
  }

  return (
    <BrowserRouter>
      {appState === 'admin-app' ? (
        <Routes>
          <Route path="/" element={<AdminLayout onLogout={handleLogout} />}>
            <Route index element={<Dashboard />} />
            <Route path="admin" element={<Dashboard />} />
            <Route path="admin/products" element={<Products />} />
            <Route path="admin/orders" element={<Orders />} />
            <Route path="admin/customers" element={<Customers />} />
            <Route path="admin/promotions" element={<Promotions />} />
            <Route path="admin/reviews" element={<Reviews />} />
            <Route path="admin/payments" element={<Payments />} />
            <Route path="admin/settings" element={<Settings />} />
            <Route path="admin/logs" element={<ActivityLogs />} />
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
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </BrowserRouter>
  );
};

// Root App component with providers
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <CartProvider>
            <Toaster />
            <Sonner />
            <AppContent />
          </CartProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
