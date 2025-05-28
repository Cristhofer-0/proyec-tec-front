"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { obtenerCarrito } from '@/services/ordenes'; // Ajusta la ruta según corresponda

type CarritoContextType = {
  cantidad: number;
  actualizarCarrito: () => void;
};

const CarritoContext = createContext<CarritoContextType | undefined>(undefined);

export const CarritoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cantidad, setCantidad] = useState<number>(0);

  const actualizarCarrito = async () => {
    const carrito = await obtenerCarrito();
    if (carrito && carrito.length > 0) {
      setCantidad(carrito.length);
    } else {
      setCantidad(0);
    }
  };

  // Obtener carrito al montar el componente
  useEffect(() => {
    actualizarCarrito();
    
    // Opcional: Polling cada X segundos
    const intervalo = setInterval(actualizarCarrito, 5000); // Actualiza cada 5 segundos
    return () => clearInterval(intervalo);
  }, []);

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
