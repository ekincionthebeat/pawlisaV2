"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { File, Folder, Tree, type TreeViewElement } from "./file-tree"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Search } from "lucide-react"
import { useWindow } from "../../../contexts/WindowContext"

// Güvenli input bileşeni
const Input = ({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) => {
  // XSS koruması için input sanitization
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitizedValue = e.target.value.replace(/<[^>]*>/g, '');
    if (props.onChange) {
      e.target.value = sanitizedValue;
      props.onChange(e);
    }
  }, [props.onChange]);

  return (
    <input
      {...props}
      onChange={handleChange}
      className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background 
                 file:border-0 file:bg-transparent file:text-sm file:font-medium 
                 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 
                 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed 
                 disabled:opacity-50 ${className}`}
    />
  )
}

// Tüm klasör ID'lerini toplayan yardımcı fonksiyon
const getAllFolderIds = (elements: TreeViewElement[]): string[] => {
  let ids: string[] = [];
  elements.forEach(element => {
    if (element.id) {
      ids.push(element.id);
    }
    if (element.children) {
      ids = [...ids, ...getAllFolderIds(element.children)];
    }
  });
  return ids;
};

// Güvenli arama fonksiyonu
const filterElements = (elements: TreeViewElement[], searchTerm: string): TreeViewElement[] => {
  if (!searchTerm) return elements;

  // XSS koruması için search term sanitization
  const sanitizedSearchTerm = searchTerm.replace(/<[^>]*>/g, '').toLowerCase();
  
  const shouldKeepElement = (element: TreeViewElement): boolean => {
    const nameMatches = element.name.toLowerCase().includes(sanitizedSearchTerm);
    
    if (element.children && element.children.length > 0) {
      const hasMatchingChild = element.children.some(shouldKeepElement);
      return nameMatches || hasMatchingChild;
    }
    
    return nameMatches;
  };

  const filterElementsRecursive = (elements: TreeViewElement[]): TreeViewElement[] => {
    return elements
      .filter(shouldKeepElement)
      .map(element => ({
        ...element,
        children: element.children 
          ? filterElementsRecursive(element.children)
          : undefined
      }));
  };

  // Deep clone ile referans güvenliği
  return filterElementsRecursive(JSON.parse(JSON.stringify(elements)));
};

// Rate limiting için debounce fonksiyonu
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Tooltip içerikleri - Her dosya için açıklama metinleri
const tooltipContents: Record<string, string> = {
  imgpix: "Resimleri pixel art formatına dönüştürür",
  txtpix: "Metinleri pixel art formatına dönüştürür",
  vidpix: "Videoları pixel art formatına dönüştürür [Yakında]",
  sprite: "Pixel art sprite editörü [Yakında]",
  img3d: "Resimleri 3D modele dönüştürür [Yakında]",
  txt3d: "Metinleri 3D modele dönüştürür [Yakında]",
  sketch3d: "Çizimleri 3D modele dönüştürür [Yakında]",
  texgen: "Doku üreteci [Yakında]",
  matgen: "Materyal üreteci [Yakında]",
  landing: "Landing sayfası üreteci [Yakında]",
  check: "Domain kontrol aracı [Yakında]",
  token: "Token üreteci [Yakında]",
  meme: "Meme üreteci [Yakında]",
  nft: "NFT üreteci [Yakında]",
  comm: "Topluluk yönetim aracı [Yakında]"
};

// Ana dosya ağacı görünümü bileşeni
export function FileTreeView() {
  const allFolderIds = useMemo(() => getAllFolderIds(elements), []);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedIds, setExpandedIds] = useState<string[]>(allFolderIds);
  const { setShowTxtPixWindow } = useWindow();

  // Rate limited search
  const debouncedSearch = useMemo(
    () => debounce((term: string) => setSearchTerm(term), 300),
    []
  );

  // Memoized filtered elements
  const filteredElements = useMemo(() => {
    try {
      return filterElements(elements, searchTerm);
    } catch (error) {
      console.error('Filtering error:', error);
      return elements;
    }
  }, [searchTerm]);

  // Güvenli click handler
  const handleFileClick = useCallback((id: string) => {
    if (id === 'txtpix') {
      try {
        setShowTxtPixWindow(true);
      } catch (error) {
        console.error('Window open error:', error);
      }
    }
  }, [setShowTxtPixWindow]);

  // Render file with error boundary
  const renderFile = useCallback((id: string, name: string, isSelectable: boolean = true) => {
    return (
      <Tooltip key={id}>
        <TooltipTrigger asChild>
          <div onClick={isSelectable ? () => handleFileClick(id) : undefined}>
            <File value={id} isSelectable={isSelectable}>{name}</File>
          </div>
        </TooltipTrigger>
        <TooltipContent 
          side="right" 
          className="bg-zinc-800/90 text-zinc-100 border-zinc-600 px-3 py-2 font-press-start-2p text-[10px] backdrop-blur-sm"
        >
          <p>{tooltipContents[id] || name}</p>
        </TooltipContent>
      </Tooltip>
    );
  }, [handleFileClick]);

  // Arama durumuna göre klasörleri aç/kapat
  useEffect(() => {
    if (searchTerm) {
      const ids = getAllFolderIds(filteredElements);
      setExpandedIds(ids);
    } else {
      setExpandedIds(allFolderIds);
    }
  }, [searchTerm, filteredElements, allFolderIds]);

  // Bileşen arayüzü
  return (
    <div className="flex flex-col h-full w-full gap-2">
      {/* Arama kutusu */}
      <div className="relative px-2">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
        <Input
          placeholder="Ara..."
          onChange={(e) => debouncedSearch(e.target.value.trim())}
          className="pl-10 bg-zinc-900/50 border-zinc-800 text-zinc-100 h-8 text-xs font-press-start-2p placeholder:text-zinc-500"
        />
      </div>
      {/* Dosya ağacı */}
      <TooltipProvider delayDuration={0}>
        <Tree
          className="h-full w-full overflow-hidden bg-background"
          indicator={true}
          elements={filteredElements}
          initialExpandedItems={expandedIds}
        >
          {filteredElements.map((element) => (
            <Folder key={element.id} element={element.name} value={element.id}>
              {element.children?.map((child) => (
                <Folder key={child.id} element={child.name} value={child.id}>
                  {child.children?.map((file) => 
                    renderFile(file.id, file.name, file.isSelectable !== false)
                  )}
                </Folder>
              ))}
            </Folder>
          ))}
        </Tree>
      </TooltipProvider>
    </div>
  )
}

// Dosya ağacı veri yapısı
const elements = [
  {
    id: "pixel",
    name: "pixel",
    children: [
      {
        id: "gen",
        name: "gen",
        children: [
          { id: "imgpix", name: "imgpix.exe" },
          { id: "txtpix", name: "txtpix.exe" },
          { id: "vidpix", name: "vidpix.exe [soon]", isSelectable: false }
        ]
      },
      {
        id: "tools",
        name: "tools",
        children: [
          { id: "sprite", name: "sprite.exe [soon]", isSelectable: false }
        ]
      }
    ]
  },
  {
    id: "forge",
    name: "forge",
    children: [
      {
        id: "blend",
        name: "blend",
        children: [
          { id: "img3d", name: "img3d.exe [soon]", isSelectable: false },
          { id: "txt3d", name: "txt3d.exe [soon]", isSelectable: false },
          { id: "sketch3d", name: "sketch3d.exe [soon]", isSelectable: false }
        ]
      },
      {
        id: "tex",
        name: "tex",
        children: [
          { id: "texgen", name: "texgen.exe [soon]", isSelectable: false },
          { id: "matgen", name: "matgen.exe [soon]", isSelectable: false }
        ]
      }
    ]
  },
  {
    id: "web",
    name: "web",
    children: [
      {
        id: "site",
        name: "site",
        children: [
          { id: "landing", name: "landing.exe [soon]", isSelectable: false }
        ]
      },
      {
        id: "domain",
        name: "domain",
        children: [
          { id: "check", name: "check.exe [soon]", isSelectable: false }
        ]
      }
    ]
  },
  {
    id: "token",
    name: "token",
    children: [
      {
        id: "create",
        name: "create",
        children: [
          { id: "token", name: "token.exe [soon]", isSelectable: false },
          { id: "meme", name: "meme.exe [soon]", isSelectable: false },
          { id: "nft", name: "nft.exe [soon]", isSelectable: false }
        ]
      },
      {
        id: "market",
        name: "market",
        children: [
          { id: "comm", name: "comm.exe [soon]", isSelectable: false }
        ]
      }
    ]
  }
]; 