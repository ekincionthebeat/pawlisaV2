"use client"

import React, {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { FileIcon, FolderIcon, FolderOpenIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "../../../../../../components/ui/button"
import { ScrollArea } from "../../../../../../components/ui/scroll-area"

// Dosya ağacı öğesi için tip tanımı
type TreeViewElement = {
  id: string
  name: string
  isSelectable?: boolean
  children?: TreeViewElement[]
}

// Context için tip tanımı
type TreeContextProps = {
  selectedId: string | undefined
  expandedItems: string[] | undefined
  indicator: boolean
  handleExpand: (id: string) => void
  selectItem: (id: string) => void
  setExpandedItems?: React.Dispatch<React.SetStateAction<string[] | undefined>>
  openIcon?: React.ReactNode
  closeIcon?: React.ReactNode
  direction: "rtl" | "ltr"
}

// Context oluşturma
const TreeContext = createContext<TreeContextProps | null>(null)

// Context hook'u
const useTree = () => {
  const context = useContext(TreeContext)
  if (!context) {
    throw new Error("useTree must be used within a TreeProvider")
  }
  return context
}

// Bileşen prop tipleri
interface TreeViewComponentProps extends React.HTMLAttributes<HTMLDivElement> {}

type Direction = "rtl" | "ltr" | undefined

type TreeViewProps = {
  initialSelectedId?: string
  indicator?: boolean
  elements?: TreeViewElement[]
  initialExpandedItems?: string[]
  openIcon?: React.ReactNode
  closeIcon?: React.ReactNode
} & TreeViewComponentProps

// Ana Tree bileşeni
const Tree = forwardRef<HTMLDivElement, TreeViewProps>(
  (
    {
      className,
      elements,
      initialSelectedId,
      initialExpandedItems,
      children,
      indicator = true,
      openIcon,
      closeIcon,
      dir,
      ...props
    },
    ref,
  ) => {
    // State tanımlamaları
    const [selectedId, setSelectedId] = useState<string | undefined>(
      initialSelectedId,
    )
    const [expandedItems, setExpandedItems] = useState<string[] | undefined>(
      initialExpandedItems,
    )

    // Öğe seçme işlevi
    const selectItem = useCallback((id: string) => {
      setSelectedId(id)
    }, [])

    // Klasör genişletme işlevi
    const handleExpand = useCallback((id: string) => {
      setExpandedItems((prev) => {
        if (prev?.includes(id)) {
          return prev.filter((item) => item !== id)
        }
        return [...(prev ?? []), id]
      })
    }, [])

    // Belirli öğeleri genişletme işlevi
    const expandSpecificTargetedElements = useCallback(
      (elements?: TreeViewElement[], selectId?: string) => {
        if (!elements || !selectId) return
        const findParent = (
          currentElement: TreeViewElement,
          currentPath: string[] = [],
        ) => {
          const isSelectable = currentElement.isSelectable ?? true
          const newPath = [...currentPath, currentElement.id]
          if (currentElement.id === selectId) {
            if (isSelectable) {
              setExpandedItems((prev) => [...(prev ?? []), ...newPath])
            } else {
              if (newPath.includes(currentElement.id)) {
                newPath.pop()
                setExpandedItems((prev) => [...(prev ?? []), ...newPath])
              }
            }
            return
          }
          if (
            isSelectable &&
            currentElement.children &&
            currentElement.children.length > 0
          ) {
            currentElement.children.forEach((child) => {
              findParent(child, newPath)
            })
          }
        }
        elements.forEach((element) => {
          findParent(element)
        })
      },
      [],
    )

    // İlk seçili öğeyi genişletme
    useEffect(() => {
      if (initialSelectedId) {
        expandSpecificTargetedElements(elements, initialSelectedId)
      }
    }, [initialSelectedId, elements])

    const direction = dir === "rtl" ? "rtl" : "ltr"

    // Context provider ve ağaç yapısı
    return (
      <TreeContext.Provider
        value={{
          selectedId,
          expandedItems,
          handleExpand,
          selectItem,
          setExpandedItems,
          indicator,
          openIcon,
          closeIcon,
          direction,
        }}
      >
        <div className={cn("size-full", className)}>
          <ScrollArea
            ref={ref}
            className="h-full relative"
            dir={dir as Direction}
          >
            <AccordionPrimitive.Root
              {...props}
              type="multiple"
              defaultValue={expandedItems}
              value={expandedItems}
              className="flex flex-col gap-1"
              onValueChange={(value) =>
                setExpandedItems((prev) => [...(prev ?? []), value[0]])
              }
              dir={dir as Direction}
            >
              {children}
            </AccordionPrimitive.Root>
          </ScrollArea>
        </div>
      </TreeContext.Provider>
    )
  },
)

Tree.displayName = "Tree"

// Ağaç gösterge çizgisi bileşeni
const TreeIndicator = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { direction } = useTree()

  return (
    <div
      dir={direction}
      ref={ref}
      className={cn(
        "absolute h-full w-[1px] bg-[#2a2a2c] left-2 top-0",
        className,
      )}
      {...props}
    />
  )
})

TreeIndicator.displayName = "TreeIndicator"

// Klasör bileşeni prop tipleri
interface FolderComponentProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> {}

type FolderProps = {
  expandedItems?: string[]
  element: string
  isSelectable?: boolean
  isSelect?: boolean
} & FolderComponentProps

// Klasör bileşeni
const Folder = forwardRef<
  HTMLDivElement,
  FolderProps & React.HTMLAttributes<HTMLDivElement>
>(
  (
    {
      className,
      element,
      value,
      isSelectable = true,
      isSelect,
      children,
      ...props
    },
    ref,
  ) => {
    const {
      direction,
      handleExpand,
      expandedItems,
      indicator,
      setExpandedItems,
      openIcon,
      closeIcon,
    } = useTree()

    return (
      <AccordionPrimitive.Item
        {...props}
        value={value}
        className="relative pl-4 overflow-hidden h-full"
      >
        {indicator && <TreeIndicator aria-hidden="true" />}
        <AccordionPrimitive.Trigger
          className={cn(
            "flex items-center gap-2 text-xs px-2 py-1 rounded-md font-press-start-2p w-full text-zinc-100",
            {
              "bg-muted rounded-md": isSelect && isSelectable,
              "cursor-pointer hover:bg-zinc-800/50": isSelectable,
              "cursor-not-allowed opacity-50": !isSelectable,
            },
            className,
          )}
          disabled={!isSelectable}
          onClick={() => handleExpand(value)}
        >
          <div className="flex-shrink-0 w-4 h-4 text-zinc-100">
            {expandedItems?.includes(value)
              ? openIcon ?? <FolderOpenIcon className="w-4 h-4" />
              : closeIcon ?? <FolderIcon className="w-4 h-4" />}
          </div>
          <span className="truncate">{element}</span>
        </AccordionPrimitive.Trigger>
        <AccordionPrimitive.Content className="text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down relative overflow-hidden h-full">
          <AccordionPrimitive.Root
            dir={direction}
            type="multiple"
            className="flex flex-col gap-1 py-1"
            defaultValue={expandedItems}
            value={expandedItems}
            onValueChange={(value) => {
              setExpandedItems?.((prev) => [...(prev ?? []), value[0]])
            }}
          >
            {children}
          </AccordionPrimitive.Root>
        </AccordionPrimitive.Content>
      </AccordionPrimitive.Item>
    )
  },
)

Folder.displayName = "Folder"

// Dosya bileşeni
const File = forwardRef<
  HTMLButtonElement,
  {
    value: string
    handleSelect?: (id: string) => void
    isSelectable?: boolean
    isSelect?: boolean
    fileIcon?: React.ReactNode
  } & React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(
  (
    {
      value,
      className,
      handleSelect,
      isSelectable = true,
      isSelect,
      fileIcon,
      children,
      ...props
    },
    ref,
  ) => {
    const { direction, selectedId, selectItem, indicator } = useTree()
    const isSelected = isSelect ?? selectedId === value
    return (
      <AccordionPrimitive.Item value={value} className="relative pl-4">
        {indicator && <TreeIndicator aria-hidden="true" />}
        <AccordionPrimitive.Trigger
          ref={ref}
          {...props}
          dir={direction}
          disabled={!isSelectable}
          aria-label="File"
          className={cn(
            "flex items-center gap-2 text-xs px-2 py-1 w-full rounded-md duration-200 ease-in-out hover:bg-zinc-800/50 font-press-start-2p",
            {
              "bg-zinc-800 text-white": isSelected && isSelectable,
              "text-zinc-300": isSelectable,
              "text-zinc-500": !isSelectable,
            },
            isSelectable ? "cursor-pointer" : "opacity-50 cursor-not-allowed",
            className,
          )}
          onClick={() => selectItem(value)}
        >
          <div className={cn("flex-shrink-0 w-4 h-4", {
            "text-zinc-300": isSelectable,
            "text-zinc-500": !isSelectable,
          })}>
            {fileIcon ?? <FileIcon className="w-4 h-4" />}
          </div>
          <span className="truncate">{children}</span>
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Item>
    )
  },
)

File.displayName = "File"

// Tümünü Genişlet/Daralt düğmesi
const CollapseButton = forwardRef<
  HTMLButtonElement,
  {
    elements: TreeViewElement[]
    expandAll?: boolean
  } & React.HTMLAttributes<HTMLButtonElement>
>(({ className, elements, expandAll = false, children, ...props }, ref) => {
  const { expandedItems, setExpandedItems } = useTree()

  // Tüm ağacı genişletme işlevi
  const expendAllTree = useCallback((elements: TreeViewElement[]) => {
    const expandTree = (element: TreeViewElement) => {
      const isSelectable = element.isSelectable ?? true
      if (isSelectable && element.children && element.children.length > 0) {
        setExpandedItems?.((prev) => [...(prev ?? []), element.id])
        element.children.forEach(expandTree)
      }
    }

    elements.forEach(expandTree)
  }, [])

  // Tümünü daraltma işlevi
  const closeAll = useCallback(() => {
    setExpandedItems?.([])
  }, [])

  // İlk yükleme genişletme kontrolü
  useEffect(() => {
    console.log(expandAll)
    if (expandAll) {
      expendAllTree(elements)
    }
  }, [expandAll])

  return (
    <Button
      variant={"ghost"}
      className="h-8 w-fit p-1 absolute bottom-1 right-2"
      onClick={
        expandedItems && expandedItems.length > 0
          ? closeAll
          : () => expendAllTree(elements)
      }
      ref={ref}
      {...props}
    >
      {children}
      <span className="sr-only">Toggle</span>
    </Button>
  )
})

CollapseButton.displayName = "CollapseButton"

// Örnek dosya ağacı veri yapısı
const elements: TreeViewElement[] = [
  {
    id: "pixelart",
    name: "pixelart",
    children: [
      {
        id: "generators",
        name: "generators",
        children: [
          { id: "image-to-pixel", name: "image-to-pixel.exe" },
          { id: "text-to-pixel", name: "text-to-pixel.exe" },
          { id: "video-to-pixel", name: "video-to-pixel.exe" }
        ]
      },
      {
        id: "tools",
        name: "tools",
        children: [
          { id: "sprite-editor", name: "sprite-editor.exe" }
        ]
      }
    ]
  },
  {
    id: "3d-forge",
    name: "3d-forge",
    children: [
      {
        id: "blender-tools",
        name: "blender-tools",
        children: [
          { id: "image-to-3d", name: "image-to-3d.exe" },
          { id: "text-to-3d", name: "text-to-3d.exe" },
          { id: "sketch-to-3d", name: "sketch-to-3d.exe" }
        ]
      },
      {
        id: "texturing",
        name: "texturing",
        children: [
          { id: "texture-generator", name: "texture-generator.exe" },
          { id: "material-maker", name: "material-maker.exe" }
        ]
      }
    ]
  },
  {
    id: "web-wizard",
    name: "web-wizard",
    children: [
      {
        id: "site-generator",
        name: "site-generator",
        children: [
          { id: "text-to-landing", name: "text-to-landing.exe" }
        ]
      },
      {
        id: "domain-checker",
        name: "domain checker",
        children: [
          { id: "domainchecker", name: "domainchecker.exe" }
        ]
      }
    ]
  },
  {
    id: "token-factory",
    name: "token-factory",
    children: [
      {
        id: "creator",
        name: "creator",
        children: [
          { id: "token-generator", name: "token-generator.exe" },
          { id: "meme-maker", name: "meme-maker.exe" },
          { id: "nft-creator", name: "nft-creator.exe" }
        ]
      },
      {
        id: "marketing",
        name: "marketing",
        children: [
          { id: "community-builder", name: "community-builder.exe" }
        ]
      }
    ]
  }
];

export { CollapseButton, File, Folder, Tree, type TreeViewElement } 