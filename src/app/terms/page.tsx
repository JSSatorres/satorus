import { Utensils, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              href="/"
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200"
            >
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
            </Link>
            <Link href="/">
              <Button
                variant="outline"
                className="border-orange-200 text-orange-600 hover:bg-orange-50"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al inicio
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Términos y Condiciones
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-8">
              <strong>Última actualización:</strong>{" "}
              {new Date().toLocaleDateString("es-ES")}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                1. Aceptación de los Términos
              </h2>
              <p className="text-gray-700 mb-4">
                Al acceder y utilizar PideYa, aceptas estar sujeto a estos
                términos y condiciones de uso. Si no estás de acuerdo con alguna
                parte de estos términos, no debes utilizar nuestro servicio.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                2. Descripción del Servicio
              </h2>
              <p className="text-gray-700 mb-4">
                PideYa es una plataforma digital que permite a los restaurantes
                gestionar pedidos de manera eficiente y a los clientes realizar
                pedidos desde sus dispositivos móviles.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                3. Uso del Servicio
              </h2>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                3.1 Uso Permitido
              </h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>
                  Utilizar el servicio para gestionar pedidos de restaurantes
                </li>
                <li>Realizar pedidos como cliente registrado</li>
                <li>Acceder a la información de tu cuenta</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                3.2 Uso Prohibido
              </h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Utilizar el servicio para actividades ilegales</li>
                <li>Intentar acceder a cuentas de otros usuarios</li>
                <li>Interferir con el funcionamiento del servicio</li>
                <li>Distribuir malware o contenido malicioso</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                4. Cuentas de Usuario
              </h2>
              <p className="text-gray-700 mb-4">
                Para utilizar ciertas funciones de PideYa, debes crear una
                cuenta. Eres responsable de:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Mantener la confidencialidad de tu contraseña</li>
                <li>Proporcionar información precisa y actualizada</li>
                <li>Notificar inmediatamente cualquier uso no autorizado</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                5. Privacidad y Protección de Datos
              </h2>
              <p className="text-gray-700 mb-4">
                El tratamiento de tus datos personales se rige por nuestra
                Política de Privacidad, que cumple con el Reglamento General de
                Protección de Datos (GDPR) de la Unión Europea.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                6. Pagos y Facturación
              </h2>
              <p className="text-gray-700 mb-4">
                Los pagos se procesan de forma segura a través de proveedores de
                pago certificados. Los precios mostrados incluyen todos los
                impuestos aplicables.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                7. Limitación de Responsabilidad
              </h2>
              <p className="text-gray-700 mb-4">
                PideYa no se hace responsable de daños indirectos, incidentales
                o consecuenciales que puedan resultar del uso del servicio.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                8. Modificaciones
              </h2>
              <p className="text-gray-700 mb-4">
                Nos reservamos el derecho de modificar estos términos en
                cualquier momento. Las modificaciones entrarán en vigor
                inmediatamente después de su publicación.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                9. Ley Aplicable
              </h2>
              <p className="text-gray-700 mb-4">
                Estos términos se rigen por la legislación española. Cualquier
                disputa será resuelta por los tribunales competentes de España.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                10. Contacto
              </h2>
              <p className="text-gray-700 mb-4">
                Si tienes preguntas sobre estos términos, puedes contactarnos
                en:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> legal@pideya.com
                  <br />
                  <strong>Dirección:</strong> [Dirección de la empresa]
                  <br />
                  <strong>Teléfono:</strong> [Número de teléfono]
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

