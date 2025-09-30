"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Users } from "lucide-react"

export const RolesSection = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Manage Roles and Permissions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12">
          <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Roles and Permissions
          </h3>
          <p className="text-gray-600 mb-6">
            Configure user roles and their permissions to manage system access.
          </p>
          <div className="flex gap-4 justify-center">
            <Button className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700">
              <Users className="w-4 h-4 mr-2" />
              Manage Users
            </Button>
            <Button variant="outline">
              <Shield className="w-4 h-4 mr-2" />
              Configure Roles
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
