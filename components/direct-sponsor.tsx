"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Plane,
  Building2,
  Hotel,
  Copy,
  Check,
  ExternalLink,
  FileText,
  Calculator,
  Heart,
  Shield
} from "lucide-react"

interface DirectSponsorProps {
  lang: "ar" | "en"
}

// Clinic details - VERIFIED FROM OFFICIAL BANK DOCUMENT
const CLINIC_DETAILS = {
  name: "Clinique El Menzah",
  nameAr: "مصحة المنزه",
  company: "STE Polyclinique Espoir",
  address: "1, rue Apollo XI, 1082 Cité Mahrajène, Tunis, Tunisia",
  phone: "+216 71 841 522",
  doctorPhone: "+216 50 508 383", // Dr. Smida direct
  email: "polyclinique.elmenzah@gnet.tn",
  website: "www.polyclinique-elmenzah.com",
  iban: "TN59 0800 8000 6759 0004 9648",
  bankName: "BIAT (Banque Internationale Arabe de Tunisie)",
  swiftBic: "BIATTNTT",
  cost: "€10,000",
  costIncludes: "Hospitalization, pharmacy, doctor's fees",
  invoiceAvailable: true,
}

// Beneficiary details for flight booking
const BENEFICIARY = {
  fullName: "Ibrahim Ali",
  passportCountry: "Libya",
  phone: "+218 91-669-5689",
  email: "Abraabre731@gmail.com",
}

// Flight details
const FLIGHT_INFO = {
  from: "Tripoli, Libya (TIP) or Mitiga (MJI)",
  to: "Tunis, Tunisia (TUN)",
  dates: "Flexible - coordinate with Ibrahim",
  airlines: ["Tunisair", "Libyan Airlines", "Turkish Airlines (via Istanbul)"],
  estimatedCost: "€150-300 one way",
}

export function DirectSponsor({ lang }: DirectSponsorProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const content = {
    ar: {
      title: "كن راعياً مباشراً",
      subtitle: "ادفع مباشرة للمستشفى أو احجز تذكرته — احصل على إيصالك للضرائب",

      clinicTitle: "ادفع للمستشفى مباشرة",
      clinicDesc: "حوّل مباشرة للمستشفى التونسي — إيصال رسمي لسجلاتك",
      clinicPending: "تفاصيل البنك قادمة قريباً",
      clinicPendingDesc: "ننتظر تفاصيل IBAN من المستشفى. تواصل مع إبراهيم للتنسيق.",

      flightTitle: "احجز تذكرته",
      flightDesc: "احجز الرحلة باسمه — التذكرة باسمك للإيصال",
      flightRoute: "المسار",
      flightDates: "التواريخ",
      flightAirlines: "شركات الطيران",
      flightPassenger: "المسافر",
      bookNow: "احجز عبر",
      coordinateFirst: "نسّق مع إبراهيم أولاً للتواريخ",

      hotelTitle: "احجز إقامته",
      hotelDesc: "احجز فندق بالقرب من المستشفى — ١٤ ليلة للتعافي",
      hotelLocation: "تونس، بالقرب من المستشفى",
      hotelDuration: "١٤ ليلة تقريباً",
      hotelNote: "نسّق مع إبراهيم لموقع المستشفى",

      zakatTitle: "هل يُحتسب من الزكاة؟",
      zakatYes: "نعم — هذا يُحتسب زكاة",
      zakatExplanation: "العلاج الطبي للمحتاج يُعد من مصارف الزكاة الشرعية (الغارمين/في سبيل الله). إبراهيم لا يستطيع الوصول لأمواله بسبب أزمة البنوك الليبية.",
      zakatScholars: "المراجع الفقهية",

      taxTitle: "خصم ضريبي",
      taxDesc: "الدفع المباشر للمستشفى أو شركة الطيران = إيصال باسمك",
      taxCountries: "تحقق من قوانين بلدك للخصم الخيري",

      contactIbrahim: "تواصل مع إبراهيم",
      whatsappCoordinate: "واتساب للتنسيق",
    },
    en: {
      title: "Become a Direct Sponsor",
      subtitle: "Pay the hospital directly or book his ticket — get your receipt for taxes",

      clinicTitle: "Pay the Hospital Directly",
      clinicDesc: "Wire transfer directly to Tunisian clinic — official receipt for your records",
      clinicPending: "Bank details coming soon",
      clinicPendingDesc: "Awaiting IBAN details from the clinic. Contact Ibrahim to coordinate.",

      flightTitle: "Book His Flight",
      flightDesc: "Book the flight in his name — ticket receipt in YOUR name for tax purposes",
      flightRoute: "Route",
      flightDates: "Dates",
      flightAirlines: "Airlines",
      flightPassenger: "Passenger",
      bookNow: "Book via",
      coordinateFirst: "Coordinate with Ibrahim first for exact dates",

      hotelTitle: "Book His Accommodation",
      hotelDesc: "Book a hotel near the clinic — 14 nights for recovery",
      hotelLocation: "Tunis, near clinic",
      hotelDuration: "~14 nights",
      hotelNote: "Coordinate with Ibrahim for clinic location",

      zakatTitle: "Does This Count as Zakat?",
      zakatYes: "Yes — This qualifies as Zakat",
      zakatExplanation: "Medical treatment for someone in need is a valid Zakat expenditure (al-gharimin / fi sabil Allah). Ibrahim cannot access his own funds due to Libya's banking crisis.",
      zakatScholars: "Scholarly References",

      taxTitle: "Tax Deduction",
      taxDesc: "Direct payment to hospital or airline = receipt in YOUR name",
      taxCountries: "Check your country's laws for charitable deductions",

      contactIbrahim: "Contact Ibrahim",
      whatsappCoordinate: "WhatsApp to Coordinate",
    },
  }

  const t = content[lang]

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-cream to-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-islamic-gold/20 text-islamic-gold text-sm font-semibold mb-4">
            <Shield className="h-4 w-4" />
            {lang === "ar" ? "للمتبرعين الكبار" : "For Major Donors"}
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-islamic-green mb-4">
            {t.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-10">
          {/* PAY HOSPITAL DIRECTLY */}
          <Card className="p-6 sm:p-8 border-2 border-islamic-green/20 bg-white shadow-xl rounded-2xl">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-islamic-green text-white p-4 rounded-2xl">
                <Building2 className="h-7 w-7" />
              </div>
              <div>
                <h3 className="font-display font-bold text-xl text-islamic-green mb-1">
                  {t.clinicTitle}
                </h3>
                <p className="text-gray-600 text-sm">{t.clinicDesc}</p>
              </div>
            </div>

            {/* Verified Clinic Info */}
            <div className="space-y-3 mb-5">
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Check className="h-4 w-4 text-green-600" />
                  <p className="text-xs text-green-700 font-semibold">Verified Clinic</p>
                </div>
                <p className="font-bold text-gray-800">{CLINIC_DETAILS.name}</p>
                <p className="text-sm text-gray-600">{CLINIC_DETAILS.nameAr} • {CLINIC_DETAILS.company}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">Address</p>
                <p className="text-sm text-gray-800">{CLINIC_DETAILS.address}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">Contact</p>
                <p className="text-sm text-gray-800">Tel: {CLINIC_DETAILS.phone}</p>
                <p className="text-sm text-gray-800">Dr. Smida: {CLINIC_DETAILS.doctorPhone}</p>
                <a href={`https://${CLINIC_DETAILS.website}`} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                  {CLINIC_DETAILS.website}
                </a>
              </div>
              <div className="bg-islamic-gold/10 border border-islamic-gold/30 rounded-lg p-3">
                <p className="text-xs text-islamic-gold font-semibold mb-1">Treatment Cost</p>
                <p className="font-bold text-xl text-islamic-green">{CLINIC_DETAILS.cost}</p>
                <p className="text-xs text-gray-600">{CLINIC_DETAILS.costIncludes}</p>
              </div>
            </div>

            {/* IBAN Still Pending */}
            {CLINIC_DETAILS.iban === "PENDING" ? (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="font-semibold text-amber-700 mb-2 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  {t.clinicPending}
                </p>
                <p className="text-amber-600 text-sm mb-4">{t.clinicPendingDesc}</p>
                <Button
                  asChild
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold"
                >
                  <a
                    href="https://wa.me/218916695689?text=Assalamu%20Alaikum%20Ibrahim%2C%20I%20want%20to%20pay%20Clinique%20El%20Menzah%20directly.%20Can%20you%20ask%20Dr.%20Smida%20for%20the%20bank%20IBAN%3F"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t.whatsappCoordinate}
                  </a>
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">IBAN</p>
                  <div className="flex items-center justify-between">
                    <code className="font-mono text-sm text-gray-800">{CLINIC_DETAILS.iban}</code>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(CLINIC_DETAILS.iban, 'iban')}
                    >
                      {copiedField === 'iban' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </Card>

          {/* BOOK FLIGHT */}
          <Card className="p-6 sm:p-8 border-2 border-blue-200 bg-white shadow-xl rounded-2xl">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-blue-500 text-white p-4 rounded-2xl">
                <Plane className="h-7 w-7" />
              </div>
              <div>
                <h3 className="font-display font-bold text-xl text-islamic-green mb-1">
                  {t.flightTitle}
                </h3>
                <p className="text-gray-600 text-sm">{t.flightDesc}</p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-xs text-blue-600 font-medium mb-1">{t.flightPassenger}</p>
                <p className="font-bold text-gray-800">{BENEFICIARY.fullName}</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-xs text-blue-600 font-medium mb-1">{t.flightRoute}</p>
                <p className="font-semibold text-gray-800">{FLIGHT_INFO.from} → {FLIGHT_INFO.to}</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-xs text-blue-600 font-medium mb-1">{t.flightAirlines}</p>
                <p className="text-gray-700 text-sm">{FLIGHT_INFO.airlines.join(" • ")}</p>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <p className="text-amber-700 text-sm font-medium">{t.coordinateFirst}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button asChild size="sm" variant="outline" className="flex-1">
                <a href="https://www.tunisair.com" target="_blank" rel="noopener noreferrer">
                  Tunisair <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </Button>
              <Button asChild size="sm" variant="outline" className="flex-1">
                <a href="https://www.turkishairlines.com" target="_blank" rel="noopener noreferrer">
                  Turkish <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </Button>
              <Button asChild size="sm" variant="outline" className="flex-1">
                <a href="https://www.skyscanner.com" target="_blank" rel="noopener noreferrer">
                  Skyscanner <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </Button>
            </div>
          </Card>
        </div>

        {/* ZAKAT SECTION */}
        <Card className="p-6 sm:p-8 border-2 border-islamic-gold/30 bg-gradient-to-br from-islamic-gold/5 to-amber-50 shadow-xl rounded-2xl mb-6">
          <div className="flex items-start gap-4">
            <div className="bg-islamic-gold text-islamic-green-dark p-4 rounded-2xl">
              <Calculator className="h-7 w-7" />
            </div>
            <div className="flex-1">
              <h3 className="font-display font-bold text-xl text-islamic-green mb-2">
                {t.zakatTitle}
              </h3>
              <div className="bg-green-100 border border-green-300 rounded-lg px-4 py-2 inline-flex items-center gap-2 mb-4">
                <Check className="h-5 w-5 text-green-600" />
                <span className="font-bold text-green-700">{t.zakatYes}</span>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t.zakatExplanation}
              </p>
              <div className="bg-white/70 rounded-lg p-4 border border-islamic-gold/20">
                <p className="text-sm font-semibold text-islamic-green mb-2">{t.zakatScholars}:</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• <strong>Al-Gharimin</strong> (those in debt/financial hardship)</li>
                  <li>• <strong>Ibn al-Sabil</strong> (stranded traveler unable to access funds)</li>
                  <li>• <strong>Fi Sabil Allah</strong> (in the path of Allah — Islamic worker)</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* TAX DEDUCTION NOTE */}
        <div className="bg-gray-100 rounded-xl p-5 flex items-start gap-4">
          <FileText className="h-5 w-5 text-gray-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-gray-700 mb-1">{t.taxTitle}</p>
            <p className="text-gray-600 text-sm">{t.taxDesc}</p>
            <p className="text-gray-500 text-xs mt-2">{t.taxCountries}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
