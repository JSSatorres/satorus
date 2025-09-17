"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Plus,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  Menu,
  LogOut,
} from "lucide-react"
import { logout } from "@/lib/auth"

interface Mesa {
  id: string
  numero: number
  capacidad: number
  estado: "libre" | "ocupada" | "reservada"
  tiempoOcupacion?: string
  cliente?: string
}

export const Dashboard = () => {
  const [mesas] = useState<Mesa[]>([
    { id: "1", numero: 1, capacidad: 4, estado: "libre" },
    {
      id: "2",
      numero: 2,
      capacidad: 2,
      estado: "ocupada",
      tiempoOcupacion: "15 min",
      cliente: "Juan Pérez",
    },
    {
      id: "3",
      numero: 3,
      capacidad: 6,
      estado: "reservada",
      cliente: "María García",
    },
    { id: "4", numero: 4, capacidad: 4, estado: "libre" },
    {
      id: "5",
      numero: 5,
      capacidad: 2,
      estado: "ocupada",
      tiempoOcupacion: "45 min",
      cliente: "Carlos López",
    },
    { id: "6", numero: 6, capacidad: 8, estado: "libre" },
  ])

  const handleLogout = async () => {
    try {
      await logout()
      console.log("Logout exitoso")
    } catch (error) {
      console.error("Error al cerrar sesión:", error)
    }
  }

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "libre":
        return "text-green-600 bg-green-100"
      case "ocupada":
        return "text-red-600 bg-red-100"
      case "reservada":
        return "text-yellow-600 bg-yellow-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case "libre":
        return <CheckCircle className="w-4 h-4" />
      case "ocupada":
        return <XCircle className="w-4 h-4" />
      case "reservada":
        return <Clock className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const mesasLibres = mesas.filter((mesa) => mesa.estado === "libre").length
  const mesasOcupadas = mesas.filter((mesa) => mesa.estado === "ocupada").length
  const mesasReservadas = mesas.filter(
    (mesa) => mesa.estado === "reservada"
  ).length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <Menu className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  PideYa
                </h1>
                <p className="text-xs text-gray-500 -mt-1">Dashboard</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => console.log("Añadir menú")}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Añadir Menú
              </Button>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-gray-300 hover:bg-gray-50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Mesas</CardTitle>
              <Table className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mesas.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Mesas Libres
              </CardTitle>
              <CheckCircle className="w-4 h-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {mesasLibres}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Mesas Ocupadas
              </CardTitle>
              <XCircle className="w-4 h-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {mesasOcupadas}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Reservadas</CardTitle>
              <Clock className="w-4 h-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {mesasReservadas}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mesas Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Gestión de Mesas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mesa</TableHead>
                  <TableHead>Capacidad</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Tiempo</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mesas.map((mesa) => (
                  <TableRow key={mesa.id}>
                    <TableCell className="font-medium">
                      Mesa {mesa.numero}
                    </TableCell>
                    <TableCell>{mesa.capacidad} personas</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getEstadoColor(
                          mesa.estado
                        )}`}
                      >
                        {getEstadoIcon(mesa.estado)}
                        {mesa.estado.charAt(0).toUpperCase() +
                          mesa.estado.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>{mesa.cliente || "-"}</TableCell>
                    <TableCell>{mesa.tiempoOcupacion || "-"}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {mesa.estado === "libre" && (
                          <Button size="sm" variant="outline">
                            Ocupar
                          </Button>
                        )}
                        {mesa.estado === "ocupada" && (
                          <Button size="sm" variant="outline">
                            Liberar
                          </Button>
                        )}
                        {mesa.estado === "reservada" && (
                          <Button size="sm" variant="outline">
                            Confirmar
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
