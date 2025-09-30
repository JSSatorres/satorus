"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChefHat, Plus } from "lucide-react"

export const MenuSection = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ChefHat className="w-5 h-5" />
          Create and Manage Menu
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12">
          <ChefHat className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Menu Management
          </h3>
          <p className="text-gray-600 mb-6">
            Here you can create, edit and organize the dishes and drinks of your
            restaurant.
          </p>
          <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add New Dish
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
