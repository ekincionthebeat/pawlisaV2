"use client"

import Taskbar from './components/windows95/Taskbar'
import ExeWindow from './components/windows95/ExeWindow'
import ForumWindow from './components/windows95/pencereler/ForumWindow'
import TxtPixWindow from './components/windows95/pencereler/TxtPixWindow'
import { useState, useEffect } from 'react'
import { WindowProvider, useWindow } from './contexts/WindowContext'
import { FileTreeView } from './components/sidebar/file-tree/FileTreeView'

// Masaüstü ikonu bileşeni
const DesktopIcon = ({ icon, label }: { icon: string; label: string }) => (
  <div className="flex flex-col items-center gap-2 w-[80px] group cursor-pointer">
    <img 
      src={icon} 
      alt={label} 
      className="w-12 h-12 pixelated group-hover:opacity-80 group-active:opacity-60" 
    />
    <span className="text-white text-xs text-center font-['W95FA'] text-shadow-win95">
      {label}
    </span>
  </div>
);

export default function DashboardPage() {
  const [isStartOpen, setIsStartOpen] = useState(false)
  const [time, setTime] = useState(new Date())
  const [showExeWindow, setShowExeWindow] = useState(true)
  const [showForumWindow, setShowForumWindow] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isForumMinimized, setIsForumMinimized] = useState(false)
  const [isTxtPixMinimized, setIsTxtPixMinimized] = useState(false)
  const { showTxtPixWindow, setShowTxtPixWindow, bringToFront, getZIndex, activeWindows } = useWindow();

  // Pencere boyutları
  const windowWidth = 580;
  const windowHeight = 420;

  // Başlangıç konumu ve boyutu için state'ler
  const [initialWindowPosition, setInitialWindowPosition] = useState({ x: 0, y: 0 });
  const [initialWindowSize] = useState({ width: windowWidth, height: windowHeight });

  // Pencere pozisyonları için state'ler
  const [forumPosition, setForumPosition] = useState({ x: 0, y: 0 });
  const [txtPixPosition, setTxtPixPosition] = useState({ x: 0, y: 0 });

  // Client-side window hesaplamaları
  useEffect(() => {
    // Welcome.exe pozisyonu - container'ın merkezine göre hesaplama
    const container = document.querySelector('.dashboard-container');
    if (container) {
      const rect = container.getBoundingClientRect();
      const containerCenterX = Math.max(0, (rect.width - windowWidth) / 2);
      const containerCenterY = Math.max(0, (rect.height - windowHeight) / 2);
      setInitialWindowPosition({ x: containerCenterX, y: containerCenterY });

      // Forum.exe container pozisyonu
      const forumContainerX = Math.max(0, (rect.width - 500) / 2);
      const forumContainerY = Math.max(0, (rect.height - 600) / 2);
      setForumPosition({ x: forumContainerX, y: forumContainerY });

      // TxtPix.exe container pozisyonu
      const txtPixContainerX = Math.max(0, (rect.width - 600) / 2);
      const txtPixContainerY = Math.max(0, (rect.height - 500) / 2);
      setTxtPixPosition({ x: txtPixContainerX, y: txtPixContainerY });
    } else {
      // Fallback - window boyutlarına göre merkez hesaplama
      const centerX = Math.max(0, (window.innerWidth - windowWidth) / 2);
      const centerY = Math.max(0, (window.innerHeight - windowHeight - 48) / 2);
      setInitialWindowPosition({ x: centerX, y: centerY });

      // Forum.exe pozisyonu
      const forumX = Math.max(0, (window.innerWidth - 500) / 2);
      const forumY = Math.max(0, (window.innerHeight - 600 - 48) / 2);
      setForumPosition({ x: forumX, y: forumY });

      // TxtPix.exe pozisyonu
      const txtPixX = Math.max(0, (window.innerWidth - 600) / 2);
      const txtPixY = Math.max(0, (window.innerHeight - 500 - 48) / 2);
      setTxtPixPosition({ x: txtPixX, y: txtPixY });
    }
  }, [windowWidth, windowHeight]);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const menuItemClass = "relative w-full h-[42px] flex items-center text-left group hover:bg-[#577783]"
  const menuTextClass = "text-base leading-none font-bold text-black group-hover:text-white truncate"
  const menuIconClass = "absolute left-1.5 w-[32px] h-[32px] object-contain"

  const handleTaskbarClick = () => {
    setIsMinimized(!isMinimized);
    bringToFront('welcome');
  };

  const handleForumTaskbarClick = () => {
    setIsForumMinimized(!isForumMinimized);
    bringToFront('forum');
  };

  const handleTxtPixTaskbarClick = () => {
    setIsTxtPixMinimized(!isTxtPixMinimized);
    bringToFront('txtpix');
  };

  const MenuText = ({ children }: { children: string }) => (
    <span className={menuTextClass}>
      <span className="underline underline-offset-[3px] decoration-[1px]">{children[0]}</span>
      {children.slice(1)}
    </span>
  )

  return (
    <div className="bg-zinc-900/50 rounded-lg h-full font-['W95FA']">
      {/* Arka plan ve içerik alanı */}
      <div className="relative h-full rounded-lg overflow-hidden">
        <div className="bg-[url('/assets/onboarding/bgdash.png')] bg-cover bg-center bg-no-repeat h-full">
          <div className="h-[calc(100%-48px)] relative dashboard-container">
            {/* Masaüstü İkonları */}
            <div className="absolute left-4 top-4 flex flex-col gap-4">
              <DesktopIcon 
                icon="/assets/onboarding/computer.png"
                label="Computer"
              />
              <div onClick={() => setShowForumWindow(true)}>
                <DesktopIcon 
                  icon="/assets/onboarding/inbox.png"
                  label="Inbox"
                />
              </div>
              <DesktopIcon 
                icon="/assets/onboarding/recycle-bin.webp"
                label="Recycle Bin"
              />
            </div>

            {/* Exe Penceresi */}
            {showExeWindow && !isMinimized && (
              <div 
                className="absolute"
                style={{ zIndex: getZIndex('welcome') }}
                onClick={() => bringToFront('welcome')}
              >
                <ExeWindow
                  title="Welcome.exe"
                  onClose={() => setShowExeWindow(false)}
                  onMinimize={() => setIsMinimized(true)}
                  initialPosition={initialWindowPosition}
                  initialSize={initialWindowSize}
                >
                  <div className="flex flex-col gap-6 text-black">
                    <div className="flex items-center gap-4">
                      <img src="/assets/onboarding/pawlogo.webp" alt="Pawlisa Logo" className="w-16 h-16 pixelated" />
                      <div>
                        <h2 className="text-2xl font-bold mb-1">Pawlisa'ya Hoş Geldiniz!</h2>
                        <p className="text-sm text-gray-600">Versiyon 1.0.0</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <p className="text-sm leading-relaxed">
                        Pawlisa, evcil hayvan sahipleri için geliştirilmiş modern bir yönetim platformudur. 
                        Windows 95 temasıyla nostaljik bir deneyim sunarken, en son teknolojilerle güçlendirilmiş özelliklere sahiptir.
                      </p>

                      <div className="bg-[#f0f0f0] p-4 border-2 border-[#808080] shadow-[inset_1px_1px_#ffffff]">
                        <h3 className="font-bold mb-2 text-sm">Başlangıç İpuçları:</h3>
                        <ul className="text-sm space-y-2">
                          <li className="flex items-center gap-2">
                            <img src="/assets/onboarding/computer.png" alt="Computer" className="w-4 h-4" />
                            <span>Sol üst köşedeki Start menüsünü kullanarak uygulamalara erişebilirsiniz</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <img src="/assets/onboarding/settings.png" alt="Settings" className="w-4 h-4" />
                            <span>Ayarlar menüsünden tercihlerinizi özelleştirebilirsiniz</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <img src="/assets/onboarding/support3.webp" alt="Support" className="w-4 h-4" />
                            <span>Yardıma ihtiyacınız olursa destek ekibimize ulaşabilirsiniz</span>
                          </li>
                        </ul>
                      </div>

                      <div className="flex justify-end">
                        <button 
                          onClick={() => setShowExeWindow(false)}
                          className="px-6 py-1.5 bg-[#c0c0c0] text-sm
                                   shadow-[inset_-1px_-1px_#000000,inset_1px_1px_#ffffff,inset_-2px_-2px_#808080,inset_2px_2px_#dfdfdf]
                                   active:shadow-[inset_1px_1px_#000000,inset_-1px_-1px_#ffffff,inset_2px_2px_#808080,inset_-2px_-2px_#dfdfdf]
                                   active:pt-[7px] active:pb-[5px] hover:bg-[#d4d0c8]"
                        >
                          Tamam
                        </button>
                      </div>
                    </div>
                  </div>
                </ExeWindow>
              </div>
            )}

            {/* Forum Penceresi */}
            {showForumWindow && !isForumMinimized && (
              <div 
                className="absolute"
                style={{ zIndex: getZIndex('forum') }}
                onClick={() => bringToFront('forum')}
              >
                <ForumWindow
                  onClose={() => setShowForumWindow(false)}
                  onMinimize={() => setIsForumMinimized(true)}
                  initialPosition={forumPosition}
                />
              </div>
            )}

            {/* TxtPix Penceresi */}
            {showTxtPixWindow && !isTxtPixMinimized && (
              <div 
                className="absolute"
                style={{ zIndex: getZIndex('txtpix') }}
                onClick={() => bringToFront('txtpix')}
              >
                <TxtPixWindow
                  onClose={() => setShowTxtPixWindow(false)}
                  onMinimize={() => setIsTxtPixMinimized(true)}
                  initialPosition={txtPixPosition}
                />
              </div>
            )}
          </div>
          
          {/* Windows 95 taskbar */}
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-[#c0c0c0] border-t-2 border-[#ffffff] shadow-[inset_-1px_-1px_#0a0a0a]">
            <div className="flex items-center h-full px-1">
              <div className="relative">
                <button 
                  onClick={() => setIsStartOpen(!isStartOpen)}
                  className={`h-[34px] min-w-[72px] flex items-center justify-center bg-[#cac6cb] ${
                    isStartOpen 
                    ? 'shadow-[inset_1.5px_1.5px_#263238,inset_-1.5px_-1.5px_#fcfcfc,inset_3px_3px_#a099a1,inset_-3px_-3px_#cac6cb] pb-0 pr-0 pt-[1.5px] pl-[1.5px]' 
                    : 'shadow-[inset_-1.5px_-1.5px_#263238,inset_1.5px_1.5px_#fcfcfc,inset_-3px_-3px_#a099a1,inset_3px_3px_#cac6cb] pb-[1.5px] pr-[1.5px]'
                  } z-[4]`}
                >
                  <div className="flex items-center justify-center gap-1 px-1">
                    <img 
                      src="/assets/onboarding/start.webp" 
                      alt="Start Logo" 
                      className="w-5 h-5 object-contain"
                    />
                    <span className="text-base leading-none mt-[1px] text-black font-bold">Start</span>
                  </div>
                </button>

                {/* Start Menü */}
                {isStartOpen && (
                  <div className="absolute bottom-[42px] left-0 w-[220px] bg-[#c0c0c0] shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)]">
                    <div className="flex h-[280px] border-[2px] border-[#dfdfdf] box-content">
                      <div className="flex w-full border-[2px] border-[#868686]">
                        <div className="flex w-full border-[2px] border-[#404040]">
                          {/* Sol Kenar Çizgisi */}
                          <div className="w-[40px] bg-[#808080] flex-shrink-0"></div>
                          
                          {/* Menü İçeriği */}
                          <div className="flex-1 flex flex-col h-full">
                            <div className="flex-1 flex flex-col justify-between py-2">
                              <div>
                                {/* History */}
                                <button className={menuItemClass}>
                                  <img src="/assets/onboarding/history.webp" alt="History" className={menuIconClass} />
                                  <div className="pl-11">
                                    <MenuText>History</MenuText>
                                  </div>
                                </button>

                                {/* Settings */}
                                <button className={menuItemClass}>
                                  <img src="/assets/onboarding/settings.png" alt="Settings" className={menuIconClass} />
                                  <div className="pl-11">
                                    <MenuText>Settings</MenuText>
                                  </div>
                                </button>

                                {/* Roadmap */}
                                <button className={menuItemClass}>
                                  <img src="/assets/onboarding/roadmap.png" alt="Roadmap" className={menuIconClass} />
                                  <div className="pl-11">
                                    <MenuText>Roadmap</MenuText>
                                  </div>
                                </button>

                                {/* Updates */}
                                <button className={menuItemClass}>
                                  <img src="/assets/onboarding/updates.webp" alt="Updates" className={menuIconClass} />
                                  <div className="pl-11">
                                    <MenuText>Updates</MenuText>
                                  </div>
                                </button>

                                {/* Support */}
                                <button className={menuItemClass}>
                                  <img src="/assets/onboarding/support3.webp" alt="Support" className={menuIconClass} />
                                  <div className="pl-11">
                                    <MenuText>Support</MenuText>
                                  </div>
                                </button>
                              </div>

                              <div>
                                {/* Ayırıcı Çizgi */}
                                <div className="my-1 mx-1">
                                  <div className="h-[1px] bg-[#808080]"></div>
                                  <div className="h-[1px] bg-[#ffffff]"></div>
                                </div>

                                {/* Shut Down */}
                                <button className={menuItemClass}>
                                  <img src="/assets/onboarding/shut-down.webp" alt="Shut Down" className={menuIconClass} />
                                  <div className="pl-11">
                                    <MenuText>Shut Down</MenuText>
                                  </div>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Ayırıcı çizgi */}
              <div className="mx-2 h-[70%] flex">
                <div className="w-[1px] h-full bg-[#808080]"></div>
                <div className="w-[1px] h-full bg-[#ffffff]"></div>
              </div>

              {/* Aktif pencereler */}
              {showExeWindow && (
                <button 
                  onClick={handleTaskbarClick}
                  className={`h-[34px] px-2 mr-1 flex items-center gap-2 min-w-[160px] ${
                    !isMinimized && getZIndex('welcome') === Math.max(...activeWindows.map(w => w.zIndex))
                    ? 'shadow-[inset_1.5px_1.5px_#263238,inset_-1.5px_-1.5px_#fcfcfc,inset_3px_3px_#a099a1,inset_-3px_-3px_#cac6cb] bg-[#bdb9be]' 
                    : 'shadow-[inset_-1.5px_-1.5px_#263238,inset_1.5px_1.5px_#fcfcfc,inset_-3px_-3px_#a099a1,inset_3px_3px_#cac6cb] bg-[#cac6cb]'
                  }`}
                >
                  <img src="/assets/onboarding/computer.png" alt="Program Icon" className="w-4 h-4" />
                  <span className={`text-sm text-black leading-none ${!isMinimized && getZIndex('welcome') === Math.max(...activeWindows.map(w => w.zIndex)) ? 'font-bold' : ''}`}>
                    Welcome.exe
                  </span>
                </button>
              )}

              {showForumWindow && (
                <button 
                  onClick={handleForumTaskbarClick}
                  className={`h-[34px] px-2 mr-1 flex items-center gap-2 min-w-[160px] ${
                    !isForumMinimized && getZIndex('forum') === Math.max(...activeWindows.map(w => w.zIndex))
                    ? 'shadow-[inset_1.5px_1.5px_#263238,inset_-1.5px_-1.5px_#fcfcfc,inset_3px_3px_#a099a1,inset_-3px_-3px_#cac6cb] bg-[#bdb9be]' 
                    : 'shadow-[inset_-1.5px_-1.5px_#263238,inset_1.5px_1.5px_#fcfcfc,inset_-3px_-3px_#a099a1,inset_3px_3px_#cac6cb] bg-[#cac6cb]'
                  }`}
                >
                  <img src="/assets/onboarding/inbox.png" alt="Forum Icon" className="w-4 h-4" />
                  <span className={`text-sm text-black leading-none ${!isForumMinimized && getZIndex('forum') === Math.max(...activeWindows.map(w => w.zIndex)) ? 'font-bold' : ''}`}>
                    Forum.exe
                  </span>
                </button>
              )}

              {showTxtPixWindow && (
                <button 
                  onClick={handleTxtPixTaskbarClick}
                  className={`h-[34px] px-2 mr-1 flex items-center gap-2 min-w-[160px] ${
                    !isTxtPixMinimized && getZIndex('txtpix') === Math.max(...activeWindows.map(w => w.zIndex))
                    ? 'shadow-[inset_1.5px_1.5px_#263238,inset_-1.5px_-1.5px_#fcfcfc,inset_3px_3px_#a099a1,inset_-3px_-3px_#cac6cb] bg-[#bdb9be]' 
                    : 'shadow-[inset_-1.5px_-1.5px_#263238,inset_1.5px_1.5px_#fcfcfc,inset_-3px_-3px_#a099a1,inset_3px_3px_#cac6cb] bg-[#cac6cb]'
                  }`}
                >
                  <img src="/assets/onboarding/txt2img.png" alt="TxtPix Icon" className="w-4 h-4" />
                  <span className={`text-sm text-black leading-none ${!isTxtPixMinimized && getZIndex('txtpix') === Math.max(...activeWindows.map(w => w.zIndex)) ? 'font-bold' : ''}`}>
                    txtpix.exe
                  </span>
                </button>
              )}

              {/* Saat */}
              <div className="ml-auto h-[26px] px-2 flex items-center bg-[#c0c0c0] shadow-[inset_1px_1px_#808080,inset_-1px_-1px_#ffffff] text-black">
                <span className="text-sm leading-none font-bold">
                  {time.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
