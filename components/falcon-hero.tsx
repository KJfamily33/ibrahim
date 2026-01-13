"use client"

import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, ChevronDown } from "lucide-react"
import { useEffect, useState, useRef } from "react"

interface FalconHeroProps {
  lang: "ar" | "en"
}

// ===========================================
// MUX VIDEO CONFIG
// ===========================================
const MUX_DESKTOP_ID = "9h8xgTXUmuwmhXxuZcvvX01RSCJvHtYzPJOCV7gEP8dA" // Landscape 16:9
const MUX_MOBILE_ID = "u4PWJt5e006co5d5OG009mWWiOG7w02KqYLDAsxlsnbZoE"  // Portrait 9:16

// Mux streaming URLs (adaptive bitrate)
const getMuxStreamUrl = (playbackId: string) =>
  `https://stream.mux.com/${playbackId}.m3u8` // HLS for adaptive streaming

const getMuxMp4Url = (playbackId: string, quality: "high" | "medium" | "low" = "medium") =>
  `https://stream.mux.com/${playbackId}/${quality}.mp4`

const getMuxPosterUrl = (playbackId: string) =>
  `https://image.mux.com/${playbackId}/thumbnail.jpg?time=2&width=1920`

// Check if Mux is configured
const MUX_ENABLED = MUX_DESKTOP_ID.length > 0 || MUX_MOBILE_ID.length > 0

export function FalconHero({ lang }: FalconHeroProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    setIsVisible(true)

    // Check for reduced motion preference
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(motionQuery.matches)

    // Check for mobile
    const mobileQuery = window.matchMedia('(max-width: 640px)')
    setIsMobile(mobileQuery.matches)

    const handleMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    const handleMobileChange = (e: MediaQueryListEvent) => setIsMobile(e.matches)

    motionQuery.addEventListener('change', handleMotionChange)
    mobileQuery.addEventListener('change', handleMobileChange)

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange)
      mobileQuery.removeEventListener('change', handleMobileChange)
    }
  }, [])

  // Get the right video based on screen size
  const currentMuxId = isMobile ? (MUX_MOBILE_ID || MUX_DESKTOP_ID) : (MUX_DESKTOP_ID || MUX_MOBILE_ID)
  const hasVideo = MUX_ENABLED && currentMuxId.length > 0

  const content = {
    ar: {
      bismillah: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ",
      title: "أخوك يحتاجك قبل رمضان",
      subtitle: "عالِم خدم الأمة ٢٠ عامًا يريد أن يصوم معكم",
      description: "إبراهيم أسس islamland.com وخدم الملايين بلا أجر. الآن يحتاج جراحة عاجلة ليتعافى قبل رمضان. البنوك الليبية منهارة — لا يستطيع الوصول لأمواله. أنت وقفته.",
      stat1: "١٤٠+",
      stat1Label: "لغة",
      stat2: "٢٠",
      stat2Label: "عامًا بلا أجر",
      stat3: "€٢٥,٠٠٠",
      stat3Label: "للشفاء",
      urgent: "يريد الصيام هذا الرمضان",
      cta: "كن سببًا في شفائه",
      ctaSecondary: "تواصل معه",
      scroll: "اقرأ قصته",
      hadith: "من نفّس عن مؤمن كربة من كرب الدنيا، نفّس الله عنه كربة من كرب يوم القيامة",
      hadithSource: "— صحيح مسلم",
    },
    en: {
      bismillah: "In the Name of Allah, the Most Gracious, the Most Merciful",
      title: "Your Brother Needs You Before Ramadan",
      subtitle: "A scholar who served the Ummah for 20 years wants to fast with you",
      description: "Ibrahim founded islamland.com and served millions without payment. Now he needs urgent surgery to heal before Ramadan. Libya's banks have collapsed — he cannot access his own funds. You are his hope.",
      stat1: "140+",
      stat1Label: "Languages",
      stat2: "20",
      stat2Label: "Years unpaid",
      stat3: "€25,000",
      stat3Label: "To heal",
      urgent: "HE WANTS TO FAST THIS RAMADAN",
      cta: "Help Him Heal",
      ctaSecondary: "Talk to Him",
      scroll: "Read His Story",
      hadith: "Whoever relieves a believer's distress of this world, Allah will relieve his distress on the Day of Resurrection",
      hadithSource: "— Sahih Muslim",
    },
  }

  const t = content[lang]
  const isRTL = lang === "ar"

  // Show video only if loaded, no error, and user doesn't prefer reduced motion
  const showVideo = hasVideo && videoLoaded && !videoError && !prefersReducedMotion

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Premium Gradient Background - Always present as base/fallback */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a2e24] via-[#0d4a3a] to-[#0f5c48]" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#052018]/80 via-transparent to-[#0a3d30]/60" />

      {/* Mux Video Background - Adaptive Streaming */}
      {hasVideo && !prefersReducedMotion && (
        <video
          ref={videoRef}
          key={currentMuxId} // Re-mount when switching between mobile/desktop
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${showVideo ? 'opacity-50' : 'opacity-0'}`}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={getMuxPosterUrl(currentMuxId)}
          onLoadedData={() => setVideoLoaded(true)}
          onError={() => setVideoError(true)}
        >
          {/* HLS for adaptive bitrate (Safari, modern browsers) */}
          <source src={getMuxStreamUrl(currentMuxId)} type="application/x-mpegURL" />
          {/* MP4 fallback for older browsers */}
          <source src={getMuxMp4Url(currentMuxId, "medium")} type="video/mp4" />
        </video>
      )}

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#052018] via-[#052018]/70 to-[#052018]/40" />

      {/* Vignette */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(5,32,24,0.6) 100%)'
      }} />

      {/* Subtle radial glow at bottom */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(ellipse 80% 40% at 50% 100%, rgba(201, 162, 39, 0.2) 0%, transparent 60%)'
        }}
      />

      {/* Sacred Geometry Pattern - very subtle */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23c9a227' stroke-width='0.5'%3E%3Ccircle cx='60' cy='60' r='50'/%3E%3Ccircle cx='60' cy='60' r='35'/%3E%3Cpolygon points='60,10 75,40 110,45 85,65 92,100 60,80 28,100 35,65 10,45 45,40'/%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      {/* Floating Stars - only when no video or video loading */}
      {!showVideo && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white animate-pulse"
              style={{
                width: `${1 + (i % 2)}px`,
                height: `${1 + (i % 2)}px`,
                left: `${10 + (i * 6)}%`,
                top: `${10 + ((i * 7) % 50)}%`,
                opacity: 0.2 + (i % 3) * 0.1,
                animationDuration: `${2 + (i % 3)}s`,
                animationDelay: `${(i % 5) * 0.4}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Main Content */}
      <div
        className={`relative z-10 min-h-screen flex flex-col justify-center py-20 px-4 sm:px-6 lg:px-8`}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <div className="max-w-4xl mx-auto w-full text-center">

          {/* Bismillah */}
          <div className={`transform transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <p className={`text-sm sm:text-base mb-10 tracking-wider ${isRTL ? 'font-arabic-script text-lg' : ''}`}
               style={{ color: 'rgba(201, 162, 39, 0.9)' }}>
              {t.bismillah}
            </p>
          </div>

          {/* Urgent Badge */}
          <div className={`flex justify-center mb-8 transform transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="relative">
              <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-full" />
              <div className="relative bg-gradient-to-r from-red-700 to-red-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-xl flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                {t.urgent}
              </div>
            </div>
          </div>

          {/* Main Title */}
          <div className={`transform transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight ${isRTL ? 'font-arabic-display' : 'font-display'}`}
                style={{ textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}>
              {t.title}
            </h1>
          </div>

          {/* Subtitle */}
          <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <p className={`text-xl sm:text-2xl text-white/85 mb-4 ${isRTL ? 'font-arabic' : 'font-display'}`}>
              {t.subtitle}
            </p>
          </div>

          {/* Description */}
          <div className={`transform transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <p className={`text-white/65 text-base sm:text-lg max-w-2xl mx-auto mb-12 leading-relaxed ${isRTL ? 'font-arabic' : ''}`}>
              {t.description}
            </p>
          </div>

          {/* Stats Row */}
          <div className={`transform transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <div className="flex justify-center gap-8 sm:gap-12 md:gap-16 mb-12">
              {[
                { value: t.stat1, label: t.stat1Label },
                { value: t.stat2, label: t.stat2Label },
                { value: t.stat3, label: t.stat3Label },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-1 ${isRTL ? 'font-arabic-display' : 'font-display'}`}
                       style={{ color: '#c9a227' }}>
                    {stat.value}
                  </div>
                  <div className={`text-xs sm:text-sm text-white/50 uppercase tracking-wider ${isRTL ? 'font-arabic' : ''}`}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className={`transform transition-all duration-1000 delay-[600ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto mb-12">
              <Button
                asChild
                size="lg"
                className="flex-1 bg-[#c9a227] hover:bg-[#d4af37] text-[#0a2e24] font-bold text-base py-7 shadow-xl transition-all hover:scale-[1.02] rounded-xl"
              >
                <a href="#donate" className="flex items-center justify-center gap-2">
                  <Heart className="h-5 w-5" />
                  {t.cta}
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="flex-1 border-2 border-white/25 text-white hover:bg-white/10 bg-white/5 backdrop-blur-sm font-semibold py-7 transition-all hover:border-white/40 rounded-xl"
              >
                <a href="https://wa.me/218916695689" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  {t.ctaSecondary}
                </a>
              </Button>
            </div>
          </div>

          {/* Hadith Quote */}
          <div className={`transform transition-all duration-1000 delay-[700ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <blockquote className="max-w-2xl mx-auto mb-12">
              <p className={`text-white/60 text-base sm:text-lg leading-relaxed mb-3 ${isRTL ? 'font-arabic-script text-xl' : 'font-display italic'}`}>
                "{t.hadith}"
              </p>
              <cite className="block text-[#c9a227]/70 text-sm not-italic">
                {t.hadithSource}
              </cite>
            </blockquote>
          </div>

          {/* Scroll Indicator */}
          <div className={`transform transition-all duration-1000 delay-[800ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <a
              href="#story"
              className="inline-flex flex-col items-center text-white/40 hover:text-[#c9a227] transition-colors"
            >
              <span className={`text-xs mb-2 tracking-wider uppercase ${isRTL ? 'font-arabic' : ''}`}>
                {t.scroll}
              </span>
              <ChevronDown className="h-5 w-5 animate-bounce" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Fade to cream */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#faf8f3] to-transparent" />
    </section>
  )
}
