"use client"
import type React from "react"
// app/layout.tsx
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { GameProvider, useGame } from "@/components/game-provider" // Import useGame
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Toaster } from "@/components/ui/toaster"
import { SidebarProvider } from "@/components/sidebar-context"
import { useState } from "react"
import { GameSetup } from "@/components/game-setup" // Import GameSetup

const inter = Inter({ subsets: ["latin"] })

function AppContent({ children }: { children: React.ReactNode }) {
  const { gameState } = useGame()
  const [isSidebarHovered, setIsSidebarHovered] = useState(false)

  if (!gameState.isGameStarted) {
    return <GameSetup />
  }

  return (
    <div
      className="flex min-h-screen bg-background text-foreground"
      onMouseEnter={() => setIsSidebarHovered(true)}
      onMouseLeave={() => setIsSidebarHovered(false)}
    >
      <Header />
      <Sidebar isHovered={isSidebarHovered} />
      <main
        className={`flex-1 p-4 sm:p-6 lg:p-8 overflow-auto transition-all duration-300 ease-in-out pt-14 ${
          isSidebarHovered ? "ml-56" : "ml-[72px]"
        }`}
      >
        {children}
      </main>
    </div>
  )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <GameProvider>
            <SidebarProvider>
              <AppContent>{children}</AppContent>
            </SidebarProvider>
            <Toaster />
          </GameProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
