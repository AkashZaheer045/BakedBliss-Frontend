import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Search, Loader2, Mail, Phone, ShoppingBag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { adminService } from "@/services";

interface Customer {
  id: number;
  userId: string;
  name: string;
  email: string;
  phone: string;
  isActive: boolean;
  joinedAt: string;
  orderCount: number;
  totalSpent: string;
}

export const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await adminService.getAllCustomers();
      if (response.status === 'success' && response.data?.customers) {
        setCustomers(response.data.customers);
      }
    } catch (error) {
      console.error("Failed to fetch customers:", error);
      toast({ title: "Error", description: "Failed to load customers", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (customer: Customer) => {
    try {
      const newStatus = !customer.isActive;
      await adminService.updateCustomerStatus(customer.userId, newStatus);
      
      setCustomers(customers.map(c => 
        c.userId === customer.userId ? { ...c, isActive: newStatus } : c
      ));
      
      toast({ title: "Success", description: `User ${newStatus ? 'activated' : 'deactivated'} successfully` });
    } catch (error) {
      console.error("Failed to update status:", error);
      toast({ title: "Error", description: "Failed to update status", variant: "destructive" });
    }
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <h1 className="text-3xl font-bold">Customer Management</h1>
        <Badge variant="secondary">{customers.length} customers</Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {customers.reduce((acc, c) => acc + c.orderCount, 0)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              ${customers.reduce((acc, c) => acc + parseFloat(c.totalSpent || '0'), 0).toFixed(2)}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Customers</CardTitle>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 w-[300px]"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredCustomers.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No customers found</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.userId}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-sm font-medium text-primary">
                            {customer.name?.charAt(0) || '?'}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{customer.name || 'Anonymous'}</p>
                          <p className="text-sm text-muted-foreground">{customer.userId}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Mail className="w-3 h-3 mr-1 text-muted-foreground" />
                          {customer.email || 'N/A'}
                        </div>
                        {customer.phone && (
                          <div className="flex items-center text-sm">
                            <Phone className="w-3 h-3 mr-1 text-muted-foreground" />
                            {customer.phone}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <ShoppingBag className="w-4 h-4 mr-1 text-muted-foreground" />
                        {customer.orderCount} orders
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-green-600">
                      ${customer.totalSpent}
                    </TableCell>
                    <TableCell>
                      <Badge variant={customer.isActive ? "default" : "destructive"} className={customer.isActive ? "bg-green-100 text-green-700 hover:bg-green-100" : "bg-red-100 text-red-700 hover:bg-red-100"}>
                        {customer.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(customer.joinedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                       <Button 
                           variant="ghost"
                           size="sm"
                           className={customer.isActive ? "text-red-600 hover:text-red-700 hover:bg-red-50" : "text-green-600 hover:text-green-700 hover:bg-green-50"}
                           onClick={() => handleToggleStatus(customer)}
                       >
                           {customer.isActive ? "Deactivate" : "Activate"}
                       </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Customers;
