
import React from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, Undo2, Clipboard } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ResultsSectionProps {
  imagePreview: string | null;
  setPreviewStage: (stage: null | 'analyzing' | 'results') => void;
  generateReportText: () => string;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ 
  imagePreview, 
  setPreviewStage, 
  generateReportText 
}) => {
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Report details have been copied to your clipboard.",
      variant: "default",
    });
  };

  return (
    <div className="p-8 h-96 flex flex-col">
      <div className="flex items-center mb-4">
        <h3 className="text-xl font-semibold">Plant Analysis Results</h3>
        {imagePreview && (
          <div className="ml-auto">
            <div className="w-14 h-14 rounded-md overflow-hidden">
              <img src={imagePreview} alt="Plant thumbnail" className="w-full h-full object-cover" />
            </div>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div className="bg-muted/30 p-4 rounded-lg">
          <p className="text-sm text-muted-foreground">Plant Species</p>
          <p className="font-medium">Monstera Deliciosa</p>
        </div>
        <div className="bg-muted/30 p-4 rounded-lg">
          <p className="text-sm text-muted-foreground">Health Status</p>
          <p className="font-medium text-yellow-600 flex items-center">
            <AlertCircle className="h-4 w-4 mr-1" /> Needs Attention
          </p>
        </div>
      </div>
      
      <div className="bg-muted/30 p-4 rounded-lg mb-4">
        <p className="text-sm text-muted-foreground mb-1">Issues Detected</p>
        <p className="font-medium">Early signs of leaf spot disease</p>
      </div>
      
      <div className="bg-muted/30 p-4 rounded-lg mb-4 flex-1 overflow-auto">
        <p className="text-sm text-muted-foreground mb-1">Recommendation</p>
        <ul className="text-sm space-y-2">
          <li>• Isolate the plant from others to prevent spread</li>
          <li>• Remove affected leaves with sterilized scissors</li>
          <li>• Decrease watering frequency to prevent moisture</li>
          <li>• Apply neem oil solution once weekly for 3 weeks</li>
        </ul>
      </div>
      
      <div className="flex justify-end mt-auto">
        <Button 
          variant="ghost" 
          className="mr-2 flex items-center gap-1" 
          onClick={() => setPreviewStage(null)}
        >
          <Undo2 className="h-4 w-4" /> New Photo
        </Button>
        <Button 
          className="flex items-center gap-1"
          onClick={() => copyToClipboard(generateReportText())}
        >
          <Clipboard className="h-4 w-4" /> Copy Report
        </Button>
      </div>
    </div>
  );
};

export default ResultsSection;
