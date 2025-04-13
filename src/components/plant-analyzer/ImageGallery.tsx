
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ImagePlus, Trash2 } from "lucide-react";

interface ImageGalleryProps {
  images: string[];
  onAddImage: () => void;
  onRemoveImage: (index: number) => void;
  maxImages?: number;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ 
  images, 
  onAddImage, 
  onRemoveImage, 
  maxImages = 5 
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Plant Images</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <Card key={index} className="overflow-hidden relative group h-40">
            <img 
              src={image} 
              alt={`Plant ${index + 1}`} 
              className="w-full h-full object-cover" 
            />
            <Button 
              size="sm" 
              variant="destructive" 
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => onRemoveImage(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </Card>
        ))}
        
        {images.length < maxImages && (
          <Card 
            className="h-40 flex flex-col items-center justify-center border-dashed cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={onAddImage}
          >
            <ImagePlus className="h-12 w-12 text-muted-foreground mb-2" />
            <span className="text-sm text-muted-foreground">Add Image</span>
          </Card>
        )}
      </div>
      
      <div className="text-xs text-muted-foreground">
        {images.length} of {maxImages} images ({maxImages - images.length} remaining)
      </div>
    </div>
  );
};

export default ImageGallery;
