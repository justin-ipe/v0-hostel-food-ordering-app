"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, User, MapPin, Phone, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { useState, useEffect } from "react"

interface Order {
  id: string
  items: Array<{ name: string; quantity: number; price: number }>
  total: number
  status: string
  timestamp: string
  customerInfo: {
    name: string
    phone: string
    email: string
    address: string
    deliveryTime: string
    paymentMethod: string
    specialInstructions: string
  }
}

export default function VendorDashboard() {
  const [orders, setOrders] = useState<Order[]>([])
  const [stats, setStats] = useState({
    pending: 0,
    confirmed: 0,
    preparing: 0,
    delivered: 0,
  })

  useEffect(() => {
    // Load orders from localStorage and simulate real-time updates
    const loadOrders = () => {
      const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]")
      setOrders(savedOrders.reverse())

      // Calculate stats
      const newStats = savedOrders.reduce(
        (acc: any, order: Order) => {
          acc[order.status] = (acc[order.status] || 0) + 1
          return acc
        },
        { pending: 0, confirmed: 0, preparing: 0, delivered: 0 },
      )

      setStats(newStats)
    }

    loadOrders()

    // Simulate real-time updates every 30 seconds
    const interval = setInterval(loadOrders, 30000)
    return () => clearInterval(interval)
  }, [])

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    const updatedOrders = orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order))
    setOrders(updatedOrders)
    localStorage.setItem("orders", JSON.stringify(updatedOrders.reverse()))

    // Update stats
    const newStats = updatedOrders.reduce(
      (acc: any, order: Order) => {
        acc[order.status] = (acc[order.status] || 0) + 1
        return acc
      },
      { pending: 0, confirmed: 0, preparing: 0, delivered: 0 },
    )
    setStats(newStats)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500"
      case "confirmed":
        return "bg-blue-500"
      case "preparing":
        return "bg-orange-500"
      case "delivered":
        return "bg-green-500"
      case "cancelled":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusActions = (order: Order) => {
    switch (order.status) {
      case "pending":
        return (
          <div className="flex space-x-2">
            <Button
              size="sm"
              onClick={() => updateOrderStatus(order.id, "confirmed")}
              className="bg-green-500 hover:bg-green-600"
            >
              <CheckCircle className="h-4 w-4 mr-1" />
              Accept
            </Button>
            <Button size="sm" variant="destructive" onClick={() => updateOrderStatus(order.id, "cancelled")}>
              <XCircle className="h-4 w-4 mr-1" />
              Reject
            </Button>
          </div>
        )
      case "confirmed":
        return (
          <Button
            size="sm"
            onClick={() => updateOrderStatus(order.id, "preparing")}
            className="bg-orange-500 hover:bg-orange-600"
          >
            <AlertCircle className="h-4 w-4 mr-1" />
            Start Preparing
          </Button>
        )
      case "preparing":
        return (
          <Button
            size="sm"
            onClick={() => updateOrderStatus(order.id, "delivered")}
            className="bg-blue-500 hover:bg-blue-600"
          >
            Mark as Delivered
          </Button>
        )
      default:
        return null
    }
  }

  const pendingOrders = orders.filter((order) => order.status === "pending")
  const activeOrders = orders.filter((order) => ["confirmed", "preparing"].includes(order.status))
  const completedOrders = orders.filter((order) => ["delivered", "cancelled"].includes(order.status))

  const deliveryTimeSlots = {
    "8-10": "8:00 AM - 10:00 AM",
    "10-12": "10:00 AM - 12:00 PM",
    "12-2": "12:00 PM - 2:00 PM",
    "2-4": "2:00 PM - 4:00 PM",
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Vendor Dashboard - Comrade Eats</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Confirmed</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.confirmed}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <AlertCircle className="h-6 w-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Preparing</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.preparing}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Delivered</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.delivered}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Orders Tabs */}
        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList>
            <TabsTrigger value="pending">Pending Orders ({pendingOrders.length})</TabsTrigger>
            <TabsTrigger value="active">Active Orders ({activeOrders.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed Orders ({completedOrders.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            <div className="space-y-4">
              {pendingOrders.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-8">
                    <p className="text-gray-500">No pending orders</p>
                  </CardContent>
                </Card>
              ) : (
                pendingOrders.map((order) => (
                  <Card key={order.id} className="border-l-4 border-l-yellow-500">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 space-x-4">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {new Date(order.timestamp).toLocaleTimeString()}
                        </div>
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {order.customerInfo.name}
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-1" />
                          {order.customerInfo.phone}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-2">Order Items</h4>
                          <div className="space-y-1">
                            {order.items.map((item, index) => (
                              <div key={index} className="flex justify-between text-sm">
                                <span>
                                  {item.name} x {item.quantity}
                                </span>
                                <span>Ksh {item.price * item.quantity}</span>
                              </div>
                            ))}
                            <div className="border-t pt-1 flex justify-between font-semibold">
                              <span>Total</span>
                              <span>Ksh {order.total}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Delivery Details</h4>
                          <div className="space-y-1 text-sm">
                            <div className="flex items-start">
                              <MapPin className="h-4 w-4 mr-1 mt-0.5" />
                              <span>{order.customerInfo.address}</span>
                            </div>
                            <p>
                              <strong>Hostel Delivery:</strong>{" "}
                              {deliveryTimeSlots[order.customerInfo.deliveryTime as keyof typeof deliveryTimeSlots] ||
                                order.customerInfo.deliveryTime}
                            </p>
                            <p>
                              <strong>Payment:</strong> {order.customerInfo.paymentMethod.toUpperCase()}
                            </p>
                            {order.customerInfo.specialInstructions && (
                              <p>
                                <strong>Instructions:</strong> {order.customerInfo.specialInstructions}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end">{getStatusActions(order)}</div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="active">
            <div className="space-y-4">
              {activeOrders.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-8">
                    <p className="text-gray-500">No active orders</p>
                  </CardContent>
                </Card>
              ) : (
                activeOrders.map((order) => (
                  <Card
                    key={order.id}
                    className={`border-l-4 ${order.status === "confirmed" ? "border-l-blue-500" : "border-l-orange-500"}`}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 space-x-4">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {new Date(order.timestamp).toLocaleTimeString()}
                        </div>
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {order.customerInfo.name}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-2">Order Items</h4>
                          <div className="space-y-1">
                            {order.items.map((item, index) => (
                              <div key={index} className="flex justify-between text-sm">
                                <span>
                                  {item.name} x {item.quantity}
                                </span>
                                <span>Ksh {item.price * item.quantity}</span>
                              </div>
                            ))}
                            <div className="border-t pt-1 flex justify-between font-semibold">
                              <span>Total</span>
                              <span>Ksh {order.total}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Customer Info</h4>
                          <div className="space-y-1 text-sm">
                            <p>
                              <strong>Phone:</strong> {order.customerInfo.phone}
                            </p>
                            <div className="flex items-start">
                              <MapPin className="h-4 w-4 mr-1 mt-0.5" />
                              <span>{order.customerInfo.address}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end">{getStatusActions(order)}</div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="completed">
            <div className="space-y-4">
              {completedOrders.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-8">
                    <p className="text-gray-500">No completed orders</p>
                  </CardContent>
                </Card>
              ) : (
                completedOrders.map((order) => (
                  <Card
                    key={order.id}
                    className={`border-l-4 ${order.status === "delivered" ? "border-l-green-500" : "border-l-red-500"}`}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 space-x-4">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {new Date(order.timestamp).toLocaleString()}
                        </div>
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {order.customerInfo.name}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span>
                              {item.name} x {item.quantity}
                            </span>
                            <span>Ksh {item.price * item.quantity}</span>
                          </div>
                        ))}
                        <div className="border-t pt-1 flex justify-between font-semibold">
                          <span>Total</span>
                          <span>Ksh {order.total}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
