import tensorflow as tf
from tensorflow import keras
from PIL import Image
import numpy as np
import io

# تحميل النموذج مرة واحدة
def load_model_once():
    return keras.models.load_model("models/mobilenetv2_emotion_model_cleaned.keras")

# معالجة الصورة
def preprocess_image(file):
    image = Image.open(file).convert("RGB").resize((224, 224))
    image_array = np.array(image) / 255.0
    image_tensor = tf.convert_to_tensor(image_array, dtype=tf.float32)
    image_tensor = tf.expand_dims(image_tensor, axis=0)  # [1, 224, 224, 3]
    return image_tensor
