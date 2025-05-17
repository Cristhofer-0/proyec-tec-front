"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function FormularioCambioRol() {
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

    // Validación básica
    if (!formData.dni || !formData.nombre || !formData.email || !formData.telefono || !formData.razon) {
      toast({
        title: "Error",
        description: "Por favor complete todos los campos requeridos.",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    // Aquí iría la lógica para enviar los datos a un servidor
    try {
      // Simulación de envío
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Solicitud enviada",
        description: "Su solicitud de cambio de rol ha sido enviada correctamente.",
      })

      // Resetear el formulario
      setFormData({
        dni: "",
        nombre: "",
        email: "",
        telefono: "",
        razon: "",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al enviar su solicitud. Intente nuevamente.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Solicitud de Cambio de Rol</CardTitle>
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
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nombre">
                Nombre de contacto <span className="text-red-500">*</span>
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

          <CardFooter>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Enviando..." : "Enviar solicitud"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
