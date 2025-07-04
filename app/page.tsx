"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Instagram } from "lucide-react"

const getGroupFromFilename = (filename: string) => {
  const name = filename.split("/").pop() || ""
  const firstWord = name.split(/[-_\s]/)[0].toLowerCase()
  return firstWord
}

const photoGroups = {
  paysage: [
    { id: 1, src: "/images/paysage18.jpg", alt: "Paysage 1" },
    { id: 2, src: "/images/paysage8.jpg", alt: "Paysage 2" },
    { id: 3, src: "/images/paysage17.jpg", alt: "Paysage 3" },
  ],
  fcca: [
    { id: 4, src: "/images/fcca6.jpg", alt: "Portrait 1" },
    { id: 5, src: "/images/fcca24.jpg", alt: "Portrait 2" },
    { id: 6, src: "/images/fcca10.jpg", alt: "Portrait 3" },
  ],
  "caen-athletic": [
    { id: 7, src: "/images/athle15.jpg", alt: "Lifestyle 1" },
    { id: 8, src: "/images/athle5.jpg", alt: "Lifestyle 2" },
    { id: 9, src: "/images/athle14.jpg", alt: "Lifestyle 3" },
  ],
  AST: [
    { id: 10, src: "/images/tourla3.jpg", alt: "Architecture 1" },
    { id: 11, src: "/images/tourla13.webp", alt: "Architecture 2" },
    { id: 12, src: "/images/tourla9.jpg", alt: "Architecture 3" },
  ],
}

const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const target = e.target as HTMLImageElement
  target.src = "/placeholder.svg?height=400&width=300&text=Image+Not+Found"
}

const inspirationalQuotes = ["CAPTURER L'INSTANT", "FIGER L'ÉMOTION", "RÉVÉLER LA BEAUTÉ", "IMMORTALISER L'ACTION"]

export default function Home() {
  const [selectedPhoto, setSelectedPhoto] = useState<{ src: string; alt: string } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeGroup, setActiveGroup] = useState<string>("caen-athletic")
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean[] }>({})
  const [currentQuote, setCurrentQuote] = useState(0)
  const [isViewfinderActive, setIsViewfinderActive] = useState(false)
  const groupRefs = useRef<{ [key: string]: (HTMLDivElement | null)[] }>({})

  useEffect(() => {
    const initialVisibility: { [key: string]: boolean[] } = {}
    Object.keys(photoGroups).forEach((group) => {
      initialVisibility[group] = new Array(photoGroups[group as keyof typeof photoGroups].length).fill(false)
      groupRefs.current[group] = []
    })
    setIsVisible(initialVisibility)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      const loader = document.querySelector(".mobile-loader")
      if (loader) {
        loader.classList.add("fade-out-mobile")
      }

      setTimeout(() => {
        setIsLoading(false)
      }, 1000)
    }, 3500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)

      Object.keys(groupRefs.current).forEach((group) => {
        groupRefs.current[group].forEach((ref, index) => {
          if (ref) {
            const rect = ref.getBoundingClientRect()
            const isInView = rect.top < window.innerHeight && rect.bottom > 0

            setIsVisible((prev) => ({
              ...prev,
              [group]: prev[group]?.map((visible, i) => (i === index ? (isInView ? true : visible) : visible)) || [],
            }))
          }
        })
      })
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Quote rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % inspirationalQuotes.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Viewfinder activation on scroll
  useEffect(() => {
    const handleViewfinderScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      setIsViewfinderActive(scrollPosition > windowHeight * 0.3 && scrollPosition < windowHeight * 1.2)
    }

    window.addEventListener("scroll", handleViewfinderScroll)
    return () => window.removeEventListener("scroll", handleViewfinderScroll)
  }, [])

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center overflow-hidden mobile-loader">
        <div className="text-center relative w-full h-full flex items-center justify-center">
          <div className="flex flex-col items-center justify-center space-y-8 md:space-y-12">
            <div className="text-[30vw] md:text-[20vw] font-black text-white leading-none bold-letters animate-fancy-p animation-delay-500">
              P
            </div>
            <div className="text-[30vw] md:text-[20vw] font-black text-white leading-none bold-letters animate-fancy-s animation-delay-1400">
              S
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 w-full bg-black/80 backdrop-blur-md z-40 border-b border-gray-800 animate-slide-down">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            {/* Profile Picture Logo */}
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-white/30">
              <Image
                src="/images/profil-pic.jpg"
                alt="Paul Salvadori"
                width={40}
                height={40}
                className="w-full h-full object-cover"
                onError={handleImageError}
              />
            </div>
            <nav className="flex space-x-6 sm:space-x-8 text-xs sm:text-sm">
              <Link
                href="/about"
                className="hover:text-gray-300 transition-all duration-300 hover:scale-110 hover:tracking-wider text-sm font-bold"
              >
                {"À PROPOS DE MOI"}
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 sm:pt-20 pb-8 sm:pb-12 px-4 min-h-screen flex flex-col items-center justify-center">
        <div className="text-center max-w-4xl mx-auto relative">
          {/* Main Title */}
          <div className="relative mb-4">
            {/* PAUL */}
            <h1 className="text-[18vw] sm:text-[15vw] md:text-8xl lg:text-9xl font-black tracking-tight leading-none animate-fade-in-up">
              PAUL
            </h1>

            {/* SALVADORI */}
            <h1 className="text-[18vw] sm:text-[15vw] md:text-8xl lg:text-9xl font-black tracking-tight leading-none mt-1 sm:mt-2 animate-fade-in-up animation-delay-200">
              SALVADORI
            </h1>
          </div>

          {/* Decorative Line */}
          <div className="w-16 sm:w-24 md:w-32 h-px bg-white mb-4 sm:mb-6 mx-auto animate-expand-line animation-delay-500"></div>

          {/* Location */}
          <p className="text-sm sm:text-base md:text-xl text-gray-300 font-light tracking-[0.2em] sm:tracking-[0.3em] animate-fade-in-up animation-delay-800 mb-8 sm:mb-12">
            CHERBOURG, FRANCE
          </p>

          {/* Navigation Cards Section - Mobile First */}
          <div className="flex justify-center mb-12 sm:mb-16 animate-photo-reveal animation-delay-1000">
            <div className="navigation-container">
              <div
                data-text="PAYSAGE"
                style={{ "--r": -15 } as React.CSSProperties}
                className="glass-card"
                onClick={() => document.getElementById("paysage-section")?.scrollIntoView({ behavior: "smooth" })}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 relative rounded-full overflow-hidden border-2 border-white/20 bg-white">
                  <Image
                    src="/images/paysage5.jpg"
                    alt="Paysage Logo"
                    fill
                    className="object-cover"
                    onError={handleImageError}
                  />
                </div>
              </div>

              <div
                data-text="AST"
                style={{ "--r": 5 } as React.CSSProperties}
                className="glass-card"
                onClick={() => document.getElementById("ast-section")?.scrollIntoView({ behavior: "smooth" })}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 relative rounded-full overflow-hidden border-2 border-white/20 bg-white">
                  <Image
                    src="/images/ast-logo.jpg"
                    alt="AST Logo"
                    fill
                    className="object-cover"
                    onError={handleImageError}
                  />
                </div>
              </div>

              <div
                data-text="FCCA"
                style={{ "--r": 25 } as React.CSSProperties}
                className="glass-card"
                onClick={() => document.getElementById("fcca-section")?.scrollIntoView({ behavior: "smooth" })}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 relative rounded-full overflow-hidden border-2 border-white/20 bg-white">
                  <Image
                    src="/images/fcca-logo.jpg"
                    alt="FCCA Logo"
                    fill
                    className="object-cover"
                    onError={handleImageError}
                  />
                </div>
              </div>

              <div
                data-text="CAEN ATHLETIC"
                style={{ "--r": -5 } as React.CSSProperties}
                className="glass-card"
                onClick={() => document.getElementById("caen-athletic-section")?.scrollIntoView({ behavior: "smooth" })}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 relative rounded-full overflow-hidden border-2 border-white/20 bg-white">
                  <Image
                    src="/images/cac-logo.jpg"
                    alt="CAC Logo"
                    fill
                    className="object-cover"
                    onError={handleImageError}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
        </div>
      </section>

      {/* Photo Grid Sections */}
      {Object.entries(photoGroups).map(([groupName, photos]) => (
        <section id={`${groupName}-section`} key={groupName} className="relative py-16 sm:py-20 px-4">
          {/* Viewfinder Effect */}
          {isViewfinderActive && (
            <div className="absolute inset-0 bg-black pointer-events-none" style={{ mixBlendMode: "multiply" }}></div>
          )}

          <div className="max-w-6xl mx-auto text-center">
            {/* Section Title and Logo */}
            <div className="mb-12">
              <div className="flex items-center justify-center gap-4 mb-4 flex-wrap">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-thin tracking-wider text-white/90 whitespace-nowrap">
                  {groupName === "caen-athletic" ? "CAEN ATHLETIC" : groupName.toUpperCase()}
                </h2>

                {groupName === "paysage" && (
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 relative rounded-full overflow-hidden border-2 border-white/20 bg-white flex-shrink-0">
                    <Image
                      src="/images/paysage5.jpg"
                      alt="Paysage Logo"
                      fill
                      className="object-cover"
                      onError={handleImageError}
                    />
                  </div>
                )}

                {groupName === "fcca" && (
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 relative rounded-full overflow-hidden border-2 border-white/20 bg-white flex-shrink-0">
                    <Image
                      src="/images/fcca-logo.jpg"
                      alt="FCCA Logo"
                      fill
                      className="object-cover"
                      onError={handleImageError}
                    />
                  </div>
                )}

                {groupName === "AST" && (
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 relative rounded-full overflow-hidden border-2 border-white/20 bg-white flex-shrink-0">
                    <Image
                      src="/images/ast-logo.jpg"
                      alt="AST Logo"
                      fill
                      className="object-cover"
                      onError={handleImageError}
                    />
                  </div>
                )}

                {groupName === "caen-athletic" && (
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 relative rounded-full overflow-hidden border-2 border-white/20 bg-white flex-shrink-0">
                    <Image
                      src="/images/cac-logo.jpg"
                      alt="CAC Logo"
                      fill
                      className="object-cover"
                      onError={handleImageError}
                    />
                  </div>
                )}
              </div>
              <div className="w-12 sm:w-16 h-px bg-white/50 mx-auto"></div>
            </div>

            {/* Photo Grid - Mobile First */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
              {photos.map((photo, index) => (
                <div
                  key={photo.id}
                  ref={(el) => {
                    if (!groupRefs.current[groupName]) groupRefs.current[groupName] = []
                    groupRefs.current[groupName][index] = el
                  }}
                  className={`group cursor-pointer transform transition-all duration-1000 ${
                    isVisible[groupName]?.[index]
                      ? "translate-y-0 opacity-100 scale-100"
                      : "translate-y-32 opacity-0 scale-95"
                  }`}
                  style={{
                    transitionDelay: `${index * 200}ms`,
                  }}
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-gray-900 rounded-lg photo-container">
                    <Image
                      src={photo.src || "/placeholder.svg"}
                      alt={photo.alt}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      onError={handleImageError}
                    />

                    {/* Overlay Effects */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500" />

                    {/* Sliding overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 border border-white rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-colors duration-300">
                          <span className="text-xs sm:text-sm">+</span>
                        </div>
                      </div>
                    </div>

                    {/* Corner accents */}
                    <div className="absolute top-4 sm:top-6 right-4 sm:right-6 w-0 h-0 border-t-2 border-r-2 border-white opacity-0 group-hover:opacity-100 group-hover:w-6 group-hover:h-6 sm:group-hover:w-8 sm:group-hover:h-8 transition-all duration-500 delay-100"></div>
                    <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 w-0 h-px bg-white opacity-0 group-hover:opacity-100 group-hover:w-12 sm:group-hover:w-16 transition-all duration-500 delay-200"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Social Links */}
      <section className="px-4 sm:px-6 py-16 sm:py-20 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center space-x-8 sm:space-x-12">
            <a
              href="https://www.instagram.com/paul.phot0grapher"
              target="_blank"
              rel="noopener noreferrer"
              className="group transition-all duration-300 hover:scale-125 animate-float"
              style={{ animationDelay: "0s" }}
            >
              <Instagram className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover:text-white transition-colors duration-300" />
            </a>
            <a
              href="https://www.tiktok.com/@paul.phot0grapher"
              target="_blank"
              rel="noopener noreferrer"
              className="group transition-all duration-300 hover:scale-125 animate-float"
              style={{ animationDelay: "1s" }}
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover:text-white transition-colors duration-300"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5.76 20.5a6.34 6.34 0 0 0 10.86-4.43V7.83a8.2 8.2 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.8-.26z" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 sm:px-6 py-6 sm:py-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-xs text-gray-500 font-light animate-fade-in">
            © 2025 Paul Salvadori. All rights reserved. Made By Léo Sauvey
          </p>
        </div>
      </footer>

      {/* Photo Modal - Mobile Optimized */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 sm:p-6 animate-modal-in"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-6xl max-h-full w-full">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-2 right-2 sm:top-6 sm:right-6 z-10 text-white text-2xl sm:text-3xl hover:text-gray-300 transition-all duration-300 hover:rotate-90 hover:scale-125 transform w-10 h-10 sm:w-auto sm:h-auto flex items-center justify-center"
            >
              ×
            </button>
            <div className="relative w-full h-[80vh] sm:h-[85vh] animate-photo-reveal">
              <Image
                src={selectedPhoto.src || "/placeholder.svg"}
                alt={selectedPhoto.alt}
                fill
                className="object-contain"
                onError={handleImageError}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
