import { Mic, MicOff, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AudioDeviceSelector } from "@/components/AudioDeviceSelector";

interface ControlBarProps {
  isHost: boolean;
  isRecording: boolean;
  isMuted: boolean;
  onToggleRecording: () => void;
  onToggleMute: () => void;
  onLeave: () => void;
  className?: string;
  stream: any;
}

export const ControlBar = ({
  isHost,
  isRecording,
  isMuted,
  onToggleRecording,
  onToggleMute,
  onLeave,
  className,
  stream,
}: ControlBarProps) => {
  return (
    <div
      className={cn(
        "h-14 md:h-16 border-t border-border bg-background flex items-center justify-center px-3 md:px-6",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <AudioDeviceSelector
          type="microphone"
          stream={stream}
          disabled={isRecording ? true : false}
        />
        <AudioDeviceSelector
          type="speaker"
          stream={stream}
          disabled={isRecording ? true : false}
        />
      </div>
      <div className="flex items-center gap-2 md:gap-3 flex-wrap justify-center">
        <Button
          variant="outline"
          onClick={onToggleMute}
          className={cn(
            "h-9 px-4 md:px-5 rounded-lg border-border bg-background hover:bg-muted hover:border-foreground/20 hover:text-black [&_svg]:hover:text-black transition-all",
            isMuted ? "text-muted-foreground" : "text-foreground"
          )}
          disabled={isRecording}
        >
          {isMuted ? (
            <MicOff
              className="w-[16px] h-[16px] mr-1.5 md:mr-2"
              strokeWidth={1.75}
            />
          ) : (
            <Mic
              className="w-[16px] h-[16px] mr-1.5 md:mr-2"
              strokeWidth={1.75}
            />
          )}
          <span className="text-[13px]">{isMuted ? "Unmute" : "Mute"}</span>
        </Button>

        {isHost && (
          <Button
            onClick={onToggleRecording}
            className="h-9 md:h-10 px-6 md:px-10 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg"
          >
            <div
              className={cn(
                "w-2 h-2 rounded-full mr-2 md:mr-2.5",
                isRecording ? "bg-white animate-pulse" : "bg-white/60"
              )}
            />
            <span className="text-[13px] font-medium">
              <span className="hidden sm:inline">
                {isRecording ? "Stop Recording" : "Start Recording"}
              </span>
              <span className="sm:hidden">
                {isRecording ? "Stop" : "Record"}
              </span>
            </span>
          </Button>
        )}

        <Button
          variant="outline"
          onClick={onLeave}
          className="h-9 px-4 md:px-5 bg-background border-border text-foreground hover:bg-muted hover:border-foreground/20 hover:text-black [&_svg]:hover:text-black rounded-lg transition-all"
        >
          <LogOut
            className="w-[16px] h-[16px] mr-1.5 md:mr-2"
            strokeWidth={1.75}
          />
          <span className="text-[13px]">Leave</span>
        </Button>
      </div>
    </div>
  );
};
