"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Plane, Check } from "lucide-react"

interface PilgrimageCarriersProps {
  lang: "ar" | "en"
}

interface Carrier {
  id: string
  name: string
  country: string
  departureDate: string
  status: "preparing" | "traveling" | "in_mecca" | "completed"
  willBringZamzam: boolean
  testimony?: string
}

const STORAGE_KEY = "ibrahim-pilgrimage-carriers"

// Start with empty - only show real carriers that people add
const BASE_CARRIERS: Carrier[] = []

export function PilgrimageCarriers({ lang }: PilgrimageCarriersProps) {
  const [carriers, setCarriers] = useState<Carrier[]>(BASE_CARRIERS)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    departureDate: "",
    willBringZamzam: false,
  })
  const [submitted, setSubmitted] = useState(false)

  const content = {
    ar: {
      title: "احمل إبراهيم إلى الكعبة",
      subtitle: "الدعاء عند الكعبة يُضاعَف 100,000 مرة. إذا كنت ذاهباً لمكة، احمل أخانا معك.",
      currentCarriers: "الحاملون الحاليون",
      completedPilgrimages: "الحجات المكتملة",
      preparing: "يستعد",
      traveling: "في الطريق",
      inMecca: "في مكة الآن",
      completed: "اكتمل",
      departing: "المغادرة",
      willBringZamzam: "سيحضر ماء زمزم",
      signUp: "سأحمل اسم إبراهيم",
      form: {
        name: "اسمك",
        country: "بلدك",
        departureDate: "تاريخ المغادرة",
        bringZamzam: "سأحضر ماء زمزم لإبراهيم",
        submit: "التزم بحمل اسمه",
        cancel: "إلغاء",
      },
      instructions: {
        title: "ماذا يفعل الحاملون:",
        items: [
          "اكتب 'إبراهيم علي، ليبيا - الشفاء من السرطان' على ورقة واحملها في جيبك",
          "ادعُ له خاصةً عند الكعبة",
          "إن أمكن، المس الحجر الأسود وأنت تذكر اسمه",
          "اختياري: أحضر ماء زمزم (سننسق الشحن لتونس)",
        ],
      },
      thankYou: "جزاك الله خيراً! ستُضاف إلى قائمة الحاملين.",
    },
    en: {
      title: "Carry Ibrahim to the Kaaba",
      subtitle:
        "Prayers at the Kaaba are multiplied 100,000x. If you're going to Mecca, carry our brother with you.",
      currentCarriers: "Current Carriers",
      completedPilgrimages: "Completed Pilgrimages",
      preparing: "Preparing",
      traveling: "Traveling",
      inMecca: "In Mecca Now",
      completed: "Completed",
      departing: "Departing",
      willBringZamzam: "Will bring Zamzam",
      signUp: "I Will Carry Ibrahim's Name",
      form: {
        name: "Your name",
        country: "Your country",
        departureDate: "Departure date",
        bringZamzam: "I will bring Zamzam water for Ibrahim",
        submit: "Commit to Carry His Name",
        cancel: "Cancel",
      },
      instructions: {
        title: "What carriers do:",
        items: [
          "Write 'Ibrahim Ali, Libya - healing from cancer' on paper and carry it in your pocket",
          "Make special dua for him at the Kaaba",
          "If possible, touch the Black Stone while mentioning his name",
          "Optional: Bring back Zamzam water (we coordinate shipping to Tunisia)",
        ],
      },
      thankYou: "JazakAllah khair! You'll be added to the carriers list.",
    },
  }

  const t = content[lang]

  // Load carriers from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCarriers([...parsed, ...BASE_CARRIERS])
        }
      } catch {
        // Use base carriers
      }
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.country && formData.departureDate) {
      const newCarrier: Carrier = {
        id: Date.now().toString(),
        name: formData.name,
        country: formData.country,
        departureDate: formData.departureDate,
        status: "preparing",
        willBringZamzam: formData.willBringZamzam,
      }

      const newCarriers = [newCarrier, ...carriers]
      setCarriers(newCarriers)

      // Save to localStorage (only user-added carriers)
      const userCarriers = newCarriers.filter((c) => !BASE_CARRIERS.find((b) => b.id === c.id))
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userCarriers))

      setSubmitted(true)
      setShowForm(false)
      setFormData({ name: "", country: "", departureDate: "", willBringZamzam: false })

      setTimeout(() => setSubmitted(false), 5000)
    }
  }

  const getStatusBadge = (status: Carrier["status"]) => {
    const styles = {
      preparing: "bg-yellow-500/20 text-yellow-300",
      traveling: "bg-blue-500/20 text-blue-300",
      in_mecca: "bg-islamic-gold/30 text-islamic-gold",
      completed: "bg-islamic-green/30 text-islamic-green-light",
    }
    const labels = {
      preparing: t.preparing,
      traveling: t.traveling,
      in_mecca: t.inMecca,
      completed: t.completed,
    }
    return (
      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${styles[status]}`}>
        {labels[status]}
      </span>
    )
  }

  const activeCarriers = carriers.filter((c) => c.status !== "completed")
  const completedCarriers = carriers.filter((c) => c.status === "completed")

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-amber-900/30 to-amber-950/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="bg-black/20 border-islamic-gold/30 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-islamic-gold/20 to-amber-600/20 p-6 text-center border-b border-islamic-gold/20">
            <div className="text-4xl mb-3">🕋</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{t.title}</h2>
            <p className="text-cream-light/80 max-w-2xl mx-auto">{t.subtitle}</p>
          </div>

          <div className="p-6">
            {/* Active Carriers */}
            {activeCarriers.length > 0 && (
              <div className="mb-6">
                <h3 className="text-white font-medium mb-3 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-islamic-gold" />
                  {t.currentCarriers}
                </h3>
                <div className="space-y-3">
                  {activeCarriers.map((carrier) => (
                    <div
                      key={carrier.id}
                      className="flex items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/10"
                    >
                      <div className="w-10 h-10 rounded-full bg-islamic-gold/20 flex items-center justify-center">
                        <span className="text-islamic-gold font-bold">
                          {carrier.name.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-white font-medium">{carrier.name}</span>
                          <span className="text-cream-light/60 text-sm">({carrier.country})</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-cream-light/60 text-xs">
                            {t.departing}: {new Date(carrier.departureDate).toLocaleDateString()}
                          </span>
                          {carrier.willBringZamzam && (
                            <span className="text-blue-300 text-xs flex items-center gap-1">
                              💧 {t.willBringZamzam}
                            </span>
                          )}
                        </div>
                      </div>
                      {getStatusBadge(carrier.status)}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Completed Pilgrimages */}
            {completedCarriers.length > 0 && (
              <div className="mb-6">
                <h3 className="text-white font-medium mb-3 flex items-center gap-2">
                  <Check className="h-4 w-4 text-islamic-green-light" />
                  {t.completedPilgrimages}: {completedCarriers.length}
                </h3>
                {completedCarriers.map((carrier) => (
                  <div
                    key={carrier.id}
                    className="p-4 bg-islamic-green/10 rounded-lg border border-islamic-green/20"
                  >
                    {carrier.testimony && (
                      <p className="text-cream-light/90 italic mb-2">"{carrier.testimony}"</p>
                    )}
                    <p className="text-islamic-green-light text-sm">
                      — {carrier.name}, {carrier.country}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Instructions */}
            <div className="mb-6 p-4 bg-white/5 rounded-lg border border-white/10">
              <h4 className="text-white font-medium mb-2">{t.instructions.title}</h4>
              <ul className="space-y-2">
                {t.instructions.items.map((item, i) => (
                  <li key={i} className="text-cream-light/80 text-sm flex items-start gap-2">
                    <span className="text-islamic-gold">☐</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Form or Button */}
            {showForm ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  placeholder={t.form.name}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  required
                />
                <Input
                  placeholder={t.form.country}
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  required
                />
                <Input
                  type="date"
                  value={formData.departureDate}
                  onChange={(e) => setFormData({ ...formData, departureDate: e.target.value })}
                  className="bg-white/10 border-white/20 text-white"
                  required
                />
                <label className="flex items-center gap-2 text-white cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.willBringZamzam}
                    onChange={(e) => setFormData({ ...formData, willBringZamzam: e.target.checked })}
                    className="rounded border-white/20"
                  />
                  <span className="text-sm">{t.form.bringZamzam}</span>
                </label>
                <div className="flex gap-3">
                  <Button
                    type="submit"
                    className="flex-1 bg-islamic-gold hover:bg-islamic-gold/90 text-islamic-green-dark"
                  >
                    <Plane className="h-4 w-4 mr-2" />
                    {t.form.submit}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowForm(false)}
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    {t.form.cancel}
                  </Button>
                </div>
              </form>
            ) : (
              <Button
                onClick={() => setShowForm(true)}
                className="w-full bg-islamic-gold hover:bg-islamic-gold/90 text-islamic-green-dark font-semibold py-6"
              >
                🕋 {t.signUp}
              </Button>
            )}

            {submitted && (
              <div className="mt-4 p-4 bg-islamic-green/20 rounded-lg text-islamic-green-light text-center">
                {t.thankYou}
              </div>
            )}
          </div>
        </Card>
      </div>
    </section>
  )
}
