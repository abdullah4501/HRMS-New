import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, DollarSign, Percent } from "lucide-react";
import { motion } from "framer-motion";

export default function TaxCalculator() {
  const [income, setIncome] = useState(60000);
  const [filingStatus, setFilingStatus] = useState("single");
  
  const taxBrackets = { single: [{ limit: 11000, rate: 0.10 }, { limit: 44725, rate: 0.12 }, { limit: 95375, rate: 0.22 }, { limit: 182100, rate: 0.24 }] };
  
  const calculateTax = () => {
    let tax = 0, remaining = income, prev = 0;
    for (const bracket of taxBrackets.single) {
      const taxable = Math.min(remaining, bracket.limit - prev);
      if (taxable <= 0) break;
      tax += taxable * bracket.rate;
      remaining -= taxable;
      prev = bracket.limit;
    }
    if (remaining > 0) tax += remaining * 0.32;
    return tax;
  };

  const estimatedTax = calculateTax();
  const effectiveRate = ((estimatedTax / income) * 100).toFixed(2);
  const takeHome = income - estimatedTax;

  return (
    <DashboardLayout title="Tax Calculator" subtitle="Calculate estimated tax obligations">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="widget-card p-6">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2"><Calculator className="h-5 w-5 text-accent" /> Tax Input</h3>
            <div className="space-y-4">
              <div className="space-y-2"><Label>Annual Gross Income ($)</Label><Input type="number" value={income} onChange={(e) => setIncome(Number(e.target.value))} /></div>
              <div className="space-y-2"><Label>Filing Status</Label><Select value={filingStatus} onValueChange={setFilingStatus}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="single">Single</SelectItem><SelectItem value="married">Married Filing Jointly</SelectItem><SelectItem value="head">Head of Household</SelectItem></SelectContent></Select></div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="widget-card p-6">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2"><DollarSign className="h-5 w-5 text-success" /> Tax Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-muted/30 rounded-lg"><span className="text-muted-foreground">Gross Income</span><span className="text-xl font-bold">${income.toLocaleString()}</span></div>
              <div className="flex justify-between items-center p-4 bg-destructive/10 rounded-lg"><span className="text-muted-foreground">Estimated Tax</span><span className="text-xl font-bold text-destructive">-${estimatedTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></div>
              <div className="flex justify-between items-center p-4 bg-success/10 rounded-lg"><span className="text-muted-foreground">Take Home</span><span className="text-xl font-bold text-success">${takeHome.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></div>
              <div className="flex justify-between items-center p-4 border border-border rounded-lg"><span className="text-muted-foreground flex items-center gap-1"><Percent className="h-4 w-4" /> Effective Rate</span><span className="text-lg font-semibold">{effectiveRate}%</span></div>
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
