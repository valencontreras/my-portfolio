import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Valentina Contreras - Portfolio",
  description: "Transforming Concepts into Seamless User Experiences",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-[#000319] text-white antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
