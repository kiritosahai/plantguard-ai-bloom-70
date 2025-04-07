
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const pricingTiers = [
  {
    name: "Free",
    description: "Essential tools for casual plant enthusiasts",
    price: "₹0",
    duration: "",
    features: [
      "Basic plant identification",
      "Limited disease diagnostics",
      "Up to 5 plants in your collection",
      "Community forum access"
    ],
    limitations: [
      "Limited to 3 identifications per day",
      "Basic care recommendations only",
      "No priority support"
    ]
  },
  {
    name: "Pro",
    description: "Advanced features for serious plant lovers",
    price: "₹50",
    duration: "/month",
    features: [
      "Unlimited plant identification",
      "Advanced disease diagnostics",
      "Unlimited plant collection",
      "Detailed care instructions",
      "Seasonal reminders",
      "Growth tracking",
      "Priority support",
      "Ad-free experience",
      "Premium community badge"
    ],
    limitations: []
  },
  {
    name: "Premium",
    description: "Everything you need for ultimate plant care",
    price: "₹450",
    duration: "/year",
    features: [
      "All Pro features included",
      "Expert consultation (2 per month)",
      "Exclusive workshops and webinars",
      "Early access to new features",
      "Family account (up to 3 users)",
      "Personalized seasonal care plan",
      "Offline mode",
      "Export plant data"
    ],
    limitations: []
  }
];

const Subscription = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleSubscribe = (tier) => {
    toast({
      title: "Subscription Selected",
      description: `You selected the ${tier} plan. Redirecting to payment...`,
      duration: 3000,
    });
    
    // In a real app, this would redirect to a payment gateway
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow py-16 bg-gradient-to-b from-white to-plantguard-green-light/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-plantguard-green-dark mb-4">
              Choose Your Plan
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Select the perfect subscription plan to unlock the full potential of your plants
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <Card 
                key={index} 
                className={`flex flex-col ${tier.name === "Pro" ? "border-plantguard-green md:scale-105 shadow-md" : ""}`}
              >
                <CardHeader>
                  <CardTitle className="text-xl">{tier.name}</CardTitle>
                  <CardDescription>{tier.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">{tier.price}</span>
                    <span className="text-muted-foreground">{tier.duration}</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-2">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-5 w-5 text-plantguard-green mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {tier.limitations.length > 0 && (
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-sm text-muted-foreground mb-2">Limitations:</p>
                      <ul className="space-y-2">
                        {tier.limitations.map((limitation, i) => (
                          <li key={i} className="text-sm text-muted-foreground">
                            • {limitation}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="pt-4 mt-auto">
                  <Button 
                    className={`w-full ${tier.name === "Pro" ? "" : "variant-outline"}`}
                    variant={tier.name === "Pro" ? "default" : "outline"}
                    onClick={() => handleSubscribe(tier.name)}
                  >
                    {tier.name === "Free" ? "Get Started" : "Subscribe Now"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">
              All plans include a 7-day free trial. Cancel anytime. No credit card required for free plan.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Have questions? Contact us at <a href="mailto:sahai.kuahgar@plantguard.com" className="underline">sahai.kuahgar@plantguard.com</a>
              or call <a href="tel:+919876543210" className="underline">+91 9876 543 210</a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Subscription;
