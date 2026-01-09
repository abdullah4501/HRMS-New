import { motion } from "framer-motion";
import { AlertCircle, Clock, CheckCircle, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface Notification {
  id: string;
  type: "warning" | "info" | "success";
  title: string;
  description: string;
  daysAgo: number;
  category: string;
}

const notifications: Notification[] = [
  {
    id: "1",
    type: "warning",
    title: "Pending Payroll Approval",
    description: "5 employees' payroll needs approval before the deadline",
    daysAgo: 2,
    category: "Payroll",
  },
  {
    id: "2",
    type: "info",
    title: "New Employee Onboarding",
    description: "3 new employees are scheduled to start this week",
    daysAgo: 1,
    category: "HR",
  },
];

const iconMap = {
  warning: AlertCircle,
  info: Clock,
  success: CheckCircle,
};

const colorMap = {
  warning: "text-warning bg-warning/10",
  info: "text-info bg-info/10",
  success: "text-success bg-success/10",
};

export function NotificationsWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="widget-card h-full flex flex-col p-5"
    >
      <div className="widget-header ">
        <h3 className="widget-title">Top things to do</h3>
      </div>
      <div className="divide-y divide-border/50">
        {notifications.map((notification) => {
          const Icon = iconMap[notification.type];
          const colors = colorMap[notification.type];
          return (
            <div
              key={notification.id}
              className=" py-4 hover:bg-muted/30 transition-colors cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${colors}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-muted-foreground">
                      {notification.daysAgo} day{notification.daysAgo > 1 ? "s" : ""} ago
                    </span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs font-medium text-accent">
                      {notification.category}
                    </span>
                  </div>
                  <h4 className="text-sm font-medium text-foreground">{notification.title}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                    {notification.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="px-5 py-3 border-t border-border/50 h-full flex items-center justify-center">
        <Link
          to="/notifications"
          className=" font-semibold text-secondary hover:text-accent/80 flex items-center justify-center gap-1"
        >
          View all notifications
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.div>
  );
}
