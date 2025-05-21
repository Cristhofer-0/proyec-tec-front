import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./utils/footer";
import Header from "./utils/header";

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
        <Footer />
      </body>
    </html>
  );
}
