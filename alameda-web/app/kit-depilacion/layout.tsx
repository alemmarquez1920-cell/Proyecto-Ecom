import type { Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import "./kit.css";

const spaceGrotesk = Space_Grotesk({
  weight: "700", // El 600 no se usa: cargarlo suma 9 KB.
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#1E5B46",
  colorScheme: "light",
};

export default function LayoutKitDepilacion({ children }: LayoutProps<"/kit-depilacion">) {
  return <div className={`kd ${spaceGrotesk.variable}`}>{children}</div>;
}
