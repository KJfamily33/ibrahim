"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"

interface HeroPureProps {
  lang: "ar" | "en"
}

export function HeroPure({ lang }: HeroPureProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const content = {
    ar: {
      bismillah: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ",
      name: "إبراهيم علي",
      title: "خادم الإسلام",
      service: "٢٠ عاماً يعلّم المسلمين عبر العالم من خلال islamland.com",
      need: "يحتاج مساعدتكم للعلاج",
      cta: "ساهم في شفائه",
      hadith: "مَنْ فَرَّجَ عَنْ مُسْلِمٍ كُرْبَةً فَرَّجَ اللَّهُ عَنْهُ كُرْبَةً مِنْ كُرَبِ يَوْمِ الْقِيَامَةِ",
      source: "— رواه مسلم",
    },
    en: {
      bismillah: "In the Name of Allah, the Most Gracious, the Most Merciful",
      name: "Ibrahim Ali",
      title: "Servant of Islam",
      service: "20 years teaching Muslims worldwide through islamland.com",
      need: "Needs your help for treatment",
      cta: "Help Him Heal",
      hadith: "Whoever relieves a Muslim of a hardship, Allah will relieve him of a hardship on the Day of Resurrection",
      source: "— Sahih Muslim",
    },
  }

  const t = content[lang]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Deep, peaceful background */}
      <div className="absolute inset-0 bg-[#071912]" />

      {/* Subtle radial light from center - like divine light */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 50% 30%, rgba(13, 107, 75, 0.15) 0%, transparent 60%)",
        }}
      />

      {/* Geometric pattern - very subtle */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23c9a227'%3E%3Cpath d='M40 0L50 30L80 40L50 50L40 80L30 50L0 40L30 30L40 0z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 py-20 text-center">
        {/* Bismillah - the crown */}
        <div
          className={`mb-16 transition-all duration-1000 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
        >
          <p
            className="text-[#c9a227] text-2xl sm:text-3xl md:text-4xl leading-relaxed"
            style={{
              fontFamily: "'Amiri', serif",
              letterSpacing: "0.05em",
            }}
          >
            {t.bismillah}
          </p>
          {/* Decorative line */}
          <div className="mt-6 mx-auto w-24 h-px bg-gradient-to-r from-transparent via-[#c9a227]/50 to-transparent" />
        </div>

        {/* Portrait */}
        <div
          className={`mb-10 transition-all duration-1000 delay-200 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="relative inline-block">
            {/* Outer ring - gold */}
            <div className="absolute -inset-2 rounded-full border border-[#c9a227]/30" />
            {/* Photo */}
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-2 border-[#c9a227]/60">
              <img
                src="/images/ibrahim-headshot.jpg"
                alt="Ibrahim Ali"
                className="w-full h-full object-cover"
                style={{ objectPosition: "50% 25%" }}
              />
            </div>
          </div>
        </div>

        {/* Name */}
        <h1
          className={`text-white text-3xl sm:text-4xl md:text-5xl font-light mb-2 transition-all duration-1000 delay-300 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
          style={{ letterSpacing: "0.1em" }}
        >
          {t.name}
        </h1>

        {/* Title */}
        <p
          className={`text-[#c9a227] text-lg sm:text-xl mb-8 transition-all duration-1000 delay-400 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
        >
          {t.title}
        </p>

        {/* Service description */}
        <p
          className={`text-white/70 text-base sm:text-lg max-w-xl mx-auto mb-4 leading-relaxed transition-all duration-1000 delay-500 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
        >
          {t.service}
        </p>

        {/* Need */}
        <p
          className={`text-white/90 text-lg sm:text-xl mb-10 transition-all duration-1000 delay-600 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
        >
          {t.need}
        </p>

        {/* CTA */}
        <div
          className={`mb-16 transition-all duration-1000 delay-700 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
        >
          <Button
            size="lg"
            className="bg-[#c9a227] hover:bg-[#b8922a] text-[#071912] font-medium text-base sm:text-lg px-10 py-6 rounded-lg"
            onClick={() => document.getElementById("donate")?.scrollIntoView({ behavior: "smooth" })}
          >
            <Heart className="h-5 w-5 mr-2" />
            {t.cta}
          </Button>
        </div>

        {/* Hadith - the soul */}
        <div
          className={`max-w-2xl mx-auto transition-all duration-1000 delay-1000 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="relative py-8 px-6">
            {/* Quote marks */}
            <div className="absolute top-0 left-0 text-[#c9a227]/20 text-6xl font-serif">"</div>
            <div className="absolute bottom-0 right-0 text-[#c9a227]/20 text-6xl font-serif rotate-180">"</div>

            <p
              className="text-white/80 text-base sm:text-lg md:text-xl leading-relaxed"
              style={{
                fontFamily: lang === "ar" ? "'Amiri', serif" : "inherit",
              }}
            >
              {t.hadith}
            </p>
            <p className="text-[#c9a227]/60 text-sm mt-4">
              {t.source}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0d6b4b] to-transparent" />
    </section>
  )
}
