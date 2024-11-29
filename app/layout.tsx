import type { Metadata } from "next";
import "./globals.css";
import NavBar from "../components/NavBar";
import Footer from "@/components/Footer";



export const metadata: Metadata = {
  title: "Our Quran-Hub",
  description: "Created By DineshaS14",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Google Analytics Tag */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-3HWREM4M5Q"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-3HWREM4M5Q');
            `,
          }}
        />
      <body
        className={` antialiased overvlow-y-auto max-h-screen overflow-x-hidden`}
      >
        <NavBar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
