"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, MapPin, Moon, Sun, Heart } from "lucide-react"

interface PrayerTimesProps {
  lang: "ar" | "en"
}

interface PrayerTime {
  Fajr: string
  Sunrise: string
  Dhuhr: string
  Asr: string
  Maghrib: string
  Isha: string
  Midnight: string
  Lastthird: string
}

interface PrayerData {
  timings: PrayerTime
  date: {
    hijri: {
      date: string
      month: { en: string; ar: string }
      year: string
      weekday: { en: string; ar: string }
    }
    gregorian: {
      date: string
      weekday: { en: string }
    }
  }
}

// Tripoli, Libya coordinates
const TRIPOLI_LAT = 32.8872
const TRIPOLI_LNG = 13.1913

export function PrayerTimes({ lang }: PrayerTimesProps) {
  const [ibrahimPrayers, setIbrahimPrayers] = useState<PrayerData | null>(null)
  const [userPrayers, setUserPrayers] = useState<PrayerData | null>(null)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number; name: string } | null>(null)
  const [currentPrayer, setCurrentPrayer] = useState<string>("")
  const [nextPrayer, setNextPrayer] = useState<{ name: string; time: string } | null>(null)
  const [isJummah, setIsJummah] = useState(false)
  const [loading, setLoading] = useState(true)

  const content = {
    ar: {
      title: "صَلِّ مع إبراهيم",
      subtitle: "أوقات الصلاة في طرابلس، ليبيا",
      yourLocation: "موقعك",
      ibrahimLocation: "طرابلس، ليبيا (موقع إبراهيم)",
      currentPrayer: "الصلاة الحالية",
      nextPrayer: "الصلاة القادمة",
      prayerNames: {
        Fajr: "الفجر",
        Sunrise: "الشروق",
        Dhuhr: "الظهر",
        Asr: "العصر",
        Maghrib: "المغرب",
        Isha: "العشاء",
      },
      jummahAlert: "اليوم الجمعة — أفضل يوم للدعاء!",
      jummahDesc: "ادعُ لإبراهيم في الساعة المباركة",
      tahajjudTitle: "وقت التهجد",
      tahajjudDesc: "الثلث الأخير من الليل — أقوى وقت للدعاء",
      lastThird: "يبدأ الثلث الأخير",
      prayTogether: "صلِّ معه الآن",
      hijriDate: "التاريخ الهجري",
      loading: "جاري التحميل...",
      enableLocation: "فعّل الموقع لمقارنة أوقات صلاتك",
    },
    en: {
      title: "Pray With Ibrahim",
      subtitle: "Prayer times in Tripoli, Libya",
      yourLocation: "Your Location",
      ibrahimLocation: "Tripoli, Libya (Ibrahim's location)",
      currentPrayer: "Current Prayer",
      nextPrayer: "Next Prayer",
      prayerNames: {
        Fajr: "Fajr",
        Sunrise: "Sunrise",
        Dhuhr: "Dhuhr",
        Asr: "Asr",
        Maghrib: "Maghrib",
        Isha: "Isha",
      },
      jummahAlert: "Today is Jummah — The best day for dua!",
      jummahDesc: "Make dua for Ibrahim during the blessed hour",
      tahajjudTitle: "Tahajjud Time",
      tahajjudDesc: "Last third of the night — most powerful time for prayers",
      lastThird: "Last third begins",
      prayTogether: "Pray with him now",
      hijriDate: "Hijri Date",
      loading: "Loading...",
      enableLocation: "Enable location to compare your prayer times",
    },
  }

  const t = content[lang]

  // Fetch prayer times from Aladhan API
  const fetchPrayerTimes = async (lat: number, lng: number): Promise<PrayerData | null> => {
    try {
      const today = new Date()
      const dateStr = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`
      const response = await fetch(
        `https://api.aladhan.com/v1/timings/${dateStr}?latitude=${lat}&longitude=${lng}&method=5`
      )
      const data = await response.json()
      if (data.code === 200) {
        return data.data
      }
    } catch (error) {
      console.error("Error fetching prayer times:", error)
    }
    return null
  }

  // Get user's location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords
          setUserLocation({ lat: latitude, lng: longitude, name: "Your Location" })
          const prayers = await fetchPrayerTimes(latitude, longitude)
          setUserPrayers(prayers)
        },
        () => {
          // Location denied, just show Ibrahim's times
        }
      )
    }
  }

  // Calculate current and next prayer
  const calculateCurrentPrayer = (timings: PrayerTime) => {
    const now = new Date()
    const currentTime = now.getHours() * 60 + now.getMinutes()

    const prayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"] as const
    const prayerMinutes = prayers.map((p) => {
      const [h, m] = timings[p].split(":").map(Number)
      return { name: p, minutes: h * 60 + m }
    })

    // Find current prayer (the most recent one that has passed)
    let current = "Isha"
    let next = { name: "Fajr", time: timings.Fajr }

    for (let i = 0; i < prayerMinutes.length; i++) {
      if (currentTime >= prayerMinutes[i].minutes) {
        current = prayerMinutes[i].name
        if (i < prayerMinutes.length - 1) {
          next = { name: prayerMinutes[i + 1].name, time: timings[prayerMinutes[i + 1].name] }
        } else {
          next = { name: "Fajr", time: timings.Fajr }
        }
      }
    }

    setCurrentPrayer(current)
    setNextPrayer(next)
  }

  // Initial load
  useEffect(() => {
    const loadData = async () => {
      // Fetch Ibrahim's prayer times (Tripoli)
      const ibrahimData = await fetchPrayerTimes(TRIPOLI_LAT, TRIPOLI_LNG)
      setIbrahimPrayers(ibrahimData)

      if (ibrahimData) {
        calculateCurrentPrayer(ibrahimData.timings)
        // Check if today is Friday (Jummah)
        const today = new Date()
        setIsJummah(today.getDay() === 5)
      }

      setLoading(false)
      getUserLocation()
    }

    loadData()
  }, [])

  if (loading) {
    return (
      <section className="py-8 bg-gradient-to-b from-islamic-green-dark to-islamic-green">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <p>{t.loading}</p>
        </div>
      </section>
    )
  }

  const prayerOrder = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"] as const

  return (
    <section className="py-12 bg-gradient-to-b from-islamic-green-dark to-islamic-green">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-3xl mb-2">🕌</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{t.title}</h2>
          <p className="text-cream-light/80">{t.subtitle}</p>
        </div>

        {/* Jummah Alert */}
        {isJummah && (
          <Card className="bg-islamic-gold/20 border-islamic-gold/40 mb-6">
            <div className="p-4 text-center">
              <p className="text-islamic-gold font-bold text-lg mb-1">🌟 {t.jummahAlert}</p>
              <p className="text-white/80 text-sm">{t.jummahDesc}</p>
            </div>
          </Card>
        )}

        {/* Hijri Date */}
        {ibrahimPrayers && (
          <div className="text-center mb-6">
            <p className="text-islamic-gold font-arabic text-lg">
              {ibrahimPrayers.date.hijri.weekday[lang === "ar" ? "ar" : "en"]} •{" "}
              {ibrahimPrayers.date.hijri.day || ibrahimPrayers.date.hijri.date.split("-")[0]}{" "}
              {ibrahimPrayers.date.hijri.month[lang === "ar" ? "ar" : "en"]}{" "}
              {ibrahimPrayers.date.hijri.year}
            </p>
          </div>
        )}

        {/* Current & Next Prayer */}
        {nextPrayer && (
          <div className="grid grid-cols-2 gap-4 mb-8">
            <Card className="bg-white/10 border-white/20">
              <div className="p-4 text-center">
                <p className="text-cream-light/70 text-sm mb-1">{t.currentPrayer}</p>
                <p className="text-white font-bold text-xl">
                  {t.prayerNames[currentPrayer as keyof typeof t.prayerNames] || currentPrayer}
                </p>
              </div>
            </Card>
            <Card className="bg-islamic-gold/20 border-islamic-gold/40">
              <div className="p-4 text-center">
                <p className="text-islamic-gold/80 text-sm mb-1">{t.nextPrayer}</p>
                <p className="text-white font-bold text-xl">
                  {t.prayerNames[nextPrayer.name as keyof typeof t.prayerNames] || nextPrayer.name}
                </p>
                <p className="text-islamic-gold text-sm">{nextPrayer.time}</p>
              </div>
            </Card>
          </div>
        )}

        {/* Prayer Times Grid */}
        {ibrahimPrayers && (
          <Card className="bg-white/10 border-white/20 overflow-hidden mb-6">
            <div className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-4 w-4 text-islamic-gold" />
                <span className="text-white font-medium">{t.ibrahimLocation}</span>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {prayerOrder.map((prayer) => (
                  <div
                    key={prayer}
                    className={`text-center p-3 rounded-lg transition-all ${
                      currentPrayer === prayer
                        ? "bg-islamic-gold text-islamic-green-dark"
                        : "bg-white/5 text-white"
                    }`}
                  >
                    <p className="text-xs opacity-70 mb-1">
                      {t.prayerNames[prayer as keyof typeof t.prayerNames]}
                    </p>
                    <p className="font-bold text-sm sm:text-base">
                      {ibrahimPrayers.timings[prayer]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}

        {/* Tahajjud Time */}
        {ibrahimPrayers && (
          <Card className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border-indigo-400/30">
            <div className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-indigo-500/30 flex items-center justify-center">
                  <Moon className="h-6 w-6 text-indigo-300" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-bold">{t.tahajjudTitle}</p>
                  <p className="text-indigo-200/80 text-sm">{t.tahajjudDesc}</p>
                </div>
                <div className="text-right">
                  <p className="text-indigo-200/70 text-xs">{t.lastThird}</p>
                  <p className="text-white font-bold text-lg">{ibrahimPrayers.timings.Lastthird}</p>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* CTA */}
        <div className="mt-8 text-center">
          <Button
            asChild
            size="lg"
            className="bg-islamic-gold hover:bg-islamic-gold/90 text-islamic-green-dark font-semibold"
          >
            <a href="#tasbih">
              <Heart className="h-5 w-5 mr-2" />
              {t.prayTogether}
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
