"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Phone,
  Mail,
  MapPin,
  Heart,
  Globe,
  AlertCircle,
  MessageCircle,
  ExternalLink,
  Star,
  Copy,
  Check,
  CreditCard,
  Building2,
} from "lucide-react"
import { FalconHero } from "@/components/falcon-hero"
import { DocumentGallery } from "@/components/document-gallery"

export default function Home() {
  const [lang, setLang] = useState<"ar" | "en">("en")
  const [scrolled, setScrolled] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const content = {
    ar: {
      storyTitle: "من هو إبراهيم؟",
      storyDesc: "أسس إبراهيم علي موقع islamland.com وخدم الملايين بأكثر من ١٤٠ لغة لمدة ٢٠ عامًا — بدون أجر. الآن يحتاج مساعدتكم.",
      achievements: [
        "أسس islamland.com — ١٤٠+ لغة",
        "٢٠ عامًا من الدعوة بلا مقابل",
        "ملايين المسلمين استفادوا من علمه",
      ],
      medicalTitle: "الحالة الطبية العاجلة",
      medicalDesc: "تم تشخيص إبراهيم بورم كبير في المستقيم يسد المجرى. يحتاج جراحة عاجلة في تونس. البنوك الليبية منهارة — لا يستطيع الوصول لأمواله.",
      diagnosis: "يحتاج €٢٥,٠٠٠ للجراحة والعلاج",
      donateTitle: "ساعده على الشفاء",
      donateDesc: "اختر طريقة التبرع",
      bankTransfer: "تحويل بنكي مباشر",
      bankName: "البنك التونسي العربي",
      accountHolder: "Clinique de la Soukra",
      iban: "TN59 0800 8000 6759 0004 9648",
      copyIban: "نسخ IBAN",
      copied: "تم النسخ!",
      orDonate: "أو تبرع عبر",
      docsTitle: "وثائق موثقة",
      contactTitle: "تواصل مع إبراهيم",
      phone: "الهاتف",
      whatsapp: "واتساب",
      location: "طرابلس، ليبيا",
      footerQuote: "من نفّس عن مؤمن كربة، نفّس الله عنه كربة من كرب يوم القيامة",
    },
    en: {
      storyTitle: "Who is Ibrahim?",
      storyDesc: "Ibrahim Ali founded islamland.com and served millions in 140+ languages for 20 years — unpaid. Now he needs your help.",
      achievements: [
        "Founded islamland.com — 140+ languages",
        "20 years of dawah with no pay",
        "Millions of Muslims benefited",
      ],
      medicalTitle: "Urgent Medical Situation",
      medicalDesc: "Ibrahim has been diagnosed with a large rectal tumor obstructing passage. He needs urgent surgery in Tunisia. Libya's banks have collapsed — he cannot access his own funds.",
      diagnosis: "Needs €25,000 for surgery and treatment",
      donateTitle: "Help Him Heal",
      donateDesc: "Choose how to donate",
      bankTransfer: "Direct Bank Transfer",
      bankName: "Tunisian Arab Bank",
      accountHolder: "Clinique de la Soukra",
      iban: "TN59 0800 8000 6759 0004 9648",
      copyIban: "Copy IBAN",
      copied: "Copied!",
      orDonate: "Or donate via",
      docsTitle: "Verified Documents",
      contactTitle: "Contact Ibrahim",
      phone: "Phone",
      whatsapp: "WhatsApp",
      location: "Tripoli, Libya",
      footerQuote: "Whoever relieves a believer's distress, Allah will relieve his distress on the Day of Resurrection",
    },
  }

  const t = content[lang]
  const isRTL = lang === "ar"

  return (
    <div
      className={`min-h-screen bg-[#faf8f3] ${isRTL ? "font-arabic" : ""}`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Simple Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0a3d30]/95 backdrop-blur-md py-2 shadow-lg"
            : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/images/mainlogo-500.png"
              alt="ibrahim.help"
              className={`rounded-full transition-all ${scrolled ? "h-8 w-8" : "h-10 w-10"}`}
            />
            <span className="font-semibold text-white hidden sm:block">ibrahim.help</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <div className="flex bg-white/10 rounded-full p-0.5">
              <button
                onClick={() => setLang("en")}
                className={`px-3 py-1 rounded-full text-sm transition-all ${
                  lang === "en" ? "bg-[#c9a227] text-[#0a3d30] font-medium" : "text-white/80"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang("ar")}
                className={`px-3 py-1 rounded-full text-sm transition-all ${
                  lang === "ar" ? "bg-[#c9a227] text-[#0a3d30] font-medium" : "text-white/80"
                }`}
              >
                عربي
              </button>
            </div>

            <a
              href="https://islamland.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-[#c9a227] transition-colors"
            >
              <Globe className="h-5 w-5" />
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <FalconHero lang={lang} />

      {/* Story Section */}
      <section id="story" className="py-16 sm:py-24 bg-[#faf8f3]">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className={`text-2xl sm:text-3xl font-bold text-[#0a3d30] mb-6 text-center ${isRTL ? "font-arabic" : ""}`}>
            {t.storyTitle}
          </h2>
          <p className={`text-gray-700 text-lg leading-relaxed mb-8 text-center ${isRTL ? "font-arabic" : ""}`}>
            {t.storyDesc}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {t.achievements.map((item, i) => (
              <div key={i} className="flex items-center gap-2 bg-[#0a3d30]/5 px-4 py-2 rounded-full">
                <Star className="h-4 w-4 text-[#c9a227]" />
                <span className={`text-sm text-gray-700 ${isRTL ? "font-arabic" : ""}`}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Medical Urgency */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-[#faf8f3] to-[#f5f0e8]">
        <div className="max-w-3xl mx-auto px-4">
          <Card className="border-0 shadow-xl overflow-hidden bg-white">
            <div className="h-1 bg-gradient-to-r from-red-600 via-red-500 to-red-600" />
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h2 className={`text-xl sm:text-2xl font-bold text-red-700 mb-2 ${isRTL ? "font-arabic" : ""}`}>
                    {t.medicalTitle}
                  </h2>
                  <p className={`text-gray-700 leading-relaxed ${isRTL ? "font-arabic" : ""}`}>
                    {t.medicalDesc}
                  </p>
                </div>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                <p className={`text-red-700 font-semibold text-lg ${isRTL ? "font-arabic" : ""}`}>
                  {t.diagnosis}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* DONATE - The Main Event */}
      <section id="donate" className="py-16 sm:py-24 bg-[#0a3d30]">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-10">
            <Heart className="h-10 w-10 text-[#c9a227] mx-auto mb-4" />
            <h2 className={`text-2xl sm:text-3xl font-bold text-white mb-2 ${isRTL ? "font-arabic" : ""}`}>
              {t.donateTitle}
            </h2>
            <p className={`text-white/70 ${isRTL ? "font-arabic" : ""}`}>{t.donateDesc}</p>
          </div>

          {/* Bank Transfer - Primary */}
          <Card className="border-0 shadow-2xl mb-8 overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-[#c9a227] via-[#e8c547] to-[#c9a227]" />
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <Building2 className="h-6 w-6 text-[#0a3d30]" />
                <h3 className={`text-lg font-semibold text-[#0a3d30] ${isRTL ? "font-arabic" : ""}`}>
                  {t.bankTransfer}
                </h3>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-500 text-sm">Bank</span>
                  <span className="font-medium">{t.bankName}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-500 text-sm">Account</span>
                  <span className="font-medium">{t.accountHolder}</span>
                </div>
                <div className="py-3">
                  <span className="text-gray-500 text-sm block mb-2">IBAN</span>
                  <div className="flex items-center gap-2 bg-[#0a3d30]/5 p-3 rounded-lg">
                    <code className="flex-1 text-[#0a3d30] font-mono text-sm sm:text-base break-all">
                      {t.iban}
                    </code>
                    <button
                      onClick={() => copyToClipboard("TN5908008000675900049648", "iban")}
                      className="flex-shrink-0 p-2 bg-[#c9a227] hover:bg-[#d4af37] rounded-lg transition-colors"
                    >
                      {copied === "iban" ? (
                        <Check className="h-5 w-5 text-white" />
                      ) : (
                        <Copy className="h-5 w-5 text-white" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Alternative Payment Methods */}
          <div className="text-center mb-6">
            <span className={`text-white/60 text-sm ${isRTL ? "font-arabic" : ""}`}>{t.orDonate}</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <a
              href="https://www.paypal.com/paypalme/ibrahimali"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#0070ba] hover:bg-[#005ea6] text-white py-4 px-6 rounded-xl font-medium transition-colors"
            >
              <CreditCard className="h-5 w-5" />
              PayPal
            </a>
            <a
              href="https://wa.me/218916695689?text=I%20want%20to%20help%20Ibrahim"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white py-4 px-6 rounded-xl font-medium transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Documents */}
      <section id="documents" className="py-16 sm:py-24 bg-[#f5f0e8]">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className={`text-2xl sm:text-3xl font-bold text-[#0a3d30] mb-8 text-center ${isRTL ? "font-arabic" : ""}`}>
            {t.docsTitle}
          </h2>
          <DocumentGallery lang={lang} />
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 sm:py-24 bg-[#0a3d30]">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className={`text-2xl sm:text-3xl font-bold text-white mb-8 text-center ${isRTL ? "font-arabic" : ""}`}>
            {t.contactTitle}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href="tel:+218916695689"
              className="flex items-center gap-4 bg-white/10 hover:bg-white/15 p-5 rounded-xl transition-colors"
            >
              <Phone className="h-6 w-6 text-[#c9a227]" />
              <div>
                <p className={`text-white/60 text-sm ${isRTL ? "font-arabic" : ""}`}>{t.phone}</p>
                <p className="text-white font-medium" dir="ltr">+218 91-669-5689</p>
              </div>
            </a>

            <a
              href="https://wa.me/218916695689"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-white/10 hover:bg-white/15 p-5 rounded-xl transition-colors"
            >
              <MessageCircle className="h-6 w-6 text-[#c9a227]" />
              <div>
                <p className={`text-white/60 text-sm ${isRTL ? "font-arabic" : ""}`}>{t.whatsapp}</p>
                <p className="text-white font-medium" dir="ltr">+218 91-669-5689</p>
              </div>
            </a>

            <a
              href="mailto:Abraabre731@gmail.com"
              className="flex items-center gap-4 bg-white/10 hover:bg-white/15 p-5 rounded-xl transition-colors"
            >
              <Mail className="h-6 w-6 text-[#c9a227]" />
              <div>
                <p className="text-white/60 text-sm">Email</p>
                <p className="text-white font-medium text-sm">Abraabre731@gmail.com</p>
              </div>
            </a>

            <div className="flex items-center gap-4 bg-white/10 p-5 rounded-xl">
              <MapPin className="h-6 w-6 text-[#c9a227]" />
              <div>
                <p className="text-white/60 text-sm">Location</p>
                <p className={`text-white font-medium ${isRTL ? "font-arabic" : ""}`}>{t.location}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#052a20] py-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className={`text-[#c9a227]/80 text-lg mb-6 italic ${isRTL ? "font-arabic not-italic" : ""}`}>
            "{t.footerQuote}"
          </p>
          <p className="text-white/40 text-sm">— Sahih Muslim</p>

          <div className="flex items-center justify-center gap-4 mt-8 text-white/40 text-sm">
            <span>ibrahim.help</span>
            <span>•</span>
            <a
              href="https://islamland.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#c9a227] flex items-center gap-1 transition-colors"
            >
              islamland.com <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
