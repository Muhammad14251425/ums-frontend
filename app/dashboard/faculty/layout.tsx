import { auth } from '@/auth';
import Navbar from '@/components/dashboard/student/navbar/Navbar';
import { TopNav } from '@/components/dashboard/student/navbar/TopNav';
import { redirect } from 'next/navigation';
import React from 'react'
import { ExamProvider } from '@/hooks/useExam';

interface LayoutProps {
    children: React.ReactNode;
}

const layout = async ({ children }: LayoutProps) => {

    const session = await auth()
    if (session) {
        if (session.user.role !== "Faculty") {
            return redirect("/login")
        }
    }

    return (
        <div className='grid grid-cols-12' >
            <nav className='col-span-3 xl:col-span-2'>
                <Navbar value={2} />
            </nav>
            <main className='col-span-9 xl:col-span-10'>
                <TopNav />
                <ExamProvider>
                    {children}
                </ExamProvider>
            </main>
        </div>
    )
}

export default layout