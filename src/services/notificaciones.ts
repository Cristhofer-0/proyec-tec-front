// src/services/notificaciones.ts
import { API_BASE_URL } from "@/lib/config";

export async function obtenerNotificacionesDB(userId: string | number) {
  try {
    console.log("🌐 Llamando a endpoint:", `${API_BASE_URL}/notificaciones/usuario/${userId}`);

    const res = await fetch(`${API_BASE_URL}/notificaciones/usuario/${userId}`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("❌ Error al obtener notificaciones:", errorText);
      return [];
    }

    const data = await res.json();
    console.log("✅ Respuesta del backend:", data);
    return data;
  } catch (error) {
    console.error("❌ Error de red al obtener notificaciones:", error);
    return [];
  }
}

export async function marcarNotificacionLeidaDB(id: number): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/notificaciones/leida/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) {
      const error = await res.text();
      console.error("❌ Error al marcar notificación como leída:", error);
      return false;
    }
    console.log("✅ Notificación marcada como leída en BD:", id);
    return true;
  } catch (err) {
    console.error("❌ Error de red al marcar como leída:", err);
    return false;
  }
}

export async function marcarTodasNotificacionesLeidasDB(userId: string | number) {
  try {
    const res = await fetch(`${API_BASE_URL}/notificaciones/leidas/usuario/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      const error = await res.text();
      console.error("❌ Error al marcar todas como leídas:", error);
      return false;
    }

    console.log("✅ Todas las notificaciones marcadas como leídas en BD");
    return true;
  } catch (err) {
    console.error("❌ Error de red al marcar todas como leídas:", err);
    return false;
  }
}

export async function eliminarNotificacionDB(id: number): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/notificaciones/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("❌ Error al eliminar notificación:", errorText);
      return false;
    }

    console.log("🗑️ Notificación eliminada en backend:", id);
    return true;
  } catch (error) {
    console.error("❌ Error de red al eliminar notificación:", error);
    return false;
  }
}

export async function obtenerNotificacionesNuevas(userId: number, lastId: number) {
  const res = await fetch(`${API_BASE_URL}/notificaciones/nuevas/${userId}/${lastId}`);
  if (!res.ok) {
    console.error("Error obteniendo nuevas notificaciones");
    return [];
  }
  return await res.json();
}