import { X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DesktopOnlyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DesktopOnlyModal = ({ open, onOpenChange }: DesktopOnlyModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border border-border max-w-[420px] p-6 rounded-2xl">
        {/* Close Button */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 text-muted-foreground/50 hover:text-foreground/80 transition-colors"
        >
          <X className="w-4 h-4" strokeWidth={2} />
        </button>

        {/* Content */}
        <div className="pt-2">
          {/* Title */}
          <h2 className="text-lg font-medium text-foreground mb-3">
            Rooms are only available on desktop
          </h2>

          {/* Body Text */}
          <p className="text-[13px] text-muted-foreground leading-relaxed mb-6">
            To create or join a room, please use YapYap Pay from a laptop or desktop computer.
            <br /><br />
            Mobile and tablet are currently view-only for room features.
          </p>

          {/* Primary Button */}
          <Button
            onClick={() => onOpenChange(false)}
            className="w-full h-9 text-[13px]"
          >
            Got it
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
