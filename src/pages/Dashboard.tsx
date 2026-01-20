import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { NotificationsWidget } from "@/components/dashboard/NotificationsWidget";
import { BirthdaysWidget } from "@/components/dashboard/BirthdaysWidget";
import { PayrollWidget } from "@/components/dashboard/PayrollWidget";
import { ReportsWidget } from "@/components/dashboard/ReportsWidget";
import { QuickActionsWidget } from "@/components/dashboard/QuickActionsWidget";
import { PayrollActions } from "@/components/dashboard/PayrollActions";
import { Users, DollarSign, UserCheck, Clock, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import TopHeader from "@/components/TopHeader";

const payrollData = [
  { month: "Jul", amount: 145000 },
  { month: "Aug", amount: 152000 },
  { month: "Sep", amount: 148000 },
  { month: "Oct", amount: 165000 },
  { month: "Nov", amount: 178000 },
  { month: "Dec", amount: 185000 },
  { month: "Jan", amount: 192000 },
];

const attendanceData = [
  { day: "Mon", present: 45, absent: 3 },
  { day: "Tue", present: 47, absent: 1 },
  { day: "Wed", present: 44, absent: 4 },
  { day: "Thu", present: 46, absent: 2 },
  { day: "Fri", present: 43, absent: 5 },
];

const currentHour = new Date().getHours();
const greeting =
  currentHour < 12 ? "Good morning" : currentHour < 18 ? "Good afternoon" : "Good evening";

  const title = "Admin";
export default function Dashboard() {
  return (
    <DashboardLayout title={title} isMainPage={true}>
      
      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 -mt-24">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Payroll Actions */}
          <PayrollActions />

          {/* Payroll Trend Chart */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="widget-card"
          >
            <div className="widget-header">
              <div>
                <h3 className="widget-title">Payroll Trend</h3>
                <p className="text-sm text-muted-foreground mt-0.5">Last 7 months</p>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-success" />
                <span className="text-sm font-medium text-success">+12.5%</span>
              </div>
            </div>
            <div className="p-5">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={payrollData}>
                    <defs>
                      <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                      tickFormatter={(value) => `$${value / 1000}k`}
                    />
                    <Tooltip
                      contentStyle={{
                        background: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                      formatter={(value: number) => [`$${value.toLocaleString()}`, "Payroll"]}
                    />
                    <Area
                      type="monotone"
                      dataKey="amount"
                      stroke="hsl(var(--accent))"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorAmount)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div> */}

          {/* Attendance Chart */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="widget-card"
          >
            <div className="widget-header">
              <div>
                <h3 className="widget-title">Weekly Attendance</h3>
                <p className="text-sm text-muted-foreground mt-0.5">Current week overview</p>
              </div>
            </div>
            <div className="p-5">
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={attendanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                    <XAxis
                      dataKey="day"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    />
                    <Tooltip
                      contentStyle={{
                        background: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="present" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} name="Present" />
                    <Bar dataKey="absent" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} name="Absent" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-success"></div>
                  <span className="text-sm text-muted-foreground">Present</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive"></div>
                  <span className="text-sm text-muted-foreground">Absent</span>
                </div>
              </div>
            </div>
          </motion.div> */}

          {/* Quick Actions */}

        </div>
        <div className="col-span-1 space-y-6">
          <NotificationsWidget />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <div className="col-span-1 space-y-6">
          <QuickActionsWidget />
        </div>
        <div className="col-span-1 space-y-6">
          <PayrollWidget />
        </div>
        <div className="col-span-1 space-y-6">
          <ReportsWidget />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="col-span-1 space-y-6">
          <BirthdaysWidget />
        </div>
      </div>



      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        <StatCard
          title="Total Employees"
          value={248}
          change={12}
          changeLabel="vs last month"
          icon={Users}
          iconBg="bg-accent/10"
          iconColor="text-accent"
        />
        <StatCard
          title="Payroll This Month"
          value="$248,000"
          change={8}
          changeLabel="vs last month"
          icon={DollarSign}
          iconBg="bg-success/10"
          iconColor="text-success"
        />
        <StatCard
          title="New Hires"
          value={12}
          change={25}
          changeLabel="vs last month"
          icon={UserCheck}
          iconBg="bg-warning/10"
          iconColor="text-warning"
        />
        <StatCard
          title="Attendance Rate"
          value="94.5%"
          change={2.1}
          changeLabel="vs last week"
          icon={Clock}
          iconBg="bg-info/10"
          iconColor="text-info"
        />
      </div> */}
    </DashboardLayout>
  );
}
