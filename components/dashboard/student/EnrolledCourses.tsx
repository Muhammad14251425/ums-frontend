import Image from 'next/image'
import book from "@/public/dashboard/EnrolledCourses/book.png"
import right from "@/public/dashboard/EnrolledCourses/Vector.png"
import { CourseCard } from './course-card'
const courses = [
  {
    title: "Graphic Fundamentals",
    code: "ART101",
    professor: "Prof. Smith",
    days: "Monday & Wednesday",
    time: "9:00 AM - 10:30 AM",
    location: "Design Studio A",
  },
  {
    title: "Advanced Web Design",
    code: "ITD201",
    professor: "Dr. Johnson",
    days: "Tuesday & Thursday",
    time: "1:30 PM - 3:00 PM",
    location: "Computer Lab 3",
  },
  {
    title: "User Experience Research",
    code: "UXD301",
    professor: "Prof. Davis",
    days: "Monday & Saturday",
    time: "11:00 AM - 12:30 AM",
    location: "Design Lab 2",
  },
  {
    title: "3D Animation Techniques",
    code: "ANI301",
    professor: "Dr. Martinez",
    days: "Wednesday",
    time: "2:00 PM - 5:00 PM",
    location: "Animation Studio",
  },
]
const EnrolledCourses = () => {
  return (
    <div>
      <div className='w-full flex items-center justify-between '>
        <div className='flex items-center gap-3'>
          <Image src={book} alt='book' />
          <h2 className='font-medium'>Enrolled Courses</h2>
        </div>
        <button className='text-[#2F80ED] font-medium text-sm flex items-center gap-2'>View all <Image src={right} alt='right arrow' /></button>
      </div>
      <div className='w-full bg-[#CED8E5] h-[1px] my-4' />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {courses.map((course) => (
          <CourseCard key={course.code} {...course} />
        ))}
      </div>
    </div>
  )
}

export default EnrolledCourses