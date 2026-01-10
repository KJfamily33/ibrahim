"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Heart, Phone, ChevronDown } from "lucide-react"

interface FalconHeroProps {
  lang: "ar" | "en"
}

export function FalconHero({ lang }: FalconHeroProps) {
  const [scrollY, setScrollY] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const content = {
    ar: {
      bismillah: "بسم الله الرحمن الرحيم",
      rumiQuote: "خفقت بجناحيك وريشك، فتحررت من هذا القفص",
      rumiAttrib: "— جلال الدين الرومي",
      pilgrimFalcon: "الصقر الحاج",
      tagline: "رحلة إبراهيم المقدسة",
      subtitle: "عشرون عامًا حلّق فوق الأمة حاملاً رسالة الله",
      subtitle2: "الآن يحتاج الأمة لتحمله",
      name: "إبراهيم علي أبو القاسم",
      founder: "مؤسس islamland.com",
      languages: "١٤٠+ لغة",
      urgent: "حالة طبية عاجلة",
      joinFlight: "انضم للرحلة",
      contact: "تواصل مع إبراهيم",
      scrollDown: "اكتشف قصته",
    },
    en: {
      bismillah: "In the Name of Allah, the Most Gracious, the Most Merciful",
      rumiQuote: "Beating your wings and feathers, you broke free from this cage",
      rumiAttrib: "— Jalal ad-Din Rumi",
      pilgrimFalcon: "The Pilgrim Falcon",
      tagline: "Ibrahim's Sacred Journey",
      subtitle: "For twenty years he soared across the Ummah, carrying Allah's message",
      subtitle2: "Now the Ummah must carry him",
      name: "Ibrahim Ali Abu Al-Qasim",
      founder: "Founder of islamland.com",
      languages: "140+ Languages",
      urgent: "URGENT MEDICAL CASE",
      joinFlight: "Join the Flight",
      contact: "Contact Ibrahim",
      scrollDown: "Discover His Story",
    },
  }

  const t = content[lang]

  // Generate stars
  const stars = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: `${Math.random() * 3}s`,
    size: Math.random() * 2 + 1,
  }))

  return (
    <section className="relative min-h-screen falcon-sky overflow-hidden">
      {/* Sacred Geometry Background */}
      <div className="absolute inset-0 sacred-geometry opacity-30" />

      {/* Animated Stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {mounted && stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-islamic-gold star-twinkle"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              animationDelay: star.delay,
            }}
          />
        ))}
      </div>

      {/* Crescent Moon */}
      <div
        className="absolute top-20 right-10 sm:right-20 w-32 h-32 opacity-20"
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path
            d="M80,50 A35,35 0 1,1 80,50.01 A28,28 0 1,0 80,50"
            fill="#c9a227"
          />
        </svg>
      </div>

      {/* Falcon Silhouette - Soaring */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 falcon-soar opacity-10"
        style={{ transform: `translateY(${-scrollY * 0.3}px) translateX(-50%)` }}
      >
        <svg viewBox="0 0 200 100" className="w-64 sm:w-96 h-auto">
          <path
            d="M100,20 L60,35 L10,30 L40,45 L5,55 L50,55 L30,70 L60,60 L80,75 L90,55 L100,60 L110,55 L120,75 L140,60 L170,70 L150,55 L195,55 L160,45 L190,30 L140,35 Z"
            fill="#c9a227"
          />
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-16">
        {/* Bismillah */}
        <p className="text-islamic-gold/80 text-center text-sm sm:text-base mb-8 font-arabic-script">
          {t.bismillah}
        </p>

        {/* Rumi Quote */}
        <div className="text-center mb-12">
          <blockquote className="rumi-quote text-xl sm:text-2xl md:text-3xl text-cream-light/90 max-w-3xl mx-auto leading-relaxed">
            "{t.rumiQuote}"
          </blockquote>
          <p className="text-islamic-gold/60 mt-4 text-sm">{t.rumiAttrib}</p>
        </div>

        {/* Title Treatment */}
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1 rounded-full bg-islamic-gold/20 text-islamic-gold text-xs sm:text-sm font-medium mb-4 tracking-wider">
            {t.pilgrimFalcon}
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight">
            {t.tagline}
          </h1>
          <p className="text-lg sm:text-xl text-cream-light/80 max-w-2xl mx-auto mb-2">
            {t.subtitle}
          </p>
          <p className="text-lg sm:text-xl text-islamic-gold font-medium">
            {t.subtitle2}
          </p>
        </div>

        {/* Ibrahim's Image with Heartbeat Effect */}
        <div className="flex justify-center mb-10">
          <div className="relative">
            {/* Outer Glow Ring */}
            <div className="absolute inset-0 rounded-full bg-islamic-gold/20 golden-glow scale-110" />

            {/* Image Container */}
            <div className="relative w-40 h-40 sm:w-52 sm:h-52 rounded-full border-4 border-islamic-gold shadow-2xl overflow-hidden heartbeat">
              <img
                src="/images/ibrahim-headshot.jpg"
                alt={t.name}
                className="w-full h-full object-cover"
                style={{ objectPosition: "50% 25%" }}
              />
            </div>

            {/* Urgent Badge */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-1 rounded-full text-xs font-bold whitespace-nowrap shadow-lg">
              {t.urgent}
            </div>
          </div>
        </div>

        {/* Name & Title */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{t.name}</h2>
          <p className="text-cream-light/70">{t.founder}</p>
          <div className="inline-flex items-center gap-2 mt-2 px-3 py-1 rounded-full bg-white/10 text-sm">
            <span className="text-islamic-gold">{t.languages}</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button
            asChild
            size="lg"
            className="bg-islamic-gold hover:bg-islamic-gold/90 text-islamic-green-dark font-bold text-lg px-8 py-6 golden-glow"
          >
            <a href="#donate">
              <Heart className="h-5 w-5 mr-2" />
              {t.joinFlight}
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white/50 text-white hover:bg-white/10 bg-transparent font-semibold px-8 py-6"
          >
            <a href="#contact">
              <Phone className="h-5 w-5 mr-2" />
              {t.contact}
            </a>
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="text-center animate-bounce">
          <a href="#story" className="inline-flex flex-col items-center text-cream-light/50 hover:text-islamic-gold transition-colors">
            <span className="text-sm mb-2">{t.scrollDown}</span>
            <ChevronDown className="h-6 w-6" />
          </a>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-islamic-green-dark to-transparent" />
    </section>
  )
}
