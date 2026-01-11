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
    raised: 0,
    target: 20000,
    sponsors: 0,
    praying: 0,
    shares: 0,
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

  const [feed, setFeed] = useState<FeedItem[]>([])

  const feedMessages = {
    ar: {
      donation: (item: FeedItem) => `${item.name}${item.location ? ` (${item.location})` : ""} أضاف يده للثوب`,
      prayer: (item: FeedItem) => `${item.name} أضاف صلاة`,
      share: (item: FeedItem) => `${item.name}${item.location ? ` (${item.location})` : ""} شارك القصة`,
      dua: (item: FeedItem) => `${item.name}${item.location ? ` (${item.location})` : ""} انضم لدائرة الدعاء`,
    },
    en: {
      donation: (item: FeedItem) => `${item.name}${item.location ? ` (${item.location})` : ""} added their hand to the cloth`,
      prayer: (item: FeedItem) => `${item.name} added prayers`,
      share: (item: FeedItem) => `${item.name}${item.location ? ` (${item.location})` : ""} shared the story`,
      dua: (item: FeedItem) => `${item.name}${item.location ? ` (${item.location})` : ""} joined dua circle`,
    },
  }

  const getIcon = (type: FeedItem["type"]) => {
    switch (type) {
      case "donation": return <span className="text-islamic-gold">💚</span>
      case "prayer": return <span className="text-purple-400">📿</span>
      case "share": return <span className="text-blue-400">📱</span>
      case "dua": return <span className="text-islamic-gold">🤲</span>
    }
  }

  const progressPercent = Math.min((stats.raised / stats.target) * 100, 100)

  return (
    <section className="py-12 sm:py-16 section-green relative overflow-hidden">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 sacred-geometry opacity-5" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 mb-8">
          {/* Raised */}
          <div className="stat-card rounded-2xl p-5 sm:p-6 text-center hover-lift">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-xl bg-islamic-gold/20 flex items-center justify-center">
                <HandHeart className="h-5 w-5 text-islamic-gold" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-bold text-islamic-gold font-display">
              {t.currency}{stats.raised.toLocaleString()}
            </div>
            <div className="text-sm text-cream/80 mt-1">
              {t.raised} {t.of} {t.currency}{stats.target.toLocaleString()}
            </div>
            {/* Progress bar */}
            <div className="mt-4 h-2.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-islamic-gold to-islamic-gold-light rounded-full transition-all duration-700"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Sponsors */}
          <div className="stat-card rounded-2xl p-5 sm:p-6 text-center hover-lift">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-400" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-bold text-white font-display">
              {stats.sponsors}
            </div>
            <div className="text-sm text-cream/80 mt-1">
              {t.sponsors} {t.joined}
            </div>
          </div>

          {/* Praying */}
          <div className="stat-card rounded-2xl p-5 sm:p-6 text-center hover-lift">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
                <Heart className="h-5 w-5 text-red-400" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-bold text-white font-display">
              {stats.praying.toLocaleString()}
            </div>
            <div className="text-sm text-cream/80 mt-1">
              {t.praying} {t.forIbrahim}
            </div>
          </div>

          {/* Shares */}
          <div className="stat-card rounded-2xl p-5 sm:p-6 text-center hover-lift">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <Share2 className="h-5 w-5 text-purple-400" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-bold text-white font-display">
              {stats.shares.toLocaleString()}
            </div>
            <div className="text-sm text-cream/80 mt-1">
              {t.shares} {t.reached}
            </div>
          </div>
        </div>

        {/* Live Feed */}
        <div className="glass-card rounded-2xl p-5 sm:p-6">
          <h3 className="text-cream font-semibold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            {t.liveFeed}
          </h3>
          <div className="space-y-3">
            {feed.length === 0 ? (
              <div className="text-center py-8">
                <span className="text-4xl mb-3 block">🤲</span>
                <p className="text-cream/80 text-base font-medium">
                  {lang === "ar" ? "كن أول من يضع يده على الثوب" : "Be the first to put your hand on the cloth"}
                </p>
                <p className="text-cream/50 text-sm mt-2">
                  {lang === "ar" ? "دعمك يظهر هنا فوراً" : "Your support appears here instantly"}
                </p>
              </div>
            ) : (
              feed.slice(0, 5).map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-3 bg-white/5 rounded-xl border border-white/10"
                >
                  <span className="text-xs text-cream/60 w-12 flex-shrink-0">{item.timeAgo}</span>
                  <span className="text-lg">{getIcon(item.type)}</span>
                  <span className="text-cream/90 text-sm flex-1">{feedMessages[lang][item.type](item)}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
