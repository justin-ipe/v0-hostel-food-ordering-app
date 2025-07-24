"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Zap } from "lucide-react"

export function StudentDealsBanner() {
  const deals = [
    {
      title: "Comrade Combo",
      description: "Any main meal + drink for just Ksh 120",
      icon: Users,
      badge: "Most Popular",
      color: "bg-green-500",
    },
    {
      title: "Study Fuel",
      description: "Githeri + Chai + Mandazi = Ksh 100",
      icon: Zap,
      badge: "Energy Boost",
      color: "bg-blue-500",
    },
    {
      title: "Late Night Special",
      description: "20% off orders after 9 PM",
      icon: Clock,
      badge: "Night Owls",
      color: "bg-purple-500",
    },
  ]

  return (
    <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white py-8 mb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-center mb-6">Student Deals - Save Your Pocket Money!</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {deals.map((deal, index) => {
            const Icon = deal.icon
            return (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-4 text-center">
                  <div className="flex justify-center mb-2">
                    <div className={`p-2 rounded-full ${deal.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                  <Badge className="mb-2 bg-white/20">{deal.badge}</Badge>
                  <h3 className="font-semibold mb-1">{deal.title}</h3>
                  <p className="text-sm opacity-90">{deal.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
