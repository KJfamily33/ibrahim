"use client"

import { useEffect, useRef, useState } from "react"

interface IslamicDividerProps {
  variant?: "geometric" | "arabesque" | "star" | "wave"
  color?: "gold" | "teal" | "white" | "cream"
  height?: "sm" | "md" | "lg"
  animated?: boolean
}

export function IslamicDivider({
  variant = "geometric",
  color = "gold",
  height = "md",
  animated = true,
}: IslamicDividerProps) {
  const dividerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!animated) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.3 }
    )

    if (dividerRef.current) {
      observer.observe(dividerRef.current)
    }

    return () => observer.disconnect()
  }, [animated])

  const colorClasses = {
    gold: "text-royal-gold",
    teal: "text-sacred-teal",
    white: "text-white",
    cream: "text-desert-cream",
  }

  const heightClasses = {
    sm: "h-16",
    md: "h-24",
    lg: "h-32",
  }

  // 8-pointed Islamic star pattern
  const StarPattern = () => (
    <svg viewBox="0 0 100 100" className="h-full w-auto">
      <g fill="currentColor" opacity={isVisible ? 1 : 0} className="transition-opacity duration-1000">
        {/* 8-pointed star */}
        <polygon points="50,5 58,35 90,35 65,55 75,85 50,65 25,85 35,55 10,35 42,35" />
      </g>
    </svg>
  )

  // Geometric pattern with repeating shapes
  const GeometricPattern = () => (
    <svg viewBox="0 0 400 60" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="islamicPattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6">
            <circle cx="30" cy="30" r="20" />
            <circle cx="30" cy="30" r="10" />
            <line x1="30" y1="5" x2="30" y2="55" />
            <line x1="5" y1="30" x2="55" y2="30" />
            <line x1="10" y1="10" x2="50" y2="50" />
            <line x1="50" y1="10" x2="10" y2="50" />
          </g>
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        fill="url(#islamicPattern)"
        opacity={isVisible ? 1 : 0}
        className="transition-opacity duration-1000"
      />
      {/* Center star */}
      <g
        transform="translate(170, 0)"
        fill="currentColor"
        opacity={isVisible ? 1 : 0}
        className="transition-all duration-1000 delay-300"
      >
        <polygon points="30,5 35,22 52,22 38,33 44,50 30,40 16,50 22,33 8,22 25,22" />
      </g>
    </svg>
  )

  // Arabesque flowing pattern
  const ArabesquePattern = () => (
    <svg viewBox="0 0 400 60" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        {/* Flowing curves */}
        <path
          d="M0,30 Q50,10 100,30 T200,30 T300,30 T400,30"
          opacity={isVisible ? 0.6 : 0}
          className="transition-opacity duration-1000"
        />
        <path
          d="M0,30 Q50,50 100,30 T200,30 T300,30 T400,30"
          opacity={isVisible ? 0.6 : 0}
          className="transition-opacity duration-1000 delay-200"
        />
        {/* Center medallion */}
        <g
          transform="translate(180, 10)"
          fill="currentColor"
          opacity={isVisible ? 1 : 0}
          className="transition-opacity duration-1000 delay-500"
        >
          <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="20" cy="20" r="12" fill="none" stroke="currentColor" strokeWidth="1" />
          <polygon points="20,5 23,15 33,15 25,22 28,32 20,26 12,32 15,22 7,15 17,15" />
        </g>
      </g>
    </svg>
  )

  // Wave/crescent pattern
  const WavePattern = () => (
    <svg viewBox="0 0 400 60" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
          <stop offset="50%" stopColor="currentColor" stopOpacity="1" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Decorative lines */}
      <line
        x1="0"
        y1="30"
        x2="160"
        y2="30"
        stroke="url(#waveGradient)"
        strokeWidth="1"
        opacity={isVisible ? 0.5 : 0}
        className="transition-opacity duration-700"
      />
      <line
        x1="240"
        y1="30"
        x2="400"
        y2="30"
        stroke="url(#waveGradient)"
        strokeWidth="1"
        opacity={isVisible ? 0.5 : 0}
        className="transition-opacity duration-700"
      />
      {/* Center crescent and star */}
      <g
        transform="translate(175, 10)"
        opacity={isVisible ? 1 : 0}
        className="transition-all duration-1000 delay-300"
      >
        {/* Crescent */}
        <path
          d="M35,20 A15,15 0 1,1 35,22 A10,10 0 1,0 35,20"
          fill="currentColor"
        />
        {/* Star */}
        <polygon
          points="18,15 20,20 25,20 21,24 23,29 18,26 13,29 15,24 11,20 16,20"
          fill="currentColor"
        />
      </g>
    </svg>
  )

  const patterns = {
    geometric: GeometricPattern,
    arabesque: ArabesquePattern,
    star: StarPattern,
    wave: WavePattern,
  }

  const Pattern = patterns[variant]

  return (
    <div
      ref={dividerRef}
      className={`w-full flex items-center justify-center ${heightClasses[height]} ${colorClasses[color]} overflow-hidden`}
    >
      <Pattern />
    </div>
  )
}
