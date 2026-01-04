import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import HomeNavbar from "@/components/layout/HomeNavbar";
import { Video, Type, Heart, GraduationCap, ArrowRight } from "lucide-react";
import { getUserSession, verifyToken } from "@/lib/api/auth";

const features = [
  {
    id: 1,
    icon: Video,
    title: "Avatar Sync Studio",
    subtitle: "Audio + Video",
    description: "Upload audio and video/image to generate stunning lip-synced avatar videos with perfect synchronization.",
    path: "/feature/avatar-sync",
    gradient: "from-indigo-500 to-indigo-600",
  },
  {
    id: 2,
    icon: Type,
    title: "Text-to-Avatar Studio",
    subtitle: "Text to Speech",
    description: "Convert any text into natural speech and generate avatar videos with realistic voice synthesis.",
    path: "/feature/text-to-avatar",
    gradient: "from-indigo-600 to-indigo-700",
  },
  {
    id: 3,
    icon: Heart,
    title: "Personalized Wishes Generator",
    subtitle: "Batch Processing",
    description: "Create personalized avatar videos for multiple names with customizable templates and scripts.",
    path: "/feature/wishes-generator",
    gradient: "from-indigo-700 to-indigo-800",
  },
  {
    id: 4,
    icon: GraduationCap,
    title: "IntelliTutor",
    subtitle: "AI Lecture Generator",
    description: "Convert PowerPoint presentations into engaging lecture videos with AI-powered avatar presenters.",
    path: "/feature/intellitutor",
    gradient: "from-indigo-800 to-indigo-900",
  },
];

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const user = getUserSession();
      if (!user) {
        // Try to verify token if it exists
        const result = await verifyToken();
        if (!result.valid) {
          navigate("/login");
        }
      }
    };
    checkAuth();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <HomeNavbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Welcome to IntelliAvatar
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose from our powerful video generation tools to create stunning AI-powered avatar content.
            </p>
          </motion.div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-large"
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                <div className="relative z-10 p-8">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-medium group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="font-display text-2xl font-bold text-foreground mb-1">
                      {feature.title}
                    </h3>
                    <span className="text-sm font-medium text-primary">
                      {feature.subtitle}
                    </span>
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {feature.description}
                  </p>

                  <Button asChild variant="card" className="group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <Link to={feature.path}>
                      Try It
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
