"use client"

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
import { Users, Clock, CheckCircle, XCircle } from "lucide-react"

export interface Table {
  id: string
  number: number
  capacity: number
  status: "available" | "occupied" | "reserved"
  occupationTime?: string
  customer?: string
}

interface TablesSectionProps {
  tables: Table[]
}

export const TablesSection = ({ tables }: TablesSectionProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "text-green-600 bg-green-100"
      case "occupied":
        return "text-red-600 bg-red-100"
      case "reserved":
        return "text-yellow-600 bg-yellow-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "available":
        return <CheckCircle className="w-4 h-4" />
      case "occupied":
        return <XCircle className="w-4 h-4" />
      case "reserved":
        return <Clock className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const availableTables = tables.filter((table) => table.status === "available").length
  const occupiedTables = tables.filter((table) => table.status === "occupied").length
  const reservedTables = tables.filter((table) => table.status === "reserved").length

  return (
    <>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tables</CardTitle>
            <Table className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tables.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Tables</CardTitle>
            <CheckCircle className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{availableTables}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Occupied Tables</CardTitle>
            <XCircle className="w-4 h-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{occupiedTables}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reserved Tables</CardTitle>
            <Clock className="w-4 h-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{reservedTables}</div>
          </CardContent>
        </Card>
      </div>

      {/* Tables Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Tables Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Table</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tables.map((table) => (
                <TableRow key={table.id}>
                  <TableCell className="font-medium">Table {table.number}</TableCell>
                  <TableCell>{table.capacity} people</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        table.status
                      )}`}
                    >
                      {getStatusIcon(table.status)}
                      {table.status.charAt(0).toUpperCase() + table.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>{table.customer || "-"}</TableCell>
                  <TableCell>{table.occupationTime || "-"}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {table.status === "available" && (
                        <Button size="sm" variant="outline">
                          Occupy
                        </Button>
                      )}
                      {table.status === "occupied" && (
                        <Button size="sm" variant="outline">
                          Free
                        </Button>
                      )}
                      {table.status === "reserved" && (
                        <Button size="sm" variant="outline">
                          Confirm
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
    </>
  )
}
