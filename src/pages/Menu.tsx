import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Filter, Search, SlidersHorizontal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock products data
const mockProducts = [
  {
    id: "1",
    name: "Classic Chocolate Croissant",
    image: "/placeholder.svg",
    price: 4.99,
    originalPrice: 6.99,
    rating: 4.8,
    reviewCount: 124,
    description: "Buttery, flaky pastry filled with rich Belgian chocolate",
    category: "pastries",
    isNew: true
  },
  {
    id: "2",
    name: "Artisan Sourdough Bread",
    image: "/placeholder.svg", 
    price: 8.99,
    rating: 4.9,
    reviewCount: 89,
    description: "Traditional sourdough with a perfect crust and soft interior",
    category: "breads"
  },
  {
    id: "3",
    name: "Strawberry Cheesecake Slice",
    image: "/placeholder.svg",
    price: 6.99,
    originalPrice: 8.99,
    rating: 4.7,
    reviewCount: 156,
    description: "Creamy New York style cheesecake with fresh strawberries",
    category: "desserts"
  },
  {
    id: "4",
    name: "Rainbow Macarons Box",
    image: "/placeholder.svg",
    price: 12.99,
    rating: 4.9,
    reviewCount: 203,
    description: "Assorted flavors of delicate French macarons",
    category: "desserts"
  },
  {
    id: "5",
    name: "Blueberry Muffin",
    image: "/placeholder.svg",
    price: 3.99,
    rating: 4.6,
    reviewCount: 78,
    description: "Fluffy muffin packed with fresh blueberries",
    category: "cupcakes"
  },
  {
    id: "6",
    name: "Pain au Chocolat",
    image: "/placeholder.svg",
    price: 4.49,
    rating: 4.8,
    reviewCount: 92,
    description: "Traditional French pastry with dark chocolate",
    category: "pastries"
  }
];

const categories = [
  { id: "all", label: "All Items" },
  { id: "pastries", label: "Pastries" },
  { id: "breads", label: "Breads" },
  { id: "desserts", label: "Desserts" },
  { id: "cupcakes", label: "Cupcakes" }
];

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItemCount, setCartItemCount] = useState(3);
  const { toast } = useToast();

  const filteredProducts = mockProducts.filter(product => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (productId: string) => {
    setCartItemCount(prev => prev + 1);
    toast({
      title: "Added to cart!",
      description: "Item has been added to your cart successfully.",
    });
  };

  const handleProductClick = (productId: string) => {
    toast({
      title: "Product Details",
      description: `Opening product ${productId} details`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        cartItemCount={cartItemCount}
        onSearch={setSearchQuery}
        onCartClick={() => toast({ title: "Cart", description: "Opening shopping cart..." })}
        onProfileClick={() => toast({ title: "Profile", description: "Opening user profile..." })}
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
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4" />
            Filters
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
              Showing {filteredProducts.length} products
            </span>
            {searchQuery && (
              <Badge variant="secondary">
                Search: "{searchQuery}"
              </Badge>
            )}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                onClick={handleProductClick}
                onAddToCart={handleAddToCart}
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