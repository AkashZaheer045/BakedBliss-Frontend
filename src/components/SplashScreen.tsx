import { useEffect, useState } from "react";
import { ChefHat } from "lucide-react";

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      onComplete();
    }, 1800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white overflow-hidden">
      {/* Warm Background Gradients - Baked Bliss Theme */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-orange-200 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-pink-200 rounded-full blur-[100px] animate-pulse delay-700" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Animated Icon Container */}
        <div className={`relative mb-8 transition-all duration-700 ease-out transform ${mounted ? 'scale-100 opacity-100 translate-y-0' : 'scale-50 opacity-0 translate-y-4'}`}>
            <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-pink-500 rounded-2xl rotate-3 shadow-xl flex items-center justify-center">
               <ChefHat className="w-12 h-12 text-white" />
            </div>
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-6 h-6 bg-yellow-300 rounded-full animate-bounce delay-100 opacity-80" />
            <div className="absolute -bottom-2 -left-3 w-4 h-4 bg-orange-300 rounded-full animate-bounce delay-300 opacity-80" />
        </div>

        {/* Text Reveal */}
        <div className="text-center">
          <h1 className={`text-4xl sm:text-5xl font-bold bg-gradient-to-r from-orange-500 to-pink-600 bg-clip-text text-transparent transition-all duration-700 delay-200 transform ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            Baked Bliss
          </h1>
          <p className={`mt-2 text-sm font-medium text-orange-900/60 tracking-widest uppercase transition-all duration-700 delay-300 transform ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            Freshly Baked for You
          </p>
        </div>
      </div>
    </div>
  );
};