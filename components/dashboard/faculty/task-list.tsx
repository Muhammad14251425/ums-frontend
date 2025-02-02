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
import { ClipboardList } from "lucide-react";
import Image from "next/image";
import arrow from "@/public/dashboard/table/arrow-3.png";
import type { Task } from "./types/course";
import { StatusBadge } from "@/components/ui/status-badge";

interface TaskListProps {
  tasks: Task[];
}

export function TaskList({ tasks }: TaskListProps) {
  const [sortedTasks, setSortedTasks] = useState(tasks);
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    isAscending: true,
  });

  const handleSort = (key: keyof Task) => {
    const isAscending = sortConfig.key === key ? !sortConfig.isAscending : true;
    const sorted = [...sortedTasks].sort((a, b) => {
      if (a[key] < b[key]) return isAscending ? -1 : 1;
      if (a[key] > b[key]) return isAscending ? 1 : -1;
      return 0;
    });
    setSortedTasks(sorted);
    setSortConfig({ key, isAscending });
  };

  return (
    <Card className="bg-gray-50">
      <CardHeader className="border-b border-gray-200">
        <CardTitle className="flex items-center gap-2 text-gray-700">
          <ClipboardList className="h-5 w-5" />
          To-Do List
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead>
                <button
                  onClick={() => handleSort("name")}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
                >
                  Task
                  <Image
                    src={arrow}
                    alt="Arrow Icon"
                    className={`h-4 w-4 transition-transform ${
                      sortConfig.key === "name" && !sortConfig.isAscending
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </button>
              </TableHead>
              <TableHead>
                <button
                  onClick={() => handleSort("course")}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
                >
                  Course
                  <Image
                    src={arrow}
                    alt="Arrow Icon"
                    className={`h-5 w-5 transition-transform ${
                      sortConfig.key === "course" && !sortConfig.isAscending
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </button>
              </TableHead>
              <TableHead>
                <button
                  onClick={() => handleSort("date")}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
                >
                  Date
                  <Image
                    src={arrow}
                    alt="Arrow Icon"
                    className={`h-5 w-5 transition-transform ${
                      sortConfig.key === "date" && !sortConfig.isAscending
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </button>
              </TableHead>
              <TableHead>
                <button
                  onClick={() => handleSort("status")}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
                >
                  Status
                  <Image
                    src={arrow}
                    alt="Arrow Icon"
                    className={`h-5 w-5 transition-transform ${
                      sortConfig.key === "status" && !sortConfig.isAscending
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedTasks.map((task, index) => (
              <TableRow
                key={task.id}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <TableCell className="text-gray-700">{task.name}</TableCell>
                <TableCell className="text-gray-700">{task.course}</TableCell>
                <TableCell className="text-gray-700">{task.date}</TableCell>
                <TableCell>
                  <StatusBadge status={task.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
