"use client"

import { Navigation } from "@/components/navigation"
import { OrderQueueManagement } from "@/components/order-queue-management"
import { DeliveryTimeSlots } from "@/components/delivery-time-slots"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Users, Settings, TrendingUp } from "lucide-react"
import { useState } from "react"

interface TimeSlotStats {
  slot: string
  name: string
  capacity: number
  currentOrders: number
  averagePreparationTime: number
  status: "available" | "busy" | "full"
}

export default function QueueManagementPage() {
  const [timeSlotStats, setTimeSlotStats] = useState<TimeSlotStats[]>([
    {
      slot: "noon",
      name: "Noon Delivery (12:00-1:00 PM)",
      capacity: 25,
      currentOrders: 18,
      averagePreparationTime: 20,
      status: "busy",
    },
    {
      slot: "evening",
      name: "Evening Delivery (6:00-7:00 PM)",
      capacity: 30,
      currentOrders: 22,
      averagePreparationTime: 25,
      status: "busy",
    },
    {
      slot: "late-evening",
      name: "Late Evening (8:00-9:00 PM)",
      capacity: 20,
      currentOrders: 8,
      averagePreparationTime: 15,
      status: "available",
    },
  ])

  const [systemSettings, setSystemSettings] = useState({
    maxOrdersPerSlot: 50,
    peakHourBuffer: 10,
    autoRejectWhenFull: true,
    notifyAtCapacity: 80,
  })

  const updateSlotCapacity = (slot: string, newCapacity: number) => {
    setTimeSlotStats((prev) => prev.map((s) => (s.slot === slot ? { ...s, capacity: newCapacity } : s)))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-500"
      case "busy":
        return "bg-yellow-500"
      case "full":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Queue Management - Peak Hours Optimization</h1>

        <OrderQueueManagement />

        <Tabs defaultValue="slots" className="space-y-6">
          <TabsList>
            <TabsTrigger value="slots">Delivery Slots</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="slots">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Time Slot Management</h2>
                <div className="space-y-4">
                  {timeSlotStats.map((slot) => (
                    <Card key={slot.slot}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{slot.name}</CardTitle>
                          <Badge className={getStatusColor(slot.status)}>
                            {slot.status.charAt(0).toUpperCase() + slot.status.slice(1)}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-600">Current Orders</p>
                            <p className="text-2xl font-bold">
                              {slot.currentOrders}/{slot.capacity}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Avg Prep Time</p>
                            <p className="text-2xl font-bold">{slot.averagePreparationTime}min</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateSlotCapacity(slot.slot, slot.capacity - 5)}
                            disabled={slot.capacity <= 10}
                          >
                            Reduce Capacity
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateSlotCapacity(slot.slot, slot.capacity + 5)}
                          >
                            Increase Capacity
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <DeliveryTimeSlots />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Peak Hours Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Lunch Peak (12-2 PM)</span>
                      <span className="font-semibold">45 orders/hour</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dinner Peak (6-8 PM)</span>
                      <span className="font-semibold">52 orders/hour</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Off-Peak Average</span>
                      <span className="font-semibold">12 orders/hour</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    Preparation Times
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Simple Orders</span>
                      <span className="font-semibold">8-12 min</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Complex Orders</span>
                      <span className="font-semibold">15-25 min</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Peak Hour Delay</span>
                      <span className="font-semibold">+5-10 min</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Student Patterns
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Qwetu Hostel</span>
                      <span className="font-semibold">60% of orders</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Qejani Hostel</span>
                      <span className="font-semibold">40% of orders</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Repeat Customers</span>
                      <span className="font-semibold">75%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  System Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">Capacity Management</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span>Max Orders Per Slot</span>
                        <input
                          type="number"
                          value={systemSettings.maxOrdersPerSlot}
                          onChange={(e) =>
                            setSystemSettings((prev) => ({
                              ...prev,
                              maxOrdersPerSlot: Number.parseInt(e.target.value),
                            }))
                          }
                          className="w-20 p-1 border rounded"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Peak Hour Buffer</span>
                        <input
                          type="number"
                          value={systemSettings.peakHourBuffer}
                          onChange={(e) =>
                            setSystemSettings((prev) => ({
                              ...prev,
                              peakHourBuffer: Number.parseInt(e.target.value),
                            }))
                          }
                          className="w-20 p-1 border rounded"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Automation Settings</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span>Auto-reject when full</span>
                        <input
                          type="checkbox"
                          checked={systemSettings.autoRejectWhenFull}
                          onChange={(e) =>
                            setSystemSettings((prev) => ({
                              ...prev,
                              autoRejectWhenFull: e.target.checked,
                            }))
                          }
                          className="rounded"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Notify at capacity (%)</span>
                        <input
                          type="number"
                          value={systemSettings.notifyAtCapacity}
                          onChange={(e) =>
                            setSystemSettings((prev) => ({
                              ...prev,
                              notifyAtCapacity: Number.parseInt(e.target.value),
                            }))
                          }
                          className="w-20 p-1 border rounded"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button className="bg-green-500 hover:bg-green-600">Save Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
