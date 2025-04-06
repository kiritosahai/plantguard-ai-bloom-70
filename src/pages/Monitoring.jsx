
import React, { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Thermometer, Droplets, SunDim, Wind, RefreshCw } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";

// Mock data for the charts
const generateHistoricalData = () => {
  return Array(24).fill(null).map((_, i) => {
    return {
      time: `${i}:00`,
      temperature: Math.round(65 + Math.random() * 15),
      humidity: Math.round(50 + Math.random() * 30),
      wind: Math.round(5 + Math.random() * 15),
    };
  });
};

const Monitoring = () => {
  const [liveData, setLiveData] = useState({
    temperature: 72,
    humidity: 65,
    light: 850,
    wind: 8
  });
  
  const [loading, setLoading] = useState(false);
  const [historicalData, setHistoricalData] = useState(generateHistoricalData());

  useEffect(() => {
    // Simulate live data updates
    const interval = setInterval(() => {
      setLiveData(prev => ({
        temperature: Math.max(65, Math.min(85, prev.temperature + (Math.random() - 0.5) * 2)),
        humidity: Math.max(40, Math.min(90, prev.humidity + (Math.random() - 0.5) * 3)),
        light: Math.max(600, Math.min(1200, prev.light + (Math.random() - 0.5) * 50)),
        wind: Math.max(3, Math.min(18, prev.wind + (Math.random() - 0.5) * 2)),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const refreshData = () => {
    setLoading(true);
    setTimeout(() => {
      setLiveData({
        temperature: Math.round(65 + Math.random() * 15),
        humidity: Math.round(50 + Math.random() * 30),
        light: Math.round(700 + Math.random() * 400),
        wind: Math.round(5 + Math.random() * 10)
      });
      setHistoricalData(generateHistoricalData());
      setLoading(false);
      toast({ 
        title: "Data refreshed",
        description: "Environmental monitoring data has been updated"
      });
    }, 1000);
  };

  const getStatusFromValue = (type, value) => {
    switch (type) {
      case 'temperature':
        return value < 68 ? "Low" : value > 78 ? "High" : "Optimal";
      case 'humidity':
        return value < 50 ? "Low" : value > 75 ? "High" : "Good";
      case 'wind':
        return value < 5 ? "Low" : value > 15 ? "High" : "Good";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow">
        <div className="py-16 bg-gradient-to-b from-white to-plantguard-blue-light/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold font-serif text-plantguard-green-dark mb-4">
                Environmental Monitoring
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Track and optimize growth conditions for your plants with our smart monitoring tools
              </p>
              
              <div className="mt-4">
                <Button 
                  onClick={refreshData} 
                  disabled={loading}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                  {loading ? "Refreshing..." : "Refresh Data"}
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                { title: "Temperature", icon: Thermometer, value: `${Math.round(liveData.temperature)}°F`, type: 'temperature', rawValue: liveData.temperature },
                { title: "Humidity", icon: Droplets, value: `${Math.round(liveData.humidity)}%`, type: 'humidity', rawValue: liveData.humidity },
                { title: "Light", icon: SunDim, value: `${Math.round(liveData.light)} lux`, type: 'light', rawValue: liveData.light },
                { title: "Airflow", icon: Wind, value: `${Math.round(liveData.wind)} mph`, type: 'wind', rawValue: liveData.wind }
              ].map((metric, index) => (
                <Card key={index} className="transition-all duration-300 hover:shadow-md">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg font-medium">{metric.title}</CardTitle>
                      <metric.icon className="h-5 w-5 text-plantguard-green" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold animate-pulse">{metric.value}</div>
                    <p className={`text-sm ${
                      getStatusFromValue(metric.type, metric.rawValue) === "Optimal" 
                        ? "text-green-600" 
                        : getStatusFromValue(metric.type, metric.rawValue) === "Good" 
                        ? "text-blue-600" 
                        : "text-amber-600"
                    }`}>
                      {getStatusFromValue(metric.type, metric.rawValue)}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border mb-12">
              <h2 className="text-2xl font-semibold mb-6">24-Hour History</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={historicalData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="temperature" stroke="#8884d8" name="Temperature (°F)" />
                    <Line yAxisId="left" type="monotone" dataKey="humidity" stroke="#82ca9d" name="Humidity (%)" />
                    <Line yAxisId="right" type="monotone" dataKey="wind" stroke="#ffc658" name="Wind (mph)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <h2 className="text-2xl font-semibold mb-4">Monitoring Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-medium mb-2">Real-time Data</h3>
                  <p className="text-muted-foreground">
                    Get continuous updates on environmental conditions affecting your plants with data refreshed every 5 seconds
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">Smart Alerts</h3>
                  <p className="text-muted-foreground">
                    Receive notifications when conditions fall outside optimal ranges for your specific plant varieties
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">Historical Analysis</h3>
                  <p className="text-muted-foreground">
                    Track trends over time to optimize your plant care routine and understand environmental patterns
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">AI Recommendations</h3>
                  <p className="text-muted-foreground">
                    Get personalized suggestions based on your specific plant species and their ideal growing conditions
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
