import { motion } from "framer-motion";
import { FileText, Truck, MoreHorizontal } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Net Salary", value: 185000, color: "hsl(var(--accent))" },
  { name: "Deductions", value: 35000, color: "hsl(var(--muted))" },
  { name: "Taxes", value: 28000, color: "hsl(var(--warning))" },
];

export function PayrollWidget() {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="widget-card"
    >
      <div className="widget-header">
        <h3 className="widget-title">Last payroll</h3>
        <button className="p-1.5 rounded-lg hover:bg-muted transition-colors">
          <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>

      <div className="p-5">
        {/* Period Info */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-muted/30 rounded-lg p-3">
            <p className="text-xs text-muted-foreground mb-1">Check date</p>
            <p className="text-sm font-semibold text-foreground">01/15/2025</p>
          </div>
          <div className="bg-muted/30 rounded-lg p-3">
            <p className="text-xs text-muted-foreground mb-1">Pay period</p>
            <p className="text-sm font-semibold text-foreground">01/01 → 01/15</p>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="relative h-48 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                innerRadius={55}
                outerRadius={75}
                paddingAngle={3}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-2xl font-bold text-foreground">
              ${total.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">Total payroll</p>
          </div>
        </div>

        {/* Legend */}
        <div className="space-y-2 mb-6">
          {data.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-muted-foreground">{item.name}</span>
              </div>
              <span className="text-sm font-medium text-foreground">
                ${item.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-center gap-6 pt-4 border-t border-border/50">
          <button className="flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors">
            <FileText className="h-4 w-4" />
            Report package
          </button>
          <button className="flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors">
            <Truck className="h-4 w-4" />
            Track delivery
          </button>
        </div>
      </div>

      <div className="px-5 py-3 border-t border-border/50 text-center">
        <button className="text-sm font-medium text-accent hover:text-accent/80 transition-colors">
          Payroll details
        </button>
      </div>
    </motion.div>
  );
}
