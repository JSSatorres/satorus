"use client"

import { Utensils, LogIn, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface HeaderProps {
  isLoginMode: boolean
  onToggleMode: () => void
}

export const Header = ({ isLoginMode, onToggleMode }: HeaderProps) => {
  const router = useRouter()

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div
            className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity duration-200"
            onClick={() => router.push("/")}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <Utensils className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                PideYa
              </h1>
              <p className="text-xs text-gray-500 -mt-1">Sistema de Pedidos</p>
            </div>
          </div>

          {/* Navigation */}
          {/* <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              className="text-gray-600 hover:text-orange-600 transition-colors duration-200 font-medium"
            >
              Inicio
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-orange-600 transition-colors duration-200 font-medium"
            >
              Características
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-orange-600 transition-colors duration-200 font-medium"
            >
              Precios
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-orange-600 transition-colors duration-200 font-medium"
            >
              Contacto
            </a>
          </nav> */}

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button
              onClick={onToggleMode}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
            >
              {isLoginMode ? (
                <>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Registrar
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
