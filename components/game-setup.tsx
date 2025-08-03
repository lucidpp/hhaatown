// components/game-setup.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useGame } from "@/components/game-provider"
import { MicIcon } from "lucide-react" // Changed icon to MicIcon for Punsta
import Image from "next/image"

export function GameSetup() {
  const { startGame } = useGame()
  const [channelName, setChannelName] = useState("")

  const handleStartGame = () => {
    if (channelName.trim()) {
      startGame(channelName.trim())
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-900 via-black to-indigo-900 p-4">
      <Card className="w-full max-w-md bg-gray-800 border-gray-700 text-white">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MicIcon className="h-10 w-10 text-red-500" /> {/* Changed icon */}
            <CardTitle className="text-3xl font-bold">PUNSTA: The Ultimate Rap Simulator</CardTitle>{" "}
            {/* Renamed title */}
          </div>
          <CardDescription className="text-gray-400">
            Become the next rap sensation! Create your Punster Profile and build your empire. {/* Renamed text */}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <label htmlFor="channel-name" className="text-lg font-semibold">
              Your Punster Profile Name {/* Renamed label */}
            </label>
            <Input
              id="channel-name"
              placeholder="e.g., FlowMaster Flex"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") handleStartGame()
              }}
              className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
            />
          </div>
          <Button
            onClick={handleStartGame}
            disabled={!channelName.trim()}
            className="w-full bg-red-600 hover:bg-red-700"
          >
            Start Your Journey
          </Button>
          <div className="text-center text-sm text-gray-500 mt-4">
            <p>
              Powered by{" "}
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/v0-logo-white.svg"
                alt="v0 logo"
                width={40}
                height={40}
                className="inline-block h-4 w-auto align-middle"
              />{" "}
              v0
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
