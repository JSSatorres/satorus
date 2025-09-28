"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail, Building2 } from "lucide-react"
import { GoogleButton } from "@/components/ui/GoogleButton"
import { signUpWithEmail, signInWithGoogle } from "@/lib/auth"
import { useRouter } from "next/navigation"

interface RestaurantFormData {
  name: string
  address: string
  phone: string
  email: string
  ownerName: string
  username: string
  password: string
}

export const RestaurantForm = () => {
  const [formData, setFormData] = useState<RestaurantFormData>({
    name: "",
    address: "",
    phone: "",
    email: "",
    ownerName: "",
    username: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleInputChange = (
    field: keyof RestaurantFormData,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      // Crear usuario con email y contraseña
      await signUpWithEmail(formData.email, formData.password)
      console.log("Registro exitoso")
      // Aquí puedes guardar los datos del restaurante en Firestore
      router.push("/dashboard")
    } catch (error: unknown) {
      setError(
        error instanceof Error
          ? error.message
          : "Error al registrar el restaurante"
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignUp = async () => {
    setIsLoading(true)
    setError(null)

    try {
      await signInWithGoogle()
      console.log("Registro con Google exitoso")
      router.push("/dashboard")
    } catch (error: unknown) {
      setError(
        error instanceof Error
          ? error.message
          : "Error al registrarse con Google"
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="text-center ">
        <div className="mx-auto w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
          <Building2 className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
          Crear tu Restaurante
        </CardTitle>
      </CardHeader>

      <CardContent>
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-2">
          {/* Información del Restaurante */}
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-3">
              <Building2 className="w-5 h-5 text-orange-500" />
              Información del Restaurante
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700"
                >
                  Nombre del Restaurante *
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Ej: La Parrilla del Chef"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="ownerName"
                  className="text-sm font-medium text-gray-700"
                >
                  Nombre del Propietario *
                </Label>
                <Input
                  id="ownerName"
                  type="text"
                  placeholder="Tu nombre completo"
                  value={formData.ownerName}
                  onChange={(e) =>
                    handleInputChange("ownerName", e.target.value)
                  }
                  className="h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="username"
                  className="text-sm font-medium text-gray-700"
                >
                  Nombre de Usuario *
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="usuario123"
                  value={formData.username}
                  onChange={(e) =>
                    handleInputChange("username", e.target.value)
                  }
                  className="h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Contraseña *
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Mínimo 8 caracteres"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  className="h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Información de Contacto */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-3">
              <Phone className="w-5 h-5 text-orange-500" />
              Información de Contacto
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="address"
                className="text-sm font-medium text-gray-700"
              >
                Dirección *
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="address"
                  type="text"
                  placeholder="Calle, número, colonia, ciudad"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className="h-12 pl-10 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="phone"
                  className="text-sm font-medium text-gray-700"
                >
                  Teléfono *
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+52 55 1234 5678"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="h-12 pl-10 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Correo Electrónico *
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="restaurante@ejemplo.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="h-12 pl-10 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Botón de Envío */}
          <div className="pt-4 space-y-3">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Building2 className="w-5 h-5 mr-2" />
              {isLoading ? "Creando restaurante..." : "Crear Restaurante"}
            </Button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">o</span>
              </div>
            </div>

            {/* Google Button */}
            <GoogleButton
              onClick={handleGoogleSignUp}
              text={isLoading ? "Registrando..." : "Registrarse con Google"}
              className={isLoading ? "opacity-50 cursor-not-allowed" : ""}
            />
          </div>

          {/* Información adicional */}
          <div className="text-center text-sm text-gray-500 pt-2">
            <p>
              Al crear tu restaurante, aceptas nuestros{" "}
              <a
                href="/terms"
                className="text-orange-500 hover:text-orange-600 underline"
              >
                Términos y Condiciones
              </a>{" "}
              y{" "}
              <a
                href="/privacy"
                className="text-orange-500 hover:text-orange-600 underline"
              >
                Política de Privacidad
              </a>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
