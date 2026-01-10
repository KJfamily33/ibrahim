"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Heart, Users, ArrowDown } from "lucide-react"

interface SacredHeroProps {
  lang: "ar" | "en"
}

interface PrayerParticle {
  id: number
  x: number
  delay: number
  duration: number
  size: number
}

export function SacredHero({ lang }: SacredHeroProps) {
  const [particles, setParticles] = useState<PrayerParticle[]>([])
  const [supporterCount, setSupporterCount] = useState(1247)
  const [isVisible, setIsVisible] = useState(false)

  const content = {
    ar: {
      bismillah: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ",
      walkWith: "امشِ مع إبراهيم",
      subtitle: "رحلة إيمان من ليبيا إلى الشفاء",
      believers: "مؤمن يسيرون معه",
      joinJourney: "انضم للرحلة",
      learnMore: "اعرف المزيد",
      prayingNow: "يدعون الآن",
      hadith: "مَنْ نَفَّسَ عَنْ مُؤْمِنٍ كُرْبَةً مِنْ كُرَبِ الدُّنْيَا نَفَّسَ اللَّهُ عَنْهُ كُرْبَةً مِنْ كُرَبِ يَوْمِ الْقِيَامَةِ",
      hadithSource: "— صحيح مسلم",
      scrollDown: "اكتشف الرحلة",
    },
    en: {
      bismillah: "In the Name of Allah, the Most Gracious, the Most Merciful",
      walkWith: "Walk With Ibrahim",
      subtitle: "A journey of faith from Libya to healing",
      believers: "believers walking with him",
      joinJourney: "Join This Journey",
      learnMore: "Learn More",
      prayingNow: "praying now",
      hadith: "Whoever relieves a believer's distress in this world, Allah will relieve his distress on the Day of Resurrection",
      hadithSource: "— Sahih Muslim",
      scrollDown: "Discover the journey",
    },
  }

  const t = content[lang]

  // Generate prayer particles
  useEffect(() => {
    const newParticles: PrayerParticle[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 6 + Math.random() * 4,
      size: 2 + Math.random() * 4,
    }))
    setParticles(newParticles)

    // Trigger entrance animation
    setTimeout(() => setIsVisible(true), 100)
  }, [])

  // Simulate live supporter count
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setSupporterCount((prev) => prev + 1)
      }
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const scrollToContent = useCallback(() => {
    document.getElementById("solidarity")?.scrollIntoView({ behavior: "smooth" })
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Nocturnal gradient background */}
      <div className="absolute inset-0 sacred-hero-gradient" />

      {/* Animated stars */}
      <div className="absolute inset-0 sacred-stars opacity-60" />

      {/* Islamic geometric pattern overlay */}
      <div className="absolute inset-0 sacred-pattern opacity-30" />

      {/* Prayer particles rising */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              bottom: "-20px",
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background: `radial-gradient(circle, rgba(201, 162, 39, 0.8) 0%, rgba(201, 162, 39, 0) 70%)`,
              animation: `prayer-rise ${particle.duration}s ease-out infinite`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Bismillah */}
          <p
            className={`bismillah text-sacred-gold-light mb-8 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {t.bismillah}
          </p>

          {/* Profile with sacred glow */}
          <div
            className={`relative inline-block mb-8 transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            {/* Breathing glow ring */}
            <div className="absolute inset-0 rounded-full bg-sacred-gold/30 sacred-breath blur-xl scale-110" />

            {/* Photo container */}
            <div className="relative w-40 h-40 sm:w-52 sm:h-52 rounded-full border-4 border-sacred-gold shadow-2xl overflow-hidden glow-pulse">
              <img
                src="/images/ibrahim-headshot.jpg"
                alt="Ibrahim Ali Abu Al-Qasim"
                className="w-full h-full object-cover"
                style={{ objectPosition: "50% 25%" }}
              />
            </div>

            {/* Heartbeat indicator */}
            <div className="absolute -bottom-2 -right-2 flex items-center gap-2 bg-sacred-night/90 text-white px-3 py-1.5 rounded-full border border-sacred-gold/50 shadow-lg">
              <Heart className="h-4 w-4 text-red-400 animate-pulse" />
              <span className="text-xs font-medium">{t.prayingNow}</span>
            </div>
          </div>

          {/* Main headline */}
          <h1
            className={`text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <span className="text-golden-gradient">{t.walkWith}</span>
          </h1>

          {/* Subtitle */}
          <p
            className={`text-xl sm:text-2xl text-sacred-cream/90 mb-6 transition-all duration-1000 delay-400 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {t.subtitle}
          </p>

          {/* Live supporter count */}
          <div
            className={`flex items-center justify-center gap-3 mb-10 transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="flex -space-x-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-sacred-gold to-sacred-gold-warm border-2 border-sacred-night flex items-center justify-center"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <Users className="h-4 w-4 text-sacred-night" />
                </div>
              ))}
            </div>
            <div className="text-sacred-cream">
              <span className="text-2xl font-bold text-sacred-gold tabular-nums">
                {supporterCount.toLocaleString()}
              </span>
              <span className="text-sm ml-2 opacity-80">{t.believers}</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center mb-12 transition-all duration-1000 delay-600 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Button
              size="lg"
              className="sacred-btn bg-sacred-gold hover:bg-sacred-gold-warm text-sacred-night font-bold px-8 py-6 text-lg shadow-lg"
              onClick={scrollToContent}
            >
              <Heart className="h-5 w-5 mr-2" />
              {t.joinJourney}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-sacred-cream/40 text-sacred-cream hover:bg-sacred-cream/10 px-8 py-6 text-lg bg-transparent"
              asChild
            >
              <a href="#about">{t.learnMore}</a>
            </Button>
          </div>

          {/* Hadith quote */}
          <div
            className={`max-w-2xl mx-auto p-6 rounded-2xl sacred-glass transition-all duration-1000 delay-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <p className={`text-sacred-cream/90 text-base sm:text-lg leading-relaxed ${lang === "ar" ? "font-arabic" : "italic"}`}>
              "{t.hadith}"
            </p>
            <p className="text-sacred-gold text-sm mt-3">{t.hadithSource}</p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer transition-all duration-1000 delay-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        onClick={scrollToContent}
      >
        <span className="text-sacred-cream/60 text-sm">{t.scrollDown}</span>
        <ArrowDown className="h-5 w-5 text-sacred-gold animate-bounce" />
      </div>

      {/* Gradient fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-sacred-emerald to-transparent" />
    </section>
  )
}
