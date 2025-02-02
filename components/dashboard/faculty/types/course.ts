export type Status = 'completed' | 'upcoming'

export interface Task {
  id: string
  name: string
  course: string
  date: string
  status: Status
}

export interface Course {
  id: string
  date: string
}

