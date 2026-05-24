"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function PredictPage() {
  const t = useTranslations("PredictionPage");

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] ?? null;
    setFile(selectedFile);
    setPrediction(null);
    setError(null);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  };

  // Handle upload and prediction
  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    setPrediction(null);
    setError(null);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) setPrediction(data);
      else setError(data.error || "Prediction failed.");
    } catch {
      setError("Server not reachable.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-blue-600">
      {/* TOP SECTION */}
      <div className="relative px-12 pt-16 pb-48 text-white">
        <h1 className="text-5xl mt-20 font-bold leading-tight">{t("p1")}</h1>
        <p className="text-4xl mt-2 font-bold">{t("p2")}</p>
        <div className="mt-4 space-y-2">{t("p3")}</div>
      </div>

      {/* MAIN CONTENT */}
      <div className="bg-white rounded-t-[60px] px-15 py-5 -mt-32">
        {/* STEPS */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mt-12">
          {[4, 6, 8].map((step, idx) => (
            <div
              key={idx}
              className="flex-1 flex flex-col items-center border-3 border-blue-600 rounded-2xl p-6 text-center shadow-lg mb-10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-blue-600 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                {step === 4 && (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 15a4 4 0 014-4h10a4 4 0 014 4v4H3v-4z"
                  />
                )}
                {step === 6 && (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                )}
                {step === 8 && (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                )}
              </svg>
              <h3 className="text-lg font-bold mb-2">{t(`p${step}`)}</h3>
              <p className="text-gray-600">{t(`p${step + 1}`)}</p>
            </div>
          ))}
        </div>

        {/* Upload & Preview Section */}
        <div className="flex-1 flex flex-col border-3 border-blue-600 p-8 rounded-2xl mb-8">
          <h2 className="text-3xl font-bold">{t("p10")}</h2>
          <p className="mt-4 mb-4 text-sm text-gray-500">{t("p11")}</p>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-4 p-2 rounded-xl border border-blue-600 text-black w-full file:mr-4 file:px-4 file:py-2 file:bg-blue-600 file:text-white file:rounded-lg hover:file:bg-blue-500 file:cursor-pointer"
          />

          {preview && (
            <div className="mb-4 rounded-lg border-2 border-white relative w-full h-64">
              <Image
                src={preview}
                alt="Preview"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={loading}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded shadow-lg transition duration-300"
          >
            {loading ? t("p12") : t("p13")}
          </button>

          {error && <p className="mt-4 text-red-500 font-semibold">{error}</p>}
        </div>

        {/* Prediction Result Section */}
        <div className="flex-1 flex flex-col gap-6 p-8 bg-white border-4 border-blue-600 rounded-2xl">
          <h2 className="text-2xl font-bold mb-4">Prediction Result / پیشن گوئی کا نتیجہ</h2>
          {prediction ? (
            <div className="space-y-4 text-center">
              <p className="text-lg font-semibold">
                <span className="text-blue-600">Class / کلاس:</span> {prediction.prediction}
              </p>
              <p className="text-lg font-semibold">
                <span className="text-blue-600">Confidence / درجۂ اعتماد:</span>{" "}
                {(prediction.confidence * 100).toFixed(2)}%
              </p>
            </div>
          ) : (
            <p className="text-gray-500">No prediction yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
