import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Star, Award } from "lucide-react";
import heroBakery from "@/assets/hero-bakery.jpg";

interface HeroSectionProps {
  onOrderNow?: () => void;
  onExploreMenu?: () => void;
}

export const HeroSection = ({ onOrderNow, onExploreMenu }: HeroSectionProps) => {
  return (
    <section className="relative overflow-hidden bg-gradient-warm">
      <div className="container mx-auto px-4 py-8 sm:py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <div className="flex items-center justify-center lg:justify-start gap-2 text-primary">
                <Award className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-sm font-medium">Award-winning bakery since 2010</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                Fresh Baked 
                <span className="text-primary block">Happiness</span>
                Every Day
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0">
                Indulge in our handcrafted pastries, artisan breads, and delectable desserts. 
                Made with love, baked to perfection.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-md mx-auto lg:mx-0">
              <div className="flex items-center gap-2 sm:gap-3 bg-background/50 rounded-lg p-2 sm:p-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-xs sm:text-sm">Fast Delivery</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">30 min or less</p>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 bg-background/50 rounded-lg p-2 sm:p-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-xs sm:text-sm">5-Star Rated</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">10,000+ reviews</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                variant="hero"
                onClick={onOrderNow}
                className="group w-full sm:w-auto"
              >
                Order Now
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={onExploreMenu}
                className="w-full sm:w-auto"
              >
                Explore Menu
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative hidden sm:block">
            <div className="relative rounded-2xl overflow-hidden shadow-glow">
              <img 
                src={heroBakery} 
                alt="Fresh baked goods"
                className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            
            {/* Floating Cards - Hidden on mobile */}
            <div className="absolute -top-4 -left-4 bg-background rounded-xl p-3 sm:p-4 shadow-glow border border-primary/10 hidden md:block">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-xs sm:text-sm font-medium">Fresh batch ready!</span>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -right-4 bg-background rounded-xl p-3 sm:p-4 shadow-glow border border-primary/10 hidden md:block">
              <div className="text-center">
                <p className="text-xl sm:text-2xl font-bold text-primary">50+</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground">Daily varieties</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};