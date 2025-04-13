
import React from "react";
import ResourceLayout from "@/components/ResourceLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, BookOpen, Leaf, Droplet, SunMedium, Thermometer } from "lucide-react";
import { Input } from "@/components/ui/input";

const PlantCareGuides = () => {
  // Sample care guide categories
  const categories = [
    { 
      icon: <Leaf className="h-10 w-10 text-plantguard-green" />,
      title: "By Plant Type",
      description: "Care guides organized by plant families and types"
    },
    { 
      icon: <Droplet className="h-10 w-10 text-blue-500" />,
      title: "Watering Guides",
      description: "Learn proper watering techniques for different plants"
    },
    { 
      icon: <SunMedium className="h-10 w-10 text-amber-500" />,
      title: "Light Requirements",
      description: "Understanding light needs for optimal growth"
    },
    { 
      icon: <Thermometer className="h-10 w-10 text-red-500" />,
      title: "Temperature & Humidity",
      description: "Creating the perfect environment for your plants"
    },
  ];

  // Sample featured guides
  const featuredGuides = [
    {
      id: 1,
      title: "The Complete Guide to Monstera Care",
      image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?ixlib=rb-4.0.3",
      level: "Beginner"
    },
    {
      id: 2,
      title: "Succulent Care: Tips & Tricks",
      image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?ixlib=rb-4.0.3",
      level: "Beginner"
    },
    {
      id: 3,
      title: "Caring for Orchids Year-Round",
      image: "https://images.unsplash.com/photo-1566907185042-c8be31ceecd0?ixlib=rb-4.0.3",
      level: "Intermediate"
    },
    {
      id: 4,
      title: "Bonsai Maintenance for Beginners",
      image: "https://images.unsplash.com/photo-1511234341606-507c1dd0915a?ixlib=rb-4.0.3",
      level: "Advanced"
    }
  ];

  return (
    <ResourceLayout 
      title="Plant Care Guides"
      description="Expert guides to keep your plants thriving year-round"
    >
      {/* Search Bar */}
      <div className="mb-10">
        <div className="bg-muted/50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Find Care Guides for Your Plants</h2>
          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search care guides by plant name..." 
              className="pl-9"
            />
          </div>
        </div>
      </div>
      
      {/* Guide Categories */}
      <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {categories.map((category, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="mb-4">
                {category.icon}
              </div>
              <h3 className="font-semibold text-lg mb-2">{category.title}</h3>
              <p className="text-muted-foreground text-sm mb-4">{category.description}</p>
              <Button variant="outline" className="w-full">View Guides</Button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Featured Guides */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Care Guides</h2>
          <Button variant="link" className="flex items-center">
            <BookOpen className="h-4 w-4 mr-2" />
            View All Guides
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredGuides.map((guide) => (
            <Card key={guide.id} className="overflow-hidden">
              <div className="aspect-[4/3] relative">
                <img 
                  src={guide.image} 
                  alt={guide.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-background/80 px-2 py-1 rounded text-xs font-medium">
                  {guide.level}
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">{guide.title}</h3>
                <Button variant="link" className="p-0 h-auto">Read Guide</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Seasonal Care */}
      <Card>
        <div className="grid md:grid-cols-2">
          <div className="aspect-auto md:aspect-auto relative">
            <img 
              src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07" 
              alt="Seasonal plant care" 
              className="w-full h-full object-cover"
            />
          </div>
          <CardContent className="p-6 flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-4">Seasonal Care Calendar</h2>
            <p className="mb-6">
              Plants need different care throughout the year. Follow our seasonal guides to adjust
              watering, light, fertilizing, and other care aspects as the seasons change.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <Button variant={new Date().getMonth() < 3 || new Date().getMonth() >= 9 ? "default" : "outline"}>
                Fall/Winter Care
              </Button>
              <Button variant={new Date().getMonth() >= 3 && new Date().getMonth() < 9 ? "default" : "outline"}>
                Spring/Summer Care
              </Button>
            </div>
          </CardContent>
        </div>
      </Card>
    </ResourceLayout>
  );
};

export default PlantCareGuides;
