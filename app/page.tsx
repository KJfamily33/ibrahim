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
import { FalconHero } from "@/components/falcon-hero"
import { FlightPath } from "@/components/flight-path"
import { FeatherWings } from "@/components/feather-wings"
import { ShareButtons } from "@/components/share-buttons"
import { DonationOptions } from "@/components/donation-options"
import { DocumentGallery } from "@/components/document-gallery"
import { TasbihCounter } from "@/components/tasbih-counter"
import { DuaCircle } from "@/components/dua-circle"
import { SolidarityDashboard } from "@/components/solidarity-dashboard"
import { PilgrimageCarriers } from "@/components/pilgrimage-carriers"
import { SponsorGrid } from "@/components/sponsor-grid"
import { QuranKhatm } from "@/components/quran-khatm"
import { HealingDuas } from "@/components/healing-duas"
import { DirectSponsor } from "@/components/direct-sponsor"
import { JourneySection } from "@/components/journey-section"
import { IslamicDivider } from "@/components/islamic-divider"

export default function Home() {
  const [lang, setLang] = useState<"ar" | "en">("en")
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const content = {
    ar: {
      storyTitle: "قصة الصقر",
      storySubtitle: "رحلة عشرين عامًا في خدمة الأمة",
      aboutTitle: "من هو إبراهيم؟",
      aboutDesc:
        "كالصقر الحر، حلّق إبراهيم علي فوق أمة الإسلام لعقدين من الزمن. أسس موقع islamland.com — منارة تنير طريق الملايين بأكثر من 140 لغة. لم يأخذ درهمًا واحدًا. خدم بقلبه وروحه.",
      aboutQuote: "الآن الصقر يحتاج أجنحة الأمة ليحمله",
      medicalTitle: "الجناح المكسور",
      medicalDesc:
        "تم تشخيص إبراهيم بورم كبير في المستقيم يسد المجرى بشكل شبه كامل. يحتاج إلى جراحة عاجلة لإنقاذ حياته. البنوك الليبية في أزمة — لا يستطيع الوصول حتى إلى أمواله الخاصة.",
      achievements: [
        "أسس islamland.com — ١٤٠+ لغة",
        "شارك في تأليف كتب إسلامية علمية",
        "٢٠ عامًا من الدعوة بلا مقابل",
        "ملايين المسلمين استفادوا من علمه",
      ],
      diagnosis: "التشخيص:",
      diagnosisDesc: "ورم في المستقيم على بُعد ٨ سم، يسد المجرى. يحتاج تدخل جراحي عاجل.",
      documentsTitle: "وثائق موثقة",
      documentsDesc: "كل شيء شفاف ومُثبت",
      contactSectionTitle: "تواصل مع إبراهيم",
      phone: "الهاتف",
      email: "البريد",
      whatsapp: "واتساب",
      location: "الموقع",
      locationValue: "طرابلس، ليبيا",
      callNow: "اتصل الآن",
      sendEmail: "أرسل بريد",
      openWhatsApp: "واتساب",
      visitIslamland: "islamland.com",
      shareTitle: "انشر قصته",
      footerQuote: "اللهم اشفه وعافه واجعل كل من ساعده في ميزان حسناته",
      footerTagline: "رحلة الصقر الحاج",
    },
    en: {
      storyTitle: "The Falcon's Story",
      storySubtitle: "Twenty years soaring in service of the Ummah",
      aboutTitle: "Who is Ibrahim?",
      aboutDesc:
        "Like a free falcon, Ibrahim Ali soared across the Muslim Ummah for two decades. He founded islamland.com — a beacon lighting the way for millions in 140+ languages. He never took a single dirham. He served with his heart and soul.",
      aboutQuote: "Now the falcon needs the Ummah's wings to carry him",
      medicalTitle: "The Broken Wing",
      medicalDesc:
        "Ibrahim has been diagnosed with a large rectal tumor nearly obstructing the passage. He requires urgent surgery to save his life. Libya's banks are in crisis — he cannot even access his own funds.",
      achievements: [
        "Founded islamland.com — 140+ languages",
        "Co-authored Islamic scholarly works",
        "20 years of dawah with no pay",
        "Millions of Muslims benefited from his knowledge",
      ],
      diagnosis: "Diagnosis:",
      diagnosisDesc: "Rectal tumor at 8cm, obstructing passage. Requires urgent surgical intervention.",
      documentsTitle: "Verified Documents",
      documentsDesc: "Everything transparent and verified",
      contactSectionTitle: "Contact Ibrahim",
      phone: "Phone",
      email: "Email",
      whatsapp: "WhatsApp",
      location: "Location",
      locationValue: "Tripoli, Libya",
      callNow: "Call Now",
      sendEmail: "Send Email",
      openWhatsApp: "WhatsApp",
      visitIslamland: "islamland.com",
      shareTitle: "Share His Story",
      footerQuote: "O Allah, heal him and make every helper's deed weigh heavy on their scales",
      footerTagline: "The Pilgrim Falcon's Journey",
    },
  }

  const t = content[lang]

  return (
    <div
      className={`min-h-screen bg-desert-cream ${lang === "ar" ? "font-arabic" : "font-body"}`}
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      {/* Floating Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-sacred-teal-deep/95 backdrop-blur-md py-2 shadow-xl border-b border-royal-gold/10"
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
                <div className="absolute inset-0 rounded-full ring-2 ring-islamic-gold/50 golden-glow" />
              )}
            </div>
            <span className={`font-bold text-white hidden sm:block transition-all duration-300 ${scrolled ? "text-base" : "text-lg"}`}>
              ibrahim.help
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            {/* Language Toggle */}
            <div className="flex gap-0.5 glass-card rounded-full p-0.5">
              <button
                onClick={() => setLang("en")}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  lang === "en"
                    ? "bg-islamic-gold text-islamic-green-dark"
                    : "text-white/80 hover:text-white"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang("ar")}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  lang === "ar"
                    ? "bg-islamic-gold text-islamic-green-dark"
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
              className="flex items-center gap-2 text-sm text-white/80 hover:text-islamic-gold transition-colors"
            >
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline">{t.visitIslamland}</span>
            </a>
          </div>
        </div>
      </header>

      {/* FALCON HERO - The Grand Opening */}
      <FalconHero lang={lang} />

      {/* FLIGHT PATH - The Journey */}
      <FlightPath lang={lang} />

      {/* FEATHER WINGS - Community Support Visualization */}
      <FeatherWings lang={lang} />

      {/* Story Section - He Gave Water */}
      <JourneySection
        id="story"
        headline={{ ar: "أعطى الماء", en: "HE GAVE WATER" }}
        subheadline={{ ar: "عشرون عامًا في خدمة الأمة", en: "Twenty years serving the Ummah" }}
        lang={lang}
        desktopImage="/images/journey/section-story-desktop.jpg"
        mobileImage="/images/journey/section-story-portrait.jpg"
        overlay="dark"
      >
        <Card className="border-0 shadow-2xl overflow-hidden bg-white/95 backdrop-blur-sm rounded-2xl">
          <CardContent className="p-8 sm:p-12">
            <p className={`text-gray-700 leading-relaxed text-lg sm:text-xl mb-10 ${lang === "ar" ? "font-arabic leading-loose" : ""}`}>
              {t.aboutDesc}
            </p>
            <div className="relative py-8 mb-10">
              <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-royal-gold/30 to-transparent" />
              <p className={`relative bg-white px-6 mx-auto w-fit text-royal-gold font-medium text-xl sm:text-2xl text-center ${lang === "ar" ? "font-arabic-display" : "font-display italic"} rumi-quote`}>
                "{t.aboutQuote}"
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {t.achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-5 bg-gradient-to-br from-desert-cream to-desert-sand rounded-xl border border-desert-stone/50 transition-all hover:border-royal-gold/40 hover:shadow-lg group"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-royal-gold to-royal-gold-light rounded-xl flex items-center justify-center shadow-md group-hover:shadow-royal-gold/30">
                    <Star className="h-5 w-5 text-sacred-teal-deep" />
                  </div>
                  <p className={`text-gray-700 ${lang === "ar" ? "font-arabic" : ""}`}>{achievement}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </JourneySection>

      {/* Islamic Divider */}
      <div className="bg-desert-cream">
        <IslamicDivider variant="wave" color="gold" height="md" />
      </div>

      {/* Medical Section - Now He Thirsts */}
      <JourneySection
        id="medical"
        headline={{ ar: "الآن يعطش", en: "NOW HE THIRSTS" }}
        subheadline={{ ar: "المُعطي يحتاج الآن", en: "The giver now needs" }}
        lang={lang}
        desktopImage="/images/journey/section-medical-desktop.jpg"
        mobileImage="/images/journey/section-medical-portrait.jpg"
        overlay="dark"
      >
        <Card className="border-0 bg-white/95 backdrop-blur-sm shadow-2xl overflow-hidden relative rounded-2xl">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 via-red-500 to-red-600" />
          <CardHeader className="pb-2">
            <CardTitle className={`text-2xl sm:text-3xl text-red-700 flex items-center gap-4 ${lang === "ar" ? "font-arabic-display" : "font-display"}`}>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-100 to-red-50 flex items-center justify-center heartbeat shadow-lg shadow-red-100">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              {t.medicalTitle}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 sm:p-10">
            <p className={`text-gray-700 leading-relaxed text-lg sm:text-xl mb-8 ${lang === "ar" ? "font-arabic leading-loose" : ""}`}>
              {t.medicalDesc}
            </p>
            <div className="p-6 bg-gradient-to-br from-red-50 to-white rounded-xl border border-red-200/50 shadow-inner">
              <p className="text-sm text-red-700 font-semibold mb-3 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 heartbeat" />
                {t.diagnosis}
              </p>
              <p className={`text-gray-600 ${lang === "ar" ? "font-arabic" : ""}`}>{t.diagnosisDesc}</p>
            </div>
          </CardContent>
        </Card>
      </JourneySection>

      {/* Islamic Divider */}
      <div className="bg-desert-cream">
        <IslamicDivider variant="geometric" color="teal" height="md" />
      </div>

      {/* Solidarity Dashboard */}
      <SolidarityDashboard lang={lang} />

      {/* Tasbih Counter */}
      <section id="tasbih">
        <TasbihCounter lang={lang} />
      </section>

      {/* Prayer Times removed - was requesting user location */}

      {/* Documents Section - The Trust */}
      <JourneySection
        id="documents"
        headline={{ ar: "الأمانة", en: "THE TRUST" }}
        subheadline={{ ar: "كل شيء موثق وشفاف", en: "Everything documented and transparent" }}
        lang={lang}
        desktopImage="/images/journey/section-docs-desktop.jpg"
        mobileImage="/images/journey/section-docs-portrait.jpg"
        overlay="gradient"
      >
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-2xl">
          <DocumentGallery lang={lang} />
        </div>
      </JourneySection>

      {/* Islamic Divider */}
      <div className="bg-desert-cream">
        <IslamicDivider variant="arabesque" color="gold" height="md" />
      </div>

      {/* Donate Section - Be His Zamzam */}
      <JourneySection
        id="donate"
        headline={{ ar: "كن زمزمه", en: "BE HIS ZAMZAM" }}
        subheadline={{ ar: "كن الماء الذي ينقذه", en: "Be the water that saves him" }}
        lang={lang}
        desktopImage="/images/journey/section-donate-desktop.jpg"
        mobileImage="/images/journey/section-donate-portrait.jpg"
        overlay="dark"
      >
        <SponsorGrid lang={lang} />
      </JourneySection>

      {/* Direct Sponsor - For Major Donors */}
      <DirectSponsor lang={lang} />

      {/* Donation Options */}
      <section className="py-16 sm:py-24 bg-cream-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <DonationOptions lang={lang} />
        </div>
      </section>

      {/* Dua Circle */}
      <DuaCircle lang={lang} />

      {/* Healing Duas */}
      <HealingDuas lang={lang} />

      {/* Quran Khatm */}
      <QuranKhatm lang={lang} />

      {/* Pilgrimage Carriers */}
      <PilgrimageCarriers lang={lang} />

      {/* Contact Section */}
      <section id="contact" className="py-20 sm:py-28 bg-sacred-night relative overflow-hidden">
        <div className="absolute inset-0 sacred-geometry opacity-10" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-white mb-12 ${lang === "ar" ? "font-arabic-display" : "font-display"}`}>
            {t.contactSectionTitle}
          </h2>

          <Card className="luminous-card text-white rounded-2xl">
            <CardContent className="p-8 sm:p-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex items-center gap-4 p-6 bg-white/5 rounded-xl border border-white/10 hover:border-royal-gold/40 transition-all group">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-royal-gold to-royal-gold-light rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-royal-gold/30">
                    <Phone className="h-6 w-6 text-sacred-teal-deep" />
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm text-white/60 ${lang === "ar" ? "font-arabic" : ""}`}>{t.phone}</p>
                    <p className="font-bold text-lg" dir="ltr">+218 91-669-5689</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-6 bg-white/5 rounded-xl border border-white/10 hover:border-royal-gold/40 transition-all group">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-royal-gold to-royal-gold-light rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-royal-gold/30">
                    <Mail className="h-6 w-6 text-sacred-teal-deep" />
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm text-white/60 ${lang === "ar" ? "font-arabic" : ""}`}>{t.email}</p>
                    <p className="font-bold text-base break-all">Abraabre731@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-6 bg-white/5 rounded-xl border border-white/10 hover:border-royal-gold/40 transition-all group">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-royal-gold to-royal-gold-light rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-royal-gold/30">
                    <MessageCircle className="h-6 w-6 text-sacred-teal-deep" />
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm text-white/60 ${lang === "ar" ? "font-arabic" : ""}`}>{t.whatsapp}</p>
                    <p className="font-bold text-lg" dir="ltr">+218 91-669-5689</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-6 bg-white/5 rounded-xl border border-white/10 hover:border-royal-gold/40 transition-all group">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-royal-gold to-royal-gold-light rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-royal-gold/30">
                    <MapPin className="h-6 w-6 text-sacred-teal-deep" />
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm text-white/60 ${lang === "ar" ? "font-arabic" : ""}`}>{t.location}</p>
                    <p className={`font-bold text-lg ${lang === "ar" ? "font-arabic" : ""}`}>{t.locationValue}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
                <Button asChild size="lg" className="bg-gradient-to-r from-royal-gold to-royal-gold-light hover:from-royal-gold-light hover:to-royal-gold text-sacred-teal-deep font-semibold rounded-xl py-6 shadow-lg hover:shadow-royal-gold/30">
                  <a href="tel:+218916695689">
                    <Phone className="h-5 w-5 mr-2" />
                    {t.callNow}
                  </a>
                </Button>
                <Button asChild size="lg" className="bg-gradient-to-r from-royal-gold to-royal-gold-light hover:from-royal-gold-light hover:to-royal-gold text-sacred-teal-deep font-semibold rounded-xl py-6">
                  <a href="mailto:Abraabre731@gmail.com">
                    <Mail className="h-5 w-5 mr-2" />
                    {t.sendEmail}
                  </a>
                </Button>
                <Button asChild size="lg" className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-600 text-white font-semibold rounded-xl py-6">
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

      {/* Share */}
      <section id="share" className="py-20 sm:py-28 bg-desert-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold text-sacred-teal text-center mb-12 ${lang === "ar" ? "font-arabic-display" : "font-display"}`}>
            {t.shareTitle}
          </h2>
          <ShareButtons lang={lang} />
        </div>
      </section>

      {/* Sacred Footer */}
      <footer className="bg-sacred-night text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 sacred-geometry opacity-5" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Decorative Line */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-royal-gold/50" />
            <svg viewBox="0 0 60 40" className="w-12 h-8 text-royal-gold opacity-60">
              <path
                fill="currentColor"
                d="M30,5 L20,12 L5,10 L15,18 L2,22 L18,22 L10,32 L22,25 L30,38 L38,25 L50,32 L42,22 L58,22 L45,18 L55,10 L40,12 Z"
              />
            </svg>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-royal-gold/50" />
          </div>

          <p className={`text-royal-gold text-xl sm:text-2xl mb-6 ${lang === "ar" ? "font-arabic-script" : "font-display italic"} rumi-quote`}>
            {t.footerQuote}
          </p>

          <div className="flex items-center justify-center gap-6 text-white/60 text-sm mb-8">
            <span className={lang === "ar" ? "font-arabic" : ""}>{t.footerTagline}</span>
            <span className="text-royal-gold/50">•</span>
            <a
              href="https://islamland.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-royal-gold flex items-center gap-1.5 transition-colors"
            >
              islamland.com <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          <p className="text-white/40 text-xs tracking-wide">
            ibrahim.help — The Pilgrim Falcon's Journey
          </p>
        </div>
      </footer>
    </div>
  )
}
