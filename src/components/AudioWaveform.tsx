import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface AudioWaveformProps {
  isActive?: boolean;
  isSpeaking?: boolean;
  className?: string;
}

export const AudioWaveform = ({ isActive = false, isSpeaking = false, className }: AudioWaveformProps) => {
  const [bars, setBars] = useState<number[]>([0.3, 0.5, 0.7, 0.5, 0.3, 0.6, 0.4, 0.8, 0.4, 0.6]);

  useEffect(() => {
    if (!isSpeaking) {
      setBars([0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3]);
      return;
    }

    const interval = setInterval(() => {
      setBars(bars.map(() => 0.2 + Math.random() * 0.8));
    }, 150);

    return () => clearInterval(interval);
  }, [isSpeaking]);

  return (
    <div className={cn("flex items-center justify-center gap-1 h-12", className)}>
      {bars.map((height, i) => (
        <div
          key={i}
          className={cn(
            "w-1 rounded-full transition-all duration-150",
            isSpeaking ? "bg-primary" : "bg-border"
          )}
          style={{
            height: `${height * 100}%`,
            opacity: isActive ? 1 : 0.3,
          }}
        />
      ))}
    </div>
  );
};
