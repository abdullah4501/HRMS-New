import { LucideIcon } from "lucide-react";

interface ShortcutIconProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  isEdit?: boolean;
}

const ShortcutIcon = ({ icon: Icon, label, onClick, isEdit = false }: ShortcutIconProps) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-3 group"
    >
      <div
        className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-200 ${
          isEdit
            ? "border-2 border-dashed border-dashboard-icon-bg bg-transparent hover:border-primary-foreground/60"
            : "bg-dashboard-icon-bg "
        }`}
      >
        <Icon size={32} className="text-primary-foreground" />
      </div>
      <span className="text-primary-foreground text-sm font-medium">
        {label}
      </span>
    </button>
  );
};

export default ShortcutIcon;
