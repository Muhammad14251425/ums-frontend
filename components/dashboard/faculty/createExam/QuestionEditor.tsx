"use client"

import { useState, useMemo } from "react"
import dynamic from "next/dynamic"
import "react-quill/dist/quill.snow.css"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
})

const modules = {
  toolbar: [
    [{ font: [] }, { size: [] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ header: "1" }, { header: "2" }, "blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }, { align: [] }],
    ["link", "image", "video", "formula"],
    ["clean"],
    ["table"],
  ],
}

type QuestionEditorProps = {
  onSave: (question: { type: "normal"; content: string; marks: number }) => void
  initialContent?: string
  initialMarks?: number
}

const QuestionEditor = ({ onSave, initialContent = "", initialMarks = 0 }: QuestionEditorProps) => {
  const [content, setContent] = useState<string>(initialContent)
  const [marks, setMarks] = useState<number>(initialMarks)

  const handleContentChange = (value: string) => {
    setContent(value)
  }

  const handleSave = () => {
    onSave({ type: "normal", content, marks })
  }

  const memoizedModules = useMemo(() => modules, [])

  return (
    <div className="exam-editor">
      <ReactQuill theme="snow" value={content} onChange={handleContentChange} modules={memoizedModules} />
      <div className="mt-4 flex justify-between items-center">
        <div className="flex flex-row-reverse gap-4 items-center">
          <Input
            type="number"
            value={marks}
            onChange={(e) => setMarks(Number(e.target.value))}
            placeholder="Marks"
            className="w-24 text-black"
          />
          <p>Enter Marks:</p>
        </div>
        <Button onClick={handleSave}>Done</Button>
      </div>
      <style jsx global>{`
        .ql-editor {
          min-height: 200px;
        }
        .ql-snow .ql-toolbar button.ql-table::after {
          content: "Table";
        }
      `}</style>
    </div>
  )
}

export default QuestionEditor

