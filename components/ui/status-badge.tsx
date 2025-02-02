import { cn } from "@/lib/utils"

interface StatusBadgeProps {
  status: 'completed' | 'upcoming'
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
        status === 'completed' ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700",
        className
      )}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}

