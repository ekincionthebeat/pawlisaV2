"use client"

import { cn } from "@/lib/utils"
import "./styles/cat-animation.scss"

interface ConnectButtonProps {
  className?: string
}

export function ConnectButton({ className }: ConnectButtonProps) {
  return (
    <div className="connect-container">
      <button
        aria-label="Connect wallet"
        role="button"
        className={cn(
          "fixed sm:top-6 sm:right-6 right-4 top-4 z-[60]",
          "px-4 sm:px-6 py-2",
          "text-white font-press-start text-xs tracking-wider",
          "bg-white/5 hover:bg-white/10 active:bg-white/15",
          "border border-white/10 hover:border-white/20 active:border-white/25",
          "select-none transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-black",
          "touch-manipulation",
          className
        )}
        style={{
          textShadow: '0 2px 4px rgba(0,0,0,0.5)',
          boxShadow: '0 0 10px rgba(255,255,255,0.1)',
        }}
        onClick={() => {
          // Bağlantı işlevselliğini buraya ekleyin
        }}
      >
        CONNECT
      </button>

      {/* Kedi Animasyonu ve Twitter Linki */}
      <a href="https://x.com/PawlisaAI" target="_blank" rel="noopener noreferrer" className="all-wrap">
        <div className="all">
          <div className="yarn"></div>
          <div className="cat-wrap">    
            <div className="cat">
              <div className="cat-upper">
                <div className="cat-leg"></div>
                <div className="cat-leg"></div>
                <div className="cat-head">
                  <div className="cat-ears">
                    <div className="cat-ear"></div>
                    <div className="cat-ear"></div>
                  </div>
                  <div className="cat-face">
                    <div className="cat-eyes"></div>
                    <div className="cat-mouth"></div>
                    <div className="cat-whiskers"></div>
                  </div>
                </div>
              </div>
              <div className="cat-lower-wrap">
                <div className="cat-lower">
                  <div className="cat-leg">
                    <div className="cat-leg">
                      <div className="cat-leg">
                        <div className="cat-leg">
                          <div className="cat-leg">
                            <div className="cat-leg">
                              <div className="cat-leg">
                                <div className="cat-leg">
                                  <div className="cat-leg">
                                    <div className="cat-leg">
                                      <div className="cat-leg">
                                        <div className="cat-leg">
                                          <div className="cat-leg">
                                            <div className="cat-leg">
                                              <div className="cat-leg">
                                                <div className="cat-leg">
                                                  <div className="cat-paw"></div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="cat-leg">
                    <div className="cat-leg">
                      <div className="cat-leg">
                        <div className="cat-leg">
                          <div className="cat-leg">
                            <div className="cat-leg">
                              <div className="cat-leg">
                                <div className="cat-leg">
                                  <div className="cat-leg">
                                    <div className="cat-leg">
                                      <div className="cat-leg">
                                        <div className="cat-leg">
                                          <div className="cat-leg">
                                            <div className="cat-leg">
                                              <div className="cat-leg">
                                                <div className="cat-leg">
                                                  <div className="cat-paw"></div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="cat-tail">
                    <div className="cat-tail">
                      <div className="cat-tail">
                        <div className="cat-tail">
                          <div className="cat-tail">
                            <div className="cat-tail">
                              <div className="cat-tail">
                                <div className="cat-tail">
                                  <div className="cat-tail">
                                    <div className="cat-tail">
                                      <div className="cat-tail">
                                        <div className="cat-tail">
                                          <div className="cat-tail">
                                            <div className="cat-tail">
                                              <div className="cat-tail">
                                                <div className="cat-tail -end"></div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  )
} 