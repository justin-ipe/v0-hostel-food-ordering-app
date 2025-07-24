import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Clock, MapPin, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { StudentDealsBanner } from "@/components/student-deals-banner"

export default function HomePage() {
  const featuredItems = [
    {
      id: "1",
      name: "Beef Stew + Ugali",
      price: 150,
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.5,
      time: "20-25 min",
    },
    {
      id: "2",
      name: "Chicken + Chapati Combo",
      price: 180,
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.3,
      time: "15-20 min",
    },
    {
      id: "3",
      name: "Githeri Special",
      price: 80,
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.2,
      time: "10-15 min",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Affordable Meals for Comrades!</h1>
            <p className="text-xl mb-8 opacity-90">Delicious, budget-friendly food delivered to your hostel room</p>
            <div className="max-w-md mx-auto relative">
              <Input placeholder="Search for food..." className="pl-10 pr-4 py-3 text-gray-900" />
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Student Deals Banner */}
      <StudentDealsBanner />

      {/* Quick Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardContent className="flex items-center p-6">
              <Clock className="h-8 w-8 text-orange-500 mr-4" />
              <div>
                <p className="text-2xl font-bold">10-25</p>
                <p className="text-gray-600">Minutes Delivery</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center p-6">
              <MapPin className="h-8 w-8 text-orange-500 mr-4" />
              <div>
                <p className="text-2xl font-bold">Qwetu & Qejani</p>
                <p className="text-gray-600">Hostels Covered</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center p-6">
              <Star className="h-8 w-8 text-orange-500 mr-4" />
              <div>
                <p className="text-2xl font-bold">4.5+</p>
                <p className="text-gray-600">Average Rating</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Featured Items */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Featured Items</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredItems.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-bold text-green-600">Ksh {item.price}</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm">{item.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{item.time}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Hungry, Comrade?</h2>
          <p className="text-gray-600 mb-6">
            Browse our student-friendly menu with prices that won't break your budget
          </p>
          <Link href="/menu">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
              View Full Menu
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
