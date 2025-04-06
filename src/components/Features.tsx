
import React from "react";
import { Camera, Cloud, Leaf, Sprout, Users, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useDiagnosis } from "@/context/DiagnosisContext";

const features = [
  {
    icon: <Camera className="h-8 w-8 text-plantguard-green" />,
    title: "AI Plant Identification",
    description: "Upload a photo and instantly identify plant species and detect diseases with our advanced AI technology.",
    sectionId: "diagnosis",
    action: "triggerUpload"
  },
  {
    icon: <Sprout className="h-8 w-8 text-plantguard-green" />,
    title: "Personalized Care",
    description: "Receive custom watering, sunlight, and fertilization recommendations for each of your plants.",
    sectionId: "diagnosis"
  },
  {
    icon: <Cloud className="h-8 w-8 text-plantguard-green" />,
    title: "Environmental Monitoring",
    description: "Track temperature, humidity, and other conditions affecting your plants' health.",
    sectionId: "monitoring"
  },
  {
    icon: <Zap className="h-8 w-8 text-plantguard-green" />,
    title: "Smart Alerts",
    description: "Get proactive notifications about watering, disease risks, and environmental changes.",
    sectionId: "monitoring"
  },
  {
    icon: <Users className="h-8 w-8 text-plantguard-green" />,
    title: "Community Support",
    description: "Connect with plant experts and enthusiasts to share knowledge and get advice.",
    sectionId: "community"
  },
  {
    icon: <Leaf className="h-8 w-8 text-plantguard-green" />,
    title: "Sustainable Gardening",
    description: "Learn eco-friendly gardening practices to reduce resource usage and environmental impact.",
    sectionId: "community"
  }
];

const Features = () => {
  const { triggerFileUpload } = useDiagnosis();

  const handleFeatureClick = (feature: typeof features[0]) => {
    const element = document.getElementById(feature.sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      
      // If it's the AI Plant Identification card, trigger file upload after scrolling
      if (feature.action === "triggerUpload") {
        // Give time for scrolling to complete before triggering file upload
        setTimeout(() => {
          triggerFileUpload();
        }, 800);
      }
    }
  };

  return (
    <section id="features" className="py-16 bg-gradient-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">AI-Powered Plant Care</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            PlantGuard combines cutting-edge technology with plant science to keep your plants healthy and thriving.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="feature-card hover:border-plantguard-green cursor-pointer transition-all hover:shadow-md"
              onClick={() => handleFeatureClick(feature)}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleFeatureClick(feature);
                }
              }}
              role="button"
              aria-label={`Learn about ${feature.title}`}
            >
              <CardHeader>
                <div className="mb-4 p-3 w-16 h-16 rounded-lg bg-plantguard-green/10 flex items-center justify-center">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
