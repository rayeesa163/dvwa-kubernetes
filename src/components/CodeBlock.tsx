import { useState } from "react";
import { Check, Copy, Download, FileCode } from "lucide-react";
import { Button } from "./ui/button";

interface CodeBlockProps {
  code: string;
  language: string;
  filename: string;
  showLineNumbers?: boolean;
}

export const CodeBlock = ({ code, language, filename, showLineNumbers = true }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadFile = () => {
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const lines = code.split("\n");

  return (
    <div className="code-block group">
      <div className="code-header">
        <div className="flex items-center gap-2">
          <FileCode className="w-4 h-4 text-primary" />
          <span className="font-mono text-sm text-muted-foreground">{filename}</span>
          <span className="px-2 py-0.5 text-xs rounded bg-primary/20 text-primary font-mono">
            {language}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={copyToClipboard}
          >
            {copied ? (
              <Check className="w-4 h-4 text-accent" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={downloadFile}
          >
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <pre className="p-4 text-sm leading-relaxed">
          <code className="font-mono">
            {lines.map((line, i) => (
              <div key={i} className="flex">
                {showLineNumbers && (
                  <span className="select-none w-8 text-muted-foreground/50 text-right mr-4">
                    {i + 1}
                  </span>
                )}
                <span className="flex-1">
                  {highlightYaml(line, language)}
                </span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
};

const highlightYaml = (line: string, language: string) => {
  if (language === "yaml" || language === "yml") {
    // Comments
    if (line.trim().startsWith("#")) {
      return <span className="text-muted-foreground">{line}</span>;
    }
    // Key-value pairs
    const keyMatch = line.match(/^(\s*)([a-zA-Z_-]+)(:)/);
    if (keyMatch) {
      const [, indent, key, colon] = keyMatch;
      const rest = line.slice(keyMatch[0].length);
      return (
        <>
          {indent}
          <span className="text-primary">{key}</span>
          <span className="text-muted-foreground">{colon}</span>
          <span className="text-accent">{rest}</span>
        </>
      );
    }
    // List items
    if (line.trim().startsWith("-")) {
      return <span className="text-secondary-foreground">{line}</span>;
    }
  }

  if (language === "bash" || language === "sh") {
    // Comments
    if (line.trim().startsWith("#")) {
      return <span className="text-muted-foreground">{line}</span>;
    }
    // Commands
    const cmdMatch = line.match(/^(\s*)([\w-]+)/);
    if (cmdMatch) {
      const [, indent, cmd] = cmdMatch;
      const rest = line.slice(cmdMatch[0].length);
      const isKeyword = ["if", "then", "else", "fi", "echo", "minikube", "kubectl", "exit", "set", "sleep"].includes(cmd);
      return (
        <>
          {indent}
          <span className={isKeyword ? "text-primary" : "text-accent"}>{cmd}</span>
          <span className="text-secondary-foreground">{rest}</span>
        </>
      );
    }
  }

  return <span className="text-foreground">{line}</span>;
};
