import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, ShoppingCart, User, Heart } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  cartItemCount?: number;
  onSearch?: (query: string) => void;
  onCartClick?: () => void;
  onProfileClick?: () => void;
}

export const Header = ({ cartItemCount = 0, onSearch, onCartClick, onProfileClick }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    onSearch?.(searchQuery);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-primary/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => navigate("/")}
          >
            <img src="/favicon.png" alt="Logo" className="w-10 h-10 rounded-lg object-contain" />
            <div>
              <h1 className="font-bold text-xl text-primary">Baked Bliss</h1>
              <p className="text-xs text-muted-foreground">Fresh from oven</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/menu")}
              className="font-medium"
            >
              Menu
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => navigate("/about")}
              className="font-medium"
            >
              About
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => navigate("/contact")}
              className="font-medium"
            >
              Contact
            </Button>
          </nav>

          {/* Search Bar */}
          <div className="flex-1 max-w-md relative">
            <Input
              type="text"
              placeholder="Search for pastries, cakes, bread..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="pl-10 bg-muted/50 border-primary/20 focus:border-primary"
            />
            <Search 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 cursor-pointer" 
              onClick={handleSearch}
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Heart className="w-5 h-5" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              onClick={() => {
                onCartClick?.();
                navigate("/cart");
              }}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary">
                  {cartItemCount}
                </Badge>
              )}
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => {
                onProfileClick?.();
                navigate("/profile");
              }}
            >
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};