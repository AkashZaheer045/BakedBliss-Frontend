import { motion } from "framer-motion";
import { BakeryCategory } from "@/data/bakeryProducts";

interface CategoryDetailsProps {
  category: BakeryCategory;
  heroImage: string;
}

export const CategoryDetails = ({ category, heroImage }: CategoryDetailsProps) => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image with parallax */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div 
              className="absolute inset-0 rounded-3xl blur-3xl opacity-30 -z-10"
              style={{ backgroundColor: category.themeColor }}
            />
            <img 
              src={heroImage}
              alt={category.detailsSection.imageAlt}
              className="w-full h-auto rounded-3xl shadow-2xl"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 
              className="text-4xl md:text-5xl font-bold"
              style={{ color: category.themeColor }}
            >
              {category.detailsSection.title}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {category.detailsSection.description}
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              {category.stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-4 rounded-xl"
                  style={{ backgroundColor: `${category.themeColor}15` }}
                >
                  <p 
                    className="text-2xl md:text-3xl font-bold"
                    style={{ color: category.themeColor }}
                  >
                    {stat.val}
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Freshness Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 text-center max-w-3xl mx-auto"
        >
          <h3 
            className="text-3xl md:text-4xl font-bold mb-6"
            style={{ color: category.themeColor }}
          >
            {category.freshnessSection.title}
          </h3>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {category.freshnessSection.description}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CategoryDetails;
