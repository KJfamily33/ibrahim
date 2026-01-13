"use client"

import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, ChevronDown } from "lucide-react"

interface FalconHeroProps {
  lang: "ar" | "en"
}

export function FalconHero({ lang }: FalconHeroProps) {
  const content = {
    ar: {
      bismillah: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ",
      subtitle: "الأمة تحمل عالِمها",
      description: "عشرون عامًا خدم الملايين عبر islamland.com — الآن يحتاج جراحة عاجلة في تونس",
      stat1: "١٤٠+",
      stat1Label: "لغة",
      stat2: "٢٠",
      stat2Label: "عامًا",
      stat3: "€٢٥,٠٠٠",
      stat3Label: "الهدف",
      urgent: "حالة طبية عاجلة",
      cta: "ساهم الآن",
      contact: "تواصل واتساب",
      scroll: "اقرأ قصته",
      hadith: "من نفّس عن مؤمن كربة من كرب الدنيا، نفّس الله عنه كربة من كرب يوم القيامة",
    },
    en: {
      bismillah: "In the Name of Allah, the Most Gracious, the Most Merciful",
      subtitle: "The Ummah Carries Its Scholar",
      description: "20 years serving millions through islamland.com — Now he needs urgent surgery in Tunisia",
      stat1: "140+",
      stat1Label: "Languages",
      stat2: "20",
      stat2Label: "Years",
      stat3: "€25,000",
      stat3Label: "Goal",
      urgent: "URGENT MEDICAL CASE",
      cta: "Contribute Now",
      contact: "WhatsApp",
      scroll: "Read His Story",
      hadith: "Whoever relieves a believer's distress, Allah will relieve his distress on the Day of Resurrection",
    },
  }

  const t = content[lang]
  const isRTL = lang === "ar"

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Full Background Image - Desktop */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat hidden sm:block"
        style={{ backgroundImage: "url('/images/hero-main.png')" }}
      />
      {/* Full Background Image - Mobile */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat sm:hidden"
        style={{ backgroundImage: "url('/images/hero-mobile.png')" }}
      />

      {/* Gradient Overlays for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

      {/* Main Content */}
      <div
        className={`relative z-10 min-h-screen flex flex-col justify-end pb-8 sm:pb-16 px-4 sm:px-6 lg:px-8`}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <div className="max-w-4xl mx-auto w-full">

          {/* Bismillah - Top */}
          <p className="text-islamic-gold/90 text-center text-sm sm:text-base mb-6 tracking-wide font-arabic-script">
            {t.bismillah}
          </p>

          {/* Urgent Badge */}
          <div className="flex justify-center mb-6">
            <div className="bg-red-600/90 backdrop-blur-sm text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse">
              {t.urgent}
            </div>
          </div>

          {/* Subtitle */}
          <p className="text-center text-xl sm:text-2xl md:text-3xl text-white/90 font-display mb-4">
            {t.subtitle}
          </p>

          {/* Description */}
          <p className="text-center text-white/80 text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            {t.description}
          </p>

          {/* Stats Row */}
          <div className="flex justify-center gap-6 sm:gap-12 mb-8">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-islamic-gold font-display">{t.stat1}</div>
              <div className="text-xs sm:text-sm text-white/70">{t.stat1Label}</div>
            </div>
            <div className="w-px bg-white/20" />
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-islamic-gold font-display">{t.stat2}</div>
              <div className="text-xs sm:text-sm text-white/70">{t.stat2Label}</div>
            </div>
            <div className="w-px bg-white/20" />
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-islamic-gold font-display">{t.stat3}</div>
              <div className="text-xs sm:text-sm text-white/70">{t.stat3Label}</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto mb-8">
            <Button
              asChild
              size="lg"
              className="flex-1 bg-islamic-gold hover:bg-islamic-gold-light text-islamic-green-dark font-bold text-base py-6 shadow-xl transition-all hover:scale-[1.02]"
            >
              <a href="#donate">
                <Heart className="h-5 w-5 mr-2" />
                {t.cta}
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="flex-1 border-2 border-white/40 text-white hover:bg-white/10 bg-white/5 backdrop-blur-sm font-semibold py-6 transition-all"
            >
              <a href="https://wa.me/218916695689" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5 mr-2" />
                {t.contact}
              </a>
            </Button>
          </div>

          {/* Hadith Quote */}
          <blockquote className="text-center text-white/70 text-sm sm:text-base max-w-xl mx-auto mb-8 italic">
            "{t.hadith}"
            <span className="block text-islamic-gold/70 text-xs mt-2 not-italic">— Prophet Muhammad ﷺ</span>
          </blockquote>

          {/* Scroll Indicator */}
          <div className="text-center">
            <a
              href="#story"
              className="inline-flex flex-col items-center text-white/60 hover:text-islamic-gold transition-colors"
            >
              <span className="text-xs mb-1">{t.scroll}</span>
              <ChevronDown className="h-5 w-5 animate-bounce" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
