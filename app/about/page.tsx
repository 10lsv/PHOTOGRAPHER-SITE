"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Camera, Target, Award } from "lucide-react"

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-40 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2 hover:text-gray-600 transition-colors duration-300">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back</span>
            </Link>
            <h1 className="text-lg font-light tracking-wide">About</h1>
            <div className="w-16"></div>
          </div>
        </div>
      </header>

      {/* About Content */}
      <section className="pt-24 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Profile Section */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="relative w-32 h-32 mx-auto mb-8 rounded-full overflow-hidden">
              <Image src="/images/PAUL-PROFIL-PIC.jpg" alt="Paul Salvadori" fill className="object-cover" />
            </div>
            <h1 className="paul-title text-5xl md:text-6xl font-extralight tracking-wider mb-4">Paul Salvadori</h1>
            <p className="text-lg text-gray-600 font-light">Photographe • 14 ans • Normandie</p>
          </div>

          {/* Story */}
          <div className="grid md:grid-cols-2 gap-16 mb-16">
            <div className="space-y-6 text-gray-600 font-light leading-relaxed animate-slide-up">
              <p>Je m'appelle Paul Salvadori, je vais avoir 14 ans et je suis en 4ème au collège.</p>
              <p>
                Mes activités extrascolaires incluent beaucoup de sport : je joue au handball en club à Cherbourg et au
                football avec mes amis de temps en temps.
              </p>
              <p>
                J'ai une passion pour la photo depuis que je suis petit. J'adore prendre des photos et vidéos. Quand on
                faisait des voyages avec mes parents, j'aimais bien les prendre en photo, même prendre en photo les gens
                en général.
              </p>
              <p>
                Au fur et à mesure, mes parents ont vu que la photographie devenait ma passion. Il y a deux ans, ils
                m'ont acheté mon premier appareil photo qui est un Lumix DC TZ90.
              </p>
            </div>
            <div
              className="space-y-6 text-gray-600 font-light leading-relaxed animate-slide-up"
              style={{ animationDelay: "200ms" }}
            >
              <p>
                C'est à ce moment-là que j'ai commencé, vers mai 2024, à prendre en photo le FCCA (équipe de foot de mon
                grand frère) lors de tournois.
              </p>
              <p>
                Puis fin juillet 2024, j'ai décidé de me lancer à fond sur les réseaux. J'ai publié une vidéo par jour
                pendant toutes les vacances jusqu'en septembre, puis j'ai repris en février. Je suis à fond sur TikTok
                et Instagram surtout.
              </p>
              <p>
                Mon type de photo préféré : les photos de sport en préférence, mais j'aime bien aussi prendre en photo
                les paysages ou autres pour changer.
              </p>
              <p>
                Je ne sais pas encore si je voudrais en faire mon métier car je suis encore jeune, donc je ne me pose
                pas la question même si la photographie reste ma passion. Je verrai ce que me réserve le futur.
              </p>
            </div>
          </div>

          {/* Equipment Section */}
          <div className="grid md:grid-cols-2 gap-16 mb-16">
            <div className="animate-slide-up" style={{ animationDelay: "400ms" }}>
              <div className="relative aspect-square overflow-hidden rounded-sm mb-6">
                <Image src="/images/PAUL-MAT-PIC.jpg" alt="Lumix DC TZ90" fill className="object-cover" />
              </div>
            </div>
            <div className="space-y-8 animate-slide-up" style={{ animationDelay: "600ms" }}>
              <div>
                <h3 className="flex items-center text-lg font-medium mb-4 text-gray-900">
                  <Camera className="w-5 h-5 mr-3" />
                  Matériel utilisé
                </h3>
                <p className="text-gray-600 font-light">Lumix DC TZ90 avec objectif intégré à l'appareil photo</p>
              </div>

              <div>
                <h3 className="flex items-center text-lg font-medium mb-4 text-gray-900">
                  <Award className="w-5 h-5 mr-3" />
                  Matériel de rêve
                </h3>
                <p className="text-gray-600 font-light">Sony A7 III avec un objectif Sony 70-200mm f/2.8</p>
              </div>

              <div>
                <h3 className="flex items-center text-lg font-medium mb-4 text-gray-900">
                  <Target className="w-5 h-5 mr-3" />
                  Événements prévus & Objectifs
                </h3>
                <ul className="text-gray-600 font-light space-y-3">
                  <li>
                    • Shooter un match professionnel avant fin 2025 (Pro Ligue handball à Cherbourg ou Stade Malherbe en
                    Ligue 2)
                  </li>
                  <li>• Atteindre 10 000 abonnés Instagram avant le 27 juillet (1 an de mon compte)</li>
                  <li>• Continuer à développer ma passion photographique</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
