import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Onboarding from "./pages/Onboarding";
import ManualOnboard from "./pages/ManualOnboard";
import AutoOnboard from "./pages/AutoOnboard";
import Payroll from "./pages/Payroll";
import Loans from "./pages/Loans";
import TaxCalculator from "./pages/TaxCalculator";
import Departments from "./pages/Departments";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/employees/onboarding" element={<Onboarding />} />
          <Route path="/employees/onboard/manual" element={<ManualOnboard />} />
          <Route path="/employees/onboard/auto" element={<AutoOnboard />} />
          <Route path="/payroll" element={<Payroll />} />
          <Route path="/payroll/payslips" element={<Payroll />} />
          <Route path="/payroll/deductions" element={<Payroll />} />
          <Route path="/payroll/allowances" element={<Payroll />} />
          <Route path="/loans" element={<Loans />} />
          <Route path="/loans/issue" element={<Loans />} />
          <Route path="/loans/requests" element={<Loans />} />
          <Route path="/taxes" element={<TaxCalculator />} />
          <Route path="/taxes/calculator" element={<TaxCalculator />} />
          <Route path="/taxes/reports" element={<TaxCalculator />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/departments/designations" element={<Departments />} />
          <Route path="/attendance" element={<Dashboard />} />
          <Route path="/settings/*" element={<Settings />} />
          <Route path="/notifications" element={<Dashboard />} />
          <Route path="/help" element={<Dashboard />} />
          <Route path="/profile" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
