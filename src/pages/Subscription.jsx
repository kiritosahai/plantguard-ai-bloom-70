
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

const plans = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    period: "forever",
    features: [
      "Basic plant identification",
      "Limited disease diagnosis",
      "Care reminders",
      "Access to community forums",
      "5 plant profiles"
    ],
    buttonText: "Get Started",
    popular: false
  },
  {
    id: "premium",
    name: "Premium",
    price: "$9.99",
    period: "per month",
    features: [
      "Unlimited plant identification",
      "Advanced disease detection",
      "Personalized care plans",
      "Environmental monitoring",
      "Unlimited plant profiles",
      "Expert consultation access",
      "Premium community features"
    ],
    buttonText: "Select Plan",
    popular: true
  },
  {
    id: "business",
    name: "Business",
    price: "$29.99",
    period: "per month",
    features: [
      "All Premium features",
      "Multi-user access",
      "Advanced analytics & reports",
      "API access",
      "Bulk plant processing",
      "Commercial use license",
      "Dedicated support",
      "Custom integrations"
    ],
    buttonText: "Contact Sales",
    popular: false
  }
];

const Subscription = () => {
  const [selectedPlan, setSelectedPlan] = useState("premium");
  const navigate = useNavigate();
  
  const handleSubscribe = () => {
    // In a real app, this would process the subscription
    // For now, we'll just redirect to the home page
    navigate("/");
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow bg-gradient-to-b from-white to-plantguard-blue-light/10">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold font-serif text-plantguard-green-dark mb-4">
              Choose Your Subscription Plan
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Select the plan that best fits your needs and start enhancing your plant care experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {plans.map((plan) => (
              <Card 
                key={plan.id}
                className={`relative ${
                  selectedPlan === plan.id 
                    ? "border-plantguard-green ring-2 ring-plantguard-green/20" 
                    : "border-border hover:border-plantguard-green/50 cursor-pointer"
                }`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-0 right-0 mx-auto w-fit rounded-full bg-plantguard-green px-3 py-1 text-xs font-medium text-white">
                    Most Popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="flex flex-col items-center">
                    <span className="text-xl">{plan.name}</span>
                    <div className="mt-2 flex items-baseline">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="ml-1 text-sm text-muted-foreground">/{plan.period}</span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <Check className="h-4 w-4 text-plantguard-green mr-2 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant={plan.id === "free" ? "outline" : "default"}
                    className="w-full"
                    onClick={handleSubscribe}
                  >
                    {plan.buttonText}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h2 className="text-2xl font-semibold mb-6 text-center">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-medium mb-2">Can I change my plan later?</h3>
                <p className="text-sm text-muted-foreground">
                  Yes, you can upgrade or downgrade your plan at any time from your account settings.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Is there a free trial?</h3>
                <p className="text-sm text-muted-foreground">
                  All paid plans include a 14-day free trial. No credit card required to start.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">How can I cancel my subscription?</h3>
                <p className="text-sm text-muted-foreground">
                  You can cancel your subscription at any time from your account settings.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Do you offer refunds?</h3>
                <p className="text-sm text-muted-foreground">
                  We offer a 30-day money-back guarantee on all paid plans.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Subscription;
