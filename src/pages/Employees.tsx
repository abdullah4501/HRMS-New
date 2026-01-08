import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Plus,
  Filter,
  Download,
  MoreHorizontal,
  Mail,
  Phone,
  MapPin,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  department: string;
  designation: string;
  status: "active" | "probation" | "notice" | "inactive";
  joinDate: string;
  salary: number;
}

const employees: Employee[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@company.com",
    phone: "+1 234 567 8900",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    department: "Engineering",
    designation: "Senior Developer",
    status: "active",
    joinDate: "2022-03-15",
    salary: 85000,
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.j@company.com",
    phone: "+1 234 567 8901",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    department: "Marketing",
    designation: "Marketing Manager",
    status: "active",
    joinDate: "2021-08-20",
    salary: 75000,
  },
  {
    id: "3",
    name: "Michael Chen",
    email: "m.chen@company.com",
    phone: "+1 234 567 8902",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    department: "Finance",
    designation: "Financial Analyst",
    status: "probation",
    joinDate: "2024-12-01",
    salary: 65000,
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.d@company.com",
    phone: "+1 234 567 8903",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    department: "HR",
    designation: "HR Specialist",
    status: "active",
    joinDate: "2023-01-10",
    salary: 55000,
  },
  {
    id: "5",
    name: "David Wilson",
    email: "d.wilson@company.com",
    phone: "+1 234 567 8904",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    department: "Engineering",
    designation: "DevOps Engineer",
    status: "notice",
    joinDate: "2020-06-15",
    salary: 90000,
  },
  {
    id: "6",
    name: "Lisa Anderson",
    email: "l.anderson@company.com",
    phone: "+1 234 567 8905",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
    department: "Sales",
    designation: "Sales Executive",
    status: "active",
    joinDate: "2023-04-20",
    salary: 60000,
  },
];

const statusConfig = {
  active: { label: "Active", className: "badge-success" },
  probation: { label: "Probation", className: "badge-warning" },
  notice: { label: "Notice Period", className: "badge-destructive" },
  inactive: { label: "Inactive", className: "bg-muted text-muted-foreground" },
};

export default function Employees() {
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = departmentFilter === "all" || emp.department === departmentFilter;
    const matchesStatus = statusFilter === "all" || emp.status === statusFilter;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  return (
    <DashboardLayout title="Employees" subtitle="Manage your team members">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search employees..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-3">
          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="Engineering">Engineering</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
              <SelectItem value="Finance">Finance</SelectItem>
              <SelectItem value="HR">HR</SelectItem>
              <SelectItem value="Sales">Sales</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="probation">Probation</SelectItem>
              <SelectItem value="notice">Notice Period</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
          <Link to="/employees/onboard/manual">
            <Button className="btn-primary gap-2">
              <Plus className="h-4 w-4" />
              Add Employee
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="stat-card">
          <p className="text-sm text-muted-foreground">Total</p>
          <p className="text-2xl font-bold text-foreground">{employees.length}</p>
        </div>
        <div className="stat-card">
          <p className="text-sm text-muted-foreground">Active</p>
          <p className="text-2xl font-bold text-success">
            {employees.filter((e) => e.status === "active").length}
          </p>
        </div>
        <div className="stat-card">
          <p className="text-sm text-muted-foreground">On Probation</p>
          <p className="text-2xl font-bold text-warning">
            {employees.filter((e) => e.status === "probation").length}
          </p>
        </div>
        <div className="stat-card">
          <p className="text-sm text-muted-foreground">Notice Period</p>
          <p className="text-2xl font-bold text-destructive">
            {employees.filter((e) => e.status === "notice").length}
          </p>
        </div>
      </div>

      {/* Employee Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="widget-card"
      >
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Status</th>
                <th>Join Date</th>
                <th>Salary</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} className="hover:bg-muted/30">
                  <td>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={employee.avatar} />
                        <AvatarFallback>{employee.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground">{employee.name}</p>
                        <p className="text-xs text-muted-foreground">{employee.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="text-muted-foreground">{employee.department}</td>
                  <td className="text-muted-foreground">{employee.designation}</td>
                  <td>
                    <span className={`badge ${statusConfig[employee.status].className}`}>
                      {statusConfig[employee.status].label}
                    </span>
                  </td>
                  <td className="text-muted-foreground">
                    {new Date(employee.joinDate).toLocaleDateString()}
                  </td>
                  <td className="font-medium">${employee.salary.toLocaleString()}</td>
                  <td className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="gap-2">
                          <Eye className="h-4 w-4" /> View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <Edit className="h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <Mail className="h-4 w-4" /> Send Email
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-destructive">
                          <Trash2 className="h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-border/50">
          <p className="text-sm text-muted-foreground">
            Showing {filteredEmployees.length} of {employees.length} employees
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" className="bg-accent text-accent-foreground">
              1
            </Button>
            <Button variant="outline" size="sm">
              2
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
