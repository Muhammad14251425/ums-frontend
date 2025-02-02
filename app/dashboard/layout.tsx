import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import React from 'react'

interface LayoutProps {
    children: React.ReactNode;
}



const layout = async ({ children }: LayoutProps) => {

    const session = await auth()
    if(!session){
        return redirect("/login");
    }

    return (
        <section>{children}</section>
    )
}

export default layout