import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, MessageSquare, Mail, Clock, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { adminService } from "@/services";

interface Review {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
}

export const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await adminService.getReviews();
      if (response.status === 'success' && response.data?.reviews) {
        setReviews(response.data.reviews);
      }
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
      toast({ title: "Error", description: "Failed to load reviews", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    if (status === 'resolved') {
      return <Badge className="bg-green-500/10 text-green-700"><CheckCircle className="w-3 h-3 mr-1" /> Resolved</Badge>;
    }
    if (status === 'dismissed') {
      return <Badge className="bg-red-500/10 text-red-700"><XCircle className="w-3 h-3 mr-1" /> Dismissed</Badge>;
    }
    return <Badge className="bg-yellow-500/10 text-yellow-700"><Clock className="w-3 h-3 mr-1" /> Pending</Badge>;
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
        <h1 className="text-3xl font-bold">Reviews & Feedback</h1>
        <Badge variant="secondary">{reviews.length} messages</Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center">
              <MessageSquare className="w-5 h-5 mr-2 text-primary" />
              {reviews.length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {reviews.filter(r => r.status === 'pending').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Resolved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {reviews.filter(r => r.status === 'resolved').length}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {reviews.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8 text-muted-foreground">
              No feedback received yet
            </CardContent>
          </Card>
        ) : (
          reviews.map((review) => (
            <Card key={review.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-medium text-primary">
                          {review.name?.charAt(0) || '?'}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{review.name}</p>
                        <p className="text-sm text-muted-foreground flex items-center">
                          <Mail className="w-3 h-3 mr-1" />
                          {review.email}
                        </p>
                      </div>
                    </div>
                    
                    <div className="ml-13 pl-13">
                      <h4 className="font-medium text-lg">{review.subject || 'No Subject'}</h4>
                      <p className="text-muted-foreground mt-1">{review.message}</p>
                    </div>
                  </div>
                  
                  <div className="text-right space-y-2">
                    {getStatusBadge(review.status)}
                    <p className="text-xs text-muted-foreground">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2 mt-4 pt-4 border-t">
                  <Button variant="outline" size="sm">
                    Reply via Email
                  </Button>
                  <Button variant="default" size="sm">
                    Mark as Resolved
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Reviews;
