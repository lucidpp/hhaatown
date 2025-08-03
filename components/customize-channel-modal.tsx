// components/customize-channel-modal.tsx
"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useGame } from "@/components/game-provider"
import { useToast } from "@/components/ui/use-toast"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { GripVerticalIcon } from "lucide-react"
import type { PlayerChannel } from "@/types/game" // Changed to PlayerChannel
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface CustomizeChannelModalProps {
  isOpen: boolean
  onClose: () => void
  channel: PlayerChannel // Must be PlayerChannel for customization
}

const availableSections = [
  { id: "latestVideos", name: "Latest Uploads" },
  { id: "popularVideos", name: "Popular Uploads" },
  { id: "playlists", name: "Playlists" },
  // Add more sections here if needed in the future
]

export function CustomizeChannelModal({ isOpen, onClose, channel }: CustomizeChannelModalProps) {
  const { setGameState } = useGame()
  const [selectedSections, setSelectedSections] = useState<string[]>(channel.homepageLayout)
  const [profileName, setProfileName] = useState(channel.name) // State for profile name
  const [profileBio, setProfileBio] = useState(channel.bio) // State for profile bio
  const [avatarQuery, setAvatarQuery] = useState(channel.avatar.split("query=")[1] || "") // State for avatar query
  const [bannerQuery, setBannerQuery] = useState(channel.banner.split("query=")[1] || "") // State for banner query
  const { toast } = useToast()

  const handleCheckboxChange = (sectionId: string, checked: boolean) => {
    setSelectedSections((prev) => (checked ? [...prev, sectionId] : prev.filter((id) => id !== sectionId)))
  }

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return
    }
    const items = Array.from(selectedSections)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    setSelectedSections(items)
  }

  const handleSave = () => {
    setGameState((prev) => ({
      ...prev,
      channel: {
        ...prev.channel, // Ensure all existing player channel properties are maintained
        name: profileName,
        bio: profileBio,
        avatar: avatarQuery
          ? `/placeholder.svg?height=100&width=100&query=${encodeURIComponent(avatarQuery)}`
          : "/placeholder.svg?height=100&width=100",
        banner: bannerQuery
          ? `/placeholder.svg?height=200&width=1200&query=${encodeURIComponent(bannerQuery)}`
          : "/placeholder.svg?height=200&width=1200",
        homepageLayout: selectedSections,
      },
    }))
    toast({
      title: "Punster Profile Updated!", // Renamed text
      description: "Your Punster Profile layout and details have been saved.", // Renamed text
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Customize Punster Profile</DialogTitle> {/* Renamed title */}
          <DialogDescription>
            Personalize your Punster Profile's appearance and homepage layout. {/* Renamed text */}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <h3 className="text-lg font-semibold">Profile Details</h3>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="profile-name" className="text-right">
              Profile Name
            </Label>
            <Input
              id="profile-name"
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
              className="col-span-3"
              placeholder="Your Punster Name"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="profile-bio" className="text-right">
              Bio
            </Label>
            <Textarea
              id="profile-bio"
              value={profileBio}
              onChange={(e) => setProfileBio(e.target.value)}
              className="col-span-3 min-h-[80px]"
              placeholder="Tell your fans about yourself..."
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="avatar-query" className="text-right">
              Avatar Query
            </Label>
            <Input
              id="avatar-query"
              value={avatarQuery}
              onChange={(e) => setAvatarQuery(e.target.value)}
              className="col-span-3"
              placeholder="e.g., 'cool rapper cartoon'"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="banner-query" className="text-right">
              Banner Query
            </Label>
            <Input
              id="banner-query"
              value={bannerQuery}
              onChange={(e) => setBannerQuery(e.target.value)}
              className="col-span-3"
              placeholder="e.g., 'rap concert stage'"
            />
          </div>

          <h3 className="text-lg font-semibold mt-4">Visible Sections</h3>
          <div className="grid gap-2">
            {availableSections.map((section) => (
              <div key={section.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`section-${section.id}`}
                  checked={selectedSections.includes(section.id)}
                  onCheckedChange={(checked) => handleCheckboxChange(section.id, !!checked)}
                />
                <Label htmlFor={`section-${section.id}`}>{section.name}</Label>
              </div>
            ))}
          </div>

          {selectedSections.length > 0 && (
            <>
              <h3 className="text-lg font-semibold mt-4">Order Sections (Drag & Drop)</h3>
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="homepage-sections">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="grid gap-2">
                      {selectedSections.map((sectionId, index) => {
                        const section = availableSections.find((s) => s.id === sectionId)
                        if (!section) return null
                        return (
                          <Draggable key={section.id} draggableId={section.id} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                className="flex items-center gap-2 p-2 border rounded-md bg-muted"
                                style={{ ...provided.draggableProps.style }}
                              >
                                <span {...provided.dragHandleProps}>
                                  <GripVerticalIcon className="h-5 w-5 cursor-grab text-muted-foreground" />
                                </span>
                                <Label>{section.name}</Label>
                              </div>
                            )}
                          </Draggable>
                        )
                      })}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </>
          )}
        </div>
        <DialogFooter>
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
