
import React, { useState, useRef, ChangeEvent } from 'react';
import { Button } from '../components/ui/button';
import { Camera } from 'lucide-react';

interface ImageUploaderProps {
  onImageSelected: (imageData: string) => void;
  isProcessing: boolean;
  onSubmit: () => void;
}

const ImageUploader = ({ onImageSelected, isProcessing, onSubmit }: ImageUploaderProps) => {
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setImage(result);
      onImageSelected(result);
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setImage(result);
      onImageSelected(result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div 
        className={`relative h-64 rounded-xl border-2 border-dashed ${image ? 'border-transparent' : 'border-emotion-primary/30'} mb-4 overflow-hidden transition-all duration-300 upload-gradient`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={triggerFileInput}
      >
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleImageChange}
        />
        
        {image ? (
          <img
            src={image}
            alt="Face preview"
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-6 text-center">
            <Camera size={40} className="text-emotion-primary mb-2" />
            <p className="text-sm text-gray-600 mb-1">Click or drag and drop to upload your photo</p>
            <p className="text-xs text-gray-500">We'll analyze your facial expression</p>
          </div>
        )}
      </div>

      <Button
        onClick={onSubmit}
        disabled={!image || isProcessing}
        className="w-full bg-emotion-primary hover:bg-emotion-primary/90 text-white"
      >
        {isProcessing ? "Analyzing..." : "Detect Emotion"}
      </Button>
    </div>
  );
};

export default ImageUploader;
