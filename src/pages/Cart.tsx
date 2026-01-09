import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { cartService, orderService } from "@/services";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Cart = () => {
  const { cartItems, updateQuantity: contextUpdateQuantity, removeFromCart: contextRemoveItem, clearCart, loading } = useCart();
  const [updating, setUpdating] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [address, setAddress] = useState({ street: "", city: "", state: "", zipCode: "", country: "" });
  const [isProcessing, setIsProcessing] = useState(false);

  // Input validation handlers
  const handleStateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow alphabets and spaces
    const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
    setAddress({ ...address, state: value });
  };

  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers
    const value = e.target.value.replace(/[^0-9]/g, '');
    setAddress({ ...address, zipCode: value });
  };

  // Cart is managed globally via Context

  const updateQuantity = async (id: string, newQuantity: number) => {
    if (!user) return;
    const item = cartItems.find(i => i.id === id);
    if (!item) return;

    setUpdating(id);
    await contextUpdateQuantity(item.product_id, newQuantity);
    setUpdating(null);
  };

  const removeItem = async (id: string) => {
    if (!user) return;
    const item = cartItems.find(i => i.id === id);
    if (!item) return;

    setUpdating(id);
    await contextRemoveItem(item.product_id);
    setUpdating(null);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08; // 8% tax
  const deliveryFee = subtotal > 50 ? 0 : 4.99;
  const total = subtotal + tax + deliveryFee;

  const handleCheckout = async () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to proceed with checkout",
        variant: "destructive"
      });
      return;
    }

    if (cartItems.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Please add items to your cart first",
        variant: "destructive"
      });
      return;
    }

    setIsCheckoutOpen(true);
  };

  const confirmOrder = async () => {
    if (!address.street || !address.city || !address.zipCode) {
        toast({ title: "Invaild Address", description: "Please fill in all address fields", variant: "destructive" });
        return;
    }
    
    setIsProcessing(true);
    try {
      const orderData = {
        user_id: user?.user_id || "",
        cart_items: cartItems.map(item => ({
          product_id: item.product_id,
          quantity: item.quantity,
          price: item.price
        })),
        delivery_address: address,
        total_amount: total
      };

      const response = await orderService.createOrder(orderData);
      
      if (response.status === 'success' || response.success) {
        // Clear cart after successful order
        // Clear cart after successful order
        await clearCart();
        setIsCheckoutOpen(false);
        
        toast({
          title: "Order Placed!",
          description: `Your order #${response.orderId || response.order?.order_id || ''} has been placed successfully.`,
        });
      }
    } catch (error: any) {
      toast({
        title: "Checkout Failed",
        description: error.response?.data?.message || "Failed to place order. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onSearch={() => { }}
        onCartClick={() => { }}
        onProfileClick={() => navigate('/profile')}
      />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Shopping Cart</h1>
          <p className="text-muted-foreground">Review your selected items</p>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">Your cart is empty</h3>
            <p className="text-muted-foreground mb-6">Add some delicious items to get started!</p>
            <Button variant="hero" size="lg" onClick={() => navigate('/menu')}>
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id} className="border-primary/10">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                        <p className="text-muted-foreground text-sm mb-3">{item.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-primary text-lg">${item.price}</span>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center border border-primary/20 rounded-lg">
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus className="w-4 h-4" />
                              </Button>
                              <span className="px-3 py-1 text-sm font-medium">{item.quantity}</span>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 text-destructive hover:text-destructive"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="border-primary/10 sticky top-8">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">Order Summary</h3>

                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Delivery</span>
                      <div className="text-right">
                        {deliveryFee === 0 ? (
                          <div>
                            <span className="text-success font-medium">FREE</span>
                            <Badge variant="secondary" className="ml-1 text-xs">$50+</Badge>
                          </div>
                        ) : (
                          <span>${deliveryFee.toFixed(2)}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="flex justify-between text-lg font-semibold mb-6">
                    <span>Total</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
                  </div>

                  <Button
                    variant="hero"
                    size="lg"
                    className="w-full group"
                    onClick={handleCheckout}
                  >
                    Proceed to Checkout
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>

                  {subtotal < 50 && (
                    <p className="text-xs text-muted-foreground mt-3 text-center">
                      Add ${(50 - subtotal).toFixed(2)} more for free delivery!
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>

      <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Confirm Delivery Address</DialogTitle>
                <DialogDescription>Please provide your delivery details.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
                <div className="space-y-2">
                    <Label>Street Address</Label>
                    <Input value={address.street} onChange={(e) => setAddress({...address, street: e.target.value})} placeholder="123 Main St" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                            <Label>City</Label>
                            <Input value={address.city} onChange={(e) => setAddress({...address, city: e.target.value})} placeholder="New York" />
                        </div>
                        <div className="space-y-2">
                             <Label>State</Label>
                             <Input 
                               value={address.state} 
                               onChange={handleStateChange} 
                               placeholder="NY"
                               pattern="[A-Za-z\s]+"
                               title="State must contain only letters"
                             />
                        </div>
                        <div className="space-y-2">
                             <Label>Zip Code</Label>
                             <Input 
                               value={address.zipCode} 
                               onChange={handleZipCodeChange} 
                               placeholder="10001"
                               pattern="[0-9]+"
                               inputMode="numeric"
                               maxLength={10}
                               title="Zip code must contain only numbers"
                             />
                        </div>
                    </div>
                <div className="space-y-2">
                    <Label>Country</Label>
                    <Input value={address.country} onChange={(e) => setAddress({...address, country: e.target.value})} placeholder="United States" />
                </div>
            </div>
            <DialogFooter>
                <Button variant="outline" onClick={() => setIsCheckoutOpen(false)}>Cancel</Button>
                <Button variant="hero" onClick={confirmOrder} disabled={isProcessing}>
                    {isProcessing ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                    Confirm Order
                </Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>
      <Footer />
    </div>
  );
};

export default Cart;