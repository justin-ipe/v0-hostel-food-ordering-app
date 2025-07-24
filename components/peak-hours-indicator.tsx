"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, TrendingUp, Users } from "lucide-react"
import { useEffect, useState } from "react"

export function PeakHoursIndicator() {
  const [currentHour, setCurrentHour] = useState(new Date().getHours())
  const [orderVolume, setOrderVolume] = useState<"low" | "medium" | "high">("low")

  useEffect(() => {
    const updateTime = () => {
      const hour = new Date().getHours()
      setCurrentHour(hour)

      // Determine order volume based on time
      if ((hour >= 12 && hour <= 14) || (hour >= 18 && hour <= 20)) {
        setOrderVolume("high")
      } else if ((hour >= 11 && hour <= 15) || (hour >= 17 && hour <= 21)) {
        setOrderVolume("medium")
      } else {
        setOrderVolume("low")
      }
    }

    updateTime()
    const interval = setInterval(updateTime, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  const getVolumeInfo = () => {
    switch (orderVolume) {
      case "high":
        return {
          text: "Peak Hours - High Demand",
          description: "Delivery may take 25-35 minutes",
          color: "bg-red-500",
          icon: TrendingUp,
        }
      case "medium":
        return {
          text: "Moderate Demand",
          description: "Delivery in 15-25 minutes",
          color: "bg-yellow-500",
          icon: Users,
        }
      default:
        return {
          text: "Low Demand",
          description: "Quick delivery in 10-20 minutes",
          color: "bg-green-500",
          icon: Clock,
        }
    }
  }

  const volumeInfo = getVolumeInfo()
  const Icon = volumeInfo.icon

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-full ${volumeInfo.color}`}>
              <Icon className="h-5 w-5 text-white" />
            </div>
            <div>
              <Badge className={volumeInfo.color}>{volumeInfo.text}</Badge>
              <p className="text-sm text-gray-600 mt-1">{volumeInfo.description}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Current Time</p>
            <p className="font-semibold">
              {new Date().toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
