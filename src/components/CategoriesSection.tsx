import { CategoryCard } from "@/components/CategoryCard";
import cupcakesCategory from "@/assets/cupcakes-category.jpg";
import breadCategory from "@/assets/bread-category.jpg";
import dessertsCategory from "@/assets/desserts-category.jpg";

const categories = [
  {
    id: "cupcakes",
    title: "Cupcakes & Muffins",
    image: cupcakesCategory,
    itemCount: 24
  },
  {
    id: "bread",
    title: "Artisan Breads",
    image: breadCategory,
    itemCount: 18
  },
  {
    id: "desserts",
    title: "Desserts & Sweets",
    image: dessertsCategory,
    itemCount: 32
  },
  {
    id: "pastries",
    title: "Fresh Pastries",
    image: "/placeholder.svg",
    itemCount: 16
  }
];

interface CategoriesSectionProps {
  onCategoryClick?: (categoryId: string) => void;
}

export const CategoriesSection = ({ onCategoryClick }: CategoriesSectionProps) => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Browse Categories</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our wide selection of freshly baked goods, from traditional breads to decadent desserts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              title={category.title}
              image={category.image}
              itemCount={category.itemCount}
              onClick={() => onCategoryClick?.(category.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};