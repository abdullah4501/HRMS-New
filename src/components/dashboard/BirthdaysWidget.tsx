import { motion, AnimatePresence } from "framer-motion";
import { Cake, PartyPopper, ChevronLeft, ChevronRight, ChevronUp } from "lucide-react";
import UserIcon from "@/assets/user-icon.jpg";
import { useState, useMemo } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
  isToday,
} from "date-fns";

interface Event {
  id: string;
  type: "birthday" | "anniversary";
  name: string;
  avatar: string;
  date: Date;
  years?: number;
}

// Sample events - in a real app these would come from an API
const sampleEvents: Event[] = [
  {
    id: "1",
    type: "anniversary",
    name: "Jeffrey M",
    avatar: UserIcon,
    date: new Date(2025, 4, 1), // May 1
    years: 5,
  },
  {
    id: "2",
    type: "birthday",
    name: "Jeffrey M",
    avatar: UserIcon,
    date: new Date(2025, 4, 2), // May 2
  },
  {
    id: "3",
    type: "anniversary",
    name: "Abdul Rafey",
    avatar: UserIcon,
    date: new Date(2025, 4, 8), // May 8
    years: 3,
  },
  {
    id: "4",
    type: "birthday",
    name: "Huzaifa",
    avatar: UserIcon,
    date: new Date(2025, 4, 15), // May 15
  },
  {
    id: "5",
    type: "anniversary",
    name: "Sarah K",
    avatar: UserIcon,
    date: new Date(2025, 4, 22), // May 22
    years: 2,
  },
];

export function BirthdaysWidget() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 4, 22)); // May 22, 2025
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(2025, 4, 22));
  const [isEventsExpanded, setIsEventsExpanded] = useState(true);

  // Get all days to display in the calendar grid
  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const days: Date[] = [];
    let day = startDate;

    while (day <= endDate) {
      days.push(day);
      day = addDays(day, 1);
    }

    return days;
  }, [currentDate]);

  // Get events for the current month
  const monthEvents = useMemo(() => {
    return sampleEvents.filter(
      (event) =>
        event.date.getMonth() === currentDate.getMonth() &&
        event.date.getFullYear() === currentDate.getFullYear()
    );
  }, [currentDate]);

  // Check if a date has events
  const getEventDots = (date: Date) => {
    return sampleEvents.filter((event) => isSameDay(event.date, date));
  };

  const goToPreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="widget-card"
    >
      {/* Header */}
      <div className="px-5 pt-5 pb-3">
        <h3 className="text-lg font-semibold text-foreground">Calendar</h3>
      </div>

      {/* Month Navigation */}
      <div className="px-5 pb-4 flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">
          {format(currentDate, "MMMM yyyy")}
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={goToPreviousMonth}
            className="p-1 rounded hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={goToNextMonth}
            className="p-1 rounded hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="px-5 pb-4">
        {/* Week days header */}
        <div className="grid grid-cols-7 mb-2">
          {weekDays.map((day) => (
            <div
              key={day}
              className="h-8 flex items-center justify-center text-xs font-medium text-muted-foreground"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7">
          {calendarDays.map((day, index) => {
            const isCurrentMonth = isSameMonth(day, currentDate);
            const isSelected = isSameDay(day, selectedDate);
            const isTodayDate = isToday(day);
            const eventDots = getEventDots(day);
            const hasEvents = eventDots.length > 0;

            return (
              <button
                key={index}
                onClick={() => setSelectedDate(day)}
                className={`
                  h-10 flex flex-col items-center justify-center relative
                  text-sm transition-colors rounded-lg
                  ${!isCurrentMonth ? "text-muted-foreground/40" : "text-foreground"}
                  ${isSelected && !isTodayDate ? "ring-2 ring-primary/50 rounded-full" : ""}
                  ${isTodayDate && isSelected ? "ring-2 ring-destructive rounded-full" : ""}
                  ${isTodayDate && !isSelected ? "ring-2 ring-destructive/70 rounded-full" : ""}
                  ${!isSelected && isCurrentMonth ? "hover:bg-muted" : ""}
                `}
              >
                <span className={`${isTodayDate ? "font-medium" : ""}`}>
                  {format(day, "d")}
                </span>
                {hasEvents && isCurrentMonth && (
                  <span className="absolute bottom-1 w-1 h-1 rounded-full bg-primary/60" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Collapsible Events Section */}
      <div className="relative border-t py-4 border-border">
        {/* Toggle Button */}
        <button
          onClick={() => setIsEventsExpanded(!isEventsExpanded)}
          className="w-full flex items-center justify-center absolute -top-3.5 "
        >
          <motion.div
            animate={{ rotate: isEventsExpanded ? 0 : 180 }}
            transition={{ duration: 0.2 }}
            className="bg-[#b0d0ffab] p-1 rounded-full"
          >
            <ChevronUp className="h-5 w-5 text-secondary" />
          </motion.div>
        </button>

        {/* Events List */}
        <AnimatePresence>
          {isEventsExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-4 space-y-3">
                {monthEvents.length > 0 ? (
                  monthEvents.map((event) => (
                    <div key={event.id} className="flex items-start gap-3">
                      <div
                        className={`p-2 rounded-lg flex-shrink-0 ${
                          event.type === "birthday"
                            ? "bg-primary/10"
                            : "bg-primary/10"
                        }`}
                      >
                        {event.type === "birthday" ? (
                          <Cake className="h-5 w-5 text-primary" />
                        ) : (
                          <PartyPopper className="h-5 w-5 text-primary" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">
                          {format(event.date, "MMMM d")}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {event.name}'s{" "}
                          {event.type === "birthday"
                            ? "birthday"
                            : `${event.years}th work anniversary`}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-2">
                    No events this month
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
