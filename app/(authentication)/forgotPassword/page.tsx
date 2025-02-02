"use client"
import type React from "react"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Eye, EyeOff } from "lucide-react"
import { forgotPassword } from "@/lib/requests"
import { useRouter } from "next/navigation"

export default function PasswordResetPage() {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState("")
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (step === 3) {
      timer = setTimeout(() => {
        router.push("/login")
      }, 3000)
    }
    return () => clearTimeout(timer)
  }, [step, router])

  const validatePassword = (password: string) => {
    const minLength = password.length >= 8
    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasSpecialChar = /[@$!%*?&]/.test(password)

    return {
      minLength,
      hasUpperCase,
      hasLowerCase,
      hasSpecialChar,
    }
  }

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      setError("Email is required.")
      return
    }
    setStep(2)
    setError("")
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    if (!oldPassword || !newPassword || !confirmPassword) {
      setError("All fields are required.")
      setLoading(false)
      return
    }
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.")
      setLoading(false)
      return
    }

    const passwordData = {
      email: email,
      oldPassword: oldPassword,
      newPassword: newPassword,
    }

    try {
      const response = await forgotPassword(passwordData)

      if (response.error) {
        setError(response.error)
      } else {
        setStep(3) // Move to success step
      }
    } catch (error) {
      console.error("Error resetting password:", error)
      setError("Failed to reset password. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const { minLength, hasUpperCase, hasLowerCase, hasSpecialChar } = validatePassword(newPassword)

  return (
    <div className="relative bg-[url('/Login/ksbl.png')] h-screen bg-cover bg-center flex items-center justify-center">
      <Card className="w-full backdrop-blur p-6 top-[202px] left-[615px] border-t-[3px] border-r-8 rounded-[15px] max-w-[638px] max-h-screen bg-[#05274F]/85 border-[3px] border-[#FBA733] text-white">
        <CardHeader>
          <h2 className="text-3xl font-bold">
            {step === 1 ? "Reset your password" : step === 2 ? "Set a new password" : "Password Reset Successful"}
          </h2>
          <p className="text-sm text-white">
            {step === 1
              ? "Enter your email to reset your password."
              : step === 2
                ? "Create a new password. Your new password must be different from your previous password."
                : "Your password has been successfully reset. Redirecting to login page..."}
          </p>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div className="relative">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="someone@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`mt-1 ${error ? "border-red-500" : ""}`}
                />
              </div>
              {error && <div className="text-xs text-red-500">{error}</div>}
              <Button type="submit" className="w-full bg-[#FBA733] hover:bg-[#FBA733]/90 text-white">
                Continue
              </Button>
            </form>
          )}
          {step === 2 && (
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              {/* Old Password Field */}
              <div className="relative">
                <label htmlFor="old-password" className="block text-sm font-medium">
                  Old Password
                </label>
                <Input
                  id="old-password"
                  type={showOldPassword ? "text" : "password"}
                  placeholder="Enter your old password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className={`mt-1 ${error ? "border-red-500" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  className="absolute right-3 top-[38px]"
                  aria-label="Toggle old password visibility"
                >
                  {showOldPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>

              {/* New Password Field */}
              <div className="relative">
                <label htmlFor="new-password" className="block text-sm font-medium">
                  New Password
                </label>
                <Input
                  id="new-password"
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Enter your new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={`mt-1 ${error ? "border-red-500" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-[38px]"
                  aria-label="Toggle new password visibility"
                >
                  {showNewPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>

              {/* Confirm New Password Field */}
              <div className="relative">
                <label htmlFor="confirm-password" className="block text-sm font-medium">
                  Confirm New Password
                </label>
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`mt-1 ${error ? "border-red-500" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-[38px]"
                  aria-label="Toggle confirm password visibility"
                >
                  {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>

              {error && <div className="text-xs text-red-500">{error}</div>}

              {/* Password Requirements */}
              <ul className="text-xs text-white space-y-1">
                <li className={minLength ? "text-green-500" : "text-red-500"}>• Must have a minimum of 8 characters</li>
                <li className={hasUpperCase ? "text-green-500" : "text-red-500"}>
                  • Must include at least 1 uppercase letter
                </li>
                <li className={hasLowerCase ? "text-green-500" : "text-red-500"}>
                  • Must include at least 1 lowercase letter
                </li>
                <li className={hasSpecialChar ? "text-green-500" : "text-red-500"}>
                  • Must include at least 1 special character
                </li>
              </ul>

              <Button type="submit" className="w-full bg-[#FBA733] hover:bg-[#FBA733]/90 text-white" disabled={loading}>
                {loading ? "Updating Password..." : "Update Password"}
              </Button>
            </form>
          )}
          {step === 3 && (
            <div className="text-center">
              <p className="text-green-500 text-xl mb-4">Password reset successful!</p>
              <p>Redirecting to login page in 3 seconds...</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

