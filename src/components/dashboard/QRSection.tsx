"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QrCode } from "lucide-react"

export const QRSection = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <QrCode className="w-5 h-5" />
          Manage Table QR Codes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12">
          <QrCode className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Table QR Codes
          </h3>
          <p className="text-gray-600 mb-6">
            Generate and manage QR codes so customers can access the menu from
            their tables.
          </p>
          <div className="flex gap-4 justify-center">
            <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
              <QrCode className="w-4 h-4 mr-2" />
              Generate QR
            </Button>
            <Button variant="outline">View Existing QRs</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
