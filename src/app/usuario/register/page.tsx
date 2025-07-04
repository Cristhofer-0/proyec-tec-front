"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowUpCircleIcon, CheckIcon, EyeIcon, EyeOffIcon, UserIcon } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { registerUser } from "@/services/usuarios"
import { validarDNI } from "@/services/dni"

export default function RegisterContent() {
  const router = useRouter()
  const [dniError, setDniError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [formData, setFormData] = useState({
    fullName: "",
    birthDate: "",
    phone: "",
    dni: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    agreeToMarketing: false,
    role: "user", // Fijo
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validaciones básicas
    if (!formData.fullName || !formData.email || !formData.password || !formData.dni || !formData.birthDate || !formData.phone) {
      toast.error("Por favor completa todos los campos requeridos")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Las contraseñas no coinciden")
      return
    }

    if (!formData.agreeToTerms) {
      toast.error("Debes aceptar los términos y condiciones")
      return
    }

    const { valido, error } = await validarDNI(formData.dni)
    if (!valido) {
      setDniError(error || "DNI inválido")
      toast.error(error || "DNI inválido")
      return
    } else {
      setDniError("")
    }


    try {
      const payload = {
        FullName: formData.fullName,
        BirthDate: formData.birthDate,
        Phone: formData.phone,
        DNI: formData.dni,
        Email: formData.email,
        PasswordHash: formData.password,
        Role: formData.role,
      }

      await registerUser(payload)
      toast.success("¡Cuenta creada exitosamente! Ahora puedes iniciar sesión.")
      router.push("/usuario/login")
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const passwordRequirements = [
    { text: "Al menos 8 caracteres", met: formData.password.length >= 8 },
    { text: "Una letra mayúscula", met: /[A-Z]/.test(formData.password) },
    { text: "Una letra minúscula", met: /[a-z]/.test(formData.password) },
    { text: "Un número", met: /\d/.test(formData.password) },
    { text: "Un carácter especial", met: /[!@#$%^&*(),.?\":{}|<>]/.test(formData.password) },
  ]

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg space-y-6">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Crear Cuenta</CardTitle>
            <CardDescription>Únete a miles de usuarios que confían en nuestra plataforma</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">
                  Nombre Completo <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="fullName"
                  placeholder="Juan Pérez"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dni">
                    DNI <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="dni"
                    placeholder="12345678"
                    value={formData.dni}
                    onChange={(e) => handleInputChange("dni", e.target.value)}
                    required
                  />
                  {dniError && <p className="text-sm text-destructive">{dniError}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birthDate">
                    Fecha de Nacimiento <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => handleInputChange("birthDate", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">
                  Teléfono <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="phone"
                  placeholder="123456789"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  Correo Electrónico <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">
                  Contraseña <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                  </Button>
                </div>

                {formData.password && (
                  <div className="space-y-2 rounded-lg bg-muted/50 p-3">
                    <p className="text-sm font-medium">Requisitos de contraseña:</p>
                    <div className="grid grid-cols-1 gap-1">
                      {passwordRequirements.map((req, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <div
                            className={`flex h-4 w-4 items-center justify-center rounded-full ${
                              req.met ? "bg-green-500" : "bg-muted"
                            }`}
                          >
                            {req.met && <CheckIcon className="h-3 w-3 text-white" />}
                          </div>
                          <span className={req.met ? "text-green-600 dark:text-green-400" : "text-muted-foreground"}>
                            {req.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">
                  Confirmar Contraseña <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                  </Button>
                </div>
                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <p className="text-sm text-destructive">Las contraseñas no coinciden</p>
                )}
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                    required
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="terms" className="text-sm font-medium">
                      Acepto los{" "}
                      <Button variant="link" className="h-auto p-0 text-sm" asChild>
                        <Link href="/terminos">términos y condiciones</Link>
                      </Button>{" "}
                      y la{" "}
                      <Button variant="link" className="h-auto p-0 text-sm" asChild>
                        <Link href="/privacy">política de privacidad</Link>
                      </Button>
                      <span className="text-destructive"> *</span>
                    </Label>
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-purple-600 hover:bg-indigo-700 text-white" >
                <UserIcon className="h-4 w-4" />
                Crear Cuenta
              </Button>
            </form>

            <Separator className="my-6" />

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">¿Ya tienes una cuenta? </span>
              <Button variant="link" className="h-auto p-0 text-sm" asChild>
                <Link href="/usuario/login">Inicia sesión aquí</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
