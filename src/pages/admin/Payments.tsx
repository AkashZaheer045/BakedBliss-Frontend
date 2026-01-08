import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Loader2, DollarSign, CreditCard, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { adminService } from "@/services";

interface PaymentSummary {
  totalRevenue: string;
  revenueByStatus: Array<{
    status: string;
    count: number;
    total: string;
  }>;
  recentTransactions: Array<{
    id: string;
    amount: number;
    status: string;
    date: string;
  }>;
}

export const Payments = () => {
  const [data, setData] = useState<PaymentSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const response = await adminService.getPaymentSummary();
      if (response.status === 'success' && response.data) {
        setData(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch payments:", error);
      toast({ title: "Error", description: "Failed to load payment data", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      Delivered: "bg-green-500/10 text-green-700",
      Pending: "bg-yellow-500/10 text-yellow-700",
      Cancelled: "bg-red-500/10 text-red-700",
      Confirmed: "bg-blue-500/10 text-blue-700"
    };
    return colors[status] || "bg-gray-500/10 text-gray-700";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Payment Overview</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${data?.totalRevenue || '0.00'}</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <ArrowUpRight className="w-3 h-3 mr-1 text-green-500" />
              All time earnings
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Orders</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data?.revenueByStatus?.find(s => s.status === 'Delivered')?.count || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              ${data?.revenueByStatus?.find(s => s.status === 'Delivered')?.total || '0.00'} revenue
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cancelled Orders</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {data?.revenueByStatus?.find(s => s.status === 'Cancelled')?.count || 0}
            </div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowDownRight className="w-3 h-3 mr-1 text-red-500" />
              ${data?.revenueByStatus?.find(s => s.status === 'Cancelled')?.total || '0.00'} lost
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Status</CardTitle>
            <CardDescription>Breakdown of orders by their current status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data?.revenueByStatus?.map((item) => (
                <div key={item.status} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                    <span className="text-sm text-muted-foreground">{item.count} orders</span>
                  </div>
                  <span className="font-medium">${item.total}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Latest payment activity</CardDescription>
          </CardHeader>
          <CardContent>
            {data?.recentTransactions?.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">No transactions yet</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.recentTransactions?.map((tx) => (
                    <TableRow key={tx.id}>
                      <TableCell className="font-mono text-xs">{tx.id.slice(0, 15)}...</TableCell>
                      <TableCell className="font-medium">${parseFloat(String(tx.amount)).toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(tx.status)}>{tx.status}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(tx.date).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Payments;
