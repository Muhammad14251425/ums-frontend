import Image from 'next/image'
import book from "@/public/dashboard/EnrolledCourses/book.png"
import right from "@/public/dashboard/EnrolledCourses/Vector.png"
import TableComponent from './Table'

const ExamBoard = () => {
  return (
    <div className=''>
      <div className='w-full flex items-center justify-between '>
        <div className='flex items-center gap-3'>
          <Image src={book} alt='book' />
          <h2 className='font-medium'>Exam Board</h2>
        </div>
        <button className='text-[#2F80ED] font-medium text-sm flex items-center gap-2'>View all <Image src={right} alt='right arrow' /></button>
      </div>
      <div className='w-full bg-[#CED8E5] h-[1px] my-4' />
      <TableComponent />
    </div>
  )
}

export default ExamBoard