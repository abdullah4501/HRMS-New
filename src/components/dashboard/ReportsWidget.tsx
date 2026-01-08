import { motion } from "framer-motion";
import { FileText, Calculator, Shield, Star, ChevronRight, MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";

const quickReports = [
  {
    id: "1",
    title: "Year-end reports are here!",
    description: "Year-end reports and tax forms in one place",
    icon: FileText,
    iconBg: "bg-accent/10",
    iconColor: "text-accent",
  },
  {
    id: "2",
    title: "Tax forms (940, 941, W3)",
    description: "Federal and state tax forms by quarter",
    icon: Calculator,
    iconBg: "bg-success/10",
    iconColor: "text-success",
  },
  {
    id: "3",
    title: "Compliance audit reports",
    description: "Audit reports for your insurance carrier",
    icon: Shield,
    iconBg: "bg-warning/10",
    iconColor: "text-warning",
  },
];

const topReports = [
  { name: "Payroll Summary", tag: "Fiscal" },
  { name: "Payroll Details", tag: "Fiscal" },
  { name: "Earnings Record", tag: "Fiscal" },
];

export function ReportsWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="widget-card"
    >
      <div className="widget-header">
        <h3 className="widget-title">Reports</h3>
        <button className="p-1.5 rounded-lg hover:bg-muted transition-colors">
          <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>

      <div className="divide-y divide-border/50">
        {quickReports.map((report) => {
          const Icon = report.icon;
          return (
            <button
              key={report.id}
              className="w-full px-5 py-4 flex items-center gap-4 hover:bg-muted/30 transition-colors text-left"
            >
              <div className={`p-2.5 rounded-lg ${report.iconBg}`}>
                <Icon className={`h-4 w-4 ${report.iconColor}`} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-foreground">{report.title}</h4>
                <p className="text-xs text-muted-foreground mt-0.5">{report.description}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
          );
        })}
      </div>

      <div className="px-5 py-4 border-t border-border/50">
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
          Top reports
        </h4>
        <div className="space-y-2">
          {topReports.map((report) => (
            <div
              key={report.name}
              className="flex items-center justify-between py-1.5"
            >
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-warning" />
                <span className="text-sm font-medium text-accent">{report.name}</span>
              </div>
              <span className="text-xs px-2 py-0.5 rounded bg-accent/10 text-accent font-medium">
                {report.tag}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-5 py-3 border-t border-border/50 text-center">
        <Link
          to="/reports"
          className="text-sm font-medium text-accent hover:text-accent/80 transition-colors"
        >
          View all reports
        </Link>
      </div>
    </motion.div>
  );
}
