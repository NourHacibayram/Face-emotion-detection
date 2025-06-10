
import React from 'react';
import { Upload, Smile, User } from 'lucide-react';

const ProcessStep = ({ 
  number, 
  title, 
  description, 
  icon 
}: { 
  number: number; 
  title: string; 
  description: string;
  icon: React.ReactNode;
}) => (
  <div className="flex flex-col items-center">
    <div className="relative">
      <div className="w-14 h-14 rounded-full bg-emotion-light flex items-center justify-center shadow-sm mb-4">
        {icon}
      </div>
      <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-emotion-primary text-white flex items-center justify-center text-xs font-medium">
        {number}
      </span>
    </div>
    <h3 className="font-semibold text-lg mb-1">{title}</h3>
    <p className="text-gray-500 text-center max-w-xs text-sm">{description}</p>
  </div>
);

const ProcessExplanation = () => {
  return (
    <section className="container my-16">
      <h2 className="text-2xl font-bold text-center mb-12">How It Works</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <ProcessStep 
          number={1} 
          title="Upload" 
          description="Take a selfie or upload a photo of your face" 
          icon={<Upload size={24} className="text-emotion-primary" />}
        />
        <ProcessStep 
          number={2} 
          title="Detect" 
          description="Our AI analyzes your facial features and expressions" 
          icon={<User size={24} className="text-emotion-primary" />}
        />
        <ProcessStep 
          number={3} 
          title="Result" 
          description="View your detected emotion and confidence score" 
          icon={<Smile size={24} className="text-emotion-primary" />}
        />
      </div>
    </section>
  );
};

export default ProcessExplanation;
