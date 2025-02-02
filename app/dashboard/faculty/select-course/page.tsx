"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useExam } from '@/hooks/useExam'
import { ProgressBar } from '@/components/dashboard/faculty/progress-bar'
import { CourseSelection } from '@/components/dashboard/faculty/course-selection'
import { DateTimeSelection } from '@/components/dashboard/faculty/date-time-selection'
import { ExamTypeSelection } from './exam-type-selection'
import Link from 'next/link'


export default function SelectCourse() {
    const [currentStep, setCurrentStep] = useState(1)
    const { examData, setExamData, setExamType, examType } = useExam();
    const [showDateTimePicker, setShowDateTimePicker] = useState(false)

    const totalSteps = 6 // Increased total steps
    const router = useRouter()

    const handleNext = () => {
        if (currentStep === 1 && examData.course) {
            setCurrentStep(2) // Move to exam type selection
        } else if (currentStep === 2 && examType) {
            setShowDateTimePicker(true)
        } else if (currentStep < totalSteps) {
            setCurrentStep((prev) => {
                const newStep = prev + 1
                if (newStep === 4) {
                    router.push('/dashboard/faculty/editor')
                }
                return newStep
            })
        }
    }

    return (
        <>
            <div className="p-12">
                <h1 className="text-2xl font-semibold mb-2">Create New Exam</h1>
                <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
            </div>

            <div className="max-w-4xl mx-auto p-6 flex items-center justify-center">
                <div className="space-y-8">
                    <div className="w-full max-w-5xl mx-auto p-8 shadow-lg rounded-lg border">
                        {currentStep === 1 && (
                            <div className="min-h-[400px] max-w-[400px]">
                                <CourseSelection
                                    onSelect={(course) => setExamData((prev) => ({ ...prev, course }))}
                                    selectedCourse={examData.course}
                                />
                            </div>
                        )}

                        {currentStep === 2 && (
                            <div className="min-h-[400px] max-w-[400px]">
                                <ExamTypeSelection
                                    onSelect={setExamType}
                                    selectedExamType={examType}
                                />
                            </div>
                        )}

                        {currentStep === 3 && (
                            <div className="text-center">
                                <h2 className="text-2xl font-bold mb-4">Selected Exam Details</h2>
                                <p><strong>Course:</strong> {examData.course?.name}</p>
                                <p><strong>Exam Type:</strong> {examType}</p>
                                <p><strong>Date:</strong> {examData.examDate?.toLocaleDateString() ?? 'Not Set'}</p>
                                <p><strong>Time:</strong> {examData.startTime} - {examData.endTime}</p>
                                <Button onClick={() => setShowDateTimePicker(true)} className="mt-4">
                                    Edit Date/Time
                                </Button>
                            </div>
                        )}

                        {showDateTimePicker && (
                            <DateTimeSelection
                                onConfirm={(date, startTime, endTime) => {
                                    setExamData((prev) => ({
                                        ...prev,
                                        examDate: date ?? undefined,
                                        startTime,
                                        endTime,
                                    }))
                                    setShowDateTimePicker(false)
                                    setCurrentStep(3)
                                }}
                                onCancel={() => setShowDateTimePicker(false)}
                                defaultDate={examData.examDate ? examData.examDate.toISOString().split('T')[0] : ''}
                                defaultStartTime={examData.startTime}
                                defaultEndTime={examData.endTime}
                            />
                        )}
                    </div>

                    <div className="flex justify-between items-center">
                        <Link href="/dashboard/faculty">
                        <Button variant="default" className="bg-[#1a1a1a] text-white hover:bg-[#2a2a2a]">
                            Cancel
                        </Button>
                        </Link>
                        <Button variant="outline" onClick={() => console.log('Saving draft:', { ...examData, examType })}>
                            Save Draft
                        </Button>
                        <div className="space-x-3">
                            <Button
                                variant="outline"
                                onClick={() => {
                                    if (currentStep === 3 && showDateTimePicker) {
                                        setShowDateTimePicker(false)
                                    } else {
                                        setCurrentStep((prev) => Math.max(prev - 1, 1))
                                    }
                                }}
                                disabled={currentStep === 1}
                            >
                                Back
                            </Button>
                            <Button
                                onClick={handleNext}
                                disabled={
                                    (currentStep === 1 && !examData.course) ||
                                    (currentStep === 2 && !examType) ||
                                    (currentStep === 3 && (!examData.examDate || !examData.startTime || !examData.endTime))
                                }
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
