"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

export interface User {
  id: string
  name: string
  email: string
  phone: string
  studentId: string
  hostel: "qwetu" | "qejani"
  roomNumber: string
  block: string
  isVerified: boolean
  createdAt: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signup: (userData: SignupData) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>
  isLoading: boolean
}

interface SignupData {
  name: string
  email: string
  phone: string
  studentId: string
  hostel: "qwetu" | "qejani"
  roomNumber: string
  block: string
  password: string
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on app load
    const checkSession = () => {
      const storedUser = localStorage.getItem("comrade_user")
      const sessionToken = localStorage.getItem("comrade_session")

      if (storedUser && sessionToken) {
        try {
          const userData = JSON.parse(storedUser)
          const tokenData = JSON.parse(sessionToken)

          // Check if session is still valid (24 hours)
          const now = new Date().getTime()
          if (now - tokenData.timestamp < 24 * 60 * 60 * 1000) {
            setUser(userData)
          } else {
            // Session expired
            localStorage.removeItem("comrade_user")
            localStorage.removeItem("comrade_session")
          }
        } catch (error) {
          console.error("Session validation error:", error)
          localStorage.removeItem("comrade_user")
          localStorage.removeItem("comrade_session")
        }
      }
      setIsLoading(false)
    }

    checkSession()
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Get stored users
      const users = JSON.parse(localStorage.getItem("comrade_users") || "[]")
      const user = users.find((u: any) => u.email === email && u.password === password)

      if (!user) {
        setIsLoading(false)
        return { success: false, error: "Invalid email or password" }
      }

      // Create session
      const sessionToken = {
        token: Math.random().toString(36).substring(2),
        timestamp: new Date().getTime(),
      }

      const { password: _, ...userWithoutPassword } = user

      localStorage.setItem("comrade_user", JSON.stringify(userWithoutPassword))
      localStorage.setItem("comrade_session", JSON.stringify(sessionToken))

      setUser(userWithoutPassword)
      setIsLoading(false)

      return { success: true }
    } catch (error) {
      setIsLoading(false)
      return { success: false, error: "Login failed. Please try again." }
    }
  }

  const signup = async (userData: SignupData) => {
    setIsLoading(true)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Get existing users
      const users = JSON.parse(localStorage.getItem("comrade_users") || "[]")

      // Check if user already exists
      const existingUser = users.find((u: any) => u.email === userData.email || u.studentId === userData.studentId)
      if (existingUser) {
        setIsLoading(false)
        return { success: false, error: "User with this email or student ID already exists" }
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        ...userData,
        isVerified: false,
        createdAt: new Date().toISOString(),
      }

      users.push(newUser)
      localStorage.setItem("comrade_users", JSON.stringify(users))

      // Auto login after signup
      const { password: _, ...userWithoutPassword } = newUser
      const sessionToken = {
        token: Math.random().toString(36).substring(2),
        timestamp: new Date().getTime(),
      }

      localStorage.setItem("comrade_user", JSON.stringify(userWithoutPassword))
      localStorage.setItem("comrade_session", JSON.stringify(sessionToken))

      setUser(userWithoutPassword)
      setIsLoading(false)

      return { success: true }
    } catch (error) {
      setIsLoading(false)
      return { success: false, error: "Signup failed. Please try again." }
    }
  }

  const logout = () => {
    localStorage.removeItem("comrade_user")
    localStorage.removeItem("comrade_session")
    setUser(null)
  }

  const resetPassword = async (email: string) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const users = JSON.parse(localStorage.getItem("comrade_users") || "[]")
      const user = users.find((u: any) => u.email === email)

      if (!user) {
        return { success: false, error: "No account found with this email address" }
      }

      // In a real app, this would send an email
      // For demo purposes, we'll just show success
      return { success: true }
    } catch (error) {
      return { success: false, error: "Password reset failed. Please try again." }
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, resetPassword, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
