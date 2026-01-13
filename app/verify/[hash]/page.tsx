/**
 * Donation Verification Page
 *
 * /verify/[hash] - Public page showing donation details with Islamic styling.
 * This is the permanent "receipt" for zakat/sadaqah donations.
 */

import { getDonationByHash } from '@/lib/zakat-store'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, Shield, Heart } from 'lucide-react'

interface Props {
  params: Promise<{ hash: string }>
}

export default async function VerifyPage({ params }: Props) {
  const { hash } = await params
  const donation = await getDonationByHash(hash)

  if (!donation) {
    notFound()
  }

  const displayName = donation.is_anonymous ? 'متبرع كريم / Generous Donor' : donation.donor_name
  const formattedDate = new Date(donation.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  const currencySymbols: Record<string, string> = {
    EUR: '€',
    USD: '$',
    GBP: '£',
    SAR: 'ر.س',
    AED: 'د.إ',
    KWD: 'د.ك',
    LYD: 'د.ل'
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a2e24] via-[#0d4a3a] to-[#0f5c48]" dir="ltr">
      {/* Islamic Pattern Background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23c9a227' stroke-width='0.5'%3E%3Ccircle cx='60' cy='60' r='50'/%3E%3Ccircle cx='60' cy='60' r='35'/%3E%3Cpolygon points='60,10 75,40 110,45 85,65 92,100 60,80 28,100 35,65 10,45 45,40'/%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#c9a227]/20 mb-4">
            <CheckCircle className="w-10 h-10 text-[#c9a227]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            توثيق التبرع
          </h1>
          <p className="text-xl text-white/80">Donation Verified</p>
        </div>

        {/* Main Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/20 mb-6">
          {/* Bismillah */}
          <p className="text-center text-[#c9a227] text-lg mb-6 font-arabic">
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </p>

          {/* Donor Info */}
          <div className="text-center mb-8">
            <p className="text-white/60 text-sm mb-1">Donated by / تبرع من</p>
            <p className="text-2xl font-bold text-white">{displayName}</p>
          </div>

          {/* Amount */}
          <div className="text-center mb-8 py-6 bg-[#c9a227]/10 rounded-xl">
            <p className="text-white/60 text-sm mb-1">Amount / المبلغ</p>
            <p className="text-4xl font-bold text-[#c9a227]">
              {currencySymbols[donation.currency]}{donation.amount.toLocaleString()}
            </p>
            <p className="text-white/60 text-sm mt-1">{donation.currency}</p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-white/5 rounded-xl p-4">
              <p className="text-white/60 text-xs mb-1">Campaign</p>
              <p className="text-white font-medium">Ibrahim Surgery Fund</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <p className="text-white/60 text-xs mb-1">Date</p>
              <p className="text-white font-medium text-sm">{formattedDate}</p>
            </div>
          </div>

          {/* Dedication */}
          {donation.dedication && (
            <div className="mb-8 p-4 bg-white/5 rounded-xl border-l-4 border-[#c9a227]">
              <p className="text-white/60 text-xs mb-2">Dedication / إهداء</p>
              <p className="text-white italic">&quot;{donation.dedication}&quot;</p>
            </div>
          )}

          {/* Verification Hash */}
          <div className="bg-black/20 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-[#c9a227]" />
              <p className="text-white/60 text-xs">Verification Hash / معرّف التوثيق</p>
            </div>
            <p className="text-white/80 font-mono text-xs break-all">{donation.hash}</p>
          </div>
        </div>

        {/* Blockchain Notice */}
        <div className="bg-[#c9a227]/10 border border-[#c9a227]/30 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-[#c9a227] mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-white font-medium text-sm mb-1">Permanent Record</p>
              <p className="text-white/70 text-xs">
                This donation is sealed with a cryptographic hash that cannot be altered.
                The hash above is your permanent proof of contribution.
              </p>
            </div>
          </div>
        </div>

        {/* Dua Section */}
        <div className="text-center mb-8 py-6">
          <p className="text-[#c9a227] text-lg mb-2 font-arabic">
            جزاك الله خيرًا
          </p>
          <p className="text-white/60 text-sm">
            May Allah reward you abundantly
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/donors"
            className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white py-3 px-6 rounded-xl transition-colors"
          >
            <Heart className="w-4 h-4" />
            View Donor Wall
          </Link>
          <Link
            href="/"
            className="flex-1 flex items-center justify-center gap-2 bg-[#c9a227] hover:bg-[#d4af37] text-[#0a2e24] py-3 px-6 rounded-xl font-bold transition-colors"
          >
            Donate Again
          </Link>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-white/40 text-xs">
            ibrahim.help - Help Ibrahim Heal
          </p>
        </div>
      </div>
    </div>
  )
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props) {
  const { hash } = await params
  const donation = await getDonationByHash(hash)

  if (!donation) {
    return {
      title: 'Donation Not Found - ibrahim.help'
    }
  }

  const displayName = donation.is_anonymous ? 'Anonymous Donor' : donation.donor_name

  return {
    title: `Donation Verified - ${displayName} - ibrahim.help`,
    description: `Verified zakat/sadaqah donation to Help Ibrahim Heal campaign.`,
    openGraph: {
      title: `Donation Verified - ibrahim.help`,
      description: `${displayName} donated to help Sheikh Ibrahim. May Allah reward them.`,
    }
  }
}
