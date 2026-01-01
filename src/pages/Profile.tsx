import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  Loader2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
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
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();

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
              id: order.id?.toString(),
              order_id: order.order_id || `ORD-${order.id}`,
              date: new Date(order.created_at).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              }),
              status: order.status || 'Pending',
              total: parseFloat(order.total_amount) || 0,
              items: order.cart_items?.map((item: any) =>
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
        cartItemCount={0}
        onSearch={() => { }}
        onCartClick={() => window.location.href = '/cart'}
        onProfileClick={() => { }}
      />

      <main className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="mb-8">
          <Card className="border-primary/10">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={user?.profile_picture} alt={userInfo.name} />
                  <AvatarFallback className="text-xl bg-primary/10 text-primary">
                    {userInfo.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h1 className="text-3xl font-bold text-foreground mb-2">{userInfo.name || 'User'}</h1>
                      <Badge className="mb-3 bg-warning text-warning-foreground">
                        {userInfo.membershipLevel}
                      </Badge>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Member since {userInfo.joinDate}
                        </div>
                        <div className="flex items-center gap-1">
                          <Package className="w-4 h-4" />
                          {stats.totalOrders} orders
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          {stats.favoriteItems} favorites
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => setEditMode(!editMode)}
                      className="flex items-center gap-2"
                    >
                      <Edit className="w-4 h-4" />
                      {editMode ? 'Cancel' : 'Edit Profile'}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <Card className="border-primary/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Full Name</label>
                    {editMode ? (
                      <Input
                        value={userInfo.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="border-primary/20"
                      />
                    ) : (
                      <p className="text-muted-foreground">{userInfo.name || 'Not set'}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Email</label>
                    <p className="text-muted-foreground">{userInfo.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Phone</label>
                    {editMode ? (
                      <Input
                        value={userInfo.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="border-primary/20"
                      />
                    ) : (
                      <p className="text-muted-foreground">{userInfo.phone || 'Not set'}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Address</label>
                    {editMode ? (
                      <Input
                        value={userInfo.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className="border-primary/20"
                      />
                    ) : (
                      <p className="text-muted-foreground">{userInfo.address || 'Not set'}</p>
                    )}
                  </div>
                  {editMode && (
                    <Button onClick={handleSave} variant="hero" className="w-full" disabled={saving}>
                      {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                      Save Changes
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Account Statistics */}
              <Card className="border-primary/10">
                <CardHeader>
                  <CardTitle>Account Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-primary/5 rounded-lg">
                      <div className="text-2xl font-bold text-primary">{stats.totalOrders}</div>
                      <div className="text-sm text-muted-foreground">Total Orders</div>
                    </div>
                    <div className="text-center p-4 bg-success/5 rounded-lg">
                      <div className="text-2xl font-bold text-success">${stats.totalSpent.toFixed(2)}</div>
                      <div className="text-sm text-muted-foreground">Total Spent</div>
                    </div>
                    <div className="text-center p-4 bg-warning/5 rounded-lg">
                      <div className="text-2xl font-bold text-warning">{stats.favoriteItems}</div>
                      <div className="text-sm text-muted-foreground">Favorites</div>
                    </div>
                    <div className="text-center p-4 bg-primary/5 rounded-lg">
                      <div className="text-2xl font-bold text-primary">{stats.avgRating}</div>
                      <div className="text-sm text-muted-foreground">Avg Rating</div>
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
                      <div key={order.id} className="border border-primary/10 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <span className="font-medium">{order.order_id}</span>
                            <Badge variant="secondary">{order.status}</Badge>
                          </div>
                          <span className="font-bold text-primary">${order.total.toFixed(2)}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{order.date}</p>
                        <p className="text-sm">{order.items.join(', ') || 'No items'}</p>
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
                        onAddToCart={() => {}}
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
      </main>

      <Footer />
    </div>
  );
};

export default Profile;