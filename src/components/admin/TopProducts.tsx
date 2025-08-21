import { Progress } from "@/components/ui/progress";

const topProducts = [
  {
    name: "Chocolate Croissant",
    category: "Pastries",
    sales: 245,
    revenue: "$1,225",
    growth: 12.5,
    image: "🥐"
  },
  {
    name: "Vanilla Cupcake",
    category: "Cupcakes", 
    sales: 189,
    revenue: "$945",
    growth: 8.2,
    image: "🧁"
  },
  {
    name: "Sourdough Bread",
    category: "Breads",
    sales: 156,
    revenue: "$780",
    growth: 15.7,
    image: "🍞"
  },
  {
    name: "Strawberry Cake",
    category: "Cakes",
    sales: 134,
    revenue: "$670",
    growth: -2.1,
    image: "🍰"
  },
  {
    name: "Blueberry Muffin",
    category: "Muffins",
    sales: 98,
    revenue: "$490",
    growth: 5.3,
    image: "🧁"
  }
];

export const TopProducts = () => {
  const maxSales = Math.max(...topProducts.map(p => p.sales));

  return (
    <div className="space-y-6">
      {topProducts.map((product, index) => (
        <div key={product.name} className="flex items-center space-x-4">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-sm font-medium">
            {index + 1}
          </div>
          
          <div className="text-2xl">{product.image}</div>
          
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium leading-none">
                  {product.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {product.category}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{product.revenue}</p>
                <p className="text-xs text-muted-foreground">
                  {product.sales} sold
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Progress 
                value={(product.sales / maxSales) * 100} 
                className="flex-1 h-2"
              />
              <span className={`text-xs font-medium ${
                product.growth >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {product.growth >= 0 ? '+' : ''}{product.growth}%
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};