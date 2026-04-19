// app/layout.tsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import 'easymde/dist/easymde.min.css'
import { SessionProvider } from "next-auth/react";

const workSans = localFont({
  src: [
    {
      path: "./fonts/WorkSans-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "./fonts/WorkSans-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/WorkSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/WorkSans-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/WorkSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/WorkSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/WorkSans-Thin.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./fonts/WorkSans-ExtraLight.ttf",
      weight: "100",
      style: "normal",
    },
  ],
  variable: "--font-work-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Fredsazy - Software Development, DevOps & Tech Insights",
    template: "%s | Fredsazy",
  },
  description: "Software development, DevOps, and technology insights by Iria Fredrick Victor (Fredsazy). Practical engineering guides, code tutorials, and tech strategy for modern builders.",
  keywords: [
    "software development",
    "DevOps",
    "programming",
    "tech blog",
    "engineering",
    "Next.js",
    "React",
    "cloud computing",
    "developer tools",
    "tech insights"
  ],
  authors: [{ name: "Iria Fredrick Victor (Fredsazy)", url: "https://fredsazy.com/about" }],
  creator: "Iria Fredrick Victor (Fredsazy)",
  publisher: "Fredsazy",
  metadataBase: new URL("https://fredsazy.com"),
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://fredsazy.com",
    title: "Fredsazy - Software Development, DevOps & Tech Insights",
    description: "Practical engineering guides, code tutorials, and tech strategy for modern builders.",
    siteName: "Fredsazy",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Fredsazy - Tech Insights by Iria Fredrick Victor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fredsazy - Software Development, Business startups, DevOps & Tech Insights",
    description: "Practical engineering guides, code tutorials, and tech strategy.",
    creator: "@fredsazy",
    site: "@fredsazy",
    images: ["/og-image.jpg"],
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
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    // Add other verification codes as needed
  },
  category: "technology",
  classification: "Technology Blog",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  appleWebApp: {
    capable: true,
    title: "Fredsazy",
    statusBarStyle: "black-translucent",
  },
  applicationName: "Fredsazy",
  generator: "Next.js",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
  },
  other: {
    "google-adsense-account": process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID,
    "msapplication-TileColor": "#0f172a",
    "theme-color": "#0f172a",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={workSans.variable}>
      <body>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}