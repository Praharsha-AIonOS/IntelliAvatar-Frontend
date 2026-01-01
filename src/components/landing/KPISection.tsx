import { motion } from "framer-motion";
import { Zap, Cpu, Globe, Lock, Activity } from "lucide-react";

const kpis = [
  {
    icon: Zap,
    title: "High Lip-Sync Accuracy",
    description: "Industry-leading synchronization precision",
  },
  {
    icon: Cpu,
    title: "GPU-Optimized Execution",
    description: "Maximum performance with minimal latency",
  },
  {
    icon: Globe,
    title: "Multi-Language Support",
    description: "Generate content in multiple languages",
  },
  {
    icon: Lock,
    title: "Secure Job Queue",
    description: "Enterprise-grade security and privacy",
  },
];

const KPISection = () => {
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
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            Why Choose IntelliAvatar?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Built with enterprise requirements in mind, delivering exceptional performance at scale.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-6">
          {kpis.map((kpi, index) => (
            <motion.div
              key={kpi.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-secondary/50 border border-border hover:border-primary/30 hover:shadow-soft transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <kpi.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-foreground">
                  {kpi.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {kpi.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KPISection;
