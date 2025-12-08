import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DollarSign,
  ShoppingCart,
  Users,
  TrendingUp,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  Loader2
} from "lucide-react";
import { adminService, orderService } from "@/services";

interface Stats {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative";
  icon: any;
  description: string;
}

interface OrderStats {
  title: string;
  value: string;
  icon: any;
  color: string;
}

export const QuickStats = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Stats[]>([
    {
      title: "Total Revenue",
      value: "$0",
      change: "+0%",
      changeType: "positive" as const,
      icon: DollarSign,
      description: "vs last month"
    },
    {
      title: "Total Orders",
      value: "0",
      change: "+0%",
      changeType: "positive" as const,
      icon: ShoppingCart,
      description: "vs last month"
    },
    {
      title: "Active Users",
      value: "0",
      change: "+0%",
      changeType: "positive" as const,
      icon: Users,
      description: "vs last month"
    },
    {
      title: "Conversion Rate",
      value: "0%",
      change: "+0%",
      changeType: "positive" as const,
      icon: TrendingUp,
      description: "vs last month"
    }
  ]);

  const [orderStats, setOrderStats] = useState<OrderStats[]>([
    {
      title: "Pending Orders",
      value: "0",
      icon: Clock,
      color: "bg-yellow-500"
    },
    {
      title: "Completed Today",
      value: "0",
      icon: CheckCircle,
      color: "bg-green-500"
    },
    {
      title: "Cancelled",
      value: "0",
      icon: XCircle,
      color: "bg-red-500"
    },
    {
      title: "Low Stock Items",
      value: "0",
      icon: Package,
      color: "bg-orange-500"
    }
  ]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);

        // Fetch dashboard stats
        const dashboardResponse = await adminService.getDashboardStats('week');

        if (dashboardResponse.success && dashboardResponse.data) {
          const data = dashboardResponse.data;

          setStats([
            {
              title: "Total Revenue",
              value: `$${(data.totalRevenue || 0).toLocaleString()}`,
              change: `+${data.revenueChange || 0}%`,
              changeType: (data.revenueChange || 0) >= 0 ? "positive" : "negative",
              icon: DollarSign,
              description: "vs last month"
            },
            {
              title: "Total Orders",
              value: (data.totalOrders || 0).toLocaleString(),
              change: `+${data.ordersChange || 0}%`,
              changeType: (data.ordersChange || 0) >= 0 ? "positive" : "negative",
              icon: ShoppingCart,
              description: "vs last month"
            },
            {
              title: "Active Users",
              value: (data.totalCustomers || 0).toLocaleString(),
              change: `+${data.customersChange || 0}%`,
              changeType: (data.customersChange || 0) >= 0 ? "positive" : "negative",
              icon: Users,
              description: "vs last month"
            },
            {
              title: "Conversion Rate",
              value: `${data.conversionRate || 0}%`,
              change: `${data.conversionChange || 0}%`,
              changeType: (data.conversionChange || 0) >= 0 ? "positive" : "negative",
              icon: TrendingUp,
              description: "vs last month"
            }
          ]);
        }

        // Fetch order statistics
        const orderStatsResponse = await orderService.getOrderStats();

        if (orderStatsResponse.success && orderStatsResponse.data) {
          const data = orderStatsResponse.data;

          setOrderStats([
            {
              title: "Pending Orders",
              value: (data.pending || 0).toString(),
              icon: Clock,
              color: "bg-yellow-500"
            },
            {
              title: "Completed Today",
              value: (data.completedToday || 0).toString(),
              icon: CheckCircle,
              color: "bg-green-500"
            },
            {
              title: "Cancelled",
              value: (data.cancelled || 0).toString(),
              icon: XCircle,
              color: "bg-red-500"
            },
            {
              title: "Low Stock Items",
              value: (data.lowStock || 0).toString(),
              icon: Package,
              color: "bg-orange-500"
            }
          ]);
        }

      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Main Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Badge
                    variant={stat.changeType === "positive" ? "default" : "destructive"}
                    className="text-xs"
                  >
                    {stat.change}
                  </Badge>
                  <span>{stat.description}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Order Status Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {orderStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="hover:shadow-md transition-shadow">
              <CardContent className="flex items-center p-6">
                <div className={`${stat.color} p-2 rounded-lg mr-4`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};