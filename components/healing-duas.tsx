"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Copy, Check, ChevronLeft, ChevronRight } from "lucide-react"

interface HealingDuasProps {
  lang: "ar" | "en"
}

// Authentic healing duas from Hisnul Muslim and Sunnah
const HEALING_DUAS = [
  {
    id: 1,
    arabic: "اللَّهُمَّ رَبَّ النَّاسِ، أَذْهِبِ الْبَأسَ، اشْفِ أَنْتَ الشَّافِي، لاَ شِفَاءَ إِلاَّ شِفَاؤُكَ، شِفَاءً لاَ يُغَادِرُ سَقَمًا",
    transliteration: "Allahumma Rabban-nas, adh-hibil-ba's, ishfi antash-Shafi, la shifa'a illa shifa'uk, shifa'an la yughadiru saqama",
    translationEn: "O Allah, Lord of mankind, remove the affliction. Heal, for You are the Healer. There is no healing except Your healing, a healing that leaves no illness behind.",
    translationAr: "اللهم رب الناس أذهب البأس واشف فأنت الشافي لا شفاء إلا شفاؤك شفاء لا يغادر سقما",
    source: "Sahih al-Bukhari 5675",
    sourceAr: "صحيح البخاري ٥٦٧٥",
  },
  {
    id: 2,
    arabic: "أَسْأَلُ اللَّهَ الْعَظِيمَ رَبَّ الْعَرْشِ الْعَظِيمِ أَنْ يَشْفِيَكَ",
    transliteration: "As'alullaha al-'Azeem Rabbal-'Arshil-'Azeem an yashfiyak",
    translationEn: "I ask Allah the Almighty, Lord of the Mighty Throne, to cure you.",
    translationAr: "أسأل الله العظيم رب العرش العظيم أن يشفيك",
    source: "Sunan Abu Dawud 3106",
    sourceAr: "سنن أبي داود ٣١٠٦",
    note: "Recite 7 times",
    noteAr: "تقرأ ٧ مرات",
  },
  {
    id: 3,
    arabic: "بِسْمِ اللَّهِ أَرْقِيكَ، مِنْ كُلِّ شَيْءٍ يُؤْذِيكَ، مِنْ شَرِّ كُلِّ نَفْسٍ أَوْ عَيْنٍ حَاسِدٍ، اللَّهُ يَشْفِيكَ، بِسْمِ اللَّهِ أَرْقِيكَ",
    transliteration: "Bismillahi arqeek, min kulli shay'in yu'dheek, min sharri kulli nafsin aw 'aynin hasid, Allahu yashfeek, bismillahi arqeek",
    translationEn: "In the name of Allah I perform ruqyah on you, from everything that harms you, from the evil of every soul or envious eye, may Allah heal you, in the name of Allah I perform ruqyah on you.",
    translationAr: "بسم الله أرقيك من كل شيء يؤذيك من شر كل نفس أو عين حاسد الله يشفيك بسم الله أرقيك",
    source: "Sahih Muslim 2186",
    sourceAr: "صحيح مسلم ٢١٨٦",
  },
  {
    id: 4,
    arabic: "لاَ بَأْسَ طَهُورٌ إِنْ شَاءَ اللَّهُ",
    transliteration: "La ba'sa, tahoorun in sha Allah",
    translationEn: "No harm, it is a purification, if Allah wills.",
    translationAr: "لا بأس طهور إن شاء الله",
    source: "Sahih al-Bukhari 3616",
    sourceAr: "صحيح البخاري ٣٦١٦",
    note: "The Prophet ﷺ said this when visiting the sick",
    noteAr: "قالها النبي ﷺ عند عيادة المريض",
  },
  {
    id: 5,
    arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    transliteration: "Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina 'adhaban-nar",
    translationEn: "Our Lord, give us in this world [that which is] good and in the Hereafter [that which is] good and protect us from the punishment of the Fire.",
    translationAr: "ربنا آتنا في الدنيا حسنة وفي الآخرة حسنة وقنا عذاب النار",
    source: "Quran 2:201",
    sourceAr: "القرآن الكريم ٢:٢٠١",
  },
]

export function HealingDuas({ lang }: HealingDuasProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [copied, setCopied] = useState(false)

  const content = {
    ar: {
      title: "أدعية الشفاء",
      subtitle: "اقرأها لإبراهيم — الدعاء يصل",
      copyDua: "نسخ الدعاء",
      copied: "تم النسخ",
      source: "المصدر",
      readFor: "اقرأ هذا الدعاء لأخينا إبراهيم",
      duaOf: "من",
    },
    en: {
      title: "Healing Duas",
      subtitle: "Recite for Ibrahim — Your prayers reach",
      copyDua: "Copy Dua",
      copied: "Copied!",
      source: "Source",
      readFor: "Read this dua for our brother Ibrahim",
      duaOf: "of",
    },
  }

  const t = content[lang]
  const currentDua = HEALING_DUAS[currentIndex]

  const nextDua = () => {
    setCurrentIndex((prev) => (prev + 1) % HEALING_DUAS.length)
  }

  const prevDua = () => {
    setCurrentIndex((prev) => (prev - 1 + HEALING_DUAS.length) % HEALING_DUAS.length)
  }

  const copyToClipboard = async () => {
    const text = `${currentDua.arabic}\n\n${currentDua.transliteration}\n\n${lang === "ar" ? currentDua.translationAr : currentDua.translationEn}`
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-emerald-900/30 to-islamic-green-dark">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">🤲</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{t.title}</h2>
          <p className="text-cream-light/80">{t.subtitle}</p>
        </div>

        {/* Dua Card */}
        <Card className="bg-white/10 border-white/20 overflow-hidden">
          <div className="p-6 sm:p-8">
            {/* Progress indicator */}
            <div className="flex justify-center gap-2 mb-6">
              {HEALING_DUAS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? "bg-islamic-gold w-6" : "bg-white/30"
                  }`}
                />
              ))}
            </div>

            {/* Arabic Text */}
            <div className="text-center mb-6">
              <p className="text-2xl sm:text-3xl text-white font-arabic leading-loose mb-4 px-4">
                {currentDua.arabic}
              </p>

              {/* Transliteration */}
              <p className="text-islamic-gold/80 italic text-sm sm:text-base mb-4">
                {currentDua.transliteration}
              </p>

              {/* Translation */}
              <p className="text-cream-light/90 text-base sm:text-lg leading-relaxed">
                {lang === "ar" ? currentDua.translationAr : currentDua.translationEn}
              </p>

              {/* Note if exists */}
              {currentDua.note && (
                <p className="text-islamic-gold text-sm mt-4 font-medium">
                  {lang === "ar" ? currentDua.noteAr : currentDua.note}
                </p>
              )}
            </div>

            {/* Source */}
            <div className="text-center mb-6">
              <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-xs text-cream-light/70">
                {t.source}: {lang === "ar" ? currentDua.sourceAr : currentDua.source}
              </span>
            </div>

            {/* Navigation & Actions */}
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="icon"
                onClick={prevDua}
                className="text-white hover:bg-white/10"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>

              <div className="flex items-center gap-3">
                <span className="text-cream/80 text-sm">
                  {currentIndex + 1} {t.duaOf} {HEALING_DUAS.length}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyToClipboard}
                  className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      {t.copied}
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" />
                      {t.copyDua}
                    </>
                  )}
                </Button>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={nextDua}
                className="text-white hover:bg-white/10"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-islamic-gold/10 px-6 py-4 text-center border-t border-white/10">
            <p className="text-cream-light/80 text-sm flex items-center justify-center gap-2">
              <Heart className="h-4 w-4 text-islamic-gold" />
              {t.readFor}
            </p>
          </div>
        </Card>
      </div>
    </section>
  )
}
