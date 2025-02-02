export interface Course {
  id: string
  name: string
}

// export interface Question {
//   id: string
//   content: string
//   isCaseStudy: boolean
//   hasSubQuestions: boolean
// }

export interface ExamData {
  course?: Course
  examDate?: Date
  startTime?: string
  endTime?: string
  questions: Question[]
}

export type StepStatus = 'upcoming' | 'current' | 'completed'


type Clo = {
  id: string;
  description: string;
  course: string;
}


type Question = {
  questionId: string;
  questionTitle: string;
  description: "Mids" | "Finals";
  Marks: number;
  clo: Clo
}