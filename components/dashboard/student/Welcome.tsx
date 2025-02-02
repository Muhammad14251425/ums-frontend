import attendance from "@/public/dashboard/student/calendar-tick.png"
import { User } from "@/types/user";
import Image from "next/image"

interface WelcomeProps {
  user: User;
}

const Welcome = ({ user }: WelcomeProps) => {
  return (
    <div className='pl-7 space-y-5'>
      <h2 className='text-2xl leading-[36px]'>👋 Welcome, {user.fullName}</h2>
      <div className="flex items-center gap-3 pl-3">
        <Image src={attendance} alt="attendance" />
        <h2 className="text-primary text-sm leading-[21px] font-medium">Attendance</h2>
      </div>
    </div>
  )
}

export default Welcome