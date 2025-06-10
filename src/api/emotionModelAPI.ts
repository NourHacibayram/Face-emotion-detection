import * as tf from '@tensorflow/tfjs';

// نوع النتيجة
export interface EmotionResult {
  emotion: string;
  confidence: number;
}

// الفئات حسب ترتيب التدريب
const EMOTION_MAPPING = ['Angry', 'Happy', 'Neutral', 'Sad', 'Surprise'];

// تحميل النموذج (مرة واحدة)
declare global {
  interface Window {
    emotionModel?: tf.LayersModel;
  }
}

export const loadModel = async (): Promise<boolean> => {
  try {
    if (window.emotionModel) return true;
    const model = await tf.loadLayersModel('/models/model.json');
    window.emotionModel = model;
    return true;
  } catch (err) {
    console.error("❌ Model yüklenemedi:", err);
    return false;
  }
};

// معالجة الصورة (RGB - 224x224 - 0-1)
const preprocessImage = async (imageData: string): Promise<tf.Tensor> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      try {
        const tensor = tf.browser.fromPixels(img)
          .resizeBilinear([224, 224])
          .expandDims(0)
          .div(255.0); // لأنك درّبت بهذا الشكل

        resolve(tensor);
      } catch (err) {
        reject(err);
      }
    };
    img.onerror = reject;
    img.src = imageData;
  });
};

// تحليل المشاعر
export const detectEmotion = async (imageData: string): Promise<EmotionResult> => {
  try {
    if (!window.emotionModel) throw new Error("Model not loaded");

    const inputTensor = await preprocessImage(imageData);
    const predictions = window.emotionModel.predict(inputTensor) as tf.Tensor;
    const data = await predictions.data();

    inputTensor.dispose();
    predictions.dispose();

    const index = data.indexOf(Math.max(...data));
    const emotion = EMOTION_MAPPING[index];
    const confidence = data[index];

    return { emotion, confidence };
  } catch (err) {
    console.error("❌ Duygu tespiti hatası:", err);
    throw err;
  }
};
