interface ProgressBarProps {
  currentStep: number
  totalSteps: number
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  return (
    <div className="border-b border-primary w-fit">
      <span className="text-sm text-primary font-medium">
        {currentStep}/{totalSteps} Steps
      </span>
    </div>
  )
}

