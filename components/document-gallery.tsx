"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react"

interface DocumentGalleryProps {
  lang: "ar" | "en"
}

const documents = [
  {
    id: 1,
    titleAr: "تقرير التنظير الطبي - مستشفى الهضبة الخضراء",
    titleEn: "Medical Endoscopy Report - Al-Hadba Al-Khadra Hospital",
    url: "/images/doc-medical-report.jpg",
  },
  {
    id: 2,
    titleAr: "خطاب رسمي - رئاسة أركان القوات البحرية",
    titleEn: "Official Letter - Navy Chiefs of Staff",
    url: "/images/doc-navy-letter.jpg",
  },
  {
    id: 3,
    titleAr: "قرار أمين اللجنة العامة المؤقتة للدفاع",
    titleEn: "Decision of Secretary of Temporary Defense Committee",
    url: "/images/doc-defense-decision.jpg",
  },
  {
    id: 4,
    titleAr: "خطاب قاعدة بنغازي البحرية",
    titleEn: "Benghazi Naval Base Letter",
    url: "/images/doc-benghazi-letter.jpg",
  },
  {
    id: 5,
    titleAr: "محضر اتفاق رسمي",
    titleEn: "Official Agreement Record",
    url: "/images/doc-agreement-record.jpg",
  },
  {
    id: 6,
    titleAr: "تفاصيل الاتفاق بين الطرفين",
    titleEn: "Agreement Details Between Parties",
    url: "/images/doc-agreement-details.jpg",
  },
  {
    id: 7,
    titleAr: "التوقيعات والأختام الرسمية",
    titleEn: "Official Signatures and Stamps",
    url: "/images/doc-signatures-1.jpg",
  },
  {
    id: 8,
    titleAr: "عقد تنازل عن القيام بخدمات تخريد",
    titleEn: "Assignment Contract for Scrapping Services",
    url: "/images/doc-contract-1.jpg",
  },
  {
    id: 9,
    titleAr: "عقد اتفاق رسمي - وزارة العدل",
    titleEn: "Official Agreement Contract - Ministry of Justice",
    url: "/images/doc-contract-2.jpg",
  },
  {
    id: 10,
    titleAr: "خطاب رسمي - إجراءات إغراق",
    titleEn: "Official Letter - Sinking Procedures",
    url: "/images/doc-procedures.jpg",
  },
  {
    id: 11,
    titleAr: "صفحة التوقيعات والأختام",
    titleEn: "Signatures and Stamps Page",
    url: "/images/doc-signatures-2.jpg",
  },
  {
    id: 12,
    titleAr: "عقد موثق - صفحة التوقيعات",
    titleEn: "Notarized Contract - Signatures Page",
    url: "/images/doc-signatures-3.jpg",
  },
]

export function DocumentGallery({ lang }: DocumentGalleryProps) {
  const [selectedDoc, setSelectedDoc] = useState<number | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const content = {
    ar: {
      title: "جميع الوثائق مضمنة هنا للمراجعة الآمنة - بدون تحميل ملفات",
      clickToEnlarge: "انقر للتكبير",
      close: "إغلاق",
      previous: "السابق",
      next: "التالي",
      docOf: "من",
    },
    en: {
      title: "All documents embedded here for safe review - no file downloads",
      clickToEnlarge: "Click to enlarge",
      close: "Close",
      previous: "Previous",
      next: "Next",
      docOf: "of",
    },
  }

  const t = content[lang]

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setSelectedDoc(index)
  }

  const closeLightbox = () => {
    setSelectedDoc(null)
  }

  const nextDoc = () => {
    setLightboxIndex((prev) => (prev + 1) % documents.length)
  }

  const prevDoc = () => {
    setLightboxIndex((prev) => (prev - 1 + documents.length) % documents.length)
  }

  return (
    <div>
      <p className="text-center text-sm text-gray-500 mb-6">{t.title}</p>

      <div className="relative">
        {/* Decorative 8-point Islamic star corners */}
        <div className="absolute -top-4 -left-4 w-8 h-8 opacity-20 hidden sm:block">
          <svg viewBox="0 0 100 100" className="w-full h-full text-islamic-green">
            <polygon fill="currentColor" points="50,0 61,35 97,35 68,57 79,91 50,70 21,91 32,57 3,35 39,35" />
          </svg>
        </div>
        <div className="absolute -top-4 -right-4 w-8 h-8 opacity-20 hidden sm:block">
          <svg viewBox="0 0 100 100" className="w-full h-full text-islamic-green">
            <polygon fill="currentColor" points="50,0 61,35 97,35 68,57 79,91 50,70 21,91 32,57 3,35 39,35" />
          </svg>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {documents.map((doc, index) => (
            <Card
              key={doc.id}
              className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow group border-islamic-green/10"
              onClick={() => openLightbox(index)}
            >
              <div className="relative aspect-[3/4] bg-gray-100">
                <img
                  src={doc.url || "/placeholder.svg"}
                  alt={lang === "ar" ? doc.titleAr : doc.titleEn}
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="absolute top-2 left-2 w-6 h-6 bg-islamic-green text-white rounded-full flex items-center justify-center text-xs font-bold">
                  {index + 1}
                </div>
              </div>
              <div className="p-3 bg-cream">
                <p className="text-xs font-medium text-islamic-green line-clamp-2">
                  {lang === "ar" ? doc.titleAr : doc.titleEn}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedDoc !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-white/20 z-10"
            onClick={closeLightbox}
          >
            <X className="h-6 w-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-10 h-12 w-12"
            onClick={prevDoc}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-10 h-12 w-12"
            onClick={nextDoc}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>

          <div className="max-w-5xl max-h-[90vh] overflow-auto">
            <img
              src={documents[lightboxIndex].url || "/placeholder.svg"}
              alt={lang === "ar" ? documents[lightboxIndex].titleAr : documents[lightboxIndex].titleEn}
              className="max-w-full max-h-[80vh] object-contain mx-auto rounded-lg"
            />
            <div className="text-center mt-4">
              <p className="text-white font-medium text-lg">
                {lang === "ar" ? documents[lightboxIndex].titleAr : documents[lightboxIndex].titleEn}
              </p>
              <p className="text-white/85 text-sm mt-2">
                {lightboxIndex + 1} {t.docOf} {documents.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
