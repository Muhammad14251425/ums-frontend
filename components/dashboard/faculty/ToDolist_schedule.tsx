import { CourseSchedule } from "./course-schedule"
import { TaskList } from "./task-list"

const tasks = [
  {
    id: "1",
    name: "Check Assignments",
    course: "ART101",
    date: "Jan 25, 2024",
    status: "completed" as const,
  },
  {
    id: "2",
    name: "Publish a Quiz",
    course: "ART103",
    date: "Feb 5, 2024",
    status: "completed" as const,
  },
  {
    id: "3",
    name: "Create an exam",
    course: "UXD301",
    date: "Mar 10, 2024",
    status: "upcoming" as const,
  },
  {
    id: "4",
    name: "Prototyping Updates",
    course: "ART101",
    date: "Apr 2, 2024",
    status: "upcoming" as const,
  },
  {
    id: "5",
    name: "Product Design Prototype",
    course: "ITD201",
    date: "May 15, 2024",
    status: "upcoming" as const,
  },
  {
    id: "6",
    name: "Check Queries",
    course: "ART103",
    date: "June 8, 2024",
    status: "upcoming" as const,
  },
  {
    id: "7",
    name: "Provide Feedback",
    course: "ART202",
    date: "Nov 20, 2024",
    status: "upcoming" as const,
  },
]

const courses = [
  { id: "1", date: "Dec 10, 2024" },
  { id: "2", date: "Dec 11, 2024" },
  { id: "3", date: "Dec 16, 2024" },
  { id: "4", date: "Dec 20, 2024" },
  { id: "5", date: "Dec 22, 2024" },
  { id: "6", date: "Dec 25, 2024" },
  { id: "7", date: "Dec 28, 2024" },
]

const ToDolist_schedule = () => {
  return (
    <div className="bg-gray-100 p-6">
      <div className="mx-auto max-w-7xl flex space-x-6">
        {/* Task List */}
        <div className="flex-1">
          <TaskList tasks={tasks} />
        </div>
        {/* Course Schedule */}
        <div className="flex-1">
          <CourseSchedule courses={courses} />
        </div>
      </div>
    </div>
  )
}

export default ToDolist_schedule
