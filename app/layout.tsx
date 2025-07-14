import type { Metadata } from "next";
// Ganti impor font sesuai dengan yang Anda gunakan
import { Inter } from 'next/font/google'
import "./globals.css";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Fikshii | Portfolio",
  description: "Portfolio Taufik Hidayat",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
