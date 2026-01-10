
import React, { useState, useRef } from 'react';
import { Camera, Upload, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { gemini } from '../services/geminiService';

const VisionMode: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setAnalysis(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage || loading) return;
    setLoading(true);
    try {
      const result = await gemini.analyzeScreenshot(selectedImage, "Analyze this game screen. Identify puzzles, enemies, or item recommendations based on the current state. Provide specific advice.");
      setAnalysis(result || "No analysis available.");
    } catch (err) {
      console.error(err);
      setAnalysis("Failed to analyze image. Ensure it's a valid game screenshot.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
      <div className="space-y-6">
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 overflow-hidden">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-xl flex items-center gap-2">
              <Camera className="text-indigo-400" />
              Vision Core
            </h3>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-sm transition-colors flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              Upload Capture
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
            />
          </div>

          <div className="aspect-video w-full bg-black rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center relative group">
            {selectedImage ? (
              <img src={selectedImage} alt="Game capture" className="w-full h-full object-contain" />
            ) : (
              <div className="text-center p-8">
                <Upload className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                <p className="text-slate-500">Select a screenshot of a puzzle, boss fight, or UI for instant AI assistance.</p>
              </div>
            )}
            {selectedImage && (
              <div className="absolute inset-0 bg-indigo-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <Sparkles className="text-white w-12 h-12 animate-pulse" />
              </div>
            )}
          </div>

          <button
            onClick={analyzeImage}
            disabled={!selectedImage || loading}
            className="w-full mt-6 py-4 gaming-gradient rounded-xl font-bold text-white shadow-lg shadow-indigo-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:scale-100"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
            {loading ? "Decrypting Visuals..." : "Run AI Analysis"}
          </button>
        </div>

        <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex gap-4 items-start">
          <AlertCircle className="text-indigo-400 shrink-0 w-6 h-6" />
          <p className="text-sm text-indigo-300">
            <strong>Tip:</strong> Screenshots of skill trees, minimaps, or complex puzzles work best for the Vision Core engine.
          </p>
        </div>
      </div>

      <div className="bg-[#0a0a0c] border border-slate-800 rounded-2xl p-8 overflow-y-auto custom-scrollbar">
        <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
          <Sparkles className="text-indigo-400" />
          Intelligence Report
        </h3>
        {analysis ? (
          <div className="prose prose-invert prose-indigo max-w-none">
            {analysis.split('\n').map((line, i) => (
              <p key={i} className="mb-4 text-slate-300 leading-relaxed">{line}</p>
            ))}
          </div>
        ) : (
          <div className="h-[calc(100%-4rem)] flex flex-col items-center justify-center text-slate-600 border-2 border-dashed border-slate-900 rounded-2xl">
            <Loader2 className={`w-12 h-12 mb-4 ${loading ? 'animate-spin' : ''}`} />
            <p className="font-medium">{loading ? 'Processing neural pathways...' : 'Awaiting input data'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VisionMode;
