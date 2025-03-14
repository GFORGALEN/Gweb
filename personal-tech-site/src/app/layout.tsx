import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Toaster } from 'sonner';
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "个人技术站点",
  description: "集成AI、英语学习和音乐推荐的个人技术平台",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Toaster />
        </div>
      </body>
    </html>
  );
}