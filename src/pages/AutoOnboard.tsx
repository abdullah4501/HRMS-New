import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { Mail, Send, CheckCircle, Plus, Trash2, Copy } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Invitation {
  id: string;
  email: string;
  department: string;
  designation: string;
  status: "pending" | "sent" | "completed";
}

const initialInvitations: Invitation[] = [];

export default function AutoOnboard() {
  const [invitations, setInvitations] = useState<Invitation[]>(initialInvitations);
  const [newInvite, setNewInvite] = useState({
    email: "",
    department: "",
    designation: "",
  });

  const addInvitation = () => {
    if (!newInvite.email || !newInvite.department || !newInvite.designation) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const invitation: Invitation = {
      id: Date.now().toString(),
      ...newInvite,
      status: "pending",
    };

    setInvitations([...invitations, invitation]);
    setNewInvite({ email: "", department: "", designation: "" });
    toast({
      title: "Invitation Added",
      description: `Invitation for ${newInvite.email} has been added to the queue`,
    });
  };

  const removeInvitation = (id: string) => {
    setInvitations(invitations.filter((inv) => inv.id !== id));
  };

  const sendInvitations = () => {
    setInvitations(
      invitations.map((inv) => ({
        ...inv,
        status: "sent" as const,
      }))
    );
    toast({
      title: "Invitations Sent!",
      description: `${invitations.length} invitation(s) have been sent successfully`,
    });
  };

  const copyLink = () => {
    navigator.clipboard.writeText("https://hrms.company.com/onboard/register");
    toast({
      title: "Link Copied!",
      description: "Onboarding registration link copied to clipboard",
    });
  };

  return (
    <DashboardLayout title="Auto Onboarding" subtitle="Send self-registration invitations to new employees">
      <div className="max-w-4xl mx-auto">
        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="widget-card p-6 mb-6"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-info/10">
              <Mail className="h-6 w-6 text-info" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                How Auto Onboarding Works
              </h3>
              <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
                <li>Enter basic details for new employees (email, department, designation)</li>
                <li>Send invitation emails with secure registration links</li>
                <li>Employees complete their profiles with personal information</li>
                <li>Review and approve completed registrations</li>
              </ol>
            </div>
          </div>
        </motion.div>

        {/* Quick Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="widget-card p-4 mb-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-foreground">Public Registration Link</h4>
              <p className="text-sm text-muted-foreground">
                Share this link for open applications
              </p>
            </div>
            <div className="flex items-center gap-2">
              <code className="px-3 py-2 bg-muted rounded text-sm">
                hrms.company.com/onboard/register
              </code>
              <Button variant="outline" size="icon" onClick={copyLink}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Add New Invitation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="widget-card p-6 mb-6"
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">Add New Invitation</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="employee@email.com"
                value={newInvite.email}
                onChange={(e) => setNewInvite({ ...newInvite, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department *</Label>
              <Select
                value={newInvite.department}
                onValueChange={(value) => setNewInvite({ ...newInvite, department: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="HR">Human Resources</SelectItem>
                  <SelectItem value="Sales">Sales</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="designation">Designation *</Label>
              <Select
                value={newInvite.designation}
                onValueChange={(value) => setNewInvite({ ...newInvite, designation: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Developer">Developer</SelectItem>
                  <SelectItem value="Manager">Manager</SelectItem>
                  <SelectItem value="Analyst">Analyst</SelectItem>
                  <SelectItem value="Executive">Executive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button className="btn-primary w-full gap-2" onClick={addInvitation}>
                <Plus className="h-4 w-4" />
                Add
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Pending Invitations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="widget-card"
        >
          <div className="widget-header">
            <h3 className="widget-title">
              Pending Invitations ({invitations.length})
            </h3>
            {invitations.length > 0 && (
              <Button className="btn-primary gap-2" onClick={sendInvitations}>
                <Send className="h-4 w-4" />
                Send All
              </Button>
            )}
          </div>

          {invitations.length === 0 ? (
            <div className="p-12 text-center">
              <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h4 className="text-lg font-medium text-foreground mb-2">No Pending Invitations</h4>
              <p className="text-sm text-muted-foreground">
                Add employee details above to create invitation queue
              </p>
            </div>
          ) : (
            <div className="divide-y divide-border/50">
              {invitations.map((invitation) => (
                <div key={invitation.id} className="px-5 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{invitation.email}</p>
                      <p className="text-sm text-muted-foreground">
                        {invitation.department} • {invitation.designation}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {invitation.status === "sent" ? (
                      <span className="badge badge-success flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" />
                        Sent
                      </span>
                    ) : (
                      <>
                        <span className="badge badge-warning">Pending</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive"
                          onClick={() => removeInvitation(invitation.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
