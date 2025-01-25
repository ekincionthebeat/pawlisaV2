"use client"

// Windows 95 stil taskbar bileşeni
const Taskbar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-12 bg-[#c0c0c0] border-t-2 border-[#ffffff] shadow-[inset_-1px_-1px_#0a0a0a]">
      {/* Start butonu */}
      <div className="flex items-center h-full px-1">
        <button className="h-[34px] px-2 flex items-center bg-[#c0c0c0] border-2 border-[#ffffff] shadow-[inset_-1px_-1px_#0a0a0a] hover:active:border-[#0a0a0a] hover:active:shadow-[inset_1px_1px_#0a0a0a]">
          <img 
            src="/assets/windows95/windows-logo.png" 
            alt="Windows 95 Logo" 
            className="w-5 h-5 mr-1"
          />
          <span className="font-w95fa text-sm">Start</span>
        </button>

        {/* Ayırıcı çizgi */}
        <div className="mx-2 h-full w-[1px] bg-[#808080]"></div>

        {/* Saat */}
        <div className="ml-auto px-2 py-1 font-w95fa text-sm border border-[#808080] shadow-[inset_1px_1px_#808080]">
          {new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  )
}

export default Taskbar 