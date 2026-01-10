"use client"

import { useState } from "react"
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
} from "lucide-react"
import { ShareButtons } from "@/components/share-buttons"
import { DonationOptions } from "@/components/donation-options"
import { DocumentGallery } from "@/components/document-gallery"
import { TasbihCounter } from "@/components/tasbih-counter"
import { JourneyMap } from "@/components/journey-map"
import { DuaCircle } from "@/components/dua-circle"
import { SolidarityDashboard } from "@/components/solidarity-dashboard"
import { PrayerTimes } from "@/components/prayer-times"
import { PilgrimageCarriers } from "@/components/pilgrimage-carriers"
import { SponsorGrid } from "@/components/sponsor-grid"

export default function Home() {
  const [lang, setLang] = useState<"ar" | "en">("ar")

  const content = {
    ar: {
      bismillah: "بسم الله الرحمن الرحيم",
      urgent: "حالة طبية عاجلة",
      heroTitle: "إبراهيم علي أبو القاسم",
      heroSubtitle: "مؤسس موقع islamland.com",
      heroDesc: "20+ سنة في خدمة الأمة الإسلامية بالدعوة والتعليم",
      contactTitle: "تواصل مباشرة",
      shareTitle: "شارك قصته",
      aboutTitle: "من هو إبراهيم؟",
      aboutDesc:
        "إبراهيم علي عالم إسلامي ليبي أسس موقع islamland.com - وهي منصة تعليمية إسلامية شاملة تخدم 140+ لغة، تقدم محتوى إسلامي أصيل للمسلمين حول العالم. لأكثر من عقدين، كرّس حياته للدعوة الإسلامية دون أي مقابل مادي.",
      medicalTitle: "الحالة الطبية",
      medicalDesc:
        "تم تشخيص إبراهيم بورم كبير في المستقيم يسد المجرى بشكل شبه كامل. يحتاج إلى جراحة عاجلة لإنقاذ حياته. الموارد الطبية في ليبيا محدودة، وبسبب أزمة السيولة المصرفية، لا يستطيع الوصول إلى أمواله الخاصة للعلاج في الخارج.",
      achievementsTitle: "إنجازاته",
      achievements: [
        "أسس islamland.com بـ 140+ لغة",
        "شارك في تأليف كتب مع د. منقذ السقار",
        "خدم عقودين في الدعوة الإسلامية",
        "أثر إيجابي على ملايين المسلمين عالمياً",
      ],
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
      visitIslamland: "زر islamland.com",
      footerText: "ندعو الله أن يشفي إبراهيم ويجزي كل من ساعده خير الجزاء",
      madeWith: "صُنع بمحبة لأخينا إبراهيم",
      prayerRequest: "اللهم اشفه وعافه",
    },
    en: {
      bismillah: "In the Name of Allah, the Most Gracious, the Most Merciful",
      urgent: "URGENT MEDICAL CASE",
      heroTitle: "Ibrahim Ali Abu Al-Qasim",
      heroSubtitle: "Founder of islamland.com",
      heroDesc: "20+ years serving the Muslim Ummah through dawah and education",
      contactTitle: "Contact Directly",
      shareTitle: "Share His Story",
      aboutTitle: "Who is Ibrahim?",
      aboutDesc:
        "Ibrahim Ali is a Libyan Islamic scholar who founded islamland.com - a comprehensive Islamic educational platform serving 140+ languages, providing authentic Islamic content to Muslims worldwide. For over two decades, he has dedicated his life to Islamic dawah without any financial compensation.",
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
      visitIslamland: "Visit islamland.com",
      footerText: "May Allah heal Ibrahim and reward everyone who helps him",
      madeWith: "Made with love for our brother Ibrahim",
      prayerRequest: "O Allah, heal and cure him",
    },
  }

  const t = content[lang]

  return (
    <div
      className={`min-h-screen bg-cream ${lang === "ar" ? "font-arabic" : "font-sans"}`}
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <header className="bg-islamic-green text-white py-3 px-4 sticky top-0 z-50 shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-shrink-0">
            <img src="/images/mainlogo-500.png" alt="ibrahim.help" className="h-10 w-10 rounded-full" />
            <span className="font-bold text-lg hidden sm:block">ibrahim.help</span>
          </div>

          {/* Language Toggle - integrated in header */}
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex gap-1 bg-white/10 rounded-full p-1">
              <button
                onClick={() => setLang("en")}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                  lang === "en" ? "bg-islamic-gold text-islamic-green-dark" : "text-white/80 hover:text-white"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang("ar")}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                  lang === "ar" ? "bg-islamic-gold text-islamic-green-dark" : "text-white/80 hover:text-white"
                }`}
              >
                عربي
              </button>
            </div>

            <a
              href="https://islamland.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm hover:text-islamic-gold transition-colors"
            >
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline">{t.visitIslamland}</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section with proper 8-point Islamic star pattern */}
      <section className="relative bg-gradient-to-b from-islamic-green to-islamic-green-dark text-white py-12 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="islamic-star" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                {/* 8-point Islamic star */}
                <g fill="white" fillOpacity="0.5">
                  <polygon points="40,5 45,25 65,20 50,35 65,50 45,45 40,65 35,45 15,50 30,35 15,20 35,25" />
                </g>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#islamic-star)" />
          </svg>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-cream-light text-base sm:text-lg mb-6 font-arabic">{t.bismillah}</p>

          <div className="mb-8">
            <div className="relative inline-block">
              <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full border-4 border-islamic-gold shadow-xl mx-auto overflow-hidden bg-gray-200">
                <img
                  src="/images/ibrahim-headshot.jpg"
                  alt="Ibrahim Ali Abu Al-Qasim"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: "50% 25%" }}
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-islamic-gold text-islamic-green-dark rounded-full p-2 shadow-lg">
                <Heart className="h-5 w-5" />
              </div>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 bg-islamic-gold text-islamic-green-dark px-4 py-2 rounded-full font-semibold text-sm mb-6">
            <AlertCircle className="h-4 w-4" />
            {t.urgent}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-balance">{t.heroTitle}</h1>
          <p className="text-lg sm:text-xl text-cream-light mb-2">{t.heroSubtitle}</p>
          <p className="text-base sm:text-lg text-cream-light/80 mb-8">{t.heroDesc}</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-islamic-gold hover:bg-islamic-gold/90 text-islamic-green-dark font-semibold"
            >
              <a href="#contact">
                <Phone className="h-5 w-5 mr-2" />
                {t.contactTitle}
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 bg-transparent"
            >
              <a href="#share">
                <Heart className="h-5 w-5 mr-2" />
                {t.shareTitle}
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Solidarity Dashboard */}
      <SolidarityDashboard lang={lang} />

      {/* Tasbih Counter */}
      <section id="tasbih">
        <TasbihCounter lang={lang} />
      </section>

      {/* Prayer Times */}
      <PrayerTimes lang={lang} />

      {/* Journey Map */}
      <JourneyMap lang={lang} />

      {/* About Section */}
      <section className="py-12 sm:py-16 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-islamic-green/20 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl sm:text-3xl text-islamic-green flex items-center gap-3">
                <Users className="h-7 w-7 text-islamic-gold" />
                {t.aboutTitle}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-6">{t.aboutDesc}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {t.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-islamic-green/5 rounded-lg">
                    <div className="flex-shrink-0 w-8 h-8 bg-islamic-gold/20 rounded-full flex items-center justify-center">
                      <span className="text-islamic-gold font-bold text-sm">{index + 1}</span>
                    </div>
                    <p className="text-gray-700 text-sm">{achievement}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Medical Condition */}
      <section className="py-12 sm:py-16 bg-cream-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-red-200 bg-red-50/50 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl sm:text-3xl text-red-700 flex items-center gap-3">
                <AlertCircle className="h-7 w-7" />
                {t.medicalTitle}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed text-base sm:text-lg">{t.medicalDesc}</p>
              <div className="mt-6 p-4 bg-white rounded-lg border border-red-200">
                <p className="text-sm text-gray-600 font-medium mb-2">
                  {lang === "ar" ? "التشخيص الطبي:" : "Medical Diagnosis:"}
                </p>
                <p className="text-gray-800">
                  {lang === "ar"
                    ? "ورم فطري كبير في المستقيم على بُعد 8 سم من فتحة الشرج، يسد المجرى بشكل شبه كامل. يحتاج إلى تدخل جراحي عاجل."
                    : "Large fungating tumor mass in rectum at 8cm from anal verge, nearly obstructing the lumen. Scope couldn't pass further. Requires urgent surgical intervention."}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Documents Section */}
      <section className="py-12 sm:py-16 bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-islamic-green flex items-center justify-center gap-3">
              <FileText className="h-7 w-7 text-islamic-gold" />
              {t.documentsTitle}
            </h2>
            <p className="text-gray-600 mt-2">{t.documentsDesc}</p>
          </div>
          <DocumentGallery lang={lang} />
        </div>
      </section>

      {/* Sponsor Grid */}
      <SponsorGrid lang={lang} />

      {/* Donation Options */}
      <section className="py-12 sm:py-16 bg-cream-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <DonationOptions lang={lang} />
        </div>
      </section>

      {/* Dua Circle */}
      <DuaCircle lang={lang} />

      {/* Pilgrimage Carriers */}
      <PilgrimageCarriers lang={lang} />

      {/* Contact Section */}
      <section id="contact" className="py-12 sm:py-16 bg-islamic-green text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">{t.contactSectionTitle}</h2>

          <Card className="bg-white/10 border-white/20 text-white">
            <CardContent className="p-6 sm:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Phone */}
                <div className="flex items-center gap-4 p-4 bg-white/10 rounded-lg">
                  <div className="flex-shrink-0 w-12 h-12 bg-islamic-gold rounded-full flex items-center justify-center">
                    <Phone className="h-6 w-6 text-islamic-green-dark" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-cream-light">{t.phone}</p>
                    <p className="font-bold text-lg" dir="ltr">
                      +218 91-669-5689
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-4 p-4 bg-white/10 rounded-lg">
                  <div className="flex-shrink-0 w-12 h-12 bg-islamic-gold rounded-full flex items-center justify-center">
                    <Mail className="h-6 w-6 text-islamic-green-dark" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-cream-light">{t.email}</p>
                    <p className="font-bold text-base sm:text-lg break-all">Abraabre731@gmail.com</p>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-center gap-4 p-4 bg-white/10 rounded-lg">
                  <div className="flex-shrink-0 w-12 h-12 bg-islamic-gold rounded-full flex items-center justify-center">
                    <MessageCircle className="h-6 w-6 text-islamic-green-dark" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-cream-light">{t.whatsapp}</p>
                    <p className="font-bold text-lg" dir="ltr">
                      +218 91-669-5689
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-4 p-4 bg-white/10 rounded-lg">
                  <div className="flex-shrink-0 w-12 h-12 bg-islamic-gold rounded-full flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-islamic-green-dark" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-cream-light">{t.location}</p>
                    <p className="font-bold text-lg">{t.locationValue}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                <Button
                  asChild
                  size="lg"
                  className="bg-islamic-gold hover:bg-islamic-gold/90 text-islamic-green-dark font-semibold"
                >
                  <a href="tel:+218916695689">
                    <Phone className="h-5 w-5 mr-2" />
                    {t.callNow}
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="bg-islamic-gold hover:bg-islamic-gold/90 text-islamic-green-dark font-semibold"
                >
                  <a href="mailto:Abraabre731@gmail.com">
                    <Mail className="h-5 w-5 mr-2" />
                    {t.sendEmail}
                  </a>
                </Button>
                <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white font-semibold">
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
      <section id="share" className="py-12 sm:py-16 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-islamic-green text-center mb-8">{t.shareTitle}</h2>
          <ShareButtons lang={lang} />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-islamic-green-dark text-white py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-cream-light mb-2 font-arabic text-lg">{t.prayerRequest}</p>
          <p className="text-cream-light/80 text-sm mb-4">{t.footerText}</p>
          <div className="flex items-center justify-center gap-4 text-cream-light/60 text-sm">
            <span>{t.madeWith}</span>
            <span>•</span>
            <a
              href="https://islamland.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-islamic-gold flex items-center gap-1"
            >
              islamland.com <ExternalLink className="h-3 w-3" />
            </a>
          </div>
          <p className="text-cream-light/40 text-xs mt-4">ibrahim.help</p>
        </div>
      </footer>
    </div>
  )
}
