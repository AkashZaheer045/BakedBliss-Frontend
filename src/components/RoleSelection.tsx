import { useState } from "react";
import { ShoppingBag, ChefHat, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface RoleSelectionProps {
  onRoleSelect: (role: 'customer' | 'admin') => void;
}

export const RoleSelection = ({ onRoleSelect }: RoleSelectionProps) => {
  const [hoveredRole, setHoveredRole] = useState<'customer' | 'admin' | null>(null);

  const roles = [
    {
      id: "customer" as const,
      title: "Customer",
      description: "Order fresh bakery items & track deliveries",
      icon: ShoppingBag,
      color: "text-orange-500",
      bg: "bg-orange-50",
      border: "hover:border-orange-200",
      shadow: "hover:shadow-orange-100",
      gradient: "from-orange-500 to-amber-500"
    },
    {
      id: "admin" as const,
      title: "Admin Portal",
      description: "Manage inventory, orders & analyze sales",
      icon: ChefHat,
      color: "text-pink-500",
      bg: "bg-pink-50",
      border: "hover:border-pink-200",
      shadow: "hover:shadow-pink-100",
      gradient: "from-pink-500 to-rose-500"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-orange-50/50">
      
      {/* Background Decor - Orangish Touch */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-200/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-200/40 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-12 animate-fade-in space-y-4 relative z-10">
         <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-xl shadow-orange-100 mb-6 rotate-3 border border-orange-50">
            <span className="text-3xl">🥐</span>
         </div>
         <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Welcome to <span className="bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent">Baked Bliss</span>
         </h1>
         <p className="text-lg text-gray-600 max-w-md mx-auto font-medium">
            Please select your role to continue to the application
         </p>
      </div>

      {/* Cards Container */}
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl w-full relative z-10">
        {roles.map((role) => {
          const Icon = role.icon;
          const isHovered = hoveredRole === role.id;

          return (
            <div 
                key={role.id}
                className="group relative"
                onMouseEnter={() => setHoveredRole(role.id)}
                onMouseLeave={() => setHoveredRole(null)}
            >
                {/* Glow Effect on Hover */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${role.gradient} rounded-3xl opacity-0 group-hover:opacity-30 blur-lg transition duration-500`} />
                
                <Card 
                  className={`relative h-full border-2 border-white/50 bg-white/60 backdrop-blur-sm transition-all duration-300 cursor-pointer overflow-hidden hover:border-orange-200 hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-500/10`}
                  onClick={() => onRoleSelect(role.id)}
                >
                  <CardContent className="p-8 flex flex-col h-full items-center text-center">
                    <div className={`w-20 h-20 rounded-2xl ${role.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-inner`}>
                      <Icon className={`w-10 h-10 ${role.color}`} />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{role.title}</h3>
                    <p className="text-gray-600 mb-8 leading-relaxed max-w-xs">{role.description}</p>
                    
                    <div className="mt-auto opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        <Button className={`rounded-full px-8 bg-gradient-to-r ${role.gradient} hover:opacity-90 shadow-lg shadow-orange-500/20 border-0`}>
                            Continue <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                  </CardContent>
                </Card>
            </div>
          );
        })}
      </div>

       <p className="mt-12 text-sm text-gray-500 font-medium tracking-wide relative z-10">
          © 2024 BAKED BLISS • EST. 2024
       </p>
    </div>
  );
};