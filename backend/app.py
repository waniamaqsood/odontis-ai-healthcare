import os
import json
import h5py
import numpy as np
from PIL import Image
import keras
from flask import Flask, request, jsonify, make_response
from flask_cors import CORS

app = Flask(__name__)

# --- 1. CORS CONFIGURATION ---
# This handles the security handshake between Frontend (3000) and Backend (5000)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)

@app.after_request
def add_cors_headers(response):
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response

# --- 2. MODEL UTILITIES ---
def fix_model_config(path):
    """Strips the 'quantization_config' that causes crashes in Keras 3."""
    if not os.path.exists(path):
        return
    try:
        with h5py.File(path, 'a') as f:
            if 'model_config' in f.attrs:
                config = json.loads(f.attrs['model_config'])
                def remove_key(obj):
                    if isinstance(obj, dict):
                        obj.pop('quantization_config', None)
                        for key in list(obj.keys()):
                            remove_key(obj[key])
                    elif isinstance(obj, list):
                        for item in obj:
                            remove_key(item)
                remove_key(config)
                f.attrs['model_config'] = json.dumps(config).encode('utf-8')
    except Exception as e:
        print(f"Metadata fix skipped: {e}")

def preprocess_image(image):
    """Prepares image for the CNN (300x300 based on your model config)."""
    image = image.resize((300, 300)) 
    image = np.array(image) / 255.0
    image = np.expand_dims(image, axis=0)
    return image

# --- 3. INITIALIZE MODEL ---
# Load model once during startup so it stays in memory
MODEL_NAME = "exp4_b3_full_model.h5"
model_path = os.path.join(os.path.dirname(__file__), MODEL_NAME)

fix_model_config(model_path)
# compile=False is critical to avoid errors with custom training configs
model = keras.saving.load_model(model_path, compile=False)

CLASS_NAMES = ["Gum Diseases", "Carries", "Extra Teeth", "Healthy Teeth"]

# --- 4. ROUTES ---

@app.route('/')
def home():
    return "Backend is alive!"

@app.route("/predict", methods=["OPTIONS"])
def handle_options():
    """Explicitly handles browser preflight checks."""
    return make_response("", 200)

@app.route("/predict", methods=["POST"])
def predict():
    try:
        if "image" not in request.files:
            return jsonify({"error": "No image provided"}), 400
        
        file = request.files["image"]
        image = Image.open(file).convert("RGB")
        processed = preprocess_image(image)

        # Run Prediction
        prediction = model.predict(processed)[0]
        class_index = int(np.argmax(prediction))
        confidence = float(prediction[class_index])

        return jsonify({
            "prediction": CLASS_NAMES[class_index],
            "confidence": confidence
        })
    except Exception as e:
        print(f"CRITICAL ERROR: {str(e)}")
        return jsonify({"error": str(e)}), 500

# --- 5. START SERVER ---
if __name__ == '__main__':
    # Using port 5000 to match your frontend fetch
    app.run(debug=True, port=5000)