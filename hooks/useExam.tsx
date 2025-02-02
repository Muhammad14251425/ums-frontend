'use client'



import { Part, Question } from "@/app/dashboard/faculty/editor/page";
import { ExamData } from "@/types/exam";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
type ExamContextType = {
    parts: Part[]
    instructions: string[]
    examType: "Midterm" | "Final" | undefined
    totalMarks: number;
    setParts: Dispatch<SetStateAction<Part[]>>
    examData: ExamData
    setExamData: Dispatch<SetStateAction<ExamData>>
    setExamType: Dispatch<SetStateAction<"Midterm" | "Final" | undefined>>
    setInstructions: Dispatch<SetStateAction<string[]>>
}

const ExamContext = createContext<ExamContextType | undefined>(undefined)

export const ExamProvider = ({ children }: { children: ReactNode }) => {
    const [parts, setParts] = useState<Part[]>([{ id: "1", name: "Part A", questions: [] }])
    const [examType, setExamType] = useState<'Midterm' | 'Final' | undefined>(undefined)
    const [totalMarks, setTotalMarks] = useState<number>(0);
    const [examData, setExamData] = useState<ExamData>({
        questions: [],
        examDate: undefined,
    })
    const [instructions, setInstructions] = useState<string[]>([
        "Read all questions carefully before answering.",
        "Attempt all questions unless instructed otherwise.",
        "Use only the provided answer sheets.",
        "Show all calculations where applicable.",
    ])
    useEffect(() => {
        setTotalMarks(calculateTotalMarks(parts))
    }, [parts])

    const calculateTotalMarks = (parts: Part[]): number => {
        const sumMarks = (questions: Question[]): number => {
            return questions.reduce((total, question) => {
                return total + question.marks + sumMarks(question.subQuestions);
            }, 0);
        };

        return parts.reduce((total, part) => total + sumMarks(part.questions), 0);
    };

    return (
        <ExamContext.Provider value={{ parts, setParts, examData, setExamData, totalMarks, examType, setExamType, instructions, setInstructions }}>
            {children}
        </ExamContext.Provider>
    )
}



export const useExam = (): ExamContextType => {
    const context = useContext(ExamContext)
    if (!context) {
        throw new Error("useExam must be used within a ExamProvider");
    }
    return context
}