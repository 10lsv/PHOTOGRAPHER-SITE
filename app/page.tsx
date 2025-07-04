"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Instagram, X } from "lucide-react"

const photoGroups = {
  "caen-athletic": [
    { id: 1, src: "/images/athle15.jpg", alt: "Caen Athletic 1" },
    { id: 2, src: "/images/athle3.jpg", alt: "Caen Athletic 2" },
    { id: 3, src: "/images/athle14.jpg", alt: "Caen Athletic 3" },
    { id: 4, src: "/images/athle5.jpg", alt: "Caen Athletic 4" },
    { id: 5, src: "/images/athle7.jpg", alt: "Caen Athletic 5" },
    { id: 6, src: "/images/athle8.jpg", alt: "Caen Athletic 6" },
    { id: 7, src: "/images/athle9.jpg", alt: "Caen Athletic 7" },
    { id: 8, src: "/images/athle10.jpg", alt: "Caen Athletic 8" },
    { id: 9, src: "/images/athle11.jpg", alt: "Caen Athletic 9" },
  ],
  AST: [
    { id: 1, src: "/images/tourla22.jpeg", alt: "AST 1" },
    { id: 2, src: "/images/tourla13.webp", alt: "AST 2" },
    { id: 3, src: "/images/tourla9.jpg", alt: "AST 3" },
    { id: 4, src: "/images/tourla3.jpg", alt: "AST 4" },
    { id: 5, src: "/images/tourla1.jpg", alt: "AST 5" },
    { id: 6, src: "/images/tourla2.jpg", alt: "AST 6" },
    { id: 7, src: "/images/tourla4.jpg", alt: "AST 7" },
    { id: 8, src: "/images/tourla5.jpg", alt: "AST 8" },
    { id: 9, src: "/images/tourla6.jpg", alt: "AST 9" },
  ],
  streetlife: [
    { id: 1, src: "/images/paysage15.jpg", alt: "Street Life 1" },
    { id: 2, src: "/images/paysage9.jpg", alt: "Street Life 2" },
    { id: 3, src: "/images/paysage17.jpg", alt: "Street Life 3" },
    { id: 4, src: "/images/paysage10.jpg", alt: "Street Life 4" },
    { id: 5, src: "/images/paysage11.jpg", alt: "Street Life 5" },
    { id: 6, src: "/images/paysage12.jpg", alt: "Street Life 6" },
    { id: 7, src: "/images/paysage13.jpg", alt: "Street Life 7" },
    { id: 8, src: "/images/paysage14.jpg", alt: "Street Life 8" },
    { id: 9, src: "/images/paysage16.jpg", alt: "Street Life 9" },
  ],
  fcca: [
    { id: 1, src: "/images/fcca6.jpg", alt: "FCCA 1" },
    { id: 2, src: "/images/fcca24.jpg", alt: "FCCA 2" },
    { id: 3, src: "/images/fcca10.jpg", alt: "FCCA 3" },
    { id: 4, src: "/images/fcca7.jpg", alt: "FCCA 4" },
    { id: 5, src: "/images/fcca8.jpg", alt: "FCCA 5" },
    { id: 6, src: "/images/fcca9.jpg", alt: "FCCA 6" },
    { id: 7, src: "/images/fcca11.jpg", alt: "FCCA 7" },
    { id: 8, src: "/images/fcca12.jpg", alt: "FCCA 8" },
    { id: 9, src: "/images/fcca13.jpg", alt: "FCCA 9" },
  ],
  paysage: [
    { id: 1, src: "/images/paysage8.jpg", alt: "Paysage 1" },
    { id: 2, src: "/images/paysage2.jpg", alt: "Paysage 2" },
    { id: 3, src: "/images/paysage5.jpg", alt: "Paysage 3" },
    { id: 4, src: "/images/paysage18.jpg", alt: "Paysage 4" },
    { id: 5, src: "/images/paysage17.jpg", alt: "Paysage 5" },
    { id: 6, src: "/images/paysage1.jpg", alt: "Paysage 6" },
    { id: 7, src: "/images/paysage3.jpg", alt: "Paysage 7" },
    { id: 8, src: "/images/paysage6.jpg", alt: "Paysage 8" },
    { id: 9, src: "/images/paysage7.jpg", alt: "Paysage 9" },
  ],
}

const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const target = e.target as HTMLImageElement
  target.src = "/placeholder.svg?height=400&width=300&text=Image+Not+Found"
}

export default function Home() {
  const [selectedPhoto, setSelectedPhoto] = useState<{ src: string; alt: string } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean[] }>({})
  const [selectedGallery, setSelectedGallery] = useState<string | null>(null)
  const [isGalleryAnimating, setIsGalleryAnimating] = useState(false)
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

  const openGallery = (groupName: string) => {
    setIsGalleryAnimating(true)
    setSelectedGallery(groupName)
  }

  const closeGallery = () => {
    setIsGalleryAnimating(false)
    setTimeout(() => {
      setSelectedGallery(null)
    }, 300)
  }

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 sm:py-3">
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
      <section className="relative pb-0 px-4 h-auto min-h-[60vh] sm:h-[80vh] flex flex-col items-center justify-center my-0 sm:my-11 pt-20 sm:pt-16">
        <div className="text-center max-w-4xl mx-auto relative my-0 sm:my-11">
          {/* Main Title */}
          <div className="relative mb-4 sm:mb-6">
            <h1 className="text-[10vw] sm:text-[11vw] md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-[0.85] animate-fade-in-up whitespace-nowrap">
              PAUL SALVADORI
            </h1>
          </div>

          {/* Decorative Line */}
          <div className="w-12 sm:w-20 md:w-24 h-px bg-white mb-3 sm:mb-4 mx-auto animate-expand-line animation-delay-500"></div>

          {/* Location */}
          <p className="text-xs sm:text-sm md:text-base text-gray-300 font-light tracking-[0.2em] sm:tracking-[0.3em] animate-fade-in-up animation-delay-800 mb-4 sm:mb-6">
            CHERBOURG, FRANCE
          </p>

          {/* Navigation Cards Section */}
          <div className="flex justify-center animate-photo-reveal animation-delay-1000">
            <div className="mobile-horizontal-cards-container sm:desktop-cards-container">
              <div
                className="mobile-horizontal-card sm:desktop-glass-card"
                data-text="PAYSAGE"
                onClick={() => openGallery("paysage")}
              >
                <div className="w-6 h-6 sm:w-8 sm:h-8 relative rounded-full overflow-hidden border-2 border-white/20 bg-white flex-shrink-0">
                  <Image
                    src="/images/paysage5.jpg"
                    alt="Paysage Logo"
                    fill
                    className="object-cover"
                    onError={handleImageError}
                  />
                </div>
                <span className="text-white text-xs font-semibold tracking-wider sm:hidden">PAYSAGE</span>
              </div>

              <div
                className="mobile-horizontal-card sm:desktop-glass-card"
                data-text="STREETLIFE"
                onClick={() => openGallery("streetlife")}
              >
                <div className="w-6 h-6 sm:w-8 sm:h-8 relative rounded-full overflow-hidden border-2 border-white/20 bg-white flex-shrink-0">
                  <Image
                    src="/images/paysage4.jpg"
                    alt="Streetlife Logo"
                    fill
                    className="object-cover"
                    onError={handleImageError}
                  />
                </div>
                <span className="text-white text-xs font-semibold tracking-wider sm:hidden">STREETLIFE</span>
              </div>

              <div
                className="mobile-horizontal-card sm:desktop-glass-card"
                data-text="AST"
                onClick={() => openGallery("AST")}
              >
                <div className="w-6 h-6 sm:w-8 sm:h-8 relative rounded-full overflow-hidden border-2 border-white/20 bg-white flex-shrink-0">
                  <Image
                    src="/images/ast-logo.jpg"
                    alt="AST Logo"
                    fill
                    className="object-cover"
                    onError={handleImageError}
                  />
                </div>
                <span className="text-white text-xs font-semibold tracking-wider sm:hidden">AST</span>
              </div>

              <div
                className="mobile-horizontal-card sm:desktop-glass-card"
                data-text="FCCA"
                onClick={() => openGallery("fcca")}
              >
                <div className="w-6 h-6 sm:w-8 sm:h-8 relative rounded-full overflow-hidden border-2 border-white/20 bg-white flex-shrink-0">
                  <Image
                    src="/images/fcca-logo.jpg"
                    alt="FCCA Logo"
                    fill
                    className="object-cover"
                    onError={handleImageError}
                  />
                </div>
                <span className="text-white text-xs font-semibold tracking-wider sm:hidden">FCCA</span>
              </div>

              <div
                className="mobile-horizontal-card sm:desktop-glass-card"
                data-text="CAEN ATHLETIC"
                onClick={() => openGallery("caen-athletic")}
              >
                <div className="w-6 h-6 sm:w-8 sm:h-8 relative rounded-full overflow-hidden border-2 border-white/20 bg-white flex-shrink-0">
                  <Image
                    src="/images/cac-logo.jpg"
                    alt="CAC Logo"
                    fill
                    className="object-cover"
                    onError={handleImageError}
                  />
                </div>
                <span className="text-white text-xs font-semibold tracking-wider sm:hidden">CAEN ATHLETIC</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Grid Sections */}
      {Object.entries(photoGroups).map(([groupName, photos]) => (
        <section id={`${groupName}-section`} key={groupName} className="relative py-1 sm:py-8 px-4">
          <div className="max-w-6xl mx-auto text-center">
            {/* Section Title and Logo */}
            <div className="mb-8 sm:mb-10 mt-14">
              <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4 flex-wrap">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-thin tracking-wider text-white/90 whitespace-nowrap">
                  {groupName === "caen-athletic" ? "CAEN ATHLETIC" : groupName.toUpperCase()}
                </h2>

                {groupName === "paysage" && (
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 relative rounded-full overflow-hidden border-2 border-white/20 bg-white flex-shrink-0">
                    <Image
                      src="/images/paysage5.jpg"
                      alt="Paysage Logo"
                      fill
                      className="object-cover"
                      onError={handleImageError}
                    />
                  </div>
                )}

                {groupName === "streetlife" && (
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 relative rounded-full overflow-hidden border-2 border-white/20 bg-white flex-shrink-0">
                    <Image
                      src="/images/paysage4.jpg"
                      alt="Streetlife Logo"
                      fill
                      className="object-cover"
                      onError={handleImageError}
                    />
                  </div>
                )}

                {groupName === "fcca" && (
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 relative rounded-full overflow-hidden border-2 border-white/20 bg-white flex-shrink-0">
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
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 relative rounded-full overflow-hidden border-2 border-white/20 bg-white flex-shrink-0">
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
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 relative rounded-full overflow-hidden border-2 border-white/20 bg-white flex-shrink-0">
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
              <div className="w-8 sm:w-12 h-px bg-white/50 mx-auto"></div>
            </div>

            {/* Photo Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {photos.slice(0, 3).map((photo, index) => (
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
      <section className="px-4 sm:px-6 py-12 sm:py-16 border-t border-gray-800">
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
      <footer className="px-4 sm:px-6 py-4 sm:py-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-xs text-gray-500 font-light animate-fade-in">
            © 2025 Paul Salvadori. All rights reserved. Made By Léo Sauvey
          </p>
        </div>
      </footer>

      {/* Gallery Modal */}
      {selectedGallery && (
        <div
          className={`fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 ${isGalleryAnimating ? "animate-simple-fade-in" : "animate-simple-fade-out"}`}
        >
          <div className="relative w-full max-w-6xl h-full max-h-[90vh]">
            {/* Close Button */}
            <button
              onClick={closeGallery}
              className="absolute top-4 right-4 z-10 text-white text-2xl hover:text-gray-300 transition-all duration-300 hover:scale-110 transform w-10 h-10 flex items-center justify-center bg-black/50 rounded-full backdrop-blur-sm"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Gallery Grid */}
            <div className="w-full h-full overflow-y-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 p-4">
                {photoGroups[selectedGallery as keyof typeof photoGroups].map((photo, index) => (
                  <div
                    key={photo.id}
                    className={`relative aspect-square overflow-hidden rounded-lg cursor-pointer group ${isGalleryAnimating ? "animate-simple-slide-up" : ""}`}
                    style={{
                      animationDelay: `${index * 50}ms`,
                    }}
                    onClick={() => setSelectedPhoto(photo)}
                  >
                    <Image
                      src={photo.src || "/placeholder.svg"}
                      alt={photo.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={handleImageError}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                  </div>
                ))}
              </div>
            </div>

            {/* Gallery Title */}
            <div className="absolute top-4 left-4 z-10">
              <h3
                className={`text-white text-lg sm:text-xl font-bold bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm ${isGalleryAnimating ? "animate-simple-slide-right" : ""}`}
              >
                {selectedGallery === "caen-athletic" ? "CAEN ATHLETIC" : selectedGallery.toUpperCase()}
              </h3>
            </div>
          </div>
        </div>
      )}

      {/* Photo Modal */}
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
