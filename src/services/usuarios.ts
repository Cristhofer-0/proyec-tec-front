import { API_BASE_URL } from "@/lib/config"


export async function validarSesion(): Promise<{ user?: any } | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/usuarios/validar`, {
      credentials: "include",
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error al validar sesión:", error);
    return null;
  }
}

export async function loginUsuario(email: string, password: string): Promise<{ user?: any }> {
  try {
    const res = await fetch(`${API_BASE_URL}/usuarios/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok || !data) {
      throw new Error(data?.message || "Error desconocido al iniciar sesión");
    }

    return data;
  } catch (error) {
    console.error("Error en loginUsuario:", error);
    throw error;
  }
}

export async function cerrarSesion(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/usuarios/logout`, {
      method: "DELETE",
      credentials: "include",
    });

    return response.ok;
  } catch (error) {
    console.error("Error en logout:", error);
    return false;
  }
}