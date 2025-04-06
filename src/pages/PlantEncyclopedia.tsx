
import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Leaf, Search, Filter, AlertCircle } from "lucide-react";

// Mock data for plant encyclopedia
const plantData = [
  {
    id: 1,
    commonName: "Snake Plant",
    scientificName: "Sansevieria trifasciata",
    family: "Asparagaceae",
    origin: "West Africa",
    type: "Succulent",
    care: "Low maintenance, drought tolerant",
    environment: "Indirect light, temperatures 70-90°F",
    diseases: [
      { name: "Root Rot", symptoms: "Soft, brown roots; yellowing leaves", treatment: "Reduce watering, improve drainage" },
      { name: "Mealybugs", symptoms: "White cotton-like clusters", treatment: "Insecticidal soap, neem oil" }
    ]
  },
  {
    id: 2,
    commonName: "Peace Lily",
    scientificName: "Spathiphyllum wallisii",
    family: "Araceae",
    origin: "Tropical Americas",
    type: "Flowering perennial",
    care: "Moderate water, sensitive to chlorine",
    environment: "Low light, high humidity, temperatures 65-85°F",
    diseases: [
      { name: "Leaf Spot", symptoms: "Brown spots with yellow halos", treatment: "Remove affected leaves, avoid overhead watering" },
      { name: "Powdery Mildew", symptoms: "White powdery substance on leaves", treatment: "Improve air circulation, fungicidal spray" }
    ]
  },
  {
    id: 3,
    commonName: "Fiddle Leaf Fig",
    scientificName: "Ficus lyrata",
    family: "Moraceae",
    origin: "Western Africa",
    type: "Tree",
    care: "Consistent watering, sensitive to changes",
    environment: "Bright indirect light, temperatures 65-75°F",
    diseases: [
      { name: "Bacterial Leaf Spot", symptoms: "Dark brown spots with yellow edges", treatment: "Isolate plant, remove affected leaves" },
      { name: "Root Rot", symptoms: "Drooping leaves, brown spots", treatment: "Reduce watering, repot with fresh soil" }
    ]
  },
  {
    id: 4,
    commonName: "Monstera",
    scientificName: "Monstera deliciosa",
    family: "Araceae",
    origin: "Southern Mexico to Panama",
    type: "Vine/Climber",
    care: "Moderate water, likes humidity",
    environment: "Bright indirect light, temperatures 65-85°F",
    diseases: [
      { name: "Spider Mites", symptoms: "Fine webbing, stippled leaves", treatment: "Increase humidity, insecticidal soap" },
      { name: "Anthracnose", symptoms: "Brown lesions with yellow halos", treatment: "Remove affected areas, fungicidal treatment" }
    ]
  },
  {
    id: 5,
    commonName: "Pothos",
    scientificName: "Epipremnum aureum",
    family: "Araceae",
    origin: "Southeast Asia",
    type: "Vine",
    care: "Low maintenance, drought tolerant",
    environment: "Adaptable to various light conditions, temperatures 65-85°F",
    diseases: [
      { name: "Pythium Root Rot", symptoms: "Wilting, yellowing leaves", treatment: "Reduce watering, improve drainage" },
      { name: "Bacterial Leaf Spot", symptoms: "Dark, water-soaked spots", treatment: "Remove affected leaves, avoid overhead watering" }
    ]
  },
  {
    id: 6,
    commonName: "Aloe Vera",
    scientificName: "Aloe barbadensis miller",
    family: "Asphodelaceae",
    origin: "Arabian Peninsula",
    type: "Succulent",
    care: "Infrequent watering, well-draining soil",
    environment: "Bright direct to indirect light, temperatures 55-80°F",
    diseases: [
      { name: "Aloe Rust", symptoms: "Rusty-colored spots on leaves", treatment: "Improve air circulation, fungicidal spray" },
      { name: "Soft Rot", symptoms: "Mushy, water-soaked tissue", treatment: "Remove affected parts, reduce watering" }
    ]
  }
];

const PlantEncyclopedia = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedPlant, setSelectedPlant] = useState<any>(null);

  const filteredPlants = plantData.filter(plant => {
    const matchesSearch = 
      plant.commonName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      plant.scientificName.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    return matchesSearch && plant.type.toLowerCase() === activeTab.toLowerCase();
  });

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow">
        <div className="py-16 bg-gradient-to-b from-white to-plantguard-green-light/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold font-serif text-plantguard-green-dark mb-4">
                Plant Encyclopedia
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore our comprehensive database of plants with scientific information and care guides
              </p>
            </div>
            
            <div className="mb-8">
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by common or scientific name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="mt-4">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 md:max-w-2xl mx-auto">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="succulent">Succulents</TabsTrigger>
                    <TabsTrigger value="tree">Trees</TabsTrigger>
                    <TabsTrigger value="vine">Vines</TabsTrigger>
                    <TabsTrigger value="flowering perennial">Flowering</TabsTrigger>
                    <TabsTrigger value="herb">Herbs</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
            
            {selectedPlant ? (
              <div className="mb-8">
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedPlant(null)}
                  className="mb-4"
                >
                  Back to plant list
                </Button>
                
                <Card className="overflow-hidden">
                  <CardHeader className="bg-plantguard-green-light/20">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-muted-foreground">Scientific Name</p>
                        <CardTitle className="italic">{selectedPlant.scientificName}</CardTitle>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Common Name</p>
                        <p className="font-medium">{selectedPlant.commonName}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Botanical Information</h3>
                        <dl className="space-y-2">
                          <div className="flex justify-between">
                            <dt className="text-muted-foreground">Family:</dt>
                            <dd>{selectedPlant.family}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-muted-foreground">Origin:</dt>
                            <dd>{selectedPlant.origin}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-muted-foreground">Type:</dt>
                            <dd>{selectedPlant.type}</dd>
                          </div>
                        </dl>
                        
                        <h3 className="text-lg font-semibold mt-6 mb-2">Care Information</h3>
                        <dl className="space-y-2">
                          <div className="flex justify-between">
                            <dt className="text-muted-foreground">Care Level:</dt>
                            <dd>{selectedPlant.care}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-muted-foreground">Environment:</dt>
                            <dd>{selectedPlant.environment}</dd>
                          </div>
                        </dl>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-4 flex items-center">
                          <AlertCircle className="h-5 w-5 mr-2 text-amber-500" />
                          Common Diseases
                        </h3>
                        <div className="space-y-4">
                          {selectedPlant.diseases.map((disease: any, idx: number) => (
                            <div key={idx} className="border-l-2 border-plantguard-green pl-4 py-1">
                              <h4 className="font-medium">{disease.name}</h4>
                              <p className="text-sm text-muted-foreground mt-1">
                                <span className="font-medium">Symptoms:</span> {disease.symptoms}
                              </p>
                              <p className="text-sm text-muted-foreground mt-1">
                                <span className="font-medium">Treatment:</span> {disease.treatment}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPlants.length > 0 ? (
                  filteredPlants.map((plant) => (
                    <Card 
                      key={plant.id} 
                      className="cursor-pointer transition-all hover:shadow-md"
                      onClick={() => setSelectedPlant(plant)}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Leaf className="h-5 w-5 mr-2 text-plantguard-green" />
                            <CardTitle className="text-xl">{plant.commonName}</CardTitle>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="italic text-muted-foreground mb-2">
                          {plant.scientificName}
                        </p>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Type:</span>
                          <span>{plant.type}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Origin:</span>
                          <span>{plant.origin}</span>
                        </div>
                        <div className="mt-4 pt-2 border-t">
                          <p className="text-sm">{plant.care}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-full text-center py-10">
                    <p className="text-lg text-muted-foreground">No plants found matching your search criteria.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PlantEncyclopedia;
