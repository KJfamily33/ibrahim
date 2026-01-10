"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Heart, Feather, Users } from "lucide-react"

interface FeatherWingsProps {
  lang: "ar" | "en"
}

interface Supporter {
  id: number
  name: string
  location: string
  amount?: number
  type: "donor" | "prayer"
  timestamp: Date
}

// Mock data - would be real-time from database
const MOCK_SUPPORTERS: Supporter[] = [
  { id: 1, name: "Ahmed M.", location: "Kuwait", amount: 100, type: "donor", timestamp: new Date() },
  { id: 2, name: "Fatima K.", location: "Malaysia", type: "prayer", timestamp: new Date() },
  { id: 3, name: "Omar S.", location: "UK", amount: 50, type: "donor", timestamp: new Date() },
  { id: 4, name: "Aisha R.", location: "Egypt", type: "prayer", timestamp: new Date() },
  { id: 5, name: "Yusuf A.", location: "USA", amount: 200, type: "donor", timestamp: new Date() },
  { id: 6, name: "Maryam H.", location: "Indonesia", type: "prayer", timestamp: new Date() },
  { id: 7, name: "Khalid B.", location: "Saudi Arabia", amount: 500, type: "donor", timestamp: new Date() },
  { id: 8, name: "Zainab N.", location: "Pakistan", type: "prayer", timestamp: new Date() },
  { id: 9, name: "Hassan T.", location: "Turkey", amount: 75, type: "donor", timestamp: new Date() },
  { id: 10, name: "Noor J.", location: "Canada", type: "prayer", timestamp: new Date() },
  { id: 11, name: "Ibrahim W.", location: "Germany", amount: 150, type: "donor", timestamp: new Date() },
  { id: 12, name: "Salma D.", location: "UAE", type: "prayer", timestamp: new Date() },
]

export function FeatherWings({ lang }: FeatherWingsProps) {
  const [supporters, setSupporters] = useState<Supporter[]>(MOCK_SUPPORTERS)
  const [newName, setNewName] = useState("")
  const [newLocation, setNewLocation] = useState("")
  const [showForm, setShowForm] = useState(false)

  const content = {
    ar: {
      title: "أجنحة الأمة",
      subtitle: "كل داعم يضيف ريشة لجناحيه",
      description: "انضم لآلاف المسلمين الذين يحملون إبراهيم بدعائهم وتبرعاتهم",
      totalSupporters: "داعم",
      donors: "متبرع",
      prayers: "داعٍ",
      feathersAdded: "ريشة أُضيفت",
      addYourFeather: "أضف ريشتك",
      yourName: "اسمك",
      yourLocation: "موقعك",
      joining: "انضم للرحلة",
      joinPrayer: "انضم بالدعاء",
      joinDonation: "تبرع الآن",
      recentSupporters: "آخر الداعمين",
      prayerSupporter: "يدعو لإبراهيم",
      donorSupporter: "تبرع",
    },
    en: {
      title: "Wings of the Ummah",
      subtitle: "Each supporter adds a feather to his wings",
      description: "Join thousands of Muslims carrying Ibrahim with their prayers and donations",
      totalSupporters: "Supporters",
      donors: "Donors",
      prayers: "Praying",
      feathersAdded: "Feathers Added",
      addYourFeather: "Add Your Feather",
      yourName: "Your Name",
      yourLocation: "Your Location",
      joining: "Joining the Flight",
      joinPrayer: "Join in Prayer",
      joinDonation: "Donate Now",
      recentSupporters: "Recent Supporters",
      prayerSupporter: "Praying for Ibrahim",
      donorSupporter: "Donated",
    },
  }

  const t = content[lang]

  const totalDonors = supporters.filter((s) => s.type === "donor").length
  const totalPrayers = supporters.filter((s) => s.type === "prayer").length

  const addSupporter = (type: "donor" | "prayer") => {
    if (newName.trim()) {
      const newSupporter: Supporter = {
        id: Date.now(),
        name: newName,
        location: newLocation || "Unknown",
        type,
        timestamp: new Date(),
      }
      setSupporters([newSupporter, ...supporters])
      setNewName("")
      setNewLocation("")
      setShowForm(false)
    }
  }

  // Feather positions on wings (left and right)
  const leftFeathers = supporters.slice(0, Math.ceil(supporters.length / 2))
  const rightFeathers = supporters.slice(Math.ceil(supporters.length / 2))

  return (
    <section className="py-16 sm:py-24 falcon-sky relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 sacred-geometry opacity-20" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-islamic-gold/20 text-islamic-gold mb-4">
            <Feather className="h-4 w-4" />
            <span className="text-sm font-medium">{t.feathersAdded}: {supporters.length}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">{t.title}</h2>
          <p className="text-xl text-islamic-gold mb-2">{t.subtitle}</p>
          <p className="text-cream-light/70 max-w-2xl mx-auto">{t.description}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-12">
          <div className="text-center glass-card rounded-xl p-4">
            <Users className="h-6 w-6 text-islamic-gold mx-auto mb-2" />
            <p className="text-2xl sm:text-3xl font-bold text-white">{supporters.length}</p>
            <p className="text-cream-light/60 text-sm">{t.totalSupporters}</p>
          </div>
          <div className="text-center glass-card rounded-xl p-4">
            <Heart className="h-6 w-6 text-red-400 mx-auto mb-2" />
            <p className="text-2xl sm:text-3xl font-bold text-white">{totalDonors}</p>
            <p className="text-cream-light/60 text-sm">{t.donors}</p>
          </div>
          <div className="text-center glass-card rounded-xl p-4">
            <span className="text-2xl mb-2 block">🤲</span>
            <p className="text-2xl sm:text-3xl font-bold text-white">{totalPrayers}</p>
            <p className="text-cream-light/60 text-sm">{t.prayers}</p>
          </div>
        </div>

        {/* Wing Visualization */}
        <div className="relative mb-12">
          {/* Falcon Body (Center) */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <svg viewBox="0 0 100 120" className="w-24 h-28 text-islamic-gold">
                <ellipse cx="50" cy="40" rx="20" ry="25" fill="currentColor" opacity="0.3" />
                <ellipse cx="50" cy="45" rx="15" ry="20" fill="currentColor" opacity="0.5" />
                <circle cx="50" cy="30" r="12" fill="currentColor" />
                <path d="M45,25 L50,18 L55,25" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
          </div>

          {/* Feathers Grid */}
          <div className="grid grid-cols-2 gap-8">
            {/* Left Wing */}
            <div className="flex flex-wrap justify-end gap-2">
              {leftFeathers.map((supporter, index) => (
                <div
                  key={supporter.id}
                  className="feather-arrive"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all hover:scale-110 cursor-pointer ${
                      supporter.type === "donor"
                        ? "bg-islamic-gold/30 text-islamic-gold border border-islamic-gold/50"
                        : "bg-white/10 text-cream-light border border-white/20"
                    }`}
                    title={`${supporter.name} - ${supporter.location}`}
                  >
                    {supporter.name}
                  </div>
                </div>
              ))}
            </div>

            {/* Right Wing */}
            <div className="flex flex-wrap justify-start gap-2">
              {rightFeathers.map((supporter, index) => (
                <div
                  key={supporter.id}
                  className="feather-arrive"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all hover:scale-110 cursor-pointer ${
                      supporter.type === "donor"
                        ? "bg-islamic-gold/30 text-islamic-gold border border-islamic-gold/50"
                        : "bg-white/10 text-cream-light border border-white/20"
                    }`}
                    title={`${supporter.name} - ${supporter.location}`}
                  >
                    {supporter.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Add Your Feather Form */}
        <Card className="glass-card max-w-md mx-auto p-6">
          <h3 className="text-lg font-bold text-white text-center mb-4">{t.addYourFeather}</h3>

          {!showForm ? (
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => setShowForm(true)}
                className="flex-1 bg-islamic-gold hover:bg-islamic-gold/90 text-islamic-green-dark font-semibold"
              >
                <Heart className="h-4 w-4 mr-2" />
                {t.joinDonation}
              </Button>
              <Button
                onClick={() => setShowForm(true)}
                variant="outline"
                className="flex-1 border-white/50 text-white hover:bg-white/10 bg-transparent"
              >
                🤲 {t.joinPrayer}
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <Input
                placeholder={t.yourName}
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
              />
              <Input
                placeholder={t.yourLocation}
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
              />
              <div className="flex gap-2">
                <Button
                  onClick={() => addSupporter("donor")}
                  className="flex-1 bg-islamic-gold hover:bg-islamic-gold/90 text-islamic-green-dark"
                >
                  <Heart className="h-4 w-4 mr-1" />
                  {t.joinDonation}
                </Button>
                <Button
                  onClick={() => addSupporter("prayer")}
                  variant="outline"
                  className="flex-1 border-white/50 text-white hover:bg-white/10 bg-transparent"
                >
                  🤲
                </Button>
              </div>
            </div>
          )}
        </Card>

        {/* Recent Activity */}
        <div className="mt-12 text-center">
          <p className="text-cream-light/50 text-sm mb-4">{t.recentSupporters}</p>
          <div className="flex flex-wrap justify-center gap-2">
            {supporters.slice(0, 5).map((supporter) => (
              <div
                key={supporter.id}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-cream-light/70 text-sm"
              >
                <span>{supporter.type === "donor" ? "💛" : "🤲"}</span>
                <span className="font-medium">{supporter.name}</span>
                <span className="text-cream-light/40">•</span>
                <span className="text-cream-light/50">{supporter.location}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
