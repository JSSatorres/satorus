import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const { name, description, restaurantId } = await request.json()

    if (!name) {
      return NextResponse.json(
        { error: "El nombre del menú es requerido" },
        { status: 400 }
      )
    }

    // TODO: Obtener restaurantId del usuario autenticado
    // Por ahora usamos uno temporal o el proporcionado
    const finalRestaurantId = restaurantId || "temp-restaurant-id"

    const menu = await prisma.menu.create({
      data: {
        name,
        description: description || null,
        restaurantId: finalRestaurantId,
        isActive: true,
      },
    })

    return NextResponse.json({
      success: true,
      menuId: menu.id,
      message: "Menú creado correctamente",
    })
  } catch (error) {
    console.error("Error al crear menú:", error)
    
    return NextResponse.json(
      {
        error: "Error al crear el menú",
        details: error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const restaurantId = searchParams.get("restaurantId")

    if (!restaurantId) {
      return NextResponse.json(
        { error: "restaurantId es requerido" },
        { status: 400 }
      )
    }

    const menus = await prisma.menu.findMany({
      where: { restaurantId },
      include: {
        items: {
          orderBy: [
            { category: "asc" },
            { name: "asc" },
          ],
        },
      },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json({ menus })
  } catch (error) {
    console.error("Error al obtener menús:", error)
    
    return NextResponse.json(
      {
        error: "Error al obtener los menús",
        details: error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 }
    )
  }
}

