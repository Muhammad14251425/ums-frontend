'use client'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Folder,
  Calendar,
  Clock,
  MapPin,
  FileText,
  CheckSquare,
  MessageSquare,
  AlertCircle,
  Bell,
  BellRing,
  List,
} from "lucide-react"
import type React from "react"
import { usePathname, useRouter } from "next/navigation"

interface OverviewCardProps {
  title: string
  buttonText: string
  link: string
  features: { text: string; icon: string }[]
}

const iconMap: { [key: string]: React.ElementType } = {
  Folder,
  Calendar,
  Clock,
  MapPin,
  FileText,
  CheckSquare,
  MessageSquare,
  AlertCircle,
  Bell,
  BellRing,
  List,
}

export function OverviewCard({ title, buttonText, features, link }: OverviewCardProps) {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <Card className="bg-[#3282DC]/40 border-none relative rounded-[4px] flex flex-col">
      <div className="h-full w-full absolute border -bottom-[6px] -right-[6px] border-[#CED8E5]/70" />
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium border-b pb-1 border-black">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 flex-grow">
        {features.map((feature, index) => {
          const Icon = iconMap[feature.icon]
          return (
            <div key={index} className="flex items-center gap-2 text-sm">
              <Icon className="h-4 w-4" />
              <span>{feature.text}</span>
            </div>
          )
        })}
      </CardContent>
      <CardFooter>
        <Button onClick={() => router.push(`${pathname}/${link}`)} variant="default" className="w-full bg-black text-white hover:bg-gray-800 text-sm py-1 cursor-pointer z-50 rounded-xl">
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  )
}

