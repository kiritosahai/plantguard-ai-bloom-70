
import React from "react";
import ResourceLayout from "@/components/ResourceLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";

const PlantLibrary = () => {
  // Sample plant data
  const plants = [
    {
      id: 1,
      name: "Monstera Deliciosa",
      image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?ixlib=rb-4.0.3",
      category: "Tropical",
      difficulty: "Easy",
      light: "Medium to Bright Indirect",
      water: "When top 2-3 inches of soil is dry",
    },
    {
      id: 2,
      name: "Snake Plant",
      image: "https://images.unsplash.com/photo-1572688484438-313a6e50c333?ixlib=rb-4.0.3",
      category: "Succulent",
      difficulty: "Very Easy",
      light: "Low to Bright Indirect",
      water: "When soil is completely dry",
    },
    {
      id: 3,
      name: "Peace Lily",
      image: "https://images.unsplash.com/photo-1620803366004-119b57f54cd6?ixlib=rb-4.0.3",
      category: "Tropical",
      difficulty: "Easy",
      light: "Low to Medium Indirect",
      water: "When leaves begin to droop",
    },
    {
      id: 4,
      name: "Fiddle Leaf Fig",
      image: "https://images.unsplash.com/photo-1595683213102-6eda71a699c2?ixlib=rb-4.0.3",
      category: "Tropical",
      difficulty: "Moderate",
      light: "Bright Indirect",
      water: "When top 1-2 inches of soil is dry",
    },
    {
      id: 5,
      name: "ZZ Plant",
      image: "https://images.unsplash.com/photo-1632321941437-64094cc73fef?ixlib=rb-4.0.3",
      category: "Tropical",
      difficulty: "Very Easy",
      light: "Low to Bright Indirect",
      water: "When soil is completely dry",
    },
    {
      id: 6,
      name: "Pothos",
      image: "https://images.unsplash.com/photo-1572969057162-d7ef9fd06702?ixlib=rb-4.0.3",
      category: "Tropical",
      difficulty: "Very Easy",
      light: "Low to Medium Indirect",
      water: "When top 1-2 inches of soil is dry",
    },
  ];

  return (
    <ResourceLayout 
      title="Plant Library"
      description="Explore our extensive collection of plant species and care guides"
    >
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search plants..." 
              className="pl-9"
            />
          </div>
          <Button variant="outline" className="flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-6">
          <Button size="sm" variant="secondary">All Plants</Button>
          <Button size="sm" variant="outline">Tropical</Button>
          <Button size="sm" variant="outline">Succulent</Button>
          <Button size="sm" variant="outline">Herb</Button>
          <Button size="sm" variant="outline">Flowering</Button>
          <Button size="sm" variant="outline">Cacti</Button>
          <Button size="sm" variant="outline">Beginner Friendly</Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {plants.map((plant) => (
          <Card key={plant.id} className="overflow-hidden">
            <div className="aspect-square relative">
              <img 
                src={plant.image} 
                alt={plant.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 bg-background/80 px-2 py-1 rounded text-xs font-medium">
                {plant.difficulty}
              </div>
            </div>
            <CardContent className="pt-4">
              <h3 className="font-semibold text-lg mb-2">{plant.name}</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category:</span>
                  <span>{plant.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Light:</span>
                  <span>{plant.light}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Water:</span>
                  <span className="text-right">{plant.water}</span>
                </div>
              </div>
              <Button variant="link" className="mt-2 p-0 h-auto">
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <Button>Load More Plants</Button>
      </div>
    </ResourceLayout>
  );
};

export default PlantLibrary;
