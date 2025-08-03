// components/about-channel-modal.tsx
"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useGame } from "@/components/game-provider"
import { Separator } from "@/components/ui/separator"
import { GlobeIcon, BarChartIcon } from "lucide-react"
import type { BaseChannel } from "@/types/game" // Changed to BaseChannel

interface AboutChannelModalProps {
  isOpen: boolean
  onClose: () => void
  channel: BaseChannel // Changed to BaseChannel
}

export function AboutChannelModal({ isOpen, onClose, channel }: AboutChannelModalProps) {
  const { gameState } = useGame()

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(0)}K`
    }
    return num.toString()
  }

  // Get current date for joined date simulation
  const joinedDate = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>About {channel.name}</DialogTitle>
          <DialogDescription>Learn more about this Punster Profile.</DialogDescription> {/* Renamed text */}
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p className="text-muted-foreground">{channel.bio}</p>

          <Separator />

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <GlobeIcon className="h-4 w-4" />
            <span>Joined {joinedDate}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <BarChartIcon className="h-4 w-4" />
            <span>{formatNumber(channel.totalViews)} total views</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <BarChartIcon className="h-4 w-4" />
            <span>{formatNumber(channel.subscribers)} subscribers</span>
          </div>

          <Separator />

          <p className="text-sm text-muted-foreground">Location: United States</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
