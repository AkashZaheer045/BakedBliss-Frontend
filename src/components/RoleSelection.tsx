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
        'Write reviews',
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
        'Handle customers',
        'Control inventory'
      ],
      gradient: 'from-accent/20 to-primary/20'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Welcome to Baked Bliss
          </h1>
          <p className="text-lg text-muted-foreground">
            Choose your role to continue
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {roles.map((role) => {
            const Icon = role.icon;
            const isSelected = selectedRole === role.id;
            
            return (
              <Card 
                key={role.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                  isSelected 
                    ? 'ring-2 ring-primary shadow-xl scale-105' 
                    : 'hover:ring-1 hover:ring-primary/50'
                }`}
                onClick={() => setSelectedRole(role.id)}
              >
                <CardHeader className="text-center">
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${role.gradient} flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="w-10 h-10 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">{role.title}</CardTitle>
                  <CardDescription className="text-base">
                    {role.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {role.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
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
          <div className="text-center animate-fade-in">
            <Button 
              size="lg" 
              className="px-8"
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