"use client"

import { useState, useEffect, useCallback } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface TasbihCounterProps {
  lang: "ar" | "en"
}

interface TasbihCounts {
  subhanallah: number
  alhamdulillah: number
  allahuakbar: number
}

const STORAGE_KEY = "ibrahim-tasbih-counts"

// Start with zero - only show real prayers that people add
const BASE_COUNTS: TasbihCounts = {
  subhanallah: 0,
  alhamdulillah: 0,
  allahuakbar: 0,
}

export function TasbihCounter({ lang }: TasbihCounterProps) {
  const [counts, setCounts] = useState<TasbihCounts>(BASE_COUNTS)
  const [recentClick, setRecentClick] = useState<string | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const content = {
    ar: {
      title: "صَلِّ من أجل شفاء إبراهيم",
      subtitle: "اضغط لإضافة صلواتك إلى العداد العالمي",
      totalPrayers: "صلاة من أجل إبراهيم",
      subhanallah: "سُبْحَانَ اللَّه",
      subhanallahEn: "Glory to Allah",
      alhamdulillah: "الْحَمْدُ لِلَّه",
      alhamdulillahEn: "Praise to Allah",
      allahuakbar: "اللَّهُ أَكْبَر",
      allahuakbarEn: "Allah is Greatest",
      completeSet: "مجموعة كاملة (100)",
      completeSetDesc: "33 + 33 + 34",
      prayerAdded: "تمت إضافة صلاتك",
      milestone: "ماشاء الله!",
    },
    en: {
      title: "Pray for Ibrahim's Healing",
      subtitle: "Click to add your prayers to the global count",
      totalPrayers: "prayers for Ibrahim",
      subhanallah: "SubhanAllah",
      subhanallahEn: "Glory to Allah",
      alhamdulillah: "Alhamdulillah",
      alhamdulillahEn: "Praise to Allah",
      allahuakbar: "Allahu Akbar",
      allahuakbarEn: "Allah is Greatest",
      completeSet: "Complete Set (100)",
      completeSetDesc: "33 + 33 + 34",
      prayerAdded: "Your prayer has been added",
      milestone: "MashaAllah!",
    },
  }

  const t = content[lang]

  // Load counts from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setCounts({
          subhanallah: BASE_COUNTS.subhanallah + (parsed.subhanallah || 0),
          alhamdulillah: BASE_COUNTS.alhamdulillah + (parsed.alhamdulillah || 0),
          allahuakbar: BASE_COUNTS.allahuakbar + (parsed.allahuakbar || 0),
        })
      } catch {
        // Invalid stored data, use base counts
      }
    }
  }, [])

  // Save to localStorage
  const saveToStorage = useCallback((newCounts: TasbihCounts) => {
    const userContributions = {
      subhanallah: newCounts.subhanallah - BASE_COUNTS.subhanallah,
      alhamdulillah: newCounts.alhamdulillah - BASE_COUNTS.alhamdulillah,
      allahuakbar: newCounts.allahuakbar - BASE_COUNTS.allahuakbar,
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userContributions))
  }, [])

  const handleClick = useCallback((type: keyof TasbihCounts, amount: number = 1) => {
    setRecentClick(type)
    setIsAnimating(true)

    setCounts(prev => {
      const newCounts = { ...prev, [type]: prev[type] + amount }
      saveToStorage(newCounts)
      return newCounts
    })

    setTimeout(() => {
      setRecentClick(null)
      setIsAnimating(false)
    }, 300)
  }, [saveToStorage])

  const handleCompleteSet = useCallback(() => {
    setIsAnimating(true)
    setCounts(prev => {
      const newCounts = {
        subhanallah: prev.subhanallah + 33,
        alhamdulillah: prev.alhamdulillah + 33,
        allahuakbar: prev.allahuakbar + 34,
      }
      saveToStorage(newCounts)
      return newCounts
    })
    setTimeout(() => setIsAnimating(false), 500)
  }, [saveToStorage])

  const totalPrayers = counts.subhanallah + counts.alhamdulillah + counts.allahuakbar

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat(lang === "ar" ? "ar-SA" : "en-US").format(num)
  }

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-islamic-green to-islamic-green-dark">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="bg-white/10 border-white/20 text-white overflow-hidden">
          <div className="p-6 sm:p-8 text-center">
            {/* Header */}
            <div className="mb-8">
              <div className="text-4xl mb-4">📿</div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">{t.title}</h2>
              <p className="text-cream-light/80">{t.subtitle}</p>
            </div>

            {/* Total Counter */}
            <div className="mb-8 p-6 bg-white/10 rounded-2xl">
              <div className={`text-5xl sm:text-6xl font-bold text-islamic-gold mb-2 transition-transform ${isAnimating ? 'scale-110' : ''}`}>
                {formatNumber(totalPrayers)}
              </div>
              <p className="text-cream-light">{t.totalPrayers}</p>
            </div>

            {/* Three Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {/* SubhanAllah */}
              <button
                onClick={() => handleClick('subhanallah')}
                className={`p-6 rounded-xl bg-white/10 hover:bg-white/20 transition-all border-2 border-transparent hover:border-islamic-gold ${recentClick === 'subhanallah' ? 'scale-105 border-islamic-gold' : ''}`}
              >
                <div className="text-2xl sm:text-3xl font-arabic font-bold text-white mb-1">
                  {lang === "ar" ? t.subhanallah : "سُبْحَانَ اللَّه"}
                </div>
                <div className="text-sm text-cream-light/80 mb-3">
                  {lang === "ar" ? t.subhanallahEn : t.subhanallah}
                </div>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-islamic-gold text-islamic-green-dark font-bold text-lg mb-2">
                  +1
                </div>
                <div className="text-xl font-bold text-islamic-gold">
                  {formatNumber(counts.subhanallah)}
                </div>
              </button>

              {/* Alhamdulillah */}
              <button
                onClick={() => handleClick('alhamdulillah')}
                className={`p-6 rounded-xl bg-white/10 hover:bg-white/20 transition-all border-2 border-transparent hover:border-islamic-gold ${recentClick === 'alhamdulillah' ? 'scale-105 border-islamic-gold' : ''}`}
              >
                <div className="text-2xl sm:text-3xl font-arabic font-bold text-white mb-1">
                  {lang === "ar" ? t.alhamdulillah : "الْحَمْدُ لِلَّه"}
                </div>
                <div className="text-sm text-cream-light/80 mb-3">
                  {lang === "ar" ? t.alhamdulillahEn : t.alhamdulillah}
                </div>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-islamic-gold text-islamic-green-dark font-bold text-lg mb-2">
                  +1
                </div>
                <div className="text-xl font-bold text-islamic-gold">
                  {formatNumber(counts.alhamdulillah)}
                </div>
              </button>

              {/* Allahu Akbar */}
              <button
                onClick={() => handleClick('allahuakbar')}
                className={`p-6 rounded-xl bg-white/10 hover:bg-white/20 transition-all border-2 border-transparent hover:border-islamic-gold ${recentClick === 'allahuakbar' ? 'scale-105 border-islamic-gold' : ''}`}
              >
                <div className="text-2xl sm:text-3xl font-arabic font-bold text-white mb-1">
                  {lang === "ar" ? t.allahuakbar : "اللَّهُ أَكْبَر"}
                </div>
                <div className="text-sm text-cream-light/80 mb-3">
                  {lang === "ar" ? t.allahuakbarEn : t.allahuakbar}
                </div>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-islamic-gold text-islamic-green-dark font-bold text-lg mb-2">
                  +1
                </div>
                <div className="text-xl font-bold text-islamic-gold">
                  {formatNumber(counts.allahuakbar)}
                </div>
              </button>
            </div>

            {/* Complete Set Button */}
            <Button
              onClick={handleCompleteSet}
              size="lg"
              className="bg-islamic-gold hover:bg-islamic-gold/90 text-islamic-green-dark font-semibold text-lg px-8"
            >
              {t.completeSet}
              <span className="text-sm opacity-70 ml-2">({t.completeSetDesc})</span>
            </Button>

            {/* Hadith */}
            <div className="mt-8 p-4 bg-white/5 rounded-lg">
              <p className="text-sm text-cream-light/80 font-arabic leading-relaxed">
                {lang === "ar"
                  ? '"من قال سبحان الله وبحمده في يوم مائة مرة حُطت خطاياه وإن كانت مثل زبد البحر"'
                  : '"Whoever says SubhanAllahi wa bihamdihi 100 times a day will have his sins forgiven even if they were as much as the foam of the sea"'}
              </p>
              <p className="text-xs text-cream-light/60 mt-2">
                — {lang === "ar" ? "صحيح البخاري" : "Sahih al-Bukhari"}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
