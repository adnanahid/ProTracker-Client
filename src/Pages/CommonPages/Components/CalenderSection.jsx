import React, { useState } from "react";
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, add, sub, eachDayOfInterval } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CalendarSection = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const startMonth = startOfMonth(currentDate);
  const endMonth = endOfMonth(currentDate);
  const startWeek = startOfWeek(startMonth);
  const endWeek = endOfWeek(endMonth);
  const days = eachDayOfInterval({ start: startWeek, end: endWeek });

  return (
    <div className="max-w-md mx-auto mt-10 bg-[#191919] p-6 rounded-2xl shadow-lg text-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => setCurrentDate(sub(currentDate, { months: 1 }))}>
          <ChevronLeft className="w-6 h-6 text-gray-300 hover:text-white" />
        </button>
        <h2 className="text-xl font-semibold">{format(currentDate, "MMMM yyyy")}</h2>
        <button onClick={() => setCurrentDate(add(currentDate, { months: 1 }))}>
          <ChevronRight className="w-6 h-6 text-gray-300 hover:text-white" />
        </button>
      </div>

      {/* Days of Week */}
      <div className="grid grid-cols-7 text-center text-gray-400 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="py-1">{day}</div>
        ))}
      </div>

      {/* Dates */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {days.map((day, index) => (
          <div
            key={index}
            className={`py-2 rounded-lg transition duration-200 cursor-pointer 
            ${format(day, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd") ? "bg-blue-500 text-white" : "hover:bg-gray-700"}`}
          >
            {format(day, "d")}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarSection;
