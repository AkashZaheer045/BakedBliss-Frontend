import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff, Mail, Lock, User, Phone, ChefHat } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface AuthProps {
  onAuthSuccess: () => void;
  onBack: () => void;
  onContinueAsGuest?: () => void;
  role?: 'customer' | 'admin' | null;
}

export const Auth = ({ onAuthSuccess, onBack, onContinueAsGuest, role }: AuthProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    confirmPassword: ''
  });
  const { toast } = useToast();
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent, type: 'login' | 'signup') => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (type === 'login') {
        await login(formData.email, formData.password);
        toast({
          title: "Welcome Back!",
          description: "Login successful.",
          className: "bg-orange-50 border-orange-200 text-orange-900"
        });
      } else {
        if (formData.password !== formData.confirmPassword) {
          toast({
            title: "Mismatch",
            description: "Passwords do not match",
            variant: "destructive"
          });
          setIsLoading(false);
          return;
        }

        await signup({
          fullName: formData.name,
          email: formData.email,
          phoneNumber: formData.phone,
          password: formData.password
        });

        toast({
          title: "Welcome!",
          description: "Account created successfully.",
          className: "bg-orange-50 border-orange-200 text-orange-900"
        });
      }

      setTimeout(() => {
        onAuthSuccess();
        // Navigate to dashboard - this ensures immediate redirect without reload
        navigate('/');
      }, 500);

    } catch (error: any) {
      console.error('Authentication error:', error);
      
      let errorMessage = 'Authentication failed. Please try again.';
      const responseData = error.response?.data;
      
      if (responseData) {
        if (responseData.message) {
           errorMessage = responseData.message;
        }
        else if (responseData.errors && Array.isArray(responseData.errors) && responseData.errors.length > 0) {
          errorMessage = responseData.errors[0].message || responseData.errors[0].msg;
        }
        else if (typeof responseData === 'string') {
            errorMessage = responseData;
        }
      } 
      else if (error.message && error.message !== 'Request failed with status code 412') {
        errorMessage = error.message;
      }

      toast({
        title: "Action Failed",
        description: errorMessage,
        variant: "destructive",
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Image with Blur */}
      <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-white/30 z-10 backdrop-blur-sm" />
          <img 
            src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=2626&auto=format&fit=crop" 
            alt="Bakery Background" 
            className="w-full h-full object-cover"
          />
      </div>

      {/* Main Card */}
      <Card className="w-full max-w-md relative z-20 bg-white/80 backdrop-blur-xl shadow-2xl border-white/40 animate-fade-in my-4 xs:my-6 sm:my-8 mx-2 xs:mx-4">
        <div className="p-4 xs:p-6 sm:p-8">
            
            {/* Header Section */}
            <div className="text-center mb-4 xs:mb-6 sm:mb-8">
                <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-100 to-white rounded-full flex items-center justify-center mx-auto mb-3 xs:mb-4 text-orange-600 shadow-sm border border-orange-100">
                    <ChefHat className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8" />
                </div>
                <h1 className="text-2xl xs:text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Baked Bliss</h1>
                <p className="text-xs xs:text-sm text-gray-600 mt-1 xs:mt-2 font-medium">Your daily dose of fresh pastries</p>
            </div>

            {/* Tabs & Form */}
            <Tabs defaultValue="login" className="w-full">
              <TabsList className={`grid w-full mb-4 xs:mb-6 sm:mb-8 h-10 xs:h-11 sm:h-12 bg-gray-100/50 p-1 rounded-xl border border-gray-200/50 ${role === 'admin' ? 'grid-cols-1' : 'grid-cols-2'}`}>
                <TabsTrigger 
                    value="login" 
                    className="h-8 xs:h-9 sm:h-10 rounded-lg text-xs xs:text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-orange-600 data-[state=active]:shadow-sm transition-all"
                >
                    Login
                </TabsTrigger>
                {role !== 'admin' && (
                  <TabsTrigger 
                      value="signup" 
                      className="h-10 rounded-lg text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-orange-600 data-[state=active]:shadow-sm transition-all"
                  >
                      Sign Up
                  </TabsTrigger>
                )}
              </TabsList>

              <TabsContent value="login" className="space-y-6 animate-fade-in focus-visible:outline-none">
                <form onSubmit={(e) => handleSubmit(e, 'login')} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <div className="relative group">
                      <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 group-hover:text-orange-500 transition-colors" />
                      <Input
                        id="login-email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        className="pl-10 h-10 border-gray-200 focus:border-orange-500 focus:ring-orange-500/20"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="login-password">Password</Label>
                        <span className="text-xs text-orange-600 hover:underline cursor-pointer">Forgot?</span>
                    </div>
                    <div className="relative group">
                      <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 group-hover:text-orange-500 transition-colors" />
                      <Input
                        id="login-password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-10 pr-10 h-10 border-gray-200 focus:border-orange-500 focus:ring-orange-500/20"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent text-gray-400 hover:text-gray-600"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full h-11 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg shadow-lg hover:shadow-orange-500/30 transition-all" disabled={isLoading}>
                    {isLoading ? "Signing In..." : "Sign In"}
                  </Button>
                </form>

                {/* Continue as Guest option */}
                {role !== 'admin' && (
                  <div className="pt-4 border-t border-gray-200">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        if (onContinueAsGuest) {
                          onContinueAsGuest();
                        } else {
                          navigate('/');
                        }
                      }}
                      className="w-full h-11 border-gray-300 text-gray-700 hover:bg-gray-50 font-medium rounded-lg"
                    >
                      Continue as Guest
                    </Button>
                    <p className="text-xs text-gray-500 text-center mt-2">Browse without creating an account</p>
                  </div>
                )}
              </TabsContent>

              {role !== 'admin' && (
                <TabsContent value="signup" className="space-y-6 animate-fade-in focus-visible:outline-none">
                  <form onSubmit={(e) => handleSubmit(e, 'signup')} className="space-y-4">
                    {/* ... form content ... */}
                    <div className="space-y-2">
                      <Label htmlFor="signup-name">Full Name</Label>
                      <div className="relative group">
                        <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 group-hover:text-orange-500 transition-colors" />
                        <Input
                          id="signup-name"
                          name="name"
                          placeholder="John Doe"
                          className="pl-10 h-10 border-gray-200 focus:border-orange-500 focus:ring-orange-500/20"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <div className="relative group">
                        <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 group-hover:text-orange-500 transition-colors" />
                        <Input
                          id="signup-email"
                          name="email"
                          type="email"
                          placeholder="john@example.com"
                          className="pl-10 h-10 border-gray-200 focus:border-orange-500 focus:ring-orange-500/20"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-phone">Phone</Label>
                      <div className="relative group">
                        <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 group-hover:text-orange-500 transition-colors" />
                        <Input
                          id="signup-phone"
                          name="phone"
                          type="tel"
                          placeholder="+1 234..."
                          className="pl-10 h-10 border-gray-200 focus:border-orange-500 focus:ring-orange-500/20"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <div className="relative group">
                        <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 group-hover:text-orange-500 transition-colors" />
                        <Input
                          id="signup-password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a password"
                          className="pl-10 pr-10 h-10 border-gray-200 focus:border-orange-500 focus:ring-orange-500/20"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 hover:bg-transparent text-gray-400 hover:text-gray-600"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <div className="relative group">
                        <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 group-hover:text-orange-500 transition-colors" />
                        <Input
                          id="confirm-password"
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm password"
                          className="pl-10 pr-10 h-10 border-gray-200 focus:border-orange-500 focus:ring-orange-500/20"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          required
                        />
                         <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 hover:bg-transparent text-gray-400 hover:text-gray-600"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <Button type="submit" className="w-full h-11 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg shadow-lg hover:shadow-orange-500/30 transition-all" disabled={isLoading}>
                      {isLoading ? "Create Account" : "Sign Up"}
                    </Button>
                  </form>
                </TabsContent>
              )}
            </Tabs>
        </div>
      </Card>
      
      {/* Footer / Copyright */}
      <div className="absolute bottom-4 text-center w-full z-20">
        <p className="text-gray-800/80 text-xs font-medium shadow-sm">© 2024 Baked Bliss. All rights reserved.</p>
      </div>
    </div>
  );
};