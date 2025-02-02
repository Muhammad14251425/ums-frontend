import { NavSection } from "@/components/dashboard/student/navbar/Navbar";
import { BarChart, Bell, BellDot, BookOpen, Calendar, ClipboardList, DollarSign, FileText, Library, Mail, ScrollText, Settings, UserCheck } from 'lucide-react';


export const navStudent: NavSection[] = [
    {
        title: "ACADEMIC",
        items: [
            { icon: Calendar, label: "Schedule", href: "#" },
            { icon: ClipboardList, label: "Exam Board", href: "#" },
            { icon: FileText, label: "Assignments", href: "#" },
            { icon: BarChart, label: "Grade Report", href: "#" },
            { icon: BookOpen, label: "Enrolled Courses", href: "#" },
            { icon: ScrollText, label: "Course Plan", href: "#" },
            { icon: UserCheck, label: "Attendance", href: "#" },
            { icon: Library, label: "Libraries", href: "#" },
        ],
    },
    {
        title: "ADMINISTRATIVE",
        items: [
            { icon: DollarSign, label: "Finance", href: "#" },
            { icon: Bell, label: "Announcements", href: "#" },
        ],
    },
    {
        title: "SETTINGS",
        items: [
            { icon: Settings, label: "Account Settings", href: "#" },
            { icon: BellDot, label: "Notification Preferences", href: "#" },
        ],
    },
]



export const navFaculty: NavSection[] = [
    {
        title: "ACADEMIC",
        items: [
            { icon: Calendar, label: "Schedule", href: "#" },
            { icon: BookOpen, label: "Enrolled Courses", href: "#" },
            { icon: Mail, label: "Query", href: "#" },
        ],
    },
    {
        title: "ADMINISTRATIVE",
        items: [
            { icon: Bell, label: "Announcements", href: "#" },
        ],
    },
    {
        title: "SETTINGS",
        items: [
            { icon: Settings, label: "Account Settings", href: "#" },
            { icon: BellDot, label: "Notification Preferences", href: "#" },
        ],
    },
]