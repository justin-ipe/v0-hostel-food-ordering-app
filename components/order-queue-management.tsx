"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Clock, TrendingUp, AlertTriangle } from "lucide-react"
import { useEffect, useState } from "react"

interface QueueStats {
  totalOrders: number
  pendingOrders: number
  preparingOrders: number
  averageWaitTime: number
  peakHourMultiplier: number
}

export function OrderQueueManagement() {
  const [queueStats, setQueueStats] = useState<QueueStats>({
    totalOrders: 0,
    pendingOrders: 0,
    preparingOrders: 0,
    averageWaitTime: 15,
    peakHourMultiplier: 1,
  })

  useEffect(() => {
    // Simulate real-time queue updates
    const updateQueue = () => {
      const currentHour = new Date().getHours()
      const isPeakHour = (currentHour >= 12 && currentHour <= 14) || (currentHour >= 18 && currentHour <= 20)

      // Load orders from localStorage
      const orders = JSON.parse(localStorage.getItem("orders") || "[]")
      const pendingOrders = orders.filter((order: any) => order.status === "pending").length
      const preparingOrders = orders.filter((order: any) => order.status === "preparing").length

      setQueueStats({
        totalOrders: orders.length,
        pendingOrders,
        preparingOrders,
        averageWaitTime: isPeakHour ? 25 : 15,
        peakHourMultiplier: isPeakHour ? 1.5 : 1,
      })
    }

    updateQueue()
    const interval = setInterval(updateQueue, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const queueCapacity = 50 // Maximum orders we can handle efficiently
  const currentLoad = queueStats.pendingOrders + queueStats.preparingOrders
  const loadPercentage = (currentLoad / queueCapacity) * 100

  const getLoadStatus = () => {
    if (loadPercentage >= 90) return { status: "critical", color: "bg-red-500", text: "Critical Load" }
    if (loadPercentage >= 70) return { status: "high", color: "bg-yellow-500", text: "High Load" }
    if (loadPercentage >= 50) return { status: "moderate", color: "bg-blue-500", text: "Moderate Load" }
    return { status: "low", color: "bg-green-500", text: "Low Load" }
  }

  const loadStatus = getLoadStatus()

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center">
          <TrendingUp className="h-5 w-5 mr-2" />
          Queue Management
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{queueStats.pendingOrders}</div>
            <div className="text-sm text-gray-600">Pending</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{queueStats.preparingOrders}</div>
            <div className="text-sm text-gray-600">Preparing</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{queueStats.averageWaitTime}min</div>
            <div className="text-sm text-gray-600">Avg Wait</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{queueStats.totalOrders}</div>
            <div className="text-sm text-gray-600">Total Today</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Queue Capacity</span>
            <Badge className={loadStatus.color}>{loadStatus.text}</Badge>
          </div>
          <Progress value={loadPercentage} className="h-2" />
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>
              {currentLoad}/{queueCapacity} orders
            </span>
            <span>{Math.round(loadPercentage)}% capacity</span>
          </div>
        </div>

        {loadStatus.status === "critical" && (
          <div className="flex items-center p-3 bg-red-50 rounded-lg text-red-700">
            <AlertTriangle className="h-4 w-4 mr-2" />
            <span className="text-sm">Queue is at critical capacity. Consider temporarily pausing new orders.</span>
          </div>
        )}

        {queueStats.peakHourMultiplier > 1 && (
          <div className="flex items-center p-3 bg-yellow-50 rounded-lg text-yellow-700">
            <Clock className="h-4 w-4 mr-2" />
            <span className="text-sm">
              Peak hours detected. Delivery times may be extended by{" "}
              {Math.round((queueStats.peakHourMultiplier - 1) * 100)}%.
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
