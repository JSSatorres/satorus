import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/contexts/AuthContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "PideYa - Sistema de Pedidos para Restaurantes",
    template: "%s | PideYa",
  },
  description:
    "Plataforma completa para gestión de restaurantes y pedidos digitales. Sistema QR, gestión de mesas, menús digitales y más.",
  keywords: [
    "restaurante",
    "pedidos digitales",
    "sistema QR",
    "gestión de mesas",
    "menú digital",
    "restaurante digital",
    "pedidos online",
  ],
  authors: [{ name: "PideYa Team" }],
  creator: "PideYa",
  publisher: "PideYa",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://pideya.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://pideya.vercel.app",
    title: "PideYa - Sistema de Pedidos para Restaurantes",
    description:
      "Plataforma completa para gestión de restaurantes y pedidos digitales. Sistema QR, gestión de mesas, menús digitales y más.",
    siteName: "PideYa",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PideYa - Sistema de Pedidos para Restaurantes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PideYa - Sistema de Pedidos para Restaurantes",
    description:
      "Plataforma completa para gestión de restaurantes y pedidos digitales.",
    images: ["/og-image.png"],
    creator: "@pideya",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
