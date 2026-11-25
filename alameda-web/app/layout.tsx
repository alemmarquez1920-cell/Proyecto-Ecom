import type { Metadata, Viewport } from "next";
import { DM_Serif_Display, Inter } from "next/font/google";
import { producto } from "@/config/producto";
import "./globals.css";

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sitio =
  producto.sitioUrl ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(sitio),
  title: producto.seo.titulo,
  description: producto.seo.descripcion,
  openGraph: {
    title: producto.seo.titulo,
    description: producto.seo.descripcion,
    siteName: producto.marca,
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: producto.seo.titulo,
    description: producto.seo.descripcion,
  },
};

export const viewport: Viewport = {
  themeColor: "#09318d",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-AR" className={`${dmSerif.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
