"use client"

import type React from "react"

import { Navigation } from "@/components/navigation"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Clock, MapPin, Phone, Mail, Home, CreditCard } from "lucide-react"
import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth"

interface Order {
  id: string
  items: Array<{ name: string; quantity: number; price: number }>
  total: number
  status: string
  timestamp: string
  customerInfo: {
    name: string
    phone: string
    address: string
  }
  userId?: string
}

export default function ProfilePage() {
  const { user } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    studentId: "",
    hostel: "",
    roomNumber: "",
    block: "",
  })

  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name,
        email: user.email,
        phone: user.phone,
        studentId: user.studentId,
        hostel: user.hostel,
        roomNumber: user.roomNumber,
        block: user.block,
      })
    }
  }, [user])

  useEffect(() => {
    // Load user's orders from localStorage
    const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]")
    const userOrders = savedOrders.filter((order: Order) => order.userId === user?.id)
    setOrders(userOrders.reverse()) // Show newest first
  }, [user])

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

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would update the backend
    alert("Profile updated successfully!")
  }

  const ProfileContent = () => (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">My Profile - Comrade Account</h1>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="orders">Order History</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile((prev) => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="flex items-center">
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile((prev) => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone" className="flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => setProfile((prev) => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="studentId" className="flex items-center">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Student ID
                    </Label>
                    <Input
                      id="studentId"
                      value={profile.studentId}
                      onChange={(e) => setProfile((prev) => ({ ...prev, studentId: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="hostel" className="flex items-center">
                      <Home className="h-4 w-4 mr-2" />
                      Hostel
                    </Label>
                    <Input
                      id="hostel"
                      value={profile.hostel.charAt(0).toUpperCase() + profile.hostel.slice(1)}
                      readOnly
                      className="bg-gray-50"
                    />
                  </div>
                  <div>
                    <Label htmlFor="roomNumber">Room Number</Label>
                    <Input
                      id="roomNumber"
                      value={profile.roomNumber}
                      onChange={(e) => setProfile((prev) => ({ ...prev, roomNumber: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="block">Block</Label>
                    <Input
                      id="block"
                      value={profile.block}
                      onChange={(e) => setProfile((prev) => ({ ...prev, block: e.target.value }))}
                    />
                  </div>
                </div>
                <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
                  Update Profile
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <div className="space-y-4">
            {orders.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-gray-500">No orders found. Start ordering to see your history!</p>
                </CardContent>
              </Card>
            ) : (
              orders.map((order) => (
                <Card key={order.id}>
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
                        {new Date(order.timestamp).toLocaleDateString()} at{" "}
                        {new Date(order.timestamp).toLocaleTimeString()}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {order.customerInfo.address}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>
                            {item.name} x {item.quantity}
                          </span>
                          <span>Ksh {item.price * item.quantity}</span>
                        </div>
                      ))}
                      <div className="border-t pt-2 flex justify-between font-semibold">
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
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <ProtectedRoute>
        <ProfileContent />
      </ProtectedRoute>
    </div>
  )
}
