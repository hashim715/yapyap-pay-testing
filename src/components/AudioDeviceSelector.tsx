import { useState, useEffect } from "react";
import { Mic, Volume2, ChevronDown, Check } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

interface AudioDevice {
  deviceId: string;
  label: string;
}

interface AudioDeviceSelectorProps {
  type: "microphone" | "speaker";
  className?: string;
  stream: any;
  disabled?: boolean;
}

export const AudioDeviceSelector = ({
  type,
  className,
  stream,
  disabled = false,
}: AudioDeviceSelectorProps) => {
  const [devices, setDevices] = useState<AudioDevice[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDevices = async () => {
      try {
        if (type === "microphone") {
          await navigator.mediaDevices.getUserMedia({ audio: true });
        }

        const deviceList = await navigator.mediaDevices.enumerateDevices();
        const filteredDevices = deviceList
          .filter((device) =>
            type === "microphone"
              ? device.kind === "audioinput"
              : device.kind === "audiooutput"
          )
          .map((device) => ({
            deviceId: device.deviceId,
            label:
              device.label ||
              `${
                type === "microphone" ? "Microphone" : "Speaker"
              } ${device.deviceId.slice(0, 5)}`,
          }));

        setDevices(filteredDevices);

        if (stream && filteredDevices.length > 0) {
          try {
            if (type === "microphone") {
              const activeMic = stream.getActiveMicrophone();
              if (activeMic) {
                setSelectedDevice(activeMic);
              } else if (filteredDevices.length > 0) {
                setSelectedDevice(filteredDevices[0].deviceId);
              }
            } else {
              const activeSpeaker = stream.getActiveSpeaker();
              if (activeSpeaker) {
                setSelectedDevice(activeSpeaker);
              } else if (filteredDevices.length > 0) {
                setSelectedDevice(filteredDevices[0].deviceId);
              }
            }
          } catch (error) {
            console.error("Error getting active device:", error);
            if (filteredDevices.length > 0) {
              setSelectedDevice(filteredDevices[0].deviceId);
            }
          }
        }

        setLoading(false);
      } catch (err) {
        console.error(`Failed to get ${type} devices:`, err);
        setLoading(false);
      }
    };

    getDevices();

    navigator.mediaDevices.addEventListener("devicechange", getDevices);
    return () => {
      navigator.mediaDevices.removeEventListener("devicechange", getDevices);
    };
  }, [type, stream]);

  const handleDeviceChange = async (deviceId: string) => {
    if (disabled) {
      toast({
        title: "Cannot switch device",
        description: "Device switching is disabled during recording.",
        variant: "destructive",
      });
      return;
    }

    if (!stream) {
      toast({
        title: "Audio not available",
        description: "Please enable audio first.",
        variant: "destructive",
      });
      return;
    }

    try {
      if (type === "microphone") {
        await stream.switchMicrophone(deviceId);
        toast({
          title: "Microphone changed",
          description: devices.find((d) => d.deviceId === deviceId)?.label,
        });
      } else {
        await stream.switchSpeaker(deviceId);
        toast({
          title: "Speaker changed",
          description: devices.find((d) => d.deviceId === deviceId)?.label,
        });
      }

      setSelectedDevice(deviceId);
      setIsOpen(false);
    } catch (error) {
      console.error(`Failed to switch ${type}:`, error);
      toast({
        title: `Failed to switch ${type}`,
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const selectedDeviceLabel =
    devices.find((d) => d.deviceId === selectedDevice)?.label ||
    (type === "microphone" ? "Select Microphone" : "Select Speaker");

  const Icon = type === "microphone" ? Mic : Volume2;

  if (!stream) {
    return null;
  }

  return (
    <Popover
      open={isOpen}
      onOpenChange={(open) => {
        if (disabled && open) {
          toast({
            title: "Cannot switch device",
            description: "Device switching is disabled during recording.",
            variant: "destructive",
          });
          return;
        }
        setIsOpen(open);
      }}
    >
      <PopoverTrigger asChild>
        <button
          disabled={disabled}
          className={cn(
            "h-9 px-3 md:px-4 rounded-lg border border-border bg-background hover:bg-muted hover:border-foreground/20 transition-all flex items-center gap-1.5 text-foreground",
            disabled &&
              "opacity-50 cursor-not-allowed hover:bg-background hover:border-border",
            className
          )}
        >
          <Icon className="w-4 h-4" strokeWidth={1.75} />
          <span className="text-[13px] hidden sm:inline max-w-[100px] truncate">
            {loading
              ? "Loading..."
              : selectedDeviceLabel.split(" ").slice(0, 2).join(" ")}
          </span>
          <ChevronDown
            className="w-3 h-3 text-muted-foreground"
            strokeWidth={2}
          />
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-64 p-1 bg-background border border-border shadow-lg"
        align="start"
        sideOffset={8}
      >
        <div className="py-1">
          <div className="px-3 py-1.5 text-[11px] font-medium text-muted-foreground uppercase tracking-wide">
            {type === "microphone" ? "Select Microphone" : "Select Speaker"}
          </div>
          {devices.length === 0 ? (
            <div className="px-3 py-2 text-[13px] text-muted-foreground">
              No {type === "microphone" ? "microphones" : "speakers"} found
            </div>
          ) : (
            devices.map((device) => (
              <button
                key={device.deviceId}
                onClick={() => handleDeviceChange(device.deviceId)}
                disabled={disabled}
                className={cn(
                  "w-full flex items-center gap-2 px-3 py-2 text-left text-[13px] rounded hover:bg-muted transition-colors",
                  selectedDevice === device.deviceId && "bg-muted",
                  disabled &&
                    "opacity-50 cursor-not-allowed hover:bg-background"
                )}
              >
                <div className="w-4 h-4 flex items-center justify-center">
                  {selectedDevice === device.deviceId && (
                    <Check
                      className="w-3.5 h-3.5 text-primary"
                      strokeWidth={2}
                    />
                  )}
                </div>
                <span className="truncate flex-1">{device.label}</span>
              </button>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
