"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, AlertCircle } from "lucide-react"

interface DeliverySlot {
  id: string
  name: string
  time: string
  description: string
  capacity: number
  currentOrders: number
  isAvailable: boolean
}

export function DeliveryTimeSlots() {
  const deliverySlots: DeliverySlot[] = [
    {
      id: "noon",
      name: "Noon Delivery",
      time: "12:00 - 1:00 PM",
      description: "Perfect for lunch break",
      capacity: 25,
      currentOrders: 18,
      isAvailable: true,
    },
    {
      id: "evening",
      name: "Evening Delivery",
      time: "6:00 - 7:00 PM",
      description: "Dinner time delivery",
      capacity: 30,
      currentOrders: 22,
      isAvailable: true,
    },
    {
      id: "late-evening",
      name: "Late Evening",
      time: "8:00 - 9:00 PM",
      description: "Late dinner or study snacks",
      capacity: 20,
      currentOrders: 8,
      isAvailable: true,
    },
  ]

  const getCapacityStatus = (current: number, capacity: number) => {
    const percentage = (current / capacity) * 100
    if (percentage >= 90) return { status: "full", color: "bg-red-500", text: "Almost Full" }
    if (percentage >= 70) return { status: "busy", color: "bg-yellow-500", text: "Busy" }
    return { status: "available", color: "bg-green-500", text: "Available" }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Available Delivery Slots</h3>
      {deliverySlots.map((slot) => {
        const capacityStatus = getCapacityStatus(slot.currentOrders, slot.capacity)
        return (
          <Card key={slot.id} className={`${!slot.isAvailable ? "opacity-50" : ""}`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-gray-500" />
                  <div>
                    <h4 className="font-semibold">{slot.name}</h4>
                    <p className="text-sm text-gray-600">{slot.time}</p>
                    <p className="text-xs text-gray-500">{slot.description}</p>
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <Badge className={capacityStatus.color}>{capacityStatus.text}</Badge>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="h-4 w-4 mr-1" />
                    {slot.currentOrders}/{slot.capacity}
                  </div>
                </div>
              </div>
              {capacityStatus.status === "full" && (
                <div className="mt-3 flex items-center text-sm text-red-600">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  This slot is almost full. Consider choosing another time.
                </div>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
