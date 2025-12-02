import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  ArrowRight,
  X,
  Sparkles,
  Rocket,
  Heart,
  Dumbbell,
  BookOpen,
  ChefHat,
  Plane,
  Cpu,
  Shirt,
  Music,
  Film,
  Gamepad2,
  PawPrint,
  TrendingUp,
  Brain,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SwipeableDialog } from "@/components/SwipeableDialog";
import { Label } from "@/components/ui/label";
import { PageWrapper, PageSection } from "@/components/PageWrapper";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import useAxios from "@/utils/useAxios";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import { DesktopOnlyModal } from "@/components/DesktopOnlyModal";

const TOPICS = [
  {
    id: "skincare",
    title: "Skincare Routines",
    description: "Share tips on products and routines",
    icons: [Sparkles],
    keywords: ["Products", "Routines", "Skin Health", "Beauty"],
    subtopics: [
      "Morning routines",
      "Night routines",
      "Product recommendations",
      "Skin types",
      "Anti-aging tips",
    ],
    starters: [
      "What's your current skincare routine?",
      "Have you tried any new products recently?",
      "What skin concerns are you dealing with?",
      "Do you prefer natural or clinical products?",
    ],
    vocabulary: ["serums", "exfoliation", "SPF", "hydration", "retinol"],
    example: "I've been really into double cleansing lately—have you tried it?",
  },
  {
    id: "startups",
    title: "Startup Ideas",
    description: "Discuss entrepreneurship and innovation",
    icons: [Rocket],
    keywords: ["Business", "Innovation", "Funding", "Growth", "Strategy"],
    subtopics: [
      "Business models",
      "Fundraising",
      "Product-market fit",
      "Team building",
      "Scaling strategies",
    ],
    starters: [
      "What startup ideas are you exploring?",
      "Have you thought about your target market?",
      "What's your biggest challenge right now?",
      "Are you bootstrapping or seeking investment?",
    ],
    vocabulary: ["MVP", "pivot", "burn rate", "runway", "valuation"],
    example: "I'm working on a SaaS tool for remote teams—what about you?",
  },
  {
    id: "relationships",
    title: "Relationships",
    description: "Talk about dating and connections",
    icons: [Heart],
    keywords: ["Dating", "Friendships", "Communication", "Trust", "Love"],
    subtopics: [
      "Dating advice",
      "Long-term relationships",
      "Friendship dynamics",
      "Communication styles",
      "Conflict resolution",
    ],
    starters: [
      "What do you value most in a relationship?",
      "How do you maintain healthy boundaries?",
      "What's your love language?",
      "Have you tried any new ways to meet people?",
    ],
    vocabulary: [
      "boundaries",
      "vulnerability",
      "attachment styles",
      "compatibility",
    ],
    example:
      "I've been thinking a lot about what makes friendships last over time.",
  },
  {
    id: "fitness",
    title: "Fitness & Wellness",
    description: "Share workout routines and health tips",
    icons: [Dumbbell],
    keywords: ["Exercise", "Nutrition", "Wellness", "Goals", "Health"],
    subtopics: [
      "Workout routines",
      "Nutrition plans",
      "Recovery strategies",
      "Fitness goals",
      "Mental wellness",
    ],
    starters: [
      "What does your workout routine look like?",
      "Are you training for anything specific?",
      "What's your approach to nutrition?",
      "How do you stay motivated?",
    ],
    vocabulary: [
      "macros",
      "progressive overload",
      "HIIT",
      "mobility",
      "recovery",
    ],
    example:
      "I just started doing strength training three times a week—it's been amazing.",
  },
  {
    id: "books",
    title: "Book Recommendations",
    description: "Discuss your favorite reads",
    icons: [BookOpen],
    keywords: ["Reading", "Literature", "Authors", "Genres", "Reviews"],
    subtopics: [
      "Fiction vs non-fiction",
      "Recent reads",
      "Classic literature",
      "Book clubs",
      "Reading habits",
    ],
    starters: [
      "What are you reading right now?",
      "What's the best book you've read this year?",
      "Do you prefer fiction or non-fiction?",
      "Any authors you can't stop recommending?",
    ],
    vocabulary: [
      "plot",
      "character development",
      "prose",
      "themes",
      "narrative",
    ],
    example:
      "I just finished a really gripping thriller—do you like mystery novels?",
  },
  {
    id: "cooking",
    title: "Cooking & Recipes",
    description: "Exchange recipes and techniques",
    icons: [ChefHat],
    keywords: ["Recipes", "Techniques", "Ingredients", "Cuisines", "Baking"],
    subtopics: [
      "Quick meals",
      "Baking tips",
      "International cuisine",
      "Meal prep",
      "Cooking tools",
    ],
    starters: [
      "What's your go-to weeknight dinner?",
      "Have you tried making anything new lately?",
      "What cuisine do you love cooking?",
      "Are you more into savory or sweet dishes?",
    ],
    vocabulary: ["sauté", "mise en place", "emulsify", "garnish", "season"],
    example:
      "I've been perfecting my pasta-making skills—do you make fresh pasta?",
  },
  {
    id: "travel",
    title: "Travel Stories",
    description: "Share adventures and destinations",
    icons: [Plane],
    keywords: ["Destinations", "Adventures", "Culture", "Tips", "Experiences"],
    subtopics: [
      "Bucket list destinations",
      "Travel tips",
      "Cultural experiences",
      "Solo travel",
      "Budget travel",
    ],
    starters: [
      "Where's the most memorable place you've visited?",
      "What's on your travel bucket list?",
      "Do you prefer solo or group travel?",
      "Any travel tips you swear by?",
    ],
    vocabulary: [
      "itinerary",
      "wanderlust",
      "local culture",
      "off the beaten path",
    ],
    example: "I just got back from Japan—the food scene was incredible!",
  },
  {
    id: "tech",
    title: "Tech & Gadgets",
    description: "Discuss latest technology and apps",
    icons: [Cpu],
    keywords: ["Innovation", "Apps", "Gadgets", "AI", "Software"],
    subtopics: [
      "Latest gadgets",
      "Productivity apps",
      "AI developments",
      "Tech trends",
      "Coding",
    ],
    starters: [
      "What tech are you most excited about?",
      "Have you tried any new apps recently?",
      "What's your favorite productivity tool?",
      "Are you into AI or machine learning?",
    ],
    vocabulary: ["API", "algorithm", "open source", "automation", "cloud"],
    example:
      "I've been experimenting with AI tools for content creation—have you?",
  },
  {
    id: "fashion",
    title: "Fashion Trends",
    description: "Talk about style and outfits",
    icons: [Shirt],
    keywords: ["Style", "Trends", "Outfits", "Brands", "Personal"],
    subtopics: [
      "Current trends",
      "Personal style",
      "Sustainable fashion",
      "Wardrobe essentials",
      "Fashion icons",
    ],
    starters: [
      "How would you describe your style?",
      "What trends are you into right now?",
      "Where do you shop for clothes?",
      "Do you follow any fashion influencers?",
    ],
    vocabulary: [
      "silhouette",
      "capsule wardrobe",
      "statement piece",
      "layering",
    ],
    example: "I'm really into minimalist, neutral tones lately—how about you?",
  },
  {
    id: "music",
    title: "Music & Concerts",
    description: "Share favorite artists and experiences",
    icons: [Music],
    keywords: ["Artists", "Concerts", "Genres", "Albums", "Live Shows"],
    subtopics: [
      "Favorite artists",
      "Concert experiences",
      "Music genres",
      "Discovering new music",
      "Playlists",
    ],
    starters: [
      "What music are you listening to right now?",
      "Have you been to any great concerts?",
      "What's your all-time favorite album?",
      "How do you discover new music?",
    ],
    vocabulary: ["setlist", "encore", "vibe", "tracklist", "acoustics"],
    example:
      "I just saw an amazing indie band live—do you go to concerts often?",
  },
  {
    id: "movies",
    title: "Movies & TV Shows",
    description: "Discuss films and entertainment",
    icons: [Film],
    keywords: ["Films", "Series", "Directors", "Genres", "Reviews"],
    subtopics: [
      "Recent releases",
      "Classic films",
      "Binge-worthy series",
      "Directors",
      "Film analysis",
    ],
    starters: [
      "What's the last great movie you watched?",
      "Are you watching any series right now?",
      "What's your favorite film genre?",
      "Any directors you really admire?",
    ],
    vocabulary: ["cinematography", "plot twist", "character arc", "pacing"],
    example:
      "I just binged a really gripping thriller series—have you seen it?",
  },
  {
    id: "gaming",
    title: "Gaming",
    description: "Talk about video games and culture",
    icons: [Gamepad2],
    keywords: ["Games", "Strategy", "Platforms", "Esports", "Community"],
    subtopics: [
      "Favorite games",
      "Gaming platforms",
      "Esports",
      "Game design",
      "Multiplayer experiences",
    ],
    starters: [
      "What games are you playing right now?",
      "What's your favorite gaming genre?",
      "Do you play competitively or casually?",
      "What platform do you game on?",
    ],
    vocabulary: ["FPS", "RPG", "indie games", "speedrun", "lore"],
    example: "I've been really into open-world RPGs lately—what about you?",
  },
  {
    id: "pets",
    title: "Pet Care",
    description: "Share tips on raising pets",
    icons: [PawPrint],
    keywords: ["Animals", "Training", "Health", "Behavior", "Care"],
    subtopics: [
      "Pet training",
      "Pet health",
      "Behavioral issues",
      "Pet nutrition",
      "Adoption stories",
    ],
    starters: [
      "What kind of pets do you have?",
      "Any funny pet stories to share?",
      "How do you handle training?",
      "What's the best part about having a pet?",
    ],
    vocabulary: ["socialization", "enrichment", "vet care", "grooming"],
    example: "My dog just learned a new trick—do you train your pets?",
  },
  {
    id: "finance",
    title: "Personal Finance",
    description: "Discuss investing and money management",
    icons: [TrendingUp],
    keywords: ["Investing", "Budgeting", "Savings", "Wealth", "Planning"],
    subtopics: [
      "Investing strategies",
      "Budgeting tips",
      "Retirement planning",
      "Debt management",
      "Financial goals",
    ],
    starters: [
      "What's your approach to saving money?",
      "Are you investing in anything?",
      "How do you manage your budget?",
      "What are your financial goals?",
    ],
    vocabulary: [
      "diversification",
      "compound interest",
      "portfolio",
      "passive income",
    ],
    example:
      "I've been learning about index funds—do you invest in the stock market?",
  },
  {
    id: "mental-health",
    title: "Mental Health",
    description: "Talk about wellness and mindfulness",
    icons: [Brain],
    keywords: ["Wellness", "Self-care", "Mindfulness", "Therapy", "Balance"],
    subtopics: [
      "Stress management",
      "Mindfulness practices",
      "Therapy experiences",
      "Work-life balance",
      "Self-care routines",
    ],
    starters: [
      "What do you do for self-care?",
      "Have you tried meditation or mindfulness?",
      "How do you manage stress?",
      "What helps you maintain balance?",
    ],
    vocabulary: [
      "boundaries",
      "burnout",
      "grounding",
      "resilience",
      "awareness",
    ],
    example:
      "I've been using a meditation app daily—it's really helped my anxiety.",
  },
];

const Explore = () => {
  const navigate = useNavigate();
  const isDesktop = useIsDesktop();
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<(typeof TOPICS)[0] | null>(
    null
  );
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showDesktopOnlyModal, setShowDesktopOnlyModal] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [roomPassword, setRoomPassword] = useState("");
  const [meetingName, setMeetingName] = useState("");
  const [passcode, setPasscode] = useState("");
  const baseURL = useSelector((state: RootState) => state.baseUrl.url);
  const api = useAxios();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const generatePasscode = () => {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let passcode = "";
      for (let i = 0; i < 8; i++) {
        passcode += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return passcode;
    };

    const generatedMeetingName = uuidv4();
    const generatePassCode = generatePasscode();
    setMeetingName(generatedMeetingName);
    setPasscode(generatePassCode);
  }, []);

  const generateMeetingLink = async () => {
    if (!meetingName) return "";
    if (!passcode) return "";
    let link = `/room/${encodeURIComponent(meetingName)}/${encodeURIComponent(
      passcode
    )}`;
    try {
      setLoading(true);
      const response = await api.post(
        `${baseURL}/v1/zoom/meeting/create/`,
        {
          sessionName: meetingName,
          passcode: passcode,
        },
        { withCredentials: true }
      );
      setLoading(false);
      navigate(`${link}`);
    } catch (error) {
      setLoading(false);
      console.error("Error creating meeting:", error);
    }
  };

  const filteredTopics = TOPICS.filter(
    (topic) =>
      topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleTopic = (topicId: string) => {
    setSelectedTopics((prev) => {
      if (prev.includes(topicId)) {
        return prev.filter((id) => id !== topicId);
      }
      if (prev.length >= 5) {
        return prev;
      }
      return [...prev, topicId];
    });
  };

  const joinMeeting = async () => {
    try {
      setLoading(true);
      if (!roomId || !roomPassword) return;
      const response = await api.post(
        `${baseURL}/v1/zoom/meeting/joinMeeting/`,
        {
          sessionName: roomId,
          passcode: roomPassword,
        },
        { withCredentials: true }
      );
      navigate(
        `/room/${encodeURIComponent(roomId)}/${encodeURIComponent(
          roomPassword
        )}`
      );
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error("Error joining room:", err);
    }
  };

  const canCreateRoom = selectedTopics.length === 5;

  if (loading) {
    return (
      <div className="p-6 md:p-10 lg:p-14 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-xl font-semibold text-gray-800">
            Creating Meeting wait...
          </p>
          <p className="text-gray-600 mt-2"></p>
        </div>
      </div>
    );
  }

  return (
    <PageWrapper fullWidth className="pb-24">
      <PageSection constrained>
        <div className="mb-6">
          <h2 className="text-xl font-medium tracking-tight mb-1.5">
            Explore Topics
          </h2>
          <p className="text-muted-foreground text-[13px]">
            Pick exactly 5 topics you'd love to talk about with a friend.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-[16px] h-[16px] text-muted-foreground/50"
              strokeWidth={1.75}
            />
            <Input
              type="text"
              placeholder="Search topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-9 text-[13px] border-border rounded-lg"
            />
          </div>
          <div className="flex gap-3">
            <Button
              variant="default"
              onClick={() => setShowJoinModal(true)}
              className="h-9 px-4 sm:px-5 text-[13px] flex-1 sm:flex-none"
            >
              Join a Room
            </Button>
            <Button
              variant="outline"
              className="h-9 px-4 sm:px-5 text-[13px] flex-1 sm:flex-none"
            >
              Refer a friend
            </Button>
          </div>
        </div>

        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-muted/30 rounded-lg border border-border">
            <span className="text-[13px] text-muted-foreground">
              Selected:{" "}
              <span
                className={`font-medium ${
                  selectedTopics.length === 5
                    ? "text-primary"
                    : "text-foreground"
                }`}
              >
                {selectedTopics.length} / 5
              </span>
            </span>
            {selectedTopics.length === 5 && (
              <span className="text-[13px] text-primary/70 ml-0.5">
                • Ready
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 mb-20 md:mb-24">
          {filteredTopics.map((topic) => {
            const isSelected = selectedTopics.includes(topic.id);
            const isDisabled = !isSelected && selectedTopics.length >= 5;

            return (
              <button
                key={topic.id}
                onClick={() => toggleTopic(topic.id)}
                disabled={isDisabled}
                className={`
                relative p-4 md:p-5 rounded-lg transition-all duration-200 text-left flex flex-col min-h-[160px] md:min-h-[180px]
                ${
                  isSelected
                    ? "border-2 border-primary bg-card"
                    : isDisabled
                    ? "border border-border bg-card opacity-35 cursor-not-allowed"
                    : "border border-border bg-card hover:border-foreground/15"
                }
              `}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-1.5">
                    {topic.icons.map((Icon, idx) => (
                      <Icon
                        key={idx}
                        className="w-4 h-4 text-muted-foreground/50"
                        strokeWidth={1.75}
                      />
                    ))}
                  </div>

                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedTopic(topic);
                    }}
                    role="button"
                    className="text-muted-foreground/50 hover:text-muted-foreground transition-colors flex-shrink-0"
                  >
                    <ArrowRight className="w-4 h-4" strokeWidth={2.25} />
                  </div>
                </div>

                <h3 className="text-[15px] font-medium text-foreground mb-1.5 leading-[1.3] mt-1">
                  {topic.title}
                </h3>

                <p className="text-[13px] text-muted-foreground mb-3 leading-[1.45] flex-grow">
                  {topic.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
                  {topic.keywords.slice(0, 4).map((keyword, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 text-[11px] text-muted-foreground/60 border border-border/50 rounded-full"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      </PageSection>

      <div className="fixed bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-50 px-4 w-full max-w-[400px]">
        <Button
          disabled={!canCreateRoom}
          onClick={() => generateMeetingLink()}
          className="w-full md:w-auto md:px-8 h-10 md:h-9 text-[13px] transition-all duration-200"
        >
          Create Room ({selectedTopics.length}/5)
        </Button>
      </div>

      <SwipeableDialog
        open={!!selectedTopic}
        onOpenChange={() => setSelectedTopic(null)}
        className="bg-card border-border max-w-[calc(100vw-2rem)] sm:max-w-[580px] mx-4 max-h-[85vh] overflow-y-auto"
      >
        <div className="mb-4 md:mb-5">
          <div className="flex items-start justify-between mb-1">
            <h2 className="text-base md:text-lg font-medium text-foreground pr-8">
              {selectedTopic?.title}
            </h2>
            <button
              onClick={() => setSelectedTopic(null)}
              className="absolute right-4 top-4 md:right-5 md:top-5 text-muted-foreground/50 hover:text-foreground/80 transition-colors"
            >
              <X className="w-4 h-4" strokeWidth={1.75} />
            </button>
          </div>
          <p className="text-[13px] text-muted-foreground leading-relaxed">
            {selectedTopic?.description}
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <h3 className="text-[12px] font-medium text-muted-foreground/80 uppercase tracking-wide mb-2.5">
              Subtopics
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedTopic?.subtopics.map((subtopic, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-[13px] text-foreground/75 bg-muted/20 border border-border/50 rounded-md"
                >
                  {subtopic}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[12px] font-medium text-muted-foreground/80 uppercase tracking-wide mb-2.5">
              Conversation Starters
            </h3>
            <ul className="space-y-2">
              {selectedTopic?.starters.map((starter, idx) => (
                <li
                  key={idx}
                  className="text-[13px] text-foreground/70 leading-relaxed flex items-start"
                >
                  <span className="text-primary mr-2.5 mt-0.5 flex-shrink-0">
                    •
                  </span>
                  <span>{starter}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[12px] font-medium text-muted-foreground/80 uppercase tracking-wide mb-2.5">
              Key Vocabulary
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {selectedTopic?.vocabulary.map((word, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-[12px] text-muted-foreground/65 border border-border/40 rounded-full"
                >
                  {word}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[12px] font-medium text-muted-foreground/80 uppercase tracking-wide mb-2.5">
              Example Opening
            </h3>
            <p className="text-[13px] text-foreground/70 italic leading-relaxed border-l-2 border-primary/25 pl-3.5 py-0.5">
              "{selectedTopic?.example}"
            </p>
          </div>
        </div>
      </SwipeableDialog>

      <SwipeableDialog
        open={showJoinModal}
        onOpenChange={setShowJoinModal}
        className="bg-card border-border max-w-[calc(100vw-2rem)] sm:max-w-sm mx-4"
      >
        <DialogTitle hidden={true} />
        <DialogDescription hidden={true} />
        <div className="flex items-start justify-between mb-4">
          <h2 className="text-base md:text-lg font-medium">Join a Room</h2>
          <button
            onClick={() => setShowJoinModal(false)}
            className="text-muted-foreground/60 hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" strokeWidth={1.75} />
          </button>
        </div>
        <div className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <Label
              htmlFor="room-id"
              className="text-[12px] font-normal text-muted-foreground"
            >
              Room ID
            </Label>
            <Input
              id="room-id"
              type="text"
              placeholder="Enter room ID"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className="h-9 text-[13px] border-border rounded-lg"
            />
          </div>
          <div className="space-y-1.5">
            <Label
              htmlFor="room-password"
              className="text-[12px] font-normal text-muted-foreground"
            >
              Room Password
            </Label>
            <Input
              id="room-password"
              type="password"
              placeholder="Enter password"
              value={roomPassword}
              onChange={(e) => setRoomPassword(e.target.value)}
              className="h-9 text-[13px] border-border rounded-lg"
            />
          </div>
          <Button
            onClick={() => {
              joinMeeting();
              setShowJoinModal(false);
              setRoomId("");
              setRoomPassword("");
            }}
            className="w-full h-9 text-[13px]"
          >
            Join Room
          </Button>
        </div>
      </SwipeableDialog>
    </PageWrapper>
  );
};

export default Explore;
