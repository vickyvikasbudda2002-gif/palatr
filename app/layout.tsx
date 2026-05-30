import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PALATR | Taste where you belong",
  description:
    "A premium food discovery platform helping people find restaurants loved by their own culture, community and spice identity.",
  icons: {
    icon: "/images/logo/favicon.ico",
    apple: "/images/logo/app-icon.png",
  },
  openGraph: {
    title: "PALATR | Taste where you belong",
    description:
      "Discover restaurants loved by your people, culture and taste identity.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={plusJakarta.variable}>
      <body className={plusJakarta.className}>{children}</body>
    </html>
  );
}
