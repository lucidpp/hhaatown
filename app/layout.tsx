import type React from "react"
import type { Metadata } from "next"
import RootLayout from "./page"
import "./globals.css" // Imported globals.css at the top of the file

export const metadata: Metadata = {
  title: "PUNSTA: The Ultimate Rap Simulator", // Renamed title
  description: "Simulate being a rapper on Punsta!", // Renamed description
    generator: 'v0.dev'
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootLayout children={children} />
}
