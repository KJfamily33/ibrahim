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
    <section className="relative min-h-screen overflow-hidden bg-islamic-green-deep">
      {/* Gradient Background with depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#031f15] via-islamic-green-dark to-islamic-green" />

      {/* Radial glow from center */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-islamic-gold/5 via-transparent to-transparent" />

      {/* Subtle geometric pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0 sacred-geometry" />
      </div>

      {/* Animated golden particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-islamic-gold rounded-full opacity-40"
            style={{
              left: `${15 + i * 15}%`,
              animation: `float-up ${15 + i * 3}s linear infinite`,
              animationDelay: `${i * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className={`relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 pb-16`} dir={isRTL ? 'rtl' : 'ltr'}>

        {/* Bismillah */}
        <p className="text-islamic-gold text-center text-lg sm:text-xl mb-10 tracking-wide font-arabic-script animate-fade-in-up">
          {t.bismillah}
        </p>

        {/* Title Section */}
        <div className="text-center mb-12 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-4 tracking-tight leading-[0.9]">
            {t.title}
          </h1>
          <p className="text-2xl sm:text-3xl md:text-4xl text-islamic-gold font-display font-semibold">
            {t.subtitle}
          </p>
        </div>

        {/* Profile Card */}
        <div className="flex justify-center mb-12 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <div className="luminous-card rounded-3xl p-8 sm:p-10 max-w-lg w-full">

            {/* Photo + Badge */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full border-4 border-islamic-gold shadow-2xl overflow-hidden bg-white/10 gold-glow">
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
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-red-600 text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg heartbeat">
                  {t.urgent}
                </div>
              </div>
            </div>

            {/* Name & Role */}
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 font-display">{t.name}</h2>
              <div className="flex items-center justify-center gap-2 text-islamic-gold">
                <Globe className="w-4 h-4" />
                <span className="text-base">{t.role}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center p-3 rounded-xl bg-white/5">
                <div className="text-2xl sm:text-3xl font-bold text-islamic-gold font-display">{t.stat1}</div>
                <div className="text-xs sm:text-sm text-cream/80 mt-1">{t.stat1Label}</div>
              </div>
              <div className="text-center p-3 rounded-xl bg-white/5 border-x border-white/10">
                <div className="text-2xl sm:text-3xl font-bold text-islamic-gold font-display">{t.stat2}</div>
                <div className="text-xs sm:text-sm text-cream/80 mt-1">{t.stat2Label}</div>
              </div>
              <div className="text-center p-3 rounded-xl bg-white/5">
                <div className="text-2xl sm:text-3xl font-bold text-islamic-gold font-display">{t.stat3}</div>
                <div className="text-xs sm:text-sm text-cream/80 mt-1">{t.stat3Label}</div>
              </div>
            </div>

            {/* Description */}
            <p className="text-center text-cream/90 text-base sm:text-lg leading-relaxed mb-8">
              {t.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="flex-1 bg-islamic-gold hover:bg-islamic-gold-light text-islamic-green-dark font-bold text-base py-7 shadow-lg gold-glow transition-all hover:scale-[1.02]"
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
                className="flex-1 border-2 border-cream/30 text-cream hover:bg-white/10 bg-transparent font-semibold py-7 transition-all hover:border-cream/50"
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
        <div className="text-center mb-12 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          <blockquote className="text-cream/90 text-base sm:text-lg leading-relaxed sacred-text">
            "من نفّس عن مؤمن كربة من كرب الدنيا، نفّس الله عنه كربة من كرب يوم القيامة"
          </blockquote>
          <p className="text-islamic-gold/80 text-sm mt-3 font-display">
            — Prophet Muhammad ﷺ
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="text-center animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          <a
            href="#story"
            className="inline-flex flex-col items-center text-cream/70 hover:text-islamic-gold transition-colors group"
          >
            <span className="text-sm mb-2 group-hover:translate-y-1 transition-transform">{t.scroll}</span>
            <ChevronDown className="h-6 w-6 animate-bounce" />
          </a>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream to-transparent" />
    </section>
  )
}
