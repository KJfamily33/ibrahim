"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, Mail, HeartHandshake, MapPin, Phone, MessageCircle, ArrowRight, AlertTriangle, Copy, Check, Wallet, CreditCard, ExternalLink } from "lucide-react"

interface DonationOptionsProps {
  lang: "ar" | "en"
}

// Crypto addresses - Jesse as intermediary bridge
const CRYPTO_ADDRESSES = {
  ton: "UQBZenh5TFhBoxH4VPv1HDS16XcZ9_2XVZcUSMhmnzxTJUxf",
  usdc: "0x14E6076eAC2420e56b4E2E18c815b2DD52264D54", // Base network
}

export function DonationOptions({ lang }: DonationOptionsProps) {
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null)

  const copyToClipboard = (address: string, type: string) => {
    navigator.clipboard.writeText(address)
    setCopiedAddress(type)
    setTimeout(() => setCopiedAddress(null), 2000)
  }

  const content = {
    ar: {
      title: "خيارات الدعم المالي",
      subtitle: "بسبب أزمة البنوك الليبية، هذه هي الطرق المتاحة لإيصال المساعدة",

      // NEW: Direct donation options
      donateNowTitle: "تبرع الآن",
      donateNowSubtitle: "طرق مباشرة للتبرع",

      launchgoodTitle: "تبرع عبر LaunchGood",
      launchgoodDesc: "منصة التمويل الجماعي الإسلامية - تقبل البطاقات والتحويلات",
      launchgoodButton: "تبرع عبر LaunchGood",
      launchgoodNote: "الحملة قيد الإعداد - سيتم التحديث قريباً",

      cryptoTitle: "تبرع بالعملات الرقمية",
      cryptoDesc: "تحويل فوري بدون وسيط مصرفي",
      tonLabel: "TON (تيليجرام)",
      usdcLabel: "USDC (شبكة Base)",
      copyAddress: "نسخ العنوان",
      copied: "تم النسخ!",
      cryptoNote: "التبرعات تُحوَّل لإبراهيم عبر وسيط موثوق",

      directContact: "تواصل مباشر مع إبراهيم",
      directContactDesc: "للتنسيق المباشر مع إبراهيم شخصياً",
      charityPartner: "عبر الجمعيات الخيرية",
      charityPartnerDesc: "الجمعيات الخيرية الإسلامية في الكويت والخليج يمكنها المساعدة مباشرة",
      moneyExchange: "تحويل عبر شركات الصرافة",
      moneyExchangeDesc:
        "شركات الصرافة في طرابلس يمكنها استلام التحويلات الدولية وإيصالها لإبراهيم",
      moneyExchangeNote: "تواصل مع إبراهيم للحصول على تفاصيل شركة الصرافة",
      contactEmail: "البريد الإلكتروني",
      callNow: "اتصل الآن",
      whatsapp: "واتساب",
      getDetails: "احصل على تفاصيل التحويل",
      charities: "الجمعيات الخيرية المقترحة",
      charitiesList: [
        "جمعية إحياء التراث الإسلامي - الكويت",
        "بيت الزكاة الكويتي",
        "الهيئة الخيرية الإسلامية العالمية",
        "جمعية العون المباشر",
      ],
      note: "البنوك الليبية تعاني من أزمة سيولة. التحويل المباشر عبر شركات الصرافة هو الخيار الأكثر فعالية.",
      westernUnion: "ويسترن يونيون / موني غرام",
      westernUnionDesc: "متاح في بعض المناطق - تواصل مع إبراهيم للتأكد",
      recommended: "موصى به",
      otherOptions: "خيارات إضافية",
    },
    en: {
      title: "Financial Support Options",
      subtitle: "Due to Libya's banking crisis, these are the available ways to get help to Ibrahim",

      // NEW: Direct donation options
      donateNowTitle: "Donate Now",
      donateNowSubtitle: "Direct ways to donate",

      launchgoodTitle: "Donate via LaunchGood",
      launchgoodDesc: "Islamic crowdfunding platform - accepts cards and transfers",
      launchgoodButton: "Donate on LaunchGood",
      launchgoodNote: "Campaign being set up - will update soon",

      cryptoTitle: "Donate with Crypto",
      cryptoDesc: "Instant transfer, no bank intermediary needed",
      tonLabel: "TON (Telegram)",
      usdcLabel: "USDC (Base Network)",
      copyAddress: "Copy Address",
      copied: "Copied!",
      cryptoNote: "Donations forwarded to Ibrahim via trusted intermediary",

      directContact: "Direct Contact with Ibrahim",
      directContactDesc: "Coordinate directly with Ibrahim personally",
      charityPartner: "Through Islamic Charities",
      charityPartnerDesc: "Islamic charities in Kuwait and the Gulf can help directly",
      moneyExchange: "Money Exchange Transfer",
      moneyExchangeDesc:
        "Money exchange companies in Tripoli can receive international transfers and deliver to Ibrahim",
      moneyExchangeNote: "Contact Ibrahim for exchange company details",
      contactEmail: "Email",
      callNow: "Call Now",
      whatsapp: "WhatsApp",
      getDetails: "Get Transfer Details",
      charities: "Suggested Charities",
      charitiesList: [
        "Revival of Islamic Heritage Society - Kuwait",
        "Kuwait Zakat House",
        "International Islamic Charitable Organization",
        "Direct Aid Society",
      ],
      note: "Libyan banks face a liquidity crisis. Direct transfer via money exchange companies is the most effective option.",
      westernUnion: "Western Union / MoneyGram",
      westernUnionDesc: "Available in some areas - contact Ibrahim to confirm",
      recommended: "Recommended",
      otherOptions: "Additional Options",
    },
  }

  const t = content[lang]

  return (
    <div className="space-y-8">
      <div className="text-center mb-10">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-islamic-green mb-4">{t.title}</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t.subtitle}</p>
      </div>

      {/* PRIMARY DONATION OPTIONS */}
      <div className="space-y-5 mb-10">
        {/* LaunchGood - Primary CTA */}
        <Card className="p-6 sm:p-8 border-2 border-islamic-gold bg-gradient-to-br from-islamic-gold/10 to-amber-50 shadow-xl rounded-2xl relative overflow-hidden">
          <div className="absolute top-4 right-4 bg-islamic-gold text-islamic-green-dark text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <span>⭐</span> {t.recommended}
          </div>

          <div className="flex items-start gap-5">
            <div className="bg-islamic-gold text-islamic-green-dark p-4 rounded-2xl shadow-md">
              <CreditCard className="h-7 w-7" />
            </div>
            <div className="flex-1">
              <h3 className="font-display font-bold text-2xl text-islamic-green mb-2">{t.launchgoodTitle}</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">{t.launchgoodDesc}</p>
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto bg-islamic-gold hover:bg-islamic-gold-light text-islamic-green-dark font-bold text-lg px-8 py-6 shadow-lg"
              >
                <a href="https://www.launchgood.com/start" target="_blank" rel="noopener noreferrer">
                  {t.launchgoodButton}
                  <ExternalLink className="h-5 w-5 ml-2" />
                </a>
              </Button>
              <p className="text-xs text-islamic-gold font-medium mt-3">{t.launchgoodNote}</p>
            </div>
          </div>
        </Card>

        {/* Crypto Options */}
        <Card className="p-6 sm:p-8 border-2 border-blue-300 bg-gradient-to-br from-blue-50 to-white shadow-xl rounded-2xl">
          <div className="flex items-start gap-5">
            <div className="bg-blue-500 text-white p-4 rounded-2xl shadow-md">
              <Wallet className="h-7 w-7" />
            </div>
            <div className="flex-1">
              <h3 className="font-display font-bold text-2xl text-islamic-green mb-2">{t.cryptoTitle}</h3>
              <p className="text-gray-600 mb-5 leading-relaxed">{t.cryptoDesc}</p>

              <div className="space-y-4">
                {/* TON Address */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-blue-700 text-sm">{t.tonLabel}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-blue-300 text-blue-600 hover:bg-blue-100"
                      onClick={() => copyToClipboard(CRYPTO_ADDRESSES.ton, 'ton')}
                    >
                      {copiedAddress === 'ton' ? (
                        <><Check className="h-4 w-4 mr-1" /> {t.copied}</>
                      ) : (
                        <><Copy className="h-4 w-4 mr-1" /> {t.copyAddress}</>
                      )}
                    </Button>
                  </div>
                  <code className="text-xs sm:text-sm text-blue-800 break-all font-mono bg-white/50 p-2 rounded block">
                    {CRYPTO_ADDRESSES.ton}
                  </code>
                </div>

                {/* USDC Address */}
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-green-700 text-sm">{t.usdcLabel}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-green-300 text-green-600 hover:bg-green-100"
                      onClick={() => copyToClipboard(CRYPTO_ADDRESSES.usdc, 'usdc')}
                    >
                      {copiedAddress === 'usdc' ? (
                        <><Check className="h-4 w-4 mr-1" /> {t.copied}</>
                      ) : (
                        <><Copy className="h-4 w-4 mr-1" /> {t.copyAddress}</>
                      )}
                    </Button>
                  </div>
                  <code className="text-xs sm:text-sm text-green-800 break-all font-mono bg-white/50 p-2 rounded block">
                    {CRYPTO_ADDRESSES.usdc}
                  </code>
                </div>
              </div>

              <p className="text-xs text-gray-500 mt-4 italic">{t.cryptoNote}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* OTHER OPTIONS HEADER */}
      <div className="text-center mb-6">
        <h3 className="font-display text-xl font-bold text-islamic-green">{t.otherOptions}</h3>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {/* Direct Contact */}
        <Card className="p-6 sm:p-7 border-2 border-islamic-green/20 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 bg-white rounded-2xl">
          <div className="flex items-start gap-5">
            <div className="bg-islamic-green text-white p-4 rounded-2xl shadow-md">
              <Phone className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-display font-bold text-xl text-islamic-green mb-2">{t.directContact}</h3>
              <p className="text-sm text-gray-600 mb-5 leading-relaxed">{t.directContactDesc}</p>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <Button asChild size="sm" className="flex-1 bg-islamic-green hover:bg-islamic-green-dark text-white font-semibold">
                    <a href="tel:+218916695689">
                      <Phone className="h-4 w-4 mr-2" />
                      {t.callNow}
                    </a>
                  </Button>
                  <Button asChild size="sm" className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold">
                    <a href="https://wa.me/218916695689" target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      {t.whatsapp}
                    </a>
                  </Button>
                </div>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="w-full border-2 border-islamic-green/30 text-islamic-green hover:bg-islamic-green/5 font-medium"
                >
                  <a href="mailto:Abraabre731@gmail.com">
                    <Mail className="h-4 w-4 mr-2" />
                    {t.contactEmail}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Money Exchange - PRIMARY OPTION */}
        <Card className="p-6 sm:p-7 border-2 border-islamic-gold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 bg-gradient-to-br from-amber-50 to-white rounded-2xl relative overflow-hidden">
          {/* Recommended badge */}
          <div className="absolute top-4 right-4 bg-islamic-gold text-islamic-green-dark text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <span>⭐</span> {t.recommended}
          </div>

          <div className="flex items-start gap-5">
            <div className="bg-islamic-gold text-islamic-green-dark p-4 rounded-2xl shadow-md">
              <Building2 className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-display font-bold text-xl text-islamic-green mb-2">{t.moneyExchange}</h3>
              <p className="text-sm text-gray-600 mb-2 leading-relaxed">{t.moneyExchangeDesc}</p>
              <p className="text-xs text-islamic-gold font-semibold mb-5">{t.moneyExchangeNote}</p>
              <Button asChild className="w-full bg-islamic-gold hover:bg-islamic-gold-light text-islamic-green-dark font-bold shadow-md">
                <a
                  href="https://wa.me/218916695689?text=Hello%20Ibrahim%2C%20I%20want%20to%20help%20with%20money%20exchange%20transfer"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  {t.getDetails}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </Card>

        {/* Charities */}
        <Card className="p-6 sm:p-7 border-2 border-islamic-green/10 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 bg-white rounded-2xl">
          <div className="flex items-start gap-5">
            <div className="bg-islamic-green/80 text-white p-4 rounded-2xl shadow-md">
              <HeartHandshake className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-display font-bold text-xl text-islamic-green mb-2">{t.charityPartner}</h3>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">{t.charityPartnerDesc}</p>
              <div className="bg-cream-warm rounded-xl p-4 border border-islamic-green/10">
                <p className="font-semibold text-xs text-islamic-green mb-2">{t.charities}:</p>
                <ul className="space-y-1.5">
                  {t.charitiesList.map((charity, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                      <span className="text-islamic-green mt-0.5">•</span>
                      <span>{charity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Western Union */}
        <Card className="p-6 sm:p-7 border-2 border-blue-200 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 bg-white rounded-2xl">
          <div className="flex items-start gap-5">
            <div className="bg-blue-500 text-white p-4 rounded-2xl shadow-md">
              <MapPin className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-display font-bold text-xl text-islamic-green mb-2">{t.westernUnion}</h3>
              <p className="text-sm text-gray-600 mb-5 leading-relaxed">{t.westernUnionDesc}</p>
              <Button
                asChild
                variant="outline"
                className="w-full border-2 border-blue-300 text-blue-600 hover:bg-blue-50 font-medium"
              >
                <a
                  href="https://wa.me/218916695689?text=Hello%20Ibrahim%2C%20can%20I%20send%20via%20Western%20Union%3F"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  {t.getDetails}
                </a>
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Important Note */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500 p-5 rounded-r-xl flex items-start gap-4">
        <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-gray-700 leading-relaxed">
          <strong className="text-red-600">{lang === "ar" ? "تنبيه:" : "Alert:"}</strong> {t.note}
        </p>
      </div>
    </div>
  )
}
