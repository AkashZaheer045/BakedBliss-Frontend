import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Filter, Search, SlidersHorizontal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { productService, cartService, userService } from "@/services";

const categories = [
  { id: "all", label: "All Items" },
  { id: "pastries", label: "Pastries" },
  { id: "breads", label: "Breads" },
  { id: "desserts", label: "Desserts" },
  { id: "cupcakes", label: "Cupcakes" },
  { id: "pizza", label: "Pizza" },
  { id: "burger", label: "Burger" },
  { id: "cookies", label: "Cookies" },
  { id: "snacks", label: "Snacks" },
  { id: "pasta", label: "Pasta" }
];

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [cartItemCount, setCartItemCount] = useState(0);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Load products on mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const response = await productService.listProducts({
          category: selectedCategory !== 'all' ? selectedCategory : undefined,
          search: searchQuery || undefined
        });

        if (response.status === 'success' && response.data) {
          // Map backend fields to frontend format
          const rawProducts = Array.isArray(response.data) ? response.data : (response.data.products || []);
          const mappedProducts = rawProducts.map((product: any) => ({
            id: product.id.toString(),
            name: product.title,
            image: product.thumbnail || "/placeholder.svg",
            price: product.sale_price || product.price,
            originalPrice: product.sale_price ? product.price : undefined,
            rating: product.rating || 0,
            reviewCount: product.rating_count || 0,
            description: product.description || "",
            category: product.category?.toLowerCase() || "other",
            isNew: product.created_at ? (new Date().getTime() - new Date(product.created_at).getTime()) < (7 * 24 * 60 * 60 * 1000) : false
          }));
          setProducts(mappedProducts);
        }
      } catch (error: any) {
        console.error('Failed to load products:', error);
        toast({
          title: "Error",
          description: "Failed to load products. Please try again.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [selectedCategory]);

  // Load favorites
  useEffect(() => {
    const loadFavorites = async () => {
        if (!user) return;
        try {
            const response = await userService.getFavorites(user.user_id);
            if (response.status === 'success' && response.data) {
                setFavorites(response.data);
            }
        } catch (e) { console.error("Failed to load favorites", e); }
    };
    loadFavorites();
  }, [user]);

  // Search products
  const handleSearch = async () => {
    if (!searchQuery) return;

    try {
      setLoading(true);
      const response = await productService.searchProducts(searchQuery);

      if (response.status === 'success' && response.data) {
        const rawProducts = Array.isArray(response.data) ? response.data : (response.data.products || []);
        const mappedProducts = rawProducts.map((product: any) => ({
          id: product.id.toString(),
          name: product.title,
          image: product.thumbnail || "/placeholder.svg",
          price: product.sale_price || product.price,
          originalPrice: product.sale_price ? product.price : undefined,
          rating: product.rating || 0,
          reviewCount: product.rating_count || 0,
          description: product.description || "",
          category: product.category?.toLowerCase() || "other"
        }));
        setProducts(mappedProducts);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        setProducts([]);
        // Suppress error, show empty state
      } else {
        toast({
          title: "Error",
          description: "Failed to search products",
          variant: "destructive"
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId: string) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to add items to cart",
        variant: "destructive"
      });
      return;
    }

    try {
      await cartService.addToCart({
        productId: parseInt(productId),
        quantity: 1
      });

      setCartItemCount(prev => prev + 1);
      toast({
        title: "Added to cart!",
        description: "Item has been added to your cart successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to add to cart",
        variant: "destructive"
      });
    }
  };

  const handleToggleFavorite = async (productId: string) => {
    if (!user) {
        toast({ title: "Login Required", description: "Please login to manage favorites" });
        return;
    }
    const isFav = favorites.some(f => (f.product?.id?.toString() === productId || f.product_id?.toString() === productId));
    
    try {
        if (isFav) {
            await userService.removeFavorite(user.user_id, productId);
            setFavorites(prev => prev.filter(f => (f.product?.id?.toString() !== productId && f.product_id?.toString() !== productId)));
            toast({ title: "Removed from Favorites" });
        } else {
            await userService.addFavorite(user.user_id, productId);
            // Refresh favorites to get full object or optimistically add
            const response = await userService.getFavorites(user.user_id);
            if (response.data) setFavorites(response.data);
            toast({ title: "Added to Favorites" });
        }
    } catch (error) {
        toast({ title: "Error", description: "Failed to update favorites", variant: "destructive" });
    }
  };

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  const filteredProducts = searchQuery
    ? products
    : products.filter(product =>
      selectedCategory === "all" || product.category === selectedCategory
    );

  return (
    <div className="min-h-screen bg-background">
      <Header
        cartItemCount={cartItemCount}
        onSearch={setSearchQuery}
        onCartClick={() => navigate('/cart')}
        onProfileClick={() => navigate('/profile')}
      />

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Our Menu</h1>
          <p className="text-muted-foreground">Discover our freshly baked delights</p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          </div>
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={handleSearch}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Search
          </Button>
        </div>

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
          <TabsList className="grid w-full grid-cols-5">
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">
              {loading ? "Loading..." : `Showing ${filteredProducts.length} products`}
            </span>
            {searchQuery && (
              <Badge variant="secondary">
                Search: "{searchQuery}"
              </Badge>
            )}
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading products...</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                onClick={handleProductClick}

                onAddToCart={handleAddToCart}
                isFavorite={favorites.some(f => (f.product?.id?.toString() === product.id || f.product_id?.toString() === product.id))}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-foreground mb-2">No products found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Menu;