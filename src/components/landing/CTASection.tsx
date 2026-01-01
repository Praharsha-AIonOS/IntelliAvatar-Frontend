import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 hero-gradient relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-primary-foreground/5"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-primary-foreground/5"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Removed 'Powered by AIonOS' (Sparkles) badge */}

          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            Ready to Transform Your Content?
          </h2>
          
          <p className="text-xl text-primary-foreground/80 mb-10">
            Join thousands of enterprises using IntelliAvatar to create stunning avatar videos at scale.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild variant="heroOutline" size="xl" className="bg-white text-primary border-primary font-bold hover:bg-gray-100">
              <Link to="/register">
                Register Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="heroOutline" size="xl" className="bg-white text-primary border-primary font-bold hover:bg-gray-100">
              <Link to="/login">
                Login to Continue
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
