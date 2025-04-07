
import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Leaf, Search, Filter, AlertCircle, Droplet, Sun, Sprout } from "lucide-react";

// Enhanced mock data for plant encyclopedia with more detailed information
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
    waterNeeds: "Low - Water sparingly, once every 2-3 weeks",
    soilType: "Cactus mix or well-draining sandy soil with 30% perlite",
    fertilizer: "Apply diluted balanced fertilizer once every 3 months",
    propagation: "Division or leaf cuttings",
    toxicity: "Mildly toxic to pets if ingested",
    images: [
      "https://images.unsplash.com/photo-1593482892290-f54927ae2bb2?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1572688484438-313a6e50c333?ixlib=rb-4.0.3"
    ],
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
    waterNeeds: "Medium to High - Keep soil consistently moist but not soggy",
    soilType: "Rich, loose potting soil with peat moss and perlite for drainage",
    fertilizer: "Balanced liquid fertilizer monthly during growing season",
    propagation: "Division during repotting",
    toxicity: "Toxic to cats and dogs if ingested",
    images: [
      "https://images.unsplash.com/photo-1616690248299-bcd3fef06226?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1598880513691-3232a4595edd?ixlib=rb-4.0.3"
    ],
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
    waterNeeds: "Medium - Allow top inch of soil to dry between waterings",
    soilType: "Well-draining potting mix with peat moss and perlite",
    fertilizer: "Diluted liquid fertilizer monthly during growing season",
    propagation: "Stem cuttings or air layering",
    toxicity: "Mildly toxic to pets if ingested",
    images: [
      "https://images.unsplash.com/photo-1508022713622-df2d8fb7b4cd?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1604762524889-3e2fcc145683?ixlib=rb-4.0.3"
    ],
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
    waterNeeds: "Low to Medium - Allow soil to dry out between waterings",
    soilType: "Standard potting mix with good drainage",
    fertilizer: "Balanced liquid fertilizer every 2-3 months",
    propagation: "Stem cuttings in water or soil",
    toxicity: "Toxic to pets if ingested",
    images: [
      "https://images.unsplash.com/photo-1614594576054-edcc5d8afe14?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1637967886120-ffafcbc889a7?ixlib=rb-4.0.3"
    ],
    diseases: [
      { name: "Bacterial Wilt", symptoms: "Wilting despite moist soil", treatment: "Remove infected plants, sterilize tools" },
      { name: "Leaf Spot", symptoms: "Yellow/brown spots on leaves", treatment: "Remove affected leaves, improve air circulation" }
    ]
  },
  {
    id: 5,
    commonName: "Monstera",
    scientificName: "Monstera deliciosa",
    family: "Araceae",
    origin: "Southern Mexico to Panama",
    type: "Vine/Climber",
    care: "Moderate water, likes humidity",
    environment: "Bright indirect light, temperatures 65-85°F",
    waterNeeds: "Medium - Allow top 1-2 inches of soil to dry between waterings",
    soilType: "Rich, well-draining potting mix with peat moss and perlite",
    fertilizer: "Balanced liquid fertilizer monthly during growing season (spring/summer)",
    propagation: "Stem cuttings with nodes, air layering",
    toxicity: "Toxic to pets if ingested",
    images: [
      "https://images.unsplash.com/photo-1614594576054-edcc5d8afe14?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1632321584421-cf137f4a549d?ixlib=rb-4.0.3"
    ],
    diseases: [
      { name: "Spider Mites", symptoms: "Fine webbing, stippled leaves", treatment: "Increase humidity, insecticidal soap" },
      { name: "Anthracnose", symptoms: "Brown lesions with yellow halos", treatment: "Remove affected areas, fungicidal treatment" }
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
    waterNeeds: "Low - Allow soil to completely dry between waterings",
    soilType: "Cactus mix or regular potting soil with added sand and perlite",
    fertilizer: "Diluted cactus fertilizer once in spring",
    propagation: "Offsets/pups separation",
    toxicity: "Non-toxic to humans, mildly toxic to pets",
    images: [
      "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?ixlib=rb-4.0.3"
    ],
    diseases: [
      { name: "Aloe Rust", symptoms: "Rusty-colored spots on leaves", treatment: "Improve air circulation, fungicidal spray" },
      { name: "Soft Rot", symptoms: "Mushy, water-soaked tissue", treatment: "Remove affected parts, reduce watering" }
    ]
  },
  {
    id: 7,
    commonName: "Rubber Plant",
    scientificName: "Ficus elastica",
    family: "Moraceae",
    origin: "Southeast Asia",
    type: "Tree",
    care: "Moderate watering, clean leaves occasionally",
    environment: "Bright indirect light, temperatures 60-80°F",
    waterNeeds: "Medium - Allow top inch of soil to dry between waterings",
    soilType: "Well-draining, nutrient-rich potting mix with peat moss",
    fertilizer: "Balanced liquid fertilizer monthly during growing season",
    propagation: "Stem cuttings or air layering",
    toxicity: "Mildly toxic to pets if ingested",
    images: [
      "https://images.unsplash.com/photo-1606756790138-261d2b21cd75?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1652097749828-63d59b665018?ixlib=rb-4.0.3"
    ],
    diseases: [
      { name: "Scale Insects", symptoms: "Small brown bumps on stems and leaves", treatment: "Neem oil, insecticidal soap" },
      { name: "Leaf Spot", symptoms: "Brown spots with yellow halos", treatment: "Improve air circulation, remove affected leaves" }
    ]
  },
  {
    id: 8,
    commonName: "ZZ Plant",
    scientificName: "Zamioculcas zamiifolia",
    family: "Araceae",
    origin: "Eastern Africa",
    type: "Tropical perennial",
    care: "Very low maintenance, drought tolerant",
    environment: "Low to bright indirect light, temperatures 65-85°F",
    waterNeeds: "Very Low - Allow soil to dry completely between waterings",
    soilType: "Well-draining potting mix with perlite or sand",
    fertilizer: "Diluted balanced fertilizer quarterly",
    propagation: "Leaf cuttings or division",
    toxicity: "Toxic to pets and humans if ingested",
    images: [
      "https://images.unsplash.com/photo-1632321508100-6c1dbfbd5c0e?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?ixlib=rb-4.0.3"
    ],
    diseases: [
      { name: "Root Rot", symptoms: "Yellowing leaves, mushy stems at soil line", treatment: "Reduce watering, improve drainage" },
      { name: "Mealybugs", symptoms: "White cottony masses on stems or leaves", treatment: "Wipe with alcohol, insecticidal soap" }
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
                  placeholder="Search plants by common or scientific name..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
              <div className="flex justify-center overflow-x-auto pb-2">
                <TabsList>
                  <TabsTrigger value="all">All Types</TabsTrigger>
                  <TabsTrigger value="succulent">Succulents</TabsTrigger>
                  <TabsTrigger value="tree">Trees</TabsTrigger>
                  <TabsTrigger value="vine">Vines</TabsTrigger>
                  <TabsTrigger value="flowering perennial">Flowering</TabsTrigger>
                  <TabsTrigger value="tropical perennial">Tropical</TabsTrigger>
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
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-muted">
                      <div className="flex items-start space-x-2">
                        <Droplet className="h-4 w-4 text-blue-500 mt-0.5" />
                        <div>
                          <p className="font-medium text-sm">Water Needs</p>
                          <p className="text-xs text-muted-foreground">{plant.waterNeeds.split(' - ')[0]}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-2 flex items-start space-x-2">
                      <Sprout className="h-4 w-4 text-plantguard-green mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Soil Type</p>
                        <p className="text-xs text-muted-foreground truncate">{plant.soilType.split(' with ')[0]}...</p>
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
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
                <Card className="w-full max-w-4xl max-h-[90vh] overflow-auto">
                  <CardHeader className="border-b sticky top-0 bg-white z-10">
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
                  <CardContent className="p-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                      <div className="grid grid-cols-2 gap-1">
                        {selectedPlant.images.map((img, idx) => (
                          <div key={idx} className="aspect-square overflow-hidden">
                            <img 
                              src={img} 
                              alt={`${selectedPlant.commonName} ${idx + 1}`} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                      
                      <div className="p-6">
                        <Tabs defaultValue="info">
                          <TabsList className="w-full grid grid-cols-3">
                            <TabsTrigger value="info">Plant Info</TabsTrigger>
                            <TabsTrigger value="care">Care Guide</TabsTrigger>
                            <TabsTrigger value="diseases">Diseases</TabsTrigger>
                          </TabsList>
                          
                          <TabsContent value="info" className="pt-4">
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-muted-foreground text-sm">Family</p>
                                  <p className="font-medium">{selectedPlant.family}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground text-sm">Origin</p>
                                  <p className="font-medium">{selectedPlant.origin}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground text-sm">Type</p>
                                  <p className="font-medium">{selectedPlant.type}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground text-sm">Propagation</p>
                                  <p className="font-medium">{selectedPlant.propagation}</p>
                                </div>
                              </div>
                              
                              <div>
                                <p className="text-muted-foreground text-sm">Environment</p>
                                <p className="font-medium">{selectedPlant.environment}</p>
                              </div>
                              
                              <div>
                                <p className="text-muted-foreground text-sm">Toxicity</p>
                                <p className="font-medium">{selectedPlant.toxicity}</p>
                              </div>
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="care" className="pt-4">
                            <div className="space-y-4">
                              <div className="flex items-start space-x-3 bg-muted/30 p-3 rounded-lg">
                                <div className="bg-blue-100 p-2 rounded-full">
                                  <Droplet className="h-5 w-5 text-blue-500" />
                                </div>
                                <div>
                                  <h4 className="font-medium">Water Requirements</h4>
                                  <p className="text-muted-foreground text-sm mt-1">{selectedPlant.waterNeeds}</p>
                                </div>
                              </div>
                              
                              <div className="flex items-start space-x-3 bg-muted/30 p-3 rounded-lg">
                                <div className="bg-amber-100 p-2 rounded-full">
                                  <Sun className="h-5 w-5 text-amber-500" />
                                </div>
                                <div>
                                  <h4 className="font-medium">Light Requirements</h4>
                                  <p className="text-muted-foreground text-sm mt-1">{selectedPlant.environment.split(',')[0]}</p>
                                </div>
                              </div>
                              
                              <div className="flex items-start space-x-3 bg-muted/30 p-3 rounded-lg">
                                <div className="bg-green-100 p-2 rounded-full">
                                  <Sprout className="h-5 w-5 text-green-500" />
                                </div>
                                <div>
                                  <h4 className="font-medium">Soil Requirements</h4>
                                  <p className="text-muted-foreground text-sm mt-1">{selectedPlant.soilType}</p>
                                </div>
                              </div>
                              
                              <div className="flex items-start space-x-3 bg-muted/30 p-3 rounded-lg">
                                <div className="bg-purple-100 p-2 rounded-full">
                                  <Leaf className="h-5 w-5 text-purple-500" />
                                </div>
                                <div>
                                  <h4 className="font-medium">Fertilizer</h4>
                                  <p className="text-muted-foreground text-sm mt-1">{selectedPlant.fertilizer}</p>
                                </div>
                              </div>
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="diseases" className="pt-4">
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
                              
                              <div className="bg-muted/30 p-4 rounded-lg mt-4">
                                <h4 className="font-medium text-sm mb-2">Prevention Tips</h4>
                                <ul className="text-sm space-y-1 text-muted-foreground">
                                  <li>• Maintain proper watering schedule and avoid overwatering</li>
                                  <li>• Ensure good air circulation around plants</li>
                                  <li>• Regularly inspect plants for early signs of pests or disease</li>
                                  <li>• Clean tools between plants to prevent spread of pathogens</li>
                                  <li>• Isolate new plants before introducing to your collection</li>
                                </ul>
                              </div>
                            </div>
                          </TabsContent>
                        </Tabs>
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
