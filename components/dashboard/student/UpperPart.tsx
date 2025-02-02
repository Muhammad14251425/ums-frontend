'use client'
import { Calendar } from '@/components/ui/calendar'
import { Progress } from '@/components/ui/progress'
import React from 'react'
import Charts from './Charts'
import Welcome from './Welcome'
import { StudentData, User } from '@/types/user'

interface UpperPartProps {
    user: User;
    studentData: StudentData | null;
}

const UpperPart = ({ user, studentData }: UpperPartProps) => {
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    const semester = 3
    const totalSemesters = 8
    const progress = (semester / totalSemesters) * 100



    return (
        <section className='grid grid-cols-12' >
            <div className='col-span-9 py-7 w-full'>
                <Welcome user={user} />
                <Charts cgpa={studentData?.cgpa} />
            </div>

            <div className='col-span-3 px-8 py-4 h-96 space-y-4 flex flex-col items-center'>
                <div className="flex items-start flex-col gap-2 text-sm text-gray-600 w-full">
                    <span>Semester <span className='font-semibold text-lg'>{semester}</span> of {totalSemesters}</span>
                    <div className="w-full">
                        <Progress value={progress} className="h-2" />
                    </div>
                </div>

                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md"
                />
            </div>
        </section>
    )
}

export default UpperPart