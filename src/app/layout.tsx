import type { Metadata } from "next";
import "./globals.css";
import Footer from "./utils/footer";
import Header from "./utils/header";
import { Toaster } from "@/components/ui/toaster"
import { CarritoProvider } from '@/components/principales/CarritoContext'; // Ajusta la ruta
import SocketHandler from "@/components/hooks/SocketHandler"; 

export const metadata: Metadata = {
  title: "Joint With Us | Los mejores eventos de la comunidad",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico"
  },
  description: "Pagina principal de Joint With Us",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <CarritoProvider>
          <Header />
           <SocketHandler />
          {children}
          <Toaster />
          <Footer />
        </CarritoProvider>
      </body>
    </html>
  );
}
