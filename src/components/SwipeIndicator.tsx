import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SwipeIndicatorProps {
  direction: "left" | "right" | null;
  label?: string;
}

export const SwipeIndicator = ({ direction, label }: SwipeIndicatorProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (direction) {
      setIsVisible(true);
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [direction]);

  if (!isVisible || !direction) return null;

  return (
    <div
      className={cn(
        "md:hidden fixed top-1/2 -translate-y-1/2 z-50 pointer-events-none",
        direction === "left" ? "right-4 animate-slide-in-right" : "left-4 animate-slide-in-left"
      )}
    >
      <div className="flex items-center gap-2 bg-primary/90 text-primary-foreground px-4 py-2.5 rounded-lg backdrop-blur-sm">
        {direction === "left" ? (
          <ChevronLeft className="w-5 h-5" strokeWidth={2} />
        ) : (
          <ChevronRight className="w-5 h-5" strokeWidth={2} />
        )}
        {label && <span className="text-[13px] font-medium">{label}</span>}
      </div>
    </div>
  );
};
