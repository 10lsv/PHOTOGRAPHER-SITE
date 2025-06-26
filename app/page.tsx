"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Instagram } from "lucide-react"

const photos = [
  {
    id: 1,
    src: "/images/pic8.jpg",
    alt: "Athletic runner on track",
  },
  {
    id: 2,
    src: "/images/pic21.jpg",
    alt: "Football player portrait",
  },
  {
    id: 3,
    src: "/images/pic3.jpg",
    alt: "Football player from behind",
  },
  {
    id: 4,
    src: "/images/pic22.jpg",
    alt: "Close-up football player",
  },
  {
    id: 5,
    src: "/images/pic23.jpg",
    alt: "Equestrian statue silhouette",
  },
  {
    id: 6,
    src: "/images/pic10.jpg",
    alt: "Football action",
  },
  {
    id: 7,
    src: "/images/pic18.jpg",
    alt: "Football match action",
  },
  {
    id: 8,
    src: "/images/pic27.jpg",
    alt: "Architectural column",
  },
  {
    id: 9,
    src: "/images/pic19.jpg",
    alt: "Emotional football moment",
  },
]

export default function Home() {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState<boolean[]>(new Array(photos.length).fill(false))
  const photoRefs = useRef<(HTMLDivElement | null)[]>([])

  // Mobile-optimized loading animation
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

  // Scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)

      photoRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect()
          const isInView = rect.top < window.innerHeight && rect.bottom > 0

          setIsVisible((prev) => {
            const newVisible = [...prev]
            if (isInView && !newVisible[index]) {
              newVisible[index] = true
            }
            return newVisible
          })
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center overflow-hidden mobile-loader">
        <div className="text-center relative w-full h-full flex items-center justify-center">
          {/* P and S with bold font and fancy animations */}
          <div className="flex flex-col items-center justify-center space-y-8 md:space-y-12">
            {/* P from top with fancy animation */}
            <div className="text-[30vw] md:text-[20vw] font-black text-white leading-none bold-letters animate-fancy-p animation-delay-500">
              P
            </div>

            {/* S from bottom with fancy animation */}
            <div className="text-[30vw] md:text-[20vw] font-black text-white leading-none bold-letters animate-fancy-s animation-delay-1400">
              S
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-40 border-b border-gray-100 animate-slide-down">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-center">
            <nav className="flex space-x-8 text-sm">
              <Link
                href="/about"
                className="hover:text-gray-600 transition-all duration-300 hover:scale-110 hover:tracking-wider"
              >
                About
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 min-h-[70vh] flex flex-col items-center justify-center">
        <div className="w-24 h-px bg-black mb-8 animate-expand-line"></div>
        <div className="text-center">
          <p className="text-sm md:text-base text-gray-600 font-light tracking-[0.3em] animate-fade-in-up animation-delay-500">
            FRENCH PHOTOGRAPHER
          </p>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
          <div className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:border-black transition-colors duration-300">
            <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Photo Grid */}
      <section className="px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {photos.map((photo, index) => (
              <div
                key={photo.id}
                ref={(el) => (photoRefs.current[index] = el)}
                className={`group cursor-pointer transform transition-all duration-700 ${
                  isVisible[index] ? "translate-y-0 opacity-100 scale-100" : "translate-y-20 opacity-0 scale-95"
                }`}
                style={{
                  transitionDelay: `${index * 150}ms`,
                }}
                onClick={() => setSelectedPhoto(index)}
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 rounded-sm photo-container">
                  <Image
                    src={photo.src || "/placeholder.svg"}
                    alt={photo.alt}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                      <div className="w-8 h-8 border border-white rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-colors duration-300">
                        <span className="text-xs">+</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 w-0 h-0 border-t-2 border-r-2 border-white opacity-0 group-hover:opacity-100 group-hover:w-6 group-hover:h-6 transition-all duration-500 delay-100"></div>
                  <div className="absolute bottom-4 right-4 w-0 h-px bg-white opacity-0 group-hover:opacity-100 group-hover:w-12 transition-all duration-500 delay-200"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center space-x-12">
            <a
              href="https://www.instagram.com/paul.phot0grapher"
              target="_blank"
              rel="noopener noreferrer"
              className="group transition-all duration-300 hover:scale-125 animate-float"
              style={{ animationDelay: "0s" }}
            >
              <Instagram className="w-6 h-6 text-gray-600 group-hover:text-black transition-colors duration-300" />
            </a>
            <a
              href="https://www.tiktok.com/@paul.phot0grapher"
              target="_blank"
              rel="noopener noreferrer"
              className="group transition-all duration-300 hover:scale-125 animate-float"
              style={{ animationDelay: "1s" }}
            >
              <svg
                className="w-6 h-6 text-gray-600 group-hover:text-black transition-colors duration-300"
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
      <footer className="px-4 py-8 border-t border-gray-100">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-xs text-gray-500 font-light animate-fade-in">
            © 2025 Paul Salvadori. All rights reserved. Made By Léo Sauvey
          </p>
        </div>
      </footer>

      {/* Photo Modal */}
      {selectedPhoto !== null && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-modal-in"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-5xl max-h-full w-full">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 text-white text-2xl hover:text-gray-300 transition-all duration-300 hover:rotate-90 hover:scale-125 transform"
            >
              ×
            </button>
            <div className="relative w-full h-[80vh] animate-photo-reveal">
              <Image
                src={photos[selectedPhoto].src || "/placeholder.svg"}
                alt={photos[selectedPhoto].alt}
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
