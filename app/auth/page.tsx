"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { LoginForm } from "@/components/auth/login-form"
import { SignupForm } from "@/components/auth/signup-form"
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form"
import { useAuth } from "@/lib/auth"

export default function AuthPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user } = useAuth()
  const [currentView, setCurrentView] = useState<"login" | "signup" | "forgot-password">("login")

  useEffect(() => {
    // Redirect if already logged in
    if (user) {
      router.push("/")
      return
    }

    // Set initial view based on URL parameter
    const view = searchParams.get("view")
    if (view === "signup" || view === "forgot-password") {
      setCurrentView(view as "signup" | "forgot-password")
    }
  }, [user, router, searchParams])

  const handleSuccess = () => {
    router.push("/")
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case "login":
        return (
          <LoginForm
            onSuccess={handleSuccess}
            onSwitchToSignup={() => setCurrentView("signup")}
            onForgotPassword={() => setCurrentView("forgot-password")}
          />
        )
      case "signup":
        return <SignupForm onSuccess={handleSuccess} onSwitchToLogin={() => setCurrentView("login")} />
      case "forgot-password":
        return <ForgotPasswordForm onBack={() => setCurrentView("login")} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">{renderCurrentView()}</div>
    </div>
  )
}
