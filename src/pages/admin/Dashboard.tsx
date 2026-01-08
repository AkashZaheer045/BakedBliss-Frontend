import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Overview } from "@/components/admin/Overview";
import { RecentOrders } from "@/components/admin/RecentOrders";
import { QuickStats } from "@/components/admin/QuickStats";
import { TopProducts } from "@/components/admin/TopProducts";
import { RecentActivity } from "@/components/admin/RecentActivity";

export const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening at your bakery today.
        </p>
      </div>

      {/* Quick Stats */}
      <QuickStats />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Revenue Chart */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>
              Your revenue performance for the last 7 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Overview />
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>
              Latest orders from your customers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentOrders />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Top Products */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
            <CardDescription>
              Your best performing products this month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TopProducts />
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Real-time user actions and system logs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentActivity />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};