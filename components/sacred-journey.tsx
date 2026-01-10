"use client"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { MapPin, Plane, Hospital, Heart, Home, Check } from "lucide-react"

interface SacredJourneyProps {
  lang: "ar" | "en"
  progress?: number // 0-100, represents funding/journey progress
}

interface JourneyStage {
  id: string
  icon: React.ReactNode
  labelAr: string
  labelEn: string
  descAr: string
  descEn: string
  position: number // percentage along the path
  status: "completed" | "current" | "upcoming"
}

export function SacredJourney({ lang, progress = 12 }: SacredJourneyProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedProgress, setAnimatedProgress] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  const content = {
    ar: {
      title: "رحلة الشفاء",
      subtitle: "من طرابلس إلى تونس — خطوة بخطوة نحو الأمل",
      raised: "تم جمعه",
      goal: "الهدف",
      currency: "€",
      progressLabel: "التقدم في الرحلة",
    },
    en: {
      title: "The Healing Journey",
      subtitle: "From Tripoli to Tunisia — Step by step toward hope",
      raised: "Raised",
      goal: "Goal",
      currency: "€",
      progressLabel: "Journey Progress",
    },
  }

  const t = content[lang]

  const stages: JourneyStage[] = [
    {
      id: "preparation",
      icon: <Home className="h-5 w-5" />,
      labelAr: "التحضير",
      labelEn: "Preparation",
      descAr: "تجهيز الوثائق والترتيبات",
      descEn: "Documents & arrangements",
      position: 0,
      status: progress >= 20 ? "completed" : progress >= 0 ? "current" : "upcoming",
    },
    {
      id: "travel",
      icon: <Plane className="h-5 w-5" />,
      labelAr: "السفر",
      labelEn: "Travel",
      descAr: "الرحلة من ليبيا إلى تونس",
      descEn: "Journey from Libya to Tunisia",
      position: 25,
      status: progress >= 40 ? "completed" : progress >= 20 ? "current" : "upcoming",
    },
    {
      id: "treatment",
      icon: <Hospital className="h-5 w-5" />,
      labelAr: "العلاج",
      labelEn: "Treatment",
      descAr: "العملية الجراحية والرعاية",
      descEn: "Surgery & medical care",
      position: 50,
      status: progress >= 70 ? "completed" : progress >= 40 ? "current" : "upcoming",
    },
    {
      id: "recovery",
      icon: <Heart className="h-5 w-5" />,
      labelAr: "التعافي",
      labelEn: "Recovery",
      descAr: "فترة النقاهة والشفاء",
      descEn: "Healing & recuperation",
      position: 75,
      status: progress >= 90 ? "completed" : progress >= 70 ? "current" : "upcoming",
    },
    {
      id: "return",
      icon: <Check className="h-5 w-5" />,
      labelAr: "العودة",
      labelEn: "Return",
      descAr: "العودة للوطن بصحة جيدة",
      descEn: "Return home in health",
      position: 100,
      status: progress >= 100 ? "completed" : progress >= 90 ? "current" : "upcoming",
    },
  ]

  // Intersection observer for scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Animate progress bar
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setAnimatedProgress(progress)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [isVisible, progress])

  const getStageColor = (status: JourneyStage["status"]) => {
    switch (status) {
      case "completed":
        return "bg-sacred-gold text-sacred-night border-sacred-gold"
      case "current":
        return "bg-sacred-emerald text-white border-sacred-gold ring-4 ring-sacred-gold/30"
      case "upcoming":
        return "bg-sacred-night-light/50 text-sacred-cream/50 border-sacred-cream/20"
    }
  }

  return (
    <section
      ref={sectionRef}
      className="py-16 sm:py-24 bg-gradient-to-b from-sacred-emerald to-sacred-emerald-deep relative overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 sacred-pattern opacity-20" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            {t.title}
          </h2>
          <p className="text-sacred-cream/80 text-lg max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Journey visualization */}
        <Card className={`bg-sacred-night/40 border-sacred-gold/20 p-6 sm:p-10 backdrop-blur-sm transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {/* Progress stats */}
          <div className="flex justify-between items-center mb-8 text-sacred-cream">
            <div>
              <p className="text-sm opacity-70">{t.raised}</p>
              <p className="text-2xl sm:text-3xl font-bold text-sacred-gold">
                {t.currency}2,450
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-70">{t.goal}</p>
              <p className="text-2xl sm:text-3xl font-bold">
                {t.currency}20,000
              </p>
            </div>
          </div>

          {/* Main progress bar */}
          <div className="relative mb-12">
            <div className="h-3 bg-sacred-night-light rounded-full overflow-hidden">
              <div
                className="h-full sacred-progress rounded-full transition-all duration-2000 ease-out"
                style={{ width: `${animatedProgress}%` }}
              />
            </div>
            <div className="absolute -top-1 left-0 right-0 flex justify-between">
              {stages.map((stage) => (
                <div
                  key={stage.id}
                  className="relative"
                  style={{ left: `${stage.position}%`, marginLeft: stage.position === 0 ? 0 : stage.position === 100 ? "-40px" : "-20px" }}
                >
                  {/* Connector line */}
                  <div className={`absolute top-5 left-1/2 w-px h-8 transition-colors duration-500 ${
                    stage.status === "upcoming" ? "bg-sacred-cream/20" : "bg-sacred-gold"
                  }`} />
                </div>
              ))}
            </div>
          </div>

          {/* Stage icons - Desktop (horizontal) */}
          <div className="hidden md:flex justify-between items-start relative">
            {stages.map((stage, index) => (
              <div
                key={stage.id}
                className={`flex flex-col items-center text-center max-w-[120px] transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${300 + index * 150}ms` }}
              >
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${getStageColor(stage.status)} ${
                    stage.status === "current" ? "glow-pulse" : ""
                  }`}
                >
                  {stage.icon}
                </div>

                {/* Label */}
                <p className={`mt-3 font-semibold text-sm ${
                  stage.status === "upcoming" ? "text-sacred-cream/50" : "text-sacred-cream"
                }`}>
                  {lang === "ar" ? stage.labelAr : stage.labelEn}
                </p>

                {/* Description */}
                <p className={`mt-1 text-xs ${
                  stage.status === "upcoming" ? "text-sacred-cream/30" : "text-sacred-cream/60"
                }`}>
                  {lang === "ar" ? stage.descAr : stage.descEn}
                </p>
              </div>
            ))}
          </div>

          {/* Stage list - Mobile (vertical) */}
          <div className="md:hidden space-y-4">
            {stages.map((stage, index) => (
              <div
                key={stage.id}
                className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-500 ${
                  stage.status === "current"
                    ? "bg-sacred-gold/10 border border-sacred-gold/30"
                    : stage.status === "completed"
                    ? "bg-sacred-emerald/20"
                    : "bg-sacred-night-light/20"
                } ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 flex-shrink-0 ${getStageColor(stage.status)}`}
                >
                  {stage.icon}
                </div>
                <div className="flex-1">
                  <p className={`font-semibold ${stage.status === "upcoming" ? "text-sacred-cream/50" : "text-sacred-cream"}`}>
                    {lang === "ar" ? stage.labelAr : stage.labelEn}
                  </p>
                  <p className={`text-sm ${stage.status === "upcoming" ? "text-sacred-cream/30" : "text-sacred-cream/60"}`}>
                    {lang === "ar" ? stage.descAr : stage.descEn}
                  </p>
                </div>
                {stage.status === "completed" && (
                  <Check className="h-5 w-5 text-sacred-gold flex-shrink-0" />
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Map visualization */}
        <div className={`mt-8 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <Card className="bg-sacred-night/60 border-sacred-gold/20 p-6 backdrop-blur-sm overflow-hidden">
            <svg
              viewBox="0 0 400 200"
              className="w-full h-auto"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Gradient definitions */}
              <defs>
                <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#c9a227" />
                  <stop offset="100%" stopColor="#15a672" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Background landmass shapes (simplified) */}
              <path
                d="M50,180 Q100,160 150,150 T250,140 Q300,130 350,150"
                fill="none"
                stroke="rgba(201, 162, 39, 0.1)"
                strokeWidth="40"
              />

              {/* Libya label */}
              <text x="80" y="100" fill="#c9a227" fontSize="14" fontWeight="bold" opacity="0.8">
                {lang === "ar" ? "ليبيا" : "Libya"}
              </text>

              {/* Tripoli marker */}
              <circle cx="100" cy="130" r="8" fill="#c9a227" filter="url(#glow)" />
              <circle cx="100" cy="130" r="4" fill="#0a1628" />
              <text x="100" y="160" fill="#faf6f0" fontSize="10" textAnchor="middle" opacity="0.8">
                {lang === "ar" ? "طرابلس" : "Tripoli"}
              </text>

              {/* Journey path (curved line) */}
              <path
                d="M100,130 C150,100 200,80 300,120"
                fill="none"
                stroke="rgba(201, 162, 39, 0.3)"
                strokeWidth="3"
                strokeDasharray="8,4"
              />

              {/* Animated progress path */}
              <path
                d="M100,130 C150,100 200,80 300,120"
                fill="none"
                stroke="url(#pathGradient)"
                strokeWidth="4"
                strokeLinecap="round"
                filter="url(#glow)"
                strokeDasharray="200"
                strokeDashoffset={200 - (animatedProgress * 2)}
                style={{ transition: "stroke-dashoffset 2s ease-out" }}
              />

              {/* Tunisia label */}
              <text x="280" y="80" fill="#15a672" fontSize="14" fontWeight="bold" opacity="0.8">
                {lang === "ar" ? "تونس" : "Tunisia"}
              </text>

              {/* Tunisia marker */}
              <circle cx="300" cy="120" r="8" fill="#15a672" filter="url(#glow)" />
              <circle cx="300" cy="120" r="4" fill="#0a1628" />
              <text x="300" y="150" fill="#faf6f0" fontSize="10" textAnchor="middle" opacity="0.8">
                {lang === "ar" ? "الشفاء" : "Healing"}
              </text>

              {/* Plane icon on path */}
              <g
                style={{
                  transform: `translateX(${100 + animatedProgress * 2}px) translateY(${130 - animatedProgress * 0.1}px)`,
                  transition: "transform 2s ease-out",
                }}
              >
                <circle r="12" fill="#c9a227" opacity="0.3" />
                <text y="4" fontSize="16" textAnchor="middle">✈️</text>
              </g>

              {/* Mediterranean Sea label */}
              <text x="200" y="190" fill="rgba(250, 246, 240, 0.3)" fontSize="10" textAnchor="middle" fontStyle="italic">
                {lang === "ar" ? "البحر المتوسط" : "Mediterranean Sea"}
              </text>
            </svg>
          </Card>
        </div>
      </div>
    </section>
  )
}
