// components/ClientApp.tsx
"use client"

import { Toaster } from "@/components/ui/toaster"
import Header from "@/app/utils/header";
import SocketHandler from "@/components/hooks/SocketHandler"; 
import Footer from "@/app/utils/footer";

export default function ClientApp({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <SocketHandler />
      {children}
      <Toaster />
      <Footer />
    </>
  )
}
