"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { User, onAuthStateChanged } from "firebase/auth"
import { auth } from "@/lib/firebase"

interface AuthContextType {
  user: User | null
  loading: boolean
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAuthenticated: false,
})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user)
      setLoading(false)

      // Manejar cookies para el middleware
      if (user) {
        // Obtener el token de ID
        const token = await user.getIdToken()
        document.cookie = `firebase-auth-token=${token}; path=/; max-age=3600; secure; samesite=strict`
      } else {
        // Limpiar cookie si no hay usuario
        document.cookie =
          "firebase-auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
      }
    })

    return () => unsubscribe()
  }, [])

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

