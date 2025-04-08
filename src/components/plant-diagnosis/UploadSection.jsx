
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Camera, Upload, Loader2 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const UploadSection = ({ handleFile, isProcessing, useCameraMode, setUseCameraMode }) => {
  const fileInputRef = useRef(null);
  const isMobile = useIsMobile();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
    setUseCameraMode(false);
  };

  const takePhoto = () => {
    setUseCameraMode(true);
    if (fileInputRef.current) {
      fileInputRef.current.setAttribute('capture', 'environment');
      fileInputRef.current.click();
    }
  };

  const uploadFromGallery = () => {
    setUseCameraMode(false);
    if (fileInputRef.current) {
      fileInputRef.current.removeAttribute('capture');
      fileInputRef.current.click();
    }
  };

  return (
    <div 
      className="p-8 text-center flex flex-col items-center justify-center h-96 bg-muted/50"
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      role="button"
      aria-label="Upload plant photo"
      tabIndex={0}
    >
      <div className="mb-4 p-4 rounded-full bg-plantguard-green/10">
        <Camera className="h-10 w-10 text-plantguard-green" />
      </div>
      <p className="mb-4 font-medium">
        Get an instant plant diagnosis
      </p>
      <p className="text-sm text-muted-foreground mb-6">Choose an option below</p>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <Button 
          className="flex items-center gap-2"
          onClick={takePhoto}
          disabled={isProcessing}
        >
          <Camera className="h-4 w-4" /> {isProcessing ? "Processing..." : "Take Photo"}
        </Button>
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={uploadFromGallery}
          disabled={isProcessing}
        >
          <Upload className="h-4 w-4" /> {isProcessing ? "Processing..." : "Upload Image"}
        </Button>
      </div>
      
      <input 
        ref={fileInputRef}
        id="file-upload"
        type="file"
        className="hidden" 
        accept="image/jpeg,image/png,image/jpg,image/heic,image/heif"
        onChange={handleChange}
      />
    </div>
  );
};

export default UploadSection;
