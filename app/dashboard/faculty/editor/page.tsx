"use client"
import 'react-quill/dist/quill.snow.css';
import { useState } from "react"

import MCQEditor from "./MCQEditor"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { MoreVertical } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useRouter } from 'next/navigation';
import { useExam } from '@/hooks/useExam';
import QuestionEditor from '@/components/dashboard/faculty/createExam/QuestionEditor';

export type Question = {
  id: string
  type: "normal" | "mcq"
  content: string
  marks: number
  clo: string
  subQuestions: Question[]
  choices?: { id: string; content: string; isCorrect: boolean }[]
}

export type Part = {
  id: string
  name: string
  questions: Question[]
}

export default function ExamPaperEditor() {
  const { parts, setParts } = useExam();
  const [isAddingQuestion, setIsAddingQuestion] = useState(false)
  const [questionType, setQuestionType] = useState<"normal" | "mcq">("normal")
  const [editingQuestion, setEditingQuestion] = useState<{
    partId: string
    questionId: string
    parentId?: string
  } | null>(null)
  const [addingSubQuestion, setAddingSubQuestion] = useState<{ partId: string; parentId: string } | null>(null)

  const addQuestion = (partId: string, question: Omit<Question, "id" | "subQuestions">) => {
    setParts((prevParts) =>
      prevParts.map((part) =>
        part.id === partId
          ? { ...part, questions: [...part.questions, { ...question, id: Date.now().toString(), subQuestions: [] }] }
          : part,
      ),
    )
    setIsAddingQuestion(false)
  }

  const updateQuestion = (
    partId: string,
    questionId: string,
    updatedQuestion: Omit<Question, "id" | "subQuestions">,
    parentId?: string,
  ) => {
    setParts((prevParts) =>
      prevParts.map((part) =>
        part.id === partId
          ? {
            ...part,
            questions: updateQuestionRecursively(part.questions, questionId, updatedQuestion, parentId),
          }
          : part,
      ),
    )
    setEditingQuestion(null)
  }

  const updateQuestionRecursively = (
    questions: Question[],
    questionId: string,
    updatedQuestion: Omit<Question, "id" | "subQuestions">,
    parentId?: string,
  ): Question[] => {
    return questions.map((q) => {
      if (q.id === questionId) {
        return { ...q, ...updatedQuestion, subQuestions: q.subQuestions }
      } else if (q.id === parentId) {
        return { ...q, subQuestions: updateQuestionRecursively(q.subQuestions, questionId, updatedQuestion) }
      } else if (q.subQuestions.length > 0) {
        return { ...q, subQuestions: updateQuestionRecursively(q.subQuestions, questionId, updatedQuestion, parentId) }
      }
      return q
    })
  }

  const deleteQuestion = (partId: string, questionId: string, parentId?: string) => {
    setParts((prevParts) =>
      prevParts.map((part) =>
        part.id === partId
          ? { ...part, questions: deleteQuestionRecursively(part.questions, questionId, parentId) }
          : part,
      ),
    )
  }

  const deleteQuestionRecursively = (questions: Question[], questionId: string, parentId?: string): Question[] => {
    if (!parentId) {
      return questions.filter((q) => q.id !== questionId)
    }
    return questions.map((q) => {
      if (q.id === parentId) {
        return { ...q, subQuestions: q.subQuestions.filter((sq) => sq.id !== questionId) }
      } else if (q.subQuestions.length > 0) {
        return { ...q, subQuestions: deleteQuestionRecursively(q.subQuestions, questionId, parentId) }
      }
      return q
    })
  }

  const addSubQuestion = (partId: string, parentId: string, subQuestion: Omit<Question, "id" | "subQuestions">) => {
    setParts((prevParts) =>
      prevParts.map((part) =>
        part.id === partId
          ? {
            ...part,
            questions: addSubQuestionRecursively(part.questions, parentId, subQuestion),
          }
          : part,
      ),
    )
    setAddingSubQuestion(null)
  }

  const addSubQuestionRecursively = (
    questions: Question[],
    parentId: string,
    subQuestion: Omit<Question, "id" | "subQuestions">,
  ): Question[] => {
    return questions.map((q) =>
      q.id === parentId
        ? { ...q, subQuestions: [...q.subQuestions, { ...subQuestion, id: Date.now().toString(), subQuestions: [] }] }
        : q.subQuestions.length > 0
          ? { ...q, subQuestions: addSubQuestionRecursively(q.subQuestions, parentId, subQuestion) }
          : q,
    )
  }

  const addPart = () => {
    const newPartId = (parts.length + 1).toString()
    const newPartName = `Part ${String.fromCharCode(65 + parts.length)}`
    setParts([...parts, { id: newPartId, name: newPartName, questions: [] }])
  }

  const renderQuestion = (part: Part, question: Question, level = 0, parentIndex?: number, subIndex?: number) => {
    const questionNumber =
      level === 0
        ? `Question ${parentIndex! + 1}`
        : question.subQuestions.length > 0 || subIndex !== undefined
          ? `(${String.fromCharCode(97 + subIndex!)})`
          : ""

    return (
      <div key={question.id} className={`ml-${level * 4} mb-4`}>
        <div className="flex items-center justify-between">
          <div>
            <span className="font-bold mr-2">{questionNumber}</span>
            <div className='ql-editor' dangerouslySetInnerHTML={{ __html: question.content }} />
          </div>
          <div className="flex items-center">
            <div className='flex flex-col'>
              <span className="mr-2">Marks: {question.marks}</span>
              <span className="mr-2">ClO: {question.clo}</span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() =>
                    setEditingQuestion({
                      partId: part.id,
                      questionId: question.id,
                      parentId: level > 0 ? parentIndex?.toString() : undefined,
                    })
                  }
                >
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => deleteQuestion(part.id, question.id, level > 0 ? parentIndex?.toString() : undefined)}
                >
                  Delete
                </DropdownMenuItem>
                {level === 0 && (
                  <DropdownMenuItem onClick={() => setAddingSubQuestion({ partId: part.id, parentId: question.id })}>
                    Add Sub-Question
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {question.type === "mcq" && question.choices && (
          <ul className="list-disc ml-6 mt-2">
            {question.choices.map((choice) => (
              <li key={choice.id} className={choice.isCorrect ? "font-bold" : ""}>
                {choice.content}
              </li>
            ))}
          </ul>
        )}
        {question.subQuestions.map((subQuestion, index) =>
          renderQuestion(part, subQuestion, level + 1, Number.parseInt(question.id), index),
        )}
      </div>
    )
  }

  const router = useRouter();
  const handleSubmit = () => {
    localStorage.setItem("examPaper", JSON.stringify(parts))
    router.push("/dashboard/faculty/preview-exam")
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Exam Specifications</h1>
      {parts.map((part) => (
        <div key={part.id} className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{part.name}</h2>
          {part.questions.map((question, index) => renderQuestion(part, question, 0, index))}
          <Dialog open={isAddingQuestion} onOpenChange={setIsAddingQuestion}>
            <DialogTrigger asChild className='bg-black rounded-full text-white'>
              <Button className="mt-4">Add a Question to {part.name}</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add a New Question to {part.name}</DialogTitle>
              </DialogHeader>
              <RadioGroup value={questionType} onValueChange={(value: "normal" | "mcq") => setQuestionType(value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="normal" id="normal" />
                  <Label htmlFor="normal">Normal Question</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mcq" id="mcq" />
                  <Label htmlFor="mcq">MCQ Question</Label>
                </div>
              </RadioGroup>
              {questionType === "normal" ? (
                <QuestionEditor onSave={(question) => addQuestion(part.id, question)} />
              ) : (
                <MCQEditor onSave={(question) => addQuestion(part.id, question)} />
              )}
            </DialogContent>
          </Dialog>
        </div>
      ))}
      {parts.length < 6 && (
        <Button onClick={addPart} className="mt-4 bg-black rounded-full text-white">
          Add New Part
        </Button>
      )}
      <Dialog open={editingQuestion !== null} onOpenChange={() => setEditingQuestion(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Question</DialogTitle>
          </DialogHeader>
          {editingQuestion &&
            (() => {
              const part = parts.find((p) => p.id === editingQuestion.partId)
              const question = findQuestionById(part?.questions || [], editingQuestion.questionId)
              if (question) {
                return question.type === "normal" ? (
                  <QuestionEditor
                    onSave={(updatedQuestion) =>
                      updateQuestion(
                        editingQuestion.partId,
                        editingQuestion.questionId,
                        updatedQuestion,
                        editingQuestion.parentId,
                      )
                    }
                    initialContent={question.content}
                    initialMarks={question.marks}
                  />
                ) : (
                  <MCQEditor
                    onSave={(updatedQuestion) =>
                      updateQuestion(
                        editingQuestion.partId,
                        editingQuestion.questionId,
                        updatedQuestion,
                        editingQuestion.parentId,
                      )
                    }
                    initialContent={question.content}
                    initialMarks={question.marks}
                    initialChoices={question.choices}
                  />
                )
              }
            })()}
        </DialogContent>
      </Dialog>
      <Dialog open={addingSubQuestion !== null} onOpenChange={() => setAddingSubQuestion(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Sub-Question</DialogTitle>
          </DialogHeader>
          <RadioGroup value={questionType} onValueChange={(value: "normal" | "mcq") => setQuestionType(value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="normal" id="sub-normal" />
              <Label htmlFor="sub-normal">Normal Question</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="mcq" id="sub-mcq" />
              <Label htmlFor="sub-mcq">MCQ Question</Label>
            </div>
          </RadioGroup>
          {addingSubQuestion &&
            (questionType === "normal" ? (
              <QuestionEditor
                onSave={(newQuestion) =>
                  addSubQuestion(addingSubQuestion.partId, addingSubQuestion.parentId, newQuestion)
                }
              />
            ) : (
              <MCQEditor
                onSave={(newQuestion) =>
                  addSubQuestion(addingSubQuestion.partId, addingSubQuestion.parentId, newQuestion)
                }
              />
            ))}
        </DialogContent>
      </Dialog>
      <Button onClick={handleSubmit} className="bg-blue-600 ml-5 text-white rounded-full">Submit</Button>

    </div>
  )
}

function findQuestionById(questions: Question[], id: string): Question | undefined {
  for (const question of questions) {
    if (question.id === id) {
      return question
    }
    const subQuestion = findQuestionById(question.subQuestions, id)
    if (subQuestion) {
      return subQuestion
    }
  }
  return undefined
}

