import { cn } from "@/lib/utils"

function Spinner({ className }) {
  return (
    <div
      className={cn(
        "h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent",
        className
      )}
    />
  )
}

export { Spinner }