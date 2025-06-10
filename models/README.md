
# Emotion Detection Model Directory

This directory is for your TensorFlow.js converted Keras emotion detection model files.

## How to convert and place your model:

1. **Export your Keras model in your Jupyter notebook**:
   ```python
   model.save('emotion_model.h5')
   ```

2. **Install TensorFlow.js converter** (if you haven't already):
   ```bash
   pip install tensorflowjs
   ```

3. **Convert your Keras (.h5) model to TensorFlow.js format**:
   ```bash
   tensorflowjs_converter --input_format keras /path/to/emotion_model.h5 ./src/models/
   ```

4. **Place the generated files in this directory**:
   - `model.json` (the model architecture)
   - `*.bin` files (the model weights)

5. **Update the EMOTION_MAPPING in `emotionModelAPI.ts`** to match your model's output classes.

## Example directory structure:
```
src/models/
  ├── model.json
  ├── group1-shard1of1.bin
  └── README.md
```

Note: If you need to modify your model's preprocessing or output mapping, see the `preprocessImage` function and `EMOTION_MAPPING` array in `src/api/emotionModelAPI.ts`.
