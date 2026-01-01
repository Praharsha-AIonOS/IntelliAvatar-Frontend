import { motion } from "framer-motion";

const Robot = ({ className = "mx-auto mb-4" }: { className?: string }) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      aria-hidden
    >
      <svg width="84" height="64" viewBox="0 0 84 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="14" width="72" height="42" rx="8" fill="url(#g)" opacity="0.98" />
        <rect x="30" y="24" width="8" height="8" rx="2" fill="#fff" />
        <rect x="46" y="24" width="8" height="8" rx="2" fill="#fff" />
        <ellipse cx="34" cy="36" rx="2" ry="1.5" fill="#000" className="robot-eye-left" />
        <ellipse cx="50" cy="36" rx="2" ry="1.5" fill="#000" className="robot-eye-right" />
        <rect x="28" y="40" width="28" height="4" rx="2" fill="#0f172a" opacity="0.08" />
        <circle cx="14" cy="10" r="4" fill="#7c3aed" />
        <defs>
          <linearGradient id="g" x1="0" x2="1">
            <stop offset="0%" stopColor="#eef2ff" />
            <stop offset="100%" stopColor="#eef2ff" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
};

export default Robot;
