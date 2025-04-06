
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Thermometer, Droplets, SunDim, Wind } from "lucide-react";

const Monitoring = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow">
        <div className="py-16 bg-gradient-to-b from-white to-plantguard-blue-light/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold font-serif text-plantguard-green-dark mb-4">
                Environmental Monitoring
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Track and optimize growth conditions for your plants with our smart monitoring tools
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                { title: "Temperature", icon: Thermometer, value: "72°F", status: "Optimal" },
                { title: "Humidity", icon: Droplets, value: "65%", status: "Good" },
                { title: "Light", icon: SunDim, value: "850 lux", status: "Low" },
                { title: "Airflow", icon: Wind, value: "Medium", status: "Good" }
              ].map((metric, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg font-medium">{metric.title}</CardTitle>
                      <metric.icon className="h-5 w-5 text-plantguard-green" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{metric.value}</div>
                    <p className={`text-sm ${
                      metric.status === "Optimal" 
                        ? "text-green-600" 
                        : metric.status === "Good" 
                        ? "text-blue-600" 
                        : "text-amber-600"
                    }`}>
                      {metric.status}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="flex justify-center mb-12">
              <Button size="lg" className="font-medium">
                Connect Your Device
              </Button>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <h2 className="text-2xl font-semibold mb-4">Monitoring Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-medium mb-2">Real-time Data</h3>
                  <p className="text-muted-foreground">
                    Get continuous updates on environmental conditions affecting your plants
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">Smart Alerts</h3>
                  <p className="text-muted-foreground">
                    Receive notifications when conditions fall outside optimal ranges
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">Historical Analysis</h3>
                  <p className="text-muted-foreground">
                    Track trends over time to optimize your plant care routine
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">AI Recommendations</h3>
                  <p className="text-muted-foreground">
                    Get personalized suggestions based on your specific plant species
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Monitoring;
