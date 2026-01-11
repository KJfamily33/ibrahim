"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Share2, Check } from "lucide-react"

interface ShareButtonsProps {
  lang: "ar" | "en"
}

export function ShareButtons({ lang }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const shareUrl = "https://ibrahim.help"
  const shareTextEn =
    "Help Ibrahim Ali - Islamic scholar & founder of islamland.com (140+ languages) needs urgent cancer surgery after 20 years of unpaid service. Libya's banking crisis blocks his savings. Please help & share!"
  const shareTextAr =
    "ساعد إبراهيم علي - عالم إسلامي مؤسس islamland.com (١٤٠+ لغة) يحتاج لجراحة سرطان عاجلة بعد ٢٠ عامًا من خدمة الأمة. أزمة البنوك الليبية تمنعه من الوصول لمدخراته. ساعد وانشر!"

  const shareText = lang === "ar" ? shareTextAr : shareTextEn

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
    email: `mailto:?subject=${encodeURIComponent(lang === "ar" ? "ساعد إبراهيم علي - حالة طبية عاجلة" : "Help Ibrahim Ali - Urgent Medical Case")}&body=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`,
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: lang === "ar" ? "ساعد إبراهيم علي" : "Help Ibrahim Ali",
          text: shareText,
          url: shareUrl,
        })
      } catch (err) {
        console.error("Error sharing:", err)
      }
    }
  }

  const content = {
    ar: {
      share: "شارك القصة",
      copyLink: "نسخ الرابط",
      copied: "تم النسخ!",
      email: "بريد إلكتروني",
    },
    en: {
      share: "Share Story",
      copyLink: "Copy Link",
      copied: "Copied!",
      email: "Email",
    },
  }

  const t = content[lang]

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg text-islamic-green">{t.share}</h3>

      {/* Native Share API (Mobile) */}
      {typeof navigator !== "undefined" && typeof navigator.share === "function" && (
        <Button onClick={handleShare} className="w-full bg-islamic-gold hover:bg-islamic-gold/90 text-white">
          <Share2 className="h-4 w-4 mr-2" />
          {t.share}
        </Button>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <Button
          asChild
          variant="outline"
          className="border-islamic-green/30 text-islamic-green hover:bg-islamic-green hover:text-white"
        >
          <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer">
            <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            WhatsApp
          </a>
        </Button>

        <Button
          asChild
          variant="outline"
          className="border-islamic-green/30 text-islamic-green hover:bg-islamic-green hover:text-white"
        >
          <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer">
            <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            X/Twitter
          </a>
        </Button>

        <Button
          asChild
          variant="outline"
          className="border-islamic-green/30 text-islamic-green hover:bg-islamic-green hover:text-white"
        >
          <a href={shareLinks.telegram} target="_blank" rel="noopener noreferrer">
            <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
            </svg>
            Telegram
          </a>
        </Button>

        <Button
          asChild
          variant="outline"
          className="border-islamic-green/30 text-islamic-green hover:bg-islamic-green hover:text-white"
        >
          <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer">
            <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </a>
        </Button>

        <Button
          asChild
          variant="outline"
          className="border-islamic-green/30 text-islamic-green hover:bg-islamic-green hover:text-white"
        >
          <a href={shareLinks.email}>
            <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            {t.email}
          </a>
        </Button>

        <Button
          onClick={copyToClipboard}
          variant="outline"
          className="border-islamic-green/30 text-islamic-green hover:bg-islamic-green hover:text-white"
        >
          {copied ? <Check className="h-4 w-4 mr-2" /> : <Share2 className="h-4 w-4 mr-2" />}
          {copied ? t.copied : t.copyLink}
        </Button>
      </div>
    </div>
  )
}
