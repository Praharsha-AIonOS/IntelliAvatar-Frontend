import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { motion } from "framer-motion";
// import Robot from "@/components/ui/robot";
import { toast } from "sonner";
import { Eye, EyeOff, LogIn } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    // Simulate login - In production, this would connect to a backend
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find((u: { username: string; password: string }) => 
        u.username === username && u.password === password
      );

      if (!user) {
        toast.error("Invalid username or password");
        setIsLoading(false);
        return;
      }

      // Store session
      // sessionStorage.setItem("user", JSON.stringify({ username }));
      sessionStorage.setItem(
        "user",
        JSON.stringify({
          email: username,   // 👈 treat username as email
          username: username
        })
      );

      
      toast.success("Login successful!");
      setIsLoading(false);
      navigate("/home");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Section - Branding */}
      <div className="hidden lg:flex lg:w-1/2 hero-gradient relative overflow-hidden items-center justify-center">
        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12">
          <div className="flex flex-col items-center">
            <img src="/Pause GIF image.gif" alt="IntelliAvatar Animation" className="w-28 h-28 mb-4 mx-auto rounded-xl shadow-lg" />
            <h1 className="font-display text-5xl font-bold text-primary-foreground mb-4">
              IntelliAvatar
            </h1>
            <p className="text-xl text-primary-foreground/80">
              Welcome Back
            </p>
          </div>
        </div>
      </div>

      {/* Right Section - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8 text-center">
            <img src="/Pause GIF image.gif" alt="IntelliAvatar Animation" className="w-16 h-16 mb-4 mx-auto rounded-xl shadow-lg" />
            <h1 className="font-display text-2xl font-bold text-foreground">IntelliAvatar</h1>
          </div>

          <div className="mb-8">
            <h2 className="font-display text-3xl font-bold text-foreground mb-2">Welcome Back</h2>
            <p className="text-muted-foreground">Sign in to continue to IntelliAvatar</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-foreground font-medium">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-12 bg-secondary/50 border-border focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground font-medium">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 bg-secondary/50 border-border focus:border-primary pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="w-5 h-5 mr-2" />
                  Sign In
                </>
              )}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary font-semibold hover:underline">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
