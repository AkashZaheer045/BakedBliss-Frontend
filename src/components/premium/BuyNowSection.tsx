import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Truck, RefreshCw, Check } from "lucide-react";
import { BakeryCategory } from "@/data/bakeryProducts";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { LoginPromptModal } from "@/components/LoginPromptModal";
import { useNavigate } from "react-router-dom";

interface BuyNowSectionProps {
  category: BakeryCategory;
}

export const BuyNowSection = ({ category }: BuyNowSectionProps) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { addToCart, isAuthenticated } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    // For demo, we'll use a mock product ID based on category
    const mockProductId = category.id.charCodeAt(0);
    const result = await addToCart(mockProductId);
    
    if (result.requiresAuth) {
      setShowLoginModal(true);
    }
  };

  return (
    <>
      <section 
        className="py-20 px-4 relative overflow-hidden"
        style={{ background: category.gradient }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 20% 80%, white 1px, transparent 1px),
                             radial-gradient(circle at 80% 20%, white 1px, transparent 1px)`,
            backgroundSize: "60px 60px"
          }} />
        </div>

        <div className="container mx-auto max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold mb-2"
                style={{ color: category.themeColor }}
              >
                {category.name}
              </motion.h2>
              <p className="text-muted-foreground">{category.subName}</p>
            </div>

            {/* Price */}
            <div className="text-center mb-8">
              <span className="text-5xl md:text-6xl font-bold text-foreground">
                {category.buyNowSection.price}
              </span>
              <span className="text-muted-foreground ml-2">
                {category.buyNowSection.unit}
              </span>
            </div>

            {/* Processing Params */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {category.buyNowSection.processingParams.map((param, index) => (
                <motion.div
                  key={param}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Badge 
                    variant="outline" 
                    className="py-2 px-4 text-sm font-medium border-2"
                    style={{ 
                      borderColor: category.themeColor,
                      color: category.themeColor 
                    }}
                  >
                    <Check className="w-4 h-4 mr-2" />
                    {param}
                  </Badge>
                </motion.div>
              ))}
            </div>

            {/* Add to Cart Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mb-8"
            >
              <Button 
                size="lg" 
                className="w-full py-6 text-lg font-bold text-white relative overflow-hidden group"
                style={{ backgroundColor: category.themeColor }}
                onClick={handleAddToCart}
              >
                {/* Glow effect */}
                <span 
                  className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity"
                  style={{ 
                    background: `radial-gradient(circle at center, white 0%, transparent 70%)`
                  }}
                />
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
            </motion.div>

            {/* Delivery & Return Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${category.themeColor}20` }}
                >
                  <Truck className="w-6 h-6" style={{ color: category.themeColor }} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Delivery Promise</h4>
                  <p className="text-sm text-muted-foreground">
                    {category.buyNowSection.deliveryPromise}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${category.themeColor}20` }}
                >
                  <RefreshCw className="w-6 h-6" style={{ color: category.themeColor }} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Return Policy</h4>
                  <p className="text-sm text-muted-foreground">
                    {category.buyNowSection.returnPolicy}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

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
    </>
  );
};

export default BuyNowSection;
