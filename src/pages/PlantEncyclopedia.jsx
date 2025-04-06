
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
    care: "Moderate watering, prefers humidity",
    environment: "Low to bright indirect light, 65-85°F",
    diseases: [
      { name: "Leaf Spot", symptoms: "Brown/black spots on leaves", treatment: "Remove affected leaves, avoid overhead watering" },
      { name: "Spider Mites", symptoms: "Fine webbing, stippled leaves", treatment: "Increase humidity, insecticidal soap" }
    ]
  },
  {
    id: 3,
    commonName: "Fiddle Leaf Fig",
    scientificName: "Ficus lyrata",
    family: "Moraceae",
    origin: "Western Africa",
    type: "Tree",
    care: "Consistent watering, prone to stress",
    environment: "Bright indirect light, 65-75°F",
    diseases: [
      { name: "Bacterial Leaf Spot", symptoms: "Dark brown spots with yellow halos", treatment: "Improve air circulation, reduce humidity" },
      { name: "Root Rot", symptoms: "Drooping leaves, mushy stems", treatment: "Repot with fresh soil, reduce watering" }
    ]
  },
  {
    id: 4,
    commonName: "Pothos",
    scientificName: "Epipremnum aureum",
    family: "Araceae",
    origin: "Southeast Asia",
    type: "Vine",
    care: "Low maintenance, allow soil to dry between watering",
    environment: "Adaptable to various light conditions, 65-85°F",
    diseases: [
      { name: "Bacterial Wilt", symptoms: "Wilting despite moist soil", treatment: "Remove infected plants, sterilize tools" },
      { name: "Leaf Spot", symptoms: "Yellow/brown spots on leaves", treatment: "Remove affected leaves, improve air circulation" }
    ]
  }
];

const PlantEncyclopedia = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedPlant, setSelectedPlant] = useState(null);

  // Filter plants based on search term and selected tab
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
                Explore our comprehensive database of plant species, care guides, and disease information
              </p>
            </div>
            
            <div className="mb-8">
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input 
                  type="search" 
                  placeholder="Search plants by name..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
              <div className="flex justify-center">
                <TabsList>
                  <TabsTrigger value="all">All Types</TabsTrigger>
                  <TabsTrigger value="succulent">Succulents</TabsTrigger>
                  <TabsTrigger value="tree">Trees</TabsTrigger>
                  <TabsTrigger value="vine">Vines</TabsTrigger>
                  <TabsTrigger value="flowering perennial">Flowering</TabsTrigger>
                </TabsList>
              </div>
            </Tabs>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {filteredPlants.length > 0 ? filteredPlants.map(plant => (
                <Card 
                  key={plant.id} 
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setSelectedPlant(plant)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{plant.commonName}</CardTitle>
                        <p className="text-sm italic text-muted-foreground">{plant.scientificName}</p>
                      </div>
                      <div className="bg-plantguard-green-light/20 p-2 rounded-full">
                        <Leaf className="h-5 w-5 text-plantguard-green" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-muted-foreground">Family</p>
                        <p>{plant.family}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Type</p>
                        <p>{plant.type}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-muted-foreground">Care</p>
                        <p>{plant.care}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )) : (
                <div className="col-span-full text-center py-8">
                  <div className="flex justify-center mb-4">
                    <Search className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium">No plants found</h3>
                  <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
                </div>
              )}
            </div>
            
            {selectedPlant && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <Card className="w-full max-w-2xl max-h-[80vh] overflow-auto">
                  <CardHeader className="border-b">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl">{selectedPlant.commonName}</CardTitle>
                        <p className="text-sm italic text-muted-foreground">{selectedPlant.scientificName}</p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0" 
                        onClick={() => setSelectedPlant(null)}
                      >
                        &times;
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-medium mb-2">Details</h3>
                        <dl className="space-y-2">
                          <div>
                            <dt className="text-muted-foreground text-sm">Family</dt>
                            <dd>{selectedPlant.family}</dd>
                          </div>
                          <div>
                            <dt className="text-muted-foreground text-sm">Origin</dt>
                            <dd>{selectedPlant.origin}</dd>
                          </div>
                          <div>
                            <dt className="text-muted-foreground text-sm">Type</dt>
                            <dd>{selectedPlant.type}</dd>
                          </div>
                        </dl>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-2">Care Guide</h3>
                        <dl className="space-y-2">
                          <div>
                            <dt className="text-muted-foreground text-sm">Basic Care</dt>
                            <dd>{selectedPlant.care}</dd>
                          </div>
                          <div>
                            <dt className="text-muted-foreground text-sm">Environment</dt>
                            <dd>{selectedPlant.environment}</dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-3">Common Diseases</h3>
                      <div className="space-y-4">
                        {selectedPlant.diseases.map((disease, index) => (
                          <div key={index} className="border rounded-lg p-4">
                            <div className="flex items-center mb-2">
                              <AlertCircle className="h-4 w-4 text-yellow-500 mr-2" />
                              <h4 className="font-medium">{disease.name}</h4>
                            </div>
                            <div className="text-sm space-y-1">
                              <div>
                                <span className="text-muted-foreground">Symptoms:</span> {disease.symptoms}
                              </div>
                              <div>
                                <span className="text-muted-foreground">Treatment:</span> {disease.treatment}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
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
