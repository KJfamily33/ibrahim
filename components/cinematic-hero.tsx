"use client"

import { useState, useEffect, useRef } from "react"
import { Heart, Users, Volume2, VolumeX } from "lucide-react"

interface CinematicHeroProps {
  lang: "ar" | "en"
}

export function CinematicHero({ lang }: CinematicHeroProps) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [liveViewers, setLiveViewers] = useState(47)
  const [prayersSent, setPrayersSent] = useState(0)
  const [showPrayerBurst, setShowPrayerBurst] = useState(false)
  const [audioEnabled, setAudioEnabled] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  const content = {
    ar: {
      chapter1: {
        title: "في ليبيا...",
        subtitle: "يعيش رجل كرّس حياته لخدمة الإسلام",
      },
      chapter2: {
        title: "٢٠ عاماً",
        subtitle: "بنى islamland.com — ١٤٠+ لغة — ملايين المسلمين تعلموا منه",
        detail: "بدون أي مقابل مادي. صدقة جارية.",
      },
      chapter3: {
        title: "ثم جاء المرض",
        subtitle: "ورم خبيث. يحتاج جراحة عاجلة.",
        detail: "المستشفيات في ليبيا لا تستطيع. البنوك تجمّد أمواله.",
      },
      chapter4: {
        title: "الأمل في تونس",
        subtitle: "الجراحة ممكنة. لكنه يحتاج مساعدتك.",
        cta: "€٢٠,٠٠٠ لإنقاذ حياته",
      },
      liveNow: "روح معك الآن",
      prayersSent: "دعوة أُرسلت",
      joinPrayer: "اضغط للدعاء",
      hadith: "مَنْ نَفَّسَ عَنْ مُؤْمِنٍ كُرْبَةً",
    },
    en: {
      chapter1: {
        title: "In Libya...",
        subtitle: "Lives a man who dedicated his life to serving Islam",
      },
      chapter2: {
        title: "20 Years",
        subtitle: "He built islamland.com — 140+ languages — millions of Muslims learned from him",
        detail: "Without any payment. Sadaqah Jariyah.",
      },
      chapter3: {
        title: "Then came the illness",
        subtitle: "Malignant tumor. Needs urgent surgery.",
        detail: "Libya's hospitals can't help. Banks have frozen his money.",
      },
      chapter4: {
        title: "Hope lies in Tunisia",
        subtitle: "Surgery is possible. But he needs your help.",
        cta: "€20,000 to save his life",
      },
      liveNow: "souls with you now",
      prayersSent: "prayers sent",
      joinPrayer: "Tap to pray",
      hadith: "Whoever relieves a believer's distress...",
    },
  }

  const t = content[lang]

  // Track scroll position
  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const scrolled = -rect.top
      const height = containerRef.current.offsetHeight - window.innerHeight
      const progress = Math.max(0, Math.min(1, scrolled / height))
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Simulate live viewers
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveViewers((prev) => {
        const change = Math.random() > 0.5 ? 1 : -1
        return Math.max(30, Math.min(100, prev + change))
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Prayer burst effect
  const sendPrayer = () => {
    setPrayersSent((prev) => prev + 1)
    setShowPrayerBurst(true)
    setTimeout(() => setShowPrayerBurst(false), 1000)
  }

  // Calculate chapter visibility based on scroll
  const getChapterOpacity = (chapterStart: number, chapterEnd: number) => {
    if (scrollProgress < chapterStart) return 0
    if (scrollProgress > chapterEnd) return 0
    const mid = (chapterStart + chapterEnd) / 2
    const range = (chapterEnd - chapterStart) / 2
    return 1 - Math.abs(scrollProgress - mid) / range
  }

  if (!mounted) return null

  return (
    <div ref={containerRef} className="relative" style={{ height: "500vh" }}>
      {/* Fixed viewport */}
      <div className="fixed inset-0 overflow-hidden">
        {/* Dynamic background - darkness to light */}
        <div
          className="absolute inset-0 transition-all duration-700"
          style={{
            background: `linear-gradient(180deg,
              hsl(220, ${60 - scrollProgress * 30}%, ${5 + scrollProgress * 10}%) 0%,
              hsl(160, ${40 + scrollProgress * 20}%, ${10 + scrollProgress * 15}%) 100%
            )`,
          }}
        />

        {/* Stars that fade as hope rises */}
        <div
          className="absolute inset-0 sacred-stars transition-opacity duration-700"
          style={{ opacity: 0.6 - scrollProgress * 0.5 }}
        />

        {/* Rising sun/hope gradient */}
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{
            opacity: scrollProgress * 0.5,
            background: `radial-gradient(ellipse at 50% 120%,
              rgba(201, 162, 39, 0.3) 0%,
              transparent 50%
            )`,
          }}
        />

        {/* Floating prayer particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${10 + (i * 37) % 80}%`,
                bottom: `${-10 + (prayersSent * 3) % 20}%`,
                width: `${3 + (i % 4)}px`,
                height: `${3 + (i % 4)}px`,
                background: `radial-gradient(circle,
                  rgba(201, 162, 39, ${0.6 + (i % 3) * 0.2}) 0%,
                  transparent 70%
                )`,
                animation: `prayer-rise ${8 + (i % 5)}s ease-out infinite`,
                animationDelay: `${(i * 0.5) % 8}s`,
              }}
            />
          ))}
        </div>

        {/* Prayer burst effect */}
        {showPrayerBurst && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute left-1/2 top-1/2 w-2 h-2 rounded-full bg-sacred-gold"
                style={{
                  animation: "prayer-burst 1s ease-out forwards",
                  transform: `rotate(${i * 18}deg) translateY(-50px)`,
                }}
              />
            ))}
          </div>
        )}

        {/* Live presence indicator */}
        <div className="absolute top-6 left-6 z-50">
          <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
            <div className="relative">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
              <div className="absolute inset-0 w-3 h-3 rounded-full bg-red-500 animate-ping" />
            </div>
            <div className="flex -space-x-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-full bg-gradient-to-br from-sacred-gold to-sacred-gold-warm border border-black/20"
                />
              ))}
            </div>
            <span className="text-white text-sm font-medium">
              <span className="text-sacred-gold font-bold">{liveViewers}</span> {t.liveNow}
            </span>
          </div>
        </div>

        {/* Audio toggle */}
        <button
          onClick={() => setAudioEnabled(!audioEnabled)}
          className="absolute top-6 right-6 z-50 p-3 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white hover:bg-black/60 transition-all"
        >
          {audioEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
        </button>

        {/* Prayer counter & tap to pray */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 cursor-pointer"
          onClick={sendPrayer}
        >
          <div className="flex flex-col items-center gap-2 px-6 py-4 rounded-2xl bg-black/40 backdrop-blur-md border border-sacred-gold/30 hover:border-sacred-gold/60 transition-all hover:scale-105">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-sacred-gold animate-pulse" />
              <span className="text-sacred-gold font-bold text-xl">{prayersSent.toLocaleString()}</span>
              <span className="text-white/70 text-sm">{t.prayersSent}</span>
            </div>
            <span className="text-white/50 text-xs">{t.joinPrayer}</span>
          </div>
        </div>

        {/* CHAPTER 1 - In Libya */}
        <div
          className="absolute inset-0 flex items-center justify-center px-6 transition-all duration-500"
          style={{ opacity: getChapterOpacity(0, 0.25), transform: `translateY(${scrollProgress > 0.125 ? -50 : 0}px)` }}
        >
          <div className="text-center max-w-3xl">
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold text-white mb-6 tracking-tight">
              {t.chapter1.title}
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl text-sacred-cream/80">
              {t.chapter1.subtitle}
            </p>
          </div>
        </div>

        {/* CHAPTER 2 - 20 Years */}
        <div
          className="absolute inset-0 flex items-center justify-center px-6 transition-all duration-500"
          style={{ opacity: getChapterOpacity(0.2, 0.45) }}
        >
          <div className="text-center max-w-4xl">
            <div className="text-8xl sm:text-9xl md:text-[12rem] font-black text-golden-gradient mb-4">
              {t.chapter2.title}
            </div>
            <p className="text-xl sm:text-2xl text-sacred-cream/90 mb-4">
              {t.chapter2.subtitle}
            </p>
            <p className="text-lg text-sacred-gold italic">
              {t.chapter2.detail}
            </p>
          </div>
        </div>

        {/* CHAPTER 3 - The Illness */}
        <div
          className="absolute inset-0 flex items-center justify-center px-6 transition-all duration-500"
          style={{ opacity: getChapterOpacity(0.4, 0.65) }}
        >
          <div className="text-center max-w-3xl">
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold text-sacred-ruby-light mb-6">
              {t.chapter3.title}
            </h2>
            <p className="text-xl sm:text-2xl text-sacred-cream/90 mb-4">
              {t.chapter3.subtitle}
            </p>
            <p className="text-lg text-sacred-cream/60">
              {t.chapter3.detail}
            </p>
          </div>
        </div>

        {/* CHAPTER 4 - Hope in Tunisia */}
        <div
          className="absolute inset-0 flex items-center justify-center px-6 transition-all duration-500"
          style={{ opacity: getChapterOpacity(0.6, 0.85) }}
        >
          <div className="text-center max-w-4xl">
            {/* Ibrahim's photo with glow */}
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 rounded-full bg-sacred-gold/40 blur-2xl scale-125 animate-pulse" />
              <div className="relative w-40 h-40 sm:w-56 sm:h-56 rounded-full border-4 border-sacred-gold overflow-hidden shadow-2xl">
                <img
                  src="/images/ibrahim-headshot.jpg"
                  alt="Ibrahim Ali"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: "50% 25%" }}
                />
              </div>
            </div>
            <h2 className="text-4xl sm:text-6xl font-bold text-white mb-4">
              {t.chapter4.title}
            </h2>
            <p className="text-xl sm:text-2xl text-sacred-cream/90 mb-8">
              {t.chapter4.subtitle}
            </p>
            <div className="inline-block px-8 py-4 rounded-2xl bg-sacred-gold text-sacred-night font-bold text-2xl sm:text-3xl shadow-lg glow-pulse">
              {t.chapter4.cta}
            </div>
          </div>
        </div>

        {/* FINAL - Hadith & CTA */}
        <div
          className="absolute inset-0 flex items-center justify-center px-6 transition-all duration-500"
          style={{ opacity: getChapterOpacity(0.8, 1.0) }}
        >
          <div className="text-center max-w-3xl">
            <p className="text-2xl sm:text-3xl md:text-4xl text-sacred-gold font-arabic leading-relaxed mb-8">
              "{t.hadith}"
            </p>
            <button
              onClick={() => document.getElementById("solidarity")?.scrollIntoView({ behavior: "smooth" })}
              className="px-10 py-5 rounded-2xl bg-sacred-gold hover:bg-sacred-gold-warm text-sacred-night font-bold text-xl transition-all hover:scale-105 shadow-2xl"
            >
              {lang === "ar" ? "انضم للرحلة" : "Join The Journey"}
            </button>
          </div>
        </div>

        {/* Scroll progress indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
          <div
            className="h-full bg-sacred-gold transition-all duration-100"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
      </div>

      {/* Spacer for scroll */}
      <div className="h-full" />

      {/* Add custom animation keyframe */}
      <style jsx>{`
        @keyframes prayer-burst {
          0% {
            opacity: 1;
            transform: rotate(var(--rotation)) translateY(0);
          }
          100% {
            opacity: 0;
            transform: rotate(var(--rotation)) translateY(-200px);
          }
        }
      `}</style>
    </div>
  )
}
