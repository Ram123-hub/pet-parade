import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pet Parade",
  description: "This is useful for pets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body> 
        <Navbar/>
        <main className="max-w-8xl mx-auto">
          {children}
        </main>
      </body>
    </html>
    </ClerkProvider>
  );
}
