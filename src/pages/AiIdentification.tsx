
import React from "react";
import ResourceLayout from "@/components/ResourceLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ImagePlus, Leaf } from "lucide-react";
import { Link } from "react-router-dom";

const AiIdentification = () => {
  return (
    <ResourceLayout 
      title="AI Plant Identification"
      description="Instantly identify plants with our advanced AI technology"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">How It Works</h2>
              <ol className="space-y-4 list-decimal list-inside">
                <li>Take a clear photo of the plant you want to identify</li>
                <li>Upload the image to our AI plant analyzer</li>
                <li>Our advanced AI will process the image</li>
                <li>Receive detailed information about your plant in seconds</li>
              </ol>
              
              <div className="mt-6">
                <Link to="/plant-analyzer">
                  <Button className="flex items-center">
                    <ImagePlus className="mr-2 h-4 w-4" />
                    Identify Your Plant Now
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Features</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Leaf className="h-5 w-5 mr-2 text-plantguard-green mt-0.5" />
                  <span>Identifies over 10,000+ plant species</span>
                </li>
                <li className="flex items-start">
                  <Leaf className="h-5 w-5 mr-2 text-plantguard-green mt-0.5" />
                  <span>99% accuracy on common houseplants</span>
                </li>
                <li className="flex items-start">
                  <Leaf className="h-5 w-5 mr-2 text-plantguard-green mt-0.5" />
                  <span>Detailed plant care instructions</span>
                </li>
                <li className="flex items-start">
                  <Leaf className="h-5 w-5 mr-2 text-plantguard-green mt-0.5" />
                  <span>Scientific information and plant family details</span>
                </li>
                <li className="flex items-start">
                  <Leaf className="h-5 w-5 mr-2 text-plantguard-green mt-0.5" />
                  <span>Works offline for premium users</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardContent className="pt-6 flex flex-col items-center">
              <div className="rounded-lg overflow-hidden w-full max-w-md mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07" 
                  alt="Plant identification example" 
                  className="w-full h-auto"
                />
              </div>
              <h3 className="text-lg font-medium mb-4">Try Our Plant Analyzer</h3>
              <p className="text-center mb-4">
                Get instant plant identification and care instructions in seconds. 
                Just upload a photo and let our AI do the work!
              </p>
              <Link to="/plant-analyzer">
                <Button size="lg">
                  Start Identifying Plants
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </ResourceLayout>
  );
};

export default AiIdentification;
