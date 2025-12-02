import { useNavigate } from "react-router-dom";
import { OnboardingLayout } from "@/components/OnboardingLayout";
import { Button } from "@/components/ui/button";
import { FileText, MessageSquare, Mic } from "lucide-react";

const Welcome = () => {
  const navigate = useNavigate();

  const steps = [
    {
      icon: FileText,
      title: "Background Information",
      description: "Tell us more about yourself",
    },
    {
      icon: MessageSquare,
      title: "Linguistic Questionnaire",
      description: "Answer a few questions about your linguistics background",
    },
    {
      icon: Mic,
      title: "Record a Sample",
      description: "Record a 3-minute audio sample",
    },
  ];

  return (
    <OnboardingLayout>
      <div className="mb-10">
        <h1 className="text-2xl font-medium tracking-tight mb-2">Welcome</h1>
        <p className="text-muted-foreground text-sm">
          Please allow 10–15 minutes to complete this application.
        </p>
      </div>

      <div className="space-y-3 mb-8">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div
              key={index}
              className="border border-border rounded-lg p-4 transition-all hover:border-primary/30"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-[2px]">
                  <Icon
                    className="w-[18px] h-[18px] text-muted-foreground"
                    strokeWidth={1.5}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[13px] font-medium mb-2 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-[12px] text-muted-foreground leading-tight">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-end">
        <Button
          onClick={() => navigate("/onboarding/step-1")}
          className="h-9 px-6 text-[13px]"
        >
          Get Started
        </Button>
      </div>
    </OnboardingLayout>
  );
};

export default Welcome;
