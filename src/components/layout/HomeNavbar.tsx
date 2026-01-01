import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { LogOut, User } from "lucide-react";

const HomeNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    navigate("/");
  };

  const user = JSON.parse(sessionStorage.getItem("user") || "{}");

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
          <Link to="/home" className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg hero-gradient flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-lg">A</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg text-foreground leading-tight">AIonOS</span>
                <span className="text-xs text-muted-foreground">× IntelliAvatar</span>
              </div>
            </div>
          </Link>

          {/* User Section */}
          <div className="flex items-center gap-4">
            <Button asChild variant="default" size="sm">
              <Link to="/dashboard">Dashboard</Link>
            </Button>

            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary">
              <User className="w-4 h-4 text-secondary-foreground" />
              <span className="text-sm font-medium text-secondary-foreground">
                {user.username || "User"}
              </span>
            </div>

            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default HomeNavbar;
