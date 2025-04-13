
import React from "react";
import ResourceLayout from "@/components/ResourceLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Bug, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const DiseaseDetection = () => {
  return (
    <ResourceLayout 
      title="Disease Detection"
      description="Early detection of plant diseases to save your plants before it's too late"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="overflow-hidden">
          <div className="aspect-video relative">
            <img 
              src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9" 
              alt="Plant disease" 
              className="w-full h-full object-cover"
            />
          </div>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Early Detection Saves Plants</h2>
            <p className="mb-6">
              Our AI can detect over 50 common plant diseases and nutritional deficiencies before visual symptoms become severe.
              Early intervention drastically increases your chances of saving your plants.
            </p>
            <Link to="/disease-diagnosis">
              <Button className="w-full">
                Diagnose Your Plant
              </Button>
            </Link>
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <Bug className="h-6 w-6 mr-2 text-red-500" />
                <h2 className="text-xl font-semibold">Disease Detection Features</h2>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Activity className="h-5 w-5 mr-2 text-plantguard-green mt-0.5" />
                  <span>Identifies over 50 common plant diseases</span>
                </li>
                <li className="flex items-start">
                  <Activity className="h-5 w-5 mr-2 text-plantguard-green mt-0.5" />
                  <span>Provides severity assessment</span>
                </li>
                <li className="flex items-start">
                  <Activity className="h-5 w-5 mr-2 text-plantguard-green mt-0.5" />
                  <span>Suggests organic and chemical treatments</span>
                </li>
                <li className="flex items-start">
                  <Activity className="h-5 w-5 mr-2 text-plantguard-green mt-0.5" />
                  <span>Personalized prevention tips</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <Shield className="h-6 w-6 mr-2 text-plantguard-green" />
                <h2 className="text-xl font-semibold">Prevention Guide</h2>
              </div>
              <p className="mb-4">
                After diagnosis, we provide a comprehensive prevention guide to ensure your plants stay healthy.
              </p>
              <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                <li>Proper watering schedules</li>
                <li>Optimal light conditions</li>
                <li>Nutritional recommendations</li>
                <li>Pest prevention strategies</li>
                <li>Seasonal care instructions</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </ResourceLayout>
  );
};

export default DiseaseDetection;
