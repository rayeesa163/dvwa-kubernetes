import { Github, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";

export const Footer = () => {
  return (
    <footer className="border-t border-border py-12 bg-card/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold text-foreground mb-1">
              DVWA Kubernetes Demo
            </h3>
            <p className="text-sm text-muted-foreground">
              AccuKnox Solution Engineer Trainee - Problem Statement 2
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <a
                href="https://github.com/digininja/DVWA"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Github className="w-4 h-4" />
                DVWA Repo
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a
                href="https://www.accuknox.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                AccuKnox
              </a>
            </Button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border/50 text-center">
          <p className="text-xs text-muted-foreground">
            Built for educational purposes. DVWA is intentionally vulnerable - 
            <span className="text-warning"> never deploy in production environments</span>.
          </p>
        </div>
      </div>
    </footer>
  );
};
