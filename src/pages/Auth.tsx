import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface AuthProps {
  onAuthSuccess: () => void;
  onBack: () => void;
}

export const Auth = ({ onAuthSuccess, onBack }: AuthProps) => {
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
    console.log('=== handleSubmit called ===', { type, formData });
    setIsLoading(true);

    try {
      console.log('Starting', type, 'request...');
      if (type === 'login') {
        // Login using AuthContext
        await login(formData.email, formData.password);

        toast({
          title: "Login successful!",
          description: "Welcome back to Baked Bliss",
        });
      } else {
        // Signup - validate passwords match
        if (formData.password !== formData.confirmPassword) {
          toast({
            title: "Error",
            description: "Passwords do not match",
            variant: "destructive"
          });
          setIsLoading(false);
          return;
        }

        // Signup using AuthContext
        await signup({
          fullName: formData.name,
          email: formData.email,
          phoneNumber: formData.phone,
          password: formData.password
        });

        toast({
          title: "Account created!",
          description: "Welcome to Baked Bliss",
        });
      }

      // Success - call the onAuthSuccess callback
      setTimeout(() => {
        onAuthSuccess();
      }, 500);

    } catch (error: any) {
      console.error('Authentication error:', error);
      console.log('Error response:', error.response);
      console.log('Error response data:', error.response?.data);

      // Extract error message from various response formats
      let errorMessage = 'Authentication failed. Please try again.';
      
      const responseData = error.response?.data;
      
      if (responseData) {
        console.log('Response data found:', responseData);
        
        // Priority 1: Direct message from backend (matches your JSON)
        if (responseData.message) {
           errorMessage = responseData.message;
        }
        // Priority 2: Validation errors array
        else if (responseData.errors && Array.isArray(responseData.errors) && responseData.errors.length > 0) {
          errorMessage = responseData.errors[0].message || responseData.errors[0].msg;
        }
        // Priority 3: Fallback to stringified data if structured error missing
        else if (typeof responseData === 'string') {
            errorMessage = responseData;
        }
      } 
      // Fallback to error message if no response data
      else if (error.message && error.message !== 'Request failed with status code 412') {
        errorMessage = error.message;
      }

      console.log('Final error message to toast:', errorMessage);

      toast({
        title: "Registration Failed",
        description: errorMessage,
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 flex flex-col items-center justify-center p-4 safe-bottom">
      <div className="w-full max-w-md space-y-4 sm:space-y-6">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={onBack}
          className="self-start text-sm"
          size="sm"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Back
        </Button>

        {/* Logo */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Baked Bliss
          </h1>
          <p className="text-sm text-muted-foreground">Welcome back to your bakery</p>
        </div>

        {/* Auth Tabs */}
        <Card className="border-primary/10">
          <Tabs defaultValue="login" className="w-full">
            <CardHeader className="pb-2 sm:pb-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login" className="text-sm">Login</TabsTrigger>
                <TabsTrigger value="signup" className="text-sm">Sign Up</TabsTrigger>
              </TabsList>
            </CardHeader>

            <CardContent className="pt-2">
              {/* Login Tab */}
              <TabsContent value="login" className="space-y-4">
                <div className="text-center mb-4">
                  <CardTitle>Welcome Back</CardTitle>
                  <CardDescription>Sign in to your account</CardDescription>
                </div>

                <form onSubmit={(e) => handleSubmit(e, 'login')} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="login-email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        className="pl-9"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="login-password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="pl-9 pr-9"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Signing In..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>

              {/* Signup Tab */}
              <TabsContent value="signup" className="space-y-4">
                <div className="text-center mb-4">
                  <CardTitle>Create Account</CardTitle>
                  <CardDescription>Join our bakery community</CardDescription>
                </div>

                <form onSubmit={(e) => handleSubmit(e, 'signup')} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-name"
                        name="name"
                        placeholder="Enter your full name"
                        className="pl-9"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        className="pl-9"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-phone">Phone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-phone"
                        name="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        className="pl-9"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        className="pl-9 pr-9"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="confirm-password"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        className="pl-9 pr-9"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Button>
                </form>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};