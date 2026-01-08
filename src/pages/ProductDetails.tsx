import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, ShoppingBag, ArrowLeft, Minus, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { productService, userService } from "@/services";
import { Product } from "@/services/productService";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const { addToCart, itemCount: cartItemCount } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const response = await productService.getProductById(id);
        if (response.status === 'success' && response.data) {
          setProduct(response.data);
        }
        
        // Check if favorite logic
        if (user) {
             const favResponse = await userService.getFavorites(user.user_id);
             if (favResponse.status === 'success' && favResponse.data) {
                 const isFav = favResponse.data.some((f: any) => 
                     (f.product_id?.toString() === id || f.id?.toString() === id)
                 );
                 setIsFavorite(isFav);
             }
        }

      } catch (error) {
        console.error("Failed to fetch product", error);
        toast({
          title: "Error",
          description: "Product not found",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, user]);

  const handleAddToCart = async () => {
    if (!product) return;
    await addToCart(product.id, quantity);
  };

  const handleToggleFavorite = async () => {
    if (!user || !product) { 
        toast({ title: "Login Required", description: "Please login to manage favorites" });
        return; 
    }

    try {
        if (isFavorite) {
            await userService.removeFavorite(user.user_id, product.id);
            setIsFavorite(false);
            toast({ title: "Removed from Favorites" });
        } else {
            await userService.addFavorite(user.user_id, product.id);
            setIsFavorite(true);
            toast({ title: "Added to Favorites" });
        }
    } catch (error) {
        toast({ title: "Error", description: "Failed to update favorites", variant: "destructive" });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header cartItemCount={cartItemCount} onSearch={()=>{}} onCartClick={()=>navigate('/cart')} onProfileClick={()=>navigate('/profile')} />
        <div className="flex-1 flex items-center justify-center">
             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header cartItemCount={cartItemCount} onSearch={()=>{}} onCartClick={()=>navigate('/cart')} onProfileClick={()=>navigate('/profile')} />
            <div className="flex-1 flex flex-col items-center justify-center p-8">
                <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
                <Button onClick={() => navigate('/menu')}>Back to Menu</Button>
            </div>
            <Footer />
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header 
        cartItemCount={cartItemCount} 
        onSearch={()=>{}} 
        onCartClick={()=>navigate('/cart')} 
        onProfileClick={()=>navigate('/profile')} 
      />

      <main className="flex-1 container mx-auto px-4 py-8">
        <Button 
            variant="ghost" 
            className="mb-6 pl-0 hover:pl-2 transition-all" 
            onClick={() => navigate(-1)}
        >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
        </Button>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Section */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted/20 border border-primary/10">
                <img 
                    src={product.thumbnail || product.images?.[0] || "/placeholder.svg"} 
                    alt={product.title}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.src = "/placeholder.svg"; }}
                />
                {product.sale_price && (
                    <Badge className="absolute top-4 right-4 bg-destructive text-destructive-foreground text-lg px-3 py-1">
                        Sale
                    </Badge>
                )}
            </div>

            {/* Details Section */}
            <div className="space-y-6">
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className="text-xs uppercase tracking-wider">
                            {product.category}
                        </Badge>
                        <div className="flex items-center gap-1 text-warning">
                            <Star className="w-5 h-5 fill-current" />
                            <span className="font-bold">{product.rating}</span>
                            <span className="text-muted-foreground text-sm">({product.rating_count || 0} reviews)</span>
                        </div>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{product.title}</h1>
                    <div className="flex items-end gap-3 mb-6">
                        <span className="text-4xl font-bold text-primary">
                            ${product.sale_price || product.price}
                        </span>
                        {product.sale_price && (
                            <span className="text-xl text-muted-foreground line-through mb-1">
                                ${product.price}
                            </span>
                        )}
                    </div>
                </div>

                <div className="prose prose-sm text-muted-foreground">
                    <p>{product.description}</p>
                </div>
                
                {product.ingredients && (
                     <div className="space-y-2">
                         <h3 className="font-semibold text-foreground">Ingredients</h3>
                         <div className="flex flex-wrap gap-2">
                             {Array.isArray(product.ingredients) ? product.ingredients.map((ing: any, i) => (
                                 <Badge key={i} variant="outline">{ing}</Badge>
                             )) : <span className="text-sm">{product.ingredients}</span>}
                         </div>
                     </div>
                )}

                <div className="pt-6 border-t border-border space-y-4">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center border border-input rounded-md">
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="h-10 w-10"
                            >
                                <Minus className="w-4 h-4" />
                            </Button>
                            <span className="w-12 text-center font-medium">{quantity}</span>
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => setQuantity(quantity + 1)}
                                className="h-10 w-10"
                            >
                                <Plus className="w-4 h-4" />
                            </Button>
                        </div>
                        <span className="text-sm text-muted-foreground">
                            {product.stock > 0 ? `${product.stock} items available` : 'Out of Stock'}
                        </span>
                    </div>

                    <div className="flex gap-3">
                        <Button 
                            className="flex-1 h-12 text-lg" 
                            variant="hero"
                            onClick={handleAddToCart}
                            disabled={product.stock <= 0}
                        >
                            <ShoppingBag className="w-5 h-5 mr-2" />
                            Add to Cart
                        </Button>
                        <Button 
                            variant="outline" 
                            className={`h-12 w-12 p-0 transition-colors ${isFavorite ? 'bg-red-50 hover:bg-red-100 border-red-200' : 'bg-secondary/50 hover:bg-secondary border-transparent'}`}
                            onClick={handleToggleFavorite}
                        >
                            <Heart className={`w-6 h-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-foreground'}`} />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetails;
