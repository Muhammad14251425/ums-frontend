'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Course } from '@/types/exam'


interface CourseSelectionProps {
  onSelect: (course: Course) => void
  selectedCourse?: Course
}

export function CourseSelection({ onSelect, selectedCourse }: CourseSelectionProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const courses: Course[] = [
    { id: '1', name: 'Programming Fundamentals' },
    { id: '2', name: 'Object Oreinted Programming' },
    { id: '3', name: 'Data Structures' },
    { id: '4', name: 'Introduction to Information Systems' },
  ]

  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <Input
        type="search"
        placeholder="Search Course"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="max-w-md"
      />
      <RadioGroup
        value={selectedCourse?.id}
        onValueChange={(value) => {
          const course = courses.find(c => c.id === value)
          if (course) onSelect(course)
        }}
      >
        <div className="space-y-3">
          {filteredCourses.map((course) => (
            <div key={course.id} className="flex items-center space-x-2">
              <RadioGroupItem value={course.id} id={course.id} />
              <Label htmlFor={course.id}>{course.name}</Label>
            </div>
          ))}
        </div>
      </RadioGroup>
    </div>
  )
}

