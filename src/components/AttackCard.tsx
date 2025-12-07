import { AlertTriangle, Shield, Terminal } from "lucide-react";
import { motion } from "framer-motion";

interface AttackCardProps {
  title: string;
  severity: "high" | "medium" | "critical";
  description: string;
  steps: string[];
  payload?: string;
  mitigation: string;
  index: number;
}

const severityColors = {
  critical: "border-destructive/50 bg-destructive/5",
  high: "border-warning/50 bg-warning/5",
  medium: "border-primary/50 bg-primary/5",
};

const severityBadge = {
  critical: "bg-destructive/20 text-destructive border-destructive/50",
  high: "bg-warning/20 text-warning border-warning/50",
  medium: "bg-primary/20 text-primary border-primary/50",
};

export const AttackCard = ({
  title,
  severity,
  description,
  steps,
  payload,
  mitigation,
  index,
}: AttackCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`glass-card rounded-xl p-6 ${severityColors[severity]} border`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-card border border-border">
            <AlertTriangle className="w-5 h-5 text-warning" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-foreground">{title}</h3>
            <span className={`inline-block mt-1 px-2 py-0.5 text-xs font-mono rounded border ${severityBadge[severity]}`}>
              {severity.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      <p className="text-muted-foreground mb-4">{description}</p>

      <div className="space-y-4">
        <div>
          <h4 className="flex items-center gap-2 text-sm font-semibold text-primary mb-2">
            <Terminal className="w-4 h-4" />
            Attack Steps
          </h4>
          <ol className="space-y-2">
            {steps.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                <span className="font-mono text-primary/70">{String(i + 1).padStart(2, "0")}.</span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        {payload && (
          <div>
            <h4 className="text-sm font-semibold text-destructive mb-2">Example Payload</h4>
            <code className="block p-3 bg-destructive/10 rounded-lg text-sm font-mono text-destructive border border-destructive/30 break-all">
              {payload}
            </code>
          </div>
        )}

        <div>
          <h4 className="flex items-center gap-2 text-sm font-semibold text-accent mb-2">
            <Shield className="w-4 h-4" />
            Mitigation
          </h4>
          <p className="text-sm text-muted-foreground bg-accent/10 p-3 rounded-lg border border-accent/30">
            {mitigation}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
