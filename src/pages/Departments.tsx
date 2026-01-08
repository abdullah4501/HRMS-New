import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Edit, Trash2, Users, ChevronRight, Building2, Search } from "lucide-react";
import { motion } from "framer-motion";

const departments = [
  { id: "1", name: "Engineering", head: "John Smith", employees: 45, designations: ["Senior Developer", "Junior Developer", "DevOps Engineer", "Tech Lead"] },
  { id: "2", name: "Marketing", head: "Sarah Johnson", employees: 18, designations: ["Marketing Manager", "Content Writer", "SEO Specialist"] },
  { id: "3", name: "Finance", head: "Michael Chen", employees: 12, designations: ["Financial Analyst", "Accountant", "CFO"] },
  { id: "4", name: "Human Resources", head: "Emily Davis", employees: 8, designations: ["HR Manager", "Recruiter", "HR Specialist"] },
  { id: "5", name: "Sales", head: "David Wilson", employees: 25, designations: ["Sales Executive", "Account Manager", "Sales Director"] },
];

export default function Departments() {
  return (
    <DashboardLayout title="Department Management" subtitle="Manage departments and designations">
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search departments..." className="pl-10" />
        </div>
        <Button className="btn-primary gap-2">
          <Plus className="h-4 w-4" /> Add Department
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept, index) => (
          <motion.div
            key={dept.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="widget-card p-5 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-xl bg-accent/10">
                <Building2 className="h-6 w-6 text-accent" />
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-1">{dept.name}</h3>
            <p className="text-sm text-muted-foreground mb-4">Head: {dept.head}</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1"><Users className="h-4 w-4" /> {dept.employees} employees</div>
            </div>
            <div className="pt-4 border-t border-border">
              <p className="text-xs font-medium text-muted-foreground mb-2">DESIGNATIONS</p>
              <div className="flex flex-wrap gap-2">
                {dept.designations.slice(0, 3).map((d) => (
                  <span key={d} className="badge bg-muted text-muted-foreground">{d}</span>
                ))}
                {dept.designations.length > 3 && (
                  <span className="badge bg-accent/10 text-accent">+{dept.designations.length - 3}</span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </DashboardLayout>
  );
}
