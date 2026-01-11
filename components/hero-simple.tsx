"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Heart, ChevronDown } from "lucide-react"

interface HeroSimpleProps {
  lang: "ar" | "en"
}

export function HeroSimple({ lang }: HeroSimpleProps) {
  const [supporters, setSupporters] = useState(1247)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const content = {
    ar: {
      bismillah: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ",
      name: "إبراهيم علي",
      role: "مؤسس islamland.com",
      years: "٢٠ عاماً في خدمة الإسلام",
      needs: "يحتاج عملية جراحية عاجلة",
      goal: "€٢٠,٠٠٠",
      supporters: "مؤمن يدعمونه",
      cta: "ادعم إبراهيم",
      scroll: "اكتشف قصته",
      hadith: "مَنْ نَفَّسَ عَنْ مُؤْمِنٍ كُرْبَةً مِنْ كُرَبِ الدُّنْيَا، نَفَّسَ اللَّهُ عَنْهُ كُرْبَةً مِنْ كُرَبِ يَوْمِ الْقِيَامَةِ",
    },
    en: {
      bismillah: "In the Name of Allah, the Most Gracious, the Most Merciful",
      name: "Ibrahim Ali",
      role: "Founder of islamland.com",
      years: "20 years serving Islam",
      needs: "Needs urgent surgery",
      goal: "€20,000",
      supporters: "believers supporting him",
      cta: "Support Ibrahim",
      scroll: "Discover his story",
      hadith: "Whoever relieves a believer's distress in this world, Allah will relieve his distress on the Day of Resurrection",
    },
  }

  const t = content[lang]

  return (
    <section className="relative min-h-screen flex flex-col bg-[#0a1a14]">
      {/* Simple gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1a14] via-[#0d2818] to-[#0d6b4b]" />

      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30L30 0z' fill='%23ffffff' fill-opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "30px 30px",
        }}
      />

      {/* Content */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-6 py-20">
        {/* Bismillah */}
        <p
          className={`text-[#c9a227] text-lg sm:text-xl mb-10 text-center transition-opacity duration-1000 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
          style={{ fontFamily: "'Amiri', serif" }}
        >
          {t.bismillah}
        </p>

        {/* Photo */}
        <div
          className={`relative mb-8 transition-all duration-1000 delay-200 ${
            mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-4 border-[#c9a227] shadow-xl">
            <img
              src="/images/ibrahim-headshot.jpg"
              alt="Ibrahim Ali"
              className="w-full h-full object-cover"
              style={{ objectPosition: "50% 25%" }}
            />
          </div>
          {/* Subtle glow */}
          <div className="absolute inset-0 rounded-full border-4 border-[#c9a227]/30 scale-110 animate-pulse" />
        </div>

        {/* Name & Role */}
        <div
          className={`text-center mb-6 transition-all duration-1000 delay-300 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
            {t.name}
          </h1>
          <p className="text-[#c9a227] text-lg sm:text-xl">
            {t.role}
          </p>
        </div>

        {/* Years & Need */}
        <div
          className={`text-center mb-8 transition-all duration-1000 delay-400 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p className="text-white/80 text-base sm:text-lg mb-1">
            {t.years}
          </p>
          <p className="text-red-400 text-base sm:text-lg font-medium">
            {t.needs}
          </p>
        </div>

        {/* Goal & Supporters */}
        <div
          className={`flex items-center gap-6 mb-10 transition-all duration-1000 delay-500 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-[#c9a227]">
              {t.goal}
            </div>
            <div className="text-white/85 text-sm">
              needed
            </div>
          </div>
          <div className="w-px h-12 bg-white/20" />
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-white">
              {supporters.toLocaleString()}
            </div>
            <div className="text-white/85 text-sm">
              {t.supporters}
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <Button
          size="lg"
          className={`bg-[#c9a227] hover:bg-[#d4b23a] text-[#0a1a14] font-bold text-lg px-10 py-6 rounded-xl shadow-lg transition-all duration-1000 delay-600 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          onClick={() => document.getElementById("donate")?.scrollIntoView({ behavior: "smooth" })}
        >
          <Heart className="h-5 w-5 mr-2" />
          {t.cta}
        </Button>

        {/* Hadith */}
        <div
          className={`max-w-2xl mx-auto mt-12 px-6 py-5 rounded-xl bg-white/5 border border-white/10 transition-all duration-1000 delay-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p
            className="text-white/80 text-center text-sm sm:text-base leading-relaxed"
            style={{ fontFamily: lang === "ar" ? "'Amiri', serif" : "inherit" }}
          >
            "{t.hadith}"
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-1000 delay-1000 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="text-white/80 text-sm">{t.scroll}</span>
        <ChevronDown className="h-5 w-5 text-[#c9a227] animate-bounce" />
      </div>
    </section>
  )
}
