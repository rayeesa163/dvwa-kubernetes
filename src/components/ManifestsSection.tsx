import { motion } from "framer-motion";
import { CodeBlock } from "./CodeBlock";
import { FileCode, Box, Network, Play } from "lucide-react";

const deploymentYaml = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: dvwa
  namespace: demo
  labels:
    app: dvwa
spec:
  replicas: 1
  selector:
    matchLabels:
      app: dvwa
  template:
    metadata:
      labels:
        app: dvwa
    spec:
      containers:
      - name: dvwa
        image: vulnerables/web-dvwa:latest
        ports:
        - containerPort: 80
        env:
        - name: MYSQL_HOST
          value: "127.0.0.1"
        - name: MYSQL_DATABASE
          value: "dvwa"
        - name: MYSQL_USER
          value: "dvwa"
        - name: MYSQL_PASSWORD
          value: "p@ssw0rd"
        resources:
          requests:
            memory: "128Mi"
            cpu: "100m"
          limits:
            memory: "256Mi"
            cpu: "200m"
      - name: mysql
        image: mysql:5.7
        ports:
        - containerPort: 3306
        env:
        - name: MYSQL_ROOT_PASSWORD
          value: "dvwa"
        - name: MYSQL_DATABASE
          value: "dvwa"
        - name: MYSQL_USER
          value: "dvwa"
        - name: MYSQL_PASSWORD
          value: "p@ssw0rd"
        resources:
          requests:
            memory: "256Mi"
            cpu: "100m"
          limits:
            memory: "512Mi"
            cpu: "300m"`;

const serviceYaml = `apiVersion: v1
kind: Service
metadata:
  name: dvwa-service
  namespace: demo
  labels:
    app: dvwa
spec:
  type: NodePort
  selector:
    app: dvwa
  ports:
  - port: 80
    targetPort: 80
    nodePort: 30080
    protocol: TCP`;

const setupScript = `#!/bin/bash
set -e

echo "=========================================="
echo "  DVWA Kubernetes Deployment Script"
echo "  AccuKnox Solution Engineer Trainee"
echo "=========================================="
echo ""

# Colors for output
RED='\\033[0;31m'
GREEN='\\033[0;32m'
CYAN='\\033[0;36m'
NC='\\033[0m' # No Color

# Check if minikube is installed
if ! command -v minikube &> /dev/null; then
    echo -e "\${RED}Error: minikube is not installed.\${NC}"
    echo "Please install minikube first: https://minikube.sigs.k8s.io/docs/start/"
    exit 1
fi

# Check if kubectl is installed
if ! command -v kubectl &> /dev/null; then
    echo -e "\${RED}Error: kubectl is not installed.\${NC}"
    echo "Please install kubectl first."
    exit 1
fi

echo -e "\${CYAN}[1/4] Starting Minikube cluster...\${NC}"
minikube start --driver=docker

echo ""
echo -e "\${CYAN}[2/4] Creating 'demo' namespace...\${NC}"
kubectl create namespace demo --dry-run=client -o yaml | kubectl apply -f -

echo ""
echo -e "\${CYAN}[3/4] Applying DVWA deployment...\${NC}"
kubectl apply -f dvwa-deployment.yaml

echo ""
echo -e "\${CYAN}[4/4] Applying DVWA service...\${NC}"
kubectl apply -f dvwa-service.yaml

echo ""
echo -e "\${GREEN}Waiting for pods to be ready...\${NC}"
kubectl wait --for=condition=ready pod -l app=dvwa -n demo --timeout=120s

echo ""
echo "=========================================="
echo -e "\${GREEN}✓ DVWA Deployment Complete!\${NC}"
echo "=========================================="
echo ""

# Get the Minikube IP
MINIKUBE_IP=$(minikube ip)
echo -e "DVWA URL: \${CYAN}http://\${MINIKUBE_IP}:30080\${NC}"
echo ""
echo "Default Credentials:"
echo "  Username: admin"
echo "  Password: password"
echo ""
echo "After login, click 'Create / Reset Database' to initialize."
echo ""
echo "=========================================="`;

export const ManifestsSection = () => {
  return (
    <section id="manifests" className="py-24 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(var(--accent)/0.05)_0%,_transparent_50%)]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">Kubernetes</span>{" "}
            <span className="text-gradient">Manifests</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ready-to-deploy YAML configurations for DVWA on your local Minikube cluster
          </p>
        </motion.div>

        <div className="grid gap-8 max-w-4xl mx-auto">
          {/* Deployment */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/20 border border-primary/30">
                <Box className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">Deployment</h3>
                <p className="text-sm text-muted-foreground">DVWA application + MySQL database</p>
              </div>
            </div>
            <CodeBlock
              code={deploymentYaml}
              language="yaml"
              filename="dvwa-deployment.yaml"
            />
          </motion.div>

          {/* Service */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-accent/20 border border-accent/30">
                <Network className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">Service</h3>
                <p className="text-sm text-muted-foreground">NodePort exposure on port 30080</p>
              </div>
            </div>
            <CodeBlock
              code={serviceYaml}
              language="yaml"
              filename="dvwa-service.yaml"
            />
          </motion.div>

          {/* Setup Script */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-warning/20 border border-warning/30">
                <Play className="w-5 h-5 text-warning" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">Setup Script</h3>
                <p className="text-sm text-muted-foreground">Automated deployment bash script</p>
              </div>
            </div>
            <CodeBlock
              code={setupScript}
              language="bash"
              filename="setup_dvwa_minikube.sh"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
