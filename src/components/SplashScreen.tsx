import { useState, useEffect } from "react";
import { Coffee, Cake, Croissant, Cookie, ChefHat, Heart } from "lucide-react";

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [currentIcon, setCurrentIcon] = useState(0);
  
  const bakeryIcons = [
    { icon: Coffee, label: "Fresh Coffee" },
    { icon: Cake, label: "Delicious Cakes" },
    { icon: Croissant, label: "Buttery Croissants" },
    { icon: Cookie, label: "Sweet Cookies" },
    { icon: ChefHat, label: "Expert Bakers" },
    { icon: Heart, label: "Made with Love" }
  ];

  useEffect(() => {
    const iconInterval = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % bakeryIcons.length);
    }, 800);

    const splashTimer = setTimeout(() => {
      onComplete();
    }, 4000);

    return () => {
      clearInterval(iconInterval);
      clearTimeout(splashTimer);
    };
  }, [onComplete]);

  const CurrentIcon = bakeryIcons[currentIcon].icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-primary/10 flex flex-col items-center justify-center animate-fade-in">
      <div className="text-center space-y-8">
        {/* Logo Area */}
        <div className="relative">
          <div className="w-32 h-32 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
            <CurrentIcon className="w-16 h-16 text-white animate-scale-in" />
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-accent rounded-full animate-bounce" />
        </div>

        {/* Brand Name */}
        <div className="space-y-2">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Baked Bliss
          </h1>
          <p className="text-lg text-muted-foreground animate-fade-in">
            {bakeryIcons[currentIcon].label}
          </p>
        </div>

        {/* Progress Dots */}
        <div className="flex space-x-2 justify-center">
          {bakeryIcons.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIcon 
                  ? "bg-primary scale-125" 
                  : "bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>

        {/* Loading Text */}
        <p className="text-sm text-muted-foreground animate-pulse">
          Preparing your bakery experience...
        </p>
      </div>
    </div>
  );
};