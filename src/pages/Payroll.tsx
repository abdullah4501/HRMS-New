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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Search,
  Download,
  Mail,
  FileText,
  DollarSign,
  Calculator,
  Play,
  Filter,
  Eye,
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "@/hooks/use-toast";

interface SalaryRecord {
  id: string;
  employeeId: string;
  name: string;
  avatar: string;
  department: string;
  basicSalary: number;
  allowances: {
    housing: number;
    transport: number;
    medical: number;
    other: number;
  };
  deductions: {
    tax: number;
    insurance: number;
    providentFund: number;
    loan: number;
    other: number;
  };
  netSalary: number;
  status: "pending" | "processed" | "paid";
}

const salaryRecords: SalaryRecord[] = [
  {
    id: "1",
    employeeId: "EMP-001",
    name: "John Smith",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    department: "Engineering",
    basicSalary: 5000,
    allowances: { housing: 1000, transport: 300, medical: 200, other: 150 },
    deductions: { tax: 650, insurance: 200, providentFund: 500, loan: 300, other: 50 },
    netSalary: 4950,
    status: "pending",
  },
  {
    id: "2",
    employeeId: "EMP-002",
    name: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    department: "Marketing",
    basicSalary: 4500,
    allowances: { housing: 900, transport: 250, medical: 200, other: 100 },
    deductions: { tax: 520, insurance: 200, providentFund: 450, loan: 0, other: 50 },
    netSalary: 4730,
    status: "processed",
  },
  {
    id: "3",
    employeeId: "EMP-003",
    name: "Michael Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    department: "Finance",
    basicSalary: 4200,
    allowances: { housing: 800, transport: 200, medical: 200, other: 100 },
    deductions: { tax: 440, insurance: 200, providentFund: 420, loan: 500, other: 50 },
    netSalary: 3890,
    status: "paid",
  },
  {
    id: "4",
    employeeId: "EMP-004",
    name: "Emily Davis",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    department: "HR",
    basicSalary: 3800,
    allowances: { housing: 700, transport: 200, medical: 200, other: 100 },
    deductions: { tax: 380, insurance: 200, providentFund: 380, loan: 0, other: 50 },
    netSalary: 3990,
    status: "pending",
  },
  {
    id: "5",
    employeeId: "EMP-005",
    name: "David Wilson",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    department: "Engineering",
    basicSalary: 5500,
    allowances: { housing: 1100, transport: 350, medical: 200, other: 200 },
    deductions: { tax: 750, insurance: 200, providentFund: 550, loan: 1000, other: 50 },
    netSalary: 4800,
    status: "pending",
  },
];

const statusConfig = {
  pending: { label: "Pending", className: "badge-warning" },
  processed: { label: "Processed", className: "badge-info" },
  paid: { label: "Paid", className: "badge-success" },
};

export default function Payroll() {
  const [selectedRecords, setSelectedRecords] = useState<string[]>([]);
  const [payPeriod, setPayPeriod] = useState("jan-2025");

  const totalGrossSalary = salaryRecords.reduce(
    (sum, record) =>
      sum + record.basicSalary + Object.values(record.allowances).reduce((a, b) => a + b, 0),
    0
  );
  const totalDeductions = salaryRecords.reduce(
    (sum, record) => sum + Object.values(record.deductions).reduce((a, b) => a + b, 0),
    0
  );
  const totalNetSalary = salaryRecords.reduce((sum, record) => sum + record.netSalary, 0);

  const toggleSelectAll = () => {
    if (selectedRecords.length === salaryRecords.length) {
      setSelectedRecords([]);
    } else {
      setSelectedRecords(salaryRecords.map((r) => r.id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedRecords((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const generatePayslips = () => {
    toast({
      title: "Generating Payslips",
      description: `Generating payslips for ${selectedRecords.length} employees...`,
    });
  };

  const sendPayslips = () => {
    toast({
      title: "Sending Payslips",
      description: `Sending payslips via email to ${selectedRecords.length} employees...`,
    });
  };

  return (
    <DashboardLayout title="Payroll Management" subtitle="Process salaries and generate payslips">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-6">
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Gross Salary</p>
              <p className="text-2xl font-bold text-foreground">
                ${totalGrossSalary.toLocaleString()}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-accent/10">
              <DollarSign className="h-5 w-5 text-accent" />
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Deductions</p>
              <p className="text-2xl font-bold text-destructive">
                -${totalDeductions.toLocaleString()}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-destructive/10">
              <Calculator className="h-5 w-5 text-destructive" />
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Net Payable</p>
              <p className="text-2xl font-bold text-success">${totalNetSalary.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-xl bg-success/10">
              <DollarSign className="h-5 w-5 text-success" />
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="text-2xl font-bold text-warning">
                {salaryRecords.filter((r) => r.status === "pending").length}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-warning/10">
              <FileText className="h-5 w-5 text-warning" />
            </div>
          </div>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search employees..." className="pl-10" />
        </div>
        <div className="flex items-center gap-3">
          <Select value={payPeriod} onValueChange={setPayPeriod}>
            <SelectTrigger className="w-44">
              <SelectValue placeholder="Pay Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="jan-2025">January 2025</SelectItem>
              <SelectItem value="dec-2024">December 2024</SelectItem>
              <SelectItem value="nov-2024">November 2024</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          <Button className="btn-primary gap-2">
            <Play className="h-4 w-4" />
            Run Payroll
          </Button>
        </div>
      </div>

      {/* Selected Actions */}
      {selectedRecords.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-4 p-4 bg-accent/5 border border-accent/20 rounded-lg"
        >
          <span className="text-sm font-medium">
            {selectedRecords.length} employee(s) selected
          </span>
          <div className="flex items-center gap-2 ml-auto">
            <Button variant="outline" size="sm" className="gap-2" onClick={generatePayslips}>
              <Download className="h-4 w-4" />
              Generate PDF
            </Button>
            <Button size="sm" className="btn-primary gap-2" onClick={sendPayslips}>
              <Mail className="h-4 w-4" />
              Send via Email
            </Button>
          </div>
        </motion.div>
      )}

      {/* Salary Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="widget-card overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th className="w-12">
                  <Checkbox
                    checked={selectedRecords.length === salaryRecords.length}
                    onCheckedChange={toggleSelectAll}
                  />
                </th>
                <th>Employee</th>
                <th className="text-right">Basic</th>
                <th className="text-right">Allowances</th>
                <th className="text-right">Deductions</th>
                <th className="text-right">Net Salary</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {salaryRecords.map((record) => {
                const totalAllowances = Object.values(record.allowances).reduce((a, b) => a + b, 0);
                const totalDeductions = Object.values(record.deductions).reduce((a, b) => a + b, 0);

                return (
                  <tr key={record.id} className="hover:bg-muted/30">
                    <td>
                      <Checkbox
                        checked={selectedRecords.includes(record.id)}
                        onCheckedChange={() => toggleSelect(record.id)}
                      />
                    </td>
                    <td>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={record.avatar} />
                          <AvatarFallback>{record.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-foreground">{record.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {record.employeeId} • {record.department}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="text-right font-medium">
                      ${record.basicSalary.toLocaleString()}
                    </td>
                    <td className="text-right text-success">
                      +${totalAllowances.toLocaleString()}
                    </td>
                    <td className="text-right text-destructive">
                      -${totalDeductions.toLocaleString()}
                    </td>
                    <td className="text-right font-semibold text-foreground">
                      ${record.netSalary.toLocaleString()}
                    </td>
                    <td>
                      <span className={`badge ${statusConfig[record.status].className}`}>
                        {statusConfig[record.status].label}
                      </span>
                    </td>
                    <td className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" title="View Details">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Download Payslip">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Send Email">
                          <Mail className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="bg-muted/50 font-semibold">
                <td colSpan={2} className="px-4 py-3">
                  Total ({salaryRecords.length} employees)
                </td>
                <td className="text-right px-4 py-3">
                  ${salaryRecords.reduce((s, r) => s + r.basicSalary, 0).toLocaleString()}
                </td>
                <td className="text-right text-success px-4 py-3">
                  +$
                  {salaryRecords
                    .reduce((s, r) => s + Object.values(r.allowances).reduce((a, b) => a + b, 0), 0)
                    .toLocaleString()}
                </td>
                <td className="text-right text-destructive px-4 py-3">
                  -$
                  {salaryRecords
                    .reduce((s, r) => s + Object.values(r.deductions).reduce((a, b) => a + b, 0), 0)
                    .toLocaleString()}
                </td>
                <td className="text-right px-4 py-3">${totalNetSalary.toLocaleString()}</td>
                <td colSpan={2}></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
