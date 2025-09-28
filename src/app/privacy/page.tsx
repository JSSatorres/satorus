import { Utensils, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function PrivacyPage() {
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
            Política de Privacidad
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-8">
              <strong>Última actualización:</strong>{" "}
              {new Date().toLocaleDateString("es-ES")}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                1. Información General
              </h2>
              <p className="text-gray-700 mb-4">
                En PideYa, respetamos tu privacidad y nos comprometemos a
                proteger tus datos personales. Esta política explica cómo
                recopilamos, utilizamos y protegemos tu información.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                2. Datos que Recopilamos
              </h2>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                2.1 Datos que nos proporcionas
              </h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Información de registro (nombre, email, teléfono)</li>
                <li>
                  Información del restaurante (nombre, dirección, datos de
                  contacto)
                </li>
                <li>Información de pedidos y transacciones</li>
                <li>Comunicaciones que nos envíes</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                2.2 Datos que recopilamos automáticamente
              </h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Dirección IP y datos de navegación</li>
                <li>Información del dispositivo y navegador</li>
                <li>Cookies y tecnologías similares</li>
                <li>Datos de uso de la aplicación</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                3. Cómo Utilizamos tus Datos
              </h2>
              <p className="text-gray-700 mb-4">
                Utilizamos tus datos personales para:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Proporcionar y mejorar nuestros servicios</li>
                <li>Procesar pedidos y transacciones</li>
                <li>Comunicarnos contigo sobre tu cuenta</li>
                <li>Enviar notificaciones importantes</li>
                <li>Analizar el uso del servicio para mejorarlo</li>
                <li>Cumplir con obligaciones legales</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                4. Base Legal para el Tratamiento
              </h2>
              <p className="text-gray-700 mb-4">
                Procesamos tus datos personales basándonos en:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>
                  <strong>Consentimiento:</strong> Cuando nos das tu
                  consentimiento explícito
                </li>
                <li>
                  <strong>Ejecución contractual:</strong> Para cumplir con
                  nuestros servicios
                </li>
                <li>
                  <strong>Interés legítimo:</strong> Para mejorar nuestros
                  servicios
                </li>
                <li>
                  <strong>Obligación legal:</strong> Para cumplir con la
                  legislación aplicable
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                5. Compartir Información
              </h2>
              <p className="text-gray-700 mb-4">
                No vendemos tus datos personales. Podemos compartir información
                con:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Proveedores de servicios que nos ayudan a operar</li>
                <li>Procesadores de pagos para transacciones</li>
                <li>Autoridades cuando sea legalmente requerido</li>
                <li>Con tu consentimiento explícito</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                6. Cookies y Tecnologías Similares
              </h2>
              <p className="text-gray-700 mb-4">
                Utilizamos cookies para mejorar tu experiencia. Puedes gestionar
                tus preferencias de cookies en cualquier momento a través de
                nuestro banner de cookies.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                7. Tus Derechos (GDPR)
              </h2>
              <p className="text-gray-700 mb-4">
                Tienes los siguientes derechos:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>
                  <strong>Acceso:</strong> Solicitar información sobre tus datos
                </li>
                <li>
                  <strong>Rectificación:</strong> Corregir datos inexactos
                </li>
                <li>
                  <strong>Supresión:</strong> Solicitar la eliminación de tus
                  datos
                </li>
                <li>
                  <strong>Limitación:</strong> Restringir el procesamiento
                </li>
                <li>
                  <strong>Portabilidad:</strong> Obtener tus datos en formato
                  estructurado
                </li>
                <li>
                  <strong>Oposición:</strong> Oponerte al procesamiento
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                8. Seguridad de los Datos
              </h2>
              <p className="text-gray-700 mb-4">
                Implementamos medidas de seguridad técnicas y organizativas para
                proteger tus datos:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Cifrado de datos en tránsito y en reposo</li>
                <li>Acceso restringido a datos personales</li>
                <li>Monitoreo regular de seguridad</li>
                <li>Capacitación del personal en protección de datos</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                9. Retención de Datos
              </h2>
              <p className="text-gray-700 mb-4">
                Conservamos tus datos personales solo durante el tiempo
                necesario para los fines descritos en esta política o según lo
                requiera la ley.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                10. Transferencias Internacionales
              </h2>
              <p className="text-gray-700 mb-4">
                Algunos de nuestros proveedores pueden estar ubicados fuera del
                Espacio Económico Europeo. En estos casos, nos aseguramos de que
                existan garantías adecuadas para la protección de tus datos.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                11. Menores de Edad
              </h2>
              <p className="text-gray-700 mb-4">
                Nuestro servicio no está dirigido a menores de 16 años. No
                recopilamos conscientemente datos personales de menores sin el
                consentimiento de sus padres.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                12. Cambios en esta Política
              </h2>
              <p className="text-gray-700 mb-4">
                Podemos actualizar esta política de privacidad ocasionalmente.
                Te notificaremos sobre cambios significativos a través de
                nuestro servicio o por correo electrónico.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                13. Contacto
              </h2>
              <p className="text-gray-700 mb-4">
                Para ejercer tus derechos o si tienes preguntas sobre esta
                política, contacta con nosotros:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> privacy@pideya.com
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

