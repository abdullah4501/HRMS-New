import { motion } from "framer-motion";
import { Wallet, Clock, ChevronRight, AlertTriangle, Umbrella } from "lucide-react";
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
    icon: Umbrella,
    iconBg: "bg-warning",
    cta: "Learn more",
    badge: "COMPLIANCE ALERT",
    badgeColor: "bg-red-500/40",
  },
];

export function QuickActionsWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="widget-card h-full p-5"
    >
      <div className="widget-header">
        <h3 className="widget-title">Grow your business</h3>
      </div>

      <div className="space-y-3">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <div
              key={service.id}
              className="relative flex xl:flex-row lg:flex-col md:flex-row sm:flex-row items-center gap-4 px-5 py-6 rounded-xl border border-gray-300 hover:bg-muted/50 transition-colors cursor-pointer group"
            >
              <div className={`p-4 rounded-full bg-[#0069ff1f]`}>
                <Icon className="h-9 w-9 text-secondary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <h4 className="text-[18px] leading-[18px] font-semibold text-gray-600 mb-1">
                    {service.title}
                  </h4>
                  {service.badge && (
                    <span className={`absolute top-0 right-4 text-[13px] px-1.5 py-0.5 rounded font-medium text-secondary ${service.badgeColor}`}>
                      {service.badge}
                    </span>
                  )}
                </div>
                <p className="text-[15px] leading-[18px] text-muted-foreground mb-1">{service.description}</p>
                <button className="text-[14px] font-medium text-secondary mt-1 group-hover:underline mb-1">
                  {service.cta}
                </button>
              </div>
              <ChevronRight strokeWidth={3.5} className="h-6 w-8 text-secondary group-hover:text-accent transition-colors" />
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
