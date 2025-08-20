import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Gift, Percent } from "lucide-react";

const offers = [
  {
    id: "1",
    title: "Weekend Special",
    description: "Buy 2 croissants, get 1 free coffee",
    discount: "Free Coffee",
    validUntil: "Sunday",
    icon: Gift,
    bgColor: "bg-gradient-to-r from-primary/10 to-primary-muted/10",
    borderColor: "border-primary/20"
  },
  {
    id: "2", 
    title: "Early Bird Deal",
    description: "20% off all morning pastries before 10 AM",
    discount: "20% OFF",
    validUntil: "Daily",
    icon: Clock,
    bgColor: "bg-gradient-to-r from-warning/10 to-warning/5",
    borderColor: "border-warning/20"
  },
  {
    id: "3",
    title: "Birthday Bundle",
    description: "Complete cake + desserts package",
    discount: "30% OFF",
    validUntil: "Limited",
    icon: Percent,
    bgColor: "bg-gradient-to-r from-success/10 to-success/5", 
    borderColor: "border-success/20"
  }
];

interface SpecialOffersSectionProps {
  onOfferClick?: (offerId: string) => void;
}

export const SpecialOffersSection = ({ onOfferClick }: SpecialOffersSectionProps) => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Special Offers</h2>
          <p className="text-muted-foreground">
            Don't miss out on our limited-time deals and exclusive offers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offers.map((offer) => {
            const IconComponent = offer.icon;
            return (
              <Card 
                key={offer.id}
                className={`${offer.bgColor} ${offer.borderColor} hover:shadow-glow transition-all duration-300 cursor-pointer group transform hover:scale-[1.02]`}
                onClick={() => onOfferClick?.(offer.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                          {offer.title}
                        </h3>
                        <Badge variant="secondary" className="text-xs">
                          Valid until {offer.validUntil}
                        </Badge>
                      </div>
                    </div>
                    <Badge className="bg-primary text-primary-foreground">
                      {offer.discount}
                    </Badge>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">
                    {offer.description}
                  </p>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground"
                  >
                    Claim Offer
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};