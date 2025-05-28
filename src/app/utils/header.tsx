"use client"

import Link from "next/link"
import Image from "next/image"
import {
  Menu,
  ShoppingCart,
  User,
} from "lucide-react"

import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { NavLink } from "@/components/custom/navlink"
import { useUserStore } from "@/stores/userStore"
import { useCarrito } from '@/components/principales/CarritoContext';

const Header: React.FC = () => {
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(false)
  const user = useUserStore((state) => state.user)
  const setUser = useUserStore((state) => state.setUser)

  const { cantidad, actualizarCarrito } = useCarrito()

  useEffect(() => {
    const stored = localStorage.getItem("user")
    if (stored) {
      setUser(JSON.parse(stored))
    }
  }, [setUser])

  useEffect(() => {
    actualizarCarrito()
  }, [actualizarCarrito])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Menu className="h-6 w-6 md:hidden" />
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">
              JoinWithUs!
            </span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/eventos" className="font-medium transition-colors hover:text-primary">
            Eventos
          </Link>
          <Link href="/solicitud-evento">Solicitud</Link>
          <Link href="#" className="font-medium transition-colors hover:text-primary">
            Contacto
          </Link>
        </nav>
        <div className="flex items-center gap-4">
           <Button variant="ghost" size="icon" className="relative">
      <Link href="/carrito">
        <ShoppingCart className="h-5 w-5" />
        {cantidad > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {cantidad}
          </span>
        )}
      </Link>
    </Button>

          {/* Mostrar icono según el estado de autenticación */}
          {user ? (
            <Button variant="ghost" size="icon" asChild>
              <Link href="/usuario/perfil">
                <User className="h-5 w-5 text-purple-600" />
              </Link>
            </Button>
          ) : (
            <Button variant="ghost" size="icon" asChild>
              <Link href="/usuario/login">
                <User className="h-5 w-5" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
