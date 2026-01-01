import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Plus, Heart } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  description: string;
  isNew?: boolean;
  isFavorite?: boolean;
  onAddToCart?: (id: string) => void;
  onToggleFavorite?: (id: string) => void;
  onClick?: (id: string) => void;
}

export const ProductCard = ({ 
  id, 
  name, 
  image, 
  price, 
  originalPrice, 
  rating, 
  reviewCount, 
  description, 
  isNew,
  isFavorite,
  onAddToCart,
  onToggleFavorite,
  onClick 
}: ProductCardProps) => {
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <Card className="group hover:shadow-glow transition-all duration-300 transform hover:scale-[1.02] cursor-pointer border-primary/10">
      <div className="relative" onClick={() => onClick?.(id)}>
        <div className="aspect-[4/3] overflow-hidden rounded-t-lg">
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => { e.currentTarget.src = "/placeholder.svg"; }}
          />
        </div>
        <div className="absolute top-2 left-2 flex flex-col gap-2">
            {isNew && (
              <Badge className="bg-warning text-warning-foreground">
                New
              </Badge>
            )}
            {discount > 0 && (
              <Badge className="bg-destructive text-destructive-foreground">
                -{discount}%
              </Badge>
            )}
        </div>
        
        <Button
            variant="secondary"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/80 hover:bg-white transition-colors"
            onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite?.(id);
            }}
        >
            <Heart className={`w-4 h-4 ${isFavorite ? "fill-destructive text-destructive" : "text-muted-foreground"}`} />
        </Button>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-base mb-2 line-clamp-1 group-hover:text-primary transition-colors">
          {name}
        </h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {description}
        </p>
        
        <div className="flex items-center gap-1 mb-3">
          <Star className="w-4 h-4 fill-warning text-warning" />
          <span className="text-sm font-medium">{rating}</span>
          <span className="text-xs text-muted-foreground">({reviewCount})</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg text-primary">${price}</span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${originalPrice}
              </span>
            )}
          </div>
          <Button 
            size="sm" 
            variant="cart"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart?.(id);
            }}
            className="h-8 w-8 p-0"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};