"use client"

import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, ChevronDown, Globe } from "lucide-react"
import Image from "next/image"

interface FalconHeroProps {
  lang: "ar" | "en"
}

export function FalconHero({ lang }: FalconHeroProps) {
  const content = {
    ar: {
      bismillah: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ",
      title: "امشِ مع إبراهيم",
      subtitle: "الأمة تحمل عالِمها",
      description: "عشرون عامًا خدم الملايين عبر islamland.com — الآن يحتاج جراحة عاجلة لإنقاذ حياته",
      name: "إبراهيم علي أبو القاسم",
      role: "مؤسس islamland.com",
      stat1: "١٤٠+",
      stat1Label: "لغة",
      stat2: "٢٠",
      stat2Label: "عامًا من الخدمة",
      stat3: "ملايين",
      stat3Label: "استفادوا",
      urgent: "حالة عاجلة",
      cta: "ساهم الآن",
      contact: "تواصل معنا",
      scroll: "تعرف على قصته",
    },
    en: {
      bismillah: "In the Name of Allah, the Most Gracious, the Most Merciful",
      title: "Walk With Ibrahim",
      subtitle: "The Ummah Carries Its Scholar",
      description: "20 years serving millions through islamland.com — Now he needs urgent surgery to save his life",
      name: "Ibrahim Ali Abu Al-Qasim",
      role: "Founder of islamland.com",
      stat1: "140+",
      stat1Label: "Languages",
      stat2: "20",
      stat2Label: "Years of Service",
      stat3: "Millions",
      stat3Label: "Lives Touched",
      urgent: "URGENT",
      cta: "Contribute Now",
      contact: "Contact Us",
      scroll: "Discover His Story",
    },
  }

  const t = content[lang]
  const isRTL = lang === "ar"

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#062a1f]">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#041f17] via-[#062a1f] to-[#0a3d2e]" />

      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23c9a227' stroke-width='0.5'%3E%3Cpath d='M30 5l5 10 10-5-5 10 10 5-10 5 5 10-10-5-5 10-5-10-10 5 5-10-10-5 10-5-5-10 10 5z'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Main Content */}
      <div className={`relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-12`} dir={isRTL ? 'rtl' : 'ltr'}>

        {/* Bismillah */}
        <p className="text-[#d4af37] text-center text-base sm:text-lg mb-8 tracking-wide">
          {t.bismillah}
        </p>

        {/* Title Section */}
        <div className="text-center mb-10">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-3 tracking-tight">
            {t.title}
          </h1>
          <p className="text-2xl sm:text-3xl md:text-4xl text-[#d4af37] font-semibold">
            {t.subtitle}
          </p>
        </div>

        {/* Profile Card */}
        <div className="flex justify-center mb-10">
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 max-w-lg w-full border border-[#d4af37]/20 shadow-2xl">

            {/* Photo + Badge */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full border-4 border-[#d4af37] shadow-2xl overflow-hidden bg-white/10">
                  <Image
                    src="/images/ibrahim-headshot.jpg"
                    alt={t.name}
                    width={176}
                    height={176}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: "50% 20%" }}
                    priority
                  />
                </div>
                {/* Urgent Badge */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg animate-pulse">
                  {t.urgent}
                </div>
              </div>
            </div>

            {/* Name & Role */}
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{t.name}</h2>
              <div className="flex items-center justify-center gap-2 text-[#d4af37]">
                <Globe className="w-4 h-4" />
                <span className="text-sm sm:text-base">{t.role}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-[#d4af37]">{t.stat1}</div>
                <div className="text-xs sm:text-sm text-gray-300">{t.stat1Label}</div>
              </div>
              <div className="text-center border-x border-white/10">
                <div className="text-2xl sm:text-3xl font-bold text-[#d4af37]">{t.stat2}</div>
                <div className="text-xs sm:text-sm text-gray-300">{t.stat2Label}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-[#d4af37]">{t.stat3}</div>
                <div className="text-xs sm:text-sm text-gray-300">{t.stat3Label}</div>
              </div>
            </div>

            {/* Description */}
            <p className="text-center text-gray-200 text-sm sm:text-base leading-relaxed mb-6">
              {t.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                asChild
                size="lg"
                className="flex-1 bg-[#d4af37] hover:bg-[#e8c547] text-[#062a1f] font-bold text-base py-6 shadow-lg hover:shadow-xl transition-all"
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
                className="flex-1 border-2 border-white/30 text-white hover:bg-white/10 bg-transparent font-semibold py-6 transition-all"
              >
                <a href="https://wa.me/218916695689" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  {t.contact}
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Hadith Quote */}
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <blockquote className="text-gray-300 text-sm sm:text-base italic leading-relaxed">
            "من نفّس عن مؤمن كربة من كرب الدنيا، نفّس الله عنه كربة من كرب يوم القيامة"
          </blockquote>
          <p className="text-[#d4af37]/70 text-sm mt-2">
            — Prophet Muhammad ﷺ
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="text-center">
          <a
            href="#story"
            className="inline-flex flex-col items-center text-gray-400 hover:text-[#d4af37] transition-colors group"
          >
            <span className="text-sm mb-2 group-hover:translate-y-1 transition-transform">{t.scroll}</span>
            <ChevronDown className="h-6 w-6 animate-bounce" />
          </a>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#062a1f] to-transparent" />
    </section>
  )
}
