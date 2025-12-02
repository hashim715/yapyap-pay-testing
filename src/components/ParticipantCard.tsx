import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AudioWaveform } from "./AudioWaveform";
import { cn } from "@/lib/utils";

interface ParticipantCardProps {
  name: string;
  avatarUrl?: string;
  initials: string;
  isSpeaking?: boolean;
  isWaiting?: boolean;
  className?: string;
}

export const ParticipantCard = ({
  name,
  avatarUrl,
  initials,
  isSpeaking = false,
  isWaiting = false,
  className,
}: ParticipantCardProps) => {
  return (
    <div
      className={cn(
        "bg-muted/20 border border-border rounded-xl p-8 flex flex-col items-center justify-center transition-all duration-300",
        isSpeaking && "border-primary/40 bg-primary/[0.02]",
        className
      )}
    >
      <Avatar className="w-24 h-24 mb-5">
        <AvatarImage src={avatarUrl} />
        <AvatarFallback className="bg-muted text-foreground text-[24px] font-medium">
          {initials}
        </AvatarFallback>
      </Avatar>

      <h3 className="text-[13px] font-medium text-foreground mb-2.5 tracking-[-0.01em]">
        {name}
      </h3>

      {isWaiting ? (
        <p className="text-[12px] text-muted-foreground mb-5">
          Waiting to join…
        </p>
      ) : (
        <AudioWaveform isSpeaking={isSpeaking} isActive={true} className="mb-2" />
      )}
    </div>
  );
};
