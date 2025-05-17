import Link from "next/link"
import Image from "next/image"
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  MapPin,
  Clock,
  Star,
  ShoppingCart,
  Search,
  Menu,
  User,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { NavLink } from "@/components/custom/navlink"


const Header: React.FC = () => {
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
            <Link href="#" className="font-medium transition-colors hover:text-primary">
              Inicio
            </Link>
            <Link href="#" className="font-medium transition-colors hover:text-primary">
              Fiestas
            </Link>
            <Link href="#" className="font-medium transition-colors hover:text-primary">
              Conciertos
            </Link>
            <NavLink href="/solicitud-evento">Solicitud</NavLink>
            <Link href="#" className="font-medium transition-colors hover:text-primary">
              Contacto
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-purple-600 text-[10px] font-medium text-white">
                3
              </span>
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

    );
};

export default Header;