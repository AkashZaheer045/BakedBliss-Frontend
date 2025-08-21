import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const recentOrders = [
  {
    id: "ORD-001",
    customer: "Alice Johnson",
    email: "alice@example.com",
    amount: "$45.99",
    status: "completed",
    time: "2 minutes ago"
  },
  {
    id: "ORD-002", 
    customer: "Bob Smith",
    email: "bob@example.com",
    amount: "$23.50",
    status: "pending",
    time: "5 minutes ago"
  },
  {
    id: "ORD-003",
    customer: "Carol Davis",
    email: "carol@example.com", 
    amount: "$67.25",
    status: "preparing",
    time: "10 minutes ago"
  },
  {
    id: "ORD-004",
    customer: "David Wilson",
    email: "david@example.com",
    amount: "$12.75",
    status: "cancelled",
    time: "15 minutes ago"
  },
  {
    id: "ORD-005",
    customer: "Emma Brown",
    email: "emma@example.com",
    amount: "$89.99",
    status: "completed",
    time: "20 minutes ago"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-500";
    case "pending":
      return "bg-yellow-500";
    case "preparing":
      return "bg-blue-500";
    case "cancelled":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

const getStatusVariant = (status: string) => {
  switch (status) {
    case "completed":
      return "default";
    case "pending":
      return "secondary";
    case "preparing":
      return "default";
    case "cancelled":
      return "destructive";
    default:
      return "secondary";
  }
};

export const RecentOrders = () => {
  return (
    <div className="space-y-4">
      {recentOrders.map((order) => (
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
                {order.id}
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