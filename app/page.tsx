"use client"

import { useState, useEffect } from "react"
import { Menu, X, ArrowUp, ChevronDown, Mail, MapPin, Globe, ExternalLink, Check, Search, Shield, Handshake, HeartHandshake } from "lucide-react"

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [formState, setFormState] = useState({ name: "", email: "", company: "", message: "" })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [isLoading, setIsLoading] = useState(true)

  // Hide loading bar after page loads
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]))
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      setShowBackToTop(window.scrollY > window.innerHeight)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setMobileMenuOpen(false)
    }
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission logic would go here
    setFormSubmitted(true)
    setTimeout(() => setFormSubmitted(false), 3000)
  }

  const stats = [
    { value: "$20B", label: "Signed" },
    { value: "48.4B", label: "bbl Reserves" },
    { value: "40+", label: "Fields" },
    { value: "30yr", label: "Expertise" },
  ]

  const teamCards = [
    {
      name: "Ibrahim Ali",
      role: "Trust & Relationships",
      description: "Founder of islamland.com. 20 years building trust networks across the Islamic world.",
    },
    {
      name: "Senior Technical Team",
      role: "On-Ground Intelligence",
      description: "30+ years advisory to the Libyan Ministry of Petroleum. Verified access to 40+ undeveloped fields.",
    },
    {
      name: "Jesse James",
      role: "Western Bridge",
      description: "CEO, iPurpose Group. AI-powered due diligence. 18,000+ contacts across MENA and North America.",
    },
  ]

  const processSteps = [
    {
      icon: Search,
      title: "Identify",
      titleAr: "تحديد",
      description: "We identify qualified opportunities through our direct Ministry relationships",
      descriptionAr: "نحدد الفرص المؤهلة من خلال علاقاتنا المباشرة مع الوزارة",
    },
    {
      icon: Shield,
      title: "Verify",
      titleAr: "تحقق",
      description: "Every asset is verified through on-ground technical due diligence",
      descriptionAr: "يتم التحقق من كل أصل من خلال العناية الفنية الميدانية",
    },
    {
      icon: Handshake,
      title: "Introduce",
      titleAr: "تقديم",
      description: "We facilitate introductions between verified parties under NCNDA",
      descriptionAr: "نسهل التقديم بين الأطراف المعتمدة بموجب اتفاقية السرية",
    },
    {
      icon: HeartHandshake,
      title: "Support",
      titleAr: "دعم",
      description: "We provide ongoing advisory through negotiation and closing",
      descriptionAr: "نقدم استشارات مستمرة خلال التفاوض والإغلاق",
    },
  ]

  return (
    <div className="min-h-screen bg-deep-navy text-cream">
      {/* ==================== LOADING BAR ==================== */}
      {isLoading && (
        <div className="loading-bar" aria-hidden="true" />
      )}

      {/* ==================== NAVIGATION ==================== */}
      <nav
        role="navigation"
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-navy/95 backdrop-blur-md border-b-2 border-gold/40"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-3 group"
          >
            {/* IE Mark */}
            <div className="relative w-10 h-10 flex items-center justify-center">
              <svg viewBox="0 0 40 40" className="w-full h-full">
                <polygon
                  points="20,2 38,11 38,29 20,38 2,29 2,11"
                  fill="none"
                  stroke="#C8A44E"
                  strokeWidth="1.5"
                />
                <text
                  x="20"
                  y="24"
                  textAnchor="middle"
                  fill="white"
                  fontSize="12"
                  fontFamily="Georgia, serif"
                  fontWeight="bold"
                >
                  IE
                </text>
              </svg>
            </div>
            <span className="text-white text-sm font-medium tracking-wide hidden sm:block uppercase">
              Ibrahim Energy Partners
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {["About", "Opportunity", "Process", "Contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-warm-gray hover:text-gold transition-colors text-sm tracking-wide"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-navy border-t border-gold/20">
            <div className="px-6 py-4 flex flex-col gap-4">
              {["About", "Opportunity", "Process", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-warm-gray hover:text-gold transition-colors text-left py-2"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* ==================== HERO SECTION ==================== */}
      <section
        id="hero"
        className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 pattern-hexagon-subtle"
      >
        {/* Gold top accent line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gold" />

        {/* Content */}
        <div className={`text-center max-w-4xl mx-auto ${visibleSections.has("hero") ? "animate-fade-in-up" : "opacity-0"}`}>
          {/* IE Logo Mark */}
          <div className="mb-8 inline-block">
            <svg viewBox="0 0 120 120" className="w-24 h-24 mx-auto">
              <polygon
                points="60,5 110,32.5 110,87.5 60,115 10,87.5 10,32.5"
                fill="none"
                stroke="#C8A44E"
                strokeWidth="2"
              />
              <polygon
                points="60,15 100,37.5 100,82.5 60,105 20,82.5 20,37.5"
                fill="none"
                stroke="#1A4D2E"
                strokeWidth="1"
                opacity="0.4"
              />
              <text
                x="60"
                y="62"
                textAnchor="middle"
                fill="white"
                fontSize="32"
                fontFamily="Georgia, serif"
                fontWeight="bold"
              >
                IE
              </text>
              <text
                x="60"
                y="82"
                textAnchor="middle"
                fill="#C8A44E"
                fontSize="10"
                fontFamily="Georgia, serif"
                letterSpacing="2"
              >
                PARTNERS
              </text>
            </svg>
          </div>

          {/* Company Name */}
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl text-white mb-2 tracking-wide">
            IBRAHIM ENERGY
          </h1>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-gold mb-4 tracking-[0.2em]">
            PARTNERS
          </h2>

          {/* Arabic Name */}
          <p className="font-arabic text-2xl text-warm-gray mb-8 rtl" dir="rtl">
            شركاء إبراهيم للطاقة
          </p>

          {/* Tagline */}
          <div className="gold-line mx-auto mb-6" />
          <p className="font-display text-xl sm:text-2xl text-gold italic mb-8">
            North Africa Is Open for Business.
          </p>
          <div className="gold-line mx-auto mb-12" />
        </div>

        {/* Stats Bar */}
        <div className={`w-full max-w-4xl mx-auto mt-8 ${visibleSections.has("hero") ? "animate-fade-in-up delay-300" : "opacity-0"}`}>
          <div className="glass-card rounded-xl p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-gold text-3xl sm:text-4xl font-display font-bold mb-1">
                  {stat.value}
                </div>
                <div className="text-warm-gray text-sm tracking-wide uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={() => scrollToSection("about")}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-warm-gray hover:text-gold flex flex-col items-center gap-2 transition-colors"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </button>
      </section>

      {/* ==================== ABOUT SECTION ==================== */}
      <section id="about" className="py-24 px-6 bg-navy">
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-16 ${visibleSections.has("about") ? "animate-fade-in-up" : "opacity-0"}`}>
            <h2 className="font-display text-4xl sm:text-5xl text-gold mb-4">
              Bridging Two Worlds
            </h2>
            <p className="font-arabic text-2xl text-warm-gray rtl" dir="rtl">
              ربط عالمين
            </p>
          </div>

          {/* Description */}
          <div className={`max-w-3xl mx-auto text-center mb-16 ${visibleSections.has("about") ? "animate-fade-in-up delay-200" : "opacity-0"}`}>
            <p className="text-lg text-cream/90 leading-relaxed mb-6">
              Ibrahim Energy Partners facilitates introductions between qualified Western E&P
              companies and verified North African upstream opportunities. Our team combines 30+
              years of direct advisory experience to the Libyan Ministry of Petroleum with Western
              capital markets expertise and AI-powered due diligence.
            </p>
            <p className="font-arabic text-lg text-warm-gray rtl leading-loose" dir="rtl">
              شركاء إبراهيم للطاقة تسهّل التقديم بين شركات التنقيب والإنتاج الغربية المؤهلة والفرص
              المعتمدة في شمال أفريقيا. يجمع فريقنا بين أكثر من 30 عامًا من الخبرة الاستشارية
              المباشرة لوزارة النفط الليبية وخبرة أسواق رأس المال الغربية والعناية الواجبة المدعومة
              بالذكاء الاصطناعي.
            </p>
          </div>

          {/* Team Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {teamCards.map((card, index) => (
              <div
                key={index}
                className={`card-midnight card-gold-border p-6 hover-lift ${
                  visibleSections.has("about") ? `animate-fade-in-up delay-${(index + 1) * 100}` : "opacity-0"
                }`}
              >
                <h3 className="font-display text-xl text-white mb-1">{card.name}</h3>
                <p className="text-gold text-sm mb-4">{card.role}</p>
                <p className="text-warm-gray text-sm leading-relaxed">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== OPPORTUNITY SECTION (Heritage Green) ==================== */}
      <section id="opportunity" className="py-24 px-6 bg-green-gradient pattern-circles-green">
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-16 ${visibleSections.has("opportunity") ? "animate-fade-in-up" : "opacity-0"}`}>
            <h2 className="font-display text-4xl sm:text-5xl text-gold mb-4">
              The Opportunity
            </h2>
            <p className="font-arabic text-2xl text-gold-light rtl" dir="rtl">
              الفرصة
            </p>
          </div>

          {/* Key Stats */}
          <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 ${visibleSections.has("opportunity") ? "animate-fade-in-up delay-200" : "opacity-0"}`}>
            {[
              { stat: "48.4B", unit: "bbl", label: "Proven Oil Reserves" },
              { stat: "40+", unit: "", label: "Undeveloped Fields" },
              { stat: "1.2M", unit: "bopd", label: "Current Production" },
              { stat: "New", unit: "", label: "Licensing Rounds" },
            ].map((item, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-white/5 border border-gold/20">
                <div className="text-gold font-display text-4xl font-bold">
                  {item.stat}
                  <span className="text-xl text-gold-light ml-1">{item.unit}</span>
                </div>
                <div className="text-cream/80 text-sm mt-2">{item.label}</div>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className={`max-w-3xl mx-auto text-center ${visibleSections.has("opportunity") ? "animate-fade-in-up delay-300" : "opacity-0"}`}>
            <p className="text-lg text-cream/90 leading-relaxed">
              Libya holds 48.4 billion barrels of proven oil reserves with 40+ undeveloped fields
              containing discovered resources. Production currently stands at ~1.2M bopd, near
              post-revolution highs. New upstream licensing rounds are underway under
              internationally recognized frameworks.
            </p>
            <div className="mt-8 p-6 rounded-xl bg-white/5 border border-gold/20">
              <p className="text-cream/90 leading-relaxed">
                Major international operators — <span className="text-gold">TotalEnergies</span>,{" "}
                <span className="text-gold">Eni</span>, <span className="text-gold">Repsol</span>,{" "}
                <span className="text-gold">ConocoPhillips</span> — are actively expanding or
                re-entering. The window for strategic positioning is now.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== PROCESS SECTION ==================== */}
      <section id="process" className="py-24 px-6 bg-deep-navy">
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-8 ${visibleSections.has("process") ? "animate-fade-in-up" : "opacity-0"}`}>
            <h2 className="font-display text-4xl sm:text-5xl text-gold mb-4">
              Verification First
            </h2>
            <p className="font-arabic text-2xl text-warm-gray rtl" dir="rtl">
              التحقق أولاً
            </p>
          </div>

          <p className={`text-center text-cream/80 max-w-2xl mx-auto mb-16 ${visibleSections.has("process") ? "animate-fade-in-up delay-100" : "opacity-0"}`}>
            No phantom mandates. No unverified claims. Every introduction is backed by on-the-ground
            intelligence.
          </p>

          {/* Process Steps */}
          <div className="relative">
            {/* Connecting Line (desktop only) */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-[2px] bg-gold/30 -translate-y-1/2 z-0" />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {processSteps.map((step, index) => (
                <div
                  key={index}
                  className={`text-center ${visibleSections.has("process") ? `animate-fade-in-up delay-${(index + 1) * 100}` : "opacity-0"}`}
                >
                  {/* Icon Circle */}
                  <div className="w-16 h-16 rounded-full bg-navy border-2 border-gold flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-7 h-7 text-gold" />
                  </div>

                  {/* Step Number */}
                  <div className="text-gold text-sm mb-2">Step {index + 1}</div>

                  {/* Title */}
                  <h3 className="font-display text-xl text-white mb-2">{step.title}</h3>

                  {/* Description */}
                  <p className="text-warm-gray text-sm leading-relaxed mb-3">
                    {step.description}
                  </p>

                  {/* Arabic */}
                  <p className="font-arabic text-sm text-warm-gray/70 rtl" dir="rtl">
                    {step.descriptionAr}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CONTACT SECTION ==================== */}
      <section id="contact" className="py-24 px-6 bg-navy pattern-hexagon-subtle">
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-16 ${visibleSections.has("contact") ? "animate-fade-in-up" : "opacity-0"}`}>
            <h2 className="font-display text-4xl sm:text-5xl text-gold mb-4">
              Let&apos;s Talk
            </h2>
            <p className="font-arabic text-2xl text-warm-gray rtl" dir="rtl">
              لنتحدث
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className={`${visibleSections.has("contact") ? "animate-fade-in-up delay-100" : "opacity-0"}`}>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-gold mt-1" />
                  <div>
                    <div className="text-warm-gray text-sm mb-1">Email</div>
                    <a
                      href="mailto:info@ibrahim.help"
                      className="text-cream hover:text-gold transition-colors"
                    >
                      info@ibrahim.help
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-gold mt-1" />
                  <div>
                    <div className="text-warm-gray text-sm mb-1">Location</div>
                    <span className="text-cream">Victoria, BC, Canada</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Globe className="w-5 h-5 text-gold mt-1" />
                  <div>
                    <div className="text-warm-gray text-sm mb-1">Web</div>
                    <a
                      href="https://ibrahim.help"
                      className="text-cream hover:text-gold transition-colors"
                    >
                      ibrahim.help
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gold/20">
                <a
                  href="https://ipurpose.group"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-warm-gray hover:text-gold transition-colors"
                >
                  <span>iPurpose Group</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className={`${visibleSections.has("contact") ? "animate-fade-in-up delay-200" : "opacity-0"}`}>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Name"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    required
                    className="w-full"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    required
                    className="w-full"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Company"
                    value={formState.company}
                    onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                    className="w-full"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Message"
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    required
                    className="w-full resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={formSubmitted}
                  className="btn-gold w-full flex items-center justify-center gap-2"
                >
                  {formSubmitted ? (
                    <>
                      <Check className="w-5 h-5" />
                      <span>Message Sent</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <span className="font-arabic">/ أرسل رسالة</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="py-8 px-6 bg-deep-navy border-t border-gold/20">
        <div className="max-w-6xl mx-auto">
          {/* Gold top line */}
          <div className="gold-line-full mb-8" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="font-display text-lg text-white tracking-wide">
              IBRAHIM ENERGY PARTNERS
            </div>

            <div className="text-warm-gray text-sm">
              © 2026 Ibrahim Energy Partners. All rights reserved.
            </div>

            <div className="font-arabic text-lg text-gold rtl" dir="rtl">
              شركاء إبراهيم للطاقة
            </div>
          </div>

          <div className="text-center mt-6">
            <span className="text-warm-gray text-xs">A division of iPurpose Group</span>
          </div>
        </div>
      </footer>

      {/* ==================== BACK TO TOP BUTTON ==================== */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 w-12 h-12 bg-gold hover:bg-gold-light text-deep-navy rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 z-50"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  )
}
