"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex flex-col justify-center items-center text-center px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-800 to-blue-800 opacity-50"></div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-purple-500/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-violet-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-10 w-24 h-24 bg-pink-500/10 rounded-full blur-xl animate-pulse delay-500"></div>
      
      {/* Main content */}
      <div className="relative z-10 max-w-2xl mx-auto">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl md:text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-violet-400 leading-none animate-pulse">
            404
          </h1>
        </div>
        
        {/* Error message */}
        <div className="mb-8 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Página no encontrada
          </h2>
          <p className="text-gray-300 text-lg md:text-xl max-w-md mx-auto leading-relaxed">
            La ruta a la que intentaste acceder no existe o fue eliminada.
          </p>
        </div>
        
        {/* Search suggestion */}
        <div className="mb-8 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
          <div className="flex items-center justify-center gap-2 text-gray-300 mb-2">
            <Search className="w-5 h-5" />
            <span className="text-sm">¿Buscabas algo específico?</span>
          </div>
          <p className="text-xs text-gray-400">
            Verifica la URL o regresa al dashboard para continuar navegando
          </p>
        </div>
        
        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            asChild 
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <Link href="/" className="flex items-center gap-2">
              <Home className="w-5 h-5" />
              Ir al Inicio
            </Link>
          </Button>     
        </div>
        
        {/* Additional help */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 text-sm">
            Si el problema persiste, contacta al soporte técnico
          </p>
        </div>
      </div>
      
      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
    </div>
  )
}
