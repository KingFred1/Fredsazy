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
      path: "./fonts/WorkSans-Black.ttf",
      weight: "900",
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
    default: "techfacts - Practical Tech Insights",
    template: "%s | techfacts",
  },
  description: "A personal tech blog for modern engineers, builders, and product thinkers. Deep analysis, practical engineering insights, and product strategy.",
  keywords: ["tech blog", "software engineering", "product strategy", "developer tools", "architecture"],
  authors: [{ name: "techfacts" }],
  creator: "techfacts",
  publisher: "techfacts",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://techfacts.dev",
    title: "techfacts - Practical Tech Insights",
    description: "A personal tech blog for modern engineers, builders, and product thinkers.",
    siteName: "techfacts",
  },
  twitter: {
    card: "summary_large_image",
    title: "techfacts - Practical Tech Insights",
    description: "A personal tech blog for modern engineers, builders, and product thinkers.",
    creator: "@techfacts",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={workSans.variable}
      >
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
