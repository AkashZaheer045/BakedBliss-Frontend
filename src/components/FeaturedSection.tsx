import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// Mock data for featured products
const featuredProducts = [
  {
    id: "1",
    name: "Classic Chocolate Croissant",
    image: "/placeholder.svg",
    price: 4.99,
    originalPrice: 6.99,
    rating: 4.8,
    reviewCount: 124,
    description: "Buttery, flaky pastry filled with rich Belgian chocolate",
    isNew: true
  },
  {
    id: "2", 
    name: "Artisan Sourdough Bread",
    image: "/placeholder.svg",
    price: 8.99,
    rating: 4.9,
    reviewCount: 89,
    description: "Traditional sourdough with a perfect crust and soft interior"
  },
  {
    id: "3",
    name: "Strawberry Cheesecake Slice", 
    image: "/placeholder.svg",
    price: 6.99,
    originalPrice: 8.99,
    rating: 4.7,
    reviewCount: 156,
    description: "Creamy New York style cheesecake with fresh strawberries"
  },
  {
    id: "4",
    name: "Rainbow Macarons Box",
    image: "/placeholder.svg", 
    price: 12.99,
    rating: 4.9,
    reviewCount: 203,
    description: "Assorted flavors of delicate French macarons"
  }
];

interface FeaturedSectionProps {
  onProductClick?: (id: string) => void;
  onAddToCart?: (id: string) => void;
  onViewAll?: () => void;
}

export const FeaturedSection = ({ onProductClick, onAddToCart, onViewAll }: FeaturedSectionProps) => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Featured Delights</h2>
            <p className="text-muted-foreground">Our most popular handcrafted treats</p>
          </div>
          <Button variant="outline" onClick={onViewAll} className="group">
            View All
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              onClick={onProductClick}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
};