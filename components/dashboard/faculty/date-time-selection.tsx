import React, { useState } from "react"
import { Button } from "@/components/ui/button"

interface DateTimeSelectionProps {
  onConfirm: (date: Date | null, startTime: string, endTime: string) => void
  onCancel: () => void
  defaultDate?: string
  defaultStartTime?: string
  defaultEndTime?: string
}

export function DateTimeSelection({
  onConfirm,
  onCancel,
  defaultDate = "",
  defaultStartTime = "",
  defaultEndTime = "",
}: DateTimeSelectionProps) {
  const [date, setDate] = useState(defaultDate)
  const [startTime, setStartTime] = useState(defaultStartTime)
  const [endTime, setEndTime] = useState(defaultEndTime)

  const handleConfirm = () => {
    const selectedDate = date ? new Date(date) : null
    onConfirm(selectedDate, startTime, endTime)
  }

  return (
    <div className="fixed inset-0   bg-opacity-50 flex items-center justify-center">
      <div className="bg-blue-900 w-full max-w-sm bg-opacity-90  text-white mx-auto  p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Select Date and Time</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="date" className="block mb-1">
              Date:
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 border text-black rounded"
            />
          </div>
          <div>
            <label htmlFor="startTime" className="block mb-1">
              Start Time:
            </label>
            <input
              type="time"
              id="startTime"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full p-2 text-black border rounded"
            />
          </div>
          <div>
            <label htmlFor="endTime" className="block mb-1">
              End Time:
            </label>
            <input
              type="time"
              id="endTime"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full text-black p-2 border rounded"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <Button className="text-black" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </div>
      </div>
    </div>
  )
}

