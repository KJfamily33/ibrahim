"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Heart } from "lucide-react"

interface DuaCircleProps {
  lang: "ar" | "en"
}

const STORAGE_KEY = "ibrahim-dua-circle"

// Start with empty - only show real names that people add
const BASE_NAMES: string[] = []

export function DuaCircle({ lang }: DuaCircleProps) {
  const [name, setName] = useState("")
  const [prayerType, setPrayerType] = useState("")
  const [names, setNames] = useState<string[]>(BASE_NAMES)
  const [submitted, setSubmitted] = useState(false)
  const [showAll, setShowAll] = useState(false)

  const content = {
    ar: {
      title: "إبراهيم يدعو لكم",
      subtitle: "أضف اسمك وسيدعو لك إبراهيم",
      namePlaceholder: "اسمك",
      prayerTypes: [
        { value: "health", label: "الصحة والعافية" },
        { value: "family", label: "العائلة" },
        { value: "rizq", label: "الرزق" },
        { value: "guidance", label: "الهداية" },
        { value: "other", label: "أخرى" },
      ],
      selectPrayer: "ماذا يدعو لك إبراهيم؟ (اختياري)",
      submit: "أضفني لدائرة الدعاء",
      praying: "إبراهيم يدعو لـ",
      believers: "مؤمن",
      thankYou: "شكراً لك! إبراهيم سيدعو لك",
      showMore: "عرض المزيد",
      showLess: "عرض أقل",
    },
    en: {
      title: "Ibrahim Prays For You",
      subtitle: "Add your name and Ibrahim will make dua for you",
      namePlaceholder: "Your name",
      prayerTypes: [
        { value: "health", label: "Health & Wellness" },
        { value: "family", label: "Family" },
        { value: "rizq", label: "Provision (Rizq)" },
        { value: "guidance", label: "Guidance" },
        { value: "other", label: "Other" },
      ],
      selectPrayer: "What should Ibrahim pray for? (optional)",
      submit: "Add Me to Dua Circle",
      praying: "Ibrahim is praying for",
      believers: "believers",
      thankYou: "Thank you! Ibrahim will make dua for you",
      showMore: "Show more",
      showLess: "Show less",
    },
  }

  const t = content[lang]

  // Load names from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed) && parsed.length > 0) {
          setNames([...parsed, ...BASE_NAMES])
        }
      } catch {
        // Use base names
      }
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      const newNames = [name.trim(), ...names]
      setNames(newNames)

      // Save to localStorage (only user-added names)
      const userNames = newNames.filter(n => !BASE_NAMES.includes(n))
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userNames))

      setSubmitted(true)
      setName("")
      setPrayerType("")

      setTimeout(() => setSubmitted(false), 3000)
    }
  }

  const displayNames = showAll ? names : names.slice(0, 12)

  return (
    <section className="py-12 sm:py-16 bg-cream-dark">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="border-islamic-green/20 shadow-lg overflow-hidden">
          <div className="bg-islamic-green text-white p-6 text-center">
            <div className="text-4xl mb-3">🤲</div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2 font-arabic">
              {lang === "ar" ? t.title : "إبراهيم يدعو لكم"}
            </h2>
            <p className="text-xl text-cream-light">
              {lang === "ar" ? "Ibrahim Prays For You" : t.title}
            </p>
            <p className="text-cream-light/80 mt-2">{t.subtitle}</p>
          </div>

          <div className="p-6">
            {/* Counter */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-islamic-gold/10 px-6 py-3 rounded-full">
                <Heart className="h-5 w-5 text-islamic-gold" />
                <span className="text-lg font-bold text-islamic-green">
                  {t.praying} <span className="text-islamic-gold">{names.length}</span> {t.believers}
                </span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 mb-8">
              <div>
                <Input
                  type="text"
                  placeholder={t.namePlaceholder}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="text-center text-lg py-6 border-islamic-green/30 focus:border-islamic-green"
                  dir={lang === "ar" ? "rtl" : "ltr"}
                />
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2 text-center">{t.selectPrayer}</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {t.prayerTypes.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setPrayerType(type.value)}
                      className={`px-4 py-2 rounded-full text-sm transition-all ${
                        prayerType === type.value
                          ? "bg-islamic-green text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-islamic-gold hover:bg-islamic-gold/90 text-islamic-green-dark font-semibold text-lg py-6"
              >
                {t.submit}
              </Button>

              {submitted && (
                <div className="text-center p-4 bg-islamic-green/10 rounded-lg text-islamic-green font-medium animate-fade-in">
                  {t.thankYou} 🤲
                </div>
              )}
            </form>

            {/* Names Display */}
            <div className="border-t border-gray-200 pt-6">
              <div className="flex flex-wrap justify-center gap-2">
                {displayNames.map((n, index) => (
                  <span
                    key={`${n}-${index}`}
                    className="px-3 py-1 bg-islamic-green/5 text-islamic-green rounded-full text-sm"
                  >
                    {n}
                  </span>
                ))}
              </div>
              {names.length > 12 && (
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="mt-4 w-full text-center text-islamic-green hover:text-islamic-green-dark text-sm"
                >
                  {showAll ? t.showLess : `${t.showMore} (${names.length - 12} more)`}
                </button>
              )}
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
