
import React, { useState } from 'react';
import ImageUploader from './ImageUploader';
import ResultDisplay from './ResultDisplay';
import ProcessExplanation from './ProcessExplanation';
import useEmotionDetection from '@/hooks/useEmotionDetection';
import { toast } from '@/components/ui/sonner';

const EmotionDetector = () => {
  const [imageData, setImageData] = useState<string | null>(null);
  const { detectEmotion, result, isProcessing, error } = useEmotionDetection();

  const handleImageSelected = (data: string) => {
    setImageData(data);
  };

  const handleSubmit = async () => {
    if (!imageData) {
      toast.error('Lütfen önce bir resim yükleyin');
      return;
    }

    try {
      await detectEmotion(imageData);
    } catch (err) {
      toast.error('Resim analizi başarısız oldu. Lütfen tekrar deneyin.');
    }
  };

  return (
    <div className="container px-4 py-10 mx-auto">
      <div className="flex flex-col items-center justify-center text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
          Yüzünüz Dünyaya Ne Söylüyor?
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Yapay zekamız, saniyeler içinde yüz ifadelerinizden duyguları tespit edebilir. 
          Bir fotoğraf yükleyin ve yüzünüzün neleri açığa çıkardığını keşfedin.
        </p>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-soft p-6 md:p-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2">
            <ImageUploader 
              onImageSelected={handleImageSelected} 
              isProcessing={isProcessing}
              onSubmit={handleSubmit}
            />
          </div>
          <div className="w-full md:w-1/2 flex items-center justify-center">
            <ResultDisplay 
              emotion={result?.emotion || null} 
              confidence={result?.confidence || null}
              isVisible={!!result}
            />
            {!result && !isProcessing && (
              <div className="text-center text-gray-500 py-8">
                <p className="text-lg font-medium mb-2">Henüz sonuç yok</p>
                <p className="text-sm">Başlamak için fotoğrafınızı yükleyin ve "Duyguyu Tespit Et" düğmesine tıklayın</p>
              </div>
            )}
            {isProcessing && (
              <div className="text-center text-gray-500 animate-pulse py-8">
                <p>Yüz ifadeniz analiz ediliyor...</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <ProcessExplanation />

      <footer className="mt-16 text-center text-sm text-gray-500">
        <p>Derin Öğrenme & OpenCV ile Güçlendirilmiştir</p>
        <p className="mt-2">© 2025 Duygu Dedektörü</p>
      </footer>
    </div>
  );
};

export default EmotionDetector;
