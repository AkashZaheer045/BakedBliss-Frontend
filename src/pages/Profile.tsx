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
  Bell
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

// Mock user data
const userData = {
  name: "Sarah Johnson",
  email: "sarah.johnson@email.com",
  phone: "+1 (555) 987-6543",
  address: "456 Sweet Lane, Sugar City, SC 12346",
  joinDate: "March 2023",
  totalOrders: 47,
  favoriteItems: 12,
  membershipLevel: "Gold Member"
};

const recentOrders = [
  {
    id: "ORD-2024-001",
    date: "Dec 18, 2024",
    status: "Delivered",
    total: 24.97,
    items: ["Chocolate Croissant x2", "Cappuccino x1"]
  },
  {
    id: "ORD-2024-002", 
    date: "Dec 15, 2024",
    status: "Delivered",
    total: 18.50,
    items: ["Strawberry Cheesecake", "Earl Grey Tea"]
  },
  {
    id: "ORD-2024-003",
    date: "Dec 12, 2024", 
    status: "Delivered",
    total: 32.40,
    items: ["Birthday Cake", "Macarons Box"]
  }
];

const favoriteItems = [
  { name: "Chocolate Croissant", price: 4.99, orders: 15 },
  { name: "Strawberry Cheesecake", price: 6.99, orders: 8 },
  { name: "Artisan Sourdough", price: 8.99, orders: 6 },
  { name: "Rainbow Macarons", price: 12.99, orders: 4 }
];

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const [userInfo, setUserInfo] = useState(userData);
  const { toast } = useToast();

  const handleSave = () => {
    setEditMode(false);
    toast({
      title: "Profile updated!",
      description: "Your profile information has been saved successfully.",
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setUserInfo(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        cartItemCount={3}
        onSearch={() => {}}
        onCartClick={() => toast({ title: "Cart", description: "Opening shopping cart..." })}
        onProfileClick={() => {}}
      />

      <main className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="mb-8">
          <Card className="border-primary/10">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="/placeholder.svg" alt={userInfo.name} />
                  <AvatarFallback className="text-xl bg-primary/10 text-primary">
                    {userInfo.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h1 className="text-3xl font-bold text-foreground mb-2">{userInfo.name}</h1>
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
                          {userInfo.totalOrders} orders
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          {userInfo.favoriteItems} favorites
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
                      <p className="text-muted-foreground">{userInfo.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Email</label>
                    {editMode ? (
                      <Input 
                        value={userInfo.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="border-primary/20"
                      />
                    ) : (
                      <p className="text-muted-foreground">{userInfo.email}</p>
                    )}
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
                      <p className="text-muted-foreground">{userInfo.phone}</p>
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
                      <p className="text-muted-foreground">{userInfo.address}</p>
                    )}
                  </div>
                  {editMode && (
                    <Button onClick={handleSave} variant="hero" className="w-full">
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
                      <div className="text-2xl font-bold text-primary">{userInfo.totalOrders}</div>
                      <div className="text-sm text-muted-foreground">Total Orders</div>
                    </div>
                    <div className="text-center p-4 bg-success/5 rounded-lg">
                      <div className="text-2xl font-bold text-success">$1,247</div>
                      <div className="text-sm text-muted-foreground">Total Spent</div>
                    </div>
                    <div className="text-center p-4 bg-warning/5 rounded-lg">
                      <div className="text-2xl font-bold text-warning">{userInfo.favoriteItems}</div>
                      <div className="text-sm text-muted-foreground">Favorites</div>
                    </div>
                    <div className="text-center p-4 bg-primary/5 rounded-lg">
                      <div className="text-2xl font-bold text-primary">4.9</div>
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
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="border border-primary/10 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span className="font-medium">{order.id}</span>
                          <Badge variant="secondary">{order.status}</Badge>
                        </div>
                        <span className="font-bold text-primary">${order.total}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{order.date}</p>
                      <p className="text-sm">{order.items.join(', ')}</p>
                    </div>
                  ))}
                </div>
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
                <div className="grid md:grid-cols-2 gap-4">
                  {favoriteItems.map((item, index) => (
                    <div key={index} className="border border-primary/10 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">Ordered {item.orders} times</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary">${item.price}</p>
                          <Button size="sm" variant="outline">Reorder</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <div className="grid md:grid-cols-2 gap-6">
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

              <Card className="border-primary/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-primary" />
                    Payment Methods
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border border-primary/10 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <span>•••• •••• •••• 4532</span>
                      <Badge>Default</Badge>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    Add Payment Method
                  </Button>
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