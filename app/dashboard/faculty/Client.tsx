'use client'
import React, { useEffect } from 'react'
import UpperPart from '../../../components/dashboard/faculty/UpperPart'
import Assignments from '../../../components/dashboard/faculty/Assignments'
import EnrolledCourses from '../../../components/dashboard/faculty/Overview'
import ToDolist_schedule from '../../../components/dashboard/faculty/ToDolist_schedule'
import { User } from '@/types/user'
import { useUser } from '@/hooks/userContext'

interface FacultyClientProps {
    user: User
}

const FacultyClient = ({ user }: FacultyClientProps) => {

    const { setUser, studentData } = useUser();


    useEffect(() => {
        setUser(user);
    }, [user])

    if (!user) return null;

    return (
        <main className='' >
            <UpperPart user={user} />

            <section className='grid grid-cols-12'>
                <section className='col-span-9 space-y-6 pl-7'>
                    <section className='h-fit -mt-36'>
                        <EnrolledCourses />
                    </section>
                    <section>
                        {<ToDolist_schedule />}
                    </section>
                </section>
                <section className='col-span-3'>
                    <Assignments />
                </section>
            </section>

        </main>
    )
}

export default FacultyClient