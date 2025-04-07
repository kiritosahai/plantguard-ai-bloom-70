
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { 
  Leaf, 
  FlaskConical, 
  BarChart3, 
  Users, 
  Zap, 
  CloudSun,
  Flower2,
  Sprout
} from "lucide-react";
import { useDiagnosis } from "@/context/DiagnosisContext";
import { useIsMobile } from "@/hooks/use-mobile";

const features = [
  {
    icon: Leaf,
    title: "AI Plant Identification",
    description: "Upload a photo to instantly recognize over 10,000 plant species with high accuracy.",
    path: "/plant-identification",
    isCameraFeature: true
  },
  {
    icon: FlaskConical,
    title: "Disease Diagnosis",
    description: "Detect plant diseases and pests early with our advanced image recognition technology.",
    path: "/disease-diagnosis",
    isCameraFeature: true
  },
  {
    icon: BarChart3,
    title: "Growth Monitoring",
    description: "Track your plants' growth over time with data visualization and progress charts.",
    path: "/monitoring",
    isCameraFeature: false
  },
  {
    icon: CloudSun,
    title: "Environmental Analysis",
    description: "Measure light, moisture, and temperature to create optimal growing conditions.",
    path: "/monitoring",
    isCameraFeature: false
  },
  {
    icon: Zap,
    title: "Personalized Care Plans",
    description: "Receive customized care instructions based on your plant's needs and environment.",
    path: "/monitoring",
    isCameraFeature: false
  },
  {
    icon: Users,
    title: "Community & Expert Advice",
    description: "Connect with other plant enthusiasts and get advice from horticulture experts.",
    path: "/community",
    isCameraFeature: false
  },
  {
    icon: Flower2,
    title: "Plant Encyclopedia",
    description: "Access our comprehensive database of plant species with detailed care instructions.",
    path: "/plant-encyclopedia",
    isCameraFeature: false
  },
  {
    icon: Sprout,
    title: "Seasonal Plant Calendar",
    description: "Know the best time to plant, prune, and fertilize your plants based on your region.",
    path: "/plant-encyclopedia",
    isCameraFeature: false
  }
];

const Features = () => {
  const navigate = useNavigate();
  const { triggerFileUpload, setUseCameraMode } = useDiagnosis();
  const isMobile = useIsMobile();

  const handleFeatureClick = (path, isCameraFeature) => {
    if (isMobile && isCameraFeature) {
      setUseCameraMode(true);
    }
    
    navigate(path);
  };

  return (
    <section id="features" className="py-16 bg-gradient-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Plant Care Features</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            All the tools you need to keep your plants healthy and thriving, powered by intelligent technology
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="feature-card cursor-pointer hover:border-plantguard-green hover:shadow-md transition-all duration-300"
              onClick={() => handleFeatureClick(feature.path, feature.isCameraFeature)}
            >
              <div className="p-6">
                <div className="w-12 h-12 bg-plantguard-green-light/30 rounded-full flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-plantguard-green" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
