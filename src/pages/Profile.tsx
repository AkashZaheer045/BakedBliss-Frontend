import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Star,
  Package,
  Heart,
  Edit,
  Settings,
  CreditCard,
  Bell,
  Loader2,
  LogOut
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { orderService, authService, userService } from "@/services";
import { ProductCard } from "@/components/ProductCard";

interface Order {
  id: string;
  order_id: string;
  date: string;
  status: string;
  total: number;
  items: string[];
}

interface UserStats {
  totalOrders: number;
  totalSpent: number;
  favoriteItems: number;
  avgRating: number;
}

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<UserStats>({
    totalOrders: 0,
    totalSpent: 0,
    favoriteItems: 0,
    avgRating: 0
  });
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    joinDate: "",
    membershipLevel: "Member"
  });
  const [favorites, setFavorites] = useState<any[]>([]);
  const { toast } = useToast();
  const { user, updateUser, logout } = useAuth();
  const { addToCart, itemCount } = useCart();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'overview';

  // Handler for adding favorites to cart
  const handleFavoriteAddToCart = async (productId: string) => {
    await addToCart(parseInt(productId));
  };

  // Fetch user data and orders on mount
  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        // Set user info from auth context
        setUserInfo({
          name: user.full_name || "",
          email: user.email || "",
          phone: user.phone_number || "",
          address: "",
          joinDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
          membershipLevel: user.role === 'admin' ? 'Admin' : 'Member'
        });

        // Fetch user orders
        try {
          const ordersResponse = await orderService.getUserOrders(user.user_id);
          if (ordersResponse.status === 'success' || ordersResponse.success) {
            const rawOrders = ordersResponse.orders || ordersResponse.data || [];
            const mappedOrders: Order[] = rawOrders.map((order: any) => ({
              id: order.orderId?.toString() || order.id?.toString(), // Use orderId as primary ID if available
              order_id: order.orderId || `ORD-${order.id}`,
              date: new Date(order.createdAt || order.created_at).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              }),
              status: order.status || 'Pending',
              total: parseFloat(order.totalAmount || order.total_amount) || 0,
              items: (order.cartItems || order.cart_items)?.map((item: any) =>
                `${item.title || 'Item'} x${item.quantity}`
              ) || []
            }));
            setOrders(mappedOrders);

            // Calculate stats from orders
            const totalSpent = mappedOrders.reduce((sum, order) => sum + order.total, 0);
            setStats({
              totalOrders: mappedOrders.length,
              totalSpent: totalSpent,
              favoriteItems: 0,
              avgRating: 4.5 
            });

            // Fetch favorites
            try {
               const favResponse = await userService.getFavorites(user.user_id);
               if ((favResponse.status === 'success' || favResponse.success) && favResponse.data) {
                  const favItems = favResponse.data.map((f: any) => ({
                      id: f.product?.id?.toString() || f.id?.toString(),
                      name: f.product?.title || f.title,
                      image: f.product?.thumbnail || f.thumbnail || "/placeholder.svg",
                      price: f.product?.sale_price || f.product?.price || f.price || 0,
                      description: f.product?.description || f.description || "",
                      rating: f.product?.rating || 4.5,
                      category: f.product?.category || "Treat"
                  }));
                  setFavorites(favItems);
                  
                  // Update stats with favorites count
                  setStats(prev => ({ ...prev, favoriteItems: favItems.length }));
               }
            } catch (favError) {
               console.error("Failed to fetch favorites", favError);
            }
          }
        } catch (orderError) {
          console.error("Failed to fetch orders:", orderError);
        }

      } catch (error: any) {
        console.error("Failed to fetch profile data:", error);
        toast({
          title: "Error",
          description: "Failed to load profile data",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;

    setSaving(true);
    try {
      // Update user profile via API
      const response = await authService.updateProfile(user.user_id, {
        full_name: userInfo.name,
        phone_number: userInfo.phone
      });

      if (response.status === 'success' || response.success) {
        // Update auth context
        updateUser({
          ...user,
          full_name: userInfo.name,
          phone_number: userInfo.phone
        });

        setEditMode(false);
        toast({
          title: "Profile updated!",
          description: "Your profile information has been saved successfully.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update profile",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [orderToCancel, setOrderToCancel] = useState<string | null>(null);

  const confirmCancelOrder = async () => {
    if (!orderToCancel) return;
    const orderId = orderToCancel;
    
    // Close dialog
    setOrderToCancel(null);
    setCancellingId(orderId);

    try {
        const response = await orderService.cancelOrder(orderId);
        if(response.status === 'success') {
            toast({ title: "Order Cancelled", description: "Your order has been cancelled successfully." });
            setOrders(prev => prev.map(o => o.order_id === orderId ? { ...o, status: 'Cancelled' } : o));
        }
    } catch (error: any) {
        toast({ title: "Error", description: error.response?.data?.message || "Failed to cancel order", variant: "destructive" });
    } finally {
        setCancellingId(null);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setUserInfo(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        cartItemCount={itemCount}
        onSearch={() => { }}
        onCartClick={() => navigate('/cart')}
        onProfileClick={() => { }}
      />

      <main className="container mx-auto px-4 py-4 sm:py-8">
        {/* Profile Header */}
        <div className="mb-6 sm:mb-8">
          <Card className="border-primary/10">
            <CardContent className="p-4 sm:p-8">
              <div className="flex flex-col gap-4 sm:gap-6">
                {/* Avatar and Name Row */}
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16 sm:w-20 sm:h-20 shrink-0">
                    <AvatarImage src={user?.profile_picture} alt={userInfo.name} />
                    <AvatarFallback className="text-lg sm:text-xl bg-primary/10 text-primary">
                      {userInfo.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h1 className="text-xl sm:text-3xl font-bold text-foreground truncate">{userInfo.name || 'User'}</h1>
                    <Badge className="mt-1 bg-warning text-warning-foreground text-xs">
                      {userInfo.membershipLevel}
                    </Badge>
                  </div>
                </div>

                {/* Stats Row */}
                <div className="flex items-center justify-around sm:justify-start gap-4 sm:gap-8 py-3 border-y border-primary/10">
                  <div className="text-center sm:text-left">
                    <p className="text-xs text-muted-foreground">Member since</p>
                    <p className="text-sm font-medium">{userInfo.joinDate}</p>
                  </div>
                  <div className="text-center sm:text-left">
                    <p className="text-xs text-muted-foreground">Orders</p>
                    <p className="text-sm font-medium text-primary">{stats.totalOrders}</p>
                  </div>
                  <div className="text-center sm:text-left">
                    <p className="text-xs text-muted-foreground">Favorites</p>
                    <p className="text-sm font-medium text-primary">{stats.favoriteItems}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 sm:gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setEditMode(!editMode)}
                    className="flex-1 sm:flex-initial flex items-center justify-center gap-2 text-sm"
                    size="sm"
                  >
                    <Edit className="w-4 h-4" />
                    <span className="hidden sm:inline">{editMode ? 'Cancel' : 'Edit Profile'}</span>
                    <span className="sm:hidden">{editMode ? 'Cancel' : 'Edit'}</span>
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleLogout}
                    className="flex-1 sm:flex-initial flex items-center justify-center gap-2 text-sm"
                    size="sm"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Content */}
        <Tabs defaultValue={initialTab} className="space-y-4 sm:space-y-6">
          <TabsList className="flex w-full overflow-x-auto scrollbar-hide gap-1 p-1 bg-muted/50 rounded-lg">
            <TabsTrigger value="overview" className="flex-1 text-xs sm:text-sm">Overview</TabsTrigger>
            <TabsTrigger value="orders" className="flex-1 text-xs sm:text-sm">Orders</TabsTrigger>
            <TabsTrigger value="favorites" className="flex-1 text-xs sm:text-sm">Favorites</TabsTrigger>
            <TabsTrigger value="settings" className="flex-1 text-xs sm:text-sm">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4 sm:space-y-6">
            <div className="grid gap-4 sm:gap-6">
              {/* Personal Information */}
              <Card className="border-primary/10">
                <CardHeader className="pb-2 sm:pb-4">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <User className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4">
                  <div>
                    <label className="text-xs sm:text-sm font-medium mb-1 block">Full Name</label>
                    {editMode ? (
                      <Input
                        value={userInfo.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="border-primary/20 text-sm"
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground">{userInfo.name || 'Not set'}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-xs sm:text-sm font-medium mb-1 block">Email</label>
                    <p className="text-sm text-muted-foreground break-all">{userInfo.email}</p>
                  </div>
                  <div>
                    <label className="text-xs sm:text-sm font-medium mb-1 block">Phone</label>
                    {editMode ? (
                      <Input
                        value={userInfo.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="border-primary/20 text-sm"
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground">{userInfo.phone || 'Not set'}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-xs sm:text-sm font-medium mb-1 block">Address</label>
                    {editMode ? (
                      <Input
                        value={userInfo.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className="border-primary/20 text-sm"
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground">{userInfo.address || 'Not set'}</p>
                    )}
                  </div>
                  {editMode && (
                    <Button onClick={handleSave} variant="hero" className="w-auto" size="sm" disabled={saving}>
                      {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                      Save Changes
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Account Statistics */}
              <Card className="border-primary/10">
                <CardHeader className="pb-2 sm:pb-4">
                  <CardTitle className="text-base sm:text-lg">Account Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2 sm:gap-4">
                    <div className="text-center p-3 sm:p-4 bg-primary/5 rounded-lg">
                      <div className="text-xl sm:text-2xl font-bold text-primary">{stats.totalOrders}</div>
                      <div className="text-xs sm:text-sm text-muted-foreground">Orders</div>
                    </div>
                    <div className="text-center p-3 sm:p-4 bg-success/5 rounded-lg">
                      <div className="text-xl sm:text-2xl font-bold text-success">${stats.totalSpent.toFixed(0)}</div>
                      <div className="text-xs sm:text-sm text-muted-foreground">Spent</div>
                    </div>
                    <div className="text-center p-3 sm:p-4 bg-warning/5 rounded-lg">
                      <div className="text-xl sm:text-2xl font-bold text-warning">{stats.favoriteItems}</div>
                      <div className="text-xs sm:text-sm text-muted-foreground">Favorites</div>
                    </div>
                    <div className="text-center p-3 sm:p-4 bg-primary/5 rounded-lg">
                      <div className="text-xl sm:text-2xl font-bold text-primary">{stats.avgRating}</div>
                      <div className="text-xs sm:text-sm text-muted-foreground">Rating</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                {orders.length === 0 ? (
                  <div className="text-center py-8">
                    <Package className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground">No orders yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="border border-primary/10 rounded-lg p-3 sm:p-4">
                        {/* Header Row - Responsive */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-medium text-sm sm:text-base break-all">{order.order_id}</span>
                            <Badge variant="secondary" className="text-xs">{order.status}</Badge>
                          </div>
                          <span className="font-bold text-primary text-sm sm:text-base">${order.total.toFixed(2)}</span>
                        </div>
                        
                        <p className="text-xs sm:text-sm text-muted-foreground mb-2">{order.date}</p>
                        <p className="text-xs sm:text-sm mb-3 line-clamp-2">{order.items.join(', ') || 'No items'}</p>
                        
                        {/* Action Buttons - Responsive */}
                        <div className="flex flex-wrap gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-xs sm:text-sm"
                            onClick={() => navigate(`/order/${order.id}`)}
                          >
                            View Summary
                          </Button>
                          {order.status === 'Pending' && (
                            <Button 
                                variant="destructive" 
                                size="sm"
                                className="text-xs sm:text-sm"
                                onClick={() => setOrderToCancel(order.order_id)}
                                disabled={cancellingId === order.order_id}
                            >
                                {cancellingId === order.order_id && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                Cancel Order
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Favorites Tab */}
          <TabsContent value="favorites">
            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle>Your Favorite Items</CardTitle>
              </CardHeader>
              <CardContent>
                {favorites.length === 0 ? (
                  <div className="text-center py-8">
                    <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground">No favorites yet</p>
                    <p className="text-sm text-muted-foreground mt-1">Start adding items to your favorites!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favorites.map((product) => (
                      <ProductCard 
                        key={product.id}
                        {...product}
                        onClick={() => navigate(`/product/${product.id}`)}
                        onAddToCart={handleFavoriteAddToCart}
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <div className="grid md:grid-cols-1 gap-6">
              <Card className="border-primary/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5 text-primary" />
                    Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Order updates</span>
                    <Button variant="outline" size="sm">Enabled</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Special offers</span>
                    <Button variant="outline" size="sm">Enabled</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>New products</span>
                    <Button variant="outline" size="sm">Disabled</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
        
        <AlertDialog open={!!orderToCancel} onOpenChange={(open) => !open && setOrderToCancel(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently cancel your order.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmCancelOrder} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Yes, Cancel Order
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;