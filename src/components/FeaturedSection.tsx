import { useState, useEffect } from "react";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";
import { productService } from "@/services";

// Fallback images for products without thumbnails
import chocolateCroissant from "@/assets/chocolate-croissant.png";
import sourdoughBread from "@/assets/sourdough-bread.png";
import strawberryCheesecake from "@/assets/strawberry-cheesecake.png";
import rainbowMacarons from "@/assets/rainbow-macarons.png";

const fallbackImages = [chocolateCroissant, sourdoughBread, strawberryCheesecake, rainbowMacarons];

interface FeaturedProduct {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  description: string;
  isNew?: boolean;
}

interface FeaturedSectionProps {
  onProductClick?: (id: string) => void;
  onAddToCart?: (id: string) => void;
  onViewAll?: () => void;
}

export const FeaturedSection = ({ onProductClick, onAddToCart, onViewAll }: FeaturedSectionProps) => {
  const [featuredProducts, setFeaturedProducts] = useState<FeaturedProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await productService.listProducts({ limit: 4 });
        
        if (response.status === 'success' && response.data) {
          const products = response.data.map((p: any, index: number) => ({
            id: p.id.toString(),
            name: p.title,
            image: p.thumbnail || fallbackImages[index % fallbackImages.length],
            price: p.sale_price || p.price,
            originalPrice: p.sale_price ? p.price : undefined,
            rating: p.rating || 4.5,
            reviewCount: p.rating_count || Math.floor(Math.random() * 200) + 50,
            description: p.description || p.tagline || "Freshly baked with love",
            isNew: index === 0
          }));
          setFeaturedProducts(products);
        }
      } catch (error) {
        console.error('Failed to fetch featured products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : featuredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No featured products available</p>
          </div>
        ) : (
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
        )}
      </div>
    </section>
  );
};