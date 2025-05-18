"use client"

import { toast as originalToast } from "@/components/ui/use-toast"

type SuccessToastOptions = {
  description: string
  duration?: number
}

export function successToast({ description, duration = 5000 }: SuccessToastOptions) {
  return originalToast({
    title: "¡Éxito!",
    description: description, // ← solo texto, nada de JSX
    variant: "default",
    duration,
  })
}
