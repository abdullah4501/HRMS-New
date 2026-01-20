import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function PayrollActions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 }}
      className="bg-white rounded-xl border border-border"
    >
      {/* Header */}
      <div className="px-6 pt-5 pb-4">
        <h3 className="text-[26px] font-bold text-foreground">
          Upcoming payroll
        </h3>
      </div>

      <div className="border-t border-border" />

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-[1fr_auto_280px] gap-6 px-6 py-6">
        {/* Left */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <h4 className="text-[22px] font-semibold text-foreground">
              Weekly
            </h4>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-sm text-muted-foreground">
              Due in 2 days
              <Calendar className="h-4 w-4" />
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-muted rounded-lg px-4 py-3">
              <p className="text-sm text-muted-foreground mb-1">
                Check date
              </p>
              <p className="text-lg font-bold text-gray-600">
                05/22/2025
              </p>
            </div>

            <div className="bg-muted rounded-lg px-4 py-3">
              <p className="text-sm text-muted-foreground mb-1">
                Pay period
              </p>
              <div className="text-lg font-bold text-gray-600 flex flex-wrap items-center gap-2">
                <span>05/20</span> <ArrowRight className="shrink-0"/> <span>05/26</span>
              </div>
            </div>
          </div>

          <Button  className="w-full mt-6 h-11 text-base font-semibold rounded-[10px] p-0">
            <Link to={'/payroll'} className="w-full h-full py-2 px-4">
              Run payroll
            </Link>
          </Button>
        </div>

        {/* Divider */}
        <div className="hidden lg:block w-px bg-border" />

        {/* Right */}
        <div>
          <h4 className="text-lg font-semibold text-foreground mb-4">
            Payroll actions
          </h4>

          <div className="space-y-5">
            <Button
              variant="outline"
              className="w-full h-11 text-base font-semibold text-secondary border-secondary hover:bg-secondary hover:text-white"
            >
              Off-cycle payroll
            </Button>

            <Button
              variant="outline"
              className="w-full h-11 text-base font-semibold text-secondary border-secondary hover:bg-secondary hover:text-white"
            >
              Calculate manual checks
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
