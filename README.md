<!--
DRAFT. Delete this block before publishing.
Written from the repository code plus the author's own description of the work.
Deliberately LEFT OUT until the university confirms what may be shared:
  - the trained model file, dataset details, and evaluation results (e.g. F1 score)
When cleared, add them in the "Results" section marked below.
-->

# Odontis: AI-Assisted Dental X-ray Classification

A full-stack web application that classifies dental X-ray images into four categories using a Convolutional Neural Network, with an English/Urdu interface and an embedded chatbot for dental-health information.

Built **solo** as my final year project (FYP).

> **Not a medical device.** Odontis is an educational and research project. Its output is not a diagnosis and must not replace examination by a qualified dentist.

[Watch the demo video](https://drive.google.com/file/d/12Ex1_49F6K6k8Vx7NWwA8-N6IuwW8gv4/view?usp=drive_link)

## What it does

1. A user uploads a dental X-ray image in the browser and sees a preview.
2. The image is sent to a Flask API (`POST /predict`).
3. The API resizes the image to 300×300, scales pixel values, and runs the CNN.
4. The page shows the predicted class and the model's confidence.

**Classes:** Caries · Extra Teeth · Gum Disease · Healthy Teeth

The backend does not store uploaded images; each one is processed in memory.

## My role

I built every part of the project:

* **Machine learning:** dataset preparation, augmentation, training and evaluation of a CNN based on EfficientNetB3 (TensorFlow/Keras).
* **Backend:** a Flask REST API that loads the trained model once at startup and serves predictions.
* **Frontend:** a Next.js (React, TypeScript, Tailwind CSS) interface with English and Urdu language support.
* **Chatbot:** a Botpress chatbot embedded in the site to answer dental-health questions.

## Architecture

```text
 Browser (Next.js, :3000)
   │  upload X-ray image
   ▼
 POST /predict ──▶ Flask API (:5000)
                     │  resize to 300×300, scale to 0–1
                     ▼
                  Keras CNN (loaded once at startup)
                     │
                     ▼
        { "prediction": "...", "confidence": 0.xx }  ──▶ shown in the page

 Botpress webchat: loaded in the page from Botpress's servers
```

| Part | Technology |
|---|---|
| Machine learning | Python, TensorFlow/Keras, EfficientNetB3 |
| Backend | Flask, REST API, Pillow, NumPy |
| Frontend | Next.js, React, TypeScript, Tailwind CSS, `next-intl` (English/Urdu) |
| Chatbot | Botpress (embedded webchat) |

## What is in this repository

* `frontend/`: the Next.js application (pages, components, English and Urdu translations).
* `backend/`: the Flask API (`app.py`) and its Python dependencies.

**Not included:** the trained model file (`exp4_b3_full_model.h5`), the dataset, and the training code. The model is too large for a normal GitHub file, and sharing the weights and data is subject to university approval. The weights are available on request. Without the model file, the backend will not start.

<!-- RESULTS: add dataset description and evaluation results here once cleared by the university. -->

## Run it locally

You need the model file to run the backend. Place it at `backend/exp4_b3_full_model.h5`.

### Backend

TensorFlow 2.13 (pinned in `requirements.txt`) needs Python 3.8–3.11.

```bash
cd backend
python -m venv venv
venv\Scripts\activate          # macOS/Linux: source venv/bin/activate
pip install -r requirements.txt
python app.py                  # serves on http://127.0.0.1:5000
```

`requirements.txt` was generated on Windows and includes `tensorflow-intel`, which is Windows-only. On macOS or Linux, remove that line first.

### Frontend

```bash
cd frontend
npm install
npm run dev                    # http://localhost:3000
```

The frontend calls the backend at `http://127.0.0.1:5000/predict`, and the backend allows requests from `http://localhost:3000`.

## Implementation notes

* **Model loaded once** at startup, not per request.
* **Input validation:** a request without an image returns `400`; other failures return `500` with an error message.
* **Keras compatibility workaround:** `app.py` removes a `quantization_config` entry from the model's saved metadata before loading, to avoid a loading error. This edits the model file in place.
* **Bilingual UI:** all page text lives in `frontend/translations/en.json` and `ur.json`.

## Limitations

* The trained model, dataset and training code are not in this repository (see above).
* **Not clinically validated.** It must not be used to diagnose or treat patients.
* No automated tests.
* The API address and CORS origin are hard-coded for local development, and Flask runs in debug mode.
* The chatbot's configuration lives on Botpress and is not part of this repository.
* No user accounts or authentication; there is no data storage.
* Predictions depend on image quality and similarity to the training data; the model does not reject images that aren't dental X-rays.

## Future work

* Publish the model and results once approved.
* Add tests and a Docker setup.
* Reject non-X-ray inputs.
* Cloud deployment of the inference API.
