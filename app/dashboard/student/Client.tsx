'use client'
import Assignments from '@/components/dashboard/student/Assignments'
import EnrolledCourses from '@/components/dashboard/student/EnrolledCourses'
import ExamBoard from '@/components/dashboard/student/ExamBoard'
import UpperPart from '@/components/dashboard/student/UpperPart'
import { useUser } from '@/hooks/userContext'
import { User } from '@/types/user'
import React, { useEffect } from 'react'

interface StudentClientProps {
    user: User
}

const StudentClient = ({ user }: StudentClientProps) => {
    const { setUser, studentData } = useUser();
    
    
    useEffect(() => {
        setUser(user);
    }, [user])
    
    if (!user) return null;


    return (
        <main className='' >
            <UpperPart user={user} studentData={studentData} />

            <section className='grid grid-cols-12'>
                <section className='col-span-9 space-y-6 pl-7'>
                    <section className='h-72 -mt-6'>
                        <EnrolledCourses />
                    </section>
                    <section>
                        <ExamBoard />
                    </section>
                </section>
                <section className='col-span-3'>
                    <Assignments />
                </section>
            </section>

        </main>
    )
}

export default StudentClient