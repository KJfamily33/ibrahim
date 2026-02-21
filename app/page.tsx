"use client"

import { useState, useEffect } from "react"
import { Menu, X, ArrowUp, ChevronDown, Mail, MapPin, Globe, ExternalLink, Check, Search, Shield, Handshake, HeartHandshake } from "lucide-react"

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [formState, setFormState] = useState({ name: "", email: "", company: "", message: "" })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formError, setFormError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [isLoading, setIsLoading] = useState(true)
  const [activeSection, setActiveSection] = useState("hero")
  const [pageLoaded, setPageLoaded] = useState(false)

  // Hide loading bar and fade in page
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      setPageLoaded(true)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  // Intersection Observer for animations AND active section tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]))
            // Update active section for nav highlighting
            if (entry.intersectionRatio > 0.3) {
              setActiveSection(entry.target.id)
            }
          }
        })
      },
      { threshold: [0.1, 0.3] }
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

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormError("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      })

      if (!response.ok) {
        throw new Error("Failed to send message")
      }

      setFormSubmitted(true)
      setFormState({ name: "", email: "", company: "", message: "" })
      setTimeout(() => setFormSubmitted(false), 5000)
    } catch (error) {
      setFormError("Failed to send message. Please try again or email us directly.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const stats = [
    { value: "1B+", label: "bbl Access" },
    { value: "48.4B", label: "Reserves" },
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

  const navItems = [
    { id: "about", label: "About" },
    { id: "opportunity", label: "Opportunity" },
    { id: "process", label: "Process" },
    { id: "contact", label: "Contact" },
  ]

  return (
    <div className={`min-h-screen bg-deep-navy text-cream transition-opacity duration-500 ${pageLoaded ? "opacity-100" : "opacity-0"}`}>
      {/* ==================== LOADING BAR ==================== */}
      {isLoading && (
        <div className="loading-bar" aria-hidden="true" />
      )}

      {/* ==================== NAVIGATION (FIX 7) ==================== */}
      <nav
        role="navigation"
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-navy/95 backdrop-blur-md shadow-lg border-b border-gold/30"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-3 group"
            aria-label="Go to top"
          >
            {/* IE Mark - 32px */}
            <div className="relative w-8 h-8 flex items-center justify-center">
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
                  fontSize="11"
                  fontFamily="Georgia, serif"
                  fontWeight="bold"
                >
                  IE
                </text>
              </svg>
            </div>
            <span className="text-white text-xs font-medium hidden sm:block uppercase tracking-[0.1em]">
              Ibrahim Energy Partners
            </span>
          </button>

          {/* Desktop Navigation with active state */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative text-sm tracking-wide transition-colors py-2 ${
                  activeSection === item.id ? "text-gold" : "text-warm-gray hover:text-gold"
                }`}
              >
                {item.label}
                {/* Gold underline for active/hover */}
                <span
                  className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gold transition-transform origin-left ${
                    activeSection === item.id ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gold p-2"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu - slide from right */}
        <div
          className={`md:hidden fixed top-[64px] right-0 h-[calc(100vh-64px)] w-64 bg-navy border-l border-gold/20 transform transition-transform duration-300 ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="px-6 py-8 flex flex-col gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-left py-2 transition-colors ${
                  activeSection === item.id ? "text-gold" : "text-warm-gray hover:text-gold"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* ==================== HERO SECTION (FIX 9: radial gradient + pattern) ==================== */}
      <section
        id="hero"
        className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20"
        style={{
          background: "radial-gradient(ellipse at center, #1A2640 0%, #0A0E17 70%)"
        }}
      >
        {/* Subtle geometric pattern overlay */}
        <div className="absolute inset-0 pattern-hexagon-subtle opacity-50" />

        {/* Gold top accent line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gold" />

        {/* Content */}
        <div className={`relative z-10 text-center max-w-4xl mx-auto ${visibleSections.has("hero") ? "animate-fade-in-up" : "opacity-0"}`}>
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
          <p className="font-arabic text-2xl text-warm-gray mb-8" dir="rtl" lang="ar">
            شركاء إبراهيم للطاقة
          </p>

          {/* Tagline */}
          <div className="w-20 h-[1px] bg-gold/40 mx-auto mb-6" />
          <p className="font-display text-xl sm:text-2xl text-gold italic mb-8">
            North Africa Is Open for Business.
          </p>
          <div className="w-20 h-[1px] bg-gold/40 mx-auto mb-12" />
        </div>

        {/* Stats Bar (FIX 1: 2x2 on mobile) */}
        <div className={`relative z-10 w-full max-w-4xl mx-auto mt-8 ${visibleSections.has("hero") ? "animate-fade-in-up delay-300" : "opacity-0"}`}>
          <div className="glass-card rounded-xl p-6 sm:p-8 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-gold text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-1">
                  {stat.value}
                </div>
                <div className="text-warm-gray text-xs sm:text-sm tracking-wide uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={() => scrollToSection("about")}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-warm-gray hover:text-gold flex flex-col items-center gap-2 transition-colors z-10"
          aria-label="Scroll to about section"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </button>
      </section>

      {/* Section Divider */}
      <div className="flex justify-center py-4 bg-navy">
        <div className="w-48 h-[1px] bg-gold/40" />
      </div>

      {/* ==================== ABOUT SECTION (FIX 2: Team Cards) ==================== */}
      <section id="about" className="py-24 px-6 bg-navy" style={{
        background: "radial-gradient(ellipse at center, #1A2640 0%, #0F1A2E 100%)"
      }}>
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-16 ${visibleSections.has("about") ? "animate-fade-in-up" : "opacity-0"}`}>
            <h2 className="font-display text-4xl sm:text-5xl text-gold mb-4">
              Bridging Two Worlds
            </h2>
            <p className="font-arabic text-2xl text-warm-gray" dir="rtl" lang="ar">
              ربط عالمين
            </p>
          </div>

          {/* Description */}
          <div className={`max-w-3xl mx-auto text-center mb-16 ${visibleSections.has("about") ? "animate-fade-in-up delay-200" : "opacity-0"}`}>
            <p className="text-lg text-cream leading-relaxed mb-6">
              Ibrahim Energy Partners facilitates introductions between qualified Western E&P
              companies and verified North African upstream opportunities. Our team combines 30+
              years of direct advisory experience to the Libyan Ministry of Petroleum with Western
              capital markets expertise and AI-powered due diligence.
            </p>
            <p className="font-arabic text-base text-warm-gray leading-loose text-right" dir="rtl" lang="ar">
              شركاء إبراهيم للطاقة تسهّل التقديم بين شركات التنقيب والإنتاج الغربية المؤهلة والفرص
              المعتمدة في شمال أفريقيا. يجمع فريقنا بين أكثر من 30 عامًا من الخبرة الاستشارية
              المباشرة لوزارة النفط الليبية وخبرة أسواق رأس المال الغربية والعناية الواجبة المدعومة
              بالذكاء الاصطناعي.
            </p>
          </div>

          {/* Team Cards (FIX 2: equal height, proper styling) */}
          <div className="grid md:grid-cols-3 gap-6">
            {teamCards.map((card, index) => (
              <div
                key={index}
                className={`bg-midnight border-l-4 border-gold rounded-lg p-6 pb-8 flex flex-col hover:shadow-xl hover:shadow-gold/10 transition-all duration-300 hover:-translate-y-1 ${
                  visibleSections.has("about") ? `animate-fade-in-up` : "opacity-0"
                }`}
                style={{ animationDelay: `${(index + 1) * 100}ms` }}
              >
                <h3 className="font-display text-xl text-white mb-2">{card.name}</h3>
                <p className="text-gold text-sm font-medium mb-4">{card.role}</p>
                <p className="text-cream text-sm leading-relaxed flex-grow">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="flex justify-center py-4 bg-heritage-green-dark">
        <div className="w-48 h-[1px] bg-gold/40" />
      </div>

      {/* ==================== OPPORTUNITY SECTION (FIX 3, 4) ==================== */}
      <section id="opportunity" className="py-24 px-6 relative" style={{
        background: "linear-gradient(160deg, #0F3A1F 0%, #1A4D2E 50%, #2A6B40 100%)"
      }}>
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 pattern-circles-green opacity-60" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className={`text-center mb-16 ${visibleSections.has("opportunity") ? "animate-fade-in-up" : "opacity-0"}`}>
            <h2 className="font-display text-4xl sm:text-5xl text-gold mb-4">
              The Opportunity
            </h2>
            <p className="font-arabic text-2xl text-gold-light" dir="rtl" lang="ar">
              الفرصة
            </p>
          </div>

          {/* Key Stats (FIX 3: larger numbers, better styling) */}
          <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 ${visibleSections.has("opportunity") ? "animate-fade-in-up delay-200" : "opacity-0"}`}>
            {[
              { stat: "48.4B", unit: "bbl", label: "Proven Oil Reserves" },
              { stat: "40+", unit: "", label: "Undeveloped Fields" },
              { stat: "1.2M", unit: "bopd", label: "Current Production" },
              { stat: "New", unit: "", label: "Licensing Rounds" },
            ].map((item, index) => (
              <div
                key={index}
                className="text-center p-4 sm:p-6 rounded-xl bg-black/20 border border-gold/30 backdrop-blur-sm"
              >
                <div className="text-gold font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                  {item.stat}
                  {item.unit && (
                    <span className="text-lg sm:text-xl text-gold-light ml-1 font-normal">{item.unit}</span>
                  )}
                </div>
                <div className="text-cream/70 text-xs sm:text-sm mt-2 uppercase tracking-wide">{item.label}</div>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className={`max-w-3xl mx-auto text-center ${visibleSections.has("opportunity") ? "animate-fade-in-up delay-300" : "opacity-0"}`}>
            <p className="text-lg text-cream leading-relaxed">
              Libya holds 48.4 billion barrels of proven oil reserves with 40+ undeveloped fields
              containing discovered resources. Production currently stands at ~1.2M bopd, near
              post-revolution highs. New upstream licensing rounds are underway under
              internationally recognized frameworks.
            </p>
            {/* FIX 4: Operators as styled text, not links */}
            <div className="mt-8 p-6 rounded-xl bg-black/20 border border-gold/30">
              <p className="text-cream leading-relaxed">
                Major international operators — <strong className="text-gold font-semibold">TotalEnergies</strong>,{" "}
                <strong className="text-gold font-semibold">Eni</strong>,{" "}
                <strong className="text-gold font-semibold">Repsol</strong>,{" "}
                <strong className="text-gold font-semibold">ConocoPhillips</strong> — are actively expanding or
                re-entering. The window for strategic positioning is now.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="flex justify-center py-4 bg-deep-navy">
        <div className="w-48 h-[1px] bg-gold/40" />
      </div>

      {/* ==================== PROCESS SECTION (FIX 5) ==================== */}
      <section id="process" className="py-24 px-6" style={{
        background: "radial-gradient(ellipse at center, #1A2640 0%, #0A0E17 100%)"
      }}>
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-8 ${visibleSections.has("process") ? "animate-fade-in-up" : "opacity-0"}`}>
            <h2 className="font-display text-4xl sm:text-5xl text-gold mb-4">
              Verification First
            </h2>
            <p className="font-arabic text-2xl text-warm-gray" dir="rtl" lang="ar">
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
            <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-[2px] bg-gradient-to-r from-gold/20 via-gold to-gold/20 z-0" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative z-10">
              {processSteps.map((step, index) => (
                <div
                  key={index}
                  className={`text-center group ${
                    visibleSections.has("process") ? "animate-fade-in-up" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${(index + 1) * 100}ms` }}
                >
                  {/* Icon Circle - always centered */}
                  <div className="mx-auto w-16 h-16 rounded-full bg-navy border-2 border-gold flex items-center justify-center mb-4 transition-all duration-300 group-hover:border-gold-light group-hover:shadow-lg group-hover:shadow-gold/20">
                    <step.icon className="w-7 h-7 text-gold group-hover:text-gold-light transition-colors" />
                  </div>

                  {/* Step Number */}
                  <div className="text-warm-gray text-xs uppercase tracking-wider mb-2">
                    Step {index + 1}
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-xl text-white font-bold mb-3">{step.title}</h3>

                  {/* Description */}
                  <p className="text-cream/80 text-sm leading-relaxed mb-4 px-2">
                    {step.description}
                  </p>

                  {/* Gold divider */}
                  <div className="w-12 h-[1px] bg-gold/40 mx-auto mb-3" />

                  {/* Arabic */}
                  <p className="font-arabic text-xs text-warm-gray/60 italic" dir="rtl" lang="ar">
                    {step.descriptionAr}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="flex justify-center py-4 bg-navy">
        <div className="w-48 h-[1px] bg-gold/40" />
      </div>

      {/* ==================== CONTACT SECTION (FIX 6) ==================== */}
      <section id="contact" className="py-24 px-6 relative" style={{
        background: "radial-gradient(ellipse at center, #1A2640 0%, #0F1A2E 100%)"
      }}>
        <div className="absolute inset-0 pattern-hexagon-subtle opacity-30" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className={`text-center mb-16 ${visibleSections.has("contact") ? "animate-fade-in-up" : "opacity-0"}`}>
            <h2 className="font-display text-4xl sm:text-5xl text-gold mb-4">
              Let&apos;s Talk
            </h2>
            <p className="font-arabic text-2xl text-warm-gray" dir="rtl" lang="ar">
              لنتحدث
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className={`${visibleSections.has("contact") ? "animate-fade-in-up delay-100" : "opacity-0"}`}>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-gold mt-1 flex-shrink-0" />
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
                  <MapPin className="w-5 h-5 text-gold mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-warm-gray text-sm mb-1">Location</div>
                    <span className="text-cream">Victoria, BC, Canada</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Globe className="w-5 h-5 text-gold mt-1 flex-shrink-0" />
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
                  href="https://gprkinetic.pro/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors"
                >
                  <span>GPR Kinetic</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Contact Form (FIX 6: better styling) */}
            <div className={`${visibleSections.has("contact") ? "animate-fade-in-up delay-200" : "opacity-0"}`}>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="sr-only">Name</label>
                  <input
                    type="text"
                    placeholder="Name *"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    required
                    className="w-full bg-midnight border border-warm-gray/30 rounded-lg px-4 py-3 text-cream placeholder-warm-gray/60 focus:border-gold focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="sr-only">Email</label>
                  <input
                    type="email"
                    placeholder="Email *"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    required
                    className="w-full bg-midnight border border-warm-gray/30 rounded-lg px-4 py-3 text-cream placeholder-warm-gray/60 focus:border-gold focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="sr-only">Company</label>
                  <input
                    type="text"
                    placeholder="Company"
                    value={formState.company}
                    onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                    className="w-full bg-midnight border border-warm-gray/30 rounded-lg px-4 py-3 text-cream placeholder-warm-gray/60 focus:border-gold focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="sr-only">Message</label>
                  <textarea
                    placeholder="Message *"
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    required
                    className="w-full bg-midnight border border-warm-gray/30 rounded-lg px-4 py-3 text-cream placeholder-warm-gray/60 focus:border-gold focus:outline-none transition-colors resize-none"
                  />
                </div>
                {formError && (
                  <div className="text-red-400 text-sm bg-red-900/20 border border-red-500/30 rounded-lg px-4 py-3">
                    {formError}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={formSubmitted || isSubmitting}
                  className="w-full bg-gold hover:bg-gold-light text-deep-navy font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {formSubmitted ? (
                    <>
                      <Check className="w-5 h-5" />
                      <span>Message Sent!</span>
                    </>
                  ) : isSubmitting ? (
                    <>
                      <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <span className="font-arabic text-sm">/ أرسل رسالة</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER (FIX 8: Arabic RTL) ==================== */}
      <footer className="py-8 px-6 bg-deep-navy border-t border-gold/20">
        <div className="max-w-6xl mx-auto">
          {/* Gold top line */}
          <div className="w-full h-[1px] bg-gold/40 mb-8" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="font-display text-lg text-white tracking-wide">
              IBRAHIM ENERGY PARTNERS
            </div>

            <div className="text-warm-gray text-sm">
              © 2026 Ibrahim Energy Partners. All rights reserved.
            </div>

            <div className="font-arabic text-lg text-gold text-right" dir="rtl" lang="ar">
              شركاء إبراهيم للطاقة
            </div>
          </div>

          <div className="text-center mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            <a
              href="mailto:info@ibrahim.help"
              className="text-warm-gray text-xs hover:text-gold transition-colors"
            >
              info@ibrahim.help
            </a>
            <span className="hidden sm:inline text-warm-gray/40">|</span>
            <a
              href="https://gprkinetic.pro/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-warm-gray text-xs hover:text-gold transition-colors"
            >
              A division of GPR Kinetic
            </a>
          </div>
        </div>
      </footer>

      {/* ==================== BACK TO TOP BUTTON ==================== */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-6 right-6 w-12 h-12 bg-gold hover:bg-gold-light text-deep-navy rounded-full flex items-center justify-center shadow-lg transition-all duration-300 z-50 ${
          showBackToTop ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"
        }`}
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </div>
  )
}
