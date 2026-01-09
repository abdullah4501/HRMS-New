import { useState, useEffect, createContext, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  DollarSign,
  Building2,
  Settings,
  CreditCard,
  Calendar,
  Receipt,
  UserCog,
  Bell,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  PanelLeftClose,
  PanelLeft,
  X,
  Menu,
  House,
  FileUser,
  Files,
  Clock,
  Shield,
  Heart,
  Store,
  FolderArchive,
  MoreHorizontal,
  Umbrella,
  CloudCog,
} from "lucide-react";

interface NavItem {
  label: string;
  icon: React.ReactNode;
  path?: string;
  children?: { label: string; path: string }[];
}

const navItems: NavItem[] = [
  {
    label: "Home",
    icon: <House size={24} />,
    path: "/",
  },
  {
    label: "Payroll",
    icon: <DollarSign size={24} />,
    children: [
      { label: "Salary Management", path: "/payroll" },
      { label: "Generate Payslips", path: "/payroll/payslips" },
      { label: "Deductions", path: "/payroll/deductions" },
      { label: "Allowances", path: "/payroll/allowances" },
    ],
  },
  {
    label: "People",
    icon: <Users size={24} />,
    children: [
      { label: "All Employees", path: "/employees" },
      { label: "Onboarding", path: "/employees/onboarding" },
      { label: "Manual Onboard", path: "/employees/onboard/manual" },
      { label: "Auto Onboard", path: "/employees/onboard/auto" },
    ],
  },
  {
    label: "HR",
    icon: <FileUser size={24} />,
    path: "/hr",
  },
  {
    label: "Reports",
    icon: <Files size={24} />,
    path: "/reports",
  },
  {
    label: "Taxes",
    icon: <Receipt size={24} />,
    children: [
      { label: "Tax Overview", path: "/taxes" },
      { label: "Tax Calculator", path: "/taxes/calculator" },
      { label: "Tax Reports", path: "/taxes/reports" },
    ],
  },
  {
    label: "Retirement",
    icon: <Files size={24} />,
    path: "/retirement",
  },
  {
    label: "Billing & Invoices",
    icon: <Files size={24} />,
    path: "/billing",
  },
  {
    label: "Settings",
    icon: <Settings size={24} />,
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
  {
    label: "Departments",
    icon: <Building2 size={24} />,
    children: [
      { label: "All Departments", path: "/departments" },
      { label: "Designations", path: "/departments/designations" },
    ],
  },
];

const upgradeItems: NavItem[] = [
  {
    label: "Time",
    icon: <Clock size={24} />,
    path: "/time",
  },
  {
    label: "Workers' Comp",
    icon: <Umbrella size={24} />,
    path: "/workers-comp",
  },
  {
    label: "Health & Benefits",
    icon: <Heart size={24} />,
    path: "/health-benefits",
  },
];

const moreItems: NavItem[] = [
  {
    label: "Marketplace",
    icon: <Store size={24} />,
    path: "/marketplace",
  },
  {
    label: "Doc Vault",
    icon: <CloudCog size={24} />,
    path: "/doc-vault",
  },
  {
    label: "More",
    icon: <MoreHorizontal size={24} />,
    path: "/more",
  },
];

const bottomItems: NavItem[] = [
  {
    label: "Notifications",
    icon: <Bell size={24} />,
    path: "/notifications",
  },
  {
    label: "Help Center",
    icon: <HelpCircle size={24} />,
    path: "/help",
  },
  {
    label: "Profile",
    icon: <UserCog size={24} />,
    path: "/profile",
  },
];

// Context for sidebar state
interface SidebarContextType {
  isCollapsed: boolean;
  isMobile: boolean;
  isOverlayOpen: boolean;
  toggleSidebar: () => void;
  closeMobileOverlay: () => void;
}

const SidebarContext = createContext<SidebarContextType | null>(null);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) throw new Error("useSidebar must be used within SidebarProvider");
  return context;
};

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsCollapsed(true);
        setIsOverlayOpen(false);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setIsOverlayOpen(!isOverlayOpen);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  const closeMobileOverlay = () => {
    setIsOverlayOpen(false);
  };

  return (
    <SidebarContext.Provider
      value={{ isCollapsed, isMobile, isOverlayOpen, toggleSidebar, closeMobileOverlay }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

// Tooltip component for collapsed state
function SidebarTooltip({
  children,
  label,
  show,
}: {
  children: React.ReactNode;
  label: string;
  show: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  if (!show) return <>{children}</>;

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -5 }}
            className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2.5 py-1.5 bg-foreground text-background text-xs font-medium rounded-md whitespace-nowrap z-50 shadow-lg"
          >
            {label}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Reusable component to render nav items
function NavItemRenderer({
  items,
  showFull,
  expandedItems,
  toggleExpand,
  isActive,
  handleLinkClick,
  location,
}: {
  items: NavItem[];
  showFull: boolean;
  expandedItems: string[];
  toggleExpand: (label: string) => void;
  isActive: (path?: string, children?: { label: string; path: string }[]) => boolean;
  handleLinkClick: () => void;
  location: ReturnType<typeof useLocation>;
}) {
  return (
    <>
      {items.map((item) => (
        <div key={item.label}>
          {item.children ? (
            <>
              <SidebarTooltip label={item.label} show={!showFull}>
                <button
                  onClick={() => showFull && toggleExpand(item.label)}
                  className={`sidebar-item w-full ${isActive(undefined, item.children) ? "sidebar-item-active" : ""
                    } ${!showFull ? "sidebar-item-collapsed" : ""}`}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  {showFull && (
                    <>
                      <span className="flex-1 text-left text-[18px]">{item.label}</span>
                      {expandedItems.includes(item.label) ? (
                        <ChevronDown size={16} className="text-sidebar-muted" />
                      ) : (
                        <ChevronRight size={16} className="text-sidebar-muted" />
                      )}
                    </>
                  )}
                </button>
              </SidebarTooltip>
              <AnimatePresence>
                {showFull && expandedItems.includes(item.label) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="ml-8 mt-1 space-y-0.5">
                      {item.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          onClick={handleLinkClick}
                          className={`block px-3 py-2 text-[16px] rounded-lg transition-colors ${location.pathname === child.path
                            ? "bg-sidebar-accent text-sidebar-primary font-medium"
                            : "text-sidebar-foreground/70 hover:text-sidebar-foreground "
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
            <SidebarTooltip label={item.label} show={!showFull}>
              <Link
                to={item.path!}
                onClick={handleLinkClick}
                className={`sidebar-item ${location.pathname === item.path ? "sidebar-item-active" : ""
                  } ${!showFull ? "sidebar-item-collapsed" : ""}`}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                {showFull && <span className="text-[18px]">{item.label}</span>}
              </Link>
            </SidebarTooltip>
          )}
        </div>
      ))}
    </>
  );
}

export function Sidebar() {
  const location = useLocation();
  const { isCollapsed, isMobile, isOverlayOpen, toggleSidebar, closeMobileOverlay } = useSidebar();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const showFull = isMobile ? isOverlayOpen : !isCollapsed;

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
  };

  const isActive = (path?: string, children?: { label: string; path: string }[]) => {
    if (path && location.pathname === path) return true;
    if (children) {
      return children.some((child) => location.pathname === child.path);
    }
    return false;
  };

  const handleLinkClick = () => {
    if (isMobile) {
      closeMobileOverlay();
    }
  };

  const sidebarContent = (
    <motion.aside
      initial={false}
      animate={{ width: showFull ? 360 : 72 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`Home bg-sidebar flex flex-col z-50 ${isMobile && isOverlayOpen ? "fixed left-0 top-0 shadow-2xl" : "relative"
        }`}
    >
      {/* Header with Toggle */}
      <div className="px-3 py-8 flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg text-sidebar-foreground/80 hover:text-sidebar-foreground transition-colors"
          aria-label="Toggle sidebar"
        >
          {showFull ? <Menu size={30} strokeWidth={3} /> : <PanelLeft size={24} />}
        </button>
        <AnimatePresence>
          {showFull && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <h1 className="text-[24px] font-bold text-sidebar-foreground whitespace-nowrap">HRMS</h1>
              <p className="text-xs text-sidebar-muted whitespace-nowrap">Payroll & HR</p>
            </motion.div>
          )}
        </AnimatePresence>
        {isMobile && isOverlayOpen && (
          <button
            onClick={closeMobileOverlay}
            className="ml-auto p-2 rounded-lg hover:bg-sidebar-accent text-sidebar-foreground/80 hover:text-sidebar-foreground transition-colors"
          >
            <X size={24} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-4 mt-3 overflow-y-auto">
        {/* Normal Navigation Items */}
        <NavItemRenderer
          items={navItems}
          showFull={showFull}
          expandedItems={expandedItems}
          toggleExpand={toggleExpand}
          isActive={isActive}
          handleLinkClick={handleLinkClick}
          location={location}
        />

        {/* Upgrades Section */}
        <div className="pt-4">
          {showFull && (
            <h3 className="px-3 py-2 text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider">
              Upgrades
            </h3>
          )}
          {!showFull && <div className="border-t border-sidebar-border my-2" />}
          <NavItemRenderer
            items={upgradeItems}
            showFull={showFull}
            expandedItems={expandedItems}
            toggleExpand={toggleExpand}
            isActive={isActive}
            handleLinkClick={handleLinkClick}
            location={location}
          />
        </div>

        {/* More Section */}
        <div className="pt-4">
          {showFull && (
            <h3 className="px-3 py-2 text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider">
              More
            </h3>
          )}
          {!showFull && <div className="border-t border-sidebar-border my-2" />}
          <NavItemRenderer
            items={moreItems}
            showFull={showFull}
            expandedItems={expandedItems}
            toggleExpand={toggleExpand}
            isActive={isActive}
            handleLinkClick={handleLinkClick}
            location={location}
          />
        </div>
      </nav>

      {/* Bottom Items */}
      <div className="border-t border-sidebar-border px-3 py-4 space-y-1">
        {bottomItems.map((item) => (
          <SidebarTooltip key={item.label} label={item.label} show={!showFull}>
            <Link
              to={item.path!}
              onClick={handleLinkClick}
              className={`sidebar-item ${location.pathname === item.path ? "sidebar-item-active" : ""
                } ${!showFull ? "sidebar-item-collapsed" : ""}`}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {showFull && <span className="text-[18px]">{item.label}</span>}
            </Link>
          </SidebarTooltip>
        ))}
      </div>
    </motion.aside>
  );

  return (
    <>
      {/* Mobile Overlay Backdrop */}
      <AnimatePresence>
        {isMobile && isOverlayOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMobileOverlay}
            className="fixed inset-0 bg-black/50 z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      {sidebarContent}
    </>
  );
}
