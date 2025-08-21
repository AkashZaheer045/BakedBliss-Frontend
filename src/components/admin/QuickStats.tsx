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
  XCircle 
} from "lucide-react";

export const QuickStats = () => {
  const stats = [
    {
      title: "Total Revenue",
      value: "$12,345",
      change: "+12.5%",
      changeType: "positive" as const,
      icon: DollarSign,
      description: "vs last month"
    },
    {
      title: "Total Orders",
      value: "1,234",
      change: "+8.2%",
      changeType: "positive" as const,
      icon: ShoppingCart,
      description: "vs last month"
    },
    {
      title: "Active Users",
      value: "892",
      change: "+15.3%",
      changeType: "positive" as const,
      icon: Users,
      description: "vs last month"
    },
    {
      title: "Conversion Rate",
      value: "3.2%",
      change: "-2.1%",
      changeType: "negative" as const,
      icon: TrendingUp,
      description: "vs last month"
    }
  ];

  const orderStats = [
    {
      title: "Pending Orders",
      value: "23",
      icon: Clock,
      color: "bg-yellow-500"
    },
    {
      title: "Completed Today",
      value: "156",
      icon: CheckCircle,
      color: "bg-green-500"
    },
    {
      title: "Cancelled",
      value: "3",
      icon: XCircle,
      color: "bg-red-500"
    },
    {
      title: "Low Stock Items",
      value: "8",
      icon: Package,
      color: "bg-orange-500"
    }
  ];

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