import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Nav from "@/components/nav/Nav";
import { ReactNode } from "react";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <Nav />
        <main className="flex flex-col items-center min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
