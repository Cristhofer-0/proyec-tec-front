export type CambioPasswordData = {
  userId: string
  currentPassword?: string
  newPassword: string
  requireCurrent?: boolean // Indica si se requiere la contraseña actual
}
