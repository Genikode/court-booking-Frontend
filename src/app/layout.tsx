import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/sections/Footer";
// import Providers from "./providers";
import { ThemeProvider } from "next-themes";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Creek Sports Club",
  keywords: ["Creek Sports Club", "Sports", "Club", "Community"],
  authors: [{ name: "Ghayas Ali", url: "https://github.com/GhayasAli" }],
  description: "Creek Sports Club is a vibrant community hub for sports enthusiasts, offering a range of activities and facilities to promote health and wellness.",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
     <ThemeProvider
      attribute="class"   // adds class="dark" to <html>
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >

        {children}
    </ThemeProvider>

   
      </body>
    </html>
  );
}
