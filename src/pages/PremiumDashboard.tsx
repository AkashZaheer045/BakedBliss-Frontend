import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { bakeryCategories } from "@/data/bakeryProducts";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { LoginPromptModal } from "@/components/LoginPromptModal";

// Premium hero images with high quality
const categoryHeroImages: Record<string, string> = {
  breads: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200&q=90",
  burger: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200&q=90",
  cookies: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=1200&q=90",
  cupcakes: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=1200&q=90",
  desserts: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=1200&q=90",
  pasta: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=1200&q=90",
  pastries: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=1200&q=90",
  pizza: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&q=90",
  snacks: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=1200&q=90",
};

const PremiumDashboard = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const currentCategory = bakeryCategories[currentIndex];
  const navigate = useNavigate();
  const { addToCart, itemCount } = useCart();

  // Auto-advance with longer duration for cinematic feel
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bakeryCategories.length);
    }, 6000); // 6 seconds for cinematic pacing
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const handleAddToCart = async () => {
    const mockProductId = currentCategory.id.charCodeAt(0);
    const result = await addToCart(mockProductId);
    if (result.requiresAuth) {
      setShowLoginModal(true);
    }
  };

  // Cinematic animation variants - slow, elegant, confident
  const containerVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const imageVariants = {
    initial: { 
      opacity: 0, 
      scale: 1.05,
      y: 30
    },
    animate: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { 
        duration: 1.4, 
        ease: [0.16, 1, 0.3, 1],
        delay: 0.2
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.98,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const textVariants = {
    initial: { opacity: 0, y: 40 },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.3 + i * 0.12,
        ease: [0.16, 1, 0.3, 1]
      }
    }),
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      {/* Header */}
      <Header cartItemCount={itemCount} />

      {/* Main Showcase Area */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        
        {/* Warm Gradient Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50/80 to-rose-50" />
          {/* Soft Light Glow */}
          <motion.div 
            key={`glow-${currentIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 2 }}
            className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full blur-[150px]"
            style={{ backgroundColor: currentCategory.themeColor + "25" }}
          />
        </div>

        {/* Ambient Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-gray-300/30"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Content Container */}
        <div className="relative z-10 container mx-auto px-8 lg:px-16 py-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCategory.id}
              variants={containerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24"
            >
              
              {/* Left Side - Product Image with Cinematic Treatment */}
              <motion.div 
                className="flex-1 flex justify-center items-center"
                variants={imageVariants}
              >
                <div className="relative">
                  {/* Subtle Reflection */}
                  <div 
                    className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[80%] h-32 rounded-full blur-3xl opacity-20"
                    style={{ backgroundColor: currentCategory.themeColor }}
                  />
                  
                  {/* Main Product Image */}
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="relative w-[320px] h-[320px] md:w-[420px] md:h-[420px] lg:w-[480px] lg:h-[480px] rounded-3xl overflow-hidden">
                      {/* Soft Shadow */}
                      <div 
                        className="absolute inset-0 -z-10 translate-y-6 blur-3xl opacity-30 rounded-3xl"
                        style={{ backgroundColor: currentCategory.themeColor }}
                      />
                      
                      <img 
                        src={categoryHeroImages[currentCategory.id]}
                        alt={currentCategory.name}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Subtle Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/10" />
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Right Side - Typography & CTA */}
              <div className="flex-1 max-w-xl">
                {/* Category Number */}
                <motion.p 
                  custom={0}
                  variants={textVariants}
                  className="text-sm font-medium tracking-[0.3em] text-gray-400 uppercase mb-4"
                >
                  {String(currentIndex + 1).padStart(2, '0')} / {String(bakeryCategories.length).padStart(2, '0')}
                </motion.p>

                {/* Product Name */}
                <motion.h1 
                  custom={1}
                  variants={textVariants}
                  className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 tracking-tight leading-[1.1] mb-4"
                >
                  {currentCategory.name}
                </motion.h1>

                {/* Tagline */}
                <motion.p 
                  custom={2}
                  variants={textVariants}
                  className="text-xl md:text-2xl font-light mb-6"
                  style={{ color: currentCategory.themeColor }}
                >
                  {currentCategory.subName}
                </motion.p>

                {/* Description */}
                <motion.p 
                  custom={3}
                  variants={textVariants}
                  className="text-base text-gray-500 leading-relaxed mb-8 font-light"
                >
                  {currentCategory.detailsSection.description.slice(0, 160)}...
                </motion.p>

                {/* Price */}
                <motion.div 
                  custom={4}
                  variants={textVariants}
                  className="mb-8"
                >
                  <span className="text-sm text-gray-400 tracking-wide uppercase">Starting at</span>
                  <p className="text-3xl font-light text-gray-900 mt-1">
                    {currentCategory.buyNowSection.price}
                  </p>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div 
                  custom={5}
                  variants={textVariants}
                  className="flex gap-4"
                >
                  <Button 
                    size="lg"
                    className="px-8 py-6 text-base font-light tracking-wide text-white rounded-full transition-all duration-500 hover:scale-105"
                    style={{ backgroundColor: currentCategory.themeColor }}
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                  
                  <Button 
                    size="lg"
                    variant="ghost"
                    className="px-8 py-6 text-base font-light tracking-wide text-gray-700 rounded-full hover:bg-gray-100 transition-all duration-500"
                    onClick={() => navigate("/menu")}
                  >
                    Explore Menu
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3">
          {bakeryCategories.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setIsAutoPlaying(false);
                setCurrentIndex(i);
              }}
              className="group relative"
            >
              <div className={`w-12 h-[2px] rounded-full transition-all duration-500 ${
                i === currentIndex ? "bg-gray-900" : "bg-gray-300"
              }`}>
                {i === currentIndex && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: currentCategory.themeColor }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 6, ease: "linear" }}
                  />
                )}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Products Grid - Clean & Minimal */}
      <section className="py-24 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
        <div className="container mx-auto px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="text-3xl font-light text-center text-gray-900 mb-16 tracking-tight"
          >
            Explore the Collection
          </motion.h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {bakeryCategories.slice(0, 8).map((cat, i) => (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: i * 0.1,
                  ease: [0.16, 1, 0.3, 1] 
                }}
                viewport={{ once: true }}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentIndex(i);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="group text-left"
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 mb-4">
                  <img 
                    src={categoryHeroImages[cat.id]}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <p className="text-base font-light text-gray-900 mb-1">{cat.name}</p>
                <p className="text-sm text-gray-400">{cat.buyNowSection.price}</p>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* Login Modal */}
      <LoginPromptModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={() => {
          setShowLoginModal(false);
          navigate("/auth");
        }}
        onSignUp={() => {
          setShowLoginModal(false);
          navigate("/auth");
        }}
        actionType="cart"
      />
    </div>
  );
};

export default PremiumDashboard;
