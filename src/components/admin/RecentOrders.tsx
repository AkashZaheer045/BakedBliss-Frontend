import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Loader2 } from "lucide-react";
import { orderService } from "@/services";

interface Order {
  id: string;
  order_id: string;
  customer: string;
  email: string;
  amount: string;
  status: string;
  time: string;
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "completed":
    case "delivered":
      return "bg-green-500";
    case "pending":
      return "bg-yellow-500";
    case "preparing":
    case "processing":
      return "bg-blue-500";
    case "cancelled":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
  switch (status.toLowerCase()) {
    case "completed":
    case "delivered":
      return "default";
    case "pending":
      return "secondary";
    case "preparing":
    case "processing":
      return "default";
    case "cancelled":
      return "destructive";
    default:
      return "secondary";
  }
};

const getTimeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} minutes ago`;
  if (diffHours < 24) return `${diffHours} hours ago`;
  return `${diffDays} days ago`;
};

export const RecentOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentOrders = async () => {
      try {
        setLoading(true);
        const response = await orderService.getAllOrders({ limit: 5, page: 1 });

        if (response.success && response.data) {
          const mappedOrders: Order[] = response.data.orders?.map((order: any) => ({
            id: order.id?.toString(),
            order_id: order.order_id || `ORD-${order.id}`,
            customer: order.customer_name || order.user?.full_name || "Customer",
            email: order.customer_email || order.user?.email || "",
            amount: `$${parseFloat(order.total_amount || 0).toFixed(2)}`,
            status: order.status || "pending",
            time: getTimeAgo(order.created_at)
          })) || [];
          setOrders(mappedOrders);
        }
      } catch (error) {
        console.error("Failed to fetch recent orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No recent orders
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div key={order.id} className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-8 w-8">
              <AvatarFallback>
                {order.customer.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">
                {order.customer}
              </p>
              <p className="text-sm text-muted-foreground">
                {order.order_id}
              </p>
            </div>
          </div>
          <div className="text-right space-y-1">
            <div className="flex items-center space-x-2">
              <Badge variant={getStatusVariant(order.status)}>
                {order.status}
              </Badge>
              <p className="text-sm font-medium">{order.amount}</p>
            </div>
            <p className="text-xs text-muted-foreground">{order.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
};