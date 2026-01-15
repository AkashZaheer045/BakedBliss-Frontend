import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoaderProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  text?: string;
}

const sizeClasses = {
  sm: "w-4 h-4",
  md: "w-8 h-8",
  lg: "w-12 h-12"
};

export const Loader = ({ className, size = "md", text }: LoaderProps) => {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-2", className)}>
      <Loader2 className={cn("animate-spin text-primary", sizeClasses[size])} />
      {text && <p className="text-sm text-muted-foreground">{text}</p>}
    </div>
  );
};

// Full page loader for use when loading entire pages
export const PageLoader = ({ text }: { text?: string }) => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Loader size="lg" text={text} />
    </div>
  );
};
