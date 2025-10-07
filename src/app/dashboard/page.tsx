"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { Dashboard } from "@/components/Dashboard"

export default function DashboardPage() {
  const { isAuthenticated, loading } = useAuth()
  const router = useRouter()
  const [demoMode, setDemoMode] = useState(false)

  useEffect(() => {
    // Si Firebase no está configurado, activar modo demo
    if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
      setDemoMode(true)
      return
    }

    if (!loading && !isAuthenticated) {
      router.push("/register")
    }
  }, [isAuthenticated, loading, router])

  if (loading && !demoMode) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-spin">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full"></div>
          </div>
          <p className="text-lg text-gray-600">Cargando...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated && !demoMode) {
    return null // Se redirigirá automáticamente
  }

  return (
    <div>
      {demoMode && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <strong>Modo Demo:</strong> Firebase no configurado. Puedes
                probar el escaneo de menú con datos de ejemplo.
              </p>
            </div>
          </div>
        </div>
      )}
      <Dashboard />
    </div>
  )
}
