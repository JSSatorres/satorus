"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChefHat, Camera, Plus, Loader2 } from "lucide-react"
import { MenuPhotoCapture } from "./MenuPhotoCapture"
import { MenuItemsPreview } from "./MenuItemsPreview"

interface MenuItem {
  name: string
  description?: string
  price: number
  category?: string
}

export const MenuSection = () => {
  const [showPhotoCapture, setShowPhotoCapture] = useState(false)
  const [extractedItems, setExtractedItems] = useState<MenuItem[] | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [savedCount, setSavedCount] = useState(0)

  const handleMenuExtracted = (items: MenuItem[]) => {
    setExtractedItems(items)
    setShowPhotoCapture(false)
  }

  const handleSaveItems = async (items: MenuItem[]) => {
    setIsSaving(true)

    try {
      // Primero necesitamos obtener o crear un menú para el restaurante
      // Por ahora vamos a crear un menú temporal
      // TODO: Integrar con el restaurante del usuario autenticado
      
      const menuResponse = await fetch("/api/menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Menú Principal",
          description: "Menú extraído por IA",
        }),
      })

      if (!menuResponse.ok) {
        throw new Error("Error al crear el menú")
      }

      const { menuId } = await menuResponse.json()

      // Guardar los items
      const itemsResponse = await fetch("/api/menu/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          menuId,
          items,
        }),
      })

      if (!itemsResponse.ok) {
        throw new Error("Error al guardar los items")
      }

      const result = await itemsResponse.json()
      setSavedCount(result.count)
      setExtractedItems(null)
      
      // Mostrar mensaje de éxito
      setTimeout(() => {
        setSavedCount(0)
      }, 3000)
    } catch (error) {
      console.error("Error al guardar:", error)
      alert("Error al guardar los platos. Por favor, intenta de nuevo.")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ChefHat className="w-5 h-5" />
            Crear y Gestionar Menú
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <ChefHat className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Gestión de Menú
            </h3>
            <p className="text-gray-600 mb-6">
              Escanea el menú de tu restaurante con la cámara o súbelo desde tu galería. 
              La IA extraerá todos los platos automáticamente.
            </p>
            
            {savedCount > 0 && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-600 font-semibold">
                  ✅ {savedCount} platos guardados correctamente
                </p>
              </div>
            )}

            <div className="flex gap-3 justify-center">
              <Button 
                onClick={() => setShowPhotoCapture(true)}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
              >
                <Camera className="w-4 h-4 mr-2" />
                Escanear Menú con IA
              </Button>
              
              <Button 
                variant="outline"
                className="border-blue-500 text-blue-500 hover:bg-blue-50"
              >
                <Plus className="w-4 h-4 mr-2" />
                Añadir Plato Manual
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modal de captura de foto */}
      {showPhotoCapture && (
        <MenuPhotoCapture
          onMenuExtracted={handleMenuExtracted}
          onClose={() => setShowPhotoCapture(false)}
        />
      )}

      {/* Modal de preview y confirmación */}
      {extractedItems && (
        <MenuItemsPreview
          items={extractedItems}
          onSave={handleSaveItems}
          onCancel={() => setExtractedItems(null)}
        />
      )}

      {/* Loading overlay */}
      {isSaving && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg flex items-center gap-3">
            <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
            <span className="text-lg font-semibold">Guardando platos...</span>
          </div>
        </div>
      )}
    </>
  )
}
