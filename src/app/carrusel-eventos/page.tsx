"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { API_BASE_URL } from "@/lib/config";
import Link from "next/link";

export default function Eventos() {
  const [banners, setBanners] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch(`${API_BASE_URL}/eventos`)
      .then((res) => res.json())
      .then((data) => {
        const urls = data
          .map((e: any) => e.BannerUrl)
          .filter((url: string) => url.includes("res.cloudinary.com"))
          .slice(0, 3); 
        setBanners(urls);
      })
      .catch(console.error);
  }, []);

  // Slide automático
  useEffect(() => {
    if (banners.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    }, 5000); // Cambia de imagen cada 5 segundos

    return () => clearInterval(interval); // Limpia el intervalo al desmontar o al cambiar banners
  }, [banners]);

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

            <div className="absolute inset-0 flex items-center">
              <div className="container px-4 md:px-6">
                <div className="max-w-xl space-y-4">
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
                      <Link href="/eventos">Ver detalles</Link>
                    </Button>
                  </div>
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
