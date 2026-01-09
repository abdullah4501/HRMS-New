import { motion } from "framer-motion";
import { FileText, Calculator, Shield, Star, ChevronRight, MoreHorizontal, Umbrella } from "lucide-react";
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
    icon: Umbrella,
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
      className="widget-card p-5 h-full flex flex-col p-5"
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
            <div
              key={report.id}
              className="relative flex xl:flex-row lg:flex-col md:flex-row sm:flex-row items-center gap-4 py-6 rounded-xl transition-colors cursor-pointer group"
            >
              <div className={`p-4 rounded-full bg-[#0069ff1f]`}>
                <Icon className="h-9 w-9 text-secondary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <h4 className="text-[18px] leading-[18px] font-semibold text-gray-600 mb-1">
                    {report.title}
                  </h4>
                </div>
                <p className="text-[15px] leading-[18px] text-muted-foreground mb-1">{report.description}</p>
                
              </div>
              <ChevronRight strokeWidth={3.5} className="h-6 w-8 text-secondary group-hover:text-accent transition-colors" />
            </div>
          );
        })}
      </div>

      <div className=" py-4">
        <h4 className="text-[24px] font-bold text-gray-600 mb-1">
          Top reports
        </h4>
        <div className="space-y-2">
          {topReports.map((report) => (
            <div
              key={report.name}
              className="flex items-center justify-between py-1.5"
            >
              <div className="flex items-center gap-5">
                <Star className="h-8 w-8 text-gray-700" />
                <span className="text-[18px] font-semibold text-secondary">{report.name}</span>
              </div>
              <span className="text-[18px] px-5 py-3 rounded-[24px] bg-secondary/10 text-secondary font-normal">
                {report.tag}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-5 py-3 border-t border-border/50 text-center">
        <Link
          to="/reports"
          className="text-[20px] font-bold text-primary hover:text-primary/80 transition-colors"
        >
          View all reports
        </Link>
      </div>
    </motion.div>
  );
}
