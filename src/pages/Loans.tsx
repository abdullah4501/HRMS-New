import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Search, DollarSign, Calendar, Check, X, Eye } from "lucide-react";
import { motion } from "framer-motion";

const loans = [
  { id: "1", name: "John Smith", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100", amount: 5000, remaining: 3500, installment: 500, status: "active", startDate: "2024-06-01" },
  { id: "2", name: "Sarah Johnson", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100", amount: 3000, remaining: 1500, installment: 300, status: "active", startDate: "2024-08-15" },
  { id: "3", name: "Michael Chen", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100", amount: 2000, remaining: 0, installment: 400, status: "completed", startDate: "2024-01-01" },
  { id: "4", name: "Emily Davis", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100", amount: 4000, remaining: 4000, installment: 0, status: "pending", startDate: "2025-01-10" },
];

export default function Loans() {
  return (
    <DashboardLayout title="Loan Management" subtitle="Manage employee loans and deductions">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-6">
        <div className="stat-card"><p className="text-sm text-muted-foreground">Total Disbursed</p><p className="text-2xl font-bold text-foreground">$14,000</p></div>
        <div className="stat-card"><p className="text-sm text-muted-foreground">Outstanding</p><p className="text-2xl font-bold text-warning">$9,000</p></div>
        <div className="stat-card"><p className="text-sm text-muted-foreground">Active Loans</p><p className="text-2xl font-bold text-accent">2</p></div>
        <div className="stat-card"><p className="text-sm text-muted-foreground">Pending Requests</p><p className="text-2xl font-bold text-info">1</p></div>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search loans..." className="pl-10" /></div>
        <Button className="btn-primary gap-2"><Plus className="h-4 w-4" /> Issue New Loan</Button>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="widget-card">
        <table className="data-table">
          <thead><tr><th>Employee</th><th className="text-right">Loan Amount</th><th className="text-right">Remaining</th><th className="text-right">Monthly EMI</th><th>Status</th><th className="text-right">Actions</th></tr></thead>
          <tbody>
            {loans.map((loan) => (
              <tr key={loan.id} className="hover:bg-muted/30">
                <td><div className="flex items-center gap-3"><Avatar><AvatarImage src={loan.avatar} /><AvatarFallback>{loan.name.substring(0,2)}</AvatarFallback></Avatar><span className="font-medium">{loan.name}</span></div></td>
                <td className="text-right font-medium">${loan.amount.toLocaleString()}</td>
                <td className="text-right text-warning">${loan.remaining.toLocaleString()}</td>
                <td className="text-right">${loan.installment}/mo</td>
                <td><span className={`badge ${loan.status === "active" ? "badge-success" : loan.status === "pending" ? "badge-warning" : "bg-muted text-muted-foreground"}`}>{loan.status}</span></td>
                <td className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button>
                    {loan.status === "pending" && <><Button variant="ghost" size="icon" className="text-success"><Check className="h-4 w-4" /></Button><Button variant="ghost" size="icon" className="text-destructive"><X className="h-4 w-4" /></Button></>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </DashboardLayout>
  );
}
