"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Save } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
  isVeg: boolean
  isAvailable: boolean
}

const initialMenuItems: MenuItem[] = [
  {
    id: "1",
    name: "Beef Stew + Ugali",
    description: "Tender beef stew served with fresh ugali",
    price: 150,
    category: "mains",
    image: "/placeholder.svg?height=200&width=300",
    isVeg: false,
    isAvailable: true,
  },
  {
    id: "2",
    name: "Sukuma Wiki + Ugali",
    description: "Nutritious sukuma wiki with ugali",
    price: 80,
    category: "mains",
    image: "/placeholder.svg?height=200&width=300",
    isVeg: true,
    isAvailable: true,
  },
  {
    id: "3",
    name: "Githeri Special",
    description: "Traditional maize and beans mix",
    price: 70,
    category: "mains",
    image: "/placeholder.svg?height=200&width=300",
    isVeg: true,
    isAvailable: false,
  },
]

export default function MenuManagement() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems)
  const [isAddingItem, setIsAddingItem] = useState(false)
  const [editingItem, setEditingItem] = useState<string | null>(null)
  const [newItem, setNewItem] = useState<MenuItem>({
    id: "",
    name: "",
    description: "",
    price: 0,
    category: "rice",
    image: "/placeholder.svg?height=200&width=300",
    isVeg: true,
    isAvailable: true,
  })

  const categories = [
    { id: "mains", name: "Main Meals" },
    { id: "combos", name: "Student Combos" },
    { id: "snacks", name: "Snacks" },
    { id: "drinks", name: "Drinks" },
  ]

  const handleAddItem = () => {
    const item = { ...newItem, id: Date.now().toString() }
    setMenuItems([...menuItems, item])
    setNewItem({
      id: "",
      name: "",
      description: "",
      price: 0,
      category: "rice",
      image: "/placeholder.svg?height=200&width=300",
      isVeg: true,
      isAvailable: true,
    })
    setIsAddingItem(false)
  }

  const handleUpdateItem = (id: string, updatedItem: MenuItem) => {
    setMenuItems(menuItems.map((item) => (item.id === id ? updatedItem : item)))
    setEditingItem(null)
  }

  const handleDeleteItem = (id: string) => {
    setMenuItems(menuItems.filter((item) => item.id !== id))
  }

  const toggleAvailability = (id: string) => {
    setMenuItems(menuItems.map((item) => (item.id === id ? { ...item, isAvailable: !item.isAvailable } : item)))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Menu Management - Comrade Eats</h1>
          <Button onClick={() => setIsAddingItem(true)} className="bg-orange-500 hover:bg-orange-600">
            <Plus className="h-4 w-4 mr-2" />
            Add New Item
          </Button>
        </div>

        {/* Add New Item Form */}
        {isAddingItem && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Add New Menu Item</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Item Name</Label>
                  <Input
                    id="name"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="price">Price (Ksh)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={newItem.price}
                    onChange={(e) => setNewItem({ ...newItem, price: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    value={newItem.category}
                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isVeg"
                      checked={newItem.isVeg}
                      onCheckedChange={(checked) => setNewItem({ ...newItem, isVeg: checked })}
                    />
                    <Label htmlFor="isVeg">Vegetarian</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isAvailable"
                      checked={newItem.isAvailable}
                      onCheckedChange={(checked) => setNewItem({ ...newItem, isAvailable: checked })}
                    />
                    <Label htmlFor="isAvailable">Available</Label>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newItem.description}
                    onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <Button variant="outline" onClick={() => setIsAddingItem(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddItem} className="bg-orange-500 hover:bg-orange-600">
                  <Save className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <Card key={item.id} className={`overflow-hidden ${!item.isAvailable ? "opacity-60" : ""}`}>
              <div className="relative h-48">
                <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                <div className="absolute top-2 left-2 flex space-x-2">
                  <Badge variant={item.isVeg ? "secondary" : "destructive"}>{item.isVeg ? "VEG" : "NON-VEG"}</Badge>
                  <Badge variant={item.isAvailable ? "default" : "outline"}>
                    {item.isAvailable ? "Available" : "Unavailable"}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4">
                {editingItem === item.id ? (
                  <EditItemForm
                    item={item}
                    categories={categories}
                    onSave={(updatedItem) => handleUpdateItem(item.id, updatedItem)}
                    onCancel={() => setEditingItem(null)}
                  />
                ) : (
                  <>
                    <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-green-600">Ksh {item.price}</span>
                      <span className="text-sm text-gray-500 capitalize">
                        {categories.find((cat) => cat.id === item.category)?.name}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Switch checked={item.isAvailable} onCheckedChange={() => toggleAvailability(item.id)} />
                        <span className="text-sm">Available</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" onClick={() => setEditingItem(item.id)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteItem(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

function EditItemForm({
  item,
  categories,
  onSave,
  onCancel,
}: {
  item: MenuItem
  categories: Array<{ id: string; name: string }>
  onSave: (item: MenuItem) => void
  onCancel: () => void
}) {
  const [editedItem, setEditedItem] = useState(item)

  return (
    <div className="space-y-3">
      <Input
        value={editedItem.name}
        onChange={(e) => setEditedItem({ ...editedItem, name: e.target.value })}
        placeholder="Item name"
      />
      <Input
        type="number"
        value={editedItem.price}
        onChange={(e) => setEditedItem({ ...editedItem, price: Number(e.target.value) })}
        placeholder="Price"
      />
      <select
        value={editedItem.category}
        onChange={(e) => setEditedItem({ ...editedItem, category: e.target.value })}
        className="w-full p-2 border border-gray-300 rounded-md"
      >
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
      <Textarea
        value={editedItem.description}
        onChange={(e) => setEditedItem({ ...editedItem, description: e.target.value })}
        placeholder="Description"
      />
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Switch
            checked={editedItem.isVeg}
            onCheckedChange={(checked) => setEditedItem({ ...editedItem, isVeg: checked })}
          />
          <span className="text-sm">Veg</span>
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        <Button size="sm" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button size="sm" onClick={() => onSave(editedItem)} className="bg-orange-500 hover:bg-orange-600">
          Save
        </Button>
      </div>
    </div>
  )
}
