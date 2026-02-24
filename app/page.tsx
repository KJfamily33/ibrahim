"use client"

import { useState, useEffect } from "react"
import { Menu, X, ArrowUp, ChevronDown, Mail, MapPin, Check, Search, Shield, Handshake, HeartHandshake, Phone, Linkedin, Calendar, Download } from "lucide-react"

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
    { value: "48.4B", label: "Reserves (bbl)" },
    { value: "40+", label: "Undeveloped Fields" },
    { value: "1.4M", label: "bopd Production" },
    { value: "30yr", label: "Advisory Experience" },
  ]

  const teamCards = [
    {
      name: "Ibrahim Ali",
      role: "Institutional Relationships",
      roleAr: "العلاقات المؤسسية",
      description: "20+ years building trust networks across North Africa and the Gulf. Direct relationships with ministry-level decision makers.",
      descriptionAr: "أكثر من 20 عامًا في بناء شبكات الثقة عبر شمال أفريقيا والخليج. علاقات مباشرة مع صناع القرار على مستوى الوزارات.",
    },
    {
      name: "Senior Technical Advisor",
      role: "Upstream Technical Lead",
      roleAr: "قائد الفريق الفني للمنبع",
      description: "30+ years upstream exploration and advisory experience across North Africa. 11 exploration discoveries across the Illizi, Ghadames, and Sirte basins. Direct advisory to national petroleum authorities in Libya, Algeria, and Tunisia.",
      descriptionAr: "أكثر من 30 عامًا من الخبرة في الاستكشاف والاستشارات في مجال المنبع عبر شمال أفريقيا. 11 اكتشافًا استكشافيًا في أحواض إليزي وغدامس وسرت. استشارات مباشرة للسلطات البترولية الوطنية في ليبيا والجزائر وتونس.",
      badge: "Identity disclosed under executed NCNDA",
      badgeAr: "يتم الكشف عن الهوية بموجب اتفاقية عدم الإفصاح الموقعة",
    },
    {
      name: "Jesse James",
      role: "Managing Director, Western Operations",
      roleAr: "المدير الإداري، العمليات الغربية",
      description: "Business development and capital markets interface for IEP. Background in enterprise technology, AI-driven research, and strategic communications. 18,000+ professional network across energy, government, and MENA markets.",
      descriptionAr: "تطوير الأعمال وواجهة أسواق رأس المال لشركة IEP. خلفية في تقنية المؤسسات والأبحاث المدعومة بالذكاء الاصطناعي والاتصالات الاستراتيجية. شبكة مهنية تضم أكثر من 18,000 جهة اتصال عبر قطاعات الطاقة والحكومة وأسواق الشرق الأوسط وشمال أفريقيا.",
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
          {/* Caption line */}
          <p className="text-center text-warm-gray/70 text-sm mt-4 italic">
            Backed by the largest proven oil reserves in Africa.
          </p>
          <p className="font-arabic text-center text-warm-gray/50 text-xs mt-1" dir="rtl" lang="ar">
            مدعومة بأكبر احتياطيات نفطية مؤكدة في أفريقيا.
          </p>

          {/* Download Button */}
          <div className="mt-6 flex justify-center">
            <a
              href="/Ibrahim_Energy_Partners_Overview.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 bg-gold/10 border border-gold/40 rounded-lg text-gold hover:bg-gold/20 hover:border-gold transition-all duration-300"
            >
              <Download className="w-4 h-4" />
              <span className="text-sm font-medium">Download Overview</span>
              <span className="text-xs text-gold/70">PDF</span>
            </a>
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
              Ibrahim Energy Partners connects qualified Western E&P companies with verified North
              African upstream opportunities. Our team combines decades of direct advisory experience
              across Libyan, Algerian, and Tunisian petroleum sectors with Western capital markets
              expertise and rigorous, AI-driven due diligence.
            </p>
            <p className="font-arabic text-base text-warm-gray leading-loose text-right" dir="rtl" lang="ar">
              شركاء إبراهيم للطاقة تربط شركات التنقيب والإنتاج الغربية المؤهلة بفرص المنبع المعتمدة
              في شمال أفريقيا. يجمع فريقنا بين عقود من الخبرة الاستشارية المباشرة في قطاعات النفط
              الليبية والجزائرية والتونسية مع خبرة أسواق رأس المال الغربية والعناية الواجبة الصارمة
              المدعومة بالذكاء الاصطناعي.
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
                <p className="text-gold text-sm font-medium mb-1">{card.role}</p>
                <p className="font-arabic text-gold/70 text-xs mb-4" dir="rtl" lang="ar">{card.roleAr}</p>
                <p className="text-cream text-sm leading-relaxed mb-3">{card.description}</p>
                <p className="font-arabic text-warm-gray/70 text-xs leading-relaxed mb-3" dir="rtl" lang="ar">{card.descriptionAr}</p>
                {card.badge && (
                  <div className="mt-auto pt-3 border-t border-gold/20">
                    <span className="inline-block text-xs text-gold/80 bg-gold/10 px-3 py-1 rounded-full">
                      {card.badge}
                    </span>
                  </div>
                )}
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

          {/* Key Stats */}
          <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 ${visibleSections.has("opportunity") ? "animate-fade-in-up delay-200" : "opacity-0"}`}>
            {[
              { stat: "48.4B", unit: "bbl", label: "Proven Oil Reserves" },
              { stat: "40+", unit: "", label: "Undeveloped Fields" },
              { stat: "1.4M", unit: "bopd", label: "Current Production" },
              { stat: "2M", unit: "bopd", label: "2030 Target" },
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

          {/* February 2026 Context */}
          <div className={`max-w-3xl mx-auto text-center ${visibleSections.has("opportunity") ? "animate-fade-in-up delay-300" : "opacity-0"}`}>
            <p className="text-lg text-cream leading-relaxed mb-6">
              Libya holds Africa&apos;s largest proven oil reserves. In February 2026, the NOC completed
              its first licensing round in 17 years — yet only 5 of 20 blocks were awarded despite
              44 companies expressing interest.
            </p>
            <p className="text-base text-cream/80 leading-relaxed">
              The gap between interest and commitment reveals a critical truth: <em className="text-gold">relationships
              and local alignment determine success</em>. Companies with existing operations, regional
              partnerships, and on-ground intelligence secured positions. Those without sat out.
            </p>
          </div>

          {/* Winners Box */}
          <div className={`mt-10 max-w-4xl mx-auto ${visibleSections.has("opportunity") ? "animate-fade-in-up delay-400" : "opacity-0"}`}>
            <div className="p-6 rounded-xl bg-black/20 border border-gold/30">
              <p className="text-center text-warm-gray text-sm uppercase tracking-wider mb-4">
                February 2026 Block Awards
              </p>
              <div className="flex flex-wrap justify-center gap-3 sm:gap-6">
                {["Chevron", "Eni", "QatarEnergy", "Repsol", "TPAO", "MOL", "Aiteo"].map((company) => (
                  <span key={company} className="text-gold font-semibold text-sm sm:text-base">
                    {company}
                  </span>
                ))}
              </div>
              <p className="text-center text-cream/60 text-sm mt-4">
                The NOC is reviewing terms for remaining unawarded blocks. The window remains open — but the majors are already moving. The $20B ConocoPhillips-TotalEnergies deal signed in January 2026 confirms the trajectory.
              </p>
              <p className="font-arabic text-center text-cream/50 text-xs mt-2" dir="rtl" lang="ar">
                النافذة لا تزال مفتوحة — لكن الشركات الكبرى تتحرك بالفعل. صفقة كونوكو فيليبس وتوتال إنرجي بقيمة 20 مليار دولار الموقعة في يناير 2026 عبر مسعد بولص تؤكد المسار.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="flex justify-center py-4 bg-deep-navy">
        <div className="w-48 h-[1px] bg-gold/40" />
      </div>

      {/* ==================== RECENT DEVELOPMENTS SECTION ==================== */}
      <section id="developments" className="py-24 px-6 bg-deep-navy" style={{
        background: "radial-gradient(ellipse at center, #0F1A2E 0%, #0A0E17 100%)"
      }}>
        <div className="max-w-4xl mx-auto">
          <div className={`text-center mb-12 ${visibleSections.has("developments") ? "animate-fade-in-up" : "opacity-0"}`}>
            <h2 className="font-display text-4xl sm:text-5xl text-gold mb-4">
              Recent Developments
            </h2>
            <p className="font-arabic text-2xl text-warm-gray" dir="rtl" lang="ar">
              التطورات الأخيرة
            </p>
          </div>

          <div className={`space-y-4 ${visibleSections.has("developments") ? "animate-fade-in-up delay-200" : "opacity-0"}`}>
            {[
              {
                date: "Feb 2026",
                text: "LEES 2026 summit in Tripoli — PM Dbeibah confirms 2025 production reached 1.37M bopd, highest in 12 years",
                textAr: "قمة LEES 2026 في طرابلس — رئيس الوزراء الدبيبة يؤكد وصول إنتاج 2025 إلى 1.37 مليون برميل يوميًا، الأعلى في 12 عامًا",
              },
              {
                date: "Feb 2026",
                text: "NOC awards 5 blocks in first licensing round since 2007; reviewing terms for remaining blocks",
                textAr: "المؤسسة الوطنية للنفط تمنح 5 قطع في أول جولة تراخيص منذ 2007؛ مراجعة الشروط للقطع المتبقية",
              },
              {
                date: "Jan 2026",
                text: "TotalEnergies and ConocoPhillips amend Waha fields framework — $20B, 25-year commitment",
                textAr: "توتال إنرجيز وكونوكو فيليبس تعدلان إطار حقول الواحة — التزام بقيمة 20 مليار دولار لمدة 25 عامًا",
              },
              {
                date: "2025",
                text: "Production begins at Iravn, Mutahandush, al-Khayr, Hamada 47, and Sinawan fields",
                textAr: "بدء الإنتاج في حقول إيرافن ومتحندوش والخير وحمادة 47 وسيناون",
              },
              {
                date: "2025",
                text: "Two offshore natural gas field development agreements signed at LEES summit",
                textAr: "توقيع اتفاقيتين لتطوير حقول الغاز الطبيعي البحرية في قمة LEES",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex gap-4 p-4 rounded-lg bg-midnight/50 border border-gold/20 hover:border-gold/40 transition-colors"
              >
                <div className="flex-shrink-0">
                  <Calendar className="w-5 h-5 text-gold" />
                </div>
                <div className="flex-grow">
                  <div className="flex flex-wrap items-baseline gap-2 mb-1">
                    <span className="text-gold font-semibold text-sm">{item.date}</span>
                    <span className="text-cream/60 text-xs">—</span>
                  </div>
                  <p className="text-cream text-sm leading-relaxed mb-2">{item.text}</p>
                  <p className="font-arabic text-warm-gray/60 text-xs leading-relaxed" dir="rtl" lang="ar">{item.textAr}</p>
                </div>
              </div>
            ))}
          </div>

          <p className={`text-center text-warm-gray/60 text-xs mt-8 ${visibleSections.has("developments") ? "animate-fade-in-up delay-300" : "opacity-0"}`}>
            All items publicly verifiable via Reuters, NOC statements, and official summit communications.
          </p>
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
                  <Phone className="w-5 h-5 text-gold mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-warm-gray text-sm mb-1">Phone</div>
                    <a
                      href="tel:+12504155678"
                      className="text-cream hover:text-gold transition-colors"
                    >
                      +1 (250) 415-5678
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-gold mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-warm-gray text-sm mb-1">Location</div>
                    <span className="text-cream">333 Seymour Street, Vancouver, BC V6B 5A6, Canada</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Linkedin className="w-5 h-5 text-gold mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-warm-gray text-sm mb-1">LinkedIn</div>
                    <a
                      href="https://www.linkedin.com/company/ibrahim-energy-partners/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cream hover:text-gold transition-colors"
                    >
                      Ibrahim Energy Partners
                    </a>
                  </div>
                </div>
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

          <div className="text-center mt-6">
            <a
              href="mailto:info@ibrahim.help"
              className="text-warm-gray text-xs hover:text-gold transition-colors"
            >
              info@ibrahim.help
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
