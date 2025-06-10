
import React from 'react';
import EmotionDetector from '@/components/EmotionDetector';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Users } from 'lucide-react';

// Supported emotions data
const supportedEmotions = [
  { name: 'Kızgın', emoji: '😠' },
  { name: 'Mutlu', emoji: '😊' },
  { name: 'Doğal', emoji: '😐' },
  { name: 'Üzgün', emoji: '😢' },
  { name: 'Şaşkın', emoji: '😲' },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-emotion-light/30">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-end mb-4">
          <Link to="/about">
            <Button variant="ghost" className="flex items-center gap-2">
              <Users size={18} />
              Ekibi Tanıyın
            </Button>
          </Link>
        </div>
        <EmotionDetector />
        
        {/* Supported emotions section */}
        <div className="max-w-3xl mx-auto my-16 text-center">
          <h2 className="text-2xl font-semibold mb-6">Desteklenen Duygular</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {supportedEmotions.map((emotion, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg p-4 shadow-soft flex flex-col items-center hover:bg-emotion-light/20 transition-colors animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="text-4xl mb-2">{emotion.emoji}</span>
                <span className="font-medium">{emotion.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
