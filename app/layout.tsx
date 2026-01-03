import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0d6b4b" },
    { media: "(prefers-color-scheme: dark)", color: "#094d36" },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL("https://ibrahim.help"),
  title: "Help Ibrahim Ali | Urgent Cancer Surgery for Islamic Scholar | ibrahim.help",
  description:
    "Ibrahim Ali, founder of islamland.com serving 140+ languages, needs urgent rectal cancer surgery. 20 years of unpaid dawah work. Libya banking crisis prevents access to savings. Help save his life.",
  keywords:
    "Ibrahim Ali, islamland.com, medical fundraising, Islamic charity, cancer surgery, rectal tumor, Libya, Kuwait, dawah, Islamic scholar, medical emergency, Muslim charity, humanitarian aid, Dr Munqith Al-Saqqar",
  authors: [{ name: "Ibrahim Ali Support Campaign" }],
  creator: "Ibrahim Ali Support Team",
  publisher: "ibrahim.help",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["ar_SA", "ar_EG", "ar_KW", "ar_LY"],
    url: "https://ibrahim.help",
    siteName: "Help Ibrahim Ali - ibrahim.help",
    title: "Help Save Ibrahim Ali | Urgent Cancer Surgery Needed",
    description:
      "Islamic scholar who dedicated 20 years to unpaid dawah (islamland.com - 140+ languages) faces life-threatening rectal cancer. Libya's banking crisis blocks his savings. Surgery needed urgently in Tunisia. Please help.",
    images: [
      {
        url: "/images/ibrahim-headshot.jpg",
        width: 800,
        height: 800,
        alt: "Ibrahim Ali Abu Al-Qasim - Islamic Scholar needs urgent medical help",
        type: "image/jpeg",
      },
      {
        url: "/images/mainlogo-500.png",
        width: 500,
        height: 500,
        alt: "ibrahim.help - Help Ibrahim Ali Campaign",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Help Save Ibrahim Ali | Urgent Cancer Surgery",
    description:
      "Islamic scholar (islamland.com founder, 140+ languages) needs urgent cancer surgery. 20 years unpaid service to the Ummah. Libya's banking crisis blocks his savings. Please help.",
    images: ["/images/ibrahim-headshot.jpg"],
    site: "@islamlovers",
    creator: "@islamlovers",
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
  alternates: {
    canonical: "https://ibrahim.help",
    languages: {
      "en-US": "https://ibrahim.help",
      "ar-SA": "https://ibrahim.help",
      "ar-LY": "https://ibrahim.help",
    },
  },
  icons: {
    icon: [
      { url: "/favicon.png?v=2", type: "image/png" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.png?v=2",
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Help Ibrahim Ali",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to Google Fonts for Arabic */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" type="image/png" href="/favicon.png?v=2" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
