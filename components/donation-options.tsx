"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, Mail, HeartHandshake, MapPin, Phone, MessageCircle } from "lucide-react"

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
      moneyExchangeDesc: "شركات الصرافة في طرابلس يمكنها استلام التحويلات الدولية وإيصالها لإبراهيم",
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
      note: "ملاحظة هامة: البنوك الليبية تعاني من أزمة سيولة. التحويل المباشر عبر شركات الصرافة هو الخيار الأكثر فعالية.",
      westernUnion: "ويسترن يونيون / موني غرام",
      westernUnionDesc: "متاح في بعض المناطق - تواصل مع إبراهيم للتأكد",
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
      note: "Important: Libyan banks face a liquidity crisis. Direct transfer via money exchange companies is the most effective option.",
      westernUnion: "Western Union / MoneyGram",
      westernUnionDesc: "Available in some areas - contact Ibrahim to confirm",
    },
  }

  const t = content[lang]

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-islamic-green mb-3">{t.title}</h2>
        <p className="text-base sm:text-lg text-gray-600">{t.subtitle}</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Card className="p-6 border-2 border-islamic-green shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-start gap-4">
            <div className="bg-islamic-green text-white p-3 rounded-lg">
              <Phone className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg text-islamic-green mb-2">{t.directContact}</h3>
              <p className="text-sm text-gray-600 mb-4">{t.directContactDesc}</p>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Button asChild size="sm" className="flex-1 bg-islamic-green hover:bg-islamic-green-dark text-white">
                    <a href="tel:+218916695689">
                      <Phone className="h-4 w-4 mr-1" />
                      {t.callNow}
                    </a>
                  </Button>
                  <Button asChild size="sm" className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                    <a href="https://wa.me/218916695689" target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      {t.whatsapp}
                    </a>
                  </Button>
                </div>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="w-full border-islamic-green text-islamic-green bg-transparent"
                >
                  <a href="mailto:Abraabre731@gmail.com">
                    <Mail className="h-4 w-4 mr-1" />
                    {t.contactEmail}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Money Exchange - PRIMARY OPTION */}
        <Card className="p-6 border-2 border-islamic-gold shadow-lg hover:shadow-xl transition-shadow bg-amber-50">
          <div className="flex items-start gap-4">
            <div className="bg-islamic-gold text-white p-3 rounded-lg">
              <Building2 className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg text-islamic-green mb-2">{t.moneyExchange}</h3>
              <p className="text-sm text-gray-600 mb-2">{t.moneyExchangeDesc}</p>
              <p className="text-xs text-islamic-gold font-medium mb-4">{t.moneyExchangeNote}</p>
              <Button asChild className="w-full bg-islamic-gold hover:bg-islamic-gold/90 text-white">
                <a
                  href="https://wa.me/218916695689?text=Hello%20Ibrahim%2C%20I%20want%20to%20help%20with%20money%20exchange%20transfer"
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

        {/* Charities */}
        <Card className="p-6 border-2 border-islamic-green/50 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-start gap-4">
            <div className="bg-islamic-green/80 text-white p-3 rounded-lg">
              <HeartHandshake className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg text-islamic-green mb-2">{t.charityPartner}</h3>
              <p className="text-sm text-gray-600 mb-3">{t.charityPartnerDesc}</p>
              <div className="text-xs text-gray-500 mb-3">
                <p className="font-semibold mb-1">{t.charities}:</p>
                <ul className="space-y-1">
                  {t.charitiesList.map((charity, i) => (
                    <li key={i} className="flex items-start gap-1">
                      <span className="text-islamic-green">•</span> {charity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Western Union */}
        <Card className="p-6 border-2 border-blue-400 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-start gap-4">
            <div className="bg-blue-500 text-white p-3 rounded-lg">
              <MapPin className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg text-islamic-green mb-2">{t.westernUnion}</h3>
              <p className="text-sm text-gray-600 mb-4">{t.westernUnionDesc}</p>
              <Button
                asChild
                variant="outline"
                className="w-full border-blue-500 text-blue-600 bg-transparent hover:bg-blue-50"
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
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
        <p className="text-sm text-gray-700">
          <strong className="text-red-700">{lang === "ar" ? "تنبيه:" : "Alert:"}</strong> {t.note}
        </p>
      </div>
    </div>
  )
}
