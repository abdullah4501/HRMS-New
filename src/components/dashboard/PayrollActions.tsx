import { motion } from "framer-motion";
import { Calendar, Play, Calculator, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function PayrollActions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 }}
      className="widget-card h-full"
    >
      <div className="widget-header flex items-center justify-between">
        <div>
          <h3 className="widget-title">Upcoming Payroll</h3>
          <p className="text-lg font-bold text-foreground mt-1">Weekly Payroll</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg hover:bg-muted transition-colors">
            <Edit className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      <div className="p-5">
        {/* Date Selection */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-muted/30 rounded-lg p-4">
            <p className="text-xs text-muted-foreground mb-2">Check date</p>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-accent" />
              <span className="text-sm font-semibold text-foreground">01/22/2025</span>
            </div>
          </div>
          <div className="bg-muted/30 rounded-lg p-4">
            <p className="text-xs text-muted-foreground mb-2">Pay period</p>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-foreground">01/15 → 01/22</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Link to="/payroll">
            <Button className="w-full btn-primary flex items-center justify-center gap-2 h-11">
              <Play className="h-4 w-4" />
              Run payroll
            </Button>
          </Link>
          <Link to="/payroll/calculate">
            <Button variant="outline" className="w-full h-11 flex items-center justify-center gap-2">
              <Calculator className="h-4 w-4" />
              Calculate manual checks
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
