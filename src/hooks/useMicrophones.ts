import { useState, useEffect } from "react";

interface MicrophoneDevice {
  deviceId: string;
  label: string;
}

export const useMicrophones = () => {
  const [devices, setDevices] = useState<MicrophoneDevice[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getMicrophones = async () => {
      try {
        // Request permission first
        await navigator.mediaDevices.getUserMedia({ audio: true });
        
        const deviceList = await navigator.mediaDevices.enumerateDevices();
        const audioDevices = deviceList
          .filter(device => device.kind === 'audioinput')
          .map(device => ({
            deviceId: device.deviceId,
            label: device.label || `Microphone ${device.deviceId.slice(0, 5)}`,
          }));

        setDevices(audioDevices);
        
        // Select first device by default
        if (audioDevices.length > 0) {
          setSelectedDevice(audioDevices[0].deviceId);
        }
        
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to get microphone devices');
        setLoading(false);
      }
    };

    getMicrophones();
  }, []);

  return {
    devices,
    selectedDevice,
    setSelectedDevice,
    loading,
    error,
  };
};
