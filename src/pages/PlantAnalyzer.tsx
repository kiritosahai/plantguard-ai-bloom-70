
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Camera, Upload, Loader2, ChevronLeft, Info, Droplets, Sun, Thermometer, AlertCircle, Check } from "lucide-react";
import { analyzeImage, AnalysisResult } from "@/services/plantAnalyzer";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const PlantAnalyzer: React.FC = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImagePreview(e.target.result as string);
          analyzeSelectedImage(file);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  const analyzeSelectedImage = async (file: File) => {
    setIsAnalyzing(true);
    setAnalysisResult(null);
    
    try {
      const result = await analyzeImage(file);
      setAnalysisResult(result);
      
      if (result.plant_detected) {
        toast({
          title: "Analysis complete",
          description: result.disease_detected 
            ? `Identified: ${result.common_name} with ${result.disease_name}`
            : `Identified: ${result.common_name} (healthy)`,
          variant: "default",
        });
      } else {
        toast({
          title: "Analysis complete",
          description: "No plant detected in the image. Please try another photo.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Analysis failed",
        description: "There was an error analyzing your plant. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const takeNewPhoto = () => {
    setImagePreview(null);
    setAnalysisResult(null);
    setActiveTab("overview");
  };
  
  const renderWaterRequirement = (level: string) => {
    const levels: Record<string, { color: string, percentage: number }> = {
      "Low": { color: "bg-blue-300", percentage: 33 },
      "Moderate": { color: "bg-blue-500", percentage: 66 },
      "High": { color: "bg-blue-700", percentage: 100 }
    };
    
    return (
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Water Requirement</span>
          <span className="font-medium">{level}</span>
        </div>
        <div className="h-2 bg-muted rounded overflow-hidden">
          <div 
            className={`h-full ${levels[level]?.color || "bg-blue-500"}`} 
            style={{ width: `${levels[level]?.percentage || 50}%` }}
          ></div>
        </div>
      </div>
    );
  };
  
  const renderLightRequirement = (level: string) => {
    const levels: Record<string, { color: string, percentage: number }> = {
      "Low": { color: "bg-yellow-300", percentage: 33 },
      "Medium": { color: "bg-yellow-500", percentage: 66 },
      "High": { color: "bg-yellow-600", percentage: 100 }
    };
    
    return (
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Light Requirement</span>
          <span className="font-medium">{level}</span>
        </div>
        <div className="h-2 bg-muted rounded overflow-hidden">
          <div 
            className={`h-full ${levels[level]?.color || "bg-yellow-500"}`} 
            style={{ width: `${levels[level]?.percentage || 50}%` }}
          ></div>
        </div>
      </div>
    );
  };
  
  const renderHumidityRequirement = (level: string) => {
    const levels: Record<string, { color: string, percentage: number }> = {
      "Low": { color: "bg-green-300", percentage: 33 },
      "Medium": { color: "bg-green-500", percentage: 66 },
      "High": { color: "bg-green-700", percentage: 100 }
    };
    
    return (
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Humidity Preference</span>
          <span className="font-medium">{level}</span>
        </div>
        <div className="h-2 bg-muted rounded overflow-hidden">
          <div 
            className={`h-full ${levels[level]?.color || "bg-green-500"}`} 
            style={{ width: `${levels[level]?.percentage || 50}%` }}
          ></div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <Button 
            variant="ghost" 
            className="mb-4 flex items-center text-muted-foreground"
            onClick={() => navigate("/")}
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Back to Home
          </Button>
          
          <h1 className="text-3xl font-bold mb-6">Plant Analyzer</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Upload/Preview Section */}
            <div>
              <Card className="overflow-hidden border-2 border-dashed">
                <CardContent className="p-0">
                  {!imagePreview ? (
                    <div 
                      className="p-8 flex flex-col items-center justify-center h-[420px] bg-muted/50 cursor-pointer"
                      onClick={handleUploadClick}
                    >
                      <div className="mb-4 p-4 rounded-full bg-plantguard-green/10">
                        <Camera className="h-10 w-10 text-plantguard-green" />
                      </div>
                      <h3 className="text-xl font-medium mb-2">Upload a Plant Image</h3>
                      <p className="text-center text-muted-foreground mb-6">
                        Take a clear photo of your plant to get identification and health analysis
                      </p>
                      <Button 
                        className="flex items-center gap-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUploadClick();
                        }}
                      >
                        <Upload className="h-4 w-4" /> Select Image
                      </Button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </div>
                  ) : (
                    <div className="relative">
                      <img 
                        src={imagePreview} 
                        alt="Plant preview" 
                        className="w-full h-[420px] object-cover"
                      />
                      {isAnalyzing && (
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                            <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-plantguard-green" />
                            <p className="text-lg font-medium">Analyzing plant...</p>
                            <p className="text-sm text-muted-foreground mt-2">This will just take a moment</p>
                          </div>
                        </div>
                      )}
                      
                      <div className="absolute bottom-4 right-4">
                        <Button 
                          size="sm"
                          variant="secondary"
                          className="bg-white/80 hover:bg-white shadow-sm"
                          onClick={takeNewPhoto}
                        >
                          New Photo
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            {/* Analysis Results Section */}
            <div>
              {analysisResult && analysisResult.plant_detected ? (
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h2 className="text-2xl font-bold">{analysisResult.common_name}</h2>
                        <p className="text-sm text-muted-foreground italic">{analysisResult.species}</p>
                      </div>
                      <div className="bg-plantguard-green/10 px-3 py-1 rounded-full flex items-center">
                        <Check className="h-4 w-4 text-plantguard-green mr-1" />
                        <span className="text-xs font-medium text-plantguard-green">
                          {Math.round(analysisResult.confidence! * 100)}% Match
                        </span>
                      </div>
                    </div>
                    
                    {analysisResult.disease_detected && (
                      <div className="mb-6 bg-yellow-50 border-l-4 border-yellow-400 p-4">
                        <div className="flex">
                          <AlertCircle className="h-6 w-6 text-yellow-600 flex-shrink-0 mr-3" />
                          <div>
                            <h3 className="font-medium text-yellow-800">Issue Detected</h3>
                            <p className="text-sm text-yellow-700">{analysisResult.disease_name}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                      <TabsList className="mb-4 w-full">
                        <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
                        <TabsTrigger value="care" className="flex-1">Care Guide</TabsTrigger>
                        {analysisResult.disease_detected && (
                          <TabsTrigger value="issues" className="flex-1">Issues</TabsTrigger>
                        )}
                      </TabsList>
                      
                      <TabsContent value="overview" className="space-y-4">
                        <div className="space-y-4">
                          <p>{analysisResult.plant_details?.description}</p>
                          
                          <Separator className="my-4" />
                          
                          {renderWaterRequirement(analysisResult.water_requirement!)}
                          {renderLightRequirement(analysisResult.plant_details?.light_requirement || "Medium")}
                          {renderHumidityRequirement(analysisResult.plant_details?.humidity_preference || "Medium")}
                          
                          <div className="flex justify-between items-center mt-6">
                            <span className="text-sm">Recommended water amount:</span>
                            <span className="font-medium">{analysisResult.water_amount_ml_per_day} ml/day</span>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="care" className="space-y-4">
                        <h3 className="font-medium mb-2">Care Tips</h3>
                        <ul className="space-y-3">
                          {analysisResult.plant_details?.care_tips.map((tip, index) => (
                            <li key={index} className="flex items-start">
                              <Check className="h-4 w-4 text-plantguard-green mt-1 mr-2 flex-shrink-0" />
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                        
                        <div className="bg-blue-50 p-4 rounded-md mt-6">
                          <div className="flex items-start">
                            <Info className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                            <div>
                              <h4 className="font-medium text-blue-700 mb-1">Watering Calendar</h4>
                              <p className="text-sm text-blue-600">Set up a watering reminder for this plant in the Monitoring section.</p>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      
                      {analysisResult.disease_detected && (
                        <TabsContent value="issues" className="space-y-4">
                          <h3 className="font-medium mb-1">{analysisResult.disease_name}</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            {analysisResult.disease_details?.description}
                          </p>
                          
                          <div>
                            <h4 className="text-sm font-medium mb-2">Symptoms</h4>
                            <ul className="space-y-2">
                              {analysisResult.disease_details?.symptoms.map((symptom, index) => (
                                <li key={index} className="flex items-start text-sm">
                                  <span className="text-plantguard-green mr-2">•</span>
                                  <span>{symptom}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <Separator className="my-4" />
                          
                          <div>
                            <h4 className="text-sm font-medium mb-2">Recommended Treatment</h4>
                            <ul className="space-y-2">
                              {analysisResult.disease_details?.treatments.map((treatment, index) => (
                                <li key={index} className="flex items-start text-sm">
                                  <Check className="h-4 w-4 text-plantguard-green mt-0.5 mr-2 flex-shrink-0" />
                                  <span>{treatment}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <Separator className="my-4" />
                          
                          <div>
                            <h4 className="text-sm font-medium mb-2">Prevention</h4>
                            <ul className="space-y-2">
                              {analysisResult.disease_details?.prevention.map((tip, index) => (
                                <li key={index} className="flex items-start text-sm">
                                  <Check className="h-4 w-4 text-plantguard-green mt-0.5 mr-2 flex-shrink-0" />
                                  <span>{tip}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </TabsContent>
                      )}
                    </Tabs>
                  </CardContent>
                </Card>
              ) : (
                !isAnalyzing && analysisResult && !analysisResult.plant_detected ? (
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-center py-8">
                        <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">No Plant Detected</h3>
                        <p className="text-muted-foreground mb-6">
                          We couldn't identify a plant in your image. Please try uploading a clearer photo 
                          with good lighting and a focused view of the plant.
                        </p>
                        <Button onClick={takeNewPhoto}>Try Another Photo</Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-center py-12">
                        <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">Ready to Analyze</h3>
                        <p className="text-muted-foreground mb-6">
                          Upload a clear image of your plant to get detailed identification and care information.
                        </p>
                        <div className="space-y-4">
                          <div className="flex items-center">
                            <Check className="h-5 w-5 text-plantguard-green mr-3 flex-shrink-0" />
                            <span>Identify 10,000+ plant species</span>
                          </div>
                          <div className="flex items-center">
                            <Check className="h-5 w-5 text-plantguard-green mr-3 flex-shrink-0" />
                            <span>Detect common plant diseases</span>
                          </div>
                          <div className="flex items-center">
                            <Check className="h-5 w-5 text-plantguard-green mr-3 flex-shrink-0" />
                            <span>Get personalized care tips</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              )}
            </div>
          </div>
          
          <div className="mt-12 bg-muted/30 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">How the Plant Analyzer Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-plantguard-green-light/30 rounded-full flex items-center justify-center mb-4">
                  <Upload className="h-6 w-6 text-plantguard-green" />
                </div>
                <h3 className="font-medium mb-2">1. Upload a Photo</h3>
                <p className="text-sm text-muted-foreground">
                  Take or upload a clear photo of your plant. Focus on the leaves, flowers, or problem areas for best results.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-plantguard-green-light/30 rounded-full flex items-center justify-center mb-4">
                  <Loader2 className="h-6 w-6 text-plantguard-green" />
                </div>
                <h3 className="font-medium mb-2">2. AI Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Our advanced AI model identifies plant species, detects diseases, and analyzes overall health conditions.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-plantguard-green-light/30 rounded-full flex items-center justify-center mb-4">
                  <Info className="h-6 w-6 text-plantguard-green" />
                </div>
                <h3 className="font-medium mb-2">3. Get Insights</h3>
                <p className="text-sm text-muted-foreground">
                  Receive detailed information about your plant, care requirements, and treatment recommendations if issues are found.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PlantAnalyzer;
