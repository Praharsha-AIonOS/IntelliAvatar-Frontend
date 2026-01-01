import { Video, Type, Heart, GraduationCap, Layers } from "lucide-react";

const features = [
  {
    icon: Video,
    title: "Avatar Sync Studio",
    subtitle: "Audio + Video",
    description: "Upload audio and video/image to generate stunning lip-synced avatar videos with perfect synchronization.",
    gradient: "from-indigo-500 to-indigo-600",
  },
  {
    icon: Type,
    title: "Text-to-Avatar Studio",
    subtitle: "Text to Speech",
    description: "Convert any text into natural speech and generate avatar videos with realistic voice synthesis.",
    gradient: "from-indigo-600 to-indigo-700",
  },
  {
    icon: Heart,
    title: "Personalized Wishes Generator",
    subtitle: "Batch Processing",
    description: "Create personalized avatar videos for multiple names with customizable templates and scripts.",
    gradient: "from-indigo-700 to-indigo-800",
  },
  {
    icon: GraduationCap,
    title: "IntelliTutor",
    subtitle: "AI Lecture Generator",
    description: "Convert PowerPoint presentations into engaging lecture videos with AI-powered avatar presenters.",
    gradient: "from-indigo-800 to-indigo-900",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Layers className="w-4 h-4" />
            Features
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            Powerful Video Generation Tools
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Four specialized studios designed to meet all your avatar video creation needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative overflow-hidden rounded-2xl bg-card border border-border p-8 hover:shadow-large transition-all duration-500"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-medium`}>
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
                
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
