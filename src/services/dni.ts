//dni.ts
export const validarDNI = async (
  numero: string
): Promise<{ valido: boolean; error?: string }> => {
  if (!/^\d{8}$/.test(numero)) {
    return { valido: false, error: "El DNI debe tener 8 dígitos" }
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/verificar-dni`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ numero }),
    })

    const data = await response.json()

    if (response.ok && data.existe) {
      return { valido: true }
    } else {
      return { valido: false, error: "DNI no válido o no encontrado" }
    }
  } catch {
    return { valido: false, error: "Error al validar el DNI" }
  }
}
