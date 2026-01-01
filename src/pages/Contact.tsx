import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { contactService } from "@/services";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await contactService.sendMessage({
        fullName: formData.fullName,
        email: formData.email,
        subject: formData.subject,
        message: formData.message
      });

      if (response.status === 'success' || response.success) {
        toast({
          title: "Message sent!",
          description: "Thank you for contacting us. We'll get back to you soon!",
        });
        setFormData({ fullName: "", email: "", subject: "", message: "" });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Our Bakery",
      details: [
        "123 Baker Street",
        "Sweet City, SC 12345",
        "United States"
      ]
    },
    {
      icon: Phone,
      title: "Call Us",
      details: [
        "+1 (555) 123-BAKE",
        "+1 (555) 123-2253",
        "Mon-Sun: 6:00 AM - 10:00 PM"
      ]
    },
    {
      icon: Mail,
      title: "Email Us",
      details: [
        "hello@bakedbliss.com",
        "orders@bakedbliss.com",
        "support@bakedbliss.com"
      ]
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: [
        "Monday - Friday: 6:00 AM - 10:00 PM",
        "Saturday - Sunday: 7:00 AM - 11:00 PM",
        "Holidays: 8:00 AM - 6:00 PM"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header
        cartItemCount={0}
        onSearch={() => { }}
        onCartClick={() => navigate('/cart')}
        onProfileClick={() => navigate('/profile')}
      />

      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-warm">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Get in
              <span className="text-primary block">Touch</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We'd love to hear from you! Whether you have questions, feedback, or special requests,
              our team is here to help make your bakery experience exceptional.
            </p>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <Card className="border-primary/10">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-2xl">
                      <MessageCircle className="w-6 h-6 text-primary" />
                      Send us a Message
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="fullName" className="text-sm font-medium mb-2 block">
                            Full Name *
                          </label>
                          <Input
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder="Your full name"
                            required
                            className="border-primary/20 focus:border-primary"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="text-sm font-medium mb-2 block">
                            Email Address *
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="your.email@example.com"
                            required
                            className="border-primary/20 focus:border-primary"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="subject" className="text-sm font-medium mb-2 block">
                          Subject *
                        </label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          placeholder="What's this about?"
                          required
                          className="border-primary/20 focus:border-primary"
                        />
                      </div>

                      <div>
                        <label htmlFor="message" className="text-sm font-medium mb-2 block">
                          Message *
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Tell us more about your inquiry..."
                          required
                          rows={6}
                          className="border-primary/20 focus:border-primary resize-none"
                        />
                      </div>

                      <Button type="submit" variant="hero" size="lg" className="w-full group" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-4">Contact Information</h2>
                  <p className="text-muted-foreground">
                    Multiple ways to reach us - choose what works best for you!
                  </p>
                </div>

                <div className="grid gap-6">
                  {contactInfo.map((info, index) => {
                    const IconComponent = info.icon;
                    return (
                      <Card key={index} className="border-primary/10 hover:shadow-warm transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                              <IconComponent className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg mb-2">{info.title}</h3>
                              <div className="space-y-1">
                                {info.details.map((detail, idx) => (
                                  <p key={idx} className="text-muted-foreground text-sm">
                                    {detail}
                                  </p>
                                ))}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                {/* Map Placeholder */}
                <Card className="border-primary/10 overflow-hidden">
                  <div className="aspect-video bg-gradient-primary relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-background/90 rounded-lg p-4 text-center">
                        <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
                        <p className="font-medium">Find us on the map</p>
                        <p className="text-sm text-muted-foreground">Interactive map coming soon</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
              <p className="text-muted-foreground">Quick answers to common questions</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Card className="border-primary/10">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">What are your delivery hours?</h3>
                  <p className="text-muted-foreground text-sm">
                    We deliver daily from 8:00 AM to 9:00 PM. Orders placed after 8:00 PM will be delivered the next day.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-primary/10">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Do you take custom orders?</h3>
                  <p className="text-muted-foreground text-sm">
                    Yes! We love creating custom cakes and pastries. Please contact us at least 48 hours in advance for custom orders.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-primary/10">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">What's your return policy?</h3>
                  <p className="text-muted-foreground text-sm">
                    If you're not satisfied with your order, contact us within 2 hours of delivery for a full refund or replacement.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-primary/10">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Do you offer gluten-free options?</h3>
                  <p className="text-muted-foreground text-sm">
                    Yes! We have a dedicated gluten-free section in our menu with breads, pastries, and desserts.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;