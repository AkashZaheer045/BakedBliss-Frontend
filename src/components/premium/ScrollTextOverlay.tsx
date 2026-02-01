import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { BakeryCategory } from "@/data/bakeryProducts";

interface ScrollTextOverlayProps {
  category: BakeryCategory;
}

export const ScrollTextOverlay = ({ category }: ScrollTextOverlayProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Text section opacity transforms based on scroll position
  const section1Opacity = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.25], [0, 1, 1, 0]);
  const section2Opacity = useTransform(scrollYProgress, [0.2, 0.3, 0.4, 0.45], [0, 1, 1, 0]);
  const section3Opacity = useTransform(scrollYProgress, [0.4, 0.5, 0.6, 0.65], [0, 1, 1, 0]);
  const section4Opacity = useTransform(scrollYProgress, [0.6, 0.7, 0.85, 0.9], [0, 1, 1, 0]);

  // Y transforms for parallax effect
  const section1Y = useTransform(scrollYProgress, [0, 0.25], [50, -50]);
  const section2Y = useTransform(scrollYProgress, [0.2, 0.45], [50, -50]);
  const section3Y = useTransform(scrollYProgress, [0.4, 0.65], [50, -50]);
  const section4Y = useTransform(scrollYProgress, [0.6, 0.9], [50, -50]);

  const sections = [
    { data: category.section1, opacity: section1Opacity, y: section1Y },
    { data: category.section2, opacity: section2Opacity, y: section2Y },
    { data: category.section3, opacity: section3Opacity, y: section3Y },
    { data: category.section4, opacity: section4Opacity, y: section4Y },
  ];

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 pointer-events-none h-[500vh]"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center">
        {sections.map((section, index) => (
          <motion.div
            key={index}
            className="absolute text-center px-4 max-w-4xl"
            style={{ opacity: section.opacity, y: section.y }}
          >
            <h2 
              className="text-4xl md:text-6xl lg:text-8xl font-bold mb-4 text-white drop-shadow-lg"
              style={{ textShadow: "2px 2px 20px rgba(0,0,0,0.3)" }}
            >
              {section.data.title}
            </h2>
            {section.data.subtitle && (
              <p 
                className="text-xl md:text-2xl lg:text-3xl text-white/90 font-light"
                style={{ textShadow: "1px 1px 10px rgba(0,0,0,0.2)" }}
              >
                {section.data.subtitle}
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ScrollTextOverlay;
