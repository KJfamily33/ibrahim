"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { MapPin, Plane, Heart, Hospital, Home } from "lucide-react"

interface FlightPathProps {
  lang: "ar" | "en"
}

interface JourneyStage {
  id: string
  icon: React.ReactNode
  status: "completed" | "current" | "upcoming"
  progress?: number
}

export function FlightPath({ lang }: FlightPathProps) {
  const [activeStage, setActiveStage] = useState(1)
  const [animatedProgress, setAnimatedProgress] = useState(0)

  useEffect(() => {
    // Animate the progress line
    const timer = setTimeout(() => {
      setAnimatedProgress(25) // 25% = currently at stage 2
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const content = {
    ar: {
      title: "مسار الرحلة المقدسة",
      subtitle: "من طرابلس إلى تونس — رحلة الشفاء",
      stages: [
        {
          id: "origin",
          title: "طرابلس، ليبيا",
          subtitle: "نقطة الانطلاق",
          desc: "حيث كرّس إبراهيم ٢٠ عامًا في خدمة الأمة",
          icon: <Home className="h-5 w-5" />,
        },
        {
          id: "preparation",
          title: "الاستعداد",
          subtitle: "جمع التبرعات والوثائق",
          desc: "تجهيز مستلزمات السفر والتأشيرات الطبية",
          icon: <Heart className="h-5 w-5" />,
        },
        {
          id: "journey",
          title: "الرحلة",
          subtitle: "العبور إلى تونس",
          desc: "السفر الآمن برعاية الله وبدعم الأمة",
          icon: <Plane className="h-5 w-5" />,
        },
        {
          id: "treatment",
          title: "العلاج",
          subtitle: "المستشفى في تونس",
          desc: "الجراحة والتعافي تحت إشراف أطباء متخصصين",
          icon: <Hospital className="h-5 w-5" />,
        },
        {
          id: "return",
          title: "العودة",
          subtitle: "الرجوع سالمًا",
          desc: "العودة للوطن بصحة وعافية إن شاء الله",
          icon: <Home className="h-5 w-5" />,
        },
      ],
      currentStatus: "المرحلة الحالية",
      raisedLabel: "تم جمعه",
      goalLabel: "الهدف",
      distanceLabel: "المسافة المتبقية",
      distance: "٥٠٠ كم إلى تونس",
      prayerCount: "داعٍ يرافقه",
      rumiQuote: "الجناح المكسور يُشفى بالحب",
    },
    en: {
      title: "The Sacred Flight Path",
      subtitle: "From Tripoli to Tunisia — A Journey of Healing",
      stages: [
        {
          id: "origin",
          title: "Tripoli, Libya",
          subtitle: "Point of Origin",
          desc: "Where Ibrahim dedicated 20 years serving the Ummah",
          icon: <Home className="h-5 w-5" />,
        },
        {
          id: "preparation",
          title: "Preparation",
          subtitle: "Fundraising & Documentation",
          desc: "Gathering travel essentials and medical visas",
          icon: <Heart className="h-5 w-5" />,
        },
        {
          id: "journey",
          title: "The Journey",
          subtitle: "Crossing to Tunisia",
          desc: "Safe passage under Allah's protection and Ummah's support",
          icon: <Plane className="h-5 w-5" />,
        },
        {
          id: "treatment",
          title: "Treatment",
          subtitle: "Hospital in Tunisia",
          desc: "Surgery and recovery under specialized care",
          icon: <Hospital className="h-5 w-5" />,
        },
        {
          id: "return",
          title: "Return",
          subtitle: "Coming Home",
          desc: "Returning home in health, InshaAllah",
          icon: <Home className="h-5 w-5" />,
        },
      ],
      currentStatus: "Current Stage",
      raisedLabel: "Raised",
      goalLabel: "Goal",
      distanceLabel: "Distance Remaining",
      distance: "500 km to Tunisia",
      prayerCount: "Supporters in Prayer",
      rumiQuote: "The broken wing heals with love",
    },
  }

  const t = content[lang]

  const stages: JourneyStage[] = t.stages.map((stage, index) => ({
    ...stage,
    status: index < activeStage ? "completed" : index === activeStage ? "current" : "upcoming",
    progress: index === activeStage ? 60 : undefined,
  }))

  return (
    <section id="journey" className="py-16 sm:py-24 bg-gradient-to-b from-islamic-green-dark to-islamic-green relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 sacred-geometry opacity-10" />

      {/* Animated Stars/Path */}
      <div className="absolute top-20 left-0 right-0 flex justify-center">
        <svg className="w-full max-w-4xl h-20 opacity-20" viewBox="0 0 800 80">
          <path
            d="M0,40 Q200,10 400,40 T800,40"
            fill="none"
            stroke="#c9a227"
            strokeWidth="2"
            strokeDasharray="10,5"
            className="journey-path"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">{t.title}</h2>
          <p className="text-xl text-islamic-gold">{t.subtitle}</p>
          <p className="text-cream-light/60 mt-4 italic rumi-quote">"{t.rumiQuote}"</p>
        </div>

        {/* Journey Visualization */}
        <div className="relative mb-12">
          {/* Progress Line */}
          <div className="absolute top-8 left-0 right-0 h-1 bg-white/10 rounded-full mx-8 sm:mx-16">
            <div
              className="h-full bg-islamic-gold rounded-full transition-all duration-1000 progress-glow"
              style={{ width: `${animatedProgress}%` }}
            />
          </div>

          {/* Falcon on Path */}
          <div
            className="absolute top-4 transition-all duration-1000 falcon-soar z-20"
            style={{ left: `calc(${animatedProgress}% - 12px)` }}
          >
            <div className="w-8 h-8 rounded-full bg-islamic-gold flex items-center justify-center shadow-lg golden-glow">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-islamic-green-dark">
                <path
                  fill="currentColor"
                  d="M12,4 L8,8 L2,7 L6,11 L1,13 L8,13 L5,18 L9,15 L12,20 L15,15 L19,18 L16,13 L23,13 L18,11 L22,7 L16,8 Z"
                />
              </svg>
            </div>
          </div>

          {/* Stage Markers */}
          <div className="flex justify-between relative z-10">
            {stages.map((stage, index) => (
              <div
                key={stage.id}
                className={`flex flex-col items-center cursor-pointer transition-all ${
                  stage.status === "current" ? "scale-110" : ""
                }`}
                onClick={() => setActiveStage(index)}
              >
                {/* Marker */}
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                    stage.status === "completed"
                      ? "bg-islamic-gold text-islamic-green-dark"
                      : stage.status === "current"
                      ? "bg-islamic-gold/30 text-islamic-gold border-2 border-islamic-gold golden-glow"
                      : "bg-white/10 text-cream-light/50 border border-white/20"
                  }`}
                >
                  {t.stages[index].icon}
                </div>

                {/* Label */}
                <div className="mt-3 text-center max-w-[80px] sm:max-w-[120px]">
                  <p
                    className={`text-xs sm:text-sm font-medium ${
                      stage.status === "current" ? "text-islamic-gold" : "text-cream-light/70"
                    }`}
                  >
                    {t.stages[index].title}
                  </p>
                  <p className="text-[10px] sm:text-xs text-cream-light/50 hidden sm:block">
                    {t.stages[index].subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Current Stage Detail */}
        <Card className="glass-card p-6 sm:p-8 max-w-2xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full bg-islamic-gold/20 text-islamic-gold text-xs font-medium">
              {t.currentStatus}
            </span>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-islamic-gold/20 flex items-center justify-center text-islamic-gold flex-shrink-0">
              {t.stages[activeStage].icon}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-1">{t.stages[activeStage].title}</h3>
              <p className="text-islamic-gold text-sm mb-2">{t.stages[activeStage].subtitle}</p>
              <p className="text-cream-light/70">{t.stages[activeStage].desc}</p>
            </div>
          </div>

          {/* Progress for Current Stage */}
          {activeStage === 1 && (
            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-cream-light/70">{t.raisedLabel}: <span className="text-islamic-gold font-bold">€2,450</span></span>
                <span className="text-cream-light/70">{t.goalLabel}: <span className="text-white font-bold">€20,000</span></span>
              </div>
              <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-islamic-gold rounded-full progress-glow" style={{ width: "12%" }} />
              </div>
            </div>
          )}
        </Card>

        {/* Distance & Support Stats */}
        <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto mt-8">
          <div className="glass-card rounded-xl p-4 text-center">
            <MapPin className="h-5 w-5 text-islamic-gold mx-auto mb-2" />
            <p className="text-cream-light/60 text-xs">{t.distanceLabel}</p>
            <p className="text-white font-bold">{t.distance}</p>
          </div>
          <div className="glass-card rounded-xl p-4 text-center">
            <span className="text-xl block mb-1">🤲</span>
            <p className="text-cream-light/60 text-xs">{t.prayerCount}</p>
            <p className="text-white font-bold">1,247</p>
          </div>
        </div>
      </div>
    </section>
  )
}
