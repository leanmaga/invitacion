import "./globals.css";
import {
  Inter,
  Playfair_Display,
  Cookie,
  Dancing_Script,
} from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});
const dancing = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-elegant",
});
const coockie = Cookie({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-coockie",
});

export const metadata = {
  title: "Cami - Mis Quince Años",
  description: "Una celebración única - 15 años de Cami",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="es"
      className={`${playfair.variable} ${dancing.variable} ${coockie.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
