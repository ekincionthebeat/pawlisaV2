import React, { createContext, useContext, useState } from 'react';

interface Window {
  id: string;
  zIndex: number;
}

interface WindowContextType {
  showTxtPixWindow: boolean;
  setShowTxtPixWindow: (show: boolean) => void;
  activeWindows: Window[];
  bringToFront: (windowId: string) => void;
  getZIndex: (windowId: string) => number;
}

const WindowContext = createContext<WindowContextType | undefined>(undefined);

export function WindowProvider({ children }: { children: React.ReactNode }) {
  const [showTxtPixWindow, setShowTxtPixWindow] = useState(false);
  const [activeWindows, setActiveWindows] = useState<Window[]>([
    { id: 'welcome', zIndex: 1 },
    { id: 'forum', zIndex: 2 },
    { id: 'txtpix', zIndex: 3 }
  ]);

  const bringToFront = (windowId: string) => {
    setActiveWindows(prev => {
      const maxZ = Math.max(...prev.map(w => w.zIndex));
      return prev.map(window => 
        window.id === windowId 
          ? { ...window, zIndex: maxZ + 1 }
          : window
      );
    });
  };

  const getZIndex = (windowId: string) => {
    return activeWindows.find(w => w.id === windowId)?.zIndex || 1;
  };

  return (
    <WindowContext.Provider value={{
      showTxtPixWindow,
      setShowTxtPixWindow,
      activeWindows,
      bringToFront,
      getZIndex
    }}>
      {children}
    </WindowContext.Provider>
  );
}

export function useWindow() {
  const context = useContext(WindowContext);
  if (context === undefined) {
    throw new Error('useWindow must be used within a WindowProvider');
  }
  return context;
} 