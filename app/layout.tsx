import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Paul Salvadori - Sports Photographer",
  description:
    "Sports photography by Paul Salvadori. Capturing the intensity, emotion, and beauty of athletic moments.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
