// services/email.ts

export const validarEmail = async (
  email: string
): Promise<{ valido: boolean; error?: string }> => {
  // Validación básica en el frontend
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!regex.test(email)) {
    return { valido: false, error: "Formato de correo inválido" }
  }

  try {
    const response = await fetch(`http://localhost:3000/api/validar-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })

    const data = await response.json()
    console.log("Respuesta de validación email:", data)

    if (response.ok) {
      if (data?.valido === true) {
        return { valido: true }
      } else {
        return { valido: false, error: data.error || "Correo no válido o inexistente" }
      }
    } else {
      return { valido: false, error: "Error en la respuesta del servidor" }
    }
  } catch (error) {
    return { valido: false, error: "Error al validar el correo" }
  }
}
