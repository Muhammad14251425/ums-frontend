'use client'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarIcon, ChevronLeft, ChevronRight, Clock } from "lucide-react"
import Link from "next/link"
import { useExam } from "@/hooks/useExam"

export default function ExamPreview() {

    const { examData, totalMarks, examType, instructions, setInstructions } = useExam()

    // State to manage the list of instructions


    // State to handle editing an instruction
    const [editIndex, setEditIndex] = useState<number | null>(null)
    const [editValue, setEditValue] = useState<string>("")

    // Function to handle adding a new instruction
    const addInstruction = () => {
        setInstructions([...instructions, "New instruction"])
    }

    // Function to handle deleting an instruction
    const deleteInstruction = (index: number) => {
        setInstructions(instructions.filter((_, i) => i !== index))
    }

    // Function to handle starting the edit process
    const startEdit = (index: number) => {
        setEditIndex(index)
        setEditValue(instructions[index])
    }

    // Function to handle saving the edited instruction
    const saveEdit = () => {
        if (editIndex !== null) {
            const updatedInstructions = [...instructions]
            updatedInstructions[editIndex] = editValue
            setInstructions(updatedInstructions)
            setEditIndex(null)
            setEditValue("")
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
            <Card className="w-full max-w-[609px]">
                <CardContent className="p-6">
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-xl font-medium mb-4">Preview Exam Paper</h1>
                            <div className="space-y-2 mb-4">
                                <p className="text-sm text-gray-600">Name</p>
                                <p className="font-medium">{examData.course?.name ?? 'Not Selected'}</p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-sm text-gray-600">Exam Type</p>
                                <p className="font-medium">{examType}</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="space-y-1">
                                <p className="text-sm text-gray-600">Course</p>
                                <p className="font-medium">{examData.course?.name ?? 'Not Selected'}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm text-gray-600">Subject</p>
                                <p className="font-medium">Networking</p>
                            </div>
                        </div>

                        <div>
                            <p className="font-medium mb-2">Total Marks : {totalMarks}</p>
                        </div>

                        <div className="space-y-4">
                            <h2 className="font-medium">Instructions</h2>
                            <div className="space-y-2 bg-gray-50 rounded-md">
                                {instructions.map((instruction, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between p-3 bg-white border rounded-md"
                                    >
                                        {editIndex === index ? (
                                            <input
                                                type="text"
                                                value={editValue}
                                                onChange={(e) => setEditValue(e.target.value)}
                                                className="text-sm p-2 border rounded-md"
                                            />
                                        ) : (
                                            <span className="text-sm">{instruction}</span>
                                        )}
                                        <div className="flex gap-2">
                                            {editIndex === index ? (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="text-green-500"
                                                    onClick={saveEdit}
                                                >
                                                    Save
                                                </Button>
                                            ) : (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="text-blue-500"
                                                    onClick={() => startEdit(index)}
                                                >
                                                    Edit
                                                </Button>
                                            )}
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="text-red-500"
                                                onClick={() => deleteInstruction(index)}
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Button
                                variant="outline"
                                className="w-full justify-start text-sm mt-4"
                                onClick={addInstruction}
                            >
                                Add custom Instruction
                            </Button>
                        </div>

                        <div className="flex gap-6">
                            <div className="flex-1 bg-gray-50 p-3 rounded-md">
                                <p className="text-sm text-gray-600 mb-2">Exam Schedule</p>
                                <div className="flex items-center gap-2">
                                    <CalendarIcon className="h-4 w-4 text-gray-500" />
                                    <span className="text-sm">{examData.examDate?.toLocaleDateString() ?? 'Not Set'}</span>
                                </div>
                            </div>
                            <div className="flex-1 bg-gray-50 p-3 rounded-md">
                                <p className="text-sm text-gray-600 mb-2">Time Duration</p>
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-gray-500" />
                                    <span className="text-sm">{examData.startTime} - {examData.endTime}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-4">
                            <Link href="/dashboard/faculty/create-exam">

                                <Button variant="ghost" className="text-sm gap-2">
                                    <ChevronLeft className="h-4 w-4" />
                                    Back
                                </Button>
                            </Link>

                            <div className="flex gap-2">
                                <Link href="/dashboard/faculty/final-paper">
                                    <Button variant="outline" className="text-sm gap-2">
                                        Preview Questions
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </Link>
                                <Button className="text-sm">Confirm</Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}