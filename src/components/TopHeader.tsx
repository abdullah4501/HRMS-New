import { useState, useEffect } from "react";
import { Users, Building2, FileText, CloudCog, Gift, Pencil } from "lucide-react";
import AdminHeader from "./layout/AdminHeader";
import SearchBar from "./SearchBar";
import ShortcutIcon from "./ShortcutIcon";
import EditShortcutsModal from "./EditShortcutsModal";

const allShortcuts = [
  { id: "directory", label: "Directory", icon: Users, enabled: true },
  { id: "hr", label: "HR", icon: Building2, enabled: true },
  { id: "post-job", label: "Post a Job", icon: FileText, enabled: true },
  { id: "doc-vault", label: "Doc Vault", icon: CloudCog, enabled: true },
  { id: "perks", label: "Exclusive perks", icon: Gift, enabled: true },
  { id: "payroll", label: "Payroll", icon: Building2, enabled: false },
  { id: "benefits", label: "Benefits", icon: Gift, enabled: false },
  { id: "reports", label: "Reports", icon: FileText, enabled: false },
  { id: "settings", label: "Settings", icon: Building2, enabled: false },
  { id: "analytics", label: "Analytics", icon: FileText, enabled: false },
];

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};
interface HeaderProps {
  title: string;
  subtitle?: string;
}

const TopHeader = ({ title, subtitle }: HeaderProps ) => {
  const [shortcuts, setShortcuts] = useState(allShortcuts);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [tempShortcuts, setTempShortcuts] = useState(allShortcuts);
  const [greeting, setGreeting] = useState(getGreeting());

  useEffect(() => {
    const interval = setInterval(() => {
      setGreeting(getGreeting());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const enabledShortcuts = shortcuts.filter((s) => s.enabled);

  const handleOpenEditModal = () => {
    setTempShortcuts([...shortcuts]);
    setIsEditModalOpen(true);
  };

  const handleToggleShortcut = (id: string) => {
    setTempShortcuts((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
  };

  const handleSave = () => {
    setShortcuts(tempShortcuts);
    setIsEditModalOpen(false);
  };

  return (
    <div className=" bg-dashboard">
     
      <main className="px-6 py-[120px]">
        <div className="max-w-4xl mx-auto">
          {/* Greeting */}
          <h1 className="text-3xl font-semibold text-primary-foreground text-center mb-8">
            {greeting}, {title}
          </h1>

          {/* Search Bar */}
          <div className="mb-12">
            <SearchBar />
          </div>

          {/* Shortcuts */}
          <div className="flex flex-wrap items-center justify-center gap-8">
            {enabledShortcuts.map((shortcut) => (
              <ShortcutIcon
                key={shortcut.id}
                icon={shortcut.icon}
                label={shortcut.label}
              />
            ))}
            <ShortcutIcon
              icon={Pencil}
              label="Edit"
              isEdit
              onClick={handleOpenEditModal}
            />
          </div>
        </div>
      </main>

      <EditShortcutsModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        shortcuts={tempShortcuts}
        onToggleShortcut={handleToggleShortcut}
        onSave={handleSave}
      />
    </div>
  );
};

export default TopHeader;
