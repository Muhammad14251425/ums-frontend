import { Button } from '@/components/ui/button'

type ExamType = 'Midterm' | 'Final'

interface ExamTypeSelectionProps {
    onSelect: (examType: ExamType) => void
    selectedExamType?: ExamType
}

export function ExamTypeSelection({ onSelect, selectedExamType }: ExamTypeSelectionProps) {
    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Select Exam Type</h2>
            <div className="flex flex-col space-y-4">
                <Button
                    onClick={() => onSelect('Midterm')}
                    className={`w-full ${
                        selectedExamType === 'Midterm' ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
                    }`}
                >
                    Midterm
                </Button>
                <Button
                    onClick={() => onSelect('Final')}
                    className={`w-full ${
                        selectedExamType === 'Final' ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
                    }`}
                >
                    Final
                </Button>
            </div>
        </div>
    )
}
