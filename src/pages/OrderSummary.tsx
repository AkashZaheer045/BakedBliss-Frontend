import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Package,
  MapPin,
  Phone,
  Mail,
  Calendar,
  CreditCard,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  ArrowLeft,
  Loader2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";
import { orderService } from "@/services";

interface OrderItem {
  id: string;
  title: string;
  quantity: number;
  price: number;
  thumbnail?: string;
}

interface OrderDetails {
  orderId: string;
  status: string;
  createdAt: string;
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: string;
  shippingAddress: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  items: OrderItem[];
}

const OrderSummary = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { itemCount } = useCart();
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const response = await orderService.getOrderById(id);
        
        if (response.status === 'success' || response.success) {
          const orderData = response.order || response.data;
          
          setOrder({
            orderId: orderData.orderId || orderData.order_id || `ORD-${orderData.id}`,
            status: orderData.status || 'Pending',
            createdAt: orderData.createdAt || orderData.created_at,
            totalAmount: parseFloat(orderData.totalAmount || orderData.total_amount) || 0,
            paymentMethod: orderData.paymentMethod || orderData.payment_method || 'COD',
            paymentStatus: orderData.paymentStatus || orderData.payment_status || 'Pending',
            shippingAddress: orderData.shippingAddress || orderData.shipping_address || {
              fullName: orderData.fullName || '',
              phone: orderData.phone || '',
              address: orderData.address || '',
              city: orderData.city || '',
              state: orderData.state || '',
              pincode: orderData.pincode || ''
            },
            items: (orderData.cartItems || orderData.cart_items || orderData.items || []).map((item: any) => ({
              id: item.id?.toString() || item.productId?.toString(),
              title: item.title || item.name || 'Item',
              quantity: item.quantity || 1,
              price: parseFloat(item.price || item.sale_price) || 0,
              thumbnail: item.thumbnail || item.image
            }))
          });
        }
      } catch (error: any) {
        console.error("Failed to fetch order:", error);
        toast({
          title: "Error",
          description: "Failed to load order details",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const getStatusConfig = (status: string) => {
    const normalizedStatus = status?.toLowerCase() || '';
    switch (normalizedStatus) {
      case 'delivered':
        return { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100', label: 'Delivered' };
      case 'shipped':
      case 'out_for_delivery':
        return { icon: Truck, color: 'text-blue-600', bg: 'bg-blue-100', label: 'Shipped' };
      case 'processing':
      case 'confirmed':
        return { icon: Package, color: 'text-orange-600', bg: 'bg-orange-100', label: 'Processing' };
      case 'cancelled':
        return { icon: XCircle, color: 'text-red-600', bg: 'bg-red-100', label: 'Cancelled' };
      default:
        return { icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-100', label: 'Pending' };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-background">
        <Header
          cartItemCount={itemCount}
          onSearch={() => {}}
          onCartClick={() => navigate('/cart')}
          onProfileClick={() => navigate('/profile')}
        />
        <main className="container mx-auto px-4 py-16 text-center">
          <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Order Not Found</h1>
          <p className="text-muted-foreground mb-6">The order you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/profile?tab=orders')}>View All Orders</Button>
        </main>
        <Footer />
      </div>
    );
  }

  const statusConfig = getStatusConfig(order.status);
  const StatusIcon = statusConfig.icon;

  return (
    <div className="min-h-screen bg-background">
      <Header
        cartItemCount={itemCount}
        onSearch={() => {}}
        onCartClick={() => navigate('/cart')}
        onProfileClick={() => navigate('/profile')}
      />

      <main className="container mx-auto px-4 py-6 sm:py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-4"
          onClick={() => navigate('/profile?tab=orders')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Orders
        </Button>

        {/* Order Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Order Summary</h1>
            <p className="text-muted-foreground text-sm sm:text-base mt-1">
              Order ID: <span className="font-medium text-foreground">{order.orderId}</span>
            </p>
          </div>
          <Badge className={`${statusConfig.bg} ${statusConfig.color} text-sm px-4 py-2`}>
            <StatusIcon className="w-4 h-4 mr-2" />
            {statusConfig.label}
          </Badge>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Order Items */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-primary" />
                  Order Items
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={item.id || index} className="flex gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                        {item.thumbnail ? (
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package className="w-6 h-6 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm sm:text-base truncate">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                        <p className="font-semibold text-primary text-sm sm:text-base mt-1">
                          Rs. {(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-medium">{order.shippingAddress.fullName}</p>
                  <p className="text-muted-foreground text-sm">
                    {order.shippingAddress.address}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
                  </p>
                  {order.shippingAddress.phone && (
                    <p className="text-muted-foreground text-sm flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      {order.shippingAddress.phone}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary Sidebar */}
          <div className="space-y-4">
            {/* Payment Info */}
            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-primary" />
                  Payment Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment Method</span>
                  <span className="font-medium">{order.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment Status</span>
                  <Badge variant={order.paymentStatus === 'Paid' ? 'default' : 'secondary'}>
                    {order.paymentStatus}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Order Total */}
            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Order Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Order Date</span>
                  <span className="font-medium text-sm">
                    {new Date(order.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Items</span>
                  <span className="font-medium">{order.items.length}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">Rs. {order.totalAmount.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate('/profile?tab=orders')}
              >
                View All Orders
              </Button>
              <Button
                variant="hero"
                className="w-full"
                onClick={() => navigate('/menu')}
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderSummary;
