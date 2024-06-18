"use client"

import { useState } from "react"
import { cva } from "class-variance-authority"
import { FileIcon, FolderIcon, FolderOpenIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

type FilesProps = React.ComponentPropsWithoutRef<"div">
type FileProps = {
  name: string
  icon?: React.ReactNode
} & React.ComponentPropsWithoutRef<"div">
type FolderProps = {
  name: string
  defaultOpen?: boolean
} & React.ComponentPropsWithoutRef<"div">

const item = cva(
  "flex flex-row items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
)

export const Files = (props: FilesProps) => {
  const { children, className, ...rest } = props

  return (
    <div
      className={cn("not-prose rounded-md border bg-card p-2", className)}
      {...rest}
    >
      {children}
    </div>
  )
}

export const File = (props: FileProps) => {
  const { name, className, ...rest } = props

  return (
    <div className={cn(item({ className }))} {...rest}>
      <FileIcon className="size-4" />
      {name}
    </div>
  )
}

export const Folder = (props: FolderProps) => {
  const { children, name, defaultOpen = false, ...rest } = props
  const [open, setOpen] = useState(defaultOpen)

  return (
    <Collapsible open={open} onOpenChange={setOpen} {...rest}>
      <CollapsibleTrigger className={cn(item({ className: "w-full" }))}>
        {open ? (
          <FolderOpenIcon className="size-4" />
        ) : (
          <FolderIcon className="size-4" />
        )}
        {name}
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="ml-2 flex flex-col border-l pl-2">{children}</div>
      </CollapsibleContent>
    </Collapsible>
  )
}
