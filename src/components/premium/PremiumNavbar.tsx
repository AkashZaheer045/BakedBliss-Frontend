import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { Badge } from "@/components/ui/badge";

interface PremiumNavbarProps {
  themeColor?: string;
}

export const PremiumNavbar = ({ themeColor = "#FF7B2C" }: PremiumNavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { itemCount } = useCart();
  const { scrollY } = useScroll();
  
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 1]);

  return (
    <>
      <motion.header 
        className="fixed top-0 left-0 right-0 z-50 px-4 lg:px-8 py-4"
      >
        <motion.div
          className="max-w-7xl mx-auto flex items-center justify-between rounded-2xl px-6 py-3 border border-white/10"
          style={{
            backgroundColor: `rgba(20, 20, 30, ${0.8 + bgOpacity.get() * 0.2})`,
            backdropFilter: "blur(20px)",
          }}
        >
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <img 
              src="/favicon.png" 
              alt="Baked Bliss" 
              className="w-10 h-10 rounded-xl"
            />
            <span 
              className="text-xl font-bold bg-gradient-to-r bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, #fff, ${themeColor})`
              }}
            >
              Baked Bliss
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <NavLink onClick={() => navigate("/")}>Home</NavLink>
            <NavLink onClick={() => navigate("/menu")}>Menu</NavLink>
            <NavLink onClick={() => navigate("/about")}>About</NavLink>
            <NavLink onClick={() => navigate("/contact")}>Contact</NavLink>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Cart */}
            <Button 
              variant="ghost" 
              size="icon"
              className="relative text-white hover:bg-white/10"
              onClick={() => navigate("/cart")}
            >
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <Badge 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs text-white"
                  style={{ backgroundColor: themeColor }}
                >
                  {itemCount}
                </Badge>
              )}
            </Button>

            {/* Order Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:block"
            >
              <Button 
                className="text-white font-semibold px-6 relative overflow-hidden"
                style={{ backgroundColor: themeColor }}
                onClick={() => navigate("/menu")}
              >
                <span className="relative z-10">Order Now</span>
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
              </Button>
            </motion.div>

            {/* Mobile Menu */}
            <Button 
              variant="ghost" 
              size="icon"
              className="md:hidden text-white hover:bg-white/10"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </motion.div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <motion.div 
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Menu Content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="absolute right-0 top-0 bottom-0 w-[280px] bg-[#14141e] border-l border-white/10 p-6"
            >
              <div className="flex flex-col gap-4 mt-16">
                <MobileNavLink onClick={() => { navigate("/"); setIsMenuOpen(false); }}>
                  Home
                </MobileNavLink>
                <MobileNavLink onClick={() => { navigate("/menu"); setIsMenuOpen(false); }}>
                  Menu
                </MobileNavLink>
                <MobileNavLink onClick={() => { navigate("/about"); setIsMenuOpen(false); }}>
                  About
                </MobileNavLink>
                <MobileNavLink onClick={() => { navigate("/contact"); setIsMenuOpen(false); }}>
                  Contact
                </MobileNavLink>
                <MobileNavLink onClick={() => { navigate("/cart"); setIsMenuOpen(false); }}>
                  Cart {itemCount > 0 && `(${itemCount})`}
                </MobileNavLink>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const NavLink = ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => (
  <motion.button
    onClick={onClick}
    className="text-sm font-medium text-white/70 hover:text-white transition-colors"
    whileHover={{ y: -2 }}
  >
    {children}
  </motion.button>
);

const MobileNavLink = ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => (
  <button
    onClick={onClick}
    className="w-full text-left px-4 py-3 text-lg font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
  >
    {children}
  </button>
);

// Add AnimatePresence import
import { AnimatePresence } from "framer-motion";

export default PremiumNavbar;
