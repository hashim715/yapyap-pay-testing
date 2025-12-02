import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mic, Play, Pause, Check } from "lucide-react";
import { useMicrophones } from "@/hooks/useMicrophones";
import { formStorage } from "@/utils/formStorage";
import useAxios from "@/utils/useAxios";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { fetchUser } from "../../store/reducer/auth-slice";

const AUDIO_TEST_SENTENCES: Record<string, string[]> = {
  English: [
    "The quick brown fox jumps over the lazy dog.",
    "Clear audio helps us train better voice AI models.",
  ],
  Spanish: [
    "Esta es una prueba de audio para verificar que mi micrófono funciona bien.",
    "Estoy hablando claramente en un lugar tranquilo para ayudar a entrenar modelos de voz.",
  ],
  Arabic: [
    "هذه تجربة صوتية للتأكد من أن الميكروفون يعمل بشكل جيد.",
    "أتحدث بوضوح في مكان هادئ لمساعدة تدريب نماذج الذكاء الاصطناعي الصوتية.",
  ],
  Hindi: [
    "यह एक ऑडियो टेस्ट है ताकि यह जांचा जा सके कि मेरा माइक्रोफोन सही से काम कर रहा है।",
    "मैं शांत कमरे में साफ़-साफ़ बोल रहा हूँ ताकि वॉइस एआई को ट्रेन करने में मदद मिले।",
  ],
  "Mandarin Chinese": [
    "这是一个音频测试，用来检查我的麦克风是否正常工作。",
    "我在安静的房间里清楚地说话，以帮助训练语音人工智能模型。",
  ],
  Cantonese: [
    "呢個係音頻測試，確保我個咪正常運作。",
    "我而家喺安靜嘅房入面清楚咁講嘢，幫助訓練語音人工智能。",
  ],
  French: [
    "Ceci est un test audio pour vérifier que mon microphone fonctionne correctement.",
    "Je parle clairement dans une pièce calme pour aider à entraîner les modèles de voix.",
  ],
  German: [
    "Dies ist ein Audiotest, um zu prüfen, ob mein Mikrofon richtig funktioniert.",
    "Ich spreche deutlich in einem ruhigen Raum, um Sprachmodelle besser zu trainieren.",
  ],
  Portuguese: [
    "Este é um teste de áudio para verificar se o meu microfone está funcionando bem.",
    "Estou falando com clareza em um lugar silencioso para ajudar a treinar modelos de voz.",
  ],
  Italian: [
    "Questo è un test audio per verificare che il mio microfono funzioni correttamente.",
    "Sto parlando chiaramente in una stanza silenziosa per aiutare ad addestrare i modelli vocali.",
  ],
  Russian: [
    "Это аудиотест, чтобы проверить, правильно ли работает мой микрофон.",
    "Я говорю чётко в тихой комнате, чтобы помочь обучать голосовые модели ИИ.",
  ],
  Japanese: [
    "これはマイクが正常に動作しているか確認するための音声テストです。",
    "私は静かな部屋ではっきりと話し、音声AIモデルの学習を手伝っています。",
  ],
  Korean: [
    "이것은 마이크가 제대로 작동하는지 확인하는 오디오 테스트입니다.",
    "저는 조용한 방에서 또렷하게 말하며 음성 AI 모델을 돕고 있습니다.",
  ],
  Bengali: [
    "এটি একটি অডিও টেস্ট, আমার মাইক্রোফোন ঠিকমতো কাজ করছে কিনা তা যাচাই করার জন্য।",
    "আমি একটি নিরিবিলি ঘরে পরিষ্কারভাবে কথা বলছি যাতে ভয়েস এআই মডেল প্রশিক্ষণে সাহায্য হয়।",
  ],
  Urdu: [
    "یہ ایک آڈیو ٹیسٹ ہے تاکہ چیک کیا جا سکے کہ میرا مائیکروفون ٹھیک کام کر رہا ہے۔",
    "میں ایک خاموش کمرے میں صاف انداز سے بات کر رہا ہوں تاکہ وائس اے آئی ماڈلز کی ٹریننگ میں مدد ہو۔",
  ],
  Turkish: [
    "Bu, mikrofonumun düzgün çalışıp çalışmadığını kontrol etmek için bir ses testidir.",
    "Sessiz bir odada net bir şekilde konuşuyorum ki sesli yapay zeka modellerinin eğitimine yardımcı olayım.",
  ],
  "Persian (Farsi)": [
    "این یک تست صدا است تا مطمئن شویم میکروفون من درست کار می‌کند.",
    "من در یک اتاق ساکت و واضح صحبت می‌کنم تا به آموزش مدل‌های صوتی کمک کنم.",
  ],
  Polish: [
    "To jest test dźwięku, aby sprawdzić, czy mój mikrofon działa poprawnie.",
    "Mówię wyraźnie w cichym pokoju, aby pomóc w trenowaniu modeli głosowych AI.",
  ],
  Dutch: [
    "Dit is een audiotest om te controleren of mijn microfoon goed werkt.",
    "Ik spreek duidelijk in een stille ruimte om te helpen bij het trainen van stem-AI-modellen.",
  ],
  Swedish: [
    "Det här är ett ljudtest för att kontrollera att min mikrofon fungerar som den ska.",
    "Jag pratar tydligt i ett tyst rum för att hjälpa till att träna röst-AI-modeller.",
  ],
  Norwegian: [
    "Dette er en lydtest for å sjekke at mikrofonen min fungerer som den skal.",
    "Jeg snakker tydelig i et stille rom for å hjelpe til med å trene stemme-AI-modeller.",
  ],
  Danish: [
    "Dette er en lydtest for at sikre, at min mikrofon fungerer korrekt.",
    "Jeg taler tydeligt i et stille rum for at hjælpe med at træne stemme-AI-modeller.",
  ],
  Finnish: [
    "Tämä on äänitesti, jolla tarkistetaan, että mikrofonini toimii oikein.",
    "Puhun selkeästi hiljaisessa huoneessa auttaakseni ääniaimallien koulutuksessa.",
  ],
  Thai: [
    "นี่คือการทดสอบเสียงเพื่อเช็คว่าไมโครโฟนของฉันทำงานได้ดีหรือไม่",
    "ฉันกำลังพูดอย่างชัดเจนในห้องที่เงียบเพื่อช่วยฝึกโมเดลเสียงของเอไอ.",
  ],
  Vietnamese: [
    "Đây là bài kiểm tra âm thanh để kiểm tra xem micro của tôi có hoạt động tốt không.",
    "Tôi đang nói rõ ràng trong một căn phòng yên tĩnh để giúp huấn luyện các mô hình giọng nói AI.",
  ],
  "Tagalog / Filipino": [
    "Ito ay isang audio test para masigurong maayos ang takbo ng aking mikropono.",
    "Nagsasalita ako nang malinaw sa isang tahimik na silid para makatulong sa pag-train ng voice AI models.",
  ],
  Indonesian: [
    "Ini adalah tes audio untuk memastikan mikrofon saya berfungsi dengan baik.",
    "Saya berbicara dengan jelas di ruangan yang tenang untuk membantu melatih model suara AI.",
  ],
  Swahili: [
    "Huu ni jaribio la sauti ili kuhakikisha kipaza sauti changu kinafanya kazi vizuri.",
    "Ninazungumza kwa uwazi katika chumba tulivu ili kusaidia kufundisha mifano ya sauti ya AI.",
  ],
  Greek: [
    "Αυτό είναι ένα τεστ ήχου για να ελέγξω ότι το μικρόφωνό μου λειτουργεί σωστά.",
    "Μιλάω καθαρά σε ένα ήσυχο δωμάτιο για να βοηθήσω στην εκπαίδευση φωνητικών μοντέλων τεχνητής νοημοσύνης.",
  ],
  Hebrew: [
    "זהו מבחן שמע כדי לוודא שהמיקרופון שלי עובד כראוי.",
    "אני מדבר בצורה ברורה בחדר שקט כדי לעזור לאמן מודלי בינה מלאכותית קוליים.",
  ],
};

const AudioTest = () => {
  const navigate = useNavigate();
  const {
    devices,
    selectedDevice,
    setSelectedDevice,
    loading: devicesLoading,
  } = useMicrophones();
  const api = useAxios();

  type RecordingState = "idle" | "recording" | "finished";

  const [recordingState, setRecordingState] = useState<RecordingState>("idle");
  const [elapsed, setElapsed] = useState(0);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [level, setLevel] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(
    null
  );
  const [playbackProgress, setPlaybackProgress] = useState(0);

  const mediaStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef<number | null>(null);

  const selectedLanguageName =
    localStorage.getItem("selectedLanguageName") || "English";
  const languageSentences =
    AUDIO_TEST_SENTENCES[selectedLanguageName] ||
    AUDIO_TEST_SENTENCES["English"];
  const testSentence = languageSentences[0];

  const baseURL = useSelector((state: RootState) => state.baseUrl.url);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const savedData = formStorage.get();
    if (savedData.audioBase64 && savedData.audioRecordingDuration) {
      const byteString = atob(savedData.audioBase64.split(",")[1]);
      const mimeString = savedData.audioBase64
        .split(",")[0]
        .split(":")[1]
        .split(";")[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: mimeString });
      const url = URL.createObjectURL(blob);

      setAudioBlob(blob);
      setAudioURL(url);
      setElapsed(savedData.audioRecordingDuration);
      setRecordingState("finished");
    }
  }, []);

  const cleanupStream = useCallback(() => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
      analyserRef.current = null;
    }
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  }, []);

  const stopTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const internalStopRecording = useCallback(() => {
    if (recordingState !== "recording") return;

    stopTimer();

    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
    } else {
      setRecordingState("finished");
    }

    cleanupStream();
  }, [recordingState, stopTimer, cleanupStream]);

  const startRecording = useCallback(async () => {
    if (recordingState === "recording" || !selectedDevice) return;

    try {
      setError(null);
      setAudioURL(null);
      setAudioBlob(null);
      setElapsed(0);
      chunksRef.current = [];

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { deviceId: { exact: selectedDevice } },
      });
      mediaStreamRef.current = stream;

      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (event: BlobEvent) => {
        if (event.data && event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        if (chunksRef.current.length > 0) {
          const blob = new Blob(chunksRef.current, { type: "audio/webm" });
          const url = URL.createObjectURL(blob);
          setAudioBlob(blob); // Save blob for backend
          setAudioURL(url);
        }
        setRecordingState("finished");
      };

      audioContextRef.current = new AudioContext();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
      source.connect(analyserRef.current);

      const bufferLength = analyserRef.current.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const updateLevel = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteTimeDomainData(dataArray);
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          const v = dataArray[i] - 128;
          sum += v * v;
        }
        const rms = Math.sqrt(sum / bufferLength);
        const norm = Math.min(rms / 50, 1);
        setLevel(norm);
        animationRef.current = requestAnimationFrame(updateLevel);
      };
      updateLevel();

      recorder.start();
      setRecordingState("recording");

      let seconds = 1;
      setElapsed(1);

      timerRef.current = window.setInterval(() => {
        seconds += 1;
        setElapsed(seconds);

        if (seconds >= 10) {
          window.clearInterval(timerRef.current!);
          timerRef.current = null;
          internalStopRecording();
        }
      }, 1000);
    } catch (err) {
      console.error("Error starting recording", err);
      setError(
        "Could not access your microphone. Please check permissions and try again."
      );
      cleanupStream();
      stopTimer();
      setRecordingState("idle");
      setElapsed(0);
    }
  }, [
    recordingState,
    selectedDevice,
    internalStopRecording,
    cleanupStream,
    stopTimer,
  ]);

  const stopRecording = useCallback(() => {
    if (elapsed < 10) {
      return;
    }
    internalStopRecording();
  }, [elapsed, internalStopRecording]);

  const handleReRecord = () => {
    if (audioElement) {
      audioElement.pause();
      setAudioElement(null);
    }

    setIsPlaying(false);
    setPlaybackProgress(0);
    setAudioURL(null);
    setAudioBlob(null);
    setRecordingState("idle");
    setElapsed(0);
    setError(null);
  };

  useEffect(() => {
    return () => {
      stopTimer();
      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state === "recording"
      ) {
        mediaRecorderRef.current.stop();
      }
      cleanupStream();
    };
  }, [stopTimer, cleanupStream]);

  useEffect(() => {
    if (!audioElement) return;

    const handleTimeUpdate = () => {
      if (!audioElement.duration) return;
      setPlaybackProgress(
        Math.min(1, audioElement.currentTime / audioElement.duration)
      );
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setPlaybackProgress(1);
    };

    audioElement.addEventListener("timeupdate", handleTimeUpdate);
    audioElement.addEventListener("ended", handleEnded);

    return () => {
      audioElement.removeEventListener("timeupdate", handleTimeUpdate);
      audioElement.removeEventListener("ended", handleEnded);
    };
  }, [audioElement]);

  const handleStartRecording = () => {
    if (!selectedDevice || devicesLoading || recordingState === "recording")
      return;
    setIsPlaying(false);
    setPlaybackProgress(0);
    if (audioElement) {
      audioElement.pause();
      setAudioElement(null);
    }
    startRecording();
  };

  const handlePlayPause = () => {
    if (!audioURL) return;

    if (!audioElement) {
      const audio = new Audio(audioURL);
      setAudioElement(audio);
      setPlaybackProgress(0);
      setIsPlaying(true);
      void audio.play();
      return;
    }

    if (isPlaying) {
      audioElement.pause();
      setIsPlaying(false);
    } else {
      void audioElement.play();
      setIsPlaying(true);
    }
  };

  const canProceed = Boolean(audioURL) && elapsed >= 10;

  const handleContinue = async () => {
    if (!audioBlob) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      formStorage.update({
        audioRecordingDuration: elapsed,
        audioBase64: base64String,
        audioMimeType: audioBlob.type,
      });

      if (isPlaying) {
        audioElement.pause();
        setIsPlaying(false);
      }
    };
    reader.readAsDataURL(audioBlob);
    const savedData = formStorage.get();

    const formData = new FormData();
    formData.append("backgroundInfo", JSON.stringify(savedData));
    formData.append("audio_sample", audioBlob, "audio_sample.webm");
    formData.append("audioDuration", String(elapsed));

    try {
      const response = await api.post(
        `${baseURL}/v1/user/addUserDetails/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      dispatch(fetchUser(baseURL));
      navigate("/onboarding/submitted");
      alert("Application submitted successfully!");
    } catch (err) {
      alert(
        "There was an error submitting your application. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex items-center justify-center px-8 py-10">
        <div className="w-full max-w-[1150px]">
          <div className="mb-6">
            <h1 className="text-xl font-medium tracking-tight mb-1.5">
              Test your audio quality
            </h1>
            <p className="text-muted-foreground text-[13px]">
              Record a short 10-second clip so we can check your microphone and
              room quality.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="text-[12px] text-muted-foreground mb-1.5 block">
                  Microphone
                </label>
                <Select
                  value={selectedDevice}
                  onValueChange={setSelectedDevice}
                  disabled={devicesLoading || recordingState === "recording"}
                >
                  <SelectTrigger className="w-full h-9 bg-background border border-border rounded-lg text-[13px]">
                    <SelectValue placeholder="Select your microphone" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border">
                    {devices.map((device) => (
                      <SelectItem
                        key={device.deviceId}
                        value={device.deviceId}
                        className="text-[13px]"
                      >
                        {device.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-lg border border-border bg-background p-4">
                <p className="text-[13px] mb-3 leading-relaxed">
                  Please confirm that you've completed the following checklist
                  to ensure you can pass the audio test:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-[4px] h-1 w-1 rounded-full bg-muted-foreground/60" />
                    <span className="text-[12px] text-muted-foreground leading-relaxed">
                      I'm in a quiet room with no background noise.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-[4px] h-1 w-1 rounded-full bg-muted-foreground/60" />
                    <span className="text-[12px] text-muted-foreground leading-relaxed">
                      My microphone is working properly.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-[4px] h-1 w-1 rounded-full bg-muted-foreground/60" />
                    <span className="text-[12px] text-muted-foreground leading-relaxed">
                      I'll speak clearly and stay within the required time frame
                      to pass the test.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div
              className="border border-border rounded-xl flex flex-col items-center justify-center bg-background"
              style={{ padding: "32px" }}
            >
              {error && (
                <div className="mb-4 text-[12px] text-red-500 text-center max-w-[85%]">
                  {error}
                </div>
              )}

              <p className="text-[13px] text-muted-foreground mb-8 text-center max-w-[85%]">
                {audioURL
                  ? "Your test recording is ready to play back."
                  : "When you're ready, click the microphone button and read this sentence out loud."}
              </p>

              {recordingState === "recording" && (
                <div className="mb-8 w-[80%]">
                  <p className="text-[11px] text-muted-foreground text-center mb-2">
                    Recording: {elapsed}/10 seconds
                  </p>
                  <div className="w-full h-[5px] bg-[#E5E5E5] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary ease-linear"
                      style={{
                        width: `${(elapsed / 10) * 100}%`,
                        transition: "width 1s linear",
                      }}
                    />
                  </div>
                </div>
              )}

              {!audioURL && (
                <div className="mb-10 text-center max-w-[70%]">
                  <p className="text-2xl font-medium text-foreground leading-relaxed">
                    "{testSentence}"
                  </p>
                </div>
              )}

              {!audioURL && (
                <div className="mb-3">
                  <button
                    type="button"
                    onClick={
                      recordingState === "recording"
                        ? stopRecording
                        : handleStartRecording
                    }
                    disabled={!selectedDevice || devicesLoading}
                    className={`
                      group flex items-center justify-center rounded-full
                      transition-all duration-200
                      disabled:opacity-30 disabled:cursor-not-allowed
                      ${
                        recordingState === "recording"
                          ? "bg-primary border-2 border-primary"
                          : "bg-background border-2 border-border hover:border-primary"
                      }
                    `}
                    style={{ width: "85px", height: "85px" }}
                  >
                    <Mic
                      className={
                        recordingState === "recording"
                          ? "text-white"
                          : "text-muted-foreground group-hover:text-primary"
                      }
                      strokeWidth={1.5}
                      style={{ width: "32px", height: "32px" }}
                    />
                  </button>
                </div>
              )}

              {!audioURL && recordingState !== "recording" && (
                <p className="text-[12px] text-muted-foreground text-center">
                  {selectedDevice
                    ? "Click to start recording"
                    : "Select a microphone to begin"}
                </p>
              )}

              {audioURL && recordingState === "finished" && elapsed >= 10 && (
                <div className="w-full max-w-[320px] flex flex-col items-center gap-4">
                  <div className="w-full relative h-10 flex items-center justify-center gap-0.5">
                    {Array(20)
                      .fill(0)
                      .map((_, i) => {
                        const barLevel = Math.random() * 0.6 + 0.4;
                        const isPlayed = playbackProgress * 20 > i;
                        return (
                          <div
                            key={i}
                            className={`rounded-full transition-colors ${
                              isPlayed ? "bg-primary" : "bg-border"
                            }`}
                            style={{
                              width: "3px",
                              height: `${Math.max(4, barLevel * 40)}px`,
                            }}
                          />
                        );
                      })}
                  </div>

                  <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
                    <Check className="w-3 h-3 text-primary" strokeWidth={2} />
                    <span>{elapsed}s recording</span>
                  </div>

                  <button
                    type="button"
                    onClick={handlePlayPause}
                    className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg bg-background hover:bg-primary hover:border-primary transition-colors group"
                  >
                    {isPlaying ? (
                      <Pause
                        className="w-3.5 h-3.5 text-foreground group-hover:text-primary-foreground"
                        fill="currentColor"
                        strokeWidth={0}
                      />
                    ) : (
                      <Play
                        className="w-3.5 h-3.5 text-foreground group-hover:text-primary-foreground"
                        fill="currentColor"
                        strokeWidth={0}
                      />
                    )}
                    <span className="text-[13px] text-foreground group-hover:text-primary-foreground">
                      {isPlaying ? "Pause" : "Play recording"}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={handleReRecord}
                    className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg bg-background hover:bg-muted transition-colors"
                  >
                    <Mic
                      className="w-3.5 h-3.5 text-foreground"
                      strokeWidth={1.5}
                    />
                    <span className="text-[13px] text-foreground">
                      Record again
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-2 mt-6 justify-end">
            <Button
              variant="outline"
              onClick={() => navigate("/onboarding/tutorial-quiz")}
              className="h-9 px-4 text-[13px]"
            >
              Back
            </Button>
            <Button
              onClick={handleContinue}
              disabled={!canProceed}
              className="h-9 px-6 text-[13px]"
            >
              Submit application
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioTest;
