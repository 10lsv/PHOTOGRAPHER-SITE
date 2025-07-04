import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-black mb-4">404</h1>
        <h2 className="text-2xl font-light mb-8">Page non trouvée</h2>
        <Link
          href="/"
          className="inline-block px-6 py-3 border border-white hover:bg-white hover:text-black transition-colors duration-300"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  )
}
