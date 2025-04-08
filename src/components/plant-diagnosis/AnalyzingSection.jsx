
import React from "react";
import { Loader2 } from "lucide-react";

const AnalyzingSection = ({ imagePreview }) => {
  return (
    <div className="p-8 text-center flex flex-col items-center justify-center h-96">
      {imagePreview && (
        <div className="relative mb-8 w-48 h-48 mx-auto">
          <img src={imagePreview} alt="Plant preview" className="w-full h-full object-cover rounded-lg" />
          <div className="absolute inset-0 bg-black/10 rounded-lg flex items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-plantguard-green"></div>
          </div>
        </div>
      )}
      
      {!imagePreview && (
        <div className="mb-8">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-plantguard-green"></div>
        </div>
      )}
      
      <p className="text-lg font-medium">Analyzing your plant...</p>
      <p className="text-sm text-muted-foreground mt-2">This will just take a moment</p>
    </div>
  );
};

export default AnalyzingSection;
