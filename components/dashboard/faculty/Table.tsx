import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { MoreVertical } from 'lucide-react'

interface Exam {
    name: string
    course: string
    date: string
    time: string
    location: string
    status: "Completed" | "Upcoming"
}

const exams: Exam[] = [
    {
        name: "Graphic Design Fundamentals",
        course: "ART101",
        date: "Jan 25, 2024",
        time: "10:00 AM",
        location: "Design Studio A",
        status: "Completed",
    },
    {
        name: "Digital Illustration",
        course: "ART103",
        date: "Feb 5, 2024",
        time: "02:00 PM",
        location: "Computer Lab 2",
        status: "Completed",
    },
    {
        name: "UX/UI Design Principles",
        course: "UXD301",
        date: "Mar 10, 2024",
        time: "01:00 PM",
        location: "Design Lab 1",
        status: "Upcoming",
    },
    {
        name: "History of Design Essay",
        course: "ART101",
        date: "Apr 2, 2024",
        time: "09:45 AM",
        location: "Lecture Hall B",
        status: "Upcoming",
    },
    {
        name: "Product Design Prototype",
        course: "ITD201",
        date: "May 15, 2024",
        time: "11:15 AM",
        location: "Prototype Lab",
        status: "Upcoming",
    },
    {
        name: "Color Theory and Application",
        course: "ART103",
        date: "June 8, 2024",
        time: "02:15 PM",
        location: "Design Studio B",
        status: "Upcoming",
    },
    {
        name: "Visual Communication Design",
        course: "ART202",
        date: "Nov 20, 2024",
        time: "2:00 PM",
        location: "Design Studio B",
        status: "Upcoming",
    },
]

const TableComponent = () => {
    return (
        <div className="">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Exam Name</TableHead>
                        <TableHead>Course</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        exams.map((exam, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium">{exam.name}</TableCell>
                                <TableCell>{exam.course}</TableCell>
                                <TableCell>{exam.date}</TableCell>
                                <TableCell>{exam.time}</TableCell>
                                <TableCell>{exam.location}</TableCell>
                                <TableCell>
                                    <Badge
                                        variant={exam.status === "Completed" ? "secondary" : "default"}
                                        className={
                                            exam.status === "Completed"
                                                ? "bg-green-100 text-green-800 hover:bg-green-100"
                                                : "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                        }
                                    >
                                        {exam.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                className="h-8 w-8 p-0 hover:bg-muted"
                                            >
                                                <MoreVertical className="h-4 w-4" />
                                                <span className="sr-only">Open menu</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>View details</DropdownMenuItem>
                                            <DropdownMenuItem>Edit exam</DropdownMenuItem>
                                            <DropdownMenuItem className="text-destructive">
                                                Cancel exam
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default TableComponent
