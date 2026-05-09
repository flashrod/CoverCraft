import * as React from "react"
import { cn } from "@/lib/utils"

const Textarea = React.forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[180px] w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-base placeholder:text-[var(--muted-foreground)]/60 focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 resize-none transition-all duration-200",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }