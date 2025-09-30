"use client"

import { Button } from "@/components/ui/button"
import { Plus, Menu, LogOut } from "lucide-react"
import { logout } from "@/lib/auth"

export const DashboardHeader = () => {
  const handleLogout = async () => {
    try {
      await logout()
      console.log("Logout exitoso")
    } catch (error) {
      console.error("Error al cerrar sesión:", error)
    }
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <Menu className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                PideYa
              </h1>
              <p className="text-xs text-gray-500 -mt-1">Dashboard</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => console.log("Añadir menú")}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Añadir Menú
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-gray-300 hover:bg-gray-50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
