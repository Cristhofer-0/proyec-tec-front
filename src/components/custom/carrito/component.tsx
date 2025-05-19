"use client"

export type TicketItem = {
  id: number
  title: string
  description: string
  image?: string
  quantity: number
  price: number
  type: "General" | "VIP" | string
}
