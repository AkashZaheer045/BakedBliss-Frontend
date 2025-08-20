import { useState } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { CategoriesSection } from "@/components/CategoriesSection";
import { FeaturedSection } from "@/components/FeaturedSection";
import { SpecialOffersSection } from "@/components/SpecialOffersSection";
import { Footer } from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [cartItemCount, setCartItemCount] = useState(3);
  const { toast } = useToast();

  const handleAddToCart = (productId: string) => {
    setCartItemCount(prev => prev + 1);
    toast({
      title: "Added to cart!",
      description: "Item has been added to your cart successfully.",
    });
  };

  const handleSearch = (query: string) => {
    toast({
      title: "Search",
      description: `Searching for: ${query}`,
    });
  };

  const handleCategoryClick = (categoryId: string) => {
    toast({
      title: "Category Selected",
      description: `Browsing ${categoryId} category`,
    });
    // Navigate to menu with category filter
    window.location.href = "/menu";
  };

  const handleProductClick = (productId: string) => {
    toast({
      title: "Product Details",
      description: `Opening product ${productId}`,
    });
  };

  const handleOfferClick = (offerId: string) => {
    toast({
      title: "Special Offer",
      description: "Redirecting to offer details...",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        cartItemCount={cartItemCount}
        onSearch={handleSearch}
        onCartClick={() => toast({ title: "Cart", description: "Opening shopping cart..." })}
        onProfileClick={() => toast({ title: "Profile", description: "Opening user profile..." })}
      />
      
      <main>
        <HeroSection 
          onOrderNow={() => {
            toast({ title: "Order Now", description: "Starting quick order process..." });
            window.location.href = "/menu";
          }}
          onExploreMenu={() => {
            toast({ title: "Menu", description: "Browsing full menu..." });
            window.location.href = "/menu";
          }}
        />
        
        <CategoriesSection onCategoryClick={handleCategoryClick} />
        
        <FeaturedSection 
          onProductClick={handleProductClick}
          onAddToCart={handleAddToCart}
          onViewAll={() => {
            toast({ title: "All Products", description: "Viewing all featured products..." });
            window.location.href = "/menu";
          }}
        />
        
        <SpecialOffersSection onOfferClick={handleOfferClick} />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
