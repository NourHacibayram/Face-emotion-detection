
import { useState, useEffect } from 'react';
import { loadModel, detectEmotion as detectEmotionAPI, EmotionResult } from '@/api/emotionModelAPI';

const useEmotionDetection = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<EmotionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [isModelLoading, setIsModelLoading] = useState(true);

  // Load model when hook is first used
  useEffect(() => {
    const initModel = async () => {
      try {
        setIsModelLoading(true);
        const loaded = await loadModel();
        setModelLoaded(loaded);
        if (!loaded) {
          setError('Model yüklenemedi. Lütfen sayfayı yenileyin veya model dosyalarını kontrol edin.');
        }
      } catch (err) {
        console.error('Model yükleme hatası:', err);
        setError('Model yüklenemedi. Lütfen sayfayı yenileyin veya model dosyalarını kontrol edin.');
      } finally {
        setIsModelLoading(false);
      }
    };
    
    initModel();
  }, []);

  const detectEmotion = async (imageData: string) => {
    setIsProcessing(true);
    setError(null);
    
    try {
      if (!modelLoaded) {
        // Try loading the model again if not loaded
        setIsModelLoading(true);
        const loaded = await loadModel();
        if (!loaded) {
          throw new Error('Model yüklenemedi');
        }
        setModelLoaded(true);
        setIsModelLoading(false);
      }
      
      // Call the model API to detect emotion
      const detectionResult = await detectEmotionAPI(imageData);
      
      setResult(detectionResult);
    } catch (err) {
      console.error('Duygu tespiti hatası:', err);
      setError('Resim analizi başarısız oldu. Lütfen tekrar deneyin.');
      throw err;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    detectEmotion,
    result,
    isProcessing,
    error,
    resetResult: () => setResult(null),
    modelLoaded,
    isModelLoading
  };
};

export default useEmotionDetection;
