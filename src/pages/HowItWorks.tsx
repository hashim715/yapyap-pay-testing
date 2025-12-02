import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import step1 from "@/assets/how-it-works-step1.png";
import step2 from "@/assets/how-it-works-step2.png";
import step3 from "@/assets/how-it-works-step3.png";
import step4 from "@/assets/how-it-works-step4.png";
import step5 from "@/assets/how-it-works-step5.png";

const steps = [
  {
    image: step1,
    title: "Sign up & get approved",
    description:
      "Create your account, complete the quick onboarding, and wait for your approval so you can start speaking.",
  },
  {
    image: step2,
    title: "Choose your conversation vibes",
    description:
      "Pick 5 topics you love, from boy problems to skincare, fashion, finance, science, anything. These are the things you will be talking about in your room.",
  },
  {
    image: step3,
    title: "Join or create your room",
    description:
      "Use a Room ID to join your friend or start your own room with your topics and share the room key. Super simple, super social.",
  },
  {
    image: step4,
    title: "Have real, natural conversations",
    description:
      "Yap like you normally would. Be yourself, explore the topics you chose, and enjoy the flow.",
  },
  {
    image: step5,
    title: "Get paid for great conversations",
    description:
      "We review your audio quality and engagement. High-quality chats = more money in your account. Track your earnings in your dashboard.",
  },
];

export default function HowItWorks() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="pt-8 md:pt-16 pb-4 md:pb-8 px-4 md:px-6">
        <div className="max-w-[1100px] mx-auto">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-[13px] text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-105 mb-6 md:mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <h1 className="text-2xl md:text-3xl font-medium tracking-tight mb-8 md:mb-12">
            How it works?
          </h1>
        </div>
      </div>

      <div className="pt-0 pb-8 md:pb-16 px-4 md:px-6">
        <div className="max-w-[1100px] mx-auto">
          <div className="hidden md:grid md:grid-cols-2 gap-12 items-stretch">
            {steps.map((step, index) => (
              <div key={index} className="animate-fade-in flex flex-col">
                <div className="mb-4 rounded-lg overflow-hidden bg-white">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-[500px] object-cover"
                  />
                </div>

                <h2 className="text-[17px] font-medium mb-2 leading-snug">
                  {step.title}
                </h2>

                <p className="text-[13px] text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div className="md:hidden space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="animate-fade-in">
                <div className="mb-3 rounded-lg overflow-hidden bg-white">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-[240px] sm:h-[280px] object-cover"
                  />
                </div>

                <h2 className="text-[15px] sm:text-[16px] font-medium mb-2 leading-snug">
                  {step.title}
                </h2>

                <p className="text-[13px] text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-8 md:py-16 px-4 md:px-6">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-8 md:mb-12">
            Frequently Asked Questions (FAQs)
          </h2>

          <div className="w-full">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-b border-border">
                <AccordionTrigger className="text-[15px] font-medium text-left hover:text-primary data-[state=open]:text-primary transition-colors [&[data-state=open]>svg]:text-primary [&>svg]:text-muted-foreground hover:[&>svg]:text-primary [&>svg]:transition-colors">
                  How can I get started?
                </AccordionTrigger>
                <AccordionContent className="text-[13px] text-muted-foreground leading-relaxed">
                  Just click Sign Up and complete a quick 5-minute onboarding.
                  We'll ask about your language background and have you record a
                  short audio sample. Once approved, you'll be ready to start
                  joining rooms and earning.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border-b border-border">
                <AccordionTrigger className="text-[15px] font-medium text-left hover:text-primary data-[state=open]:text-primary transition-colors [&[data-state=open]>svg]:text-primary [&>svg]:text-muted-foreground hover:[&>svg]:text-primary [&>svg]:transition-colors">
                  What languages do you support?
                </AccordionTrigger>
                <AccordionContent className="text-[13px] text-muted-foreground leading-relaxed">
                  We support most major languages spoken around the world.
                  Whether you speak English, Spanish, Arabic, Hindi, French,
                  Italian, or dozens more, there's a good chance your language
                  is already available. We're constantly adding new ones based
                  on demand.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border-b border-border">
                <AccordionTrigger className="text-[15px] font-medium text-left hover:text-primary data-[state=open]:text-primary transition-colors [&[data-state=open]>svg]:text-primary [&>svg]:text-muted-foreground hover:[&>svg]:text-primary [&>svg]:transition-colors">
                  How many hours can I talk?
                </AccordionTrigger>
                <AccordionContent className="text-[13px] text-muted-foreground leading-relaxed">
                  There's no cap on how much you can talk overall. You'll have
                  daily hour limits at first, but they increase as you complete
                  more high-quality conversations.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border-b border-border">
                <AccordionTrigger className="text-[15px] font-medium text-left hover:text-primary data-[state=open]:text-primary transition-colors [&[data-state=open]>svg]:text-primary [&>svg]:text-muted-foreground hover:[&>svg]:text-primary [&>svg]:transition-colors">
                  How much will I get paid?
                </AccordionTrigger>
                <AccordionContent className="text-[13px] text-muted-foreground leading-relaxed">
                  Earnings vary based on things like topic difficulty, audio
                  clarity, engagement and more. Some of our best projects pay up
                  to $50/hr for high-quality recorded conversations.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border-b border-border">
                <AccordionTrigger className="text-[15px] font-medium text-left hover:text-primary data-[state=open]:text-primary transition-colors [&[data-state=open]>svg]:text-primary [&>svg]:text-muted-foreground hover:[&>svg]:text-primary [&>svg]:transition-colors">
                  Who is this opportunity for?
                </AccordionTrigger>
                <AccordionContent className="text-[13px] text-muted-foreground leading-relaxed">
                  Anyone who enjoys a good conversation. Friends, families,
                  college students, part-timers, professionals, side-hustlers,
                  gig workers, anyone with a voice and a story to share is
                  welcome.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="border-b border-border">
                <AccordionTrigger className="text-[15px] font-medium text-left hover:text-primary data-[state=open]:text-primary transition-colors [&[data-state=open]>svg]:text-primary [&>svg]:text-muted-foreground hover:[&>svg]:text-primary [&>svg]:transition-colors">
                  How flexible is the work?
                </AccordionTrigger>
                <AccordionContent className="text-[13px] text-muted-foreground leading-relaxed">
                  Super flexible. You're an independent contractor, so you work
                  whenever you want, as much or as little as fits your schedule.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7" className="border-b border-border">
                <AccordionTrigger className="text-[15px] font-medium text-left hover:text-primary data-[state=open]:text-primary transition-colors [&[data-state=open]>svg]:text-primary [&>svg]:text-muted-foreground hover:[&>svg]:text-primary [&>svg]:transition-colors">
                  Why do you pay me for talking?
                </AccordionTrigger>
                <AccordionContent className="text-[13px] text-muted-foreground leading-relaxed">
                  Your conversations help train next-generation voice AI. We
                  record each session and use it to build high-quality datasets
                  that companies use to improve speech, emotion, and dialog
                  models.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>

      <div className="py-8 md:py-16 px-4 md:px-6">
        <div className="max-w-[1100px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6">
            <h2 className="text-2xl md:text-3xl font-medium tracking-tight">
              Ready to get started?
            </h2>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => navigate("/signup")}
                className="h-11 md:h-12 px-10 md:px-12 text-[14px] md:text-[15px] font-medium rounded-lg"
              >
                Sign up now
              </Button>
              <Button
                onClick={() => navigate("/login")}
                variant="outline"
                className="h-11 md:h-12 px-10 md:px-12 text-[14px] md:text-[15px] font-medium rounded-lg"
              >
                Log in
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
