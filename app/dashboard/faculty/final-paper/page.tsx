"use client"

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { useExam } from "@/hooks/useExam";

const FinalPaper = () => {
    type Choice = {
        id: string;
        content: string;
        isCorrect: boolean;
    };

    type Question = {
        content: string;
        marks: number;
        choices?: Choice[];
    };

    type Part = {
        id: string;
        name: string;
        questions: Question[];
    };

    const [examPaper, setExamPaper] = useState<Part[]>([]);

    useEffect(() => {
        const savedPaper = localStorage.getItem("examPaper");
        if (savedPaper) {
            setExamPaper(JSON.parse(savedPaper));
        }
    }, []);

    const { examData } = useExam();
    return (
        <div className="bg-white min-h-screen w-full p-6">
            <div className="max-w-[800px] mx-auto">
                <h1 className="text-2xl font-bold mb-2 text-center">Final Exam Paper</h1>
                <div className="w-full h-1 bg-blue-500 mb-6"></div>

                <div className="bg-white rounded-sm border border-black aspect-[1/1.414] w-full relative p-8">
                    <div className="flex justify-between items-start mb-8">
                        <div className="space-y-1">
                            <h2 className="text-[24px] font-bold text-black">Final Exam</h2>
                            <p className="text-[14px] text-gray-700">{examData.course?.name}</p>
                            <p className="text-[14px] text-gray-700">Offical Final Exam</p>

                        </div>
                        <Image
                            src="/logo.png"
                            alt="Exam Logo"
                            width={80}
                            height={80}
                            className="object-contain"
                            priority
                        />
                    </div>

                    <div className="space-y-6">
                        {examPaper.map((part) => (
                            <div key={part.id} className="border border-gray-300 p-4 rounded-lg shadow-sm">
                                <h2 className="text-[18px] font-bold text-black mb-4">{part.name}</h2>

                                {part.questions.map((question, index) => (
                                    <div key={index} className="mb-6">
                                        <div className="flex" >
                                            <p className="text-[14px] font-medium">Q{index + 1}</p>
                                            <div className='ql-editor' dangerouslySetInnerHTML={{ __html: question.content }} />
                                        </div>
                                        <p className="text-[12px] text-gray-600">Marks: {question.marks}</p>
                                        {question.choices && (
                                            <ul className="mt-2 space-y-2">
                                                {question.choices.map((choice) => (
                                                    <li key={choice.id} className="text-[14px]">
                                                        <input type="radio" name={`question-${index}`} disabled className="mr-2" />
                                                        {choice.content}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ))}
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
    );
};

export default FinalPaper;