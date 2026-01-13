"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Bed,
  Plane,
  Pill,
  Stethoscope,
  Heart,
  Droplets,
  Utensils,
  Car,
  Check
} from "lucide-react"

interface SponsorGridProps {
  lang: "ar" | "en"
}

interface SponsorItem {
  id: string
  icon: React.ReactNode
  nameAr: string
  nameEn: string
  descAr: string
  descEn: string
  amount: number
  total: number
  claimed: number
  category: "travel" | "medical" | "stay" | "care"
}

const SPONSOR_ITEMS: SponsorItem[] = [
  {
    id: "night",
    icon: <Bed className="h-6 w-6" />,
    nameAr: "ليلة في المستشفى",
    nameEn: "Hospital Night",
    descAr: "غطِّ ليلة واحدة من إقامته في المستشفى",
    descEn: "Cover one night of his hospital stay",
    amount: 40,
    total: 14,
    claimed: 0,
    category: "stay",
  },
  {
    id: "flight",
    icon: <Plane className="h-6 w-6" />,
    nameAr: "تذكرة الطيران",
    nameEn: "Flight Ticket",
    descAr: "ساعد في تغطية رحلته من ليبيا إلى تونس",
    descEn: "Help cover his journey from Libya to Tunisia",
    amount: 200,
    total: 2,
    claimed: 0,
    category: "travel",
  },
  {
    id: "surgery",
    icon: <Stethoscope className="h-6 w-6" />,
    nameAr: "جزء من العملية",
    nameEn: "Surgery Portion",
    descAr: "ساهم في تكاليف العملية الجراحية",
    descEn: "Contribute to the surgical procedure costs",
    amount: 500,
    total: 20,
    claimed: 0,
    category: "medical",
  },
  {
    id: "medication",
    icon: <Pill className="h-6 w-6" />,
    nameAr: "يوم من الأدوية",
    nameEn: "Day of Medication",
    descAr: "غطِّ أدويته ليوم واحد",
    descEn: "Cover his medications for one day",
    amount: 25,
    total: 30,
    claimed: 0,
    category: "medical",
  },
  {
    id: "blood",
    icon: <Droplets className="h-6 w-6" />,
    nameAr: "وحدة دم",
    nameEn: "Blood Unit",
    descAr: "ساهم في توفير وحدة دم للعملية",
    descEn: "Help provide a blood unit for surgery",
    amount: 75,
    total: 8,
    claimed: 0,
    category: "medical",
  },
  {
    id: "meal",
    icon: <Utensils className="h-6 w-6" />,
    nameAr: "وجبة للعائلة",
    nameEn: "Family Meal",
    descAr: "وفّر وجبة لعائلته المرافقة",
    descEn: "Provide a meal for his accompanying family",
    amount: 15,
    total: 60,
    claimed: 0,
    category: "care",
  },
  {
    id: "transport",
    icon: <Car className="h-6 w-6" />,
    nameAr: "رحلة للمستشفى",
    nameEn: "Hospital Transport",
    descAr: "غطِّ تكلفة رحلة من/إلى المستشفى",
    descEn: "Cover a trip to/from the hospital",
    amount: 20,
    total: 20,
    claimed: 0,
    category: "travel",
  },
  {
    id: "care",
    icon: <Heart className="h-6 w-6" />,
    nameAr: "يوم رعاية",
    nameEn: "Day of Care",
    descAr: "غطِّ رعايته الكاملة ليوم واحد",
    descEn: "Cover his complete care for one day",
    amount: 100,
    total: 30,
    claimed: 0,
    category: "care",
  },
]

export function SponsorGrid({ lang }: SponsorGridProps) {
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)

  const content = {
    ar: {
      title: "احمل معنا",
      subtitle: "كل حاجة يمكن أن تحملها أي يد",
      available: "متاح",
      of: "من",
      claimed: "مغطى",
      sponsor: "أحمل هذا",
      sponsorMultiple: "أحمل",
      units: "وحدات",
      total: "المجموع",
      currency: "€",
      categories: {
        travel: "السفر",
        medical: "طبي",
        stay: "الإقامة",
        care: "الرعاية",
      },
      impactMessage: "جزاك الله خيراً — كل يد على الثوب تحمل إبراهيم",
      proceedToDonate: "أضف يدي للثوب",
    },
    en: {
      title: "Carry With Us",
      subtitle: "Each need can be carried by any hand",
      available: "available",
      of: "of",
      claimed: "covered",
      sponsor: "I'll Carry This",
      sponsorMultiple: "Carry",
      units: "units",
      total: "Total",
      currency: "€",
      categories: {
        travel: "Travel",
        medical: "Medical",
        stay: "Stay",
        care: "Care",
      },
      impactMessage: "Jazak Allahu Khayran — every hand on the cloth carries Ibrahim",
      proceedToDonate: "Add My Hands to the Cloth",
    },
  }

  const t = content[lang]

  // High contrast badge classes
  const getCategoryBadgeClass = (category: SponsorItem["category"]) => {
    switch (category) {
      case "travel": return "badge-travel"
      case "medical": return "badge-medical"
      case "stay": return "badge-stay"
      case "care": return "badge-care"
    }
  }

  const getProgressColor = (category: SponsorItem["category"]) => {
    switch (category) {
      case "travel": return "bg-blue-500"
      case "medical": return "bg-red-500"
      case "stay": return "bg-purple-500"
      case "care": return "bg-islamic-gold"
    }
  }

  const getIconBg = (category: SponsorItem["category"], isSelected: boolean) => {
    if (isSelected) return "bg-islamic-gold text-islamic-green-dark"
    switch (category) {
      case "travel": return "bg-blue-500/20 text-blue-400"
      case "medical": return "bg-red-500/20 text-red-400"
      case "stay": return "bg-purple-500/20 text-purple-400"
      case "care": return "bg-islamic-gold/20 text-islamic-gold"
    }
  }

  const selectedItemData = SPONSOR_ITEMS.find(item => item.id === selectedItem)
  const totalAmount = selectedItemData ? selectedItemData.amount * quantity : 0

  return (
    <section className="py-16 sm:py-20 section-green relative overflow-hidden">
      {/* Subtle geometric pattern */}
      <div className="absolute inset-0 sacred-geometry opacity-5" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            {t.title}
          </h2>
          <p className="text-lg text-cream/90 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 mb-10">
          {SPONSOR_ITEMS.map((item, index) => {
            const remaining = item.total - item.claimed
            const progress = (item.claimed / item.total) * 100
            const isSelected = selectedItem === item.id

            return (
              <Card
                key={item.id}
                className={`relative overflow-hidden cursor-pointer transition-all duration-300 hover-lift animate-fade-in-up ${
                  isSelected
                    ? "luminous-card ring-2 ring-islamic-gold"
                    : "glass-card hover:border-islamic-gold/50"
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => {
                  setSelectedItem(item.id)
                  setQuantity(1)
                }}
              >
                <div className="p-4 sm:p-5">
                  {/* Category Badge - High Contrast */}
                  <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wide ${getCategoryBadgeClass(item.category)}`}>
                    {t.categories[item.category]}
                  </div>

                  {/* Icon */}
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-4 transition-all ${getIconBg(item.category, isSelected)}`}>
                    {item.icon}
                  </div>

                  {/* Name & Price */}
                  <h3 className="text-white font-semibold text-sm sm:text-base mb-1.5 leading-tight">
                    {lang === "ar" ? item.nameAr : item.nameEn}
                  </h3>
                  <p className="text-islamic-gold font-bold text-xl sm:text-2xl mb-3 font-display">
                    {t.currency}{item.amount}
                  </p>

                  {/* Description */}
                  <p className="text-cream/80 text-xs sm:text-sm mb-4 line-clamp-2 leading-relaxed">
                    {lang === "ar" ? item.descAr : item.descEn}
                  </p>

                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-cream/90 font-medium">
                        {remaining} {t.available}
                      </span>
                      <span className="text-cream/70">
                        {item.claimed}/{item.total}
                      </span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${getProgressColor(item.category)}`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Selection indicator */}
                  {isSelected && (
                    <div className="absolute top-3 left-3 w-6 h-6 rounded-full bg-islamic-gold flex items-center justify-center">
                      <Check className="w-4 h-4 text-islamic-green-dark" />
                    </div>
                  )}
                </div>
              </Card>
            )
          })}
        </div>

        {/* Selection Panel */}
        {selectedItemData && (
          <Card className="luminous-card overflow-hidden animate-fade-in-up">
            <div className="p-6 sm:p-8">
              <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8">
                {/* Selected Item Info */}
                <div className="flex items-center gap-5 flex-1">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-islamic-gold/20 flex items-center justify-center text-islamic-gold gold-glow">
                    {selectedItemData.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg sm:text-xl font-display">
                      {lang === "ar" ? selectedItemData.nameAr : selectedItemData.nameEn}
                    </h3>
                    <p className="text-cream/80 text-sm sm:text-base mt-1">
                      {t.currency}{selectedItemData.amount} × {quantity} = <span className="text-islamic-gold font-bold">{t.currency}{totalAmount}</span>
                    </p>
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setQuantity(Math.max(1, quantity - 1))
                    }}
                    className="w-12 h-12 rounded-full bg-white/15 text-white hover:bg-white/25 transition-all flex items-center justify-center text-xl font-semibold border border-white/20"
                  >
                    −
                  </button>
                  <span className="text-white font-bold text-2xl w-12 text-center font-display">{quantity}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setQuantity(Math.min(selectedItemData.total - selectedItemData.claimed, quantity + 1))
                    }}
                    className="w-12 h-12 rounded-full bg-white/15 text-white hover:bg-white/25 transition-all flex items-center justify-center text-xl font-semibold border border-white/20"
                  >
                    +
                  </button>
                </div>

                {/* CTA */}
                <Button
                  asChild
                  size="lg"
                  className="bg-islamic-gold hover:bg-islamic-gold-light text-islamic-green-dark font-bold px-8 py-6 text-base gold-glow transition-all hover:scale-105"
                >
                  <a
                    href={`https://wa.me/218916695689?text=${encodeURIComponent(`Assalamu Alaikum Ibrahim, I want to help sponsor: ${lang === "ar" ? selectedItemData.nameAr : selectedItemData.nameEn} x${quantity} = €${totalAmount}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t.proceedToDonate} ({t.currency}{totalAmount})
                  </a>
                </Button>
              </div>

              <p className="text-center text-cream/70 text-sm mt-6 sacred-text">
                {t.impactMessage}
              </p>
            </div>
          </Card>
        )}
      </div>
    </section>
  )
}
