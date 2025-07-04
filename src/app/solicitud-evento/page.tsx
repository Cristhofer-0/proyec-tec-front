"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { validarDNI } from "@/services/dni"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { successToast } from "@/components/ui/custom-toast"
import { API_BASE_URL } from "@/lib/config"

export default function FormularioCambioRol() {
  const [dniError, setDniError] = useState("")
  const [formData, setFormData] = useState({
    dni: "",
    nombre: "",
    email: "",
    telefono: "",
    razon: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (!formData.dni || !formData.nombre || !formData.email || !formData.telefono || !formData.razon) {
      toast({
        title: "Error",
        description: "Por favor complete todos los campos requeridos.",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    const { valido, error } = await validarDNI(formData.dni)
    if (!valido) {
      setDniError(error || "DNI no válido")
      toast({
        title: "DNI inválido",
        description: error,
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch(`${API_BASE_URL}/solicitud-evento`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || "Error al enviar la solicitud")
      }

      successToast({
        description: "El correo se envió con éxito",
      })

      setFormData({
        dni: "",
        nombre: "",
        email: "",
        telefono: "",
        razon: "",
      })
      setDniError("")
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.message ?? "Hubo un problema al enviar su solicitud. Intente nuevamente.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Columna izquierda: mensaje motivacional */}
        <div className="w-full md:w-1/2 p-8 bg-gradient-to-r from-purple-600 to-indigo-800 text-white rounded-lg shadow-lg">
          <h1 className="text-4xl font-extrabold mb-4">
            ¿Quieres publicar tus eventos y llegar a más personas?
          </h1>
          <p className="text-lg mb-4">
            En Joint With Us te ayudamos a difundir tus eventos para que tengan el alcance que merecen. Solo necesitas enviarnos tus datos y la información del evento para que nuestro equipo pueda verificar y aprobar tu publicación rápidamente.
          </p>
          <p className="text-md font-semibold">
            ¡No pierdas la oportunidad de conectar con tu audiencia y hacer crecer tu comunidad! Completa el formulario y déjanos ayudarte a lograrlo.
          </p>
        </div>

        {/* Columna derecha: formulario */}
        <div className="w-full md:w-1/2">
          <Card className="bg-gradient-to-b from-blue-50 to-indigo-100">
            <CardHeader>
              <CardTitle className="text-2xl">Complete el formulario</CardTitle>
              <CardDescription>Complete el formulario con sus datos para solicitar un cambio de rol.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="dni">
                    DNI <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="dni"
                    name="dni"
                    placeholder="Ingrese su DNI"
                    value={formData.dni}
                    onChange={handleChange}
                    onBlur={() => validarDNI(formData.dni)}
                    required
                  />
                  {dniError && <p className="text-sm text-red-500">{dniError}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nombre">
                    Nombre completo <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="nombre"
                    name="nombre"
                    placeholder="Ingrese su nombre completo"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">
                    Correo electrónico <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="ejemplo@correo.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefono">
                    Número de celular <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="telefono"
                    name="telefono"
                    type="tel"
                    placeholder="Ingrese su número de celular"
                    value={formData.telefono}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="razon">
                    Razón por la cual solicita un cambio de rol <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="razon"
                    name="razon"
                    placeholder="Describa el motivo de su solicitud"
                    value={formData.razon}
                    onChange={handleChange}
                    rows={4}
                    required
                  />
                </div>
              </CardContent>
              <br />
              <CardFooter>
                <Button 
                  type="submit" 
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white" 
                  disabled={isSubmitting}>
                  {isSubmitting ? "Enviando..." : "Enviar solicitud"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
}
