import { OrderMapped } from "@/components/types/carrito"
import { API_BASE_URL } from "@/lib/config"

export async function obtenerCarrito() {
  try {
    const res = await fetch(`${API_BASE_URL}/orders/carrito`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!res.ok) {
      console.error('Error en la respuesta:', res.statusText);
      return null;
    }

    const data = await res.json();
    return data.ordenes;
  } catch (error) {
    console.error('Error al obtener el carrito:', error);
    return null;
  }
}


export async function obtenerHistorialDeOrdenes(): Promise<OrderMapped[] | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/orders/historial`, {
      method: "POST",
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Error del servidor:", data.message);
      return null;
    }

    const ordenesMapeadas: OrderMapped[] = data.ordenes.map((orden: any) => ({
      id: orden.id,
      title: orden.title || "Sin título",
      description: orden.description || "Sin descripción",
      image: orden.image || "/placeholder.svg",
      quantity: orden.quantity,
      totalPrice: orden.totalPrice,
      price: orden.price,
      type: orden.type,
      date: orden.date,
    }));

    return ordenesMapeadas;
  } catch (error) {
    console.error("Error al obtener historial:", error);
    return null;
  }
}