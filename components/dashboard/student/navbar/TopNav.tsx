"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Bell, MessageCircle } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const notifications = [
  {
    id: 1,
    title: "Assignment Due",
    message: "Database Management System assignment due in 2 days",
    time: "2 hours ago"
  },
  {
    id: 2,
    title: "Exam Schedule",
    message: "Mid-term examinations schedule has been published",
    time: "5 hours ago"
  },
  {
    id: 3,
    title: "Holiday Notice",
    message: "University will remain closed on Monday due to public holiday",
    time: "1 day ago"
  }
]

const messages = [
  {
    id: 1,
    name: "Dr. Sarah Wilson",
    avatar: "/navbar/users/img1.png",
    message: "Regarding your research proposal...",
    time: "Just now"
  },
  {
    id: 2,
    name: "Prof. James Miller",
    avatar: "/navbar/users/img2.png",
    message: "Class cancelled for tomorrow",
    time: "2 hours ago"
  },
  {
    id: 3,
    name: "Academic Office",
    avatar: "/navbar/users/img3.png",
    message: "Your registration is complete",
    time: "Yesterday"
  }
]

export function TopNav() {
  const [isSearchOpen, setIsSearchOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [hasSearched, setHasSearched] = React.useState(false)
  const [isMessagesOpen, setIsMessagesOpen] = React.useState(false)

  const handleSearch = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setHasSearched(true)
    }
  }

  return (
    <div className="flex h-16 items-center justify-between border-b bg-white px-4 sticky top-0 z-50">
      <div className="relative w-96">
        <div
          className="flex cursor-pointer items-center gap-2 rounded-md bg-gray-50 px-4 py-2"
          onClick={() => setIsSearchOpen(true)}
        >
          <Search className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-500">Search</span>
        </div>
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute left-0 right-0 top-0 z-50"
            >
              <div className="relative">
                <Input
                  autoFocus
                  placeholder="Search courses, assignments, etc."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearch}
                  className="w-full pr-8"
                />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-500"
                >
                  ESC
                </button>
              </div>
              {hasSearched && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute mt-1 w-full rounded-md border bg-white p-4 shadow-lg"
                >
                  <p className="text-center text-sm text-gray-500">No results found</p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <div
            onMouseEnter={() => setIsMessagesOpen(true)}
            onMouseLeave={() => setIsMessagesOpen(false)}
          >
            <button className="relative rounded-full p-2 hover:bg-gray-100">
              <MessageCircle className="h-5 w-5" />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
            </button>
            <AnimatePresence>
              {isMessagesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-80 rounded-md border bg-white shadow-lg"
                >
                  <div className="p-4">
                    <h3 className="font-semibold">Messages</h3>
                    <div className="mt-2 space-y-3">
                      {messages.map((message) => (
                        <Link
                          key={message.id}
                          href="/messages"
                          className="flex items-start gap-3 rounded-md p-2 transition-colors hover:bg-gray-50"
                        >
                          <Image
                            src={message.avatar}
                            alt={message.name}
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium">{message.name}</p>
                            <p className="text-xs text-gray-500">{message.message}</p>
                          </div>
                          <span className="text-xs text-gray-500">{message.time}</span>
                        </Link>
                      ))}
                    </div>
                    <Link
                      href="/messages"
                      className="mt-4 block text-center text-sm text-blue-600 hover:text-blue-700"
                    >
                      View all messages
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <button className="relative rounded-full p-2 hover:bg-gray-100">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <div className="p-4">
              <h3 className="font-semibold">Notifications</h3>
              <div className="mt-2 space-y-3">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="flex flex-col gap-1 rounded-md p-2 transition-colors hover:bg-gray-50"
                  >
                    <p className="text-sm font-medium">{notification.title}</p>
                    <p className="text-xs text-gray-500">{notification.message}</p>
                    <span className="text-xs text-gray-400">{notification.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <button className="rounded-full p-1 hover:bg-gray-100">
          <Image
            src="/navbar/users/img1.png?height=32&width=32"
            alt="User"
            width={32}
            height={32}
            className="rounded-full"
          />
        </button>
      </div>
    </div>
  )
}

