
import React from 'react';
import { cn } from '@/lib/utils';

interface ResultDisplayProps {
  emotion: string | null;
  confidence: number | null;
  isVisible: boolean;
}

// Updated emotion names in Turkish
const emotionEmoji: Record<string, string> = {
  happy: '😊',
  sad: '😢',
  angry: '😠',
  surprised: '😲',
  fearful: '😨',
  disgusted: '🤢',
  neutral: '😐',
  contempt: '😒',
};

// Turkish translations for emotions
const emotionTranslations: Record<string, string> = {
  happy: 'Mutlu',
  sad: 'Üzgün',
  angry: 'Kızgın',
  surprised: 'Şaşkın',
  fearful: 'Korkmuş',
  disgusted: 'İğrenmiş',
  neutral: 'Doğal',
  contempt: 'Küçümseme',
};

const emotionColors: Record<string, string> = {
  happy: 'bg-green-50 border-green-200',
  sad: 'bg-blue-50 border-blue-200',
  angry: 'bg-red-50 border-red-200',
  surprised: 'bg-yellow-50 border-yellow-200',
  fearful: 'bg-purple-50 border-purple-200',
  disgusted: 'bg-orange-50 border-orange-200',
  neutral: 'bg-gray-50 border-gray-200',
  contempt: 'bg-slate-50 border-slate-200',
};

const ResultDisplay = ({ emotion, confidence, isVisible }: ResultDisplayProps) => {
  if (!isVisible || !emotion || confidence === null) {
    return null;
  }

  const emoji = emotionEmoji[emotion.toLowerCase()] || '🤔';
  const colorClass = emotionColors[emotion.toLowerCase()] || 'bg-gray-50 border-gray-200';
  const confidencePercentage = (confidence * 100).toFixed(0);
  const translatedEmotion = emotionTranslations[emotion.toLowerCase()] || emotion;

  return (
    <div className={cn(
      "w-full max-w-md mx-auto mt-8 p-6 rounded-xl border animate-fade-in shadow-soft emotion-card card-gradient",
      colorClass
    )}>
      <div className="text-center mb-4">
        <span className="text-5xl mb-2">{emoji}</span>
        <h3 className="text-xl font-semibold mt-2 capitalize">{translatedEmotion}</h3>
      </div>
      
      <div className="mt-4">
        <div className="flex justify-between text-sm text-gray-500 mb-1">
          <span>Güven</span>
          <span>{confidencePercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-emotion-primary h-2.5 rounded-full animate-pulse-soft"
            style={{ width: `${confidencePercentage}%` }}
          ></div>
        </div>
      </div>
      
      <p className="text-sm text-gray-500 text-center mt-6">
        Yapay zeka, birincil duygusal ifadenizin <span className="font-medium capitalize">{translatedEmotion}</span> olduğunu tespit etti.
      </p>
    </div>
  );
};

export default ResultDisplay;
