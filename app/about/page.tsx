"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Camera, Target, MapPin } from "lucide-react"

export default function About() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 w-full bg-black/80 backdrop-blur-md z-40 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Profile Picture Logo */}
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/30">
              <Image
                src="/images/PAUL-PROFIL-PIC.jpg"
                alt="Paul Salvadori"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            <Link
              href="/"
              className="flex items-center space-x-2 hover:text-gray-300 transition-all duration-300 hover:scale-110"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Retour</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-12 px-4 min-h-screen flex flex-col items-center justify-center">
        <div className="text-center max-w-6xl mx-auto relative">
          {/* Main Title */}
          <div className="relative mb-8">
            <h1 className="text-[12vw] sm:text-[8vw] md:text-6xl lg:text-7xl font-black tracking-tight leading-none animate-fade-in-up">
              ABOUT
            </h1>
            <h2 className="text-[8vw] sm:text-[6vw] md:text-4xl lg:text-5xl font-thin tracking-wider mt-2 text-gray-300 animate-fade-in-up animation-delay-200">
              PAUL SALVADORI
            </h2>
          </div>

          {/* Decorative Line */}
          <div className="w-24 sm:w-32 h-px bg-white mb-12 mx-auto animate-expand-line animation-delay-500"></div>

          {/* Hero Images Grid */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 mb-16">
            {/* Paul in Action */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg animate-slide-up">
              <Image src="/images/PAUL-PROFIL-PIC.jpg" alt="Paul Salvadori en action" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl font-medium mb-2">En Action</h3>
                <p className="text-sm text-gray-300">Sur la piste d'athlétisme</p>
              </div>
            </div>

            {/* Equipment */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg animate-slide-up animation-delay-200">
              <Image src="/images/PAUL-MAT-PIC.jpg" alt="Matériel photo de Paul" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl font-medium mb-2">Mon Matériel</h3>
                <p className="text-sm text-gray-300">Lumix DC TZ90</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-6 border-t border-gray-800">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-thin tracking-wider text-white/90 mb-4">MON HISTOIRE</h2>
            <div className="w-16 h-px bg-white/50 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 text-gray-300 font-light leading-relaxed">
            <div className="space-y-6 animate-slide-up">
              <p>
                Je m'appelle Paul Salvadori, je vais avoir 14 ans et je suis en 4ème au collège. Mes activités
                extrascolaires incluent beaucoup de sport : je joue au handball en club à Cherbourg et au football avec
                mes amis de temps en temps.
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
            <div className="space-y-6 animate-slide-up animation-delay-200">
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
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-thin tracking-wider text-white/90 mb-4">EN CHIFFRES</h2>
            <div className="w-16 h-px bg-white/50 mx-auto"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center animate-fade-in-up">
              <div className="text-3xl md:text-4xl font-black text-white mb-2">14</div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">Ans</div>
            </div>
            <div className="text-center animate-fade-in-up animation-delay-200">
              <div className="text-3xl md:text-4xl font-black text-white mb-2">2024</div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">Début</div>
            </div>
            <div className="text-center animate-fade-in-up animation-delay-400">
              <div className="text-3xl md:text-4xl font-black text-white mb-2">3</div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">Sports</div>
            </div>
            <div className="text-center animate-fade-in-up animation-delay-600">
              <div className="text-3xl md:text-4xl font-black text-white mb-2">∞</div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">Passion</div>
            </div>
          </div>
        </div>
      </section>

      {/* Equipment & Goals Section */}
      <section className="py-20 px-6 border-t border-gray-800">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Equipment */}
            <div className="animate-slide-up">
              <div className="flex items-center mb-6">
                <Camera className="w-6 h-6 mr-3 text-white" />
                <h3 className="text-2xl font-medium text-white">Matériel</h3>
              </div>
              <div className="space-y-4 text-gray-300">
                <div>
                  <h4 className="text-white font-medium mb-2">Actuel</h4>
                  <p>Lumix DC TZ90 avec objectif intégré</p>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-2">Objectif</h4>
                  <p>Sony A7 III avec objectif Sony 70-200mm f/2.8</p>
                </div>
              </div>
            </div>

            {/* Goals */}
            <div className="animate-slide-up animation-delay-200">
              <div className="flex items-center mb-6">
                <Target className="w-6 h-6 mr-3 text-white" />
                <h3 className="text-2xl font-medium text-white">Objectifs</h3>
              </div>
              <div className="space-y-4 text-gray-300">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                  <p>Shooter un match professionnel avant fin 2025</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                  <p>Atteindre 10 000 abonnés Instagram avant juillet</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                  <p>Continuer à développer ma passion photographique</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-20 px-6 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <MapPin className="w-6 h-6 mr-3 text-white" />
            <h3 className="text-2xl font-medium text-white">Localisation</h3>
          </div>
          <p className="text-xl text-gray-300 font-light tracking-wider">CHERBOURG, NORMANDIE, FRANCE</p>
          <div className="w-24 h-px bg-white/50 mx-auto mt-6"></div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-xs text-gray-500 font-light">
            © 2025 Paul Salvadori. All rights reserved. Made By Léo Sauvey
          </p>
        </div>
      </footer>
    </div>
  )
}
