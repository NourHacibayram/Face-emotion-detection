from flask import Flask, request, jsonify
from utils import load_model_once, preprocess_image
import numpy as np

app = Flask(__name__)

# تحميل النموذج مرة واحدة
model = load_model_once()

# ترتيب الفئات
EMOTION_MAPPING = ['Angry', 'Happy', 'Neutral', 'Sad', 'Surprise']

@app.route("/predict", methods=["POST"])
def predict_emotion():
    try:
        file = request.files.get("image")
        if file is None:
            return jsonify({"error": "No image uploaded"}), 400

        image_tensor = preprocess_image(file)
        predictions = model.predict(image_tensor)[0]
        index = int(np.argmax(predictions))
        emotion = EMOTION_MAPPING[index]
        confidence = float(predictions[index])

        return jsonify({
            "emotion": emotion,
            "confidence": confidence
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
