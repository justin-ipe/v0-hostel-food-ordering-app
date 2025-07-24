"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/components/cart-context"
import { useToast } from "@/hooks/use-toast"
import { Search, Plus, Star } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

const menuCategories = [
  { id: "all", name: "All Items" },
  { id: "mains", name: "Main Meals" },
  { id: "combos", name: "Student Combos" },
  { id: "snacks", name: "Snacks & Quick Bites" },
  { id: "drinks", name: "Drinks" },
]

const menuItems = [
  {
    id: "1",
    name: "Beef Stew + Ugali",
    description: "Tender beef stew served with fresh ugali - a comrade favorite!",
    price: 150,
    category: "mains",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.5,
    isVeg: false,
  },
  {
    id: "2",
    name: "Sukuma Wiki + Ugali",
    description: "Nutritious sukuma wiki (collard greens) with ugali - budget-friendly and filling",
    price: 80,
    category: "mains",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.2,
    isVeg: true,
  },
  {
    id: "3",
    name: "Githeri Special",
    description: "Traditional maize and beans mix - the ultimate student meal",
    price: 70,
    category: "mains",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.3,
    isVeg: true,
  },
  {
    id: "4",
    name: "Chicken + Chapati Combo",
    description: "Grilled chicken with 2 soft chapatis - perfect for sharing or not!",
    price: 180,
    category: "combos",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.4,
    isVeg: false,
  },
  {
    id: "5",
    name: "Mandazi (4 pieces)",
    description: "Sweet, fluffy mandazi - perfect with tea or as a snack",
    price: 40,
    category: "snacks",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.1,
    isVeg: true,
  },
  {
    id: "6",
    name: "Chai ya Rangi",
    description: "Kenyan milk tea - the perfect study companion",
    price: 25,
    category: "drinks",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.6,
    isVeg: true,
  },
  {
    id: "7",
    name: "Rice + Beans Combo",
    description: "Simple, filling, and affordable - a student staple",
    price: 90,
    category: "combos",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.0,
    isVeg: true,
  },
  {
    id: "8",
    name: "Samosa (2 pieces)",
    description: "Crispy samosas filled with spiced meat or vegetables",
    price: 50,
    category: "snacks",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.2,
    isVeg: false,
  },
  {
    id: "9",
    name: "Pilau + Kachumbari",
    description: "Spiced rice with fresh tomato-onion salad - weekend special!",
    price: 120,
    category: "mains",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.7,
    isVeg: false,
  },
  {
    id: "10",
    name: "Soda (500ml)",
    description: "Cold soda to wash down your meal - Coke, Fanta, or Sprite",
    price: 60,
    category: "drinks",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.0,
    isVeg: true,
  },
]

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const { dispatch } = useCart()
  const { toast } = useToast()

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const addToCart = (item: (typeof menuItems)[0]) => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
      },
    })
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Comrade Menu - Budget Eats</h1>

          {/* Search Bar */}
          <div className="relative max-w-md mb-6">
            <Input
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            {menuCategories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="mb-2"
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                <div className="absolute top-2 left-2">
                  <Badge variant={item.isVeg ? "secondary" : "destructive"}>{item.isVeg ? "VEG" : "NON-VEG"}</Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm">{item.rating}</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-green-600">Ksh {item.price}</span>
                  <Button onClick={() => addToCart(item)} size="sm" className="bg-orange-500 hover:bg-orange-600">
                    <Plus className="h-4 w-4 mr-1" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No items found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  )
}
