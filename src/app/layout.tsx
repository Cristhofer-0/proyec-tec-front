import type { Metadata } from "next";
import "./globals.css";
import Footer from "./utils/footer";
import Header from "./utils/header";
import { Toaster } from "@/components/ui/toaster"

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
        <Header />
          {children}
          <Toaster />
        <Footer />
      </body>
    </html>
  );
}
