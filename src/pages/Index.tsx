import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { CategoriesSection } from "@/components/CategoriesSection";
import { FeaturedSection } from "@/components/FeaturedSection";
import { SpecialOffersSection } from "@/components/SpecialOffersSection";
import { Footer } from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";

const Index = () => {
  const { itemCount, addToCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAddToCart = async (productId: string) => {
    await addToCart(parseInt(productId));
  };

  const handleSearch = (query: string) => {
    toast({
      title: "Search",
      description: `Searching for: ${query}`,
    });
  };

  const handleCategoryClick = (categoryId: string) => {
    // Navigate to menu with category filter
    navigate(`/menu?category=${encodeURIComponent(categoryId)}`);
  };

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
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
        cartItemCount={itemCount}
        onSearch={handleSearch}
        onCartClick={() => {}}
        onProfileClick={() => navigate('/profile')}
      />
      
      <main>
        <HeroSection 
          onOrderNow={() => {
            toast({ title: "Order Now", description: "Starting quick order process..." });
            navigate("/menu");
          }}
          onExploreMenu={() => {
            toast({ title: "Menu", description: "Browsing full menu..." });
            navigate("/menu");
          }}
        />
        
        <CategoriesSection onCategoryClick={handleCategoryClick} />
        
        <FeaturedSection 
          onProductClick={handleProductClick}
          onAddToCart={handleAddToCart}
          onViewAll={() => {
            toast({ title: "All Products", description: "Viewing all featured products..." });
            navigate("/menu");
          }}
        />
        
        <SpecialOffersSection onOfferClick={handleOfferClick} />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
