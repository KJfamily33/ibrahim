"use client"

import { useEffect, useRef, useState } from "react"

interface JourneySectionProps {
  id?: string
  headline: {
    ar: string
    en: string
  }
  subheadline?: {
    ar: string
    en: string
  }
  lang: "ar" | "en"
  desktopImage: string
  mobileImage: string
  overlay?: "dark" | "light" | "gradient"
  children: React.ReactNode
  className?: string
}

export function JourneySection({
  id,
  headline,
  subheadline,
  lang,
  desktopImage,
  mobileImage,
  overlay = "dark",
  children,
  className = "",
}: JourneySectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [parallaxOffset, setParallaxOffset] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check for mobile
    const mobileQuery = window.matchMedia("(max-width: 768px)")
    setIsMobile(mobileQuery.matches)

    const handleMobileChange = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mobileQuery.addEventListener("change", handleMobileChange)

    // Parallax effect
    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const viewportHeight = window.innerHeight

      // Only apply parallax when section is in view
      if (rect.top < viewportHeight && rect.bottom > 0) {
        const progress = (viewportHeight - rect.top) / (viewportHeight + rect.height)
        setParallaxOffset(progress * 100) // 0-100 range
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Initial call

    return () => {
      mobileQuery.removeEventListener("change", handleMobileChange)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const currentImage = isMobile ? mobileImage : desktopImage
  const isRTL = lang === "ar"

  const overlayClasses = {
    dark: "bg-gradient-to-b from-black/60 via-black/40 to-black/70",
    light: "bg-gradient-to-b from-white/30 via-white/10 to-white/40",
    gradient: "bg-gradient-to-b from-sacred-teal-deep/80 via-sacred-teal/60 to-sacred-teal-deep/90",
  }

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`relative min-h-[70vh] overflow-hidden ${className}`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Parallax Background */}
      <div
        className="absolute inset-0 w-full h-[120%] -top-[10%] bg-cover bg-center transition-transform duration-100"
        style={{
          backgroundImage: `url(${currentImage})`,
          transform: `translateY(${parallaxOffset * 0.3}px)`,
        }}
      />

      {/* Overlay */}
      <div className={`absolute inset-0 ${overlayClasses[overlay]}`} />

      {/* Vignette Effect */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(0,0,0,0.4) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 min-h-[70vh] flex flex-col justify-center py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto w-full">
          {/* Journey Headline */}
          <div className="text-center mb-12">
            <h2
              className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 drop-shadow-2xl ${
                isRTL ? "font-arabic-display" : "font-display"
              }`}
              style={{ textShadow: "0 4px 30px rgba(0,0,0,0.5)" }}
            >
              {headline[lang]}
            </h2>
            {subheadline && (
              <p
                className={`text-xl sm:text-2xl text-white/90 ${
                  isRTL ? "font-arabic" : "font-display"
                }`}
                style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}
              >
                {subheadline[lang]}
              </p>
            )}
          </div>

          {/* Section Content */}
          {children}
        </div>
      </div>
    </section>
  )
}
