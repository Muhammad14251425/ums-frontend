'use client'
import { Card } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, Tooltip, Cell } from "recharts"
import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"

const data = [
    { name: "Expository", value: 35 },
    { name: "Civics", value: 65 },
    { name: "Software Eng", value: 45 },
    { name: "DSA", value: 40 },
    { name: "Entrepreneurship", value: 58 },
    { name: "DSA Lab", value: 100 },
    { name: "COAL", value: 42 },
    { name: "COAL LAB", value: 68 },
]

interface ChartsProps {
    cgpa: number | undefined
}

const Charts = ({ cgpa = 0 }: ChartsProps) => {
    const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null) // State to track the hovered bar
    const radius = 85;
    const circumference = 2 * Math.PI * radius;
    const safeCgpa = Math.min(Math.max(cgpa, 0), 4);
    const cgpaPercentage = (safeCgpa / 4.0) * 100;
    return (
        <div className="w-full p-6 space-y-8">
            <div className="flex items-center">
                <Card className="px-6 flex-[0.7]">
                    <div className="h-[260px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data} barCategoryGap={700}>
                                <XAxis
                                    dataKey="name"
                                    fontSize={10}
                                    tickMargin={7}
                                    axisLine={false}
                                    tickLine={false}
                                    allowDataOverflow={true}
                                    tickFormatter={(value) => {
                                        // Break the text into multiple lines
                                        const maxLineLength = 10; // Maximum characters per line
                                        const lines = value.match(new RegExp(`.{1,${maxLineLength}}`, "g"));
                                        return lines ? lines.join("\n") : value;
                                    }}
                                />
                                <Tooltip
                                    cursor={{ fill: 'rgba(0, 0, 0, 0.0)' }}
                                    contentStyle={{
                                        backgroundColor: '#ffffff',
                                        borderRadius: '8px',
                                        fontSize: '12px',
                                        fontWeight: 'bold',
                                    }}
                                />
                                <Bar
                                    dataKey="value"
                                    radius={[10, 10, 10, 10]}
                                    barSize={40}
                                    fill="#0C1E33"
                                >
                                    {data.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={
                                                hoveredIndex === index
                                                    // ? "#FBA733" // Hover color
                                                    // : entry.name === "DSA Lab"
                                                    ? "#FBA733" // DSA Lab specific color
                                                    : "#0C1E33" // Default color
                                            }
                                            onMouseEnter={() => setHoveredIndex(index)} // Set hover state
                                            onMouseLeave={() => setHoveredIndex(null)} // Reset hover state
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* CGPA Donut Chart */}
                <Card className="flex-[0.3] p-4">
                    {!cgpa ? (
                        <div className="relative h-80 w-80 flex items-center justify-center">
                            {/* Skeleton Loader */}
                            <Skeleton className="absolute w-80 h-80 rounded-full" />
                            <Skeleton className="absolute w-20 h-6 rounded-md" />
                            <Skeleton className="absolute top-12 w-28 h-10 rounded-md" />
                        </div>
                    ) : (
                        <div className="relative h-80 w-80 flex items-center justify-center">
                            <svg className="w-80 h-80 transform -rotate-90 flex items-center justify-center">
                                <circle
                                    className="text-gray-300"
                                    strokeWidth="45"
                                    stroke="currentColor"
                                    fill="transparent"
                                    r={radius}
                                    cx="150"
                                    cy="150"
                                />
                                <circle
                                    className={cgpa > 3.0 ? "text-[#FBA733]" : cgpa > 2.0 ? "text-orange-400" : "text-red-500"}
                                    strokeWidth="45"
                                    strokeDasharray={circumference}
                                    strokeDashoffset={circumference * (1 - cgpaPercentage / 100)}
                                    strokeLinecap="round"
                                    stroke="currentColor"
                                    fill="transparent"
                                    r={radius}
                                    cx="150"
                                    cy="150"
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center -ml-6 mt-3">
                                <div className="text-center leading-none">
                                    <div className="text-base text-black font-sm">CGPA</div>
                                    <div className="text-3xl font-extrabold">{cgpa}</div>
                                </div>
                            </div>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    )
}

export default Charts