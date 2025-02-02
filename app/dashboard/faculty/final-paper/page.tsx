"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import "react-quill/dist/quill.snow.css"
import { useExam } from "@/hooks/useExam"
import { useUser } from "@/hooks/userContext"

type Choice = {
    id: string
    content: string
    isCorrect: boolean
}

type Question = {
    type: string
    content: string
    clo:string
    marks: number
    id: string
    choices?: Choice[]
    subQuestions: Question[]
}

type Part = {
    id: string
    name: string
    questions: Question[]
}

const FinalPaper = () => {
    const [examPaper, setExamPaper] = useState<Part[]>([])
    const { examData, instructions, totalMarks } = useExam()
    const { user } = useUser();



    useEffect(() => {
        const savedPaper = localStorage.getItem("examPaper")
        if (savedPaper) {
            setExamPaper(JSON.parse(savedPaper))
        }
    }, [])

    const renderQuestion = (question: Question, index: number, level = 0) => (
        <div key={question.id} className="mb-6 ml-4">
            <div className="flex">
                <p className="text-[14px] font-medium mr-2">
                    {level === 0 ? `Q${index + 1}` : `${String.fromCharCode(97 + index)}.`}
                </p>
                <div className="ql-editor" dangerouslySetInnerHTML={{ __html: question.content }} />
            </div>
            <div className="flex gap-1">
                <p className="text-[12px] text-gray-600 ml-6">Marks: {question.marks}</p>
                <p className="text-[12px] text-gray-600 ml-6">CLO: {question.clo}</p>
            </div>
            {question.type === "mcq" && question.choices && (
                <ul className="mt-2 space-y-2 ml-6">
                    {question.choices.map((choice) => (
                        <li key={choice.id} className="text-[14px]">
                            <input type="radio" name={`question-${question.id}`} disabled className="mr-2" />
                            {choice.content}
                        </li>
                    ))}
                </ul>
            )}
            {question.subQuestions.length > 0 && (
                <div className="ml-6 mt-4">
                    {question.subQuestions.map((subQ, subIndex) => renderQuestion(subQ, subIndex, level + 1))}
                </div>
            )}
        </div>
    )

    return (
        <div className="bg-white min-h-screen w-full p-6">
            <div className="max-w-[800px] mx-auto">
                <h1 className="text-2xl font-bold mb-2 text-center">Final Exam Paper</h1>
                <div className="w-full h-1 bg-blue-500 mb-6"></div>

                <div className="bg-white rounded-sm border border-black aspect-[1/1.414] w-full relative p-8">
                    <div className="flex justify-between items-start ">
                        <div className="space-y-1">
                            <h2 className="text-[20px] font-bold text-black">Final Exam</h2>
                            <p className="text-[14px] text-gray-700">{examData.course?.name}</p>
                            <p className="text-[14px] text-gray-700">Official Final Exam</p>
                        </div>
                        <div className="space-y-1">
                            <h2 className="text-[20px] font-bold text-black">Course Instructor</h2>
                            <p className="text-[14px] text-gray-700">{user?.userName}</p>
                        </div>
                        <div className="space-y-1">
                            <h2 className="text-[20px] font-bold text-black">Course Code</h2>
                            <p className="text-[14px] text-gray-700">Cs213</p>
                        </div>
                        <Image src="/logo.png" alt="Exam Logo" width={80} height={80} className="object-contain" priority />
                    </div>
                    <div className="flex justify-between items-start ">
                        <div className="space-y-1">
                            <h2 className="text-[20px] font-bold text-black">Total Marks</h2>
                            <p className="text-[14px] text-gray-700">{totalMarks}</p>
                        </div>
                    </div>

                    <div className="mb-8 mt-10">
                        <h2 className="text-lg text-gray-700">Exam Instructions</h2>
                        <div className="space-y-1 mt-2">
                            {instructions.map((item, index) => (
                                <p className="text-[14px] text-gray-700">{index + 1}. {item}</p>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        {examPaper.map((part, partIndex) => (
                            <div key={part.id} className="border border-gray-300 p-4 rounded-lg shadow-sm">
                                <h2 className="text-[18px] font-bold text-black mb-4">{part.name}</h2>
                                {part.questions.map((question, questionIndex) => renderQuestion(question, questionIndex))}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="text-center mt-6">
                    <Link href="/dashboard/faculty/finish-paper">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded">Confirm</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default FinalPaper

