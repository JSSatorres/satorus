"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Camera, Upload, X, Loader2, CheckCircle2 } from "lucide-react"

interface MenuItem {
  name: string
  description?: string
  price: number
  category?: string
}

interface MenuPhotoaptureProps {
  onMenuExtracted: (items: MenuItem[]) => void
  onClose: () => void
}

export const MenuPhotoCapture = ({
  onMenuExtracted,
  onClose,
}: MenuPhotoaptureProps) => {
  const [image, setImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [showCamera, setShowCamera] = useState(false)

  // Abrir cámara  VayaPasss-2025
  const openCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }, // Cámara trasera en móvil
        audio: false,
      })
      setStream(mediaStream)
      setShowCamera(true)

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
    } catch (err) {
      setError(
        "No se pudo acceder a la cámara. Por favor, da permisos o sube una foto."
      )
      console.error("Error al acceder a la cámara:", err)
    }
  }

  // Capturar foto de la cámara
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
        const imageData = canvas.toDataURL("image/jpeg", 0.8)
        setImage(imageData)
        stopCamera()
      }
    }
  }

  // Detener cámara
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
      setShowCamera(false)
    }
  }

  // Manejar subida de archivo
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Procesar imagen con IA
  const processImage = async () => {
    if (!image) return

    setIsProcessing(true)
    setError(null)

    try {
      const response = await fetch("/api/menu/extract-from-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image }),
      })

      if (!response.ok) {
        throw new Error("Error al procesar la imagen")
      }

      const data = await response.json()
      console.log("Respuesta de la API:", data)

      // Convertir la nueva estructura de categorías a la estructura plana esperada
      const convertCategoriesToMenuItems = (categories: any[]): MenuItem[] => {
        const items: MenuItem[] = []

        console.log("Convirtiendo categorías:", categories)

        categories.forEach((category) => {
          console.log("Procesando categoría:", category.name)
          if (category.subcategories && Array.isArray(category.subcategories)) {
            category.subcategories.forEach((subcategory: any) => {
              console.log("Procesando subcategoría:", subcategory.name)
              if (subcategory.items && Array.isArray(subcategory.items)) {
                subcategory.items.forEach((item: any) => {
                  console.log("Procesando item:", item.name)
                  items.push({
                    name: item.name,
                    description: item.description || "",
                    price: item.price,
                    category: subcategory.name,
                  })
                })
              }
            })
          }
        })

        console.log("Total items convertidos:", items.length)
        return items
      }

      // Manejar tanto la estructura antigua como la nueva
      let menuItems: MenuItem[] = []

      if (data.menuItems && data.menuItems.length > 0) {
        // Estructura antigua
        console.log("Usando estructura antigua")
        menuItems = data.menuItems
      } else if (data.categories && data.categories.length > 0) {
        // Nueva estructura con categorías
        console.log("Usando nueva estructura con categorías")
        menuItems = convertCategoriesToMenuItems(data.categories)
        console.log("Items convertidos:", menuItems)
      }

      if (menuItems.length > 0) {
        setSuccess(true)
        setTimeout(() => {
          onMenuExtracted(menuItems)
        }, 1000)
      } else {
        setError(
          "No se pudieron extraer platos del menú. Intenta con otra foto más clara."
        )
      }
    } catch (err) {
      setError("Error al procesar la imagen. Por favor, intenta de nuevo.")
      console.error("Error:", err)
    } finally {
      setIsProcessing(false)
    }
  }

  // Limpiar y cerrar
  const handleClose = () => {
    stopCamera()
    onClose()
  }

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full bg-white/90 max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Escanear Menú con Cámara</h3>
            <Button variant="ghost" size="sm" onClick={handleClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Video de cámara */}
          {showCamera && (
            <div className="mb-4">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full rounded-lg"
              />
              <canvas ref={canvasRef} className="hidden" />
              <div className="flex gap-2 mt-4">
                <Button onClick={capturePhoto} className="flex-1">
                  <Camera className="w-4 h-4 mr-2" />
                  Capturar Foto
                </Button>
                <Button onClick={stopCamera} variant="outline">
                  Cancelar
                </Button>
              </div>
            </div>
          )}

          {/* Preview de imagen */}
          {image && !showCamera && (
            <div className="mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image}
                alt="Menú capturado"
                className="w-full rounded-lg border-2 border-gray-200"
              />
              <Button
                onClick={() => setImage(null)}
                variant="outline"
                size="sm"
                className="mt-2"
              >
                <X className="w-4 h-4 mr-2" />
                Eliminar foto
              </Button>
            </div>
          )}

          {/* Botones de acción */}
          {!image && !showCamera && (
            <div className="space-y-3">
              <Button
                onClick={openCamera}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
              >
                <Camera className="w-4 h-4 mr-2" />
                Abrir Cámara
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">o</span>
                </div>
              </div>

              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                className="w-full"
              >
                <Upload className="w-4 h-4 mr-2" />
                Subir desde Galería
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          )}

          {/* Botón de procesar */}
          {image && !showCamera && (
            <Button
              onClick={processImage}
              disabled={isProcessing || success}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Procesando menú...
                </>
              ) : success ? (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  ¡Menú extraído correctamente!
                </>
              ) : (
                "Extraer Menú"
              )}
            </Button>
          )}

          {/* Mensajes de error */}
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Instrucciones */}
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-600">
              <strong>Tip:</strong> Para mejores resultados, asegúrate de que el
              menú esté bien iluminado y todas las letras sean legibles.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
