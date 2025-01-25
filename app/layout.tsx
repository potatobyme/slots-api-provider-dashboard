import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Slot Dashboard",
  description: "Modern slot management dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen">
          <NavBar />
          <div className="flex h-[calc(100vh-64px)]">
            <Sidebar />
            <main className="flex-1 overflow-auto bg-[#F8F9FC]">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}

