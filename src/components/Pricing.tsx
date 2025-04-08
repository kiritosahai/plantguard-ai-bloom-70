
import React from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const pricingPlans = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    description: "Perfect for beginners getting started with plant care",
    features: [
      "Basic plant identification",
      "Limited disease diagnosis",
      "Care reminders",
      "Access to community forums",
      "5 plant profiles"
    ],
    buttonText: "Get Started",
    buttonVariant: "outline" as const
  },
  {
    name: "Premium",
    price: "₹50",
    period: "per month",
    description: "Advanced features for serious plant enthusiasts",
    features: [
      "Unlimited plant identification",
      "Advanced disease detection",
      "Personalized care plans",
      "Environmental monitoring",
      "Unlimited plant profiles",
      "Expert consultation access",
      "Premium community features"
    ],
    buttonText: "Start Free Trial",
    buttonVariant: "default" as const,
    popular: true
  },
  {
    name: "Business",
    price: "₹499",
    period: "per month",
    description: "For professionals and commercial growers",
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
    buttonVariant: "outline" as const
  }
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-16 bg-gradient-to-b from-white to-plantguard-green-light/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Perfect Plan</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select the plan that fits your needs, from casual plant owners to professional growers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div 
              key={index}
              className={`relative rounded-2xl border bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl ${
                plan.popular ? "border-plantguard-green ring-2 ring-plantguard-green/20" : "border-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full bg-plantguard-green px-3 py-1 text-xs font-medium text-white">
                  Most Popular
                </div>
              )}
              <div className="mb-5">
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <div className="mt-2 flex items-baseline">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="ml-1 text-sm text-muted-foreground">/{plan.period}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {plan.description}
                </p>
              </div>
              
              <div className="space-y-3 mb-6">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center">
                    <Check className="h-4 w-4 text-plantguard-green mr-2 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-auto">
                <Button variant={plan.buttonVariant} className="w-full">
                  {plan.buttonText}
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-10 text-center text-sm text-muted-foreground">
          All plans include a 14-day free trial. No credit card required.
        </div>
      </div>
    </section>
  );
};

export default Pricing;
