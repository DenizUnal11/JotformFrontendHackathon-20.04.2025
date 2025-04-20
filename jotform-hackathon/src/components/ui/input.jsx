import * as React from "react"
import { cn } from "@/lib/utils"

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center h-9 w-full rounded-md border border-input bg-transparent px-2 py-1 pl-6 text-base text-center shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground md:text-sm",
        className
      )}
      {...props}
    />
  )
})
Input.displayName = "Input"

export { Input }
