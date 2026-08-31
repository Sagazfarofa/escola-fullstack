import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const metadata = {
  title: "Projeto Escolas | SESI Mirandópolis",
  description: "Sistema Avançado de Gestão Escolar - SESI Mirandópolis",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${plusJakartaSans.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}

