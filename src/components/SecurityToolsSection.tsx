import { motion } from "framer-motion";
import { Shield, Eye, Lock, Terminal } from "lucide-react";
import { CodeBlock } from "./CodeBlock";

const falcoExample = `# Install Falco using Helm
helm repo add falcosecurity https://falcosecurity.github.io/charts
helm repo update

helm install falco falcosecurity/falco \\
  --namespace falco \\
  --create-namespace \\
  --set driver.kind=ebpf

# Example Falco rule for detecting SQL injection attempts
- rule: SQL Injection Attempt Detected
  desc: Detects potential SQL injection patterns in web requests
  condition: >
    spawned_process and 
    proc.name in (mysql, psql) and
    proc.cmdline contains "OR 1=1" or
    proc.cmdline contains "UNION SELECT"
  output: >
    SQL injection attempt detected 
    (user=%user.name command=%proc.cmdline)
  priority: WARNING`;

const kubearmorExample = `# Install KubeArmor
helm repo add kubearmor https://kubearmor.github.io/charts
helm repo update

helm install kubearmor kubearmor/kubearmor \\
  --namespace kubearmor \\
  --create-namespace

# Example KubeArmor policy to restrict DVWA
apiVersion: security.kubearmor.com/v1
kind: KubeArmorPolicy
metadata:
  name: restrict-dvwa-file-access
  namespace: demo
spec:
  selector:
    matchLabels:
      app: dvwa
  file:
    matchPaths:
    - path: /etc/passwd
      readOnly: true
    - path: /etc/shadow
      action: Block
  process:
    matchPaths:
    - path: /bin/bash
      action: Audit
    - path: /bin/sh
      action: Audit`;

const cleanupCommands = `#!/bin/bash
# Cleanup Script for DVWA Kubernetes Demo

echo "Cleaning up DVWA deployment..."

# Delete DVWA resources
kubectl delete service dvwa-service -n demo
kubectl delete deployment dvwa -n demo
kubectl delete namespace demo

# Optional: Delete security tools
kubectl delete namespace falco --ignore-not-found
kubectl delete namespace kubearmor --ignore-not-found

# Stop and delete Minikube cluster
minikube stop
minikube delete

echo "✓ Cleanup complete!"`;

export const SecurityToolsSection = () => {
  return (
    <section id="security" className="py-24 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(var(--accent)/0.08)_0%,_transparent_60%)]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/10 mb-6">
            <Shield className="w-4 h-4 text-accent" />
            <span className="text-sm font-mono text-accent">Runtime Protection</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">Security</span>{" "}
            <span className="text-gradient">Tools</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Layer runtime security with Falco and KubeArmor to detect and prevent attacks in real-time
          </p>
        </motion.div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="glass-card rounded-xl p-6 border border-border"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-lg bg-primary/20 border border-primary/30">
                <Eye className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">Falco</h3>
                <p className="text-sm text-muted-foreground">Cloud-Native Runtime Security</p>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground mb-4">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Kernel-level syscall monitoring
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Real-time threat detection
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Custom rule definitions
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Kubernetes-native integration
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="glass-card rounded-xl p-6 border border-border"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-lg bg-accent/20 border border-accent/30">
                <Lock className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">KubeArmor</h3>
                <p className="text-sm text-muted-foreground">Kubernetes Runtime Security</p>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground mb-4">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                File access control policies
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                Process execution restrictions
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                Network policy enforcement
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                LSM-based enforcement (AppArmor/BPF)
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Code Examples */}
        <div className="space-y-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-semibold text-foreground">Falco Setup & Rules</h3>
            </div>
            <CodeBlock
              code={falcoExample}
              language="yaml"
              filename="falco-setup.yaml"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-5 h-5 text-accent" />
              <h3 className="text-xl font-semibold text-foreground">KubeArmor Policy</h3>
            </div>
            <CodeBlock
              code={kubearmorExample}
              language="yaml"
              filename="kubearmor-policy.yaml"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Terminal className="w-5 h-5 text-destructive" />
              <h3 className="text-xl font-semibold text-foreground">Cleanup Commands</h3>
            </div>
            <CodeBlock
              code={cleanupCommands}
              language="bash"
              filename="cleanup.sh"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
