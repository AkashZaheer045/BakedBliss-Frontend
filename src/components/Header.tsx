import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Search, ShoppingCart, User, Heart, Menu, LogIn, UserPlus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface HeaderProps {
  cartItemCount?: number;
  onSearch?: (query: string) => void;
  onCartClick?: () => void;
  onProfileClick?: () => void;
}

export const Header = ({ cartItemCount = 0, onSearch, onCartClick, onProfileClick }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/menu?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const handleProfileAction = () => {
    if (isAuthenticated) {
      onProfileClick?.();
      navigate("/profile");
    } else {
      navigate("/auth");
    }
  };

  const handleFavoritesClick = () => {
    if (isAuthenticated) {
      navigate("/profile?tab=favorites");
    } else {
      navigate("/auth");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-primary/10">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between gap-2 md:gap-4">
          {/* Mobile Menu Trigger */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="shrink-0">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] p-0">
              <div className="flex flex-col h-full">
                {/* Mobile Menu Header */}
                <div className="flex items-center gap-2 p-4 border-b">
                  <img src="/favicon.png" alt="Logo" className="w-8 h-8 rounded-lg object-contain" />
                  <h2 className="font-bold text-lg text-primary">Baked Bliss</h2>
                </div>
                
                {/* Mobile Navigation Links */}
                <nav className="flex flex-col p-4 gap-2">
                  <Button 
                    variant="ghost" 
                    onClick={() => handleNavigation("/")}
                    className="justify-start font-medium"
                  >
                    Home
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={() => handleNavigation("/menu")}
                    className="justify-start font-medium"
                  >
                    Menu
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={() => handleNavigation("/about")}
                    className="justify-start font-medium"
                  >
                    About
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={() => handleNavigation("/contact")}
                    className="justify-start font-medium"
                  >
                    Contact
                  </Button>
                  
                  {isAuthenticated ? (
                    <>
                      <Button 
                        variant="ghost" 
                        onClick={() => handleNavigation("/profile")}
                        className="justify-start font-medium"
                      >
                        My Profile
                      </Button>
                      <Button 
                        variant="ghost" 
                        onClick={() => handleNavigation("/cart")}
                        className="justify-start font-medium"
                      >
                        Cart {cartItemCount > 0 && `(${cartItemCount})`}
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button 
                        variant="ghost" 
                        onClick={() => handleNavigation("/auth")}
                        className="justify-start font-medium gap-2"
                      >
                        <LogIn className="w-4 h-4" /> Sign In
                      </Button>
                      <Button 
                        variant="ghost" 
                        onClick={() => handleNavigation("/auth")}
                        className="justify-start font-medium gap-2"
                      >
                        <UserPlus className="w-4 h-4" /> Create Account
                      </Button>
                    </>
                  )}
                </nav>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer shrink-0" 
            onClick={() => navigate("/")}
          >
            <img src="/favicon.png" alt="Logo" className="w-8 h-8 md:w-10 md:h-10 rounded-lg object-contain" />
            <div className="hidden sm:block">
              <h1 className="font-bold text-lg md:text-xl text-primary">Baked Bliss</h1>
              <p className="text-xs text-muted-foreground hidden md:block">Fresh from oven</p>
            </div>
          </div>

          {/* Navigation Links - Desktop */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-6">
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
          <div className="flex-1 max-w-xs md:max-w-md relative hidden sm:block">
            <Input
              type="text"
              placeholder="Search pastries, cakes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="pl-10 bg-muted/50 border-primary/20 focus:border-primary text-sm"
            />
            <Search 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 cursor-pointer" 
              onClick={handleSearch}
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 md:gap-2">
            {/* Mobile Search Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="sm:hidden"
              onClick={() => navigate("/menu")}
            >
              <Search className="w-5 h-5" />
            </Button>

            <Button 
              variant="ghost" 
              size="icon" 
              className="relative hidden sm:flex"
              onClick={handleFavoritesClick}
            >
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
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary">
                  {cartItemCount}
                </Badge>
              )}
            </Button>
            
            {/* Profile/Auth Button */}
            {isAuthenticated ? (
              <Button 
                variant="ghost" 
                size="icon"
                className="hidden sm:flex"
                onClick={handleProfileAction}
              >
                <User className="w-5 h-5" />
              </Button>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="hidden sm:flex"
                  >
                    <User className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => navigate("/auth")} className="gap-2 cursor-pointer">
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/auth")} className="gap-2 cursor-pointer">
                    <UserPlus className="w-4 h-4" />
                    Create Account
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};