import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GROR Marketing — Premium Real Estate Performance Marketing Agency",
  description:
    "GROR Marketing builds high-converting digital growth systems for real estate brands with performance marketing, automation, and lead generation.",
  metadataBase: new URL("https://example.com"),
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/icon.png", type: "image/jpeg" },
      { url: "/icon.png", sizes: "60x60" },
    ],
    apple: "/icon.png",
    shortcut: "/icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
