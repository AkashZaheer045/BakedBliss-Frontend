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
      <div className="container mx-auto px-4 py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary">
                <Award className="w-5 h-5" />
                <span className="text-sm font-medium">Award-winning bakery since 2010</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                Fresh Baked 
                <span className="text-primary block">Happiness</span>
                Every Day
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg">
                Indulge in our handcrafted pastries, artisan breads, and delectable desserts. 
                Made with love, baked to perfection, delivered fresh to your doorstep.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Fast Delivery</p>
                  <p className="text-xs text-muted-foreground">30 min or less</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Star className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm">5-Star Rated</p>
                  <p className="text-xs text-muted-foreground">10,000+ reviews</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="xl" 
                variant="hero"
                onClick={onOrderNow}
                className="group"
              >
                Order Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="xl" 
                variant="outline"
                onClick={onExploreMenu}
              >
                Explore Menu
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-glow">
              <img 
                src={heroBakery} 
                alt="Fresh baked goods"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -top-4 -left-4 bg-background rounded-xl p-4 shadow-glow border border-primary/10">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Fresh batch ready!</span>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -right-4 bg-background rounded-xl p-4 shadow-glow border border-primary/10">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">50+</p>
                <p className="text-xs text-muted-foreground">Daily varieties</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};