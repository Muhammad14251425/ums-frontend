import { User2, Calendar, Clock, MapPin } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CourseCardProps {
  title: string
  code: string
  professor: string
  days: string
  time: string
  location: string
}

export function CourseCard({
  title,
  code,
  professor,
  days,
  time,
  location,
}: CourseCardProps) {
  return (
    <Card className="bg-[#3282DC]/40 border-none relative rounded-[4px]">
      <div className=' h-full w-full absolute border -bottom-[6px] -right-[6px] border-[#CED8E5]/70 ' />
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium border-b pb-1 border-black">
          {title} - {code}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <User2 className="h-4 w-4" />
          <span>{professor}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4" />
          <span>{days}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4" />
          <span>{time}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4" />
          <span>{location}</span>
        </div>
      </CardContent>
    </Card>
  )
}

