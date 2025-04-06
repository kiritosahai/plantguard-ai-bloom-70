
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Leaf, Search, Activity, BarChart, Users } from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Plant Identification",
    description: "Identify any plant species with just a photo using our AI recognition technology",
    link: "/plant-identification"
  },
  {
    icon: Activity,
    title: "Disease Diagnosis",
    description: "Detect plant diseases early and get personalized treatment recommendations",
    link: "/disease-diagnosis"
  },
  {
    icon: BarChart,
    title: "Growth Monitoring",
    description: "Track environmental conditions and plant growth progress over time",
    link: "/monitoring"
  },
  {
    icon: Users,
    title: "Community Support",
    description: "Connect with plant enthusiasts and experts for advice and knowledge sharing",
    link: "/community"
  },
  {
    icon: Leaf,
    title: "Plant Encyclopedia",
    description: "Access our comprehensive database of plant species, care guides, and more",
    link: "/plant-encyclopedia"
  }
];

const Features = () => {
  return (
    <section id="features" className="py-16 bg-gradient-to-b from-white to-plantguard-blue-light/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Plant Care Features</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our AI-powered platform offers everything you need to keep your plants thriving
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border overflow-hidden group hover:border-plantguard-green hover:shadow-md transition-all duration-300">
              <div className="p-6">
                <div className="w-12 h-12 rounded-full bg-plantguard-green-light/20 flex items-center justify-center mb-5">
                  <feature.icon className="h-6 w-6 text-plantguard-green" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground mb-5">{feature.description}</p>
                <Button asChild variant="link" className="p-0 h-auto text-plantguard-green group-hover:text-plantguard-green-dark">
                  <a href={feature.link} className="flex items-center">
                    Learn more
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
