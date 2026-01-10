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
  Car
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
    claimed: 3,
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
    claimed: 2,
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
    claimed: 8,
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
    claimed: 2,
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
    claimed: 12,
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
    claimed: 5,
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
    claimed: 4,
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

  const getCategoryColor = (category: SponsorItem["category"]) => {
    switch (category) {
      case "travel": return "bg-blue-500/20 text-blue-300 border-blue-500/30"
      case "medical": return "bg-red-500/20 text-red-300 border-red-500/30"
      case "stay": return "bg-purple-500/20 text-purple-300 border-purple-500/30"
      case "care": return "bg-islamic-gold/20 text-islamic-gold border-islamic-gold/30"
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

  const selectedItemData = SPONSOR_ITEMS.find(item => item.id === selectedItem)
  const totalAmount = selectedItemData ? selectedItemData.amount * quantity : 0

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-islamic-green to-islamic-green-dark">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">{t.title}</h2>
          <p className="text-cream-light/80 max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {SPONSOR_ITEMS.map((item) => {
            const remaining = item.total - item.claimed
            const progress = (item.claimed / item.total) * 100
            const isSelected = selectedItem === item.id

            return (
              <Card
                key={item.id}
                className={`relative overflow-hidden cursor-pointer transition-all duration-300 ${
                  isSelected
                    ? "bg-islamic-gold/20 border-islamic-gold ring-2 ring-islamic-gold"
                    : "bg-white/10 border-white/20 hover:bg-white/15"
                }`}
                onClick={() => {
                  setSelectedItem(item.id)
                  setQuantity(1)
                }}
              >
                <div className="p-4">
                  {/* Category Badge */}
                  <div className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] border ${getCategoryColor(item.category)}`}>
                    {t.categories[item.category]}
                  </div>

                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${
                    isSelected ? "bg-islamic-gold text-islamic-green-dark" : "bg-white/10 text-islamic-gold"
                  }`}>
                    {item.icon}
                  </div>

                  {/* Name & Price */}
                  <h3 className="text-white font-semibold text-sm mb-1">
                    {lang === "ar" ? item.nameAr : item.nameEn}
                  </h3>
                  <p className="text-islamic-gold font-bold text-lg mb-2">
                    {t.currency}{item.amount}
                  </p>

                  {/* Description */}
                  <p className="text-cream-light/70 text-xs mb-3 line-clamp-2">
                    {lang === "ar" ? item.descAr : item.descEn}
                  </p>

                  {/* Progress */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-cream-light/60">
                        {remaining} {t.available}
                      </span>
                      <span className="text-cream-light/60">
                        {item.claimed}/{item.total}
                      </span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${getProgressColor(item.category)}`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Selection Panel */}
        {selectedItemData && (
          <Card className="bg-white/10 border-islamic-gold/50 overflow-hidden">
            <div className="p-6">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                {/* Selected Item Info */}
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-16 h-16 rounded-xl bg-islamic-gold/20 flex items-center justify-center text-islamic-gold">
                    {selectedItemData.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">
                      {lang === "ar" ? selectedItemData.nameAr : selectedItemData.nameEn}
                    </h3>
                    <p className="text-cream-light/70 text-sm">
                      {t.currency}{selectedItemData.amount} × {quantity} = {t.currency}{totalAmount}
                    </p>
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors flex items-center justify-center"
                  >
                    −
                  </button>
                  <span className="text-white font-bold text-xl w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(selectedItemData.total - selectedItemData.claimed, quantity + 1))}
                    className="w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors flex items-center justify-center"
                  >
                    +
                  </button>
                </div>

                {/* CTA */}
                <Button
                  size="lg"
                  className="bg-islamic-gold hover:bg-islamic-gold/90 text-islamic-green-dark font-bold px-8"
                >
                  {t.proceedToDonate} ({t.currency}{totalAmount})
                </Button>
              </div>

              <p className="text-center text-cream-light/60 text-sm mt-4">
                {t.impactMessage}
              </p>
            </div>
          </Card>
        )}
      </div>
    </section>
  )
}
