import { OverviewCard } from "./OverviewCard"

const overviewItems = [
  {
    title: "Exam Overview",
    buttonText: "Create New Exam",
    link:"create_exam",
    features: [
      { text: "Upload Exam File", icon: "Folder" },
      { text: "Set Exam Date and Time", icon: "Calendar" },
      { text: "Set Exam Duration", icon: "Clock" },
      { text: "Set Exam Location", icon: "MapPin" },
    ],
  },
  {
    title: "Pending Grading",
    buttonText: "Start Grading",
    link:"",
    features: [
      { text: "View Uploaded Exams", icon: "FileText" },
      { text: "Preview Grades", icon: "CheckSquare" },
      { text: "Due Date for Result", icon: "Calendar" },
      { text: "Feedback On Grades", icon: "MessageSquare" },
    ],
  },
  {
    title: "Upcoming Deadline",
    buttonText: "Set Reminder",
    link:"",
    features: [
      { text: "Approaching Deadlines", icon: "AlertCircle" },
      { text: "Due Dates", icon: "Calendar" },
      { text: "Set Reminders", icon: "Bell" },
      { text: "Alert Notifications", icon: "BellRing" },
    ],
  },
  {
    title: "Queries",
    buttonText: "View All Queries",
    link:"",
    features: [
      { text: "Queries History", icon: "List" },
      { text: "Response Box", icon: "MessageSquare" },
      { text: "2:00 PM - 5:00 PM", icon: "Clock" },
      { text: "Query Notifications", icon: "Bell" },
    ],
  },
]

const Overview = () => {
  return (
    <div>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="font-medium text-lg">Overview</h2>
        </div>
        <button className="text-[#2F80ED] font-medium text-sm">View all</button>
      </div>
      <div className="w-full bg-[#CED8E5] h-[1px] my-4" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {overviewItems.map((item, index) => (
          <OverviewCard key={index} {...item} />
        ))}
      </div>
    </div>
  )
}

export default Overview

