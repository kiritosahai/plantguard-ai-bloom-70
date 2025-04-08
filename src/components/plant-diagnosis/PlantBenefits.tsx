
import React from "react";
import { CheckCircle2 } from "lucide-react";

const PlantBenefits: React.FC = () => {
  const benefits = [
    "Early detection of 1,000+ plant diseases", 
    "Instant species identification", 
    "Personalized treatment recommendations"
  ];
  
  return (
    <div className="w-full lg:w-1/2">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        AI-Powered Plant Disease Detection
      </h2>
      <p className="text-lg text-muted-foreground mb-6">
        Upload a photo of your plant and our advanced AI will identify the species, 
        diagnose any potential issues, and provide tailored care recommendations.
      </p>
      <ul className="space-y-3 mb-8">
        {benefits.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-plantguard-green flex-shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <p className="text-sm text-muted-foreground">
        Our AI model has been trained on millions of plant images to ensure accuracy 
        for 10,000+ plant species and varieties.
      </p>
    </div>
  );
};

export default PlantBenefits;
