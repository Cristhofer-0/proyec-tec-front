//NotificacionData.ts
export interface Notificacion {
  id: string;
  userId: string; // ID del usuario al que pertenece la notificación
  eventoId?: string;
  message: string;
  isread: boolean; // ID del evento relacionado, si aplica
}