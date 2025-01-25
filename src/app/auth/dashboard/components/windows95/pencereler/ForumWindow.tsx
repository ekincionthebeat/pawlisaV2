import React from 'react';
import ExeWindow from '../ExeWindow';

interface ForumWindowProps {
  onClose: () => void;
  onMinimize: () => void;
  initialPosition?: { x: number; y: number };
}

export default function ForumWindow({ onClose, onMinimize, initialPosition }: ForumWindowProps) {
  return (
    <ExeWindow
      title="Forum.exe"
      onClose={onClose}
      onMinimize={onMinimize}
      initialPosition={initialPosition}
      initialSize={{ width: 500, height: 600 }}
    >
      <div className="flex flex-col gap-6 text-black">
        <div className="flex items-center gap-4">
          <img src="/assets/onboarding/inbox.png" alt="Forum Icon" className="w-12 h-12 pixelated" />
          <div>
            <h2 className="text-xl font-bold mb-1">Destek Formu</h2>
            <p className="text-sm text-gray-600">Lütfen aşağıdaki formu doldurun</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-bold">Konu</label>
            <input 
              type="text" 
              className="w-full px-2 py-1 border-2 border-[#808080] shadow-[inset_-1px_-1px_#ffffff,inset_1px_1px_#000000]
                       focus:outline-none focus:border-[#000080]" 
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold">E-posta</label>
            <input 
              type="email" 
              className="w-full px-2 py-1 border-2 border-[#808080] shadow-[inset_-1px_-1px_#ffffff,inset_1px_1px_#000000]
                       focus:outline-none focus:border-[#000080]" 
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold">Mesajınız</label>
            <textarea 
              rows={6}
              className="w-full px-2 py-1 border-2 border-[#808080] shadow-[inset_-1px_-1px_#ffffff,inset_1px_1px_#000000]
                       focus:outline-none focus:border-[#000080] resize-none" 
            />
          </div>

          <div className="bg-[#f0f0f0] p-4 border-2 border-[#808080] shadow-[inset_1px_1px_#ffffff]">
            <p className="text-sm text-gray-600">
              * Formunuz gönderildikten sonra en kısa sürede size dönüş yapılacaktır.
            </p>
          </div>

          <div className="flex justify-end gap-2">
            <button 
              className="px-6 py-1.5 bg-[#c0c0c0] text-sm
                       shadow-[inset_-1px_-1px_#000000,inset_1px_1px_#ffffff,inset_-2px_-2px_#808080,inset_2px_2px_#dfdfdf]
                       active:shadow-[inset_1px_1px_#000000,inset_-1px_-1px_#ffffff,inset_2px_2px_#808080,inset_-2px_-2px_#dfdfdf]
                       active:pt-[7px] active:pb-[5px] hover:bg-[#d4d0c8]"
            >
              Gönder
            </button>
            <button 
              onClick={onClose}
              className="px-6 py-1.5 bg-[#c0c0c0] text-sm
                       shadow-[inset_-1px_-1px_#000000,inset_1px_1px_#ffffff,inset_-2px_-2px_#808080,inset_2px_2px_#dfdfdf]
                       active:shadow-[inset_1px_1px_#000000,inset_-1px_-1px_#ffffff,inset_2px_2px_#808080,inset_-2px_-2px_#dfdfdf]
                       active:pt-[7px] active:pb-[5px] hover:bg-[#d4d0c8]"
            >
              İptal
            </button>
          </div>
        </div>
      </div>
    </ExeWindow>
  );
} 