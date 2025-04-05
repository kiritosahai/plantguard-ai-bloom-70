
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Thermometer, Droplets, Cloud, SunMedium } from "lucide-react";

const EnvDashboard = () => {
  return (
    <section id="monitoring" className="py-16 bg-gradient-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Environmental Monitoring</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Track real-time conditions affecting your plants and receive smart alerts when action is needed.
          </p>
        </div>
        
        <div className="bg-card border rounded-xl shadow-lg overflow-hidden">
          <Tabs defaultValue="overview" className="w-full">
            <div className="border-b px-6">
              <TabsList className="bg-transparent">
                <TabsTrigger value="overview" className="data-[state=active]:bg-background">Overview</TabsTrigger>
                <TabsTrigger value="indoor" className="data-[state=active]:bg-background">Indoor Plants</TabsTrigger>
                <TabsTrigger value="outdoor" className="data-[state=active]:bg-background">Outdoor Garden</TabsTrigger>
                <TabsTrigger value="history" className="data-[state=active]:bg-background">History</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="overview" className="space-y-4 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { 
                    icon: <Thermometer className="h-6 w-6 text-orange-500" />,
                    label: "Temperature",
                    value: "24°C",
                    status: "Optimal",
                    statusColor: "text-plantguard-green",
                    progress: 65
                  },
                  {
                    icon: <Droplets className="h-6 w-6 text-blue-500" />,
                    label: "Humidity",
                    value: "58%",
                    status: "Optimal",
                    statusColor: "text-plantguard-green",
                    progress: 58
                  },
                  {
                    icon: <SunMedium className="h-6 w-6 text-amber-500" />,
                    label: "Light Level",
                    value: "Medium",
                    status: "Could be higher",
                    statusColor: "text-amber-500",
                    progress: 40
                  },
                  {
                    icon: <Droplets className="h-6 w-6 text-plantguard-blue" />,
                    label: "Soil Moisture",
                    value: "32%",
                    status: "Needs water soon",
                    statusColor: "text-amber-500",
                    progress: 32
                  }
                ].map((metric, index) => (
                  <Card key={index} className="shadow-sm">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="p-2 rounded-full bg-muted">
                          {metric.icon}
                        </div>
                        <span className="text-2xl font-medium">{metric.value}</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-sm font-medium">{metric.label}</CardTitle>
                          <CardDescription className={`text-xs ${metric.statusColor}`}>
                            {metric.status}
                          </CardDescription>
                        </div>
                        <Progress value={metric.progress} className="h-1.5" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Today's Forecast</CardTitle>
                  <CardDescription>May affect your outdoor plants</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-6 overflow-x-auto py-2">
                    {[
                      { time: "Now", temp: "23°C", icon: <SunMedium className="h-6 w-6 text-amber-500" /> },
                      { time: "10 AM", temp: "24°C", icon: <SunMedium className="h-6 w-6 text-amber-500" /> },
                      { time: "12 PM", temp: "26°C", icon: <SunMedium className="h-6 w-6 text-amber-500" /> },
                      { time: "2 PM", temp: "27°C", icon: <SunMedium className="h-6 w-6 text-amber-500" /> },
                      { time: "4 PM", temp: "25°C", icon: <Cloud className="h-6 w-6 text-gray-500" /> },
                      { time: "6 PM", temp: "22°C", icon: <Cloud className="h-6 w-6 text-gray-500" /> },
                      { time: "8 PM", temp: "20°C", icon: <Cloud className="h-6 w-6 text-gray-500" /> }
                    ].map((hourly, index) => (
                      <div key={index} className="text-center min-w-[60px]">
                        <div className="text-sm font-medium">{hourly.time}</div>
                        <div className="my-1">{hourly.icon}</div>
                        <div className="text-sm">{hourly.temp}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Plant Care Tasks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { plant: "Snake Plant", task: "Water", dueIn: "Today" },
                      { plant: "Monstera", task: "Mist leaves", dueIn: "Tomorrow" },
                      { plant: "Peace Lily", task: "Fertilize", dueIn: "3 days" }
                    ].map((task, index) => (
                      <div key={index} className="flex justify-between items-center border-b pb-3 last:border-0">
                        <div>
                          <div className="font-medium">{task.plant}</div>
                          <div className="text-sm text-muted-foreground">{task.task}</div>
                        </div>
                        <div className="text-sm">Due: {task.dueIn}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="indoor" className="p-6 text-center">
              <p className="text-muted-foreground">Select specific indoor plants to view detailed monitoring data.</p>
            </TabsContent>
            
            <TabsContent value="outdoor" className="p-6 text-center">
              <p className="text-muted-foreground">Select zones in your garden to view detailed environmental data.</p>
            </TabsContent>
            
            <TabsContent value="history" className="p-6 text-center">
              <p className="text-muted-foreground">View historical environmental data and trends over time.</p>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default EnvDashboard;
