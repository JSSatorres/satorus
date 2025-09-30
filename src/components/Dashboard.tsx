"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { DashboardNavigation } from "@/components/dashboard/DashboardNavigation"
import { TablesSection, type Table } from "@/components/dashboard/TablesSection"
import { MenuSection } from "@/components/dashboard/MenuSection"
import { QRSection } from "@/components/dashboard/QRSection"
import { RolesSection } from "@/components/dashboard/RolesSection"

export const Dashboard = () => {
  const [activeSection, setActiveSection] = useState<string>("tables-status")
  const [tables] = useState<Table[]>([
    { id: "1", number: 1, capacity: 4, status: "available" },
    {
      id: "2",
      number: 2,
      capacity: 2,
      status: "occupied",
      occupationTime: "15 min",
      customer: "Juan Pérez",
    },
    {
      id: "3",
      number: 3,
      capacity: 6,
      status: "reserved",
      customer: "María García",
    },
    { id: "4", number: 4, capacity: 4, status: "available" },
    {
      id: "5",
      number: 5,
      capacity: 2,
      status: "occupied",
      occupationTime: "45 min",
      customer: "Carlos López",
    },
    { id: "6", number: 6, capacity: 8, status: "available" },
  ])

  const handleSectionChange = (section: string) => {
    setActiveSection(section)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardNavigation
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
        />

        {/* Conditional Content Based on Active Section */}
        {activeSection === "tables-status" && <TablesSection tables={tables} />}

        {activeSection === "create-menu" && <MenuSection />}

        {activeSection === "manage-qr" && <QRSection />}

        {activeSection === "manage-roles" && <RolesSection />}
      </div>
    </div>
  )
}
