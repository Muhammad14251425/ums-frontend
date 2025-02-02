import { auth } from '@/auth'
import StudentClient from './Client'


const Student = async () => {
  const session = await auth()
  if (!session?.user) return



  return (
    <main>
      <StudentClient user={
        {
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
        }
      } />
    </main>
  )
}

export default Student