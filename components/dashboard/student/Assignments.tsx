"use client"
import book from "@/public/dashboard/EnrolledCourses/book.png"
import right from "@/public/dashboard/EnrolledCourses/Vector.png"
import { format } from "date-fns"
import Image from "next/image"

type Status = "not-submitted" | "completed" | "in-progress" | "not-started"

interface Assignment {
    course: string
    title: string
    dueDate: Date
    status: Status
}

const assignments: Assignment[] = [
    {
        course: "Graphic Fundamentals",
        title: "Design Project I",
        dueDate: new Date("2024-02-10"),
        status: "not-submitted",
    },
    {
        course: "Advanced Web Design",
        title: "Responsive Website Project",
        dueDate: new Date("2024-03-05"),
        status: "completed",
    },
    {
        course: "User Experience Research",
        title: "Usability Testing Report",
        dueDate: new Date("2024-04-15"),
        status: "in-progress",
    },
    {
        course: "Digital Photography",
        title: "Photojournalism Project",
        dueDate: new Date("2024-04-08"),
        status: "not-started",
    },
    {
        course: "3D Animation",
        title: "Character Animation Project",
        dueDate: new Date("2024-05-20"),
        status: "not-submitted",
    },
]

const statusStyles: Record<Status, { border: string; text: string; bg: string }> = {
    "not-submitted": {
        border: "border-orange-500",
        text: "text-orange-700",
        bg: "bg-orange-50",
    },
    completed: {
        border: "border-green-500",
        text: "text-green-700",
        bg: "bg-green-50",
    },
    "in-progress": {
        border: "border-purple-500",
        text: "text-purple-700",
        bg: "bg-purple-50",
    },
    "not-started": {
        border: "border-gray-300",
        text: "text-gray-700",
        bg: "bg-gray-50",
    },
}

const statusLabels: Record<Status, string> = {
    "not-submitted": "Not Submitted",
    completed: "Completed",
    "in-progress": "In Progress",
    "not-started": "Not Started",
}

export default function Assignments() {
    return (
        <div className="p-7 -mt-14">
            <div className="flex items-center justify-between w-full">
                <div className='flex items-center gap-3'>
                    <Image src={book} alt='book' />
                    <h2 className='font-medium'>Assignments</h2>
                </div>
                <button className='text-[#2F80ED] font-medium text-sm flex items-center gap-2'>View all <Image src={right} alt='right arrow' /></button>
            </div>

            <div className='w-full bg-[#CED8E5] h-[1px] my-4' />
            <div className="mx-auto max-w-2xl space-y-4">
                {assignments.map((assignment, index) => {
                    const styles = statusStyles[assignment.status]
                    return (
                        <div
                            key={index}
                            className={`relative rounded-lg border-l-4 p-4 shadow-sm transition-all hover:shadow-md ${styles.border}`}
                        >
                            <div className="mb-1 flex items-center justify-between">
                                <h3 className="font-semibold text-gray-900">{assignment.course}</h3>
                                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${styles.bg} ${styles.text}`}>
                                    {statusLabels[assignment.status]}
                                </span>
                            </div>
                            <div className="space-y-2">
                                <p className="text-sm text-gray-600">
                                    Assignment: {assignment.title}
                                </p>
                                <p className="text-sm text-gray-500">
                                    Due Date: {format(assignment.dueDate, "MMMM d, yyyy")}
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}



