import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Threads",
  description: "Engage in meaningful discussions across communities through a user-friendly, responsive platform built with Next.js.",
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
   <ClerkProvider>
     <html lang="en">
      <body className={`${inter.className} bg-dark-1`}>
         <div className="w-full min-h-screen flex items-center justify-center">
        {children}
         </div>
      </body>
    </html>
   </ClerkProvider>
  );
}