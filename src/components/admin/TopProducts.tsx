import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Loader2 } from "lucide-react";
import { adminService } from "@/services";

interface Product {
  id: string;
  name: string;
  category: string;
  sales: number;
  revenue: string;
  growth: number;
  image: string;
}

const categoryEmoji: Record<string, string> = {
  pastries: "🥐",
  cupcakes: "🧁",
  breads: "🍞",
  cakes: "🍰",
  muffins: "🧁",
  cookies: "🍪",
  desserts: "🍮",
  default: "🎂"
};

export const TopProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        setLoading(true);
        const response = await adminService.getProductAnalytics();

        if (response.success && response.data) {
          const mappedProducts: Product[] = (response.data.topProducts || response.data || [])
            .slice(0, 5)
            .map((product: any) => ({
              id: product.id?.toString(),
              name: product.title || product.name || "Product",
              category: product.category || "Other",
              sales: product.sales || product.total_sold || 0,
              revenue: `$${(product.revenue || product.total_revenue || 0).toLocaleString()}`,
              growth: product.growth || 0,
              image: categoryEmoji[product.category?.toLowerCase()] || categoryEmoji.default
            }));
          setProducts(mappedProducts);
        }
      } catch (error) {
        console.error("Failed to fetch top products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No product data available
      </div>
    );
  }

  const maxSales = Math.max(...products.map(p => p.sales), 1);

  return (
    <div className="space-y-6">
      {products.map((product, index) => (
        <div key={product.id || index} className="flex items-center space-x-4">
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
              <span className={`text-xs font-medium ${product.growth >= 0 ? 'text-green-600' : 'text-red-600'
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