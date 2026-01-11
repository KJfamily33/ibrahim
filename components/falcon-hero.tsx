"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Heart, Phone, ChevronDown } from "lucide-react"
import Image from "next/image"

interface FalconHeroProps {
  lang: "ar" | "en"
}

export function FalconHero({ lang }: FalconHeroProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const content = {
    ar: {
      bismillah: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ",
      title: "امشِ مع إبراهيم",
      subtitle: "الأمة تحمل عالِمها",
      description: "عشرون عامًا خدم الأمة عبر islamland.com — الآن يحتاج عملية جراحية عاجلة",
      name: "إبراهيم علي أبو القاسم",
      founder: "مؤسس islamland.com",
      languages: "١٤٠+ لغة",
      urgent: "حالة طبية عاجلة",
      joinFlight: "انضم للرحلة",
      contact: "تواصل معنا",
      scrollDown: "اكتشف قصته",
      hadith: "من نفّس عن مؤمن كربة من كرب الدنيا، نفّس الله عنه كربة من كرب يوم القيامة",
    },
    en: {
      bismillah: "In the Name of Allah, the Most Gracious, the Most Merciful",
      title: "Walk With Ibrahim",
      subtitle: "The Ummah Carries Its Scholar",
      description: "20 years serving the Ummah through islamland.com — Now he needs urgent surgery",
      name: "Ibrahim Ali Abu Al-Qasim",
      founder: "Founder of islamland.com",
      languages: "140+ Languages",
      urgent: "URGENT MEDICAL",
      joinFlight: "Join the Journey",
      contact: "Contact Us",
      scrollDown: "Discover His Story",
      hadith: "Whoever relieves a believer's distress, Allah will relieve their distress on the Day of Resurrection",
    },
  }

  const t = content[lang]
  const isRTL = lang === "ar"

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Hero Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-journey.png"
          alt="Walk With Ibrahim - Journey from Libya to Tunisia"
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-islamic-green-dark/90" />
      </div>

      {/* Main Content */}
      <div className={`relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 pb-16 ${isRTL ? 'text-right' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>

        {/* Bismillah */}
        <p className="text-islamic-gold/90 text-center text-lg sm:text-xl mb-6 font-medium">
          {t.bismillah}
        </p>

        {/* Main Title */}
        <div className="text-center mb-8">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-4 tracking-tight drop-shadow-2xl">
            {t.title}
          </h1>
          <p className="text-2xl sm:text-3xl md:text-4xl text-islamic-gold font-semibold drop-shadow-lg">
            {t.subtitle}
          </p>
        </div>

        {/* Ibrahim's Photo Card */}
        <div className="flex justify-center mb-8">
          <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 max-w-md w-full border border-white/20 shadow-2xl">
            <div className="flex flex-col items-center">
              {/* Photo */}
              <div className="relative mb-4">
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-islamic-gold shadow-xl overflow-hidden">
                  <Image
                    src="/images/ibrahim-headshot.jpg"
                    alt={t.name}
                    width={160}
                    height={160}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: "50% 25%" }}
                  />
                </div>
                {/* Urgent Badge */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap shadow-lg animate-pulse">
                  {t.urgent}
                </div>
              </div>

              {/* Name & Title */}
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-1 text-center">{t.name}</h2>
              <p className="text-cream-light/80 text-sm mb-2">{t.founder}</p>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-islamic-gold/20 text-sm">
                <span className="text-islamic-gold font-medium">{t.languages}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-center text-lg sm:text-xl text-white/90 max-w-2xl mx-auto mb-8 drop-shadow-lg">
          {t.description}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button
            asChild
            size="lg"
            className="bg-islamic-gold hover:bg-islamic-gold-light text-islamic-green-dark font-bold text-lg px-10 py-7 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
          >
            <a href="#donate">
              <Heart className="h-6 w-6 mr-2" />
              {t.joinFlight}
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-2 border-white text-white hover:bg-white hover:text-islamic-green-dark bg-white/10 backdrop-blur-sm font-semibold px-10 py-7 transition-all"
          >
            <a href="https://wa.me/218916695689" target="_blank" rel="noopener noreferrer">
              <Phone className="h-5 w-5 mr-2" />
              {t.contact}
            </a>
          </Button>
        </div>

        {/* Hadith Quote */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <blockquote className="text-white/80 text-sm sm:text-base italic leading-relaxed px-4">
            "{t.hadith}"
            <footer className="text-islamic-gold/70 mt-2 text-sm not-italic">
              — Prophet Muhammad ﷺ
            </footer>
          </blockquote>
        </div>

        {/* Scroll Indicator */}
        <div className="text-center">
          <a href="#story" className="inline-flex flex-col items-center text-white/60 hover:text-islamic-gold transition-colors animate-bounce">
            <span className="text-sm mb-2">{t.scrollDown}</span>
            <ChevronDown className="h-6 w-6" />
          </a>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a3d2e] to-transparent" />
    </section>
  )
}
