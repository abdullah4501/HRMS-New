import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import TopHeader from "../TopHeader";
import AdminHeader from "./AdminHeader";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  isMainPage: boolean;
}

export function DashboardLayout({ children, title, subtitle, isMainPage }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar />
      <div className="w-full">
        {!isMainPage && (
          <Header title={title} />
        )}

        {isMainPage && (
          <>
            <AdminHeader title="Admin" />
            <TopHeader title={title} />
          </>
        )}
        
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
