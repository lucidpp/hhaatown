// components/header.tsx
"use client"

import type React from "react"

import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MenuIcon, SearchIcon, UploadIcon, BellIcon, MicIcon, PlusCircleIcon } from "lucide-react" // Added MusicIcon for Punsta
import { useGame } from "@/components/game-provider"
import { useState } from "react"
import { AdCampaignModal } from "./ad-campaign-modal"
import { ContentUploadModal } from "./content-upload-modal"
import { PlaylistCreationModal } from "./playlist-creation-modal"
import { PostCreationModal } from "./post-creation-modal"
import { useSidebar } from "@/components/sidebar-context"

export function Header() {
  const { gameState } = useGame()
  const { setIsSidebarOpen } = useSidebar()
  const [isAdModalOpen, setIsAdModalOpen] = useState(false)
  const [isContentUploadModalOpen, setIsContentUploadModalOpen] = useState(false)
  const [isPlaylistCreationModalOpen, setIsPlaylistCreationModalOpen] = useState(false)
  const [isPostCreationModalOpen, setIsPostCreationModalOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-14 items-center justify-between bg-background px-4 shadow-sm">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsSidebarOpen(true)}>
          <MenuIcon className="h-6 w-6" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
          <PunstaIcon className="h-6 w-6 text-red-500" /> {/* Renamed icon component */}
          <span className="hidden sm:inline">Punsta</span> {/* Renamed text */}
        </Link>
      </div>
      <div className="relative flex flex-1 max-w-md mx-4">
        <Input type="search" placeholder="Search" className="w-full rounded-full bg-muted pl-4 pr-10" />
        <Button type="submit" size="icon" className="absolute right-0 top-0 h-full rounded-l-none rounded-r-full">
          <SearchIcon className="h-5 w-5" />
          <span className="sr-only">Search</span>
        </Button>
        <Button variant="ghost" size="icon" className="ml-2 rounded-full hidden sm:flex">
          <MicIcon className="h-5 w-5" />
          <span className="sr-only">Voice search</span>
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <PlusCircleIcon className="h-5 w-5" />
              <span className="sr-only">Create</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setIsContentUploadModalOpen(true)}>
              <UploadIcon className="h-4 w-4 mr-2" /> Upload Pun {/* Renamed text */}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsPostCreationModalOpen(true)}>
              <MessageSquareIcon className="h-4 w-4 mr-2" /> Create Post
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsPlaylistCreationModalOpen(true)}>
              <ListVideoIcon className="h-4 w-4 mr-2" /> Create Playlist
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="icon" className="hidden sm:flex">
          <BellIcon className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-8 w-8 cursor-pointer">
              <AvatarImage src={gameState.channel.avatar || "/placeholder.svg"} alt={gameState.channel.name} />
              <AvatarFallback>{gameState.channel.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{gameState.channel.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/channel/${gameState.channel.id}`}>Your Punster Profile</Link> {/* Renamed text */}
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/studio">Punsta Studio</Link> {/* Renamed text */}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsAdModalOpen(true)} disabled={gameState.channel.hasAdvertised}>
              Run Ad Campaign (Once)
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <AdCampaignModal isOpen={isAdModalOpen} onClose={() => setIsAdModalOpen(false)} />
      <ContentUploadModal isOpen={isContentUploadModalOpen} onClose={() => setIsContentUploadModalOpen(false)} />
      <PlaylistCreationModal
        isOpen={isPlaylistCreationModalOpen}
        onClose={() => setIsPlaylistCreationModalOpen(false)}
      />
      <PostCreationModal isOpen={isPostCreationModalOpen} onClose={() => setIsPostCreationModalOpen(false)} />
    </header>
  )
}

function PunstaIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0 2 2 0 0 1 1.4 1.4 24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.56 49.56 0 0 1-16.2 0 2 2 0 0 1-1.4-1.4Z" />
      <path d="m10 15 5-3-5-3Z" />
    </svg>
  )
}

function ListVideoIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 12H3" />
      <path d="M16 6H3" />
      <path d="M12 18H3" />
      <path d="m16 12 5 3-5 3V12Z" />
    </svg>
  )
}

function MessageSquareIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}
