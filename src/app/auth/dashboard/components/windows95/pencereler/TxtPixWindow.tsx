import React, { useState } from 'react';
import ExeWindow from '../ExeWindow';

interface TxtPixWindowProps {
  onClose: () => void;
  onMinimize: () => void;
  initialPosition?: { x: number; y: number };
}

export default function TxtPixWindow({ onClose, onMinimize, initialPosition }: TxtPixWindowProps) {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleGenerate = () => {
    setIsGenerating(true);
    // API çağrısı simülasyonu
    setTimeout(() => {
      setResult('/assets/onboarding/sample-pixel.png'); // Örnek bir sonuç
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <ExeWindow
      title="txtpix.exe"
      onClose={onClose}
      onMinimize={onMinimize}
      initialPosition={initialPosition}
      initialSize={{ width: 600, height: 500 }}
    >
      <div className="flex flex-col gap-6 text-black p-4">
        <div className="flex items-center gap-4">
          <img src="/assets/onboarding/txt2img.png" alt="TxtPix Icon" className="w-12 h-12 pixelated" />
          <div>
            <h2 className="text-xl font-bold mb-1">Text to Pixel Art Dönüştürücü</h2>
            <p className="text-sm text-gray-600">Metninizi pixel art'a dönüştürün</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-bold">Prompt</label>
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
              placeholder="Pixel art'a dönüştürmek istediğiniz metni girin..."
              className="w-full px-2 py-1 border-2 border-[#808080] shadow-[inset_-1px_-1px_#ffffff,inset_1px_1px_#000000]
                       focus:outline-none focus:border-[#000080] resize-none font-['W95FA']" 
            />
          </div>

          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              {isGenerating && "Dönüştürülüyor..."}
            </div>
            <button 
              onClick={handleGenerate}
              disabled={!prompt.trim() || isGenerating}
              className={`px-6 py-1.5 bg-[#c0c0c0] text-sm
                       shadow-[inset_-1px_-1px_#000000,inset_1px_1px_#ffffff,inset_-2px_-2px_#808080,inset_2px_2px_#dfdfdf]
                       active:shadow-[inset_1px_1px_#000000,inset_-1px_-1px_#ffffff,inset_2px_2px_#808080,inset_-2px_-2px_#dfdfdf]
                       active:pt-[7px] active:pb-[5px] hover:bg-[#d4d0c8]
                       disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              Dönüştür
            </button>
          </div>

          {result && (
            <div className="space-y-2">
              <label className="block text-sm font-bold">Sonuç</label>
              <div className="border-2 border-[#808080] p-2 bg-white shadow-[inset_-1px_-1px_#ffffff,inset_1px_1px_#000000]">
                <img 
                  src={result} 
                  alt="Generated Pixel Art" 
                  className="w-full h-auto pixelated"
                />
              </div>
            </div>
          )}

          <div className="bg-[#f0f0f0] p-4 border-2 border-[#808080] shadow-[inset_1px_1px_#ffffff]">
            <p className="text-sm text-gray-600">
              * Daha iyi sonuçlar için detaylı açıklamalar kullanın.
            </p>
          </div>
        </div>
      </div>
    </ExeWindow>
  );
} 