import { auth } from '@/auth';
import Navbar from '@/components/dashboard/student/navbar/Navbar';
import { TopNav } from '@/components/dashboard/student/navbar/TopNav';
import { redirect } from 'next/navigation';
import React from 'react'

interface LayoutProps {
    children: React.ReactNode;
}




const layout = async ({ children }: LayoutProps) => {

    const session = await auth()
    if (session) {
        if (session.user.role !== "Student") {
            return redirect("/login")
        }
    }

    return (
        <div className='grid grid-cols-12' >
            <nav className='col-span-3 xl:col-span-2'>
                <Navbar value={1}  />
            </nav>
            <main className='col-span-9 xl:col-span-10'>
                <TopNav />
                {children}
            </main>
        </div>
    )
}

export default layout