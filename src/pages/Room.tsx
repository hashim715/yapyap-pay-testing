import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { KeyRound, X, Copy, Check, Link } from "lucide-react";
import { ParticipantCard } from "@/components/ParticipantCard";
import { TopicPanel } from "@/components/TopicPanel";
import { ControlBar } from "@/components/ControlBar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import useAxios from "@/utils/useAxios";
import { RootState } from "../store/store";
import ZoomVideo from "@zoom/videosdk";
import useAuth from "@/hooks/useAuth";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import { DesktopOnlyModal } from "@/components/DesktopOnlyModal";
import useOnline from "../hooks/useOnline";

const TOPICS = [
  {
    title: "Technology & Innovation",
    subtopics: [
      {
        title: "Artificial Intelligence",
        description: {
          overview:
            "Discuss the current state and future of AI, including machine learning, neural networks, and ethical considerations.",
          vocabulary: [
            "Machine Learning",
            "Neural Networks",
            "Deep Learning",
            "AI Ethics",
            "Automation",
          ],
          starters: [
            "What do you think is the most exciting AI development recently?",
            "How do you see AI changing your industry in the next 5 years?",
            "What are your thoughts on AI ethics and regulation?",
          ],
          examples: [
            "ChatGPT and language models",
            "Self-driving cars and autonomous systems",
            "AI in healthcare diagnostics",
          ],
        },
      },
      {
        title: "Blockchain & Web3",
        description: {
          overview:
            "Explore decentralized technologies, cryptocurrencies, and the future of the internet.",
          vocabulary: [
            "Blockchain",
            "Cryptocurrency",
            "Smart Contracts",
            "NFTs",
            "Decentralization",
          ],
          starters: [
            "What's your take on the future of blockchain technology?",
            "Have you experimented with any Web3 applications?",
            "How do you think decentralization will impact traditional systems?",
          ],
          examples: [
            "Bitcoin and cryptocurrency adoption",
            "Decentralized finance (DeFi) platforms",
            "NFTs and digital ownership",
          ],
        },
      },
      {
        title: "Quantum Computing",
        description: {
          overview:
            "Delve into quantum mechanics, quantum bits, and how this technology will revolutionize computing.",
          vocabulary: [
            "Quantum Bits",
            "Superposition",
            "Entanglement",
            "Quantum Supremacy",
            "Q-bits",
          ],
          starters: [
            "What problems do you think quantum computing will solve first?",
            "How far away do you think practical quantum computers are?",
          ],
          examples: [
            "Drug discovery and molecular simulation",
            "Breaking current encryption methods",
          ],
        },
      },
      {
        title: "Space Technology",
        description: {
          overview:
            "Discuss space exploration, satellite technology, and the commercialization of space.",
          vocabulary: [
            "SpaceX",
            "Satellites",
            "Mars Mission",
            "Space Tourism",
            "Rocketry",
          ],
          starters: [
            "What excites you most about recent space exploration efforts?",
            "Do you think space tourism will become mainstream?",
          ],
          examples: [
            "SpaceX's Starship program",
            "James Webb Space Telescope discoveries",
          ],
        },
      },
      {
        title: "Cybersecurity",
        description: {
          overview:
            "Talk about data protection, hacking, privacy, and digital security in the modern age.",
          vocabulary: [
            "Encryption",
            "Phishing",
            "Zero Trust",
            "VPN",
            "Firewall",
          ],
          starters: [
            "What do you think is the biggest cybersecurity threat today?",
            "How do you protect your personal data online?",
          ],
          examples: [
            "Ransomware attacks on corporations",
            "Privacy concerns with social media",
          ],
        },
      },
    ],
  },
  {
    title: "Travel & Adventure",
    subtopics: [
      {
        title: "Solo Travel Experiences",
        description: {
          overview:
            "Share stories and insights about traveling alone, the freedom it brings, and lessons learned.",
          vocabulary: [
            "Backpacking",
            "Hostel Culture",
            "Digital Nomad",
            "Solo Adventure",
            "Cultural Immersion",
          ],
          starters: [
            "What was your most memorable solo travel experience?",
            "How did traveling alone change your perspective?",
            "What advice would you give to first-time solo travelers?",
          ],
          examples: [
            "Backpacking through Southeast Asia",
            "Road-tripping across the US",
            "Living as a digital nomad in Bali",
          ],
        },
      },
      {
        title: "Hidden Travel Gems",
        description: {
          overview:
            "Discuss underrated destinations that are worth visiting but often overlooked by tourists.",
          vocabulary: [
            "Off the Beaten Path",
            "Local Secrets",
            "Hidden Gems",
            "Undiscovered",
            "Authentic",
          ],
          starters: [
            "What's the most underrated place you've ever visited?",
            "How do you discover hidden gems when traveling?",
          ],
          examples: [
            "Small towns in Portugal",
            "Remote islands in Indonesia",
            "Lesser-known national parks",
          ],
        },
      },
      {
        title: "Cultural Experiences",
        description: {
          overview:
            "Talk about immersing yourself in different cultures, traditions, and local customs.",
          vocabulary: [
            "Cultural Exchange",
            "Traditions",
            "Local Customs",
            "Festival",
            "Heritage",
          ],
          starters: [
            "What cultural experience had the biggest impact on you?",
            "How do you respectfully engage with local cultures?",
          ],
          examples: [
            "Attending a traditional tea ceremony in Japan",
            "Celebrating Holi in India",
          ],
        },
      },
      {
        title: "Adventure Sports",
        description: {
          overview:
            "Discuss thrilling activities like skydiving, scuba diving, mountaineering, and more.",
          vocabulary: [
            "Adrenaline",
            "Extreme Sports",
            "Rock Climbing",
            "Paragliding",
            "Surfing",
          ],
          starters: [
            "What's the most adventurous thing you've done while traveling?",
            "Would you try skydiving or bungee jumping?",
          ],
          examples: [
            "Skydiving in New Zealand",
            "Scuba diving in the Great Barrier Reef",
          ],
        },
      },
      {
        title: "Budget Travel Tips",
        description: {
          overview:
            "Share strategies for traveling on a budget without sacrificing experience.",
          vocabulary: [
            "Budget Airline",
            "Couchsurfing",
            "Travel Hacks",
            "Free Walking Tours",
            "Hostels",
          ],
          starters: [
            "What's your best budget travel hack?",
            "How do you save money while traveling?",
          ],
          examples: [
            "Using credit card points for flights",
            "Staying in hostels and cooking your own meals",
          ],
        },
      },
    ],
  },
  {
    title: "Food & Cooking",
    subtopics: [
      {
        title: "Home Cooking Tips",
        description: {
          overview:
            "Discuss favorite recipes, cooking techniques, and tips for making delicious meals at home.",
          vocabulary: [
            "Mise en Place",
            "Sauté",
            "Braise",
            "Recipe",
            "Ingredient",
          ],
          starters: [
            "What's your go-to home-cooked meal?",
            "Do you have any cooking tips for beginners?",
          ],
          examples: [
            "Perfecting pasta carbonara",
            "Making fresh bread from scratch",
          ],
        },
      },
      {
        title: "Global Cuisines",
        description: {
          overview:
            "Explore different food cultures from around the world and what makes them unique.",
          vocabulary: [
            "Authentic",
            "Fusion",
            "Street Food",
            "Regional Dishes",
            "Culinary Tradition",
          ],
          starters: [
            "What's your favorite cuisine and why?",
            "Have you ever tried making authentic dishes from another country?",
          ],
          examples: ["Thai street food", "Italian regional specialties"],
        },
      },
      {
        title: "Dietary Lifestyles",
        description: {
          overview:
            "Discuss vegetarian, vegan, keto, paleo, and other dietary choices and their benefits.",
          vocabulary: ["Plant-Based", "Keto", "Paleo", "Gluten-Free", "Macros"],
          starters: [
            "Have you ever tried a specific diet? How did it go?",
            "What are the biggest challenges of your dietary lifestyle?",
          ],
          examples: [
            "Transitioning to a plant-based diet",
            "Benefits and challenges of keto",
          ],
        },
      },
      {
        title: "Food & Memory",
        description: {
          overview:
            "Talk about how certain foods connect to memories, traditions, and emotions.",
          vocabulary: [
            "Comfort Food",
            "Nostalgia",
            "Family Recipe",
            "Tradition",
            "Childhood",
          ],
          starters: [
            "What's a dish that brings back childhood memories?",
            "Do you have a family recipe that's been passed down?",
          ],
          examples: ["Grandma's apple pie", "Mom's Sunday roast"],
        },
      },
      {
        title: "Coffee & Tea Culture",
        description: {
          overview:
            "Discuss the rituals, flavors, and culture surrounding coffee and tea around the world.",
          vocabulary: [
            "Espresso",
            "French Press",
            "Matcha",
            "Oolong",
            "Pour Over",
          ],
          starters: [
            "Are you more of a coffee or tea person?",
            "What's your favorite way to brew coffee or tea?",
          ],
          examples: ["Japanese tea ceremonies", "Italian espresso culture"],
        },
      },
    ],
  },
  {
    title: "Health & Wellness",
    subtopics: [
      {
        title: "Mental Health",
        description: {
          overview:
            "Discuss mindfulness, stress management, therapy, and maintaining mental wellbeing.",
          vocabulary: [
            "Mindfulness",
            "Meditation",
            "Therapy",
            "Self-Care",
            "Anxiety",
          ],
          starters: [
            "What do you do to manage stress?",
            "How do you practice self-care?",
          ],
          examples: [
            "Daily meditation practices",
            "Journaling for mental clarity",
          ],
        },
      },
      {
        title: "Fitness Routines",
        description: {
          overview:
            "Share workout routines, fitness goals, and tips for staying active.",
          vocabulary: [
            "Strength Training",
            "Cardio",
            "HIIT",
            "Yoga",
            "CrossFit",
          ],
          starters: [
            "What's your current fitness routine?",
            "How do you stay motivated to work out?",
          ],
          examples: ["Morning yoga practice", "Building a home gym"],
        },
      },
      {
        title: "Nutrition & Diet",
        description: {
          overview:
            "Talk about healthy eating habits, meal planning, and nutritional science.",
          vocabulary: [
            "Macros",
            "Micronutrients",
            "Meal Prep",
            "Whole Foods",
            "Supplements",
          ],
          starters: [
            "How do you approach meal planning?",
            "What nutritional changes have made a difference for you?",
          ],
          examples: [
            "Tracking macronutrients",
            "Incorporating more vegetables",
          ],
        },
      },
      {
        title: "Sleep & Recovery",
        description: {
          overview:
            "Discuss the importance of sleep, recovery techniques, and rest strategies.",
          vocabulary: [
            "Sleep Hygiene",
            "REM Sleep",
            "Recovery",
            "Circadian Rhythm",
            "Rest Day",
          ],
          starters: [
            "How do you prioritize sleep in your routine?",
            "What helps you get better quality sleep?",
          ],
          examples: [
            "Creating a bedtime routine",
            "Using sleep tracking devices",
          ],
        },
      },
      {
        title: "Holistic Wellness",
        description: {
          overview:
            "Explore alternative medicine, natural remedies, and mind-body connections.",
          vocabulary: [
            "Holistic",
            "Acupuncture",
            "Herbal Medicine",
            "Mind-Body",
            "Ayurveda",
          ],
          starters: [
            "Have you tried any alternative wellness practices?",
            "What's your view on holistic health?",
          ],
          examples: [
            "Trying acupuncture for pain relief",
            "Using essential oils",
          ],
        },
      },
    ],
  },
  {
    title: "Arts & Creativity",
    subtopics: [
      {
        title: "Creative Writing",
        description: {
          overview:
            "Discuss storytelling, poetry, journaling, and the craft of writing.",
          vocabulary: [
            "Narrative",
            "Character Development",
            "Plot",
            "Voice",
            "Draft",
          ],
          starters: [
            "What inspires your writing?",
            "Do you have a writing routine?",
          ],
          examples: [
            "Writing morning pages",
            "Developing fictional characters",
          ],
        },
      },
      {
        title: "Visual Arts",
        description: {
          overview:
            "Talk about painting, drawing, photography, and other visual mediums.",
          vocabulary: [
            "Composition",
            "Palette",
            "Perspective",
            "Medium",
            "Exhibition",
          ],
          starters: [
            "What's your preferred artistic medium?",
            "How did you develop your artistic style?",
          ],
          examples: ["Oil painting landscapes", "Street photography"],
        },
      },
      {
        title: "Music & Sound",
        description: {
          overview:
            "Discuss making music, learning instruments, and the role of sound in creativity.",
          vocabulary: [
            "Melody",
            "Harmony",
            "Rhythm",
            "Composition",
            "Acoustics",
          ],
          starters: [
            "What instrument have you always wanted to learn?",
            "How does music influence your creativity?",
          ],
          examples: ["Learning guitar online", "Producing electronic music"],
        },
      },
      {
        title: "Performing Arts",
        description: {
          overview: "Talk about theater, dance, improv, and live performance.",
          vocabulary: [
            "Stage Presence",
            "Improvisation",
            "Choreography",
            "Performance",
            "Audience",
          ],
          starters: [
            "Have you ever performed on stage?",
            "What draws you to performing arts?",
          ],
          examples: ["Community theater productions", "Dance performances"],
        },
      },
      {
        title: "Creative Process",
        description: {
          overview:
            "Discuss how you approach creativity, overcome blocks, and find inspiration.",
          vocabulary: [
            "Inspiration",
            "Creative Block",
            "Flow State",
            "Process",
            "Iteration",
          ],
          starters: [
            "How do you overcome creative blocks?",
            "What's your creative process like?",
          ],
          examples: [
            "Morning creative rituals",
            "Finding inspiration in nature",
          ],
        },
      },
    ],
  },
];

const BACKEND_URL =
  import.meta.env.VITE_NODE_ENV === "production"
    ? import.meta.env.VITE_PROD_BACKEND_URL
    : import.meta.env.VITE_DEV_BACKEND_URL;

const socket = io(BACKEND_URL, {
  transports: ["websocket", "polling"], // ✅ Add polling as fallback
  withCredentials: true,
  // ✅ Add reconnection configuration
  reconnection: true,
  reconnectionAttempts: 10, // Try 10 times
  reconnectionDelay: 1000, // Wait 1s before first retry
  reconnectionDelayMax: 5000, // Max 5s between retries
  timeout: 20000, // Connection timeout
  autoConnect: true,
});

const Room = () => {
  const navigate = useNavigate();
  const { meetingName, roomPasscode } = useParams();
  const { user } = useAuth();
  const { username: userName, name: fullName } = user;

  const [seconds, setSeconds] = useState(0);
  const isDesktop = useIsDesktop();
  const [showLeaveDialog, setShowLeaveDialog] = useState(false);
  const [showEnableAudioDialog, setShowEnableAudioDialog] = useState(false);
  const [showRoomDetails, setShowRoomDetails] = useState(false);
  const [showDesktopOnlyModal, setShowDesktopOnlyModal] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isHost, setIsHost] = useState(false);

  const [participantCount, setParticipantCount] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isJoining, setIsJoining] = useState(true);
  const [participants, setParticipants] = useState<any[]>([]);
  const [meetingStatus, setMeetingStatus] = useState("checking");
  const [meetingLeave, setMeetingLeave] = useState(false);

  const baseURL = useSelector((state: RootState) => state.baseUrl.url);

  const clientRef = useRef(ZoomVideo.createClient());
  const [stream, setStream] = useState<any>(null);
  const [recordingClient, setRecordingClient] = useState<any>(null);
  const timerRef = useRef<any>(null);

  const api = useAxios();
  const [audioStarted, setAudioStarted] = useState(false);
  const [isInitializingAudio, setIsInitializingAudio] = useState(false);
  const [currentZoomUserId, setCurrentZoomUserId] = useState<any>(null);
  const [completedTopics, setCompletedTopics] = useState<number[]>([]);

  const [currentTopicIndex, setCurrentTopicIndex] = useState(0);
  const [selectedSubtopicIndex, setSelectedSubtopicIndex] = useState<
    number | null
  >(null);
  const [meetingStartTime, setMeetingStartTime] = useState<number | null>(null);
  const [rejoining, setRejoining] = useState(false);
  const [pariticpantAudioMute, setParticipantAudioMute] = useState(false);

  const roomId = meetingName || "R-8492";
  const roomPassword = roomPasscode || "SECURE-2847";

  const isHostRef = useRef(isHost);
  const isRecordingRef = useRef(isRecording);
  const { isOnline, hasInternet } = useOnline();

  useEffect(() => {
    let reconnectAttempts = 0;
    const maxReconnectAttempts = 5;

    socket.on("connect", () => {
      console.log("✅ Socket connected:", socket.id);
      reconnectAttempts = 0;

      if (meetingStatus === "active" && meetingName) {
        console.log("🔄 Reconnected - rejoining meeting...");

        socket.emit("join-meeting", {
          meetingName,
          userName,
          isHost,
          timestamp: Date.now(),
          sessionID: clientRef.current?.getSessionInfo()?.sessionId,
          jwtToken: "",
          isReconnect: true,
        });

        socket.emit("request-meeting-time", { meetingName });
        socket.emit("request-topic-state", { meetingName });

        toast({
          title: "Reconnected",
          description: "Successfully reconnected to the meeting.",
        });
      }
    });

    socket.on("connect_error", (error) => {
      console.error("❌ Socket connection error:", error);
      reconnectAttempts++;

      if (reconnectAttempts >= maxReconnectAttempts) {
        toast({
          title: "Connection failed",
          description:
            "Unable to connect to the server. Please check your internet connection.",
          variant: "destructive",
        });
      }
    });

    socket.on("reconnect_attempt", (attemptNumber) => {
      console.log(`🔄 Reconnection attempt ${attemptNumber}...`);

      if (meetingStatus === "active") {
        toast({
          title: "Reconnecting...",
          description: `Attempt ${attemptNumber} of ${maxReconnectAttempts}`,
        });
      }
    });

    socket.on("reconnect", (attemptNumber) => {
      console.log(`✅ Reconnected after ${attemptNumber} attempts`);
      reconnectAttempts = 0;
    });

    // socket.on("reconnect_failed", () => {
    //   console.error("❌ Failed to reconnect after all attempts");

    //   if (meetingStatus === "active") {
    //     toast({
    //       title: "Connection lost",
    //       description: "Unable to reconnect. Returning to home...",
    //       variant: "destructive",
    //     });

    //     setTimeout(async () => {
    //       try {
    //         await leaveMeetingCleanup();
    //       } catch (error) {
    //         console.error("Error during cleanup:", error);
    //       }
    //       navigate("/");
    //     }, 2000);
    //   }
    // });

    // socket.on("disconnect", (reason) => {
    //   console.log("🔌 Socket disconnected:", reason);

    //   if (meetingStatus === "active") {
    //     // Different handling based on disconnect reason
    //     if (reason === "io server disconnect") {
    //       // Server initiated disconnect - likely kicked out
    //       toast({
    //         title: "Disconnected",
    //         description: "You were disconnected from the meeting.",
    //         variant: "destructive",
    //       });

    //       setTimeout(async () => {
    //         await leaveMeetingCleanup();
    //         navigate("/");
    //       }, 2000);
    //     } else if (reason === "transport close" || reason === "ping timeout") {
    //       // Network issue - will auto-reconnect
    //       toast({
    //         title: "Connection lost",
    //         description: "Attempting to reconnect...",
    //       });
    //     }
    //   }
    // });

    return () => {
      socket.off("connect");
      socket.off("connect_error");
      socket.off("reconnect_attempt");
      socket.off("reconnect");
      // socket.off("reconnect_failed");
      // socket.off("disconnect");
    };
  }, [meetingStatus, meetingName, userName, isHost]);

  useEffect(() => {
    isHostRef.current = isHost;
  }, [isHost]);

  useEffect(() => {
    isRecordingRef.current = isRecording;
  }, [isRecording]);

  useEffect(() => {
    if (!isDesktop) {
      setShowDesktopOnlyModal(true);
    }
  }, [isDesktop]);

  useEffect(() => {
    if (!isJoining && meetingStatus === "active" && meetingStartTime) {
      const updateTimer = () => {
        const elapsed = Math.floor((Date.now() - meetingStartTime) / 1000);
        setSeconds(elapsed);
      };

      updateTimer();

      timerRef.current = setInterval(updateTimer, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isJoining, meetingStatus, meetingStartTime]);

  const checkingHostStatus = async () => {
    try {
      const response = await api.post(
        `${baseURL}/v1/zoom/meeting/checkHostStatus`,
        {
          sessionName: meetingName,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setIsHost(response.data.isHost);
      return response.data.isHost;
    } catch (err) {
      toast({
        title: "Failed to join meeting",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
      return null;
    }
  };

  useEffect(() => {
    if (meetingStatus !== "checking") {
      return;
    }
    const joinMeeting = async () => {
      try {
        const client = clientRef.current;

        const checkHost = await checkingHostStatus();

        if (checkHost === null) {
          navigate("/");
          return;
        }

        // const participantCheck = await new Promise<{
        //   success: boolean;
        //   participantCount: number;
        //   maxParticipants: number;
        //   canJoin: boolean;
        // }>((resolve) => {
        //   socket.emit("check-can-join", { meetingName }, (response: any) => {
        //     resolve(response);
        //   });
        // });

        // if (!participantCheck.success || !participantCheck.canJoin) {
        //   toast({
        //     title: "Meeting is full",
        //     description: `This meeting already has ${participantCheck.participantCount} participants. Maximum ${participantCheck.maxParticipants} participants allowed.`,
        //     variant: "destructive",
        //   });
        //   console.log(`❌ Cannot join: Meeting is full`);

        //   setTimeout(() => {
        //     navigate("/");
        //   }, 2000);

        //   return;
        // }

        // console.log(
        //   `✅ Meeting has space: ${participantCheck.participantCount}/${participantCheck.maxParticipants} participants`
        // );

        const response = await api.post(
          `${baseURL}/v1/zoomSDKAuth/signature/`,
          {
            sessionName: meetingName,
            role: checkHost ? 1 : 0,
            cloud_recording_option: 1,
            cloud_recording_election: 1,
            passcode: roomPasscode,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        const { signature } = response.data;

        const hasSharedArrayBuffer =
          typeof SharedArrayBuffer !== "undefined" &&
          window.crossOriginIsolated;

        console.log("SharedArrayBuffer available:", hasSharedArrayBuffer);

        await client.init("en-US", "Global", {
          enforceMultipleVideos: false,
          patchJsMedia: hasSharedArrayBuffer,
          leaveOnPageUnload: true,
        });

        await client.join(meetingName, signature, fullName);

        const mediaStream = client.getMediaStream();
        setStream(mediaStream);

        const recording = client.getRecordingClient();
        setRecordingClient(recording);

        const currentUser = client.getCurrentUserInfo();
        setCurrentZoomUserId(currentUser.userId);

        const sessionInfo = client.getSessionInfo();
        const sessionID = sessionInfo.sessionId;

        socket.emit("join-meeting", {
          meetingName,
          userName,
          isHost: checkHost,
          timestamp: Date.now(),
          sessionID: sessionID,
          jwtToken: signature,
        });

        socket.emit("request-topic-state", { meetingName });

        setIsJoining(false);
        setMeetingStatus("active");
        setRejoining(false);
        toast({
          title: "Successfully joined meeting",
          variant: "default",
        });
      } catch (error) {
        console.error("Error joining meeting:", error);
        toast({
          title: "Failed to join meeting",
          description: "Please check your credentials and try again.",
          variant: "destructive",
        });
        navigate("/");
      }
    };

    if (meetingName && userName && meetingStatus === "checking") {
      joinMeeting();
    }

    return () => {
      if (meetingStatus != "checking" && clientRef.current) {
        leaveMeetingCleanup();
      }
    };
  }, [meetingName, userName, meetingStatus]);

  const startAudioOnFirstInteraction = async () => {
    if (audioStarted || !stream || isInitializingAudio) return;

    setIsInitializingAudio(true);

    const hasSharedArrayBuffer =
      typeof SharedArrayBuffer !== "undefined" && window.crossOriginIsolated;

    try {
      await stream.startAudio({
        backgroundNoiseSuppression: true,
        hiBitrate: true,
      });

      console.log("✅ Audio started successfully");
      if (hasSharedArrayBuffer) {
        console.log("✅ Background noise suppression enabled");
      }
      setAudioStarted(true);
    } catch (audioError) {
      console.warn(
        "Audio start with noise suppression failed, trying without:",
        audioError
      );
    } finally {
      setIsInitializingAudio(false);
    }
  };

  useEffect(() => {
    if (stream && !audioStarted && meetingStatus === "active") {
      setShowEnableAudioDialog(true);
    }
  }, [stream, meetingStatus, audioStarted]);

  // useEffect(() => {
  //   const client = clientRef.current;

  //   if (!isJoining && meetingStatus === "active") {
  //     const handleActiveSpeaker = (payload: any) => {
  //       payload.forEach((element: any) => {
  //         const activeSpeakerId = element.userId;
  //         setParticipants((prev) =>
  //           prev.map((p) => ({
  //             ...p,
  //             isSpeaking: p.zoomUserId === activeSpeakerId,
  //           }))
  //         );
  //       });
  //     };

  //     const handleUserRemoved = async (users: any) => {
  //       const leftUser = users[0];
  //       if (isRecording && !isHost) {
  //         console.log("🛑 Stopping recording due to participant leaving");
  //         setIsRecording(false);
  //       }
  //       if (isRecording && isHost) {
  //         console.log("🛑 Stopping recording due to participant leaving");

  //         await api.post(
  //           `${baseURL}/v1/zoom/recording/participant-left`,
  //           {
  //             meetingName,
  //           },
  //           { withCredentials: true }
  //         );

  //         stopRecordingDueToLeave(leftUser?.displayName);
  //       }
  //       updateParticipants();
  //     };

  //     const updateParticipants = () => {
  //       const users = client.getAllUser();
  //       setParticipantCount(users.length);

  //       const mappedParticipants = users.map((user: any, index: number) => ({
  //         id: user.userId,
  //         name: user.displayName || `Participant ${index + 1}`,
  //         zoomUserId: user.userId,
  //         type: user.userId === currentZoomUserId ? "user" : "speaker",
  //         isCurrentUser: user.userId === currentZoomUserId,
  //         isSpeaking: false,
  //       }));

  //       setParticipants(mappedParticipants);
  //     };

  //     client.on("active-speaker", handleActiveSpeaker);
  //     client.on("user-added", updateParticipants);
  //     client.on("user-removed", handleUserRemoved);
  //     client.on("user-updated", updateParticipants);

  //     updateParticipants();

  //     return () => {
  //       client.off("active-speaker", handleActiveSpeaker);
  //       client.off("user-added", updateParticipants);
  //       client.off("user-removed", handleUserRemoved);
  //       client.off("user-updated", updateParticipants);
  //     };
  //   }
  // }, [isJoining, isRecording, meetingStatus, currentZoomUserId]);

  useEffect(() => {
    const client = clientRef.current;

    if (!isJoining && meetingStatus === "active") {
      const handleActiveSpeaker = (payload: any) => {
        payload.forEach((element: any) => {
          const activeSpeakerId = element.userId;
          setParticipants((prev) =>
            prev.map((p) => ({
              ...p,
              isSpeaking: p.zoomUserId === activeSpeakerId,
            }))
          );
        });
      };

      const handleUserRemoved = async (users: any) => {
        const leftUser = users[0];

        if (isRecording && !isHost) {
          console.log("🛑 Stopping recording due to participant leaving");
          setIsRecording(false);
        }

        if (isRecording && isHost) {
          console.log("🛑 Stopping recording due to participant leaving");

          await api.post(
            `${baseURL}/v1/zoom/recording/participant-left`,
            {
              meetingName,
            },
            { withCredentials: true }
          );

          stopRecordingDueToLeave(leftUser?.displayName);
        }

        updateParticipants();
      };

      const updateParticipants = () => {
        const users = client.getAllUser();
        setParticipantCount(users.length);

        const mappedParticipants = users.map((user: any, index: number) => ({
          id: user.userId,
          name: user.displayName || `Participant ${index + 1}`,
          zoomUserId: user.userId,
          type: user.userId === currentZoomUserId ? "user" : "speaker",
          isCurrentUser: user.userId === currentZoomUserId,
          isSpeaking: false,
        }));

        setParticipants(mappedParticipants);
      };

      const handleConnectionChange = (payload: any) => {
        updateParticipants();
      };

      const handlePeerVideoStateChange = (payload: any) => {
        updateParticipants();
      };

      client.on("active-speaker", handleActiveSpeaker);
      client.on("user-added", updateParticipants);
      client.on("user-removed", handleUserRemoved);
      client.on("user-updated", updateParticipants);
      client.on("connection-change", handleConnectionChange);
      client.on("peer-video-state-change", handlePeerVideoStateChange);

      updateParticipants();

      return () => {
        client.off("active-speaker", handleActiveSpeaker);
        client.off("user-added", updateParticipants);
        client.off("user-removed", handleUserRemoved);
        client.off("user-updated", updateParticipants);
        client.off("connection-change", handleConnectionChange);
        client.off("peer-video-state-change", handlePeerVideoStateChange);
      };
    }
  }, [isJoining, isRecording, meetingStatus, currentZoomUserId, isHost]);

  useEffect(() => {
    socket.on("meeting-time-sync", (data: { startTime: number }) => {
      setMeetingStartTime(data.startTime);
    });

    socket.on("connect", () => {
      if (meetingName) {
        socket.emit("request-meeting-time", { meetingName });
      }
    });
    socket.on("recording-started", (data) => {
      setIsRecording(true);
    });

    socket.on("recording-stopped", (data) => {
      setIsRecording(false);
    });

    socket.on(
      "topic-changed",
      (data: { topicIndex: number; subtopicIndex: number | null }) => {
        setCurrentTopicIndex(data.topicIndex);
        setSelectedSubtopicIndex(data.subtopicIndex);
      }
    );

    socket.on(
      "subtopic-selected",
      (data: { topicIndex: number; subtopicIndex: number | null }) => {
        setCurrentTopicIndex(data.topicIndex);
        setSelectedSubtopicIndex(data.subtopicIndex);
      }
    );

    socket.on(
      "current-topic-state",
      (data: {
        topicIndex: number;
        subtopicIndex: number | null;
        completedTopics: number[];
      }) => {
        setCurrentTopicIndex(data.topicIndex);
        setSelectedSubtopicIndex(data.subtopicIndex);
        setCompletedTopics(data.completedTopics);
      }
    );

    socket.on("host-disconnected-rejoin-required", async (data) => {
      if (!isHost) {
        toast({
          title: "Host disconnected",
          description: "Reconnecting to meeting...",
        });
        setRejoining(true);
        const client = clientRef.current;

        if (!client) {
          console.warn("Client not initialized during cleanup");
          return;
        }

        const sessionInfo = client.getSessionInfo();
        if (!sessionInfo) {
          console.warn("No active session during cleanup");
          return;
        }

        if (stream) {
          try {
            await stream.stopAudio();
          } catch (audioError) {
            console.warn("Error stopping audio:", audioError);
          }
        }

        setAudioStarted(false);
        setIsInitializingAudio(false);
        setIsMuted(false);
        setIsRecording(false);
        setStream(null);
        setRecordingClient(null);
        await client.leave();
        setMeetingStatus("checking");
      }
    });

    socket.on("audio-unmute-during-recording", () => {
      if (isHostRef.current) {
        setParticipantAudioMute(false);
      }
    });

    socket.on("audio-mute-during-recording", async (data) => {
      if (isHostRef.current) {
        setParticipantAudioMute(true);
      }
    });

    // socket.on("disconnect", async (reason) => {
    //   setIsRecording(false);
    //   window.location.reload();
    // });

    return () => {
      socket.off("recording-started");
      socket.off("recording-stopped");
      socket.off("meeting-time-sync");
      socket.off("connect");
      socket.off("topic-changed");
      socket.off("subtopic-selected");
      socket.off("current-topic-state");
      socket.off("host-disconnected-rejoin-required");
      socket.off("audio-mute-during-recording");
      // socket.off("disconnect");
    };
  }, [meetingName]);

  const stopRecordingDueToLeave = async (leftUserName: string) => {
    try {
      if (!recordingClient) {
        console.warn("Recording client not available");
        return;
      }

      if (isRecording) {
        await recordingClient.stopCloudRecording();
        setIsRecording(false);
        console.log(
          "🛑 Recording stopped because participant left:",
          leftUserName
        );
      }
    } catch (error) {
      console.error("Error stopping recording:", error);
      setIsRecording(false);
    }
  };

  const leaveMeetingCleanup = async () => {
    try {
      const client = clientRef.current;

      if (!client) {
        console.warn("Client not initialized during cleanup");
        return;
      }

      const sessionInfo = client.getSessionInfo();
      if (!sessionInfo) {
        console.warn("No active session during cleanup");
        return;
      }

      socket.emit("leave-meeting", { meetingName, userName });

      if (stream) {
        try {
          await stream.stopAudio();
        } catch (audioError) {
          console.warn("Error stopping audio:", audioError);
        }
      }

      await client.leave();
    } catch (error) {
      console.error("Error during cleanup:", error);
    }
  };

  const disableSession = async () => {
    try {
      const response = await api.post(
        `${baseURL}/v1/zoom/meeting/leaveMeeting/`,
        {
          sessionName: meetingName,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (err) {
      toast({
        title: "Failed to leave meeting",
        description: "Try again.",
        variant: "destructive",
      });
      return null;
    }
  };

  const leaveMeeting = async () => {
    try {
      if (meetingStatus !== "active") {
        navigate("/");
        return;
      }
      if (isRecording && isHost) {
        await api.post(
          `${baseURL}/v1/zoom/recording/participant-left`,
          {
            meetingName,
          },
          { withCredentials: true }
        );
        await stopRecordingDueToLeave(fullName);
      }
      setMeetingLeave(true);
      setMeetingStatus("leaving");
      await disableSession();
      await leaveMeetingCleanup();
      setMeetingLeave(false);
      navigate("/");
    } catch (error) {
      setMeetingLeave(false);
      console.error("Error leaving meeting:", error);
      navigate("/");
    }
  };

  const toggleMute = async () => {
    if (!stream) {
      toast({
        title: "Audio not available",
        description: "Please enable audio first.",
        variant: "destructive",
      });
      return;
    }

    if (!audioStarted) {
      toast({
        title: "Audio not started",
        description: "Please enable audio first.",
        variant: "destructive",
      });
      setShowEnableAudioDialog(true);
      return;
    }
    try {
      if (stream) {
        if (isMuted) {
          socket.emit("audio-unmute-during-recording", {
            meetingName,
            stoppedBy: userName,
            timestamp: new Date().toISOString(),
          });
          await stream.unmuteAudio();
        } else {
          socket.emit("audio-mute-during-recording", {
            meetingName,
            stoppedBy: userName,
            timestamp: new Date().toISOString(),
          });
          if (isRecording) {
            await api.post(
              `${baseURL}/v1/zoom/recording/participant-left`,
              {
                meetingName,
              },
              { withCredentials: true }
            );
          }
          await stream.muteAudio();
        }
        setIsMuted(!isMuted);
      }
    } catch (error) {
      console.error("Error toggling mute:", error);
    }
  };

  const toggleRecording = async () => {
    if (participantCount <= 1) {
      toast({
        title: "Permission denied",
        description: "Two participants are required to start meeting.",
        variant: "destructive",
      });
      return;
    }
    if (!isHost) {
      toast({
        title: "Permission denied",
        description: "Only the host can control recording.",
        variant: "destructive",
      });
      return;
    }

    if (isMuted) {
      toast({
        title: "Permission denied",
        description: "Your audio is mute unmute it first",
        variant: "destructive",
      });
      return;
    }

    if (pariticpantAudioMute) {
      toast({
        title: "Permission denied",
        description: "One of the participant's audio is mute",
        variant: "destructive",
      });
      return;
    }

    try {
      if (recordingClient) {
        if (isRecording) {
          setCompletedTopics((prev) => [...prev, currentTopicIndex]);

          const newTopicIndex =
            currentTopicIndex < TOPICS.length - 1
              ? currentTopicIndex + 1
              : currentTopicIndex;

          if (currentTopicIndex < TOPICS.length - 1) {
            setCurrentTopicIndex((prev) => prev + 1);
            setSelectedSubtopicIndex(null);
          }

          socket.emit("change-topic", {
            meetingName,
            topicIndex: newTopicIndex,
            subtopicIndex: null,
            completedTopics: [...completedTopics, currentTopicIndex],
            changedBy: userName,
          });

          await recordingClient.stopCloudRecording();
          setIsRecording(false);

          await api.post(
            `${baseURL}/v1/zoom/recording/stop`,
            {
              meetingName,
              participantCount: participants.length,
            },
            { withCredentials: true }
          );

          socket.emit("recording-stopped", {
            meetingName,
            stoppedBy: userName,
            timestamp: new Date().toISOString(),
          });
        } else {
          if (selectedSubtopicIndex !== null) {
            await recordingClient.startCloudRecording();
            setIsRecording(true);

            await api.post(
              `${baseURL}/v1/zoom/recording/start`,
              {
                meetingName,
                participantCount: participants.length,
              },
              { withCredentials: true }
            );

            socket.emit("recording-started", {
              meetingName,
              startedBy: userName,
              timestamp: new Date().toISOString(),
            });
          } else {
            toast({
              title: "Select a sub-topic first",
              description:
                "Please choose a sub-topic before starting the recording.",
              variant: "destructive",
            });
            return;
          }
        }
      }
    } catch (error: any) {
      console.error("Error toggling recording:", error);
      toast({
        title: "Recording error",
        description: error.message || "Failed to toggle recording.",
        variant: "destructive",
      });
    }
  };

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(secs).padStart(2, "0")}`;
  };

  const handleSubtopicSelect = (index: number) => {
    if (!isHost) {
      toast({
        title: "Permission denied",
        description: "Only the host can select topics.",
        variant: "destructive",
      });
      return;
    }

    if (index === -1) {
      setSelectedSubtopicIndex(null);
    } else {
      setSelectedSubtopicIndex(index);
    }

    socket.emit("select-subtopic", {
      meetingName,
      topicIndex: currentTopicIndex,
      subtopicIndex: index === -1 ? null : index,
      selectedBy: userName,
    });
  };

  const handleCopy = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      toast({
        title: "Copied to clipboard",
        description: `${field} has been copied successfully.`,
      });
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleShareLink = async () => {
    const shareLink = `${window.location.origin}/join/${encodeURIComponent(
      meetingName
    )}/${encodeURIComponent(roomPassword)}`;

    try {
      await navigator.clipboard.writeText(shareLink);
      setCopiedField("Share Link");
      toast({
        title: "Link copied to clipboard",
        description: "Share this link to invite participants.",
      });
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy link",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isJoining || meetingStatus === "checking") {
    return (
      <div className="p-6 md:p-10 lg:p-14 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-xl font-semibold text-gray-800">
            {rejoining ? "Rejoining Meeting..." : "Joining meeting..."}
          </p>
        </div>
      </div>
    );
  }

  if (meetingLeave || meetingStatus === "leaving") {
    return (
      <div className="p-6 md:p-10 lg:p-14 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-xl font-semibold text-gray-800">
            Leaving meeting...
          </p>
        </div>
      </div>
    );
  }

  if (!isOnline)
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold">503</h1>
          <p className="mb-4 text-xl text-muted-foreground">
            Oops! No internet connection
          </p>
          <button
            className="text-primary underline hover:text-primary/90"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );

  if (!hasInternet)
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold">503</h1>
          <p className="mb-4 text-xl text-muted-foreground">
            Oops! No internet connection
          </p>
          <button
            className="text-primary underline hover:text-primary/90"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="h-14 md:h-16 border-b border-border flex items-center px-4 md:px-8 bg-background">
        <div className="flex items-center gap-2 md:gap-3">
          {isRecording && (
            <>
              <div className="flex items-center gap-1.5 md:gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FF2D55] animate-pulse" />
                <span className="text-[9px] md:text-[10px] font-medium text-[#FF2D55] tracking-[0.1em] uppercase">
                  Live
                </span>
              </div>
              <div className="w-px h-3 md:h-4 bg-border/60" />
            </>
          )}
          <span className="text-xl md:text-2xl font-medium tabular-nums">
            {formatTime(seconds)}
          </span>
          {isRecording && (
            <>
              <div className="hidden sm:block w-px h-4 bg-border/60" />
              <span className="hidden sm:inline text-[13px] font-medium text-[#FF2D55]">
                Recording in progress
              </span>
            </>
          )}
        </div>

        <div className="ml-auto flex items-center gap-2 md:gap-4">
          {isHost && (
            <button
              onClick={() => setShowRoomDetails(true)}
              className="flex items-center gap-1.5 md:gap-2.5 px-3 md:px-4 py-1.5 md:py-2 rounded-lg bg-background hover:bg-muted border border-border hover:border-foreground/20 hover:text-black [&_svg]:hover:text-black transition-all"
            >
              <KeyRound
                className="w-[16px] h-[16px] md:w-[18px] md:h-[18px] text-primary"
                strokeWidth={1.75}
              />
              <span className="hidden sm:inline text-[13px] font-medium text-foreground">
                Room Details
              </span>
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row min-h-0">
        <div className="flex-1 flex items-center justify-center p-4 md:p-6 lg:p-8 bg-background min-w-0">
          {participantCount === 1 && (
            <div className="w-full max-w-2xl lg:max-w-3xl">
              {participants.map((participant) => (
                <ParticipantCard
                  key={participant.id}
                  name={participant.name}
                  initials={
                    participant.isCurrentUser
                      ? "You"
                      : participant.name.substring(0, 2).toUpperCase()
                  }
                  isSpeaking={participant.isSpeaking}
                  className="min-h-[300px] md:min-h-[400px] lg:min-h-[480px]"
                />
              ))}
            </div>
          )}
          {participantCount > 1 && (
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 lg:gap-5 max-w-7xl">
              {participants.map((participant) => (
                <ParticipantCard
                  key={participant.id}
                  name={participant.name}
                  initials={
                    participant.isCurrentUser
                      ? "You"
                      : participant.name.substring(0, 2).toUpperCase()
                  }
                  isSpeaking={participant.isSpeaking}
                  className="min-h-[260px] md:min-h-[360px] lg:min-h-[420px]"
                />
              ))}
            </div>
          )}
        </div>

        <div className="hidden lg:block w-px bg-border flex-shrink-0" />

        <TopicPanel
          topics={TOPICS}
          isHost={isHost}
          currentTopicIndex={currentTopicIndex}
          selectedSubtopicIndex={selectedSubtopicIndex}
          onSubtopicSelect={handleSubtopicSelect}
          completedTopics={completedTopics}
          className="lg:w-[380px] xl:w-[420px] border-t lg:border-t-0"
        />
      </div>

      <ControlBar
        isHost={isHost}
        isRecording={isRecording}
        isMuted={isMuted}
        onToggleRecording={toggleRecording}
        onToggleMute={toggleMute}
        onLeave={() => setShowLeaveDialog(true)}
        stream={stream}
      />

      <AlertDialog open={showLeaveDialog} onOpenChange={setShowLeaveDialog}>
        <AlertDialogContent className="border-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg font-medium">
              Leave Meeting?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-[13px] text-muted-foreground">
              {isRecording
                ? "Your recording will be saved and you'll return to the explore page."
                : "Are you sure you want to leave this meeting?"}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="h-9 text-[13px]">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={leaveMeeting}
              className="h-9 bg-primary text-primary-foreground hover:bg-primary/90 text-[13px]"
            >
              Leave Meeting
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={showEnableAudioDialog}
        onOpenChange={setShowEnableAudioDialog}
      >
        <AlertDialogContent className="border-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg font-medium">
              Enable Audio
            </AlertDialogTitle>
            <AlertDialogDescription className="text-[13px] text-muted-foreground">
              Without this audio will not work.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={async () => {
                await startAudioOnFirstInteraction();
                setShowEnableAudioDialog(false);
              }}
              className="h-9 bg-primary text-primary-foreground hover:bg-primary/90 text-[13px]"
            >
              Enable Audio
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={showRoomDetails} onOpenChange={setShowRoomDetails}>
        <DialogContent className="max-w-md bg-background border-border rounded-lg p-0">
          <DialogTitle hidden={true} />
          <DialogDescription hidden={true} />
          <div className="flex items-center justify-between px-6 py-5 border-b border-border">
            <h2 className="text-lg font-medium tracking-tight">Room Details</h2>
            <button
              onClick={() => setShowRoomDetails(false)}
              className="w-8 h-8 rounded-lg hover:bg-muted/50 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-muted-foreground" strokeWidth={1.75} />
            </button>
          </div>

          <div className="px-6 py-5 space-y-5">
            <div>
              <p className="text-[11px] text-muted-foreground uppercase tracking-wide font-medium mb-2">
                Room ID
              </p>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-muted/20 rounded-lg border border-border px-4 py-3">
                  <p className="text-[15px] font-medium text-foreground">
                    {roomId}
                  </p>
                </div>
                <button
                  onClick={() => handleCopy(roomId, "Room ID")}
                  className="w-9 h-9 rounded-lg border border-border hover:bg-muted/50 flex items-center justify-center transition-colors flex-shrink-0"
                  aria-label="Copy Room ID"
                >
                  {copiedField === "Room ID" ? (
                    <Check className="w-4 h-4 text-green-600" strokeWidth={2} />
                  ) : (
                    <Copy
                      className="w-4 h-4 text-muted-foreground"
                      strokeWidth={1.75}
                    />
                  )}
                </button>
              </div>
            </div>

            <div>
              <p className="text-[11px] text-muted-foreground uppercase tracking-wide font-medium mb-2">
                Room Password
              </p>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-muted/20 rounded-lg border border-border px-4 py-3">
                  <p className="text-[15px] font-medium text-foreground">
                    {roomPassword}
                  </p>
                </div>
                <button
                  onClick={() => handleCopy(roomPassword, "Room Password")}
                  className="w-9 h-9 rounded-lg border border-border hover:bg-muted/50 flex items-center justify-center transition-colors flex-shrink-0"
                  aria-label="Copy Room Password"
                >
                  {copiedField === "Room Password" ? (
                    <Check className="w-4 h-4 text-green-600" strokeWidth={2} />
                  ) : (
                    <Copy
                      className="w-4 h-4 text-muted-foreground"
                      strokeWidth={1.75}
                    />
                  )}
                </button>
              </div>
            </div>

            <div>
              <p className="text-[11px] text-muted-foreground uppercase tracking-wide font-medium mb-2">
                Share Link
              </p>
              <button
                onClick={handleShareLink}
                className="w-full bg-primary text-primary-foreground rounded-lg px-4 py-3 flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
              >
                <Link className="w-4 h-4" strokeWidth={1.75} />
                <span className="text-[13px] font-medium">
                  {copiedField === "Share Link"
                    ? "Link Copied!"
                    : "Copy Share Link"}
                </span>
              </button>
            </div>

            <div className="pt-2">
              <p className="text-[12px] text-muted-foreground leading-relaxed">
                Share these details with participants to allow them to join this
                room.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <DesktopOnlyModal
        open={showDesktopOnlyModal}
        onOpenChange={(open) => {
          setShowDesktopOnlyModal(open);
          if (!open && !isDesktop) {
            // navigate("/");
          }
        }}
      />
    </div>
  );
};

export default Room;
