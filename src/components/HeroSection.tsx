import { motion } from "framer-motion";
import { Shield, Server, Terminal, AlertTriangle } from "lucide-react";
import { Button } from "./ui/button";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(var(--primary)/0.1)_0%,_transparent_70%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,_transparent_0%,_hsl(var(--background))_100%)]" />
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Floating Icons */}
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-[15%] opacity-20"
      >
        <Shield className="w-16 h-16 text-primary" />
      </motion.div>
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-1/3 right-[20%] opacity-20"
      >
        <Server className="w-12 h-12 text-accent" />
      </motion.div>
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute bottom-1/3 left-[25%] opacity-20"
      >
        <Terminal className="w-10 h-10 text-primary" />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 mb-8"
          >
            <AlertTriangle className="w-4 h-4 text-warning" />
            <span className="text-sm font-mono text-primary">AccuKnox Solution Engineer Trainee</span>
          </motion.div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-foreground">DVWA on</span>
            <br />
            <span className="text-gradient">Kubernetes</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Deploy Damn Vulnerable Web Application on Minikube and explore 
            <span className="text-primary"> SQL Injection</span>,
            <span className="text-destructive"> XSS</span>, and
            <span className="text-warning"> Brute Force</span> attacks.
          </p>

          {/* Terminal Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-card/80 backdrop-blur border border-border rounded-xl p-4 mb-8 max-w-xl mx-auto"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 rounded-full bg-destructive" />
              <div className="w-3 h-3 rounded-full bg-warning" />
              <div className="w-3 h-3 rounded-full bg-accent" />
              <span className="ml-2 text-xs text-muted-foreground font-mono">terminal</span>
            </div>
            <div className="font-mono text-sm text-left">
              <p className="text-muted-foreground">
                <span className="text-accent">$</span> ./setup_dvwa_minikube.sh
              </p>
              <p className="text-muted-foreground">
                <span className="text-primary">→</span> Starting minikube cluster...
              </p>
              <p className="text-muted-foreground">
                <span className="text-primary">→</span> Deploying DVWA to namespace: demo
              </p>
              <p className="text-accent terminal-cursor">
                ✓ DVWA available at http://192.168.49.2:30080
              </p>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button variant="default" size="lg" onClick={() => document.getElementById('manifests')?.scrollIntoView({ behavior: 'smooth' })}>
              View Manifests
            </Button>
            <Button variant="neon" size="lg" onClick={() => document.getElementById('attacks')?.scrollIntoView({ behavior: 'smooth' })}>
              Explore Attacks
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-2"
        >
          <div className="w-1.5 h-3 rounded-full bg-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
};
