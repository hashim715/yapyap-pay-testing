import { useState, useRef, useCallback } from "react";

interface AudioRecorderState {
  isRecording: boolean;
  audioBlob: Blob | null;
  audioURL: string | null;
  duration: number;
  error: string | null;
}

export const useAudioRecorder = () => {
  const [state, setState] = useState<AudioRecorderState>({
    isRecording: false,
    audioBlob: null,
    audioURL: null,
    duration: 0,
    error: null,
  });

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startRecording = useCallback(async (deviceId?: string) => {
    try {
      const constraints: MediaStreamConstraints = {
        audio: deviceId ? { deviceId: { exact: deviceId } } : true,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm',
      });

      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        
        setState(prev => ({
          ...prev,
          isRecording: false,
          audioBlob: blob,
          audioURL: url,
        }));

        // Stop all tracks
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
        }
      };

      mediaRecorder.start();
      
      // Start duration timer
      let seconds = 0;
      timerRef.current = setInterval(() => {
        seconds++;
        setState(prev => ({ ...prev, duration: seconds }));
      }, 1000);

      setState(prev => ({
        ...prev,
        isRecording: true,
        error: null,
        audioBlob: null,
        audioURL: null,
        duration: 0,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to start recording',
      }));
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && state.isRecording) {
      mediaRecorderRef.current.stop();
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  }, [state.isRecording]);

  const reset = useCallback(() => {
    if (state.audioURL) {
      URL.revokeObjectURL(state.audioURL);
    }
    setState({
      isRecording: false,
      audioBlob: null,
      audioURL: null,
      duration: 0,
      error: null,
    });
  }, [state.audioURL]);

  return {
    ...state,
    startRecording,
    stopRecording,
    reset,
  };
};
