import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const LandingNavbar = () => {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-border/50"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg hero-gradient flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-lg">A</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg text-foreground leading-tight">IntelliAvatar</span>
                <span className="text-xs text-muted-foreground">× AIonOS</span>
              </div>
            </div>
          </Link>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="sm">
              <Link to="/register">Register</Link>
            </Button>
            <Button asChild variant="default" size="sm">
              <Link to="/login">Login</Link>
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default LandingNavbar;
