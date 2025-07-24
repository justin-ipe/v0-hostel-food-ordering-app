"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, MenuIcon, ShoppingCart, User, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/components/cart-context"
import { useAuth } from "@/lib/auth"
import { useState } from "react"
import { AuthModal } from "./auth/auth-modal"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Navigation() {
  const pathname = usePathname()
  const { state } = useCart()
  const { user, logout } = useAuth()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/menu", label: "Menu", icon: MenuIcon },
    { href: "/cart", label: "Cart", icon: ShoppingCart },
    { href: "/profile", label: "Profile", icon: User },
  ]

  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  // Vendor navigation for desktop and mobile
  if (pathname?.startsWith("/vendor")) {
    return (
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/vendor" className="text-lg sm:text-xl font-bold text-green-600">
                <span className="hidden sm:inline">Vendor Dashboard - </span>Comrade Eats
              </Link>
            </div>

            {/* Desktop vendor navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/vendor">
                <Button variant="ghost">Orders</Button>
              </Link>
              <Link href="/vendor/queue-management">
                <Button variant="ghost">Queue</Button>
              </Link>
              <Link href="/vendor/menu-management">
                <Button variant="ghost">
                  <Settings className="w-4 h-4 mr-2" />
                  Menu
                </Button>
              </Link>
            </div>

            {/* Mobile vendor navigation */}
            <div className="md:hidden">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MenuIcon className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-64">
                  <div className="flex flex-col space-y-4 mt-8">
                    <Link href="/vendor" onClick={closeMobileMenu}>
                      <Button variant="ghost" className="w-full justify-start">
                        Orders
                      </Button>
                    </Link>
                    <Link href="/vendor/queue-management" onClick={closeMobileMenu}>
                      <Button variant="ghost" className="w-full justify-start">
                        Queue Management
                      </Button>
                    </Link>
                    <Link href="/vendor/menu-management" onClick={closeMobileMenu}>
                      <Button variant="ghost" className="w-full justify-start">
                        <Settings className="w-4 h-4 mr-2" />
                        Menu Management
                      </Button>
                    </Link>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
    )
  }

  // Main app navigation
  return (
    <>
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="text-lg sm:text-xl font-bold text-green-600">
                Comrade Eats
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link key={item.href} href={item.href}>
                    <Button variant={isActive ? "default" : "ghost"} size="sm" className="relative">
                      <Icon className="w-4 h-4 mr-2" />
                      {item.label}
                      {item.href === "/cart" && state.items.length > 0 && (
                        <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                          {state.items.reduce((sum, item) => sum + item.quantity, 0)}
                        </Badge>
                      )}
                    </Button>
                  </Link>
                )
              })}

              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-green-500 text-white">
                          {user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium">{user.name}</p>
                        <p className="w-[200px] truncate text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button onClick={() => setShowAuthModal(true)} className="bg-green-500 hover:bg-green-600" size="sm">
                  Sign In
                </Button>
              )}
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden flex items-center space-x-2">
              {/* Cart button for mobile */}
              <Link href="/cart">
                <Button variant="ghost" size="sm" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {state.items.length > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-xs">
                      {state.items.reduce((sum, item) => sum + item.quantity, 0)}
                    </Badge>
                  )}
                </Button>
              </Link>

              {/* User avatar or sign in button for mobile */}
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-green-500 text-white">
                          {user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium">{user.name}</p>
                        <p className="w-[200px] truncate text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button onClick={() => setShowAuthModal(true)} className="bg-green-500 hover:bg-green-600" size="sm">
                  Sign In
                </Button>
              )}

              {/* Mobile menu trigger */}
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MenuIcon className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-64">
                  <div className="flex flex-col space-y-4 mt-8">
                    {navItems.map((item) => {
                      const Icon = item.icon
                      const isActive = pathname === item.href
                      return (
                        <Link key={item.href} href={item.href} onClick={closeMobileMenu}>
                          <Button variant={isActive ? "default" : "ghost"} className="w-full justify-start">
                            <Icon className="w-4 h-4 mr-3" />
                            {item.label}
                            {item.href === "/cart" && state.items.length > 0 && (
                              <Badge className="ml-auto h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                                {state.items.reduce((sum, item) => sum + item.quantity, 0)}
                              </Badge>
                            )}
                          </Button>
                        </Link>
                      )
                    })}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  )
}
