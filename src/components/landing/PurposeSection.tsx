import { motion } from "framer-motion";
import { Target, Cpu, Users, Shield, Clock, BarChart3 } from "lucide-react";

const purposes = [
  {
    icon: Cpu,
    title: "GPU-Heavy AI Workloads",
    description: "Handles resource-intensive AI processing seamlessly",
  },
  {
    icon: Target,
    title: "One-Job-at-a-Time Execution",
    description: "Ensures optimal resource utilization and quality output",
  },
  {
    icon: Users,
    title: "Multi-User Scheduling",
    description: "Efficient queue management for enterprise teams",
  },
  {
    icon: Shield,
    title: "Quota Management",
    description: "Fair usage policies and resource allocation",
  },
  {
    icon: BarChart3,
    title: "Administrative Monitoring",
    description: "Complete visibility into job status and performance",
  },
  {
    icon: Clock,
    title: "Long-Running Task Orchestration",
    description: "Reliable execution of complex video generation tasks",
  },
];

const PurposeSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4">
            <Target className="w-4 h-4" />
            Purpose
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            Built for Enterprise Performance
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our platform is designed to handle the most demanding AI workloads with precision and reliability.
          </p>
        </motion.div>

        {/* KPI cards removed as requested */}
      </div>
    </section>
  );
};

export default PurposeSection;
