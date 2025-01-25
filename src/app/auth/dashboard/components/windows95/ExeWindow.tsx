import React, { useState, useRef, useEffect } from 'react';

// Pencere başlığı bileşeni
const WindowTitle = ({ title, onClose, onMinimize, onMaximize, isMaximized }: { 
  title: string, 
  onClose: () => void,
  onMinimize: () => void,
  onMaximize: () => void,
  isMaximized: boolean
}) => (
  <div className="h-[32px] bg-gradient-to-r from-[#577783] to-[#577783] flex items-center justify-between px-2 select-none cursor-move">
    {/* Sol taraf - Başlık ve ikon */}
    <div className="flex items-center gap-2">
      <div className="w-5 h-5 bg-[#c0c0c0] p-[2px] shadow-[inset_-1px_-1px_#000000,inset_1px_1px_#ffffff]">
        <img src="/assets/onboarding/computer.png" alt="Program Icon" className="w-full h-full pixelated" />
      </div>
      <span className="text-white font-bold text-shadow-win95">{title}</span>
    </div>
    
    {/* Sağ taraf - Kontrol butonları */}
    <div className="flex gap-[2px]">
      {/* Minimize butonu */}
      <button 
        onClick={onMinimize}
        className="w-[22px] h-[22px] bg-[#c0c0c0] flex items-center justify-center
                 shadow-[inset_-1px_-1px_#000000,inset_1px_1px_#ffffff,inset_-2px_-2px_#808080,inset_2px_2px_#dfdfdf]
                 active:shadow-[inset_1px_1px_#000000,inset_-1px_-1px_#ffffff,inset_2px_2px_#808080,inset_-2px_-2px_#dfdfdf]
                 active:pt-[2px] active:pl-[2px] hover:bg-[#d4d0c8] cursor-pointer"
      >
        <div className="w-2 h-0.5 bg-black mt-2"></div>
      </button>

      {/* Maximize/Restore butonu */}
      <button 
        onClick={onMaximize}
        className="w-[22px] h-[22px] bg-[#c0c0c0] flex items-center justify-center
                 shadow-[inset_-1px_-1px_#000000,inset_1px_1px_#ffffff,inset_-2px_-2px_#808080,inset_2px_2px_#dfdfdf]
                 active:shadow-[inset_1px_1px_#000000,inset_-1px_-1px_#ffffff,inset_2px_2px_#808080,inset_-2px_-2px_#dfdfdf]
                 active:pt-[2px] active:pl-[2px] hover:bg-[#d4d0c8] cursor-pointer"
      >
        {isMaximized ? (
          <div className="w-[10px] h-[8px] border border-black relative -mt-[1px] bg-[#c0c0c0]">
            <div className="w-[8px] h-[6px] border border-black bg-[#c0c0c0] absolute -right-[3px] -bottom-[3px]"></div>
          </div>
        ) : (
          <div className="w-[10px] h-[8px] border border-black bg-[#c0c0c0]"></div>
        )}
      </button>
      
      {/* Kapat butonu */}
      <button 
        onClick={onClose}
        className="w-[22px] h-[22px] bg-[#c0c0c0] flex items-center justify-center
                 shadow-[inset_-1px_-1px_#000000,inset_1px_1px_#ffffff,inset_-2px_-2px_#808080,inset_2px_2px_#dfdfdf]
                 active:shadow-[inset_1px_1px_#000000,inset_-1px_-1px_#ffffff,inset_2px_2px_#808080,inset_-2px_-2px_#dfdfdf]
                 active:pt-[2px] active:pl-[2px] hover:bg-[#d4d0c8] cursor-pointer"
      >
        <span className="text-black font-bold leading-none mt-[-2px]">×</span>
      </button>
    </div>
  </div>
);

// Ana pencere bileşeni
interface ExeWindowProps {
  title: string;
  children: React.ReactNode;
  initialPosition?: { x: number; y: number };
  initialSize?: { width: number; height: number };
  onClose: () => void;
  onMinimize: () => void;
}

export default function ExeWindow({ 
  title, 
  children, 
  initialPosition = { x: 50, y: 50 },
  initialSize = { width: 400, height: 300 },
  onClose,
  onMinimize
}: ExeWindowProps) {
  const [position, setPosition] = useState(initialPosition);
  const [size, setSize] = useState(initialSize);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState<string>('');
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isMaximized, setIsMaximized] = useState(false);
  const [preMaximizeState, setPreMaximizeState] = useState<{
    position: typeof position,
    size: typeof size
  } | null>(null);

  // Minimum pencere boyutları
  const MIN_WIDTH = 400;  // Artırılmış minimum genişlik
  const MIN_HEIGHT = 300; // Artırılmış minimum yükseklik

  const windowRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    containerRef.current = document.querySelector('.dashboard-container');
  }, []);

  const handleMaximize = () => {
    if (!containerRef.current) return;

    if (!isMaximized) {
      // Mevcut durumu kaydet
      setPreMaximizeState({
        position: { ...position },
        size: { ...size }
      });

      // Maximize et
      setPosition({ x: 0, y: 0 });
      const containerRect = containerRef.current.getBoundingClientRect();
      setSize({
        width: containerRect.width,
        height: containerRect.height
      });
    } else if (preMaximizeState) {
      // Önceki duruma geri dön
      setPosition(preMaximizeState.position);
      setSize(preMaximizeState.size);
    }

    setIsMaximized(!isMaximized);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const titleBar = e.target as HTMLElement;
    if (titleBar.closest('.window-title') && !isMaximized) {
      e.preventDefault();
      setIsDragging(true);
      
      const windowRect = windowRef.current?.getBoundingClientRect();
      if (windowRect) {
        setDragOffset({
          x: e.clientX - windowRect.left,
          y: e.clientY - windowRect.top
        });
      }
    }
  };

  const handleResizeMouseDown = (e: React.MouseEvent, direction: string) => {
    if (isMaximized) return;
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    setResizeDirection(direction);
    setDragOffset({
      x: e.clientX,
      y: e.clientY
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!containerRef.current || !windowRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();

    if (isDragging) {
      const relativeX = e.clientX - containerRect.left;
      const relativeY = e.clientY - containerRect.top;

      let newX = relativeX - dragOffset.x;
      let newY = relativeY - dragOffset.y;

      newX = Math.max(0, Math.min(newX, containerRect.width - size.width));
      newY = Math.max(0, Math.min(newY, containerRect.height - size.height));

      setPosition({ x: newX, y: newY });
    }

    if (isResizing) {
      const deltaX = e.clientX - dragOffset.x;
      const deltaY = e.clientY - dragOffset.y;

      let newWidth = size.width;
      let newHeight = size.height;
      let newX = position.x;
      let newY = position.y;

      // Boyutlandırma yönüne göre hesapla
      if (resizeDirection.includes('e')) {
        newWidth = Math.max(MIN_WIDTH, size.width + deltaX);
        newWidth = Math.min(newWidth, containerRect.width - position.x);
      }
      if (resizeDirection.includes('s')) {
        newHeight = Math.max(MIN_HEIGHT, size.height + deltaY);
        newHeight = Math.min(newHeight, containerRect.height - position.y);
      }
      if (resizeDirection.includes('w')) {
        const maxLeftMove = position.x + size.width - MIN_WIDTH;
        const actualMove = Math.max(-position.x, Math.min(maxLeftMove, deltaX));
        newWidth = size.width - actualMove;
        newX = position.x + actualMove;
      }
      if (resizeDirection.includes('n')) {
        const maxTopMove = position.y + size.height - MIN_HEIGHT;
        const actualMove = Math.max(-position.y, Math.min(maxTopMove, deltaY));
        newHeight = size.height - actualMove;
        newY = position.y + actualMove;
      }

      setSize({ width: newWidth, height: newHeight });
      setPosition({ x: newX, y: newY });
      setDragOffset({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = 'none';
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = '';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = '';
    };
  }, [isDragging, isResizing]);

  const resizeCursors = {
    n: 'cursor-n-resize',
    s: 'cursor-s-resize',
    e: 'cursor-e-resize',
    w: 'cursor-w-resize',
    ne: 'cursor-ne-resize',
    nw: 'cursor-nw-resize',
    se: 'cursor-se-resize',
    sw: 'cursor-sw-resize'
  };

  return (
    <div 
      ref={windowRef}
      className="absolute select-none"
      style={{ 
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        zIndex: isDragging || isResizing ? 9999 : 1
      }}
    >
      {/* Dış Gölge */}
      <div className="absolute -right-1 -bottom-1 w-full h-full bg-black opacity-20"></div>
      
      {/* Ana Pencere */}
      <div className="relative w-full h-full bg-[#c0c0c0] overflow-hidden">
        {/* Kenar boyutlandırıcıları */}
        {!isMaximized && (
          <>
            {/* Köşe boyutlandırıcıları */}
            <div className="absolute -top-[3px] -left-[3px] w-[10px] h-[10px]">
              <div className={`w-full h-full ${resizeCursors.nw} z-50 hover:bg-[#c0c0c0] hover:shadow-[inset_-1px_-1px_#000000,inset_1px_1px_#ffffff]`} 
                onMouseDown={(e) => handleResizeMouseDown(e, 'nw')} />
            </div>
            <div className="absolute -top-[3px] -right-[3px] w-[10px] h-[10px]">
              <div className={`w-full h-full ${resizeCursors.ne} z-50 hover:bg-[#c0c0c0] hover:shadow-[inset_-1px_-1px_#000000,inset_1px_1px_#ffffff]`}
                onMouseDown={(e) => handleResizeMouseDown(e, 'ne')} />
            </div>
            <div className="absolute -bottom-[3px] -left-[3px] w-[10px] h-[10px]">
              <div className={`w-full h-full ${resizeCursors.sw} z-50 hover:bg-[#c0c0c0] hover:shadow-[inset_-1px_-1px_#000000,inset_1px_1px_#ffffff]`}
                onMouseDown={(e) => handleResizeMouseDown(e, 'sw')} />
            </div>
            <div className="absolute -bottom-[3px] -right-[3px] w-[10px] h-[10px]">
              <div className={`w-full h-full ${resizeCursors.se} z-50 hover:bg-[#c0c0c0] hover:shadow-[inset_-1px_-1px_#000000,inset_1px_1px_#ffffff]`}
                onMouseDown={(e) => handleResizeMouseDown(e, 'se')} />
            </div>

            {/* Kenar boyutlandırıcıları */}
            <div className="absolute top-[3px] -left-[3px] w-[10px] h-[calc(100%-6px)]">
              <div className={`w-full h-full ${resizeCursors.w} z-50 hover:bg-[#c0c0c0] hover:shadow-[inset_-1px_-1px_#000000,inset_1px_1px_#ffffff]`}
                onMouseDown={(e) => handleResizeMouseDown(e, 'w')} />
            </div>
            <div className="absolute top-[3px] -right-[3px] w-[10px] h-[calc(100%-6px)]">
              <div className={`w-full h-full ${resizeCursors.e} z-50 hover:bg-[#c0c0c0] hover:shadow-[inset_-1px_-1px_#000000,inset_1px_1px_#ffffff]`}
                onMouseDown={(e) => handleResizeMouseDown(e, 'e')} />
            </div>
            <div className="absolute -top-[3px] left-[3px] w-[calc(100%-6px)] h-[10px]">
              <div className={`w-full h-full ${resizeCursors.n} z-50 hover:bg-[#c0c0c0] hover:shadow-[inset_-1px_-1px_#000000,inset_1px_1px_#ffffff]`}
                onMouseDown={(e) => handleResizeMouseDown(e, 'n')} />
            </div>
            <div className="absolute -bottom-[3px] left-[3px] w-[calc(100%-6px)] h-[10px]">
              <div className={`w-full h-full ${resizeCursors.s} z-50 hover:bg-[#c0c0c0] hover:shadow-[inset_-1px_-1px_#000000,inset_1px_1px_#ffffff]`}
                onMouseDown={(e) => handleResizeMouseDown(e, 's')} />
            </div>
          </>
        )}

        {/* Pencere kenarları */}
        <div className="w-full h-full border-[3px] border-[#dfdfdf]">
          <div className="w-full h-full border-[3px] border-[#808080]">
            <div className="w-full h-full border-[2px] border-[#404040] flex flex-col">
              {/* Başlık çubuğu */}
              <div className="window-title min-h-[32px]" onMouseDown={handleMouseDown}>
                <WindowTitle 
                  title={title} 
                  onClose={onClose}
                  onMinimize={onMinimize}
                  onMaximize={handleMaximize}
                  isMaximized={isMaximized}
                />
              </div>
              
              {/* İçerik alanı */}
              <div className="flex-1 bg-white border-t-2 border-t-[#404040] overflow-auto">
                <div className="p-4">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 