import Image from "next/image"
import Logo from "@/public/ksbl-logo.png"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { redirect } from "next/navigation"
import { signIn, auth } from "@/auth"
import { AuthError } from "next-auth"
import Link from "next/link"

const Login = async () => {

  const session = await auth()
  if (session) {
    if (session.user.role === "Student") {
      redirect("/dashboard/student")
    }
    if (session.user.role === "Faculty") {
      redirect("/dashboard/faculty")
    }
    if (session.user.role === "Head of Examination") {
      redirect("/dashboard/head-of-examination")
    }
  }

  return (
    <div className='bg-ksbl h-screen flex items-center justify-center'>
      <div className='bg-[#05274F]/70 px-24 py-20 rounded-xl space-y-1 border-[3px] border-[#FBA733] backdrop-blur max-w-[690px] max-h-[690px]'>
        <Image src={Logo} alt="Logo" className="object-cover" />
        <h2 className="text-white font-bold md:text-[38px] leading-[57px]">Login</h2>

        <form action={async (formData) => {
          "use server"
          if (!formData.get("email") || !formData.get("password")) return;
          try {
            await signIn("credentials", formData)
          } catch (error) {
            if (error instanceof AuthError) {
              return redirect(`/signin`)
            }
            throw error
          }
        }}>

          <div className="space-y-8 pt-3">
            <div>
              <Label htmlFor="terms" className="text-white tracking-wider text-lg font-semibold">Email</Label>
              <Input type="email" placeholder="username@outlook.com" name="email" id="email" className="w-[500px] border-[1px] rounded-[5px] py-6 pl-5 text-white" />
            </div>
            <div>
              <Label htmlFor="terms" className="text-white tracking-wider text-lg font-semibold">Password</Label>
              <Input type="password" name="password" id="password" placeholder="Password" className="w-[500px] border-[1px] rounded-[5px] py-6 pl-5 text-white" />
              <Link href="/forgotPassword">
                <button className="text-[#FBA733] text-xs mt-3" >Forgot Password?</button>
              </Link>
            </div>
          </div>

          <div className="space-y-3 pt-8">
            <Button type="submit" value="Sign In" className="bg-[#FBA733] hover:bg-[#FBA733]/90 text-white w-full text-xl py-6 rounded-lg">Sign In</Button>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" className="border-[#FBA733] data-[state=checked]:bg-[#FBA733] data-[state=checked]:text-black data-[state=checked]:font-bold" />
              <Label htmlFor="terms" className="text-[#FBA733]" >Remember Me On This Device</Label>
            </div>
          </div>
        </form>

      </div>
    </div>
  )
}

export default Login