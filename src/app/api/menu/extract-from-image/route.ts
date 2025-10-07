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
        menuItems: [
          {
            name: "Paella Valenciana",
            description: "Arroz con mariscos, pollo y azafrán",
            price: 15.5,
            category: "Platos principales",
          },
          {
            name: "Gazpacho Andaluz",
            description: "Sopa fría de tomate y verduras",
            price: 6.5,
            category: "Entrantes",
          },
          {
            name: "Tarta de Santiago",
            description: "Tarta de almendra tradicional",
            price: 5.5,
            category: "Postres",
          },
        ],
        count: 3,
        demo: true,
      })
    }

    // Usar Gemini Flash 2.0 (el más barato y rápido)
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" })

    // Convertir base64 a formato que acepta Gemini
    const imageData = image.split(",")[1] // Remover el prefijo data:image/jpeg;base64,

    const prompt = `Analiza esta imagen de un menú de restaurante y extrae TODOS los platos con su información.

Devuelve un JSON con el siguiente formato EXACTO (sin markdown, solo JSON puro):

{
  "menuItems": [
    {
      "name": "Nombre del plato",
      "description": "Descripción breve del plato (ingredientes, preparación)",
      "price": 15.50,
      "category": "Entrantes" (o "Platos principales", "Postres", "Bebidas", etc.)
    }
  ]
}

REGLAS IMPORTANTES:
1. Extrae TODOS los platos que veas en la imagen
2. Si no hay descripción, déjala vacía ""
3. El precio DEBE ser un número decimal (ejemplo: 12.50, 8.99)
4. Categoriza los platos según su tipo
5. Si no puedes leer algo claramente, omítelo
6. SOLO devuelve JSON válido, nada más

Analiza la imagen y devuelve el JSON:`

    const result = await model.generateContent([
      {
        inlineData: {
          mimeType: "image/jpeg",
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

    // Validar estructura
    if (!menuData.menuItems || !Array.isArray(menuData.menuItems)) {
      throw new Error("Formato de respuesta inválido")
    }

    // Validar cada item
    const validatedItems = menuData.menuItems
      .filter(
        (item: {
          name?: unknown
          price?: unknown
          description?: string
          category?: string
        }) => {
          return (
            item.name &&
            typeof item.name === "string" &&
            item.price &&
            !isNaN(parseFloat(String(item.price)))
          )
        }
      )
      .map(
        (item: {
          name: string
          price: number | string
          description?: string
          category?: string
        }) => ({
          name: item.name.trim(),
          description: item.description?.trim() || "",
          price: parseFloat(String(item.price)),
          category: item.category?.trim() || "General",
        })
      )

    return NextResponse.json({
      success: true,
      menuItems: validatedItems,
      count: validatedItems.length,
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
