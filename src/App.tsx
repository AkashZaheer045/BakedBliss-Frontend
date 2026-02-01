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
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import ProductDetails from "./pages/ProductDetails";
import PremiumDashboard from "./pages/PremiumDashboard";
import NotFound from "./pages/NotFound";

// Create queryClient outside component but with a function to clear it
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

type AppState = 'splash' | 'role-selection' | 'auth' | 'customer-app' | 'admin-app';

// Main App Content - handles routing based on state
const AppContent = () => {
  const [appState, setAppState] = useState<AppState>('splash');
  const [userRole, setUserRole] = useState<'customer' | 'admin' | null>(null);
  const { logout, isAuthenticated, user, isLoading } = useAuth();

  // Check if user is already authenticated on mount
  useEffect(() => {
    if (isAuthenticated && user) {
      // Keep user on current page - don't reset URL
      if (user.role === 'admin') {
        setAppState('admin-app');
        setUserRole('admin');
      } else {
        setAppState('customer-app');
        setUserRole('customer');
      }
    }
  }, [isAuthenticated, user]);

  // Handle logout for admin (customer app stays public)
  useEffect(() => {
    if (!isLoading && !isAuthenticated && appState === 'admin-app') {
      setAppState('role-selection');
      setUserRole(null);
    }
  }, [isAuthenticated, isLoading, appState]);

  const handleSplashComplete = () => {
    // Check if already authenticated
    if (isAuthenticated && user) {
      // Keep user on current page - don't reset URL
      if (user.role === 'admin') {
        setAppState('admin-app');
        setUserRole('admin');
      } else {
        setAppState('customer-app');
        setUserRole('customer');
      }
    } else {
      // Go directly to customer app (public access)
      setAppState('customer-app');
      setUserRole('customer');
    }
  };

  const handleRoleSelect = (role: 'customer' | 'admin') => {
    setUserRole(role);
    setAppState('auth');
  };

  const handleAuthSuccess = () => {
    // Keep user on current page after auth success
    // Navigation will be handled by the routes
    if (userRole === 'admin') {
      setAppState('admin-app');
    } else {
      setAppState('customer-app');
    }
  };

  const handleLogout = () => {
    // Clear all React Query cached data to prevent stale data from previous session
    queryClient.clear();
    
    // Clear auth state (this also clears localStorage)
    logout();
    
    // Reset browser URL to root to prevent stale routes
    if (window.location.pathname !== '/') {
      window.history.replaceState(null, '', '/');
    }
    
    // For customers, stay in customer app (public). For admin, go to role selection.
    if (userRole === 'admin') {
      setUserRole(null);
      setAppState('role-selection');
    } else {
      // Stay in customer app, just logged out
      setUserRole('customer');
    }
  };

  const handleBackToRoleSelection = () => {
    setAppState('role-selection');
  };

  // Handler to go to admin login
  const handleGoToAdmin = () => {
    setUserRole('admin');
    setAppState('auth');
  };

  // Handler to go to customer auth (from profile button or protected action)
  const handleGoToAuth = () => {
    setUserRole('customer');
    setAppState('auth');
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
          <Route path="/" element={<PremiumDashboard />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/auth" element={<Auth onAuthSuccess={handleAuthSuccess} onBack={() => window.history.back()} role="customer" />} />
          <Route path="/admin-login" element={<RoleSelection onRoleSelect={handleRoleSelect} />} />
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
