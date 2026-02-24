import type React from "react"
import type { Metadata, Viewport } from "next"
import { Cormorant_Garamond, IBM_Plex_Sans, IBM_Plex_Sans_Arabic } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script"
import "./globals.css"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
})

const ibmPlex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
})

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-arabic",
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#C8A44E",
}

export const metadata: Metadata = {
  metadataBase: new URL("https://ibrahim.help"),
  title: "Ibrahim Energy Partners | شركاء إبراهيم للطاقة",
  description:
    "North African Oil & Gas Opportunity Facilitation. Bridging Western capital with North African energy assets. Libya, Tunisia, Algeria.",
  keywords:
    "Ibrahim Energy Partners, North Africa, oil and gas, Libya, Tunisia, Algeria, energy consulting, upstream opportunities, E&P, petroleum, Gulf investment, MENA energy",
  authors: [{ name: "Ibrahim Energy Partners" }],
  creator: "Ibrahim Energy Partners",
  publisher: "Ibrahim Energy Partners",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["ar_SA", "ar_LY"],
    url: "https://ibrahim.help",
    siteName: "Ibrahim Energy Partners",
    title: "Ibrahim Energy Partners | شركاء إبراهيم للطاقة",
    description:
      "North African Oil & Gas Opportunity Facilitation. Bridging Western capital with North African energy assets.",
    images: [
      {
        url: "/og-image-1200x630.png",
        width: 1200,
        height: 630,
        alt: "Ibrahim Energy Partners - North Africa Is Open for Business",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ibrahim Energy Partners | شركاء إبراهيم للطاقة",
    description:
      "North African Oil & Gas Opportunity Facilitation. Bridging Western capital with North African energy assets.",
    images: ["/og-image-1200x630.png"],
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
  },
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/icons/icon-192x192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [{ url: "/icons/icon-192x192.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Ibrahim Energy Partners",
  },
}

// Organization structured data for SEO
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Ibrahim Energy Partners",
  alternateName: "شركاء إبراهيم للطاقة",
  url: "https://ibrahim.help",
  logo: "https://ibrahim.help/icons/icon-512x512.png",
  description: "North African Oil & Gas Opportunity Facilitation. Bridging Western capital with North African energy assets.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "333 Seymour Street",
    addressLocality: "Vancouver",
    addressRegion: "BC",
    postalCode: "V6B 5A6",
    addressCountry: "CA"
  },
  email: "info@ibrahim.help",
  areaServed: ["Libya", "Tunisia", "Algeria", "North Africa", "MENA"],
  knowsAbout: ["Oil and Gas", "Upstream Petroleum", "E&P", "Energy Consulting", "North Africa"]
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-35LZPX2FE9"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-35LZPX2FE9');
          `}
        </Script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className={`${cormorant.variable} ${ibmPlex.variable} ${ibmPlexArabic.variable} font-body antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
