'use client'
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Clock } from "lucide-react";
import Link from "next/link";
import { useExam } from "@/hooks/useExam";

interface ExamCardProps {
  title: string;
  course: string;
  subject: string;
  date: string;
  startTime: string;
  endTime: string;
  questions?: number;
  buttonText: string;
  buttonLink?: string;
}

const ExamCard: React.FC<ExamCardProps> = ({
  title,
  course,
  subject,
  date,
  startTime,
  endTime,
  questions,
  buttonText,
  buttonLink,
}) => (
  <Card className="p-4 max-w-md">
    <div className="space-y-4">
      <h2 className="font-medium">{title}</h2>

      <div className="space-y-1 text-sm text-gray-500">
        <p>Course: {course}</p>
        <p>Exam Type: {subject}</p>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-500">
        <div>{date}</div>
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          {startTime} - {endTime}
        </div>
      </div>

      {questions !== undefined && (
        <div className="text-sm text-gray-500">Questions: {questions}</div>
      )}

      <div className="space-y-1">
        <div className="text-sm">Passing Percentage</div>
        <div className="h-2 w-full bg-gray-100 rounded-full">
          <div className="h-full w-3/4 bg-blue-600 rounded-full"></div>
        </div>
      </div>

      {buttonLink ? (
        <Link href={buttonLink} passHref>
          <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">{buttonText}</Button>
        </Link>
      ) : (
        <Button className="w-full bg-blue-600 hover:bg-blue-700">{buttonText}</Button>
      )}
    </div>
  </Card>
);

export default function ExamPage() {
  const { examData } = useExam();

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Exams</h1>
        <Link href="/dashboard/faculty/select-course">
          <Button variant="default" size="sm" className="bg-blue-600 hover:bg-blue-700">
            + Add Exam
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="history" className="mb-6">
        <TabsList className="border-b w-full justify-start rounded-none h-auto p-0 bg-transparent">
          <TabsTrigger
            value="scheduled"
            className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-blue-600 data-[state=active]:bg-transparent"
          >
            Scheduled Exams
          </TabsTrigger>
          <TabsTrigger
            value="history"
            className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-blue-600 data-[state=active]:bg-transparent"
          >
            History
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-0">
        <ExamCard
          title="Object Oreinted Programming"
          course="Object Oreinted Programming"
          subject="Mid Exam"
          date="03-01-2023"
          startTime="12:30 AM"
          endTime="01:40 PM"
          questions={3}
          buttonText="View Sample Paper"
          buttonLink="/dashboard/faculty/sample-paper"
        />

        <ExamCard
          title="Data Structures"
          course="Data Structures"
          subject="Mid Exam"
          date="03-01-2023"
          startTime="12:30 AM"
          endTime="01:40 PM"
          questions={50}
          buttonText="Edit Details"
        />

        {/* {examData} */}

        {examData.course?.name && examData.examDate && examData.startTime && examData.endTime && (
          <ExamCard
            title={`${examData.course.name} in Semester 1`}
            course={examData.course.name}
            subject="Final Exam"
            date={examData.examDate.toLocaleDateString()}
            startTime={examData.startTime}
            endTime={examData.endTime}
            buttonText="View Paper"
            buttonLink='/dashboard/faculty/final-paper'
          />
        )}

      </div>
    </div>
  );
}