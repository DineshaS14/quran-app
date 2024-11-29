import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NavBar from "../components/NavBar";
import Footer from "@/components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Our Quran-Hub",
  description: "Created By Dinesha",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overvlow-y-auto max-h-screen overflow-x-hidden`}
      >
        <NavBar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
