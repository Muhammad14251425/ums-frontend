import React from 'react'
import FacultyClient from './Client'
import { auth } from '@/auth'

const Faculty = async () => {
  const session = await auth()
  if (!session?.user) return
  return (
    <main>
      <FacultyClient
        user={{
          uuid: session.user.id!,
          age: session.user.age!,
          fullName: session.user.name!,
          userName: session.user.name!,
          gender: session.user.gender as "Male" | "Female" | "Other",
          userEmail: session.user.email!,
          userPhone: session.user.phone!,
          userRole: {
            roleName: session.user.role,
            userRoleId: session.user.role === "Student" ? 1 : session.user.role === "Faculty" ? 2 : 3
          }
        }}
      />
    </main>
  )
}

export default Faculty