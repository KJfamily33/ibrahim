"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, Mail, HeartHandshake, MapPin, Phone, MessageCircle, ArrowRight, AlertTriangle } from "lucide-react"

interface DonationOptionsProps {
  lang: "ar" | "en"
}

export function DonationOptions({ lang }: DonationOptionsProps) {
  const content = {
    ar: {
      title: "خيارات الدعم المالي",
      subtitle: "بسبب أزمة البنوك الليبية، هذه هي الطرق المتاحة لإيصال المساعدة",
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
    },
    en: {
      title: "Financial Support Options",
      subtitle: "Due to Libya's banking crisis, these are the available ways to get help to Ibrahim",
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
    },
  }

  const t = content[lang]

  return (
    <div className="space-y-8">
      <div className="text-center mb-10">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-islamic-green mb-4">{t.title}</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t.subtitle}</p>
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
