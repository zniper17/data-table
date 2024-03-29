import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Custom Data table",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className}  container mx-auto p-4 bg-gray-100 dark:bg-gray-900 dark:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
