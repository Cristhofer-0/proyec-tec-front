"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { obtenerCarrito } from "@/services/ordenes";
import { useUserStore } from "@/stores/userStore";

type CarritoContextType = {
  cantidad: number;
  actualizarCarrito: () => void;
};

const CarritoContext = createContext<CarritoContextType | undefined>(undefined);

export const CarritoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cantidad, setCantidad] = useState<number>(0);
  const user = useUserStore((state) => state.user);

  const actualizarCarrito = async () => {
    if (!user) {
      console.log("⚠️ No hay usuario autenticado. No se hace fetch del carrito.");
      return;
    }

    try {
      const carrito = await obtenerCarrito();
      if (carrito && carrito.length > 0) {
        setCantidad(carrito.length);
      } else {
        setCantidad(0);
      }
    } catch (error) {
      console.error("❌ Error al obtener carrito:", error);
      setCantidad(0);
    }
  };

  useEffect(() => {
    if (!user) {
      console.log("⚠️ No hay usuario autenticado. No se carga carrito.");
      return;
    }

    console.log("✅ Usuario detectado. Cargando carrito...");
    actualizarCarrito();

    const intervalo = setInterval(actualizarCarrito, 5000);
    return () => clearInterval(intervalo);
  }, [user]);

  return (
    <CarritoContext.Provider value={{ cantidad, actualizarCarrito }}>
      {children}
    </CarritoContext.Provider>
  );
};

export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error("useCarrito debe usarse dentro de un CarritoProvider");
  }
  return context;
};
