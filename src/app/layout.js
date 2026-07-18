import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Fincacho | Casa de Alquiler Temporario y Mensual",
  description: "Disfrutá una casa cómoda, privada y lista para descansar. Alquiler temporario o mensual en un entorno premium. Consultá disponibilidad por WhatsApp.",
  keywords: "alquiler temporario, casa de campo, fincacho, alquiler mensual, casa con pileta, vacaciones, descanso, alquiler de casa",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="es"
      className={`${playfair.variable} ${jakarta.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
