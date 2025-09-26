"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import {
  Smartphone,
  Clock,
  Users,
  TrendingUp,
  Shield,
  Zap,
  CheckCircle,
  Star,
  ArrowRight,
  Utensils,
  LogIn,
  UserPlus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function HomePage() {
  const { isAuthenticated, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-spin">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full"></div>
          </div>
          <p className="text-lg text-gray-600">Cargando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <Utensils className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  PideYa
                </h1>
                <p className="text-xs text-gray-500 -mt-1">
                  Sistema de Pedidos
                </p>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => router.push("/login")}
                className="border-orange-200 text-orange-600 hover:bg-orange-50"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Iniciar Sesión
              </Button>
              <Button
                onClick={() => router.push("/register")}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Registrarse
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Revoluciona tu
            <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              {" "}
              Restaurante
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Los clientes piden desde su móvil sin que tengas que estar
            pendiente. Agiliza la gestión de tu bar o restaurante con pedidos
            digitales inteligentes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => router.push("/register")}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 text-lg"
            >
              Comenzar Gratis
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-orange-200 text-orange-600 hover:bg-orange-50 px-8 py-4 text-lg"
            >
              Ver Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              ¿Por qué elegir PideYa?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              La solución completa para modernizar tu restaurante y mejorar la
              experiencia de tus clientes
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card className="p-8 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Smartphone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Pedidos desde el Móvil
              </h3>
              <p className="text-gray-600 mb-6">
                Tus clientes pueden hacer pedidos directamente desde su
                teléfono, sin necesidad de que estés pendiente. Menos trabajo,
                más eficiencia.
              </p>
              <div className="flex items-center justify-center text-orange-600">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span className="font-medium">Sin intermediarios</span>
              </div>
            </Card>

            {/* Feature 2 */}
            <Card className="p-8 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Gestión Inteligente
              </h3>
              <p className="text-gray-600 mb-6">
                Recibe todos los pedidos organizados en tiempo real. El sistema
                te notifica automáticamente y organiza todo por mesa.
              </p>
              <div className="flex items-center justify-center text-orange-600">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span className="font-medium">Tiempo real</span>
              </div>
            </Card>

            {/* Feature 3 */}
            <Card className="p-8 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Mejor Experiencia
              </h3>
              <p className="text-gray-600 mb-6">
                Los clientes pueden ver el menú completo, personalizar pedidos y
                pagar directamente desde su mesa. Experiencia premium
                garantizada.
              </p>
              <div className="flex items-center justify-center text-orange-600">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span className="font-medium">Experiencia premium</span>
              </div>
            </Card>

            {/* Feature 4 */}
            <Card className="p-8 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Aumenta las Ventas
              </h3>
              <p className="text-gray-600 mb-6">
                Los clientes pueden ver fotos atractivas del menú y agregar
                extras fácilmente. Esto aumenta el ticket promedio y las ventas.
              </p>
              <div className="flex items-center justify-center text-orange-600">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span className="font-medium">+30% ventas promedio</span>
              </div>
            </Card>

            {/* Feature 5 */}
            <Card className="p-8 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Operación Eficiente
              </h3>
              <p className="text-gray-600 mb-6">
                Reduce errores en pedidos, optimiza el tiempo de servicio y
                permite que tu personal se enfoque en la calidad.
              </p>
              <div className="flex items-center justify-center text-orange-600">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span className="font-medium">Menos errores</span>
              </div>
            </Card>

            {/* Feature 6 */}
            <Card className="p-8 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Seguro y Confiable
              </h3>
              <p className="text-gray-600 mb-6">
                Pagos seguros, datos protegidos y sistema estable. Tu negocio y
                tus clientes están siempre seguros.
              </p>
              <div className="flex items-center justify-center text-orange-600">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span className="font-medium">100% seguro</span>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-orange-500 to-red-500">
        <div className="max-w-7xl mx-auto">
          <div className="text-center text-white mb-16">
            <h2 className="text-4xl font-bold mb-4">Resultados que Hablan</h2>
            <p className="text-xl opacity-90">
              Miles de restaurantes ya confían en PideYa
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-white mb-2">500+</div>
              <div className="text-orange-100">Restaurantes Activos</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-white mb-2">50K+</div>
              <div className="text-orange-100">Pedidos Diarios</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-white mb-2">30%</div>
              <div className="text-orange-100">Aumento en Ventas</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-white mb-2">4.9</div>
              <div className="text-orange-100 flex items-center justify-center">
                <Star className="w-5 h-5 mr-1 fill-current" />
                Valoración
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            ¿Listo para Revolucionar tu Restaurante?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Únete a cientos de restaurantes que ya están disfrutando de los
            beneficios de PideYa
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => router.push("/register")}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 text-lg"
            >
              Comenzar Ahora
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-orange-200 text-orange-600 hover:bg-orange-50 px-8 py-4 text-lg"
            >
              Contactar Ventas
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <Utensils className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">PideYa</h3>
                <p className="text-sm text-gray-400">Sistema de Pedidos</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400">
                © 2024 PideYa. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
