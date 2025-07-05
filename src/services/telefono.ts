// services/telefono.ts
export const validarTelefono = async (
  numero: string
): Promise<{ valido: boolean; error?: string }> => {
  // Validación básica en el frontend
  if (!/^\d{9}$/.test(numero)) {
    return { valido: false, error: "El número debe tener 9 dígitos" }
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/validar-telefono`, {

      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ numero: numero }), // Agrega prefijo país
    })

    const data = await response.json()
    console.log("Respuesta de validación teléfono:", data)

    if (response.ok) {
        if (data?.valido === true) {
            return { valido: true }
        } else {
            return { valido: false, error: data.error || "Número inválido o no encontrado" }
        }
    } else {
        return { valido: false, error: "Error en la respuesta del servidor" }
    }
  } catch (error) {
    return { valido: false, error: "Error al validar el número" }
  }
}
