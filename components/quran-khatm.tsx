"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BookOpen, Check, User } from "lucide-react"

interface QuranKhatmProps {
  lang: "ar" | "en"
}

interface JuzClaim {
  juz: number
  claimedBy: string
  completed: boolean
  claimedAt: string
}

const STORAGE_KEY = "ibrahim-quran-khatm"

// Arabic names for each Juz
const JUZ_NAMES: { [key: number]: { ar: string; en: string } } = {
  1: { ar: "الفاتحة - البقرة", en: "Al-Fatiha - Al-Baqarah" },
  2: { ar: "البقرة", en: "Al-Baqarah" },
  3: { ar: "البقرة - آل عمران", en: "Al-Baqarah - Al-Imran" },
  4: { ar: "آل عمران - النساء", en: "Al-Imran - An-Nisa" },
  5: { ar: "النساء", en: "An-Nisa" },
  6: { ar: "النساء - المائدة", en: "An-Nisa - Al-Ma'idah" },
  7: { ar: "المائدة - الأنعام", en: "Al-Ma'idah - Al-An'am" },
  8: { ar: "الأنعام - الأعراف", en: "Al-An'am - Al-A'raf" },
  9: { ar: "الأعراف - الأنفال", en: "Al-A'raf - Al-Anfal" },
  10: { ar: "الأنفال - التوبة", en: "Al-Anfal - At-Tawbah" },
  11: { ar: "التوبة - هود", en: "At-Tawbah - Hud" },
  12: { ar: "هود - يوسف", en: "Hud - Yusuf" },
  13: { ar: "يوسف - إبراهيم", en: "Yusuf - Ibrahim" },
  14: { ar: "الحجر - النحل", en: "Al-Hijr - An-Nahl" },
  15: { ar: "الإسراء - الكهف", en: "Al-Isra - Al-Kahf" },
  16: { ar: "الكهف - طه", en: "Al-Kahf - Ta-Ha" },
  17: { ar: "الأنبياء - الحج", en: "Al-Anbiya - Al-Hajj" },
  18: { ar: "المؤمنون - الفرقان", en: "Al-Mu'minun - Al-Furqan" },
  19: { ar: "الفرقان - النمل", en: "Al-Furqan - An-Naml" },
  20: { ar: "النمل - العنكبوت", en: "An-Naml - Al-Ankabut" },
  21: { ar: "العنكبوت - الأحزاب", en: "Al-Ankabut - Al-Ahzab" },
  22: { ar: "الأحزاب - يس", en: "Al-Ahzab - Ya-Sin" },
  23: { ar: "يس - الزمر", en: "Ya-Sin - Az-Zumar" },
  24: { ar: "الزمر - فصلت", en: "Az-Zumar - Fussilat" },
  25: { ar: "فصلت - الجاثية", en: "Fussilat - Al-Jathiyah" },
  26: { ar: "الأحقاف - الذاريات", en: "Al-Ahqaf - Adh-Dhariyat" },
  27: { ar: "الذاريات - الحديد", en: "Adh-Dhariyat - Al-Hadid" },
  28: { ar: "المجادلة - التحريم", en: "Al-Mujadila - At-Tahrim" },
  29: { ar: "الملك - المرسلات", en: "Al-Mulk - Al-Mursalat" },
  30: { ar: "النبأ - الناس", en: "An-Naba - An-Nas" },
}

// Start with empty - only show real claims that people add
const BASE_CLAIMS: JuzClaim[] = []

export function QuranKhatm({ lang }: QuranKhatmProps) {
  const [claims, setClaims] = useState<JuzClaim[]>(BASE_CLAIMS)
  const [selectedJuz, setSelectedJuz] = useState<number | null>(null)
  const [name, setName] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)

  const content = {
    ar: {
      title: "ختمة القرآن الجماعية",
      subtitle: "انضم للمجتمع في ختم القرآن دعاءً لشفاء إبراهيم",
      juz: "الجزء",
      available: "متاح",
      claimed: "محجوز",
      completed: "مكتمل",
      claimJuz: "احجز هذا الجزء",
      yourName: "اسمك",
      confirm: "تأكيد الحجز",
      cancel: "إلغاء",
      progress: "التقدم",
      juzOf30: "جزء من 30",
      thankYou: "جزاك الله خيراً! تم حجز الجزء لك.",
      readingTip: "عند الانتهاء، ادعُ: 'اللهم اشفِ إبراهيم علي واجعل هذه القراءة شفاعةً له'",
      completedBy: "أتمّها",
      claimedByLabel: "يقرأها",
    },
    en: {
      title: "Community Quran Khatm",
      subtitle: "Join the community in completing the Quran as dua for Ibrahim's healing",
      juz: "Juz",
      available: "Available",
      claimed: "Claimed",
      completed: "Completed",
      claimJuz: "Claim This Juz",
      yourName: "Your name",
      confirm: "Confirm Claim",
      cancel: "Cancel",
      progress: "Progress",
      juzOf30: "juz of 30",
      thankYou: "JazakAllah khair! The juz is now reserved for you.",
      readingTip: "When finished, make dua: 'O Allah, heal Ibrahim Ali and let this reading be intercession for him'",
      completedBy: "Completed by",
      claimedByLabel: "Reading by",
    },
  }

  const t = content[lang]

  // Load claims from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) {
          // Merge with base claims, preferring stored claims
          const storedJuzNumbers = parsed.map((c: JuzClaim) => c.juz)
          const baseClaims = BASE_CLAIMS.filter(c => !storedJuzNumbers.includes(c.juz))
          setClaims([...parsed, ...baseClaims])
        }
      } catch {
        // Use base claims
      }
    }
  }, [])

  const handleClaim = () => {
    if (selectedJuz && name.trim()) {
      const newClaim: JuzClaim = {
        juz: selectedJuz,
        claimedBy: name.trim(),
        completed: false,
        claimedAt: new Date().toISOString().split("T")[0],
      }

      const newClaims = [...claims.filter(c => c.juz !== selectedJuz), newClaim]
      setClaims(newClaims)

      // Save to localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newClaims))

      setShowSuccess(true)
      setSelectedJuz(null)
      setName("")

      setTimeout(() => setShowSuccess(false), 5000)
    }
  }

  const getJuzStatus = (juz: number) => {
    const claim = claims.find(c => c.juz === juz)
    if (!claim) return "available"
    if (claim.completed) return "completed"
    return "claimed"
  }

  const getJuzClaim = (juz: number) => claims.find(c => c.juz === juz)

  const completedCount = claims.filter(c => c.completed).length
  const claimedCount = claims.filter(c => !c.completed).length
  const progressPercent = (completedCount / 30) * 100

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-emerald-900/50 to-islamic-green-dark">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">📖</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{t.title}</h2>
          <p className="text-cream-light/80 max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        {/* Progress */}
        <Card className="bg-white/10 border-white/20 mb-8">
          <div className="p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-white font-medium">{t.progress}</span>
              <span className="text-islamic-gold font-bold">
                {completedCount} {t.juzOf30}
              </span>
            </div>
            <div className="h-4 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-islamic-gold to-islamic-green-light rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex justify-between text-sm mt-2 text-cream/80">
              <span>{completedCount} {t.completed}</span>
              <span>{claimedCount} {t.claimed}</span>
              <span>{30 - completedCount - claimedCount} {t.available}</span>
            </div>
          </div>
        </Card>

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 p-4 bg-islamic-green/30 rounded-xl border border-islamic-green-light/30 text-center">
            <p className="text-islamic-green-light font-medium">{t.thankYou}</p>
            <p className="text-cream-light/70 text-sm mt-2">{t.readingTip}</p>
          </div>
        )}

        {/* Juz Grid */}
        <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-10 gap-2 mb-8">
          {Array.from({ length: 30 }, (_, i) => i + 1).map((juz) => {
            const status = getJuzStatus(juz)
            const claim = getJuzClaim(juz)

            return (
              <button
                key={juz}
                onClick={() => status === "available" && setSelectedJuz(juz)}
                disabled={status !== "available"}
                className={`
                  relative aspect-square rounded-lg flex flex-col items-center justify-center
                  transition-all duration-200 text-sm font-bold
                  ${status === "available"
                    ? "bg-white/10 text-white hover:bg-islamic-gold/30 hover:text-islamic-gold cursor-pointer border border-white/20"
                    : status === "completed"
                    ? "bg-islamic-green/40 text-islamic-green-light border border-islamic-green-light/30"
                    : "bg-islamic-gold/20 text-islamic-gold/80 border border-islamic-gold/30"
                  }
                  ${selectedJuz === juz ? "ring-2 ring-islamic-gold" : ""}
                `}
              >
                <span className="text-lg">{juz}</span>
                {status === "completed" && (
                  <Check className="absolute bottom-1 h-3 w-3" />
                )}
                {status === "claimed" && (
                  <User className="absolute bottom-1 h-3 w-3" />
                )}
              </button>
            )
          })}
        </div>

        {/* Claim Panel */}
        {selectedJuz && (
          <Card className="bg-white/10 border-islamic-gold/50">
            <div className="p-6">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-16 h-16 rounded-xl bg-islamic-gold/20 flex items-center justify-center">
                    <BookOpen className="h-8 w-8 text-islamic-gold" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">
                      {t.juz} {selectedJuz}
                    </h3>
                    <p className="text-cream-light/70 text-sm">
                      {lang === "ar" ? JUZ_NAMES[selectedJuz].ar : JUZ_NAMES[selectedJuz].en}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                  <Input
                    placeholder={t.yourName}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/80 w-full sm:w-48"
                  />
                  <div className="flex gap-2">
                    <Button
                      onClick={handleClaim}
                      disabled={!name.trim()}
                      className="bg-islamic-gold hover:bg-islamic-gold/90 text-islamic-green-dark font-bold"
                    >
                      {t.confirm}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setSelectedJuz(null)}
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      {t.cancel}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Recent Claims */}
        <div className="mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {claims
              .sort((a, b) => (a.completed === b.completed ? 0 : a.completed ? 1 : -1))
              .slice(0, 6)
              .map((claim) => (
                <div
                  key={claim.juz}
                  className={`flex items-center gap-3 p-3 rounded-lg ${
                    claim.completed
                      ? "bg-islamic-green/20 border border-islamic-green/30"
                      : "bg-islamic-gold/10 border border-islamic-gold/20"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold ${
                    claim.completed
                      ? "bg-islamic-green/30 text-islamic-green-light"
                      : "bg-islamic-gold/20 text-islamic-gold"
                  }`}>
                    {claim.juz}
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">{claim.claimedBy}</p>
                    <p className="text-cream/80 text-xs">
                      {claim.completed ? t.completedBy : t.claimedByLabel}
                    </p>
                  </div>
                  {claim.completed && (
                    <Check className="h-5 w-5 text-islamic-green-light" />
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}
