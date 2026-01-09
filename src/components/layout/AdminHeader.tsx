import { Flag, Diamond, HelpCircle, Bell, User } from "lucide-react";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

const AdminHeader = ({ title, subtitle }: HeaderProps ) => {
  return (
    <header className="flex items-center justify-between px-8 py-8 bg-dashboard">
      <div className="text-primary-foreground font-semibold text-lg">
        {title}
      </div>
      
      <div className="flex items-center gap-4">
        <button className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
          <Flag size={20} />
        </button>
        <button className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
          <Diamond size={20} />
        </button>
        <button className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
          <HelpCircle size={20} />
        </button>
        <button className="relative text-primary-foreground/80 hover:text-primary-foreground transition-colors">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-orange-500 rounded-full border-2 border-dashboard" />
        </button>
        <button className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
          <User size={20} />
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
