import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { OnboardingLayout } from "@/components/OnboardingLayout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { formStorage } from "@/utils/formStorage";

const Step10 = () => {
  const navigate = useNavigate();
  const [proficiency, setProficiency] = useState({
    speaking: [7],
    listening: [7],
    reading: [7],
    writing: [7],
  });

  useEffect(() => {
    const savedData = formStorage.get();
    if (savedData.languageProficiency) {
      setProficiency(savedData.languageProficiency);
    }
  }, []);

  const skills = [
    { key: "speaking", label: "Speaking" },
    { key: "listening", label: "Listening" },
    { key: "reading", label: "Reading" },
    { key: "writing", label: "Writing" },
  ];

  const handleContinue = () => {
    formStorage.update({
      languageProficiency: proficiency,
    });
    navigate("/onboarding/step-11");
  };

  return (
    <OnboardingLayout currentStep={10} totalSteps={13} showProgress>
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-medium tracking-tight mb-1.5">
            Rate your language proficiency
          </h2>
          <p className="text-muted-foreground text-[13px]">
            On a scale of 1-10, how would you rate your skills?
          </p>
        </div>

        <div className="space-y-6">
          {skills.map((skill) => (
            <div key={skill.key} className="space-y-2.5">
              <div className="flex items-center justify-between mb-1">
                <Label className="text-[13px] font-normal text-foreground">
                  {skill.label}
                </Label>
                <span className="text-[15px] font-medium text-primary tabular-nums min-w-[24px] text-right">
                  {proficiency[skill.key as keyof typeof proficiency][0]}
                </span>
              </div>
              <Slider
                value={proficiency[skill.key as keyof typeof proficiency]}
                onValueChange={(value) =>
                  setProficiency({ ...proficiency, [skill.key]: value })
                }
                min={1}
                max={10}
                step={1}
                className="w-full h-2"
              />
              <div className="flex justify-between text-[11px] text-muted-foreground pt-0.5">
                <span>Beginner</span>
                <span>Native</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            onClick={() => navigate("/onboarding/step-9")}
            className="h-9 px-4 text-[13px]"
          >
            Back
          </Button>
          <Button
            onClick={() => handleContinue()}
            className="flex-1 h-9 text-[13px]"
          >
            Continue
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default Step10;
