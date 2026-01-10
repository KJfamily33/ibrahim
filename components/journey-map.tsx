"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import {
  Hospital,
  Plane,
  Building,
  Heart,
  Home,
  CheckCircle2,
  Circle,
  ChevronDown,
  ChevronUp,
  MapPin
} from "lucide-react"

interface JourneyMapProps {
  lang: "ar" | "en"
}

interface Stage {
  id: number
  icon: React.ReactNode
  status: "completed" | "current" | "upcoming"
  checklist: { text: string; done: boolean }[]
}

export function JourneyMap({ lang }: JourneyMapProps) {
  const [expandedStage, setExpandedStage] = useState<number | null>(1)

  const content = {
    ar: {
      title: "رحلة إبراهيم",
      subtitle: "من ليبيا إلى الشفاء",
      stages: [
        {
          name: "التحضير",
          location: "طرابلس، ليبيا",
          description: "جمع التبرعات وتجهيز الوثائق",
          checklist: [
            { text: "الوثائق الطبية جاهزة", done: true },
            { text: "تأكيد العيادة التونسية", done: true },
            { text: "جمع تكاليف السفر", done: false },
            { text: "حجز السكن", done: false },
          ]
        },
        {
          name: "السفر",
          location: "طرابلس ← تونس",
          description: "الرحلة إلى تونس للعلاج",
          checklist: [
            { text: "تذكرة الطيران", done: false },
            { text: "النقل من المطار", done: false },
            { text: "الوصول للعيادة", done: false },
          ]
        },
        {
          name: "العلاج",
          location: "تونس العاصمة",
          description: "الجراحة والتعافي في المستشفى",
          checklist: [
            { text: "الفحوصات قبل العملية", done: false },
            { text: "الجراحة", done: false },
            { text: "التعافي في المستشفى", done: false },
          ]
        },
        {
          name: "التعافي",
          location: "تونس العاصمة",
          description: "فترة النقاهة والمتابعة",
          checklist: [
            { text: "السكن للنقاهة", done: false },
            { text: "المتابعة الطبية", done: false },
            { text: "استعادة القوة", done: false },
          ]
        },
        {
          name: "العودة",
          location: "تونس ← ليبيا",
          description: "العودة للوطن والاستمرار في الدعوة",
          checklist: [
            { text: "الموافقة الطبية للسفر", done: false },
            { text: "رحلة العودة", done: false },
            { text: "استئناف العمل الدعوي", done: false },
          ]
        },
      ],
      current: "الحالي",
      upcoming: "قادم",
      completed: "مكتمل",
    },
    en: {
      title: "Ibrahim's Journey",
      subtitle: "From Libya to Healing",
      stages: [
        {
          name: "Preparation",
          location: "Tripoli, Libya",
          description: "Raising funds and preparing documents",
          checklist: [
            { text: "Medical documents prepared", done: true },
            { text: "Tunisian clinic confirmed", done: true },
            { text: "Travel funds raised", done: false },
            { text: "Accommodation booked", done: false },
          ]
        },
        {
          name: "Travel",
          location: "Tripoli → Tunis",
          description: "Journey to Tunisia for treatment",
          checklist: [
            { text: "Flight ticket", done: false },
            { text: "Airport transfer", done: false },
            { text: "Arrival at clinic", done: false },
          ]
        },
        {
          name: "Treatment",
          location: "Tunis",
          description: "Surgery and hospital recovery",
          checklist: [
            { text: "Pre-surgery tests", done: false },
            { text: "Surgery", done: false },
            { text: "Hospital recovery", done: false },
          ]
        },
        {
          name: "Recovery",
          location: "Tunis",
          description: "Outpatient recovery and follow-ups",
          checklist: [
            { text: "Recovery accommodation", done: false },
            { text: "Medical follow-ups", done: false },
            { text: "Regaining strength", done: false },
          ]
        },
        {
          name: "Return",
          location: "Tunis → Libya",
          description: "Return home and continue dawah work",
          checklist: [
            { text: "Medical clearance", done: false },
            { text: "Return journey", done: false },
            { text: "Resume dawah work", done: false },
          ]
        },
      ],
      current: "Current",
      upcoming: "Upcoming",
      completed: "Completed",
    },
  }

  const t = content[lang]

  const icons = [
    <Hospital key="hospital" className="h-5 w-5" />,
    <Plane key="plane" className="h-5 w-5" />,
    <Building key="building" className="h-5 w-5" />,
    <Heart key="heart" className="h-5 w-5" />,
    <Home key="home" className="h-5 w-5" />,
  ]

  const stages: Stage[] = t.stages.map((stage, index) => ({
    id: index + 1,
    icon: icons[index],
    status: index === 0 ? "current" : "upcoming",
    checklist: stage.checklist,
  }))

  return (
    <section className="py-12 sm:py-16 bg-cream">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-islamic-green mb-2">
            {t.title}
          </h2>
          <p className="text-gray-600">{t.subtitle}</p>
        </div>

        {/* Timeline - Desktop */}
        <div className="hidden md:block mb-8">
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200 rounded-full">
              <div
                className="h-full bg-islamic-green rounded-full transition-all duration-500"
                style={{ width: '10%' }}
              />
            </div>

            {/* Stage Points */}
            <div className="relative flex justify-between">
              {stages.map((stage, index) => (
                <div key={stage.id} className="flex flex-col items-center">
                  <button
                    onClick={() => setExpandedStage(expandedStage === stage.id ? null : stage.id)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center z-10 transition-all ${
                      stage.status === "completed"
                        ? "bg-islamic-green text-white"
                        : stage.status === "current"
                        ? "bg-islamic-gold text-islamic-green-dark ring-4 ring-islamic-gold/30"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {stage.icon}
                  </button>
                  <span className={`mt-2 text-sm font-medium ${
                    stage.status === "current" ? "text-islamic-green" : "text-gray-600"
                  }`}>
                    {t.stages[index].name}
                  </span>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {t.stages[index].location}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline - Mobile (Vertical) */}
        <div className="md:hidden mb-8">
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute top-0 bottom-0 left-6 w-0.5 bg-gray-200">
              <div
                className="w-full bg-islamic-green transition-all duration-500"
                style={{ height: '10%' }}
              />
            </div>

            {/* Stage Points */}
            <div className="space-y-4">
              {stages.map((stage, index) => (
                <div key={stage.id} className="relative flex items-start gap-4">
                  <button
                    onClick={() => setExpandedStage(expandedStage === stage.id ? null : stage.id)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center z-10 flex-shrink-0 transition-all ${
                      stage.status === "completed"
                        ? "bg-islamic-green text-white"
                        : stage.status === "current"
                        ? "bg-islamic-gold text-islamic-green-dark ring-4 ring-islamic-gold/30"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {stage.icon}
                  </button>
                  <div className="flex-1 pt-2">
                    <span className={`font-medium ${
                      stage.status === "current" ? "text-islamic-green" : "text-gray-600"
                    }`}>
                      {t.stages[index].name}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3" />
                      {t.stages[index].location}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Expanded Stage Details */}
        {expandedStage && (
          <Card className="border-islamic-green/20 shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      stages[expandedStage - 1].status === "current"
                        ? "bg-islamic-gold/20 text-islamic-gold"
                        : stages[expandedStage - 1].status === "completed"
                        ? "bg-islamic-green/20 text-islamic-green"
                        : "bg-gray-100 text-gray-600"
                    }`}>
                      {stages[expandedStage - 1].status === "current"
                        ? t.current
                        : stages[expandedStage - 1].status === "completed"
                        ? t.completed
                        : t.upcoming}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-islamic-green">
                    {t.stages[expandedStage - 1].name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {t.stages[expandedStage - 1].description}
                  </p>
                </div>
                <button
                  onClick={() => setExpandedStage(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <ChevronUp className="h-5 w-5" />
                </button>
              </div>

              {/* Checklist */}
              <div className="space-y-3">
                {t.stages[expandedStage - 1].checklist.map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 p-3 rounded-lg ${
                      item.done ? "bg-islamic-green/10" : "bg-gray-50"
                    }`}
                  >
                    {item.done ? (
                      <CheckCircle2 className="h-5 w-5 text-islamic-green flex-shrink-0" />
                    ) : (
                      <Circle className="h-5 w-5 text-gray-300 flex-shrink-0" />
                    )}
                    <span className={item.done ? "text-islamic-green" : "text-gray-600"}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-islamic-green">450</div>
            <div className="text-xs text-gray-600">{lang === "ar" ? "كم إلى تونس" : "km to Tunisia"}</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-islamic-gold">1</div>
            <div className="text-xs text-gray-600">{lang === "ar" ? "مرحلة مكتملة" : "stage complete"}</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-islamic-green">4</div>
            <div className="text-xs text-gray-600">{lang === "ar" ? "مراحل متبقية" : "stages remaining"}</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-red-500">!</div>
            <div className="text-xs text-gray-600">{lang === "ar" ? "عاجل" : "Urgent"}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
