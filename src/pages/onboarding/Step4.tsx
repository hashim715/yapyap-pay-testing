import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { OnboardingLayout } from "@/components/OnboardingLayout";
import { Button } from "@/components/ui/button";
import { ethnicityOptions } from "@/data/demographics";
import { formStorage } from "@/utils/formStorage";

const Step4 = () => {
  const navigate = useNavigate();
  const [ethnicity, setEthnicity] = useState("");

  useEffect(() => {
    const savedData = formStorage.get();
    if (savedData.ethnicity) {
      setEthnicity(savedData.ethnicity || "");
    }
  }, []);

  const isValid = ethnicity !== "";

  const handleContinue = () => {
    formStorage.update({
      ethnicity: ethnicity,
    });
    navigate("/onboarding/step-5");
  };

  return (
    <OnboardingLayout currentStep={4} totalSteps={13} showProgress>
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-medium tracking-tight mb-1.5">
            What's your race/ethnicity?
          </h2>
          <p className="text-muted-foreground text-[13px]">
            This information helps us understand the diversity of our community.
          </p>
        </div>

        <div className="space-y-2">
          {ethnicityOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setEthnicity(option.value)}
              className={`w-full px-3.5 py-2.5 text-left border rounded-lg transition-all ${
                ethnicity === option.value
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/20"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-3.5 h-3.5 rounded-full border-[1.5px] transition-all ${
                    ethnicity === option.value
                      ? "border-primary bg-primary"
                      : "border-muted-foreground/30"
                  }`}
                >
                  {ethnicity === option.value && (
                    <div className="w-full h-full rounded-full bg-background scale-50" />
                  )}
                </div>
                <span className="text-[13px]">{option.label}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            onClick={() => navigate("/onboarding/step-3")}
            className="h-9 px-4 text-[13px]"
          >
            Back
          </Button>
          <Button
            onClick={() => handleContinue()}
            disabled={!isValid}
            className="flex-1 h-9 text-[13px]"
          >
            Continue
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default Step4;
