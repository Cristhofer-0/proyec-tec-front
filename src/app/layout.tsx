import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"
import { CarritoProvider } from '@/components/principales/CarritoContext'; // Ajusta la ruta
import ClientApp from "@/components/principales/ClientApp";
import { NotificationsProvider } from "@/components/principales/NotificationsContext"; // Ajusta la ruta

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
        <NotificationsProvider>
          <CarritoProvider>
            <ClientApp>
              {children}
            </ClientApp>
          </CarritoProvider>
        </NotificationsProvider>
      </body>
    </html>
  );
}
