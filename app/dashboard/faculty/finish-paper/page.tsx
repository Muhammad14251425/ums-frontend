import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

export default function ExamConfirm() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full mx-auto p-8">
                <div className="text-center">
                    <div className="flex justify-center mb-4">
                        <CheckCircle className="w-16 h-16 text-green-500" />
                    </div>
                    <h1 className="text-2xl font-bold mb-2">Exam Created Successfully!</h1>
                    <p className="text-gray-600 mb-8">
                        Your exam has been created and saved. You can now view it in your exam list or create another exam.
                    </p>
                    <div className="space-y-4">
                        <Link href="/dashboard/faculty/create_exam">
                            <Button className="w-full">View Exam List</Button>
                        </Link>
                        <Link href="/dashboard/faculty/create-exam">
                            <Button variant="outline" className="w-full">
                                Create Another Exam
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}