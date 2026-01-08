import { useState } from "react";
import { ShoppingBag, Settings, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface RoleSelectionProps {
  onRoleSelect: (role: 'customer' | 'admin') => void;
}

export const RoleSelection = ({ onRoleSelect }: RoleSelectionProps) => {
  const [selectedRole, setSelectedRole] = useState<'customer' | 'admin' | null>(null);

  const roles = [
    {
      id: 'customer' as const,
      title: 'Customer',
      description: 'Browse and order delicious bakery items',
      icon: ShoppingBag,
      features: [
        'Browse products',
        'Place orders',
        'Track deliveries',
        'Manage favorites'
      ],
      gradient: 'from-primary/20 to-accent/20'
    },
    {
      id: 'admin' as const,
      title: 'Admin',
      description: 'Manage your bakery business operations',
      icon: Settings,
      features: [
        'Manage products',
        'Process orders',
        'View analytics',
        'Control inventory'
      ],
      gradient: 'from-accent/20 to-primary/20'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background flex flex-col items-center justify-center p-4 safe-bottom">
      <div className="w-full max-w-lg sm:max-w-4xl space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="text-center space-y-2 sm:space-y-4">
          <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Welcome to Baked Bliss
          </h1>
          <p className="text-sm sm:text-lg text-muted-foreground">
            Choose your role to continue
          </p>
        </div>

        {/* Role Cards */}
        <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4 sm:gap-6">
          {roles.map((role) => {
            const Icon = role.icon;
            const isSelected = selectedRole === role.id;
            
            return (
              <Card 
                key={role.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  isSelected 
                    ? 'ring-2 ring-primary shadow-lg' 
                    : 'hover:ring-1 hover:ring-primary/50'
                }`}
                onClick={() => setSelectedRole(role.id)}
              >
                <CardHeader className="text-center pb-2 sm:pb-4">
                  <div className={`w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br ${role.gradient} flex items-center justify-center mx-auto mb-2 sm:mb-4`}>
                    <Icon className="w-7 h-7 sm:w-10 sm:h-10 text-primary" />
                  </div>
                  <CardTitle className="text-lg sm:text-2xl">{role.title}</CardTitle>
                  <CardDescription className="text-xs sm:text-base">
                    {role.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-1.5 sm:space-y-2">
                    {role.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-xs sm:text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 sm:mr-3 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Continue Button */}
        {selectedRole && (
          <div className="text-center animate-fade-in pt-2">
            <Button 
              size="lg" 
              className="w-full sm:w-auto px-8"
              onClick={() => onRoleSelect(selectedRole)}
            >
              Continue as {selectedRole === 'customer' ? 'Customer' : 'Admin'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};