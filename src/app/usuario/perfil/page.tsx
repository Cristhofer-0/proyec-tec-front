"use client"
import Image from "next/image"
import { useState } from "react"
import {
  User,
  Settings,
  CreditCard,
  ChevronRight,
  LogOut,
  ShoppingBag,
  HelpCircle,
  Package,
  Mail,
  ArrowLeft,
  Eye,
  EyeOff,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { validarSesion, cerrarSesion as cerrarSesionService, cambiarPassword } from "@/services/usuarios"
import { obtenerHistorialDeOrdenes } from "@/services/ordenes";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";

import { OrderMapped } from "@/components/types/carrito"
import EventoDialog from "@/components/custom/pdf/EventoDialog"
import ChangePasswordForm from "@/components/principales/ChangePasswordForm"
import { editarUsuarioPerfil } from "@/services/usuarios"
import { toast } from "sonner"
import { useUserStore } from "@/stores/userStore";

export default function ProfilePage() {
  const [activeSection, setActiveSection] = useState("purchases");
  const [comprados, setComprados] = useState<OrderMapped[]>([]);
  const router = useRouter()
  const [usuario, setUsuario] = useState<{ fullName: string; email: string; userId: string } | null>(null);
  const [perfilEditable, setPerfilEditable] = useState({
    fullName: "",
    email: "",// opcional si quieres agregarlo
  })
  const [showPasswordChange, setShowPasswordChange] = useState(false)
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [showSuccessDialogPassword, setShowSuccessDialogPassword] = useState(false)
  const [showSuccessDialogProfile, setShowSuccessDialogProfile] = useState(false)


  useEffect(() => {
    async function checkSesion() {
      const res = await validarSesion();
      if (!res || !res.user) {
        router.push("/usuario/login");
      } else {
        setUsuario({
          fullName: res.user.fullName,
          email: res.user.email,
          userId: res.user.userId,
        });
        setPerfilEditable({
          fullName: res.user.fullName,
          email: res.user.email,
        });
      }
    }

    checkSesion();
  }, [router]);

  useEffect(() => {
    async function cargarComprados() {
      const ordenes = await obtenerHistorialDeOrdenes();
      if (ordenes) setComprados(ordenes);
    }

    cargarComprados();
  }, []);

  async function cerrarSesion() {
    const clearUser = useUserStore.getState().clearUser; // limpia el store y el localStorage
    const ok = await cerrarSesionService(); // llamada al backend

    if (ok) {
      clearUser();
      sessionStorage.setItem("logout", "true");

      router.push("/usuario/login"); // usa el hook ya declarado arriba
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } else {
      console.error("Error al cerrar sesión");
    }
  }

  function handlePasswordChange(field: string, value: string) {
    setPasswordData((prev) => ({ ...prev, [field]: value }))
  }

  function handleCancelPasswordChange() {
    setShowPasswordChange(false)
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
    setShowCurrentPassword(false)
    setShowNewPassword(false)
    setShowConfirmPassword(false)
  }

  async function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return toast.error("Las contraseñas no coinciden")
    }

    if (!usuario?.userId) {
      return toast.error("No se pudo obtener el usuario")
    }

    try {
      await cambiarPassword({
        userId: usuario.userId,
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      })


      toast.success("Contraseña actualizada correctamente")
      setShowConfirmDialog(true)
      handleCancelPasswordChange()
    } catch (error) {
      toast.error("Error al cambiar la contraseña")
    }
  }

  async function confirmarCambioDePassword() {
    setShowConfirmDialog(false)

    if (!usuario?.userId) {
      return toast.error("No se pudo obtener el usuario")
    }

    try {
      await cambiarPassword({
        userId: usuario.userId,
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      })

      setShowSuccessDialogPassword(true) // Mostrar popup de éxito
      handleCancelPasswordChange()
    } catch (error) {
      toast.error("Error al cambiar la contraseña")
    }
  }

  async function handleGuardarCambios() {
    if (!usuario?.userId) {
      return toast.error("No se pudo obtener el usuario");
    }

    try {
      await editarUsuarioPerfil({
        userId: usuario.userId,
        fullName: perfilEditable.fullName,
        email: perfilEditable.email,
      });

      setShowSuccessDialogProfile(true); // <-- Mostramos el popup
    } catch (error) {
      toast.error("Error al guardar los cambios");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <div className="flex flex-col justify-center flex-1 text-center sm:text-left">
                  <CardTitle className="text-lg">{usuario?.fullName || "Usuario"}</CardTitle>
                  <p className="text-sm text-gray-500">{usuario?.email || "correo@ejemplo.com"}</p>
                </div>
              </CardHeader>
              <CardContent>

                <nav className="space-y-1">
                  <button
                    onClick={() => setActiveSection("account")}
                    className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-purple-600 ${activeSection === "account" ? "bg-purple-50 text-purple-600" : ""
                      }`}
                  >
                    <div className="flex items-center">
                      <User
                        className={`mr-3 h-5 w-5 ${activeSection === "account" ? "text-purple-600" : "text-gray-400"}`}
                      />
                      <span>Mi cuenta</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => setActiveSection("purchases")}
                    className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-purple-600 ${activeSection === "purchases" ? "bg-purple-50 text-purple-600" : ""
                      }`}
                  >
                    <div className="flex items-center">
                      <ShoppingBag
                        className={`mr-3 h-5 w-5 ${activeSection === "purchases" ? "text-purple-600" : "text-gray-400"}`}
                      />
                      <span>Mis compras</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => setActiveSection("settings")}
                    className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-purple-600 ${activeSection === "settings" ? "bg-purple-50 text-purple-600" : ""
                      }`}
                  >
                    <div className="flex items-center">
                      <Settings
                        className={`mr-3 h-5 w-5 ${activeSection === "settings" ? "text-purple-600" : "text-gray-400"}`}
                      />
                      <span>Configuración</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </button>

                  <Separator className="my-2" />
                  <button
                    onClick={cerrarSesion}
                    className="flex w-full items-center rounded-md px-3 py-2 text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="mr-3 h-5 w-5" />
                    <span>Cerrar sesión</span>
                  </button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Content Area */}
          <div className="md:col-span-2">
            {activeSection === "account" && (
              <Card>
                <CardHeader>
                  <CardTitle>Mi cuenta</CardTitle>
                  <CardDescription>Gestiona tu información personal y preferencias</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nombre completo</Label>
                        <Input
                          id="name"
                          value={perfilEditable.fullName}
                          onChange={(e) => setPerfilEditable({ ...perfilEditable, fullName: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Correo electrónico</Label>
                        <Input
                          id="email"
                          value={perfilEditable.email}
                          onChange={(e) => setPerfilEditable({ ...perfilEditable, email: e.target.value })}
                        />
                      </div>

                    </div>
                  </div>
                  <Separator />
                  <div className="flex justify-end">
                    <Button onClick={handleGuardarCambios}>Guardar cambios</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeSection === "purchases" && (
              <Card>
                <CardHeader>
                  <CardTitle>Mis compras</CardTitle>
                  <CardDescription>Historial de tus compras recientes</CardDescription>
                </CardHeader>
                <CardContent>
                  {comprados.length === 0 ? (
                    <p className="text-center text-gray-500">No tienes compras aún.</p>
                  ) : (
                    comprados.map((item) => (
                      <div key={item.id} className="mb-4 border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-medium">Pedido #{item.id}</h3>
                            <p className="text-sm text-gray-500">
                              Realizado el {new Date(item.date).toLocaleDateString()}
                            </p>
                          </div>
                          <Badge variant={new Date(item.date) < new Date() ? "default" : "outline"}>
                            {new Date(item.date) < new Date() ? "Válido" : "No válido"}
                          </Badge>

                        </div>

                        <div className="flex items-center gap-4 mt-4">
                          <div className="h-16 w-16 bg-gray-100 rounded-md flex items-center justify-center">
                            <Package className="h-8 w-8 text-gray-400" />
                          </div>
                          <div>
                            <p className="font-medium">Entradas de: {item.title}</p>
                            <p className="text-sm text-gray-500">
                              Cantidad: {item.quantity} - Precio total: S/{item.totalPrice}
                            </p>
                          </div>
                          <Dialog >
                            <EventoDialog id={item.id.toString()}></EventoDialog>
                          </Dialog>
                        </div>

                      </div>
                    ))
                  )}
                </CardContent>

              </Card>
            )}

            {activeSection === "payment" && (
              <Card>
                <CardHeader>
                  <CardTitle>Métodos de pago</CardTitle>
                  <CardDescription>Gestiona tus tarjetas y métodos de pago</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="border rounded-lg p-4 relative">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Visa terminada en 4242</p>
                        <p className="text-sm text-gray-500">Expira: 12/25</p>
                      </div>
                    </div>
                    <Badge className="absolute top-4 right-4">Predeterminada</Badge>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium">Mastercard terminada en 8888</p>
                        <p className="text-sm text-gray-500">Expira: 09/26</p>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full" variant="outline">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Añadir nuevo método de pago
                  </Button>
                </CardContent>
              </Card>
            )}

            {activeSection === "settings" && (
              <Card>
                <CardHeader>
                  <CardTitle>Configuración</CardTitle>
                  <CardDescription>Gestiona tus preferencias y configuración de la cuenta</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Seguridad</h3>
                    {!showPasswordChange ? (
                      <Button variant="outline" size="sm" onClick={() => setShowPasswordChange(true)}>
                        Cambiar contraseña
                      </Button>
                    ) : (
                      <div className="border rounded-lg p-6 bg-gray-50">
                        <div className="flex items-center gap-2 mb-4">
                          <Button variant="ghost" size="sm" onClick={handleCancelPasswordChange} className="p-1 h-8 w-8">
                            <ArrowLeft className="h-4 w-4" />
                          </Button>
                          <h4 className="text-lg font-medium">Cambiar contraseña</h4>
                        </div>

                        <form onSubmit={handlePasswordSubmit} className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="current-password">Contraseña actual</Label>
                            <div className="relative">
                              <Input
                                id="current-password"
                                type={showCurrentPassword ? "text" : "password"}
                                value={passwordData.currentPassword}
                                onChange={(e) => handlePasswordChange("currentPassword", e.target.value)}
                                placeholder="Ingresa tu contraseña actual"
                                required
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                              >
                                {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </Button>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="new-password">Nueva contraseña</Label>
                            <div className="relative">
                              <Input
                                id="new-password"
                                type={showNewPassword ? "text" : "password"}
                                value={passwordData.newPassword}
                                onChange={(e) => handlePasswordChange("newPassword", e.target.value)}
                                placeholder="Ingresa tu nueva contraseña"
                                required
                                minLength={8}
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                              >
                                {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </Button>
                            </div>
                            <p className="text-xs text-gray-500">La contraseña debe tener al menos 8 caracteres</p>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="confirm-password">Confirmar nueva contraseña</Label>
                            <div className="relative">
                              <Input
                                id="confirm-password"
                                type={showConfirmPassword ? "text" : "password"}
                                value={passwordData.confirmPassword}
                                onChange={(e) => handlePasswordChange("confirmPassword", e.target.value)}
                                placeholder="Confirma tu nueva contraseña"
                                required
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              >
                                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </Button>
                            </div>
                          </div>

                          <div className="flex gap-2 pt-4">
                            <Button type="submit" size="sm">
                              Actualizar contraseña
                            </Button>
                            <Button type="button" variant="outline" size="sm" onClick={handleCancelPasswordChange}>
                              Cancelar
                            </Button>
                          </div>
                        </form>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>


      {/* Popup de confirmación */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar cambio de contraseña</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas cambiar tu contraseña? Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>Cancelar</Button>
            <Button onClick={confirmarCambioDePassword}>Confirmar</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Popup de éxito */}
      <Dialog open={showSuccessDialogPassword} onOpenChange={setShowSuccessDialogPassword}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Contraseña actualizada</DialogTitle>
            <DialogDescription>
              Tu contraseña se ha cambiado exitosamente.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end mt-4">
            <Button onClick={() => setShowSuccessDialogPassword(false)}>Aceptar</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog de éxito para actualización de perfil */}
      <Dialog open={showSuccessDialogProfile} onOpenChange={setShowSuccessDialogProfile}>
        <DialogContent className="sm:max-w-md bg-white shadow-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              Perfil actualizado
            </DialogTitle>
            <DialogDescription className="text-left space-y-2">
              <p>Tu información ha sido actualizada correctamente.</p>
              <p className="text-sm text-amber-600 font-medium">
                Por seguridad, debes volver a iniciar sesión para ver los cambios reflejados.
              </p>
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 gap-2 mt-4">
            <Button variant="outline" onClick={() => setShowSuccessDialogProfile(false)}>
              Cancelar
            </Button>
            <Button
              onClick={() => {
                cerrarSesion()
                setShowSuccessDialogProfile(false)
              }}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Cerrar sesión
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
