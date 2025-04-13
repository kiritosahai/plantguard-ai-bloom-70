
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
