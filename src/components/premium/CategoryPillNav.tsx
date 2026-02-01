import { motion } from "framer-motion";
import { BakeryCategory } from "@/data/bakeryProducts";

interface CategoryPillNavProps {
  categories: BakeryCategory[];
  currentIndex: number;
  onSelect: (index: number) => void;
}

export const CategoryPillNav = ({ categories, currentIndex, onSelect }: CategoryPillNavProps) => {
  return (
    <motion.div 
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <div className="bg-white/90 backdrop-blur-xl rounded-full px-2 py-2 shadow-2xl border border-black/5">
        <div className="flex items-center gap-1">
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              onClick={() => onSelect(index)}
              className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                index === currentIndex 
                  ? "text-white" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Active background */}
              {index === currentIndex && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: category.themeColor }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 whitespace-nowrap">
                {category.name.split(" ")[0]}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryPillNav;
