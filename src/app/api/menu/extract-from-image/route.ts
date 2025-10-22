import { NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

// Inicializar Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

export async function POST(request: NextRequest) {
  try {
    const { image } = await request.json()

    if (!image) {
      return NextResponse.json(
        { error: "No se proporcionó ninguna imagen" },
        { status: 400 }
      )
    }

    if (!process.env.GEMINI_API_KEY) {
      // Modo demo: devolver datos de ejemplo
      return NextResponse.json({
        success: true,
        categories: [
          {
            name: "Comida",
            subcategories: [
              {
                name: "Pizzas",
                items: [
                  {
                    name: "Pizza Margherita",
                    description: "Tomate, mozzarella y albahaca",
                    price: 12.5,
                  },
                  {
                    name: "Pizza Pepperoni",
                    description: "Tomate, mozzarella y pepperoni",
                    price: 14.5,
                  },
                ],
              },
              {
                name: "Focaccias",
                items: [
                  {
                    name: "Focaccia Clásica",
                    description: "Con aceite de oliva y romero",
                    price: 8.5,
                  },
                ],
              },
            ],
          },
          {
            name: "Bebidas",
            subcategories: [
              {
                name: "Refrescos",
                items: [
                  {
                    name: "Coca-Cola",
                    description: "Refresco de cola",
                    price: 2.5,
                  },
                ],
              },
            ],
          },
          {
            name: "Postres",
            subcategories: [
              {
                name: "Tartas",
                items: [
                  {
                    name: "Tarta de Santiago",
                    description: "Tarta de almendra tradicional",
                    price: 5.5,
                  },
                ],
              },
            ],
          },
        ],
        count: 5,
        demo: true,
      })
    }

    // Usar Gemini Flash 2.0 (el más barato y rápido)
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" })

    // Convertir base64 a formato que acepta Gemini
    let imageData = image
    if (image.includes(",")) {
      imageData = image.split(",")[1] // Remover el prefijo data:image/jpeg;base64,
    }

    if (!imageData) {
      return NextResponse.json(
        { error: "Datos de imagen inválidos" },
        { status: 400 }
      )
    }

    const prompt = `IMPORTANTE: Debes devolver SOLO un JSON válido con la estructura EXACTA que te indico. NO uses markdown, NO añadas texto explicativo.

Analiza esta imagen de un menú de restaurante y extrae TODOS los platos organizándolos por categorías.

ESTRUCTURA OBLIGATORIA (copia exactamente este formato):

{
  "categories": [
    {
      "name": "Comida",
      "subcategories": [
        {
          "name": "Kebabs y Durums",
          "items": [
            {
              "name": "Nombre del plato",
              "description": "Descripción del plato",
              "price": 12.50
            }
          ]
        }
      ]
    }
  ]
}

REGLAS:
1. SIEMPRE usa "Comida" como categoría principal
2. Crea subcategorías como: "Kebabs y Durums", "Hamburguesas", "Pizzas", "Bebidas", "Postres"
3. Extrae TODOS los platos que veas
4. Precio debe ser número decimal
5. Si no hay descripción, usa ""
6. SOLO devuelve el JSON, nada más

Analiza la imagen y devuelve el JSON:`

    // Detectar tipo MIME de la imagen
    let mimeType = "image/jpeg"
    if (image.startsWith("data:image/png")) {
      mimeType = "image/png"
    } else if (image.startsWith("data:image/webp")) {
      mimeType = "image/webp"
    }

    const result = await model.generateContent([
      {
        inlineData: {
          mimeType: mimeType,
          data: imageData,
        },
      },
      prompt,
    ])

    const response = await result.response
    const text = response.text()

    // Limpiar la respuesta (a veces Gemini añade markdown)
    let jsonText = text.trim()

    // Remover markdown si existe
    if (jsonText.startsWith("```json")) {
      jsonText = jsonText.replace(/```json\n?/g, "").replace(/```\n?/g, "")
    } else if (jsonText.startsWith("```")) {
      jsonText = jsonText.replace(/```\n?/g, "")
    }

    // Parsear JSON
    const menuData = JSON.parse(jsonText)

    // Validar estructura - manejar tanto el formato nuevo como el antiguo
    if (!menuData.categories && !menuData.menuItems) {
      throw new Error("Formato de respuesta inválido")
    }

    // Si viene en formato antiguo, convertir a formato nuevo
    if (menuData.menuItems && !menuData.categories) {
      const convertedData = {
        categories: [
          {
            name: "Comida",
            subcategories: [
              {
                name: "General",
                items: menuData.menuItems,
              },
            ],
          },
        ],
      }
      menuData.categories = convertedData.categories
    }

    // Procesar categorías y subcategorías
    const processedCategories = menuData.categories
      .filter((category: { name?: unknown; subcategories?: unknown }) => {
        return category.name && typeof category.name === "string"
      })
      .map(
        (category: {
          name: string
          subcategories?: Array<{
            name: string
            items: Array<{
              name: string
              description?: string
              price: number | string
            }>
          }>
        }) => {
          const processedSubcategories =
            category.subcategories
              ?.filter((subcategory: { name?: unknown; items?: unknown }) => {
                return (
                  subcategory.name &&
                  typeof subcategory.name === "string" &&
                  subcategory.items &&
                  Array.isArray(subcategory.items)
                )
              })
              .map(
                (subcategory: {
                  name: string
                  items: Array<{
                    name: string
                    description?: string
                    price: number | string
                  }>
                }) => {
                  const processedItems = subcategory.items
                    .filter((item: { name?: unknown; price?: unknown }) => {
                      return (
                        item.name &&
                        typeof item.name === "string" &&
                        item.price &&
                        !isNaN(parseFloat(String(item.price)))
                      )
                    })
                    .map(
                      (item: {
                        name: string
                        description?: string
                        price: number | string
                      }) => ({
                        name: item.name.trim(),
                        description: item.description?.trim() || "",
                        price: parseFloat(String(item.price)),
                      })
                    )

                  return {
                    name: subcategory.name.trim(),
                    items: processedItems,
                  }
                }
              ) || []

          return {
            name: category.name.trim(),
            subcategories: processedSubcategories,
          }
        }
      )

    // Contar total de items
    const totalItems = processedCategories.reduce(
      (
        total: number,
        category: { subcategories: Array<{ items: Array<unknown> }> }
      ) => {
        return (
          total +
          category.subcategories.reduce(
            (subTotal: number, subcategory: { items: Array<unknown> }) => {
              return subTotal + subcategory.items.length
            },
            0
          )
        )
      },
      0
    )

    return NextResponse.json({
      success: true,
      categories: processedCategories,
      count: totalItems,
    })
  } catch (error) {
    console.error("Error al procesar imagen:", error)

    return NextResponse.json(
      {
        error: "Error al procesar la imagen con IA",
        details: error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 }
    )
  }
}
