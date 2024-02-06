import Nav from "@/components/nav/Nav";
import Toast from "@/utils/toast/Toast";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Provider } from "./providers";

const defaultUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <Provider>
          <Nav />
          <main className="flex flex-col items-center min-h-screen">{children}</main>
          <Toast />
        </Provider>
        <SpeedInsights />
      </body>
    </html>
  );
}
