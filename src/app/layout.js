import "./globals.css";
import { Inter, Playfair_Display, Dancing_Script } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});
const dancing = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-elegant",
});

export const metadata = {
  title: "Isabella - Quinceañera Invitation",
  description: "Una celebración mágica - 15 años de Isabella",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${playfair.variable} ${dancing.variable}`}>
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
