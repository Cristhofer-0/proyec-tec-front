import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"
import { CarritoProvider } from '@/components/principales/CarritoContext'; // Ajusta la ruta
import { NotificationsProvider } from "@/components/principales/NotificationsContext"; // Ajusta la ruta
import Header from "@/app/utils/header";
import Footer from "@/app/utils/footer";
import GsapWrapper from "@/components/principales/GsapWrapper";


export const metadata: Metadata = {
  title: "Joint With Us | Los mejores eventos de la comunidad",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico"
  },
  description: "Página principal de Joint With Us",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <NotificationsProvider>
          <CarritoProvider>
            <Header />
            
            <main className="min-h-[80vh]">
              <GsapWrapper>
                {children}
              </GsapWrapper>
            </main>

            <Footer />
          </CarritoProvider>
        </NotificationsProvider>
        <Toaster />
      </body>
    </html>
  );
}