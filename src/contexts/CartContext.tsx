import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { cartService } from '@/services';
import { useAuth } from './AuthContext';
import { useToast } from '@/hooks/use-toast';

interface CartItem {
  id: string;
  product_id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  description?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  itemCount: number;
  loading: boolean;
  refreshCart: () => Promise<void>;
  addToCart: (productId: number, quantity?: number) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  updateQuantity: (productId: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchCart = async () => {
    if (!user) {
      setCartItems([]);
      return;
    }

    try {
      setLoading(true);
      const response = await cartService.getCart();
      if ((response.status === 'success' || response.success) && response.cart) {
        const mappedItems = (response.cart.items || []).map((item: any) => ({
          id: item.productId?.toString(),
          product_id: item.productId,
          name: item.title || item.name || "Product",
          image: item.thumbnail || "/placeholder.svg",
          price: parseFloat(item.price) || 0,
          quantity: item.quantity || 1,
          description: item.description || ""
        }));
        setCartItems(mappedItems);
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const addToCart = async (productId: number, quantity: number = 1) => {
    if (!user) {
        toast({ title: "Please Login", description: "You need to log in to add items to cart." });
        return;
    }
    try {
        await cartService.addToCart({ productId, quantity });
        toast({ 
          title: "Added to cart!", 
          description: "Item added successfully.",
          className: "bg-green-50 border-green-200 text-green-900"
        });
        await fetchCart();
    } catch (error: any) {
        console.error("Add to cart error", error);
        toast({ title: "Error", description: error.response?.data?.message || "Failed to add item.", variant: "destructive" });
        throw error;
    }
  };

  const removeFromCart = async (productId: number) => {
      try {
          await cartService.removeFromCart(productId);
          await fetchCart();
          toast({ title: "Removed", description: "Item removed from cart." });
      } catch (error: any) {
          console.error("Remove error", error);
          toast({ title: "Error", description: "Failed to remove item", variant: "destructive" });
      }
  };

  const updateQuantity = async (productId: number, quantity: number) => {
      if (quantity <= 0) {
          await removeFromCart(productId);
          return;
      }
      try {
          await cartService.updateCartItem({ productId, quantity });
          await fetchCart(); 
      } catch (error: any) {
           toast({ title: "Error", description: error.response?.data?.message || "Failed to update.", variant: "destructive" });
      }
  };

  const clearCart = async () => {
      setCartItems([]);
      try {
        await cartService.clearCart();
      } catch (e) {}
  };

  return (
    <CartContext.Provider value={{
        cartItems,
        itemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
        loading,
        refreshCart: fetchCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) throw new Error('useCart must be used within CartProvider');
  return context;
};
