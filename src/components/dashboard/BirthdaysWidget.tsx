import { motion } from "framer-motion";
import { Cake, PartyPopper, ChevronLeft, ChevronRight } from "lucide-react";
import UserIcon from "@/assets/user-icon.jpg";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Event {
  id: string;
  type: "birthday" | "anniversary";
  name: string;
  avatar: string;
  date: string;
  years?: number;
}

const events: Event[] = [
  {
    id: "1",
    type: "anniversary",
    name: "Abdur Rahman",
    avatar: UserIcon,
    date: "Jan 1",
    years: 5,
  },
  {
    id: "2",
    type: "birthday",
    name: "Abdullah Ahmed",
    avatar: UserIcon,
    date: "Jan 2",
  },
  {
    id: "3",
    type: "anniversary",
    name: "Abdul Rafey",
    avatar: UserIcon,
    date: "Jan 5",
    years: 3,
  },
  {
    id: "4",
    type: "birthday",
    name: "Huzaifa ",
    avatar: UserIcon,
    date: "Jan 8",
  },
];

export function BirthdaysWidget() {
  const [currentMonth, setCurrentMonth] = useState("January 2025");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="widget-card"
    >
      <div className="widget-header">
        <h3 className="widget-title">Calendar</h3>
        <div className="flex items-center gap-2">
          <button className="p-1.5 rounded-lg hover:bg-muted transition-colors">
            <ChevronLeft className="h-4 w-4 text-muted-foreground" />
          </button>
          <span className="text-sm font-medium text-foreground">{currentMonth}</span>
          <button className="p-1.5 rounded-lg hover:bg-muted transition-colors">
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Mini Calendar */}
      <div className="px-5 py-4 border-b border-border/50">
        <div className="grid grid-cols-7 gap-1 text-center text-xs">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
            <div key={day} className="py-1 text-muted-foreground font-medium">
              {day}
            </div>
          ))}
          {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
            <button
              key={day}
              className={`py-1.5 rounded-lg text-sm transition-colors relative ${
                day === 8
                  ? "bg-accent text-accent-foreground font-medium"
                  : "hover:bg-muted text-foreground"
              }`}
            >
              {day}
              {[1, 2, 5, 15, 22].includes(day) && (
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent"></span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Events */}
      <div className="divide-y divide-border/50">
        {events.map((event) => (
          <div key={event.id} className="px-5 py-3 flex items-center gap-3">
            <div
              className={`p-2 rounded-lg ${
                event.type === "birthday" ? "bg-warning/10" : "bg-success/10"
              }`}
            >
              {event.type === "birthday" ? (
                <Cake className="h-4 w-4 text-warning" />
              ) : (
                <PartyPopper className="h-4 w-4 text-success" />
              )}
            </div>
            <Avatar className="h-6 w-6">
              <AvatarImage src={event.avatar} />
              <AvatarFallback>{event.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{event.date}</p>
              <p className="text-xs text-muted-foreground">
                {event.name}'s {event.type === "birthday" ? "birthday" : `${event.years}th work anniversary`}
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
