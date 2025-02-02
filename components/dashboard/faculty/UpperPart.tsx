"use client";

import { Calendar } from "@/components/ui/calendar";
import { Progress } from "@/components/ui/progress";
import { useUser } from "@/hooks/userContext";
import { User } from "@/types/user";
import React from "react";

interface UpperPartProps {
  user: User;
}

const UpperPart = ({ user }: UpperPartProps) => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());


  return (
    <section className="grid grid-cols-12  text-white h-fit">
      {/* Left Section */}
      <div className="col-span-9 pl-7 py-7 w-full">
        <div className="flex justify-between items-center">
          <h2 className="text-[24px] leading-[36px] font-normal text-black mb-12">
            👋 Welcome, {user.fullName}
          </h2>
          <p className="text-xs text-[#A5A5A5]">Today&apos;s Date</p>
        </div>

        {/* Progress Cards */}
        <div className="flex mt-5 gap-6">
          {/* Card 1 */}
          <div className="flex-1 rounded-xl p-4 shadow-md bg-[#11263C]">
            <h3 className="text-sm font-medium text-[#F9F9F9]">
              Submitted Assignments
              <span className="text-xs float-right text-[#F9A633]">30%</span>
            </h3>
            <Progress
              value={30}
              className="h-2 mt-2"
              indicatorClassName="bg-[#F9A633]"
            />
          </div>

          {/* Card 2 */}
          <div className="flex-1 rounded-xl p-4 shadow-md bg-[#11263C]">
            <h3 className="text-sm font-medium text-[#F9F9F9]">
              Pending Grades
              <span className="text-xs float-right text-[#F9A633]">50%</span>
            </h3>
            <Progress
              value={50}
              className="h-2 mt-2"
              indicatorClassName="bg-[#F9A633]"
            />
          </div>

          {/* Card 3 */}
          <div className="flex-1 rounded-xl p-4 shadow-md bg-[#11263C]">
            <h3 className="text-sm font-medium text-[#F9F9F9]">
              Pending Queries
              <span className="text-xs float-right text-[#F9A633]">85%</span>
            </h3>
            <Progress
              value={85}
              className="h-2 mt-2"
              indicatorClassName="bg-[#F9A633]"
            />
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="col-span-3 px-8 py-4 h-96 space-y-4 flex flex-col items-center">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border shadow bg-white text-black"
        />
      </div>
    </section>
  );
};

export default UpperPart;
