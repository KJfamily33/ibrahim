"use client"

import { useState, useEffect, useRef } from "react"
import { Heart, Globe, Copy, Check, Phone, Mail, MessageCircle, MapPin, ExternalLink, ChevronDown } from "lucide-react"

export default function Home() {
  const [lang, setLang] = useState<"ar" | "en">("en")
  const [scrolled, setScrolled] = useState(false)
  const [copied, setCopied] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    const checkMobile = () => setIsMobile(window.innerWidth < 768)

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", checkMobile)
    checkMobile()

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  const copyIban = () => {
    navigator.clipboard.writeText("TN5908008000675900049648")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const isRTL = lang === "ar"

  const t = {
    ar: {
      urgent: "يريد الصيام هذا الرمضان",
      title: "أخوك يحتاجك",
      subtitle: "عالِم خدم الأمة ٢٠ عامًا بلا أجر",
      cta: "ساعده الآن",
      scroll: "اقرأ قصته",
      storyHead: "أعطى الماء",
      storySub: "عشرون عامًا في خدمة الأمة",
      storyText: "أسس إبراهيم علي موقع islamland.com وخدم الملايين بأكثر من ١٤٠ لغة — بدون أجر. كالصقر الحر، حلّق فوق الأمة يوصل نور الإسلام للعالم.",
      medicalHead: "الآن يعطش",
      medicalSub: "المُعطي يحتاج الآن",
      medicalText: "تم تشخيصه بورم كبير يحتاج جراحة عاجلة. البنوك الليبية منهارة — لا يستطيع الوصول لأمواله. يحتاج €٢٥,٠٠٠ للعلاج في تونس.",
      donateHead: "كن زمزمه",
      donateSub: "كن الماء الذي ينقذه",
      bankTitle: "تحويل بنكي مباشر",
      bank: "البنك التونسي العربي",
      account: "Clinique de la Soukra",
      iban: "TN59 0800 8000 6759 0004 9648",
      copy: "نسخ",
      copied: "تم!",
      or: "أو تواصل معه مباشرة",
      contact: "تواصل مع إبراهيم",
      footer: "من نفّس عن مؤمن كربة، نفّس الله عنه كربة من كرب يوم القيامة",
    },
    en: {
      urgent: "HE WANTS TO FAST THIS RAMADAN",
      title: "Your Brother Needs You",
      subtitle: "A scholar who served the Ummah 20 years — unpaid",
      cta: "Help Him Now",
      scroll: "Read His Story",
      storyHead: "HE GAVE WATER",
      storySub: "Twenty years serving the Ummah",
      storyText: "Ibrahim Ali founded islamland.com and served millions in 140+ languages — without pay. Like a free falcon, he soared across the Ummah bringing the light of Islam to the world.",
      medicalHead: "NOW HE THIRSTS",
      medicalSub: "The giver now needs",
      medicalText: "He's been diagnosed with a large tumor requiring urgent surgery. Libya's banks have collapsed — he cannot access his own funds. He needs €25,000 for treatment in Tunisia.",
      donateHead: "BE HIS ZAMZAM",
      donateSub: "Be the water that saves him",
      bankTitle: "Direct Bank Transfer",
      bank: "Tunisian Arab Bank",
      account: "Clinique de la Soukra",
      iban: "TN59 0800 8000 6759 0004 9648",
      copy: "Copy",
      copied: "Copied!",
      or: "Or contact him directly",
      contact: "Contact Ibrahim",
      footer: "Whoever relieves a believer's distress, Allah will relieve his distress on the Day of Resurrection",
    },
  }[lang]

  // Mux video config
  const MUX_DESKTOP_ID = "9h8xgTXUmuwmhXxuZcvvX01RSCJvHtYzPJOCV7gEP8dA"
  const MUX_MOBILE_ID = "u4PWJt5e006co5d5OG009mWWiOG7w02KqYLDAsxlsnbZoE"
  const muxId = isMobile ? MUX_MOBILE_ID : MUX_DESKTOP_ID

  return (
    <div className={`min-h-screen ${isRTL ? "font-arabic" : ""}`} dir={isRTL ? "rtl" : "ltr"}>

      {/* Minimal Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-md py-3" : "bg-transparent py-5"
      }`}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/images/mainlogo-500.png" alt="" className="h-9 w-9 rounded-full" />
            <span className="text-white font-medium hidden sm:block">ibrahim.help</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex bg-white/10 rounded-full">
              <button
                onClick={() => setLang("en")}
                className={`px-3 py-1.5 rounded-full text-sm ${lang === "en" ? "bg-white text-black" : "text-white/70"}`}
              >
                EN
              </button>
              <button
                onClick={() => setLang("ar")}
                className={`px-3 py-1.5 rounded-full text-sm ${lang === "ar" ? "bg-white text-black" : "text-white/70"}`}
              >
                عربي
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ==================== HERO ==================== */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <video
          key={muxId}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay muted loop playsInline
          poster={`https://image.mux.com/${muxId}/thumbnail.jpg?time=2`}
        >
          <source src={`https://stream.mux.com/${muxId}.m3u8`} type="application/x-mpegURL" />
          <source src={`https://stream.mux.com/${muxId}/medium.mp4`} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50" />

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            {t.urgent}
          </div>

          <h1 className={`text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 leading-tight ${isRTL ? "font-arabic" : ""}`}>
            {t.title}
          </h1>

          <p className={`text-xl sm:text-2xl text-white/80 mb-10 ${isRTL ? "font-arabic" : ""}`}>
            {t.subtitle}
          </p>

          <a
            href="#donate"
            className="inline-flex items-center gap-2 bg-[#c9a227] hover:bg-[#d4af37] text-black font-semibold px-8 py-4 rounded-full text-lg transition-all hover:scale-105"
          >
            <Heart className="h-5 w-5" />
            {t.cta}
          </a>
        </div>

        {/* Scroll indicator */}
        <a href="#story" className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 hover:text-white flex flex-col items-center gap-2 transition-colors">
          <span className="text-xs tracking-widest uppercase">{t.scroll}</span>
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </a>
      </section>

      {/* ==================== STORY - HE GAVE WATER ==================== */}
      <section id="story" className="relative min-h-screen flex items-center justify-center py-24">
        <div
          className={`absolute inset-0 bg-cover bg-center ${!isMobile ? 'bg-fixed' : ''}`}
          style={{ backgroundImage: `url(/images/journey/${isMobile ? 'section-story-portrait' : 'section-story-desktop'}.jpg)` }}
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
          <h2 className={`text-4xl sm:text-5xl md:text-6xl font-bold text-[#c9a227] mb-4 ${isRTL ? "font-arabic" : ""}`}>
            {t.storyHead}
          </h2>
          <p className={`text-xl text-white/70 mb-8 ${isRTL ? "font-arabic" : ""}`}>
            {t.storySub}
          </p>
          <p className={`text-lg text-white/90 leading-relaxed ${isRTL ? "font-arabic leading-loose" : ""}`}>
            {t.storyText}
          </p>
        </div>
      </section>

      {/* ==================== MEDICAL - NOW HE THIRSTS ==================== */}
      <section className="relative min-h-screen flex items-center justify-center py-24">
        <div
          className={`absolute inset-0 bg-cover bg-center ${!isMobile ? 'bg-fixed' : ''}`}
          style={{ backgroundImage: `url(/images/journey/${isMobile ? 'section-medical-portrait' : 'section-medical-desktop'}.jpg)` }}
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
          <h2 className={`text-4xl sm:text-5xl md:text-6xl font-bold text-red-500 mb-4 ${isRTL ? "font-arabic" : ""}`}>
            {t.medicalHead}
          </h2>
          <p className={`text-xl text-white/70 mb-8 ${isRTL ? "font-arabic" : ""}`}>
            {t.medicalSub}
          </p>
          <p className={`text-lg text-white/90 leading-relaxed mb-8 ${isRTL ? "font-arabic leading-loose" : ""}`}>
            {t.medicalText}
          </p>
          <div className="inline-block bg-red-600/90 backdrop-blur px-6 py-3 rounded-xl">
            <p className="text-white font-bold text-xl">€25,000</p>
          </div>
        </div>
      </section>

      {/* ==================== DOCS - THE TRUST ==================== */}
      <section className="relative min-h-[80vh] flex items-center justify-center py-24">
        <div
          className={`absolute inset-0 bg-cover bg-center ${!isMobile ? 'bg-fixed' : ''}`}
          style={{ backgroundImage: `url(/images/journey/${isMobile ? 'section-docs-portrait' : 'section-docs-desktop'}.jpg)` }}
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
          <h2 className={`text-4xl sm:text-5xl md:text-6xl font-bold text-[#c9a227] mb-4 ${isRTL ? "font-arabic" : ""}`}>
            {isRTL ? "الأمانة" : "THE TRUST"}
          </h2>
          <p className={`text-xl text-white/80 mb-8 ${isRTL ? "font-arabic" : ""}`}>
            {isRTL ? "كل شيء موثق وشفاف" : "Everything documented and transparent"}
          </p>
          <p className={`text-lg text-white/70 ${isRTL ? "font-arabic" : ""}`}>
            {isRTL
              ? "تقارير طبية، خطابات رسمية، وثائق من المستشفى — كل شيء متاح للاطلاع"
              : "Medical reports, official letters, hospital documents — everything available for review"}
          </p>
        </div>
      </section>

      {/* ==================== DONATE - BE HIS ZAMZAM ==================== */}
      <section id="donate" className="relative min-h-screen flex items-center justify-center py-24">
        <div
          className={`absolute inset-0 bg-cover bg-center ${!isMobile ? 'bg-fixed' : ''}`}
          style={{ backgroundImage: `url(/images/journey/${isMobile ? 'section-donate-portrait' : 'section-donate-desktop'}.jpg)` }}
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 max-w-xl mx-auto px-6 text-center">
          <h2 className={`text-4xl sm:text-5xl md:text-6xl font-bold text-[#c9a227] mb-4 ${isRTL ? "font-arabic" : ""}`}>
            {t.donateHead}
          </h2>
          <p className={`text-xl text-white/70 mb-12 ${isRTL ? "font-arabic" : ""}`}>
            {t.donateSub}
          </p>

          {/* Bank Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 text-left mb-8">
            <h3 className={`font-semibold text-gray-900 mb-6 ${isRTL ? "font-arabic text-right" : ""}`}>
              {t.bankTitle}
            </h3>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between border-b border-gray-100 pb-3">
                <span className="text-gray-500">Bank</span>
                <span className="font-medium text-gray-900">{t.bank}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-3">
                <span className="text-gray-500">Account</span>
                <span className="font-medium text-gray-900">{t.account}</span>
              </div>
              <div>
                <span className="text-gray-500 block mb-2">IBAN</span>
                <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                  <code className="flex-1 text-gray-900 font-mono text-xs sm:text-sm break-all">
                    {t.iban}
                  </code>
                  <button
                    onClick={copyIban}
                    className="flex-shrink-0 bg-[#c9a227] hover:bg-[#d4af37] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    {copied ? t.copied : t.copy}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Alternative */}
          <p className={`text-white/50 text-sm mb-6 ${isRTL ? "font-arabic" : ""}`}>{t.or}</p>

          <div className="flex gap-4 justify-center">
            <a
              href="https://wa.me/218916695689?text=I%20want%20to%20help%20Ibrahim"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3 rounded-full font-medium transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp
            </a>
            <a
              href="tel:+218916695689"
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-full font-medium transition-colors backdrop-blur"
            >
              <Phone className="h-5 w-5" />
              Call
            </a>
          </div>
        </div>
      </section>

      {/* ==================== CONTACT ==================== */}
      <section id="contact" className="bg-[#0a3d30] py-20">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className={`text-2xl sm:text-3xl font-bold text-white mb-10 text-center ${isRTL ? "font-arabic" : ""}`}>
            {t.contact}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a href="tel:+218916695689" className="flex items-center gap-4 bg-white/10 hover:bg-white/15 p-5 rounded-xl transition-colors">
              <Phone className="h-6 w-6 text-[#c9a227]" />
              <div>
                <p className="text-white/50 text-sm">Phone</p>
                <p className="text-white font-medium" dir="ltr">+218 91-669-5689</p>
              </div>
            </a>

            <a href="https://wa.me/218916695689" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-white/10 hover:bg-white/15 p-5 rounded-xl transition-colors">
              <MessageCircle className="h-6 w-6 text-[#c9a227]" />
              <div>
                <p className="text-white/50 text-sm">WhatsApp</p>
                <p className="text-white font-medium" dir="ltr">+218 91-669-5689</p>
              </div>
            </a>

            <a href="mailto:Abraabre731@gmail.com" className="flex items-center gap-4 bg-white/10 hover:bg-white/15 p-5 rounded-xl transition-colors">
              <Mail className="h-6 w-6 text-[#c9a227]" />
              <div>
                <p className="text-white/50 text-sm">Email</p>
                <p className="text-white font-medium text-sm">Abraabre731@gmail.com</p>
              </div>
            </a>

            <div className="flex items-center gap-4 bg-white/10 p-5 rounded-xl">
              <MapPin className="h-6 w-6 text-[#c9a227]" />
              <div>
                <p className="text-white/50 text-sm">Location</p>
                <p className="text-white font-medium">Tripoli, Libya</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="bg-[#052a20] py-12">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p className={`text-[#c9a227]/80 text-lg mb-4 ${isRTL ? "font-arabic" : "italic"}`}>
            "{t.footer}"
          </p>
          <p className="text-white/30 text-sm mb-8">— Sahih Muslim</p>

          <div className="flex items-center justify-center gap-4 text-white/30 text-sm">
            <span>ibrahim.help</span>
            <span>•</span>
            <a href="https://islamland.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#c9a227] flex items-center gap-1">
              islamland.com <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
