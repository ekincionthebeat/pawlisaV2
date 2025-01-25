"use client"

import Taskbar from './components/windows95/Taskbar'
import { useState, useEffect } from 'react'

export default function DashboardPage() {
  const [isStartOpen, setIsStartOpen] = useState(false)
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const menuItemClass = "relative w-full h-[42px] flex items-center text-left group hover:bg-[#577783]"
  const menuTextClass = "text-base leading-none font-bold text-black group-hover:text-white truncate"
  const menuIconClass = "absolute left-1.5 w-[32px] h-[32px] object-contain"

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
          <div className="h-[calc(100%-48px)]">
            {/* Windows uygulamaları ve içerik buraya gelecek */}
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
