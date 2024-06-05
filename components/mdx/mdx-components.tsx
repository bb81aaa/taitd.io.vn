import { useMDXComponent } from "next-contentlayer/hooks"

import { cn } from "@/lib/utils"
import AboutContact from "@/components/about-contact"
import { BlurImage } from "@/components/blur-image"
import { Callout } from "@/components/callout"
import CodePlayground from "@/components/code-playground"
import ComponentPreview from "@/components/component-preview"
import CoverImage from "@/components/cover-image"
import FolderTree from "@/components/folder-tree"
import GridContainer from "@/components/grid-container"
import LoadingSkeleton from "@/components/loading-skeleton"
import CodeBlockHeader from "@/components/mdx/code-block-header"
import CodeBlock from "@/components/mdx/codeblock"
import Youtube from "@/components/mdx/youtube"

export const components = {
  h1: ({ className, ...props }) => (
    <h1
      className={cn(
        "mt-2 scroll-m-20 text-4xl font-bold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }) => (
    <h2
      className={cn(
        "mt-10 scroll-m-28 border-b pb-1 text-3xl font-semibold tracking-tight first:mt-0",
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }) => (
    <h3
      className={cn(
        "mt-8 scroll-m-28 text-2xl font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }) => (
    <h4
      className={cn(
        "mt-8 scroll-m-28 text-xl font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h5: ({ className, ...props }) => (
    <h5
      className={cn(
        "mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h6: ({ className, ...props }) => (
    <h6
      className={cn(
        "mt-8 scroll-m-20 text-base font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  a: ({ className, ...props }) => (
    <a
      className={cn("font-medium underline underline-offset-4", className)}
      target={props?.href?.startsWith("http") ? "_blank" : undefined}
      {...props}
    />
  ),
  p: ({ className, ...props }) => (
    <p
      className={cn("leading-8 [&:not(:first-child)]:mt-6", className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }) => (
    <ul className={cn("my-6 ml-6 list-disc", className)} {...props} />
  ),
  ol: ({ className, ...props }) => (
    <ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />
  ),
  li: ({ className, ...props }) => (
    <li className={cn("mt-2", className)} {...props} />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn(
        "my-6 border-l-4 pl-6 italic [&>*]:text-gray-800 dark:[&>*]:text-gray-300",
        className
      )}
      {...props}
    />
  ),
  img: ({
    className,
    alt,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={cn("rounded-md border", className)} alt={alt} {...props} />
  ),
  hr: ({ ...props }) => <hr className="my-4 md:my-8" {...props} />,
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className={cn("w-full", className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={cn("m-0 border-t p-0 even:bg-muted", className)}
      {...props}
    />
  ),
  th: ({ className, ...props }) => (
    <th
      className={cn(
        "border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }) => (
    <td
      className={cn(
        "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  pre: CodeBlock,
  figcaption: CodeBlockHeader,
  code: ({ className, ...props }) => (
    <code
      className={cn(
        "relative rounded border bg-muted px-[0.3rem] py-0.5 font-mono text-[0.95em]",
        className
      )}
      {...props}
    />
  ),
  Steps: ({ ...props }) => (
    <div
      className="[&>h3]:step steps mb-12 ml-4 border-l pl-8 [counter-reset:step]"
      {...props}
    />
  ),
  Step: ({ className, ...props }: React.ComponentProps<"h3">) => (
    <h3
      className={cn(
        "mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  Image: (props: React.ComponentPropsWithoutRef<typeof BlurImage>) => {
    const { caption, alt, ...rest } = props

    return (
      <>
        <BlurImage className="rounded-lg border" alt={alt} {...rest} />
        {caption && <figcaption className="mt-4 text-center">{alt}</figcaption>}
      </>
    )
  },
  Callout,
  GridContainer,
  LoadingSkeleton,
  ComponentPreview,
  FolderTree,
  CodePlayground,
  CoverImage,
  AboutContact,
  Youtube,
}

interface MdxProps {
  code: string
}

const Mdx = ({ code }: MdxProps) => {
  const Component = useMDXComponent(code)
  return (
    <div>
      <Component components={components} />
    </div>
  )
}

export default Mdx
