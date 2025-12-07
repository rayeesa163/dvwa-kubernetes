import { motion } from "framer-motion";
import { AttackCard } from "./AttackCard";
import { Skull } from "lucide-react";

const attacks = [
  {
    title: "SQL Injection",
    severity: "critical" as const,
    description:
      "SQL Injection allows attackers to manipulate database queries by injecting malicious SQL code through user input fields. This can lead to unauthorized data access, data modification, or even complete database takeover.",
    steps: [
      "Navigate to DVWA → SQL Injection module",
      "Set security level to 'Low' in DVWA Security settings",
      "In the User ID field, enter the payload to test",
      "Observe the dumped user credentials from the database",
      "Try advanced payloads to enumerate table structures",
    ],
    payload: "1' OR '1'='1' --",
    mitigation:
      "Use parameterized queries (prepared statements), implement input validation, apply principle of least privilege to database accounts, and employ a Web Application Firewall (WAF).",
  },
  {
    title: "Stored XSS",
    severity: "high" as const,
    description:
      "Stored Cross-Site Scripting (XSS) occurs when malicious scripts are permanently stored on the target server. When other users view the affected page, the script executes in their browser, potentially stealing session cookies or credentials.",
    steps: [
      "Navigate to DVWA → XSS (Stored) module",
      "Ensure security level is set to 'Low'",
      "In the message field, inject the XSS payload",
      "Submit the guestbook entry",
      "Observe the alert box when the page loads",
      "In a real attack, cookies could be exfiltrated to an attacker's server",
    ],
    payload: "<script>alert('XSS')</script>",
    mitigation:
      "Sanitize and encode all user input, implement Content Security Policy (CSP) headers, use HTTPOnly and Secure flags on cookies, and employ output encoding for HTML contexts.",
  },
  {
    title: "Brute Force",
    severity: "medium" as const,
    description:
      "Brute Force attacks attempt to gain unauthorized access by systematically trying all possible password combinations. Without proper rate limiting, attackers can automate millions of login attempts.",
    steps: [
      "Navigate to DVWA → Brute Force module",
      "Note the login form URL and parameters",
      "Use tools like Hydra, Burp Suite Intruder, or custom scripts",
      "Run the brute force attack with a wordlist",
      "Successful login indicates password discovery",
    ],
    payload:
      "hydra -l admin -P /usr/share/wordlists/rockyou.txt <MINIKUBE_IP> http-get-form '/vulnerabilities/brute/:username=^USER^&password=^PASS^&Login=Login:Username and/or password incorrect'",
    mitigation:
      "Implement account lockout after failed attempts, use CAPTCHA, enforce strong password policies, implement multi-factor authentication (MFA), and add rate limiting on authentication endpoints.",
  },
];

export const AttacksSection = () => {
  return (
    <section id="attacks" className="py-24 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_hsl(var(--destructive)/0.05)_0%,_transparent_50%)]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-destructive/30 bg-destructive/10 mb-6">
            <Skull className="w-4 h-4 text-destructive" />
            <span className="text-sm font-mono text-destructive">Attack Demonstrations</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">Security</span>{" "}
            <span className="text-destructive">Vulnerabilities</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore common web application vulnerabilities and learn how to identify and mitigate them
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-1 max-w-4xl mx-auto">
          {attacks.map((attack, index) => (
            <AttackCard key={attack.title} {...attack} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
