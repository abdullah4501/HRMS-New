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
  Bell,
  Pencil,
  Settings,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  MoreHorizontal,
  HelpCircle,
  FileText,
  Footprints,
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
interface EmployeeRecord {
  id: string;
  name: string;
  department: string;
  rate: string | null;
  regularHours: number | null;
  salaryAmount: number | null;
  overtimeHours: number | null;
  overtime: number | null;
}
const employeeRecords: EmployeeRecord[] = [
  {
    id: "1",
    name: "Chase, Nancy",
    department: "1 - Product",
    rate: "$85.0000 / hr",
    regularHours: 15.00,
    salaryAmount: null,
    overtimeHours: 2.00,
    overtime: null,
  },
  {
    id: "2",
    name: "Edelman, Jeffrey",
    department: "1 - Product",
    rate: null,
    regularHours: null,
    salaryAmount: 26000.00,
    overtimeHours: null,
    overtime: null,
  },
  {
    id: "3",
    name: "Krishna, Joel",
    department: "1 - Product",
    rate: null,
    regularHours: null,
    salaryAmount: 10000.00,
    overtimeHours: null,
    overtime: null,
  },
  {
    id: "4",
    name: "Smith, Carlos",
    department: "1 - Product",
    rate: "$25.0000 / hr",
    regularHours: null,
    salaryAmount: null,
    overtimeHours: null,
    overtime: null,
  },
  {
    id: "5",
    name: "Brannigan, Christine",
    department: "2 - UX",
    rate: null,
    regularHours: null,
    salaryAmount: 1346.16,
    overtimeHours: 10.00,
    overtime: null,
  },
  {
    id: "6",
    name: "Wells, Sabrina",
    department: "2 - UX",
    rate: "$121.0000 / hr",
    regularHours: null,
    salaryAmount: null,
    overtimeHours: null,
    overtime: null,
  },
];

const totals = {
  regularHours: 15.00,
  salaryAmount: 37346.16,
  overtimeHours: 12.00,
};

export default function Payroll() {
  const [viewFilter, setViewFilter] = useState("all");
  const [sortBy, setSortBy] = useState("last-name");
  const [rowsPerPage, setRowsPerPage] = useState("10");
  const [currentStep] = useState(1);

  const formatCurrency = (value: number | null) => {
    if (value === null) return "";
    return `$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatNumber = (value: number | null) => {
    if (value === null) return "";
    return value.toFixed(2);
  };
  return (
    <DashboardLayout isMainPage={false} title="Payroll Management" subtitle="Process salaries and generate payslips">
      <div className="pt-12">
        {/* Progress Stepper */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-0 w-full max-w-3xl">
            {/* Step 1 */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-foreground">1. Enter payroll</span>
              <div className="w-3.5 h-3.5 rounded-full bg-primary" />
            </div>

            {/* Line */}
            <div className="flex-1 h-px bg-border mx-4" />

            {/* Step 2 */}
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-full border-2 border-muted-foreground/40" />
              <span className="text-sm text-muted-foreground">2. Preview payroll</span>
            </div>

            {/* Line */}
            <div className="flex-1 h-px bg-border mx-4" />

            {/* Step 3 */}
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-full border-2 border-muted-foreground/40" />
              <span className="text-sm text-muted-foreground">3. Payroll summary</span>
            </div>
          </div>
        </div>

        {/* Alert Banner */}
        <div className="payroll-alert mb-6">
          <div className="flex items-center gap-3">
            <Bell className="h-5 w-5 text-primary" />
            <span className="text-sm text-foreground">
              You have outstanding new hires that aren't included in this payroll.
            </span>
          </div>
          <button className="payroll-link text-sm">
            See outstanding new hires
          </button>
        </div>

        {/* Pay Period Info Row */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-8">
            <h2 className="text-xl font-semibold text-foreground">Biweekly</h2>
            <div className="flex items-center gap-6 px-5 py-3 border border-border rounded-lg bg-background">
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Pay Period</p>
                <p className="text-sm font-medium text-foreground">
                  Jun 2, 2025 <span className="text-muted-foreground mx-1">→</span> Jun 13, 2025
                </p>
              </div>
              <div className="w-px h-10 bg-border" />
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Check date</p>
                <p className="text-sm font-medium text-foreground">May 23, 2025</p>
              </div>
              <button className="p-1.5 hover:bg-muted rounded-md transition-colors">
                <Pencil className="h-4 w-4 text-primary" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="gap-2 h-10 px-4 border-primary text-primary hover:bg-primary"
            >
              <Footprints size={15} />
              Guide Me
            </Button>
            <Button variant="outline" size="icon" className="h-10 w-10 hover:bg-primary">
              <FileText className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="gap-2 h-10 px-4 hover:bg-primary">
              <HelpCircle className="h-4 w-4" />
              Need Help
            </Button>
          </div>
        </div>

        {/* View & Sort Controls */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">View</span>
              <Select value={viewFilter} onValueChange={setViewFilter}>
                <SelectTrigger className="w-[140px] h-9 bg-muted/50 border-0">
                  <SelectValue placeholder="All employees" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All employees</SelectItem>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="salaried">Salaried</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort by</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[130px] h-9 bg-muted/50 border-0">
                  <SelectValue placeholder="Last name" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last-name">Last name</SelectItem>
                  <SelectItem value="first-name">First name</SelectItem>
                  <SelectItem value="department">Department</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <button className="p-2 hover:bg-muted rounded-md transition-colors">
            <Settings className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        {/* Data Table */}
        <div className="border border-border rounded-lg overflow-hidden bg-background mb-6">
          <table className="payroll-table">
            <thead>
              <tr className="bg-background">
                <th className="w-[200px] border-r">Name</th>
                <th className="w-[150px] border-r">Department</th>
                <th className="w-[140px] border-r text-right">Rate</th>
                <th className="w-[130px] border-r text-right">Regular Hours</th>
                <th className="w-[140px] border-r text-right">Salary Amount</th>
                <th className="w-[140px] border-r text-right">Overtime Hours</th>
                <th className="w-[100px] border-r text-right">Overtime</th>
              </tr>
            </thead>
            <tbody>
              {employeeRecords.map((record) => (
                <tr key={record.id}>
                  <td className="border-r">
                    <div className="flex items-center gap-2 justify-between">
                      <button className="payroll-link text-sm font-medium">
                        {record.name}
                      </button>
                      <button className="p-1 hover:bg-muted rounded transition-colors">
                        <MoreHorizontal size={25} className="text-muted-foreground text-secondary" />
                      </button>
                    </div>
                  </td>
                  <td className="border-r">
                    <div className="flex items-center gap-1">
                      <span className="text-sm text-foreground">{record.department}</span>
                      <ChevronDown className="h-3.5 w-3.5 text-primary" />
                    </div>
                  </td>
                  <td className="text-right text-sm text-foreground border-r">
                    {record.rate || ""}
                  </td>
                  <td className="text-right text-sm text-foreground border-r">
                    {formatNumber(record.regularHours)}
                  </td>
                  <td className="text-right text-sm text-foreground border-r">
                    {formatCurrency(record.salaryAmount)}
                  </td>
                  <td className="text-right text-sm text-foreground border-r">
                    {formatNumber(record.overtimeHours)}
                  </td>
                  <td className="text-right text-sm text-foreground border-r">
                    {record.overtime !== null ? formatCurrency(record.overtime) : ""}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td className="font-medium text-foreground !py-3">Totals</td>
                <td></td>
                <td className="border-r !py-3"></td>
                <td className="text-right font-medium text-foreground border-r !py-3">
                  {formatNumber(totals.regularHours)}
                </td>
                <td className="text-right font-medium text-foreground border-r !py-3">
                  {formatCurrency(totals.salaryAmount)}
                </td>
                <td className="text-right font-medium text-foreground border-r !py-3">
                  {formatNumber(totals.overtimeHours)}
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>

          {/* Pagination */}
          <div className="flex items-center justify-end gap-4 px-4 py-3 border-t border-border">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Show rows</span>
              <Select value={rowsPerPage} onValueChange={setRowsPerPage}>
                <SelectTrigger className="w-[70px] h-8 bg-muted/50 border-0">
                  <SelectValue placeholder="10" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-1">
              <button className="p-1.5 hover:bg-muted rounded transition-colors">
                <ChevronLeft className="h-4 w-4 text-muted-foreground" />
              </button>
              <span className="text-sm text-foreground px-3 py-1 bg-muted rounded">1</span>
              <span className="text-sm text-muted-foreground">of 1</span>
              <button className="p-1.5 hover:bg-muted rounded transition-colors">
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2 h-10 px-4 border-primary text-primary hover:bg-primary">
              Payroll overrides
              <ChevronDown className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="h-10 px-4 border-primary text-primary hover:bg-primary">
              Add employee
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" className="h-10 px-6 hover:bg-primary">
              Cancel
            </Button>
            <Button variant="outline" className="h-10 px-6 hover:bg-primary">
              Save
            </Button>
            <Button variant="outline" className="h-10 px-6 hover:bg-primary">
              Finish later
            </Button>
            <Button className="h-10 px-8 bg-primary hover:bg-primary/90 text-primary-foreground">
              Next
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
