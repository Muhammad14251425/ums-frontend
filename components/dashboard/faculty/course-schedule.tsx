'use client'
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";
import type { Course } from "./types/course";
import arrow from "@/public/dashboard/table/arrow-3.png";
import Image from "next/image";

interface CourseScheduleProps {
  courses: Course[];
}

export function CourseSchedule({ courses }: CourseScheduleProps) {
  const [sortedCourses, setSortedCourses] = useState(courses);
  const [isAscending, setIsAscending] = useState(true);

  const handleSort = () => {
    const sorted = [...sortedCourses].sort((a, b) =>
      isAscending
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    setSortedCourses(sorted);
    setIsAscending(!isAscending); // Toggle the sort order
  };

  return (
    <Card className="bg-gray-50">
      <CardHeader className="border-b border-gray-200">
        <CardTitle className="flex items-center gap-3 text-gray-700">
          <GraduationCap className="h-7 w-7" />
          My Courses Schedule
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="ml-60 flex items-center justify-around">
                <div />
                <button onClick={handleSort} className="flex items-center justify-center gap-2 text-gray-600">
                  Date
                  <Image
                    src={arrow}
                    alt="arrow"
                    className={`h-5 w-5 transition-transform ${isAscending ? "rotate-180" : ""
                      }`}
                  />
                </button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedCourses.map((course, index) => (
              <TableRow
                key={course.id}
                className={`flex justify-evenly pl-96 ${index % 2 === 0 ? "bg-[#FFECD9]" : "bg-white"}`}
              >
                <TableCell className="text-gray-700">
                  {course.date}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
