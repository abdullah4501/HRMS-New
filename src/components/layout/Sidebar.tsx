import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  DollarSign,
  Calculator,
  Building2,
  Settings,
  CreditCard,
  Calendar,
  Clock,
  FileText,
  ChevronDown,
  ChevronRight,
  Briefcase,
  Receipt,
  UserCog,
  Bell,
  HelpCircle,
} from "lucide-react";

interface NavItem {
  label: string;
  icon: React.ReactNode;
  path?: string;
  children?: { label: string; path: string }[];
}

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    icon: <LayoutDashboard size={20} />,
    path: "/",
  },
  {
    label: "Employees",
    icon: <Users size={20} />,
    children: [
      { label: "All Employees", path: "/employees" },
      { label: "Onboarding", path: "/employees/onboarding" },
      { label: "Manual Onboard", path: "/employees/onboard/manual" },
      { label: "Auto Onboard", path: "/employees/onboard/auto" },
    ],
  },
  {
    label: "Payroll",
    icon: <DollarSign size={20} />,
    children: [
      { label: "Salary Management", path: "/payroll" },
      { label: "Generate Payslips", path: "/payroll/payslips" },
      { label: "Deductions", path: "/payroll/deductions" },
      { label: "Allowances", path: "/payroll/allowances" },
    ],
  },
  {
    label: "Loans",
    icon: <CreditCard size={20} />,
    children: [
      { label: "All Loans", path: "/loans" },
      { label: "Issue Loan", path: "/loans/issue" },
      { label: "Loan Requests", path: "/loans/requests" },
    ],
  },
  {
    label: "Taxes",
    icon: <Receipt size={20} />,
    children: [
      { label: "Tax Overview", path: "/taxes" },
      { label: "Tax Calculator", path: "/taxes/calculator" },
      { label: "Tax Reports", path: "/taxes/reports" },
    ],
  },
  {
    label: "Departments",
    icon: <Building2 size={20} />,
    children: [
      { label: "All Departments", path: "/departments" },
      { label: "Designations", path: "/departments/designations" },
    ],
  },
  {
    label: "Attendance",
    icon: <Calendar size={20} />,
    path: "/attendance",
  },
  {
    label: "Settings",
    icon: <Settings size={20} />,
    children: [
      { label: "Company Profile", path: "/settings/company" },
      { label: "Payroll Period", path: "/settings/payroll" },
      { label: "Shifts", path: "/settings/shifts" },
      { label: "Probation", path: "/settings/probation" },
      { label: "Notice Period", path: "/settings/notice-period" },
      { label: "Non-Working Days", path: "/settings/non-working-days" },
      { label: "Attendance Config", path: "/settings/attendance" },
      { label: "Onboarding Fields", path: "/settings/onboarding-fields" },
      { label: "Salary Slip Config", path: "/settings/salary-slip" },
      { label: "Email Templates", path: "/settings/email-templates" },
      { label: "Email Signature", path: "/settings/email-signature" },
      { label: "User Management", path: "/settings/users" },
      { label: "Team Hierarchy", path: "/settings/hierarchy" },
      { label: "Timezone", path: "/settings/timezone" },
    ],
  },
];

const bottomItems: NavItem[] = [
  {
    label: "Notifications",
    icon: <Bell size={20} />,
    path: "/notifications",
  },
  {
    label: "Help Center",
    icon: <HelpCircle size={20} />,
    path: "/help",
  },
  {
    label: "Profile",
    icon: <UserCog size={20} />,
    path: "/profile",
  },
];

export function Sidebar() {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>(["Employees", "Payroll", "Settings"]);

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const isActive = (path?: string, children?: { label: string; path: string }[]) => {
    if (path && location.pathname === path) return true;
    if (children) {
      return children.some((child) => location.pathname === child.path);
    }
    return false;
  };

  return (
    <aside className="min-h-full left-0 top-0 w-64 bg-sidebar flex flex-col z-50">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-sidebar-primary flex items-center justify-center">
            <Briefcase size={20} className="text-sidebar-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-sidebar-foreground">HRMS Pro</h1>
            <p className="text-xs text-sidebar-foreground/60">Payroll & HR</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => (
          <div key={item.label}>
            {item.children ? (
              <>
                <button
                  onClick={() => toggleExpand(item.label)}
                  className={`sidebar-item w-full ${isActive(undefined, item.children) ? "sidebar-item-active" : ""}`}
                >
                  {item.icon}
                  <span className="flex-1 text-left text-sm">{item.label}</span>
                  {expandedItems.includes(item.label) ? (
                    <ChevronDown size={16} className="text-sidebar-foreground/60" />
                  ) : (
                    <ChevronRight size={16} className="text-sidebar-foreground/60" />
                  )}
                </button>
                <AnimatePresence>
                  {expandedItems.includes(item.label) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="ml-8 mt-1 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.path}
                            to={child.path}
                            className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
                              location.pathname === child.path
                                ? "bg-sidebar-accent text-sidebar-primary font-medium"
                                : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                            }`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <Link
                to={item.path!}
                className={`sidebar-item ${location.pathname === item.path ? "sidebar-item-active" : ""}`}
              >
                {item.icon}
                <span className="text-sm">{item.label}</span>
              </Link>
            )}
          </div>
        ))}
      </nav>

      {/* Bottom Items */}
      <div className="border-t border-sidebar-border px-3 py-4 space-y-1">
        {bottomItems.map((item) => (
          <Link
            key={item.label}
            to={item.path!}
            className={`sidebar-item ${location.pathname === item.path ? "sidebar-item-active" : ""}`}
          >
            {item.icon}
            <span className="text-sm">{item.label}</span>
          </Link>
        ))}
      </div>
    </aside>
  );
}
