import { ReactNode, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useSwipeable } from "react-swipeable";
import { cn } from "@/lib/utils";

interface SwipeableDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  className?: string;
}

export const SwipeableDialog = ({
  open,
  onOpenChange,
  children,
  className,
}: SwipeableDialogProps) => {
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);

  const handlers = useSwipeable({
    onSwiping: (eventData) => {
      if (eventData.dir === "Down" && eventData.deltaY > 0) {
        setIsSwiping(true);
        setSwipeOffset(Math.min(eventData.deltaY, 200));
      }
    },
    onSwiped: (eventData) => {
      if (eventData.dir === "Down" && eventData.deltaY > 100) {
        onOpenChange(false);
      }
      setSwipeOffset(0);
      setIsSwiping(false);
    },
    trackTouch: true,
    trackMouse: false,
    delta: 10,
    preventScrollOnSwipe: false,
    touchEventOptions: { passive: false },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* Wrapper div to attach swipe handlers */}
      <div {...handlers} className="w-full h-full">
        <DialogContent
          className={cn(className, "transition-transform")}
          style={{
            transform: isSwiping ? `translateY(${swipeOffset}px)` : undefined,
            transition: isSwiping
              ? "none"
              : "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <div className="md:hidden absolute top-2 left-1/2 -translate-x-1/2 w-10 h-1 bg-muted-foreground/20 rounded-full" />
          {children}
        </DialogContent>
      </div>
    </Dialog>
  );
};
