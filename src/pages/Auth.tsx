import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowLeft, ChefHat } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";

interface AuthProps {
  onAuthSuccess: () => void;
  onBack: () => void;
  role?: 'customer' | 'admin' | null;
}

export const Auth = ({ onAuthSuccess, onBack, role }: AuthProps) => {
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
      <Card className="w-full max-w-md relative z-20 bg-white/80 backdrop-blur-xl shadow-2xl border-white/40 animate-fade-in my-8">
        <div className="p-6 sm:p-8">
            
            {/* Header Section */}
            <div className="text-center mb-8">
                <Button
                    variant="ghost"
                    onClick={onBack}
                    className="absolute left-4 top-4 text-gray-500 hover:text-gray-900 hover:bg-white/50"
                    size="icon"
                >
                    <ArrowLeft className="w-5 h-5" />
                </Button>

                <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-white rounded-full flex items-center justify-center mx-auto mb-4 text-orange-600 shadow-sm border border-orange-100">
                    <ChefHat className="w-8 h-8" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Baked Bliss</h1>
                <p className="text-sm text-gray-600 mt-2 font-medium">Your daily dose of fresh pastries</p>
            </div>

            {/* Tabs & Form */}
            <Tabs defaultValue="login" className="w-full">
              <TabsList className={`grid w-full mb-8 h-12 bg-gray-100/50 p-1 rounded-xl border border-gray-200/50 ${role === 'admin' ? 'grid-cols-1' : 'grid-cols-2'}`}>
                <TabsTrigger 
                    value="login" 
                    className="h-10 rounded-lg text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-orange-600 data-[state=active]:shadow-sm transition-all"
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