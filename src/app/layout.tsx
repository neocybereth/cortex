import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { StructuredData } from "./schema";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ouragpt.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "OuraGPT - Chat with Your Oura Ring Data",
    template: "%s | OuraGPT",
  },
  description:
    "Chat with your Oura Ring data using AI. Get personalized insights about your sleep, activity, readiness, heart rate, and overall health metrics through intelligent conversations.",
  keywords: [
    "Oura Ring",
    "OuraGPT",
    "health tracking",
    "AI assistant",
    "sleep analysis",
    "activity tracking",
    "readiness score",
    "heart rate monitoring",
    "health insights",
    "biometric data",
    "wellness app",
  ],
  authors: [{ name: "OuraGPT" }],
  creator: "OuraGPT",
  publisher: "OuraGPT",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "OuraGPT",
    title: "OuraGPT - Chat with Your Oura Ring Data",
    description:
      "Chat with your Oura Ring data using AI. Get personalized insights about your sleep, activity, readiness, and overall health metrics.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "OuraGPT - Chat with Your Oura Ring Data",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OuraGPT - Chat with Your Oura Ring Data",
    description:
      "Chat with your Oura Ring data using AI. Get personalized insights about your health metrics.",
    images: ["/og-image.png"],
    creator: "@ouragpt",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <StructuredData />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-blue-600 focus:text-white focus:rounded-md focus:m-2">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
