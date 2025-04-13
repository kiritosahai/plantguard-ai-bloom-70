
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DiagnosisProvider } from "./context/DiagnosisContext";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "./components/AppSidebar";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PlantIdentification from "./pages/PlantIdentification";
import DiseaseDiagnosis from "./pages/DiseaseDiagnosis";
import Monitoring from "./pages/Monitoring";
import CommunityPage from "./pages/Community";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Subscription from "./pages/Subscription";
import PlantEncyclopedia from "./pages/PlantEncyclopedia";
import PlantAnalyzer from "./pages/PlantAnalyzer";
import AiIdentification from "./pages/AiIdentification";
import DiseaseDetection from "./pages/DiseaseDetection";
import EnvironmentalMonitoring from "./pages/EnvironmentalMonitoring";
import CommunitySupport from "./pages/CommunitySupport";
import CareReminders from "./pages/CareReminders";
import PlantLibrary from "./pages/PlantLibrary";
import Blog from "./pages/Blog";
import PlantCareGuides from "./pages/PlantCareGuides";
import KnowledgeBase from "./pages/KnowledgeBase";
import ApiDocumentation from "./pages/ApiDocumentation";
import SupportCenter from "./pages/SupportCenter";
import ContactUs from "./pages/ContactUs";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <DiagnosisProvider>
        <BrowserRouter>
          <SidebarProvider>
            <div className="flex min-h-screen w-full">
              <AppSidebar />
              <div className="flex-1">
                <Toaster />
                <Sonner />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/plant-identification" element={<PlantIdentification />} />
                  <Route path="/disease-diagnosis" element={<DiseaseDiagnosis />} />
                  <Route path="/monitoring" element={<Monitoring />} />
                  <Route path="/community" element={<CommunityPage />} />
                  <Route path="/sign-in" element={<SignIn />} />
                  <Route path="/sign-up" element={<SignUp />} />
                  <Route path="/subscription" element={<Subscription />} />
                  <Route path="/plant-encyclopedia" element={<PlantEncyclopedia />} />
                  <Route path="/plant-analyzer" element={<PlantAnalyzer />} />
                  
                  {/* New Routes */}
                  <Route path="/ai-identification" element={<AiIdentification />} />
                  <Route path="/disease-detection" element={<DiseaseDetection />} />
                  <Route path="/environmental-monitoring" element={<EnvironmentalMonitoring />} />
                  <Route path="/community-support" element={<CommunitySupport />} />
                  <Route path="/care-reminders" element={<CareReminders />} />
                  <Route path="/plant-library" element={<PlantLibrary />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/plant-care-guides" element={<PlantCareGuides />} />
                  <Route path="/knowledge-base" element={<KnowledgeBase />} />
                  <Route path="/api-documentation" element={<ApiDocumentation />} />
                  <Route path="/support-center" element={<SupportCenter />} />
                  <Route path="/contact-us" element={<ContactUs />} />
                  
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </div>
          </SidebarProvider>
        </BrowserRouter>
      </DiagnosisProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
