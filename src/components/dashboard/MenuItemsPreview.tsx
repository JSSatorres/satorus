"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, Save, Edit2, Trash2, Plus } from "lucide-react"

interface MenuItem {
  name: string
  description?: string
  price: number
  category?: string
}

interface MenuItemsPreviewProps {
  items: MenuItem[]
  onSave: (items: MenuItem[]) => void
  onCancel: () => void
}

export const MenuItemsPreview = ({
  items: initialItems,
  onSave,
  onCancel,
}: MenuItemsPreviewProps) => {
  const [items, setItems] = useState<MenuItem[]>(initialItems)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editForm, setEditForm] = useState<MenuItem | null>(null)

  const handleEdit = (index: number) => {
    setEditingIndex(index)
    setEditForm({ ...items[index] })
  }

  const handleSaveEdit = () => {
    if (editingIndex !== null && editForm) {
      const newItems = [...items]
      newItems[editingIndex] = editForm
      setItems(newItems)
      setEditingIndex(null)
      setEditForm(null)
    }
  }

  const handleCancelEdit = () => {
    setEditingIndex(null)
    setEditForm(null)
  }

  const handleDelete = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const handleAddNew = () => {
    const newItem: MenuItem = {
      name: "",
      description: "",
      price: 0,
      category: "General",
    }
    setItems([...items, newItem])
    setEditingIndex(items.length)
    setEditForm(newItem)
  }

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full bg-white/90 max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Menú Extraído - Confirmar Items</CardTitle>
              <p className="text-sm text-gray-500 mt-1">
                Se encontraron {items.length} platos. Revisa y edita antes de
                guardar.
              </p>
            </div>
            <Button variant="ghost" size="sm" onClick={onCancel}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-3">
            {items.map((item, index) => (
              <Card key={index} className="border-2">
                <CardContent className="p-4">
                  {editingIndex === index && editForm ? (
                    // Modo edición
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor={`name-${index}`}>
                          Nombre del Plato *
                        </Label>
                        <Input
                          id={`name-${index}`}
                          value={editForm.name}
                          onChange={(e) =>
                            setEditForm({ ...editForm, name: e.target.value })
                          }
                          placeholder="Ej: Paella Valenciana"
                        />
                      </div>

                      <div>
                        <Label htmlFor={`description-${index}`}>
                          Descripción
                        </Label>
                        <Input
                          id={`description-${index}`}
                          value={editForm.description || ""}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              description: e.target.value,
                            })
                          }
                          placeholder="Ej: Arroz con mariscos y azafrán"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label htmlFor={`price-${index}`}>Precio (€) *</Label>
                          <Input
                            id={`price-${index}`}
                            type="number"
                            step="0.01"
                            value={editForm.price}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                price: parseFloat(e.target.value) || 0,
                              })
                            }
                            placeholder="15.50"
                          />
                        </div>

                        <div>
                          <Label htmlFor={`category-${index}`}>Categoría</Label>
                          <select
                            id={`category-${index}`}
                            value={editForm.category || "General"}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                category: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="Entrantes">Entrantes</option>
                            <option value="Platos principales">
                              Platos principales
                            </option>
                            <option value="Postres">Postres</option>
                            <option value="Bebidas">Bebidas</option>
                            <option value="General">General</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button
                          onClick={handleSaveEdit}
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Save className="w-4 h-4 mr-2" />
                          Guardar
                        </Button>
                        <Button
                          onClick={handleCancelEdit}
                          size="sm"
                          variant="outline"
                        >
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  ) : (
                    // Modo vista
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-lg">
                              {item.name}
                            </h4>
                            {item.description && (
                              <p className="text-sm text-gray-600 mt-1">
                                {item.description}
                              </p>
                            )}
                          </div>
                          <span className="text-lg font-bold text-blue-600 ml-4">
                            {item.price.toFixed(2)} €
                          </span>
                        </div>
                        <span className="inline-block mt-2 px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                          {item.category || "General"}
                        </span>
                      </div>

                      <div className="flex gap-2 ml-4">
                        <Button
                          onClick={() => handleEdit(index)}
                          size="sm"
                          variant="outline"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          onClick={() => handleDelete(index)}
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Botón añadir nuevo */}
          <Button
            onClick={handleAddNew}
            variant="outline"
            className="w-full mt-4 border-dashed"
          >
            <Plus className="w-4 h-4 mr-2" />
            Añadir Plato Manualmente
          </Button>

          {/* Botones de acción */}
          <div className="flex gap-3 mt-6 pt-6 border-t">
            <Button
              onClick={() => onSave(items)}
              disabled={
                items.length === 0 ||
                items.some((item) => !item.name || item.price <= 0)
              }
              className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
            >
              <Save className="w-4 h-4 mr-2" />
              Guardar {items.length} Platos en el Menú
            </Button>
            <Button onClick={onCancel} variant="outline">
              Cancelar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
