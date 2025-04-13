
import React from "react";
import ResourceLayout from "@/components/ResourceLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Droplet, Thermometer, SunMedium, Wind } from "lucide-react";
import { Link } from "react-router-dom";

const EnvironmentalMonitoring = () => {
  return (
    <ResourceLayout 
      title="Environmental Monitoring"
      description="Track and optimize your plants' growing conditions for healthier growth"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="overflow-hidden">
          <CardHeader className="bg-blue-50 flex flex-row items-center space-x-2 pb-2">
            <Droplet className="h-6 w-6 text-blue-500" />
            <CardTitle className="text-lg">Humidity</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="mb-4">Track optimal humidity levels for different plant types and receive alerts when conditions need adjustment.</p>
            <div className="flex justify-center">
              <div className="w-32 h-32 rounded-full border-8 border-blue-100 flex items-center justify-center">
                <span className="text-3xl font-bold text-blue-600">65%</span>
              </div>
            </div>
            <p className="text-center text-sm text-muted-foreground mt-2">Current Humidity</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader className="bg-amber-50 flex flex-row items-center space-x-2 pb-2">
            <Thermometer className="h-6 w-6 text-amber-500" />
            <CardTitle className="text-lg">Temperature</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="mb-4">Monitor temperature ranges and receive notifications when temperatures exceed plant tolerance.</p>
            <div className="flex justify-center">
              <div className="w-32 h-32 rounded-full border-8 border-amber-100 flex items-center justify-center">
                <span className="text-3xl font-bold text-amber-600">24°C</span>
              </div>
            </div>
            <p className="text-center text-sm text-muted-foreground mt-2">Current Temperature</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader className="bg-yellow-50 flex flex-row items-center space-x-2 pb-2">
            <SunMedium className="h-6 w-6 text-yellow-500" />
            <CardTitle className="text-lg">Light Levels</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="mb-4">Track light exposure over time and get suggestions for optimal plant placement.</p>
            <div className="flex justify-center">
              <div className="w-32 h-32 rounded-full border-8 border-yellow-100 flex items-center justify-center">
                <span className="text-3xl font-bold text-yellow-600">750<span className="text-lg">lux</span></span>
              </div>
            </div>
            <p className="text-center text-sm text-muted-foreground mt-2">Current Light Level</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Connect Your Smart Devices</h2>
            <p className="mb-6">
              PlantGuard integrates with popular smart home devices to automate environmental control.
              Connect your smart humidifiers, grow lights, and thermostats for automated plant care.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
              <div className="p-4 border rounded-md flex flex-col items-center">
                <Wind className="h-8 w-8 text-plantguard-green mb-2" />
                <span className="text-sm text-center">Smart Humidifier</span>
              </div>
              <div className="p-4 border rounded-md flex flex-col items-center">
                <SunMedium className="h-8 w-8 text-plantguard-green mb-2" />
                <span className="text-sm text-center">Grow Lights</span>
              </div>
              <div className="p-4 border rounded-md flex flex-col items-center">
                <Thermometer className="h-8 w-8 text-plantguard-green mb-2" />
                <span className="text-sm text-center">Smart Thermostat</span>
              </div>
            </div>
            <Link to="/monitoring">
              <Button className="w-full">
                View Monitoring Dashboard
              </Button>
            </Link>
          </CardContent>
        </Card>
        
        <Card>
          <div className="aspect-video relative">
            <img 
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb" 
              alt="Environmental monitoring" 
              className="w-full h-full object-cover"
            />
          </div>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Historical Data Tracking</h2>
            <p>
              Track environmental conditions over time to understand patterns and optimize your plant care routine.
              PlantGuard provides detailed insights and analytics based on historical environmental data.
            </p>
            <div className="mt-4">
              <Link to="/monitoring">
                <Button variant="outline" className="w-full">
                  View Your Analytics
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </ResourceLayout>
  );
};

export default EnvironmentalMonitoring;
