"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ChefHat, QrCode, Shield, BarChart3 } from "lucide-react"

interface NavigationButton {
  id: string
  title: string
  description: string
  icon: typeof ChefHat
  color: string
  hoverColor: string
}

interface DashboardNavigationProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

export const DashboardNavigation = ({
  activeSection,
  onSectionChange,
}: DashboardNavigationProps) => {
  const navigationButtons: NavigationButton[] = [
    {
      id: "create-menu",
      title: "Create Menu",
      description: "Manage dishes and drinks of your restaurant",
      icon: ChefHat,
      color: "from-blue-500 to-blue-600",
      hoverColor: "hover:from-blue-600 hover:to-blue-700",
    },
    {
      id: "manage-qr",
      title: "Manage QR Tables",
      description: "Manage QR codes for tables",
      icon: QrCode,
      color: "from-green-500 to-green-600",
      hoverColor: "hover:from-green-600 hover:to-green-700",
    },
    {
      id: "manage-roles",
      title: "Manage Roles",
      description: "Configure user permissions and roles",
      icon: Shield,
      color: "from-purple-500 to-purple-600",
      hoverColor: "hover:from-purple-600 hover:to-purple-700",
    },
    {
      id: "tables-status",
      title: "Tables Status",
      description: "Monitor current status of all tables",
      icon: BarChart3,
      color: "from-orange-500 to-red-500",
      hoverColor: "hover:from-orange-600 hover:to-red-600",
    },
  ]

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Control Panel</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {navigationButtons.map((button) => {
          const IconComponent = button.icon
          const isActive = activeSection === button.id
          return (
            <Card
              key={button.id}
              className={`cursor-pointer transition-all duration-200 transform hover:scale-105 hover:shadow-lg ${
                isActive ? "ring-2 ring-orange-500 shadow-lg" : ""
              }`}
              onClick={() => onSectionChange(button.id)}
            >
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div
                    className={`w-16 h-16 rounded-full bg-gradient-to-r ${button.color} ${button.hoverColor} flex items-center justify-center transition-all duration-200`}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {button.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {button.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
