import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BakeryCategory } from "@/data/bakeryProducts";

interface ProductScrollCanvasProps {
  category: BakeryCategory;
  heroImage: string;
}

export const ProductScrollCanvas = ({ category, heroImage }: ProductScrollCanvasProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Transform scroll progress to scale and opacity
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-5, 0, 5]);

  return (
    <div 
      ref={containerRef}
      className="h-[500vh] relative"
      style={{ background: category.gradient }}
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background glow effect */}
        <motion.div 
          className="absolute inset-0 opacity-50"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${category.themeColor}40, transparent 70%)`,
          }}
        />
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                backgroundColor: `${category.themeColor}60`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Product Image */}
        <motion.div
          className="relative z-10 w-[300px] h-[400px] md:w-[400px] md:h-[500px] lg:w-[500px] lg:h-[600px]"
          style={{ 
            scale, 
            opacity,
            rotateY,
            transformStyle: "preserve-3d",
          }}
        >
          <motion.img
            src={heroImage}
            alt={category.name}
            className="w-full h-full object-contain drop-shadow-2xl"
            onLoad={() => setImageLoaded(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: imageLoaded ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          />
          
          {/* Glow behind product */}
          <div 
            className="absolute inset-0 -z-10 blur-3xl opacity-40"
            style={{ backgroundColor: category.themeColor }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ProductScrollCanvas;
