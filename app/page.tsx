"use client"

import { useState } from "react"
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

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-40 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-center">
            <nav className="flex space-x-8 text-sm">
              <Link href="/about" className="hover:text-gray-600 transition-colors duration-300">
                About
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Paul Salvadori Title */}
      <section className="pt-24 pb-8 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="paul-title text-6xl md:text-8xl font-extralight tracking-wider mb-8 animate-fade-in">
            Paul Salvadori
          </h1>
        </div>
      </section>

      {/* Photo Grid */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {photos.map((photo, index) => (
              <div
                key={photo.id}
                className="group cursor-pointer animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setSelectedPhoto(index)}
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 rounded-sm">
                  <Image
                    src={photo.src || "/placeholder.svg"}
                    alt={photo.alt}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="px-6 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center space-x-12">
            <a
              href="https://www.instagram.com/paul.phot0grapher"
              target="_blank"
              rel="noopener noreferrer"
              className="group transition-transform duration-300 hover:scale-110"
            >
              <Instagram className="w-6 h-6 text-gray-600 group-hover:text-black transition-colors duration-300" />
            </a>
            <a
              href="https://www.tiktok.com/@paul.phot0grapher"
              target="_blank"
              rel="noopener noreferrer"
              className="group transition-transform duration-300 hover:scale-110"
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
      <footer className="px-6 py-8 border-t border-gray-100">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-xs text-gray-500 font-light">
            © 2025 Paul Salvadori. All rights reserved. Made By Léo Sauvey
          </p>
        </div>
      </footer>

      {/* Photo Modal */}
      {selectedPhoto !== null && (
        <div
          className="fixed inset-0 bg-white z-50 flex items-center justify-center p-6 animate-fade-in"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-5xl max-h-full w-full">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 text-2xl hover:text-gray-600 transition-colors duration-300 hover:rotate-90 transform transition-transform"
            >
              ×
            </button>
            <div className="relative w-full h-[80vh] animate-scale-in">
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
