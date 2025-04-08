import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Session from "@/providers/Session";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Futsal Mania 2025",
  description: "Futsal tournament organized by IQLIPSE",
};

export default function RootLayout({ children }) {
return (
<html lang="en">
  <Session>
  <body
    className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white grid grid-rows-[auto_1fr] h-[100dvh] max-h-[100dvh] overflow-hidden`}
  >
    <Navbar/>
    {children}
  </body>
  </Session>
</html>
);
}
