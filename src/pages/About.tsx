import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Clock, Heart, Users, Leaf, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const About = () => {
  const { toast } = useToast();

  const values = [
    {
      icon: Heart,
      title: "Made with Love",
      description: "Every item is crafted with passion and care by our experienced bakers"
    },
    {
      icon: Leaf,
      title: "Fresh Ingredients",
      description: "We source only the finest, locally-sourced organic ingredients"
    },
    {
      icon: Award,
      title: "Award-Winning",
      description: "Recognized for excellence in baking and customer satisfaction"
    },
    {
      icon: Users,
      title: "Community First",
      description: "Proudly serving our community with traditional recipes and modern innovation"
    }
  ];

  const stats = [
    { number: "14", label: "Years of Excellence" },
    { number: "50+", label: "Daily Varieties" },
    { number: "10k+", label: "Happy Customers" },
    { number: "4.9", label: "Average Rating" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header 
        cartItemCount={0}
        onSearch={() => {}}
        onCartClick={() => toast({ title: "Cart", description: "Opening shopping cart..." })}
        onProfileClick={() => toast({ title: "Profile", description: "Opening user profile..." })}
      />

      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-warm">
          <div className="container mx-auto px-4 text-center">
            <Badge className="mb-4 bg-primary text-primary-foreground">
              Since 2010
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Our Story of
              <span className="text-primary block">Baked Passion</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              What started as a small family bakery has grown into a beloved community cornerstone. 
              We believe that the best baked goods come from the perfect blend of traditional techniques, 
              premium ingredients, and a whole lot of heart.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Values</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do, from selecting ingredients to serving our customers
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <Card key={index} className="border-primary/10 hover:shadow-glow transition-all duration-300">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="font-semibold text-lg mb-3">{value.title}</h3>
                      <p className="text-muted-foreground text-sm">{value.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">The Baker's Tale</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    In 2010, Maria Rodriguez opened the doors to Baked Bliss with a simple dream: 
                    to bring the authentic flavors of her grandmother's recipes to the modern world. 
                    Armed with century-old family recipes and an unwavering commitment to quality, 
                    she started with just a small storefront and big ambitions.
                  </p>
                  <p>
                    Today, Baked Bliss has become more than just a bakery—it's a gathering place 
                    where neighbors become friends over fresh croissants and morning coffee. Our team 
                    of skilled bakers arrives before dawn every day to ensure that each loaf, pastry, 
                    and cake meets our exacting standards.
                  </p>
                  <p>
                    We're proud to be part of this community and look forward to many more years 
                    of serving you the finest baked goods, made with love and delivered with a smile.
                  </p>
                </div>
                <div className="mt-8">
                  <Button variant="hero" size="lg">
                    Visit Our Store
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-[4/3] bg-gradient-primary rounded-2xl overflow-hidden">
                  <img 
                    src="/placeholder.svg" 
                    alt="Baker at work"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-background rounded-xl p-4 shadow-glow border border-primary/10">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-warning fill-warning" />
                    <div>
                      <p className="font-semibold text-sm">Maria Rodriguez</p>
                      <p className="text-xs text-muted-foreground">Founder & Head Baker</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-warm">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Ready to Taste the Difference?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Experience the perfect blend of tradition and innovation in every bite. 
              Order now and discover why our customers keep coming back for more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg">
                Order Now
              </Button>
              <Button variant="outline" size="lg">
                View Menu
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;