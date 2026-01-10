import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "../styles/globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
})

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
    siteName: "امش مع إبراهيم | Walk With Ibrahim",
    title: "امش مع إبراهيم | Walk With Ibrahim - The Ummah Carries Its Scholar",
    description:
      "For 20 years, Ibrahim served the Ummah through islamland.com (140+ languages). Now he needs surgery in Tunisia. The Ummah carries its own. Join us.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "امش مع إبراهيم - Walk With Ibrahim - The Ummah Carries Ibrahim",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "امش مع إبراهيم | Walk With Ibrahim",
    description:
      "For 20 years, Ibrahim served the Ummah through islamland.com. Now he needs surgery. The Ummah carries its own.",
    images: ["/og-image.png"],
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
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
