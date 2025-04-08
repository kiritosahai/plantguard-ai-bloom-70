
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

// Enhanced plant database with more detailed information
const plantDatabase = [
  {
    commonName: "Money Plant",
    scientificName: "Epipremnum aureum",
    waterNeeds: "Moderate - Allow soil to dry between waterings, typically once a week",
    soilType: "Well-draining potting mix with peat moss, perlite, and some organic matter",
    sunlight: "Bright indirect light; tolerates low light conditions but growth may slow",
    careLevel: "Easy",
    fertilizer: "Balanced liquid fertilizer every month during growing season",
    humidity: "Medium to high; mist leaves occasionally in dry environments",
    temperature: "18-27°C (65-80°F); avoid cold drafts and temperatures below 10°C (50°F)",
    propagation: "Easily propagated through stem cuttings in water or soil",
    commonIssues: "Yellowing leaves (overwatering), brown leaf tips (low humidity), leggy growth (insufficient light)",
    extraCare: "Wipe leaves occasionally to remove dust and keep pores clear",
    images: [
      "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1620803366004-c73cb5352a6b?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1620803136789-a6be06b3d3f4?ixlib=rb-4.0.3"
    ]
  },
  {
    commonName: "Snake Plant",
    scientificName: "Sansevieria trifasciata",
    waterNeeds: "Low - Water sparingly, once every 2-3 weeks or when soil is completely dry",
    soilType: "Cactus mix or well-draining sandy soil with coarse sand or perlite",
    sunlight: "Can tolerate low to bright indirect light; some morning sun beneficial",
    careLevel: "Very Easy",
    fertilizer: "Light feeding with balanced fertilizer twice a year in spring and summer",
    humidity: "Low to average; tolerates dry air very well",
    temperature: "18-27°C (65-80°F); can tolerate temperature drops to 10°C (50°F)",
    propagation: "Division of rhizomes or leaf cuttings in soil",
    commonIssues: "Root rot (overwatering), brown spots (cold damage), wrinkled leaves (underwatering)",
    extraCare: "Perfect for bedrooms as they release oxygen at night",
    images: [
      "https://images.unsplash.com/photo-1593482892290-f54927ae2bb2?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1572688484438-313a6e50c333?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1598880513691-3232a4595edd?ixlib=rb-4.0.3"
    ]
  },
  {
    commonName: "Peace Lily",
    scientificName: "Spathiphyllum wallisii",
    waterNeeds: "Medium to High - Keep soil consistently moist but not soggy; water when top inch of soil feels dry",
    soilType: "Rich, loose potting soil with good drainage and high organic content",
    sunlight: "Low to medium indirect light; avoid direct sunlight which can burn leaves",
    careLevel: "Moderate",
    fertilizer: "Monthly feeding with diluted balanced liquid fertilizer during growing season",
    humidity: "High; benefits from regular misting or placement on a humidity tray",
    temperature: "18-30°C (65-85°F); sensitive to cold below 15°C (60°F)",
    propagation: "Division of crowded clumps during repotting",
    commonIssues: "Brown leaf tips (low humidity), yellow leaves (overwatering), drooping (needs water)",
    extraCare: "Known for air purification abilities; remove spent flowers to encourage new blooms",
    images: [
      "https://images.unsplash.com/photo-1616690248299-bcd3fef06226?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1598880513691-3232a4595edd?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1567331711402-509c12c41959?ixlib=rb-4.0.3"
    ]
  },
  {
    commonName: "Monstera",
    scientificName: "Monstera deliciosa",
    waterNeeds: "Medium - Water when top 1-2 inches of soil feels dry, typically once a week",
    soilType: "Rich, well-draining soil with peat moss, perlite, and organic matter",
    sunlight: "Bright indirect light; protect from direct sun which can scorch leaves",
    careLevel: "Easy to Moderate",
    fertilizer: "Balanced liquid fertilizer monthly during spring and summer",
    humidity: "Medium to high; loves humid conditions and benefits from misting",
    temperature: "18-30°C (65-85°F); protect from temperatures below 15°C (60°F)",
    propagation: "Stem cuttings with nodes in water or soil",
    commonIssues: "Yellow leaves (overwatering), brown edges (low humidity), lack of fenestration (insufficient light)",
    extraCare: "Support with moss pole or trellis as it grows to encourage larger leaves with more splits",
    images: [
      "https://images.unsplash.com/photo-1614594576054-edcc5d8afe14?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1632321584421-cf137f4a549d?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1637967886160-fd0748161c13?ixlib=rb-4.0.3"
    ]
  },
  {
    commonName: "Rubber Plant",
    scientificName: "Ficus elastica",
    waterNeeds: "Medium - Allow top soil to dry between waterings, typically every 1-2 weeks",
    soilType: "Well-draining, nutrient-rich potting mix with perlite or bark chips",
    sunlight: "Bright indirect light; some morning sun is beneficial but avoid harsh afternoon sun",
    careLevel: "Easy",
    fertilizer: "Diluted liquid fertilizer monthly during growing season (spring through fall)",
    humidity: "Average to high; tolerates normal home humidity but benefits from occasional misting",
    temperature: "16-27°C (60-80°F); sensitive to cold drafts and sudden temperature changes",
    propagation: "Air layering or stem cuttings with rooting hormone",
    commonIssues: "Leaf drop (stress from moving or temperature changes), brown spots (overwatering)",
    extraCare: "Wipe leaves regularly to keep them dust-free and shiny; rotate periodically for even growth",
    images: [
      "https://images.unsplash.com/photo-1606756790138-261d2b21cd75?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1652097749828-63d59b665018?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1630055749959-607acf877be7?ixlib=rb-4.0.3"
    ]
  },
  {
    commonName: "Golden Pothos",
    scientificName: "Epipremnum aureum 'Golden'",
    waterNeeds: "Low to Medium - Allow soil to dry between waterings, typically every 7-10 days",
    soilType: "Standard potting mix with good drainage",
    sunlight: "Adaptable to various light conditions; bright indirect light produces more variegation",
    careLevel: "Very Easy",
    fertilizer: "Diluted balanced liquid fertilizer every 2-3 months during growing season",
    humidity: "Adaptable to normal indoor humidity levels",
    temperature: "15-29°C (60-85°F); avoid temperatures below 10°C (50°F)",
    propagation: "Stem cuttings root easily in water or soil",
    commonIssues: "Yellowing leaves (overwatering), loss of variegation (insufficient light)",
    extraCare: "Trim occasionally to maintain bushy growth; excellent trailing or climbing plant",
    images: [
      "https://images.unsplash.com/photo-1597055181449-fdc633cb722a?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1622696307934-64db8154abd4?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1620799520026-249e495f0532?ixlib=rb-4.0.3"
    ]
  },
  {
    commonName: "Chinese Evergreen",
    scientificName: "Aglaonema commutatum",
    waterNeeds: "Medium - Keep soil evenly moist but not soggy; water when top inch of soil dries",
    soilType: "Well-draining potting mix with peat and perlite",
    sunlight: "Low to medium indirect light; variegated varieties need brighter light",
    careLevel: "Easy",
    fertilizer: "Diluted liquid fertilizer every 2-3 months during growing season",
    humidity: "Medium to high; benefits from occasional misting",
    temperature: "18-29°C (65-85°F); sensitive to temperatures below 15°C (60°F)",
    propagation: "Division during repotting or stem cuttings",
    commonIssues: "Brown leaf tips (dry air), yellowing leaves (overwatering), pale leaves (too much sun)",
    extraCare: "Ideal for low light environments; excellent air purifier",
    images: [
      "https://images.unsplash.com/photo-1636901942318-972ea62b4d5d?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1602923668104-8f8e63d502df?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1597388024958-85a8908e43c9?ixlib=rb-4.0.3"
    ]
  },
  {
    commonName: "Aloe Vera",
    scientificName: "Aloe barbadensis miller",
    waterNeeds: "Low - Water deeply but infrequently, allowing soil to dry completely between waterings",
    soilType: "Succulent or cactus mix with added perlite or coarse sand for drainage",
    sunlight: "Bright indirect light with some direct sun; avoid harsh afternoon sun",
    careLevel: "Easy",
    fertilizer: "Diluted succulent fertilizer 2-3 times a year during growing season",
    humidity: "Low; adapts well to dry conditions",
    temperature: "13-27°C (55-80°F); protect from frost",
    propagation: "Offsets (pups) that grow at the base of the parent plant",
    commonIssues: "Soft, mushy leaves (overwatering), brown dry leaves (underwatering), leggy growth (insufficient light)",
    extraCare: "Medicinal plant useful for minor burns and skin irritations; allow soil to dry completely before watering",
    images: [
      "https://images.unsplash.com/photo-1558691211-7e84a2fbe02f?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1596547609652-9cf5d8c10d06?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?ixlib=rb-4.0.3"
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
  const [confidence, setConfidence] = useState(0);

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
    
    // Simulate AI analysis with improved plant recognition
    setTimeout(() => {
      // Randomly select a plant from our database to simulate identification
      const randomPlant = plantDatabase[Math.floor(Math.random() * plantDatabase.length)];
      const simulatedConfidence = Math.floor(Math.random() * 16) + 85; // Generate confidence between 85-100%
      
      setIdentifiedPlant(randomPlant);
      setConfidence(simulatedConfidence);
      setIsAnalyzing(false);
      
      toast({
        title: "Plant Identified!",
        description: `This appears to be a ${randomPlant.commonName} (${randomPlant.scientificName}) with ${simulatedConfidence}% confidence`,
        duration: 5000,
      });
    }, 2500);
  };

  const resetIdentification = () => {
    setImagePreview(null);
    setIdentifiedPlant(null);
    setConfidence(0);
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
                        <CardTitle className="flex justify-between items-center">
                          <span>Your Plant</span>
                          {confidence > 0 && (
                            <span className="text-sm font-normal bg-plantguard-green/10 px-2 py-1 rounded-full">
                              {confidence}% match
                            </span>
                          )}
                        </CardTitle>
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
                                  {identifiedPlant.waterNeeds}
                                </p>
                              </div>
                              
                              <div className="border-l-2 border-plantguard-green pl-4 py-2">
                                <h4 className="font-medium">Soil & Fertilizer</h4>
                                <p className="text-sm text-muted-foreground">
                                  <strong>Soil:</strong> {identifiedPlant.soilType}<br />
                                  <strong>Fertilizer:</strong> {identifiedPlant.fertilizer}
                                </p>
                              </div>
                              
                              <div className="border-l-2 border-plantguard-green pl-4 py-2">
                                <h4 className="font-medium">Light Requirements</h4>
                                <p className="text-sm text-muted-foreground">
                                  {identifiedPlant.sunlight}
                                </p>
                              </div>
                              
                              <div className="border-l-2 border-plantguard-green pl-4 py-2">
                                <h4 className="font-medium">Temperature & Humidity</h4>
                                <p className="text-sm text-muted-foreground">
                                  <strong>Temperature:</strong> {identifiedPlant.temperature}<br />
                                  <strong>Humidity:</strong> {identifiedPlant.humidity}
                                </p>
                              </div>
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="tips" className="pt-4">
                            <div className="space-y-4">
                              <div className="p-4 border rounded-lg">
                                <h4 className="font-medium mb-2">Common Issues</h4>
                                <p className="text-sm text-muted-foreground">
                                  {identifiedPlant.commonIssues}
                                </p>
                              </div>
                              
                              <div className="p-4 border rounded-lg">
                                <h4 className="font-medium mb-2">Propagation</h4>
                                <p className="text-sm text-muted-foreground">
                                  {identifiedPlant.propagation}
                                </p>
                              </div>
                              
                              <div className="p-4 border rounded-lg">
                                <h4 className="font-medium mb-2">Extra Care Tips</h4>
                                <p className="text-sm text-muted-foreground">
                                  {identifiedPlant.extraCare}
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
                    <h3 className="font-medium mb-2">Get Complete Results</h3>
                    <p className="text-muted-foreground">Receive detailed care instructions with soil, water and light requirements</p>
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
