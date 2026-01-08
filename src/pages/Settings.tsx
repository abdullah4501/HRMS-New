import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, Calendar, Clock, Mail, Users, Shield, Globe, FileText, Save } from "lucide-react";
import { motion } from "framer-motion";

export default function Settings() {
  return (
    <DashboardLayout title="Settings" subtitle="Configure your HRMS preferences">
      <Tabs defaultValue="company" className="space-y-6">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="company" className="gap-2"><Building2 className="h-4 w-4" /> Company</TabsTrigger>
          <TabsTrigger value="payroll" className="gap-2"><Calendar className="h-4 w-4" /> Payroll</TabsTrigger>
          <TabsTrigger value="shifts" className="gap-2"><Clock className="h-4 w-4" /> Shifts</TabsTrigger>
          <TabsTrigger value="email" className="gap-2"><Mail className="h-4 w-4" /> Email</TabsTrigger>
          <TabsTrigger value="users" className="gap-2"><Users className="h-4 w-4" /> Users</TabsTrigger>
        </TabsList>

        <TabsContent value="company">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="widget-card p-6">
            <h3 className="text-lg font-semibold mb-6">Company Profile</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2"><Label>Company Name</Label><Input placeholder="Your Company Inc." defaultValue="HRMS Pro Corporation" /></div>
              <div className="space-y-2"><Label>Industry</Label><Input placeholder="Technology" defaultValue="Software & Technology" /></div>
              <div className="space-y-2"><Label>Email</Label><Input placeholder="contact@company.com" defaultValue="hr@hrmspro.com" /></div>
              <div className="space-y-2"><Label>Phone</Label><Input placeholder="+1 234 567 8900" defaultValue="+1 555 123 4567" /></div>
              <div className="col-span-2 space-y-2"><Label>Address</Label><Textarea placeholder="Full company address" defaultValue="123 Business Park, Suite 456, San Francisco, CA 94102" /></div>
              <div className="space-y-2"><Label>Probation Period (Days)</Label><Input type="number" defaultValue="90" /></div>
              <div className="space-y-2"><Label>Notice Period (Days)</Label><Input type="number" defaultValue="30" /></div>
            </div>
            <Button className="btn-primary gap-2 mt-6"><Save className="h-4 w-4" /> Save Changes</Button>
          </motion.div>
        </TabsContent>

        <TabsContent value="payroll">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="widget-card p-6">
            <h3 className="text-lg font-semibold mb-6">Payroll Configuration</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2"><Label>Pay Frequency</Label>
                <Select defaultValue="monthly"><SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="weekly">Weekly</SelectItem><SelectItem value="bimonthly">Bi-Monthly</SelectItem><SelectItem value="monthly">Monthly</SelectItem></SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label>Payroll Start Day</Label><Input type="number" defaultValue="1" min="1" max="28" /></div>
              <div className="space-y-2"><Label>Payroll End Day</Label><Input type="number" defaultValue="30" min="1" max="31" /></div>
              <div className="space-y-2"><Label>Currency</Label><Select defaultValue="usd"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="usd">USD ($)</SelectItem><SelectItem value="eur">EUR (€)</SelectItem><SelectItem value="gbp">GBP (£)</SelectItem></SelectContent></Select></div>
            </div>
            <div className="mt-6 space-y-4">
              <h4 className="font-medium">Non-Working Days</h4>
              <div className="flex flex-wrap gap-3">
                {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => (
                  <label key={day} className="flex items-center gap-2 p-3 rounded-lg border border-border cursor-pointer hover:bg-muted/50">
                    <Switch defaultChecked={day === "Saturday" || day === "Sunday"} /><span className="text-sm">{day}</span>
                  </label>
                ))}
              </div>
            </div>
            <Button className="btn-primary gap-2 mt-6"><Save className="h-4 w-4" /> Save Changes</Button>
          </motion.div>
        </TabsContent>

        <TabsContent value="shifts">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="widget-card p-6">
            <h3 className="text-lg font-semibold mb-6">Work Shifts</h3>
            <div className="space-y-4">
              {[{ name: "Day Shift", start: "09:00", end: "18:00" }, { name: "Evening Shift", start: "14:00", end: "23:00" }, { name: "Night Shift", start: "22:00", end: "07:00" }].map((shift) => (
                <div key={shift.name} className="flex items-center gap-4 p-4 rounded-lg border border-border">
                  <div className="flex-1"><Input defaultValue={shift.name} className="font-medium" /></div>
                  <div className="flex items-center gap-2"><Label className="text-sm">Start</Label><Input type="time" defaultValue={shift.start} className="w-32" /></div>
                  <div className="flex items-center gap-2"><Label className="text-sm">End</Label><Input type="time" defaultValue={shift.end} className="w-32" /></div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="mt-4 gap-2">+ Add New Shift</Button>
          </motion.div>
        </TabsContent>

        <TabsContent value="email">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="widget-card p-6">
            <h3 className="text-lg font-semibold mb-6">Email Settings</h3>
            <div className="space-y-6">
              <div className="space-y-2"><Label>Email Signature</Label><Textarea rows={5} defaultValue="Best regards,\nHR Team\nHRMS Pro Corporation\nPhone: +1 555 123 4567\nEmail: hr@hrmspro.com" /></div>
              <div className="p-4 bg-muted/30 rounded-lg">
                <h4 className="font-medium mb-4">Email Templates</h4>
                <div className="space-y-2">
                  {["Welcome Email", "Payslip Notification", "Leave Approval", "Loan Approval", "Resignation Acknowledgment"].map((template) => (
                    <div key={template} className="flex items-center justify-between p-3 rounded border border-border hover:bg-muted/50 cursor-pointer">
                      <span className="text-sm font-medium">{template}</span><Button variant="ghost" size="sm">Edit</Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <Button className="btn-primary gap-2 mt-6"><Save className="h-4 w-4" /> Save Changes</Button>
          </motion.div>
        </TabsContent>

        <TabsContent value="users">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="widget-card p-6">
            <h3 className="text-lg font-semibold mb-6">User Management & Hierarchy</h3>
            <p className="text-muted-foreground mb-4">Manage admin users and team hierarchy settings</p>
            <Button className="btn-primary gap-2">+ Add Admin User</Button>
          </motion.div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
