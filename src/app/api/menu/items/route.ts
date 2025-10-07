import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const { menuId, items } = await request.json()

    if (!menuId || !items || !Array.isArray(items)) {
      return NextResponse.json({ error: "Datos inválidos" }, { status: 400 })
    }

    // Crear todos los items en la base de datos
    const createdItems = await prisma.menuItem.createMany({
      data: items.map((item: {
        name: string;
        description?: string;
        price: number;
        category?: string;
      }) => ({
        menuId,
        name: item.name,
        description: item.description || null,
        price: item.price,
        category: item.category || "General",
        isAvailable: true,
      })),
    })

    return NextResponse.json({
      success: true,
      count: createdItems.count,
      message: `${createdItems.count} platos añadidos correctamente`,
    })
  } catch (error) {
    console.error("Error al guardar items del menú:", error)
    
    return NextResponse.json(
      {
        error: "Error al guardar los items",
        details: error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const menuId = searchParams.get("menuId")

    if (!menuId) {
      return NextResponse.json(
        { error: "menuId es requerido" },
        { status: 400 }
      )
    }

    const items = await prisma.menuItem.findMany({
      where: { menuId },
      orderBy: [{ category: "asc" }, { name: "asc" }],
    })

    return NextResponse.json({ items })
  } catch (error) {
    console.error("Error al obtener items del menú:", error)
    
    return NextResponse.json(
      {
        error: "Error al obtener los items",
        details: error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 }
    )
  }
}
