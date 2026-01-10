"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Phone,
  Mail,
  MapPin,
  Heart,
  Globe,
  AlertCircle,
  Users,
  FileText,
  MessageCircle,
  ExternalLink,
  Star,
} from "lucide-react"
import { SacredHero } from "@/components/sacred-hero"
import { SacredJourney } from "@/components/sacred-journey"
import { ShareButtons } from "@/components/share-buttons"
import { DonationOptions } from "@/components/donation-options"
import { DocumentGallery } from "@/components/document-gallery"
import { TasbihCounter } from "@/components/tasbih-counter"
import { DuaCircle } from "@/components/dua-circle"
import { SolidarityDashboard } from "@/components/solidarity-dashboard"
import { PrayerTimes } from "@/components/prayer-times"
import { PilgrimageCarriers } from "@/components/pilgrimage-carriers"
import { SponsorGrid } from "@/components/sponsor-grid"
import { QuranKhatm } from "@/components/quran-khatm"

export default function Home() {
  const [lang, setLang] = useState<"ar" | "en">("ar")
  const [scrolled, setScrolled] = useState(false)

  // Track scroll for header styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const content = {
    ar: {
      aboutTitle: "من هو إبراهيم؟",
      aboutDesc:
        "إبراهيم علي عالم إسلامي ليبي أسس موقع islamland.com — منصة تعليمية إسلامية شاملة تخدم أكثر من 140 لغة، تقدم محتوى إسلامي أصيل للمسلمين حول العالم. لأكثر من عقدين، كرّس حياته للدعوة الإسلامية دون أي مقابل مادي.",
      medicalTitle: "الحالة الطبية",
      medicalDesc:
        "تم تشخيص إبراهيم بورم كبير في المستقيم يسد المجرى بشكل شبه كامل. يحتاج إلى جراحة عاجلة لإنقاذ حياته. الموارد الطبية في ليبيا محدودة، وبسبب أزمة السيولة المصرفية، لا يستطيع الوصول إلى أمواله الخاصة للعلاج في الخارج.",
      achievementsTitle: "إنجازاته",
      achievements: [
        "أسس islamland.com بأكثر من 140 لغة",
        "شارك في تأليف كتب مع د. منقذ السقار",
        "خدم عقودين في الدعوة الإسلامية",
        "أثر إيجابي على ملايين المسلمين عالمياً",
      ],
      diagnosis: "التشخيص الطبي:",
      diagnosisDesc: "ورم فطري كبير في المستقيم على بُعد 8 سم من فتحة الشرج، يسد المجرى بشكل شبه كامل. يحتاج إلى تدخل جراحي عاجل.",
      documentsTitle: "الوثائق الرسمية",
      documentsDesc: "وثائق طبية ورسمية موثقة",
      contactSectionTitle: "تواصل مع إبراهيم مباشرة",
      phone: "الهاتف",
      email: "البريد الإلكتروني",
      whatsapp: "واتساب",
      location: "الموقع",
      locationValue: "طرابلس، ليبيا",
      callNow: "اتصل الآن",
      sendEmail: "أرسل بريد",
      openWhatsApp: "افتح واتساب",
      visitIslamland: "islamland.com",
      shareTitle: "شارك قصته",
      footerText: "ندعو الله أن يشفي إبراهيم ويجزي كل من ساعده خير الجزاء",
      madeWith: "صُنع بمحبة لأخينا إبراهيم",
      prayerRequest: "اللهم اشفه وعافه",
    },
    en: {
      aboutTitle: "Who is Ibrahim?",
      aboutDesc:
        "Ibrahim Ali is a Libyan Islamic scholar who founded islamland.com — a comprehensive Islamic educational platform serving 140+ languages, providing authentic Islamic content to Muslims worldwide. For over two decades, he has dedicated his life to Islamic dawah without any financial compensation.",
      medicalTitle: "Medical Condition",
      medicalDesc:
        "Ibrahim has been diagnosed with a large fungating rectal tumor that is nearly obstructing the lumen. He requires urgent surgery to save his life. Medical resources in Libya are limited, and due to the banking liquidity crisis, he cannot access his own funds for treatment abroad.",
      achievementsTitle: "His Achievements",
      achievements: [
        "Founded islamland.com serving 140+ languages",
        "Co-authored scholarly works with Dr. Munqith Al-Saqqar",
        "Two decades of dedicated Islamic dawah work",
        "Positive impact on millions of Muslims globally",
      ],
      diagnosis: "Medical Diagnosis:",
      diagnosisDesc: "Large fungating tumor mass in rectum at 8cm from anal verge, nearly obstructing the lumen. Scope couldn't pass further. Requires urgent surgical intervention.",
      documentsTitle: "Official Documentation",
      documentsDesc: "Verified medical and official documents",
      contactSectionTitle: "Contact Ibrahim Directly",
      phone: "Phone",
      email: "Email",
      whatsapp: "WhatsApp",
      location: "Location",
      locationValue: "Tripoli, Libya",
      callNow: "Call Now",
      sendEmail: "Send Email",
      openWhatsApp: "Open WhatsApp",
      visitIslamland: "islamland.com",
      shareTitle: "Share His Story",
      footerText: "May Allah heal Ibrahim and reward everyone who helps him",
      madeWith: "Made with love for our brother Ibrahim",
      prayerRequest: "O Allah, heal and cure him",
    },
  }

  const t = content[lang]

  return (
    <div
      className={`min-h-screen bg-sacred-cream ${lang === "ar" ? "font-arabic" : "font-sans"}`}
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      {/* Sacred Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "sacred-header py-2"
            : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="relative">
              <img
                src="/images/mainlogo-500.png"
                alt="ibrahim.help"
                className={`rounded-full transition-all duration-300 ${scrolled ? "h-9 w-9" : "h-11 w-11"}`}
              />
              {!scrolled && (
                <div className="absolute inset-0 rounded-full ring-2 ring-sacred-gold/50 animate-pulse" />
              )}
            </div>
            <span className={`font-bold text-white hidden sm:block transition-all duration-300 ${scrolled ? "text-base" : "text-lg"}`}>
              ibrahim.help
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            {/* Language Toggle */}
            <div className="flex gap-0.5 bg-white/10 backdrop-blur-sm rounded-full p-0.5 border border-white/10">
              <button
                onClick={() => setLang("en")}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  lang === "en"
                    ? "bg-sacred-gold text-sacred-night"
                    : "text-white/80 hover:text-white"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang("ar")}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  lang === "ar"
                    ? "bg-sacred-gold text-sacred-night"
                    : "text-white/80 hover:text-white"
                }`}
              >
                عربي
              </button>
            </div>

            <a
              href="https://islamland.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-white/80 hover:text-sacred-gold transition-colors"
            >
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline">{t.visitIslamland}</span>
            </a>
          </div>
        </div>
      </header>

      {/* Sacred Hero Section */}
      <SacredHero lang={lang} />

      {/* Solidarity Dashboard */}
      <section id="solidarity">
        <SolidarityDashboard lang={lang} />
      </section>

      {/* Sacred Journey Map */}
      <SacredJourney lang={lang} progress={12} />

      {/* Tasbih Counter */}
      <section id="tasbih">
        <TasbihCounter lang={lang} />
      </section>

      {/* Prayer Times */}
      <PrayerTimes lang={lang} />

      {/* About Section */}
      <section id="about" className="py-16 sm:py-24 bg-sacred-cream relative">
        <div className="absolute inset-0 sacred-pattern opacity-30" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="sacred-glass-light overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-sacred-emerald/5 to-sacred-gold/5 border-b border-sacred-emerald/10">
              <CardTitle className="text-2xl sm:text-3xl text-sacred-emerald flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sacred-gold/20 flex items-center justify-center">
                  <Users className="h-5 w-5 text-sacred-gold" />
                </div>
                {t.aboutTitle}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 sm:p-8">
              <p className="text-sacred-night/80 leading-relaxed text-base sm:text-lg mb-8">
                {t.aboutDesc}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {t.achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 bg-gradient-to-r from-sacred-emerald/5 to-transparent rounded-xl border border-sacred-emerald/10 transition-all hover:border-sacred-gold/30 hover:shadow-md"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-sacred-gold rounded-lg flex items-center justify-center shadow-sm">
                      <Star className="h-4 w-4 text-sacred-night" />
                    </div>
                    <p className="text-sacred-night/80 text-sm leading-relaxed">{achievement}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Medical Condition - Urgent */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-sacred-cream to-sacred-cream-warm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-sacred-ruby/30 bg-gradient-to-br from-white to-red-50/50 shadow-xl overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sacred-ruby to-sacred-ruby-light" />
            <CardHeader>
              <CardTitle className="text-2xl sm:text-3xl text-sacred-ruby flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sacred-ruby/10 flex items-center justify-center">
                  <AlertCircle className="h-5 w-5 text-sacred-ruby" />
                </div>
                {t.medicalTitle}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 sm:p-8">
              <p className="text-sacred-night/80 leading-relaxed text-base sm:text-lg mb-6">
                {t.medicalDesc}
              </p>
              <div className="p-5 bg-white rounded-xl border border-sacred-ruby/20 shadow-inner">
                <p className="text-sm text-sacred-ruby font-semibold mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sacred-ruby animate-pulse" />
                  {t.diagnosis}
                </p>
                <p className="text-sacred-night/70 leading-relaxed">
                  {t.diagnosisDesc}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Documents Section */}
      <section className="py-16 sm:py-24 bg-sacred-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-sacred-gold/20 flex items-center justify-center">
                <FileText className="h-5 w-5 text-sacred-gold" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-sacred-emerald">
                {t.documentsTitle}
              </h2>
            </div>
            <p className="text-sacred-night/60">{t.documentsDesc}</p>
          </div>
          <DocumentGallery lang={lang} />
        </div>
      </section>

      {/* Sponsor Grid */}
      <SponsorGrid lang={lang} />

      {/* Donation Options */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-sacred-cream-warm to-sacred-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <DonationOptions lang={lang} />
        </div>
      </section>

      {/* Dua Circle */}
      <DuaCircle lang={lang} />

      {/* Quran Khatm */}
      <QuranKhatm lang={lang} />

      {/* Pilgrimage Carriers */}
      <PilgrimageCarriers lang={lang} />

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-24 bg-gradient-to-b from-sacred-emerald to-sacred-emerald-deep relative overflow-hidden">
        <div className="absolute inset-0 sacred-stars opacity-40" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-10">
            {t.contactSectionTitle}
          </h2>

          <Card className="sacred-glass border-sacred-gold/20 text-white">
            <CardContent className="p-6 sm:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Phone */}
                <div className="flex items-center gap-4 p-5 bg-white/5 rounded-xl border border-white/10 hover:border-sacred-gold/30 transition-all">
                  <div className="flex-shrink-0 w-12 h-12 bg-sacred-gold rounded-xl flex items-center justify-center shadow-lg">
                    <Phone className="h-5 w-5 text-sacred-night" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-sacred-cream/60">{t.phone}</p>
                    <p className="font-bold text-lg" dir="ltr">+218 91-669-5689</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-4 p-5 bg-white/5 rounded-xl border border-white/10 hover:border-sacred-gold/30 transition-all">
                  <div className="flex-shrink-0 w-12 h-12 bg-sacred-gold rounded-xl flex items-center justify-center shadow-lg">
                    <Mail className="h-5 w-5 text-sacred-night" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-sacred-cream/60">{t.email}</p>
                    <p className="font-bold text-base break-all">Abraabre731@gmail.com</p>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-center gap-4 p-5 bg-white/5 rounded-xl border border-white/10 hover:border-sacred-gold/30 transition-all">
                  <div className="flex-shrink-0 w-12 h-12 bg-sacred-gold rounded-xl flex items-center justify-center shadow-lg">
                    <MessageCircle className="h-5 w-5 text-sacred-night" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-sacred-cream/60">{t.whatsapp}</p>
                    <p className="font-bold text-lg" dir="ltr">+218 91-669-5689</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-4 p-5 bg-white/5 rounded-xl border border-white/10 hover:border-sacred-gold/30 transition-all">
                  <div className="flex-shrink-0 w-12 h-12 bg-sacred-gold rounded-xl flex items-center justify-center shadow-lg">
                    <MapPin className="h-5 w-5 text-sacred-night" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-sacred-cream/60">{t.location}</p>
                    <p className="font-bold text-lg">{t.locationValue}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                <Button
                  asChild
                  size="lg"
                  className="sacred-btn bg-sacred-gold hover:bg-sacred-gold-warm text-sacred-night font-semibold shadow-lg"
                >
                  <a href="tel:+218916695689">
                    <Phone className="h-5 w-5 mr-2" />
                    {t.callNow}
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="sacred-btn bg-sacred-gold hover:bg-sacred-gold-warm text-sacred-night font-semibold shadow-lg"
                >
                  <a href="mailto:Abraabre731@gmail.com">
                    <Mail className="h-5 w-5 mr-2" />
                    {t.sendEmail}
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="sacred-btn bg-green-600 hover:bg-green-700 text-white font-semibold shadow-lg"
                >
                  <a href="https://wa.me/218916695689" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    {t.openWhatsApp}
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Share Section */}
      <section id="share" className="py-16 sm:py-24 bg-sacred-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-sacred-emerald text-center mb-10">
            {t.shareTitle}
          </h2>
          <ShareButtons lang={lang} />
        </div>
      </section>

      {/* Sacred Footer */}
      <footer className="bg-sacred-night text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 sacred-stars opacity-30" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Prayer */}
          <p className="bismillah text-sacred-gold mb-4">{t.prayerRequest}</p>
          <p className="text-sacred-cream/70 text-sm mb-6 max-w-md mx-auto">
            {t.footerText}
          </p>

          {/* Links */}
          <div className="flex items-center justify-center gap-6 text-sacred-cream/50 text-sm mb-8">
            <span>{t.madeWith}</span>
            <span className="text-sacred-gold">•</span>
            <a
              href="https://islamland.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sacred-gold flex items-center gap-1 transition-colors"
            >
              islamland.com <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          {/* Sacred divider */}
          <div className="sacred-divider mx-auto mb-6" />

          <p className="text-sacred-cream/30 text-xs">
            ibrahim.help — A journey of faith and healing
          </p>
        </div>
      </footer>
    </div>
  )
}
