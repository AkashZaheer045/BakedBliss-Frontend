import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 border-t border-orange-200/50 safe-bottom">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand & Description */}
          <div className="space-y-3 sm:space-y-4 col-span-2 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-base sm:text-lg">B</span>
              </div>
              <div>
                <h3 className="font-bold text-lg sm:text-xl text-primary">Baked Bliss</h3>
                <p className="text-[10px] sm:text-xs text-muted-foreground">Fresh from oven</p>
              </div>
            </div>
            <p className="text-muted-foreground text-xs sm:text-sm">
              Crafting the finest baked goods with love and tradition since 2010.
            </p>
            <div className="flex gap-2">
              <Button size="icon" variant="ghost" className="h-8 w-8">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="ghost" className="h-8 w-8">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="ghost" className="h-8 w-8">
                <Twitter className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="font-semibold text-foreground text-sm sm:text-base">Quick Links</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li><a href="/menu" className="text-muted-foreground hover:text-primary transition-colors">Menu</a></li>
              <li><a href="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</a></li>
              <li><a href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="font-semibold text-foreground text-sm sm:text-base">Contact</h4>
            <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-primary shrink-0" />
                <span className="text-muted-foreground">123 Baker St</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-primary shrink-0" />
                <span className="text-muted-foreground">+1 (555) BAKE</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-primary shrink-0" />
                <span className="text-muted-foreground">6AM - 10PM</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-3 sm:space-y-4 col-span-2 sm:col-span-1">
            <h4 className="font-semibold text-foreground text-sm sm:text-base">Stay Updated</h4>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Get special offers and baking tips!
            </p>
            <div className="flex gap-2 sm:flex-col sm:gap-2">
              <Input 
                placeholder="Your email" 
                className="bg-muted/50 border-primary/20 text-sm flex-1"
              />
              <Button className="shrink-0 sm:w-full" size="sm">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-6 sm:my-8 bg-primary/10" />
        
        <div className="flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm text-muted-foreground gap-3">
          <p>&copy; 2024 Baked Bliss. All rights reserved.</p>
          <div className="flex gap-3 sm:gap-4">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};