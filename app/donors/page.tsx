"use client"

/**
 * Donor Wall - Public Page
 *
 * /donors - Shows all donations with Islamic styling.
 * A place for the community to see who has donated and make dua for them.
 */

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Heart, Users, Trophy, ExternalLink } from 'lucide-react'

interface Donation {
  hash: string
  display_name: string
  display_name_ar: string
  amount: number
  currency: string
  campaign: string
  dedication?: string
  created_at: string
}

interface Stats {
  total_donations: number
  total_amount_eur: number
  unique_donors: number
}

const currencySymbols: Record<string, string> = {
  EUR: '€',
  USD: '$',
  GBP: '£',
  SAR: 'ر.س',
  AED: 'د.إ',
  KWD: 'د.ك',
  LYD: 'د.ل'
}

export default function DonorsPage() {
  const [donations, setDonations] = useState<Donation[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch('/api/zakat/donors')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setDonations(data.donations)
          setStats(data.stats)
        }
      })
      .catch((error) => {
        console.error('Failed to load donors:', error)
      })
      .finally(() => setIsLoading(false))
  }, [])

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a2e24] via-[#0d4a3a] to-[#0f5c48]">
      {/* Islamic Pattern Background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23c9a227' stroke-width='0.5'%3E%3Ccircle cx='60' cy='60' r='50'/%3E%3Ccircle cx='60' cy='60' r='35'/%3E%3Cpolygon points='60,10 75,40 110,45 85,65 92,100 60,80 28,100 35,65 10,45 45,40'/%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            جدار المتبرعين
          </h1>
          <p className="text-xl text-white/80 mb-4">Donor Wall</p>
          <p className="text-white/60 max-w-lg mx-auto">
            May Allah reward all who have donated generously.
            Say a prayer for them as you scroll.
          </p>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-3 gap-4 mb-12">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center border border-white/10">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#c9a227]/20 mb-2">
                <Heart className="w-5 h-5 text-[#c9a227]" />
              </div>
              <p className="text-2xl font-bold text-white">{stats.total_donations}</p>
              <p className="text-white/60 text-sm">Donations</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center border border-white/10">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#c9a227]/20 mb-2">
                <Trophy className="w-5 h-5 text-[#c9a227]" />
              </div>
              <p className="text-2xl font-bold text-white">€{stats.total_amount_eur.toLocaleString()}</p>
              <p className="text-white/60 text-sm">Raised</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center border border-white/10">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#c9a227]/20 mb-2">
                <Users className="w-5 h-5 text-[#c9a227]" />
              </div>
              <p className="text-2xl font-bold text-white">{stats.unique_donors}</p>
              <p className="text-white/60 text-sm">Donors</p>
            </div>
          </div>
        )}

        {/* Dua Banner */}
        <div className="bg-[#c9a227]/10 border border-[#c9a227]/30 rounded-xl p-6 mb-8 text-center">
          <p className="text-[#c9a227] text-xl font-arabic mb-2">
            اللهم اجزهم خير الجزاء
          </p>
          <p className="text-white/70">
            O Allah, reward them with the best reward
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-2 border-[#c9a227] border-t-transparent rounded-full animate-spin" />
            <p className="text-white/60 mt-4">Loading donors...</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && donations.length === 0 && (
          <div className="text-center py-12 bg-white/5 rounded-2xl">
            <Heart className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <p className="text-white/60 mb-4">No donations recorded yet.</p>
            <Link
              href="/#donate"
              className="inline-flex items-center gap-2 bg-[#c9a227] hover:bg-[#d4af37] text-[#0a2e24] py-3 px-6 rounded-xl font-bold transition-colors"
            >
              Be the First to Donate
            </Link>
          </div>
        )}

        {/* Donations List */}
        {donations.length > 0 && (
          <div className="space-y-4">
            {donations.map((donation, index) => (
              <div
                key={donation.hash}
                className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/10 hover:border-[#c9a227]/30 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  {/* Donor Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {/* Rank Badge for top 3 */}
                      {index < 3 && (
                        <span className={`
                          inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold
                          ${index === 0 ? 'bg-yellow-500/20 text-yellow-400' : ''}
                          ${index === 1 ? 'bg-gray-400/20 text-gray-300' : ''}
                          ${index === 2 ? 'bg-orange-600/20 text-orange-400' : ''}
                        `}>
                          {index + 1}
                        </span>
                      )}
                      <h3 className="text-white font-bold">{donation.display_name}</h3>
                    </div>

                    {/* Dedication */}
                    {donation.dedication && (
                      <p className="text-white/60 text-sm italic mb-2">
                        &quot;{donation.dedication}&quot;
                      </p>
                    )}

                    {/* Date */}
                    <p className="text-white/40 text-xs">{formatDate(donation.created_at)}</p>
                  </div>

                  {/* Amount */}
                  <div className="text-right">
                    <p className="text-[#c9a227] font-bold text-lg">
                      {currencySymbols[donation.currency]}{donation.amount.toLocaleString()}
                    </p>
                    <Link
                      href={`/verify/${donation.hash}`}
                      className="inline-flex items-center gap-1 text-white/40 hover:text-[#c9a227] text-xs transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Verify
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer CTA */}
        <div className="text-center mt-12 pt-8 border-t border-white/10">
          <p className="text-white/60 mb-4">Want to join these generous donors?</p>
          <Link
            href="/#donate"
            className="inline-flex items-center gap-2 bg-[#c9a227] hover:bg-[#d4af37] text-[#0a2e24] py-3 px-8 rounded-xl font-bold transition-colors"
          >
            <Heart className="w-5 h-5" />
            Donate Now
          </Link>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <Link href="/" className="text-white/40 hover:text-white text-sm">
            ← Back to ibrahim.help
          </Link>
        </div>
      </div>
    </div>
  )
}
