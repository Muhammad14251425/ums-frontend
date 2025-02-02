"use client"

import { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { MoreVertical } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import QuestionEditor from "@/components/dashboard/faculty/createExam/QuestionEditor"

type MCQEditorProps = {
    onSave: (question: {
        type: "mcq"
        content: string
        marks: number
        choices: { id: string; content: string; isCorrect: boolean }[]
    }) => void
    initialContent?: string
    initialMarks?: number
    initialChoices?: { id: string; content: string; isCorrect: boolean }[]
}

const MCQEditor = ({ onSave, initialContent = "", initialMarks = 0, initialChoices }: MCQEditorProps) => {
    const [question, setQuestion] = useState(initialContent)
    const [marks, setMarks] = useState(initialMarks)
    const [choices, setChoices] = useState(
        initialChoices || [
            { id: "1", content: "", isCorrect: false },
            { id: "2", content: "", isCorrect: false },
        ],
    )

    const addChoice = () => {
        if (choices.length < 10) {
            setChoices([...choices, { id: String(choices.length + 1), content: "", isCorrect: false }])
        }
    }

    const updateChoice = (id: string, content: string) => {
        setChoices(choices.map((choice) => (choice.id === id ? { ...choice, content } : choice)))
    }

    const toggleCorrect = (id: string) => {
        setChoices(choices.map((choice) => (choice.id === id ? { ...choice, isCorrect: !choice.isCorrect } : choice)))
    }

    const deleteChoice = (id: string) => {
        setChoices(choices.filter((choice) => choice.id !== id))
    }

    const handleSave = () => {
        if (choices.some((choice) => choice.isCorrect)) {

            // Pass the MCQ data to the parent component
            onSave({ type: "mcq", content: question, marks, choices })
        } else {
            alert("Please mark at least one choice as correct.")
        }
    }

    return (
        <div className="mcq-editor">
            <QuestionEditor
                onSave={({ content, marks }) => {
                    setQuestion(content)
                    setMarks(marks)
                }}
                initialContent={question}
                initialMarks={marks}
            />
            <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Choices</h3>
                {choices.map((choice, index) => (
                    <div key={choice.id} className="flex items-center mb-2">
                        <Input
                            value={choice.content}
                            onChange={(e) => updateChoice(choice.id, e.target.value)}
                            placeholder={`Choice ${index + 1}`}
                            className="flex-grow mr-2 text-black"
                        />
                        <Checkbox checked={choice.isCorrect} onCheckedChange={() => toggleCorrect(choice.id)} className="mr-2" />
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                    <MoreVertical className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => deleteChoice(choice.id)}>Delete</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => toggleCorrect(choice.id)}>
                                    {choice.isCorrect ? "Unmark as Correct" : "Mark as Correct"}
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                ))}
                {choices.length < 10 && (
                    <Button onClick={addChoice} className="mt-2 bg-blue-500 text-white">
                        Add Choice
                    </Button>
                )}
            </div>
            <Button onClick={handleSave} className="mt-4 bg-black text-white">
                Done
            </Button>
        </div>
    )
}

export default MCQEditor
