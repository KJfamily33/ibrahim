"use client"

/**
 * Admin Page - Record Donations
 *
 * /admin - Password-protected form to record donations.
 * After recording, shows the verification URL to share with donor.
 */

import { useState } from 'react'
import { Shield, CheckCircle, Copy, ExternalLink, AlertCircle } from 'lucide-react'

interface DonationResult {
  success: boolean
  hash?: string
  verify_url?: string
  error?: string
}

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<DonationResult | null>(null)
  const [copied, setCopied] = useState(false)

  // Form fields
  const [donorName, setDonorName] = useState('')
  const [donorEmail, setDonorEmail] = useState('')
  const [amount, setAmount] = useState('')
  const [currency, setCurrency] = useState('EUR')
  const [dedication, setDedication] = useState('')
  const [isAnonymous, setIsAnonymous] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setResult(null)

    try {
      const response = await fetch('/api/zakat/record', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password,
          donor_name: donorName,
          donor_email: donorEmail || undefined,
          amount: parseFloat(amount),
          currency,
          dedication: dedication || undefined,
          is_anonymous: isAnonymous
        })
      })

      const data = await response.json()

      if (data.success) {
        setResult(data)
        setIsAuthenticated(true)
        // Reset form for next entry
        setDonorName('')
        setDonorEmail('')
        setAmount('')
        setDedication('')
        setIsAnonymous(false)
      } else {
        setResult({ success: false, error: data.error || 'Failed to record donation' })
      }
    } catch {
      setResult({ success: false, error: 'Network error. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a2e24] via-[#0d4a3a] to-[#0f5c48]">
      {/* Islamic Pattern Background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23c9a227' stroke-width='0.5'%3E%3Ccircle cx='60' cy='60' r='50'/%3E%3Ccircle cx='60' cy='60' r='35'/%3E%3Cpolygon points='60,10 75,40 110,45 85,65 92,100 60,80 28,100 35,65 10,45 45,40'/%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <div className="relative z-10 max-w-lg mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#c9a227]/20 mb-4">
            <Shield className="w-8 h-8 text-[#c9a227]" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">ZakatSeal Admin</h1>
          <p className="text-white/60">Record donations and generate verification links</p>
        </div>

        {/* Success Result */}
        {result?.success && (
          <div className="bg-green-500/20 border border-green-500/40 rounded-xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <p className="text-green-400 font-bold">Donation Sealed Successfully!</p>
            </div>

            <div className="bg-black/20 rounded-lg p-4 mb-4">
              <p className="text-white/60 text-xs mb-2">Verification URL (share with donor):</p>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={result.verify_url || ''}
                  readOnly
                  className="flex-1 bg-transparent text-white text-sm font-mono border-none outline-none"
                />
                <button
                  onClick={() => copyToClipboard(result.verify_url || '')}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  {copied ? (
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-white/60" />
                  )}
                </button>
                <a
                  href={result.verify_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-white/60" />
                </a>
              </div>
            </div>

            <p className="text-white/60 text-sm">
              Share this link with the donor. It&apos;s their permanent receipt.
            </p>
          </div>
        )}

        {/* Error Result */}
        {result?.error && (
          <div className="bg-red-500/20 border border-red-500/40 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-400" />
              <p className="text-red-400">{result.error}</p>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          {/* Password */}
          <div className="mb-6">
            <label className="block text-white/80 text-sm mb-2">Admin Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#c9a227]"
              placeholder="Enter admin password"
            />
          </div>

          <hr className="border-white/10 my-6" />

          {/* Donor Name */}
          <div className="mb-4">
            <label className="block text-white/80 text-sm mb-2">Donor Name *</label>
            <input
              type="text"
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
              required
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#c9a227]"
              placeholder="Full name"
            />
          </div>

          {/* Donor Email */}
          <div className="mb-4">
            <label className="block text-white/80 text-sm mb-2">Donor Email (optional)</label>
            <input
              type="email"
              value={donorEmail}
              onChange={(e) => setDonorEmail(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#c9a227]"
              placeholder="email@example.com"
            />
          </div>

          {/* Amount & Currency */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-white/80 text-sm mb-2">Amount *</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#c9a227]"
                placeholder="100"
              />
            </div>
            <div>
              <label className="block text-white/80 text-sm mb-2">Currency *</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#c9a227]"
              >
                <option value="EUR" className="bg-[#0a2e24]">EUR (€)</option>
                <option value="USD" className="bg-[#0a2e24]">USD ($)</option>
                <option value="GBP" className="bg-[#0a2e24]">GBP (£)</option>
                <option value="SAR" className="bg-[#0a2e24]">SAR (ر.س)</option>
                <option value="AED" className="bg-[#0a2e24]">AED (د.إ)</option>
                <option value="KWD" className="bg-[#0a2e24]">KWD (د.ك)</option>
                <option value="LYD" className="bg-[#0a2e24]">LYD (د.ل)</option>
              </select>
            </div>
          </div>

          {/* Dedication */}
          <div className="mb-4">
            <label className="block text-white/80 text-sm mb-2">Dedication (optional)</label>
            <textarea
              value={dedication}
              onChange={(e) => setDedication(e.target.value)}
              rows={2}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#c9a227] resize-none"
              placeholder="In memory of... / For the recovery of..."
            />
          </div>

          {/* Anonymous */}
          <div className="mb-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="w-5 h-5 rounded border-white/20 bg-white/10 text-[#c9a227] focus:ring-[#c9a227]"
              />
              <span className="text-white/80">Anonymous donation (hide name on donor wall)</span>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#c9a227] hover:bg-[#d4af37] disabled:bg-white/20 text-[#0a2e24] py-4 rounded-xl font-bold text-lg transition-colors"
          >
            {isLoading ? 'Sealing...' : 'Seal Donation'}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-8">
          <a href="/donors" className="text-[#c9a227] hover:underline text-sm">
            View Donor Wall →
          </a>
        </div>
      </div>
    </div>
  )
}
