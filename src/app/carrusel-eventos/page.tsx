// Desde aqui se puede contrarlar las imagenes del carrousel
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface EventosProps {
  eventId: number;
}

export default function Eventos({ eventId }: EventosProps) {
  const [banners, setBanners] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

useEffect(() => {
  fetch("http://localhost:3000/eventos")
    .then((res) => res.json())
    .then((data) => {
      const urls = data
        .map((e: any) => e.BannerUrl)
        .filter((url: string) => url.includes("res.cloudinary.com"))
        //.slice(0, 3); // 👈 Solo tomamos las 3 primeras imágenes
      setBanners(urls);
    })
    .catch(console.error);
}, []);

  const prevBanner = () => {
    setCurrentIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  const nextBanner = () => {
    setCurrentIndex((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative">
      <div className="overflow-hidden">
        <div className="flex transition-transform duration-500 ease-in-out">
          <div className="relative min-w-full h-[500px]">
            {banners.length > 0 ? (
              <Image
                src={banners[currentIndex]}
                alt={`Banner evento ${currentIndex}`}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full bg-gray-200" />
            )}

            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/40 to-pink-600/50 flex items-center justify-start pl-40 sm:pl-56 md:pl-49">
              <div className="text-left space-y-3 max-w-xl">
                <div className="space-y-2">
                  <Badge className="bg-yellow-500 hover:bg-yellow-600 text-black">
                    Destacado
                  </Badge>
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-white">
                    Eventos Destacados
                  </h1>
                </div>
                <p className="mt-2 text-white/90 md:text-xl">
                  ¡No te pierdas estos grandes eventos!
                </p>
                <div className="mt-4 flex flex-col sm:flex-row gap-4">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    Ver detalles
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white text-white hover:bg-white/10"
                  >
                    Reservar ahora
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Botones de navegación */}
      <Button
        onClick={prevBanner}
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full"
      >
        <ChevronLeft className="h-6 w-6" />
        <span className="sr-only">Anterior</span>
      </Button>
      <Button
        onClick={nextBanner}
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full"
      >
        <ChevronRight className="h-6 w-6" />
        <span className="sr-only">Siguiente</span>
      </Button>
    </section>
  );
}
