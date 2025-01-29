import { redirect } from "next/navigation"
import { signIn, auth } from "@/auth"
import { AuthError } from "next-auth"

export default async function SignInPage() {

    // const searchparams = useSearchParams()

    const session = await auth()
    if (session) {
        if (session.user.role === "Student") {
            redirect("/dashboard/student")
        }
        if (session.user.role === "Faculty") {
            redirect("/dashboard/Faculty")
        }
        if (session.user.role === "Head of Examination") {
            redirect("/dashboard/Head-of-Examination")
        }
    }


    return (
        <div className="flex flex-col gap-8 h-screen justify-center items-center">
            <form
                action={async (formData) => {
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
                }}
                className="flex flex-col  gap-8"
            >
                <label htmlFor="email">
                    Email
                    <input name="email" id="email" />
                </label>
                <label htmlFor="password">
                    Password
                    <input name="password" id="password" />
                </label>
                <button type="submit" value="Sign In" >Submit</button>
            </form>
            {/* {Object.values(providerMap).map((provider) => (
        <form
          action={async () => {
            "use server"
            try {
              await signIn(provider.id, {
                redirectTo: props.searchParams?.callbackUrl ?? "",
              })
            } catch (error) {
              // Signin can fail for a number of reasons, such as the user
              // not existing, or the user not having the correct role.
              // In some cases, you may want to redirect to a custom error
              if (error instanceof AuthError) {
                return redirect(`/error?error=${error.type}`)
              }
 
              // Otherwise if a redirects happens Next.js can handle it
              // so you can just re-thrown the error and let Next.js handle it.
              // Docs:
              // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
              throw error
            }
          }}
        >
          <button type="submit">
            <span>Sign in with {provider.name}</span>
          </button>
        </form>
      ))} */}
        </div>
    )
}