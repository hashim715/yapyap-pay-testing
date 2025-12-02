import { useNavigate } from "react-router-dom";
import { OnboardingLayout } from "@/components/OnboardingLayout";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

const TutorialVideo = () => {
  const navigate = useNavigate();

  return (
    <OnboardingLayout currentStep={9} totalSteps={10} showProgress>
      <div className="space-y-6 max-w-3xl mx-auto">
        <div>
          <h2 className="text-xl font-medium tracking-tight mb-1.5">
            Watch the tutorial video
          </h2>
          <p className="text-muted-foreground text-[13px]">
            Please watch this short video to learn about platform requirements.
          </p>
        </div>

        <div className="aspect-video bg-muted rounded-lg flex items-center justify-center border border-border">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground hover:scale-105 transition-transform cursor-pointer">
              <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
            </div>
          </div>
        </div>

        <div className="bg-background rounded-lg p-6 border border-border">
          <h3 className="text-[13px] font-medium mb-3 text-foreground">
            This tutorial covers:
          </h3>
          <ul className="space-y-2.5 text-[13px] text-muted-foreground leading-relaxed">
            <li className="flex items-start gap-2.5">
              <span className="text-primary mt-[2px] font-medium">•</span>
              <span>How to ensure good engagement during conversations</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-primary mt-[2px] font-medium">•</span>
              <span>Requirements for high-quality audio recording</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-primary mt-[2px] font-medium">•</span>
              <span>
                Understanding Personally Identifiable Information (PII)
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-primary mt-[2px] font-medium">•</span>
              <span>Guidelines for appropriate content</span>
            </li>
          </ul>
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            onClick={() => navigate("/onboarding/step-11")}
            className="h-9 px-4 text-[13px]"
          >
            Back
          </Button>
          <Button
            onClick={() => navigate("/onboarding/tutorial-quiz")}
            className="flex-1 h-9 text-[13px]"
          >
            Continue to Quiz
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default TutorialVideo;
