import { motion } from "framer-motion";
import { Wallet, Clock, ChevronRight, AlertTriangle, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    id: "1",
    title: "Retirement Services",
    description: "Open a 401k. Get up to 6 Months FREE",
    icon: Wallet,
    iconBg: "bg-accent",
    cta: "Learn more",
  },
  {
    id: "2",
    title: "Time & Scheduling",
    description: "Get three months free.",
    icon: Clock,
    iconBg: "bg-success",
    cta: "Get started",
  },
  {
    id: "3",
    title: "Compliance Alert",
    description: "Stay compliant & protect your business",
    icon: Shield,
    iconBg: "bg-warning",
    cta: "Learn more",
    badge: "COMPLIANCE ALERT",
    badgeColor: "bg-destructive",
  },
];

export function QuickActionsWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="widget-card h-full"
    >
      <div className="widget-header">
        <h3 className="widget-title">Grow your business</h3>
      </div>

      <div className="p-5 space-y-3">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <div
              key={service.id}
              className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer group"
            >
              <div className={`p-3 rounded-xl ${service.iconBg}`}>
                <Icon className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <h4 className="text-sm font-semibold text-foreground">
                    {service.title}
                  </h4>
                  {service.badge && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold text-white ${service.badgeColor}`}>
                      {service.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{service.description}</p>
                <button className="text-xs font-medium text-accent mt-1 group-hover:underline">
                  {service.cta}
                </button>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors" />
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
