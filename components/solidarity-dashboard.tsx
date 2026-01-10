"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Heart, Users, Share2, HandHeart } from "lucide-react"

interface SolidarityDashboardProps {
  lang: "ar" | "en"
}

interface FeedItem {
  id: string
  type: "donation" | "prayer" | "share" | "dua"
  name: string
  location?: string
  amount?: number
  timeAgo: string
}

export function SolidarityDashboard({ lang }: SolidarityDashboardProps) {
  const [stats, setStats] = useState({
    raised: 2450,
    target: 20000,
    sponsors: 47,
    praying: 1247,
    shares: 2341,
  })

  const content = {
    ar: {
      title: "لوحة التضامن",
      raised: "تم جمعه",
      of: "من",
      sponsors: "يد",
      joined: "تحمل",
      praying: "يصلون",
      forIbrahim: "لإبراهيم",
      shares: "مشاركة",
      reached: "وصلت",
      liveFeed: "آخر التحديثات",
      currency: "€",
    },
    en: {
      title: "Solidarity Dashboard",
      raised: "RAISED",
      of: "of",
      sponsors: "HANDS",
      joined: "carrying",
      praying: "PRAYING",
      forIbrahim: "for Ibrahim",
      shares: "SHARES",
      reached: "reached",
      liveFeed: "Live Feed",
      currency: "€",
    },
  }

  const t = content[lang]

  const [feed, setFeed] = useState<FeedItem[]>([
    { id: "1", type: "donation", name: "Sister Amina", location: "Dubai", amount: 100, timeAgo: "2m" },
    { id: "2", type: "prayer", name: "Anonymous", timeAgo: "5m" },
    { id: "3", type: "dua", name: "Brother Yusuf", location: "London", timeAgo: "8m" },
    { id: "4", type: "share", name: "Khadija M.", location: "Toronto", timeAgo: "12m" },
    { id: "5", type: "donation", name: "Anonymous", amount: 50, timeAgo: "15m" },
  ])

  const feedMessages = {
    ar: {
      donation: (item: FeedItem) => `${item.name}${item.location ? ` (${item.location})` : ""} أضاف يده للثوب 💚`,
      prayer: (item: FeedItem) => `${item.name} أضاف صلاة 📿`,
      share: (item: FeedItem) => `${item.name}${item.location ? ` (${item.location})` : ""} شارك القصة`,
      dua: (item: FeedItem) => `${item.name}${item.location ? ` (${item.location})` : ""} انضم لدائرة الدعاء`,
    },
    en: {
      donation: (item: FeedItem) => `${item.name}${item.location ? ` (${item.location})` : ""} added their hand to the cloth 💚`,
      prayer: (item: FeedItem) => `${item.name} added prayers 📿`,
      share: (item: FeedItem) => `${item.name}${item.location ? ` (${item.location})` : ""} shared the story`,
      dua: (item: FeedItem) => `${item.name}${item.location ? ` (${item.location})` : ""} joined dua circle`,
    },
  }

  const getIcon = (type: FeedItem["type"]) => {
    switch (type) {
      case "donation": return "💚"
      case "prayer": return "📿"
      case "share": return "📱"
      case "dua": return "🤲"
    }
  }

  const progressPercent = Math.min((stats.raised / stats.target) * 100, 100)

  return (
    <section className="py-8 bg-islamic-green">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {/* Raised */}
          <div className="bg-white/10 rounded-xl p-4 text-center text-white">
            <div className="flex items-center justify-center gap-2 mb-2">
              <HandHeart className="h-5 w-5 text-islamic-gold" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-islamic-gold">
              {t.currency}{stats.raised.toLocaleString()}
            </div>
            <div className="text-xs sm:text-sm text-cream-light/80">
              {t.raised} {t.of} {t.currency}{stats.target.toLocaleString()}
            </div>
            {/* Progress bar */}
            <div className="mt-2 h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-islamic-gold rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Sponsors */}
          <div className="bg-white/10 rounded-xl p-4 text-center text-white">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Users className="h-5 w-5 text-islamic-gold" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold">{stats.sponsors}</div>
            <div className="text-xs sm:text-sm text-cream-light/80">{t.sponsors} {t.joined}</div>
          </div>

          {/* Praying */}
          <div className="bg-white/10 rounded-xl p-4 text-center text-white">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Heart className="h-5 w-5 text-islamic-gold" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold">{stats.praying.toLocaleString()}</div>
            <div className="text-xs sm:text-sm text-cream-light/80">{t.praying} {t.forIbrahim}</div>
          </div>

          {/* Shares */}
          <div className="bg-white/10 rounded-xl p-4 text-center text-white">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Share2 className="h-5 w-5 text-islamic-gold" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold">{stats.shares.toLocaleString()}</div>
            <div className="text-xs sm:text-sm text-cream-light/80">{t.shares} {t.reached}</div>
          </div>
        </div>

        {/* Live Feed */}
        <div className="bg-white/5 rounded-xl p-4">
          <h3 className="text-white/80 text-sm font-medium mb-3">{t.liveFeed}:</h3>
          <div className="space-y-2">
            {feed.slice(0, 5).map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 text-white/90 text-sm"
              >
                <span className="text-xs text-white/50 w-8">{item.timeAgo}</span>
                <span>{getIcon(item.type)}</span>
                <span>{feedMessages[lang][item.type](item)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
