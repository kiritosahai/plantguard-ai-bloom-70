
import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { FileImage, Camera, Loader2, Info, Droplet, Sprout, Sun } from "lucide-react";
import { useDiagnosis } from "@/context/DiagnosisContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/components/ui/use-toast";
import PlantHeroImg from "@/components/PlantHeroImg";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EmailSubscribe from "@/components/EmailSubscribe";

// Sample plant database with detailed information
const plantDatabase = [
  {
    commonName: "Money Plant",
    scientificName: "Epipremnum aureum",
    waterNeeds: "Moderate - Allow soil to dry between waterings",
    soilType: "Well-draining potting mix with peat moss",
    sunlight: "Bright indirect light; tolerates low light",
    careLevel: "Easy",
    images: [
      "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1620803366004-c73cb5352a6b?ixlib=rb-4.0.3"
    ]
  },
  {
    commonName: "Snake Plant",
    scientificName: "Sansevieria trifasciata",
    waterNeeds: "Low - Water sparingly, once every 2-3 weeks",
    soilType: "Cactus mix or well-draining sandy soil",
    sunlight: "Can tolerate low to bright indirect light",
    careLevel: "Very Easy",
    images: [
      "https://images.unsplash.com/photo-1593482892290-f54927ae2bb2?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1572688484438-313a6e50c333?ixlib=rb-4.0.3"
    ]
  },
  {
    commonName: "Peace Lily",
    scientificName: "Spathiphyllum wallisii",
    waterNeeds: "Medium to High - Keep soil consistently moist",
    soilType: "Rich, loose potting soil with good drainage",
    sunlight: "Low to medium indirect light",
    careLevel: "Moderate",
    images: [
      "https://images.unsplash.com/photo-1616690248299-bcd3fef06226?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1598880513691-3232a4595edd?ixlib=rb-4.0.3"
    ]
  },
  {
    commonName: "Monstera",
    scientificName: "Monstera deliciosa",
    waterNeeds: "Medium - Water when top inch of soil feels dry",
    soilType: "Rich, well-draining soil with peat moss",
    sunlight: "Bright indirect light",
    careLevel: "Easy to Moderate",
    images: [
      "https://images.unsplash.com/photo-1614594576054-edcc5d8afe14?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1632321584421-cf137f4a549d?ixlib=rb-4.0.3"
    ]
  },
  {
    commonName: "Rubber Plant",
    scientificName: "Ficus elastica",
    waterNeeds: "Medium - Allow top soil to dry between waterings",
    soilType: "Well-draining, nutrient-rich potting mix",
    sunlight: "Bright indirect light; some morning sun is beneficial",
    careLevel: "Easy",
    images: [
      "https://images.unsplash.com/photo-1606756790138-261d2b21cd75?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1652097749828-63d59b665018?ixlib=rb-4.0.3"
    ]
  }
];

const PlantIdentification = () => {
  const { triggerFileUpload, setUseCameraMode } = useDiagnosis();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [identifiedPlant, setIdentifiedPlant] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  const handleStartIdentification = (useCamera = false) => {
    setUseCameraMode(useCamera);
    
    toast({
      title: "Ready to identify",
      description: "Please select or take a clear photo of the plant",
      duration: 3000,
    });
    
    setTimeout(() => {
      triggerFileUpload(handleImageUpload);
    }, 100);
  };

  const handleImageUpload = (file) => {
    if (!file) return;
    
    // Create image preview
    const reader = new FileReader();
    reader.onload = (event) => {
      setImagePreview(event.target.result);
    };
    reader.readAsDataURL(file);
    
    // Start analysis
    setIdentifiedPlant(null);
    setIsAnalyzing(true);
    
    // Simulate AI analysis - in a real app, this would call an API
    setTimeout(() => {
      // Randomly select a plant from our database to simulate identification
      const randomPlant = plantDatabase[Math.floor(Math.random() * plantDatabase.length)];
      setIdentifiedPlant(randomPlant);
      setIsAnalyzing(false);
      
      toast({
        title: "Plant Identified!",
        description: `This appears to be a ${randomPlant.commonName} (${randomPlant.scientificName})`,
        duration: 5000,
      });
    }, 2500);
  };

  const resetIdentification = () => {
    setImagePreview(null);
    setIdentifiedPlant(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow">
        <div className="py-12 md:py-16 bg-gradient-to-b from-white to-plantguard-green-light/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {!identifiedPlant ? (
              <>
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
                  <div className="text-center md:text-left md:w-1/2">
                    <h1 className="text-3xl md:text-4xl font-bold font-serif text-plantguard-green-dark mb-4">
                      AI Plant Identification
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl">
                      Upload a photo or take a picture of any plant and our AI will identify it within seconds,
                      providing detailed care instructions for your green companion.
                    </p>
                  </div>
                  <div className="md:w-1/2 flex justify-center">
                    <PlantHeroImg />
                  </div>
                </div>

                <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-sm border mb-12">
                  <h2 className="text-xl font-semibold mb-4 text-center">Identify Your Plant</h2>
                  <p className="text-muted-foreground text-sm mb-4 text-center">
                    For best results, take a clear photo of the plant's leaves in good lighting
                  </p>
                  
                  {isAnalyzing && imagePreview && (
                    <div className="mb-6">
                      <div className="relative w-full h-48 mb-4">
                        <img 
                          src={imagePreview} 
                          alt="Plant preview" 
                          className="w-full h-full object-contain rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black/30 rounded-lg flex flex-col items-center justify-center">
                          <Loader2 className="h-8 w-8 text-white animate-spin mb-2" />
                          <p className="text-white font-medium">Analyzing plant...</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                    <Button 
                      size="lg" 
                      onClick={() => handleStartIdentification(false)}
                      className="h-14 text-base font-medium w-full sm:w-auto"
                      disabled={isAnalyzing}
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <FileImage className="mr-2 h-5 w-5" />
                          Upload Plant Image
                        </>
                      )}
                    </Button>
                    
                    {isMobile && (
                      <Button 
                        size="lg" 
                        variant="secondary"
                        onClick={() => handleStartIdentification(true)}
                        className="h-14 text-base font-medium w-full sm:w-auto"
                        disabled={isAnalyzing}
                      >
                        {isAnalyzing ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <Camera className="mr-2 h-5 w-5" />
                            Take Photo
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                  
                  {isAnalyzing && (
                    <div className="text-center text-sm text-muted-foreground mt-4">
                      Analyzing your plant image... Please wait a moment
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="mb-8">
                <Button
                  variant="outline"
                  onClick={resetIdentification}
                  className="mb-6"
                >
                  ← Identify another plant
                </Button>
                
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Plant Images Section */}
                  <div className="md:w-1/2">
                    <Card className="overflow-hidden">
                      <CardHeader className="bg-plantguard-green-light/20 pb-2">
                        <CardTitle>Your Plant</CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                          <div className="aspect-square overflow-hidden">
                            <img 
                              src={imagePreview || identifiedPlant.images[0]} 
                              alt={identifiedPlant.commonName} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          {identifiedPlant.images.map((img, index) => (
                            index < 3 && (
                              <div key={index} className="aspect-square overflow-hidden">
                                <img 
                                  src={img} 
                                  alt={`${identifiedPlant.commonName} ${index + 1}`} 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Plant Info Section */}
                  <div className="md:w-1/2">
                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex flex-col space-y-1.5">
                          <p className="text-sm text-muted-foreground">Plant Identified</p>
                          <CardTitle className="text-2xl">{identifiedPlant.commonName}</CardTitle>
                          <p className="text-plantguard-green italic">{identifiedPlant.scientificName}</p>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                          <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="care">Care Guide</TabsTrigger>
                            <TabsTrigger value="tips">Pro Tips</TabsTrigger>
                          </TabsList>
                          
                          <TabsContent value="overview" className="pt-4">
                            <div className="space-y-4">
                              <div className="p-4 bg-muted rounded-lg flex items-start">
                                <Sun className="h-5 w-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                                <div>
                                  <h4 className="font-medium">Sunlight Requirements</h4>
                                  <p className="text-sm text-muted-foreground">{identifiedPlant.sunlight}</p>
                                </div>
                              </div>
                              
                              <div className="p-4 bg-muted rounded-lg flex items-start">
                                <Droplet className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                                <div>
                                  <h4 className="font-medium">Water Requirements</h4>
                                  <p className="text-sm text-muted-foreground">{identifiedPlant.waterNeeds}</p>
                                </div>
                              </div>
                              
                              <div className="p-4 bg-muted rounded-lg flex items-start">
                                <Sprout className="h-5 w-5 text-plantguard-green mr-3 mt-0.5 flex-shrink-0" />
                                <div>
                                  <h4 className="font-medium">Soil Requirements</h4>
                                  <p className="text-sm text-muted-foreground">{identifiedPlant.soilType}</p>
                                </div>
                              </div>
                              
                              <div className="p-4 bg-muted rounded-lg flex items-start">
                                <Info className="h-5 w-5 text-indigo-500 mr-3 mt-0.5 flex-shrink-0" />
                                <div>
                                  <h4 className="font-medium">Care Level</h4>
                                  <p className="text-sm text-muted-foreground">{identifiedPlant.careLevel}</p>
                                </div>
                              </div>
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="care" className="pt-4">
                            <div className="space-y-4">
                              <div className="border-l-2 border-plantguard-green pl-4 py-2">
                                <h4 className="font-medium">Watering Schedule</h4>
                                <p className="text-sm text-muted-foreground">
                                  {identifiedPlant.waterNeeds}. Check the top inch of soil with your finger
                                  before watering. Adjust frequency based on humidity and temperature.
                                </p>
                              </div>
                              
                              <div className="border-l-2 border-plantguard-green pl-4 py-2">
                                <h4 className="font-medium">Soil & Fertilizer</h4>
                                <p className="text-sm text-muted-foreground">
                                  {identifiedPlant.soilType}. Fertilize with a balanced liquid fertilizer 
                                  diluted to half strength once a month during growing season (spring/summer).
                                </p>
                              </div>
                              
                              <div className="border-l-2 border-plantguard-green pl-4 py-2">
                                <h4 className="font-medium">Light Requirements</h4>
                                <p className="text-sm text-muted-foreground">
                                  {identifiedPlant.sunlight}. Rotate the plant occasionally for even growth.
                                  Watch for signs of inadequate light (leggy growth) or too much light (scorched leaves).
                                </p>
                              </div>
                              
                              <div className="border-l-2 border-plantguard-green pl-4 py-2">
                                <h4 className="font-medium">Temperature & Humidity</h4>
                                <p className="text-sm text-muted-foreground">
                                  Thrives in normal room temperatures (18-24°C). Keep away from cold drafts and sudden
                                  temperature changes. Provide humidity through misting or a pebble tray if needed.
                                </p>
                              </div>
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="tips" className="pt-4">
                            <div className="space-y-4">
                              <div className="p-4 border rounded-lg">
                                <h4 className="font-medium mb-2">Seasonal Care Tips</h4>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                  <li>• <span className="font-medium">Spring:</span> Begin regular fertilizing as growth resumes</li>
                                  <li>• <span className="font-medium">Summer:</span> Monitor watering needs closely as they may increase</li>
                                  <li>• <span className="font-medium">Fall:</span> Reduce fertilizing as growth slows down</li>
                                  <li>• <span className="font-medium">Winter:</span> Water less frequently and protect from cold drafts</li>
                                </ul>
                              </div>
                              
                              <div className="p-4 border rounded-lg">
                                <h4 className="font-medium mb-2">Common Issues</h4>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                  <li>• <span className="font-medium">Yellow leaves:</span> Often indicates overwatering</li>
                                  <li>• <span className="font-medium">Brown leaf tips:</span> Could be low humidity or mineral buildup</li>
                                  <li>• <span className="font-medium">Drooping:</span> Check for underwatering or temperature stress</li>
                                  <li>• <span className="font-medium">Pests:</span> Regularly inspect for spider mites, mealybugs, and scale</li>
                                </ul>
                              </div>
                              
                              <div className="p-4 border rounded-lg">
                                <h4 className="font-medium mb-2">Propagation</h4>
                                <p className="text-sm text-muted-foreground">
                                  This plant can be propagated through stem cuttings placed in water or soil. 
                                  Best done during the growing season for higher success rates.
                                </p>
                              </div>
                            </div>
                          </TabsContent>
                        </Tabs>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                <div className="mt-8">
                  <EmailSubscribe />
                </div>
              </div>
            )}
            
            {!identifiedPlant && (
              <div className="mt-16 p-6 border rounded-xl bg-white shadow-sm">
                <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-plantguard-green-light/20 rounded-full flex items-center justify-center mb-4">
                      <span className="text-2xl font-bold text-plantguard-green">1</span>
                    </div>
                    <h3 className="font-medium mb-2">Upload a Photo</h3>
                    <p className="text-muted-foreground">Take a clear photo of the plant you want to identify</p>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-plantguard-green-light/20 rounded-full flex items-center justify-center mb-4">
                      <span className="text-2xl font-bold text-plantguard-green">2</span>
                    </div>
                    <h3 className="font-medium mb-2">AI Analysis</h3>
                    <p className="text-muted-foreground">Our advanced AI analyzes the image to identify the plant species</p>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-plantguard-green-light/20 rounded-full flex items-center justify-center mb-4">
                      <span className="text-2xl font-bold text-plantguard-green">3</span>
                    </div>
                    <h3 className="font-medium mb-2">Get Detailed Results</h3>
                    <p className="text-muted-foreground">Receive complete care instructions tailored to your identified plant</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PlantIdentification;
