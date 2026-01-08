import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  UserPlus,
  FileText,
  Mail,
  Clock,
  CheckCircle,
  XCircle,
  ChevronRight,
  Search,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";

interface OnboardingRequest {
  id: string;
  name: string;
  email: string;
  avatar: string;
  department: string;
  designation: string;
  status: "pending" | "in_progress" | "completed" | "rejected";
  type: "manual" | "auto";
  requestDate: string;
  startDate: string;
}

const requests: OnboardingRequest[] = [
  {
    id: "1",
    name: "Alex Thompson",
    email: "alex.t@candidate.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    department: "Engineering",
    designation: "Frontend Developer",
    status: "pending",
    type: "auto",
    requestDate: "2025-01-05",
    startDate: "2025-01-20",
  },
  {
    id: "2",
    name: "Jennifer Lee",
    email: "jennifer.l@candidate.com",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    department: "Marketing",
    designation: "Content Strategist",
    status: "in_progress",
    type: "manual",
    requestDate: "2025-01-03",
    startDate: "2025-01-15",
  },
  {
    id: "3",
    name: "Robert Garcia",
    email: "robert.g@candidate.com",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    department: "Sales",
    designation: "Account Executive",
    status: "completed",
    type: "auto",
    requestDate: "2025-01-01",
    startDate: "2025-01-10",
  },
  {
    id: "4",
    name: "Amanda White",
    email: "amanda.w@candidate.com",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
    department: "HR",
    designation: "Recruiter",
    status: "rejected",
    type: "manual",
    requestDate: "2024-12-28",
    startDate: "2025-01-08",
  },
];

const statusConfig = {
  pending: { label: "Pending Review", className: "badge-warning", icon: Clock },
  in_progress: { label: "In Progress", className: "badge-info", icon: FileText },
  completed: { label: "Completed", className: "badge-success", icon: CheckCircle },
  rejected: { label: "Rejected", className: "badge-destructive", icon: XCircle },
};

export default function Onboarding() {
  return (
    <DashboardLayout title="Employee Onboarding" subtitle="Manage new employee onboarding requests">
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="widget-card p-6"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-xl bg-accent/10">
              <FileText className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Manual Onboarding</h3>
              <p className="text-sm text-muted-foreground">
                Fill in employee details manually to onboard
              </p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Complete the onboarding form with all employee information including personal details,
            department, designation, and salary information.
          </p>
          <Link to="/employees/onboard/manual">
            <Button className="btn-primary w-full gap-2">
              <UserPlus className="h-4 w-4" />
              Start Manual Onboarding
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="widget-card p-6"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-xl bg-success/10">
              <Mail className="h-6 w-6 text-success" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Auto Onboarding</h3>
              <p className="text-sm text-muted-foreground">
                Send invitation for self-registration
              </p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Enter basic details and send an email invitation. The employee will complete their
            own profile with personal and professional information.
          </p>
          <Link to="/employees/onboard/auto">
            <Button variant="outline" className="w-full gap-2">
              <Mail className="h-4 w-4" />
              Send Onboarding Invitation
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="stat-card">
          <p className="text-sm text-muted-foreground">Pending</p>
          <p className="text-2xl font-bold text-warning">
            {requests.filter((r) => r.status === "pending").length}
          </p>
        </div>
        <div className="stat-card">
          <p className="text-sm text-muted-foreground">In Progress</p>
          <p className="text-2xl font-bold text-info">
            {requests.filter((r) => r.status === "in_progress").length}
          </p>
        </div>
        <div className="stat-card">
          <p className="text-sm text-muted-foreground">Completed</p>
          <p className="text-2xl font-bold text-success">
            {requests.filter((r) => r.status === "completed").length}
          </p>
        </div>
        <div className="stat-card">
          <p className="text-sm text-muted-foreground">Rejected</p>
          <p className="text-2xl font-bold text-destructive">
            {requests.filter((r) => r.status === "rejected").length}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search onboarding requests..." className="pl-10" />
        </div>
      </div>

      {/* Requests List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="widget-card"
      >
        <div className="widget-header">
          <h3 className="widget-title">Recent Onboarding Requests</h3>
        </div>
        <div className="divide-y divide-border/50">
          {requests.map((request) => {
            const StatusIcon = statusConfig[request.status].icon;
            return (
              <div
                key={request.id}
                className="p-5 hover:bg-muted/30 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={request.avatar} />
                    <AvatarFallback>{request.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-foreground">{request.name}</h4>
                      <span
                        className={`badge ${statusConfig[request.status].className} flex items-center gap-1`}
                      >
                        <StatusIcon className="h-3 w-3" />
                        {statusConfig[request.status].label}
                      </span>
                      <span className="badge bg-muted text-muted-foreground capitalize">
                        {request.type}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{request.email}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span>{request.department}</span>
                      <span>•</span>
                      <span>{request.designation}</span>
                      <span>•</span>
                      <span>Start: {new Date(request.startDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {request.status === "pending" && (
                      <>
                        <Button size="sm" variant="outline" className="text-destructive">
                          Reject
                        </Button>
                        <Button size="sm" className="btn-primary">
                          Approve
                        </Button>
                      </>
                    )}
                    {request.status === "in_progress" && (
                      <Button size="sm" className="btn-primary">
                        Continue
                      </Button>
                    )}
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
