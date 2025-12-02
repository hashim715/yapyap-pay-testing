import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { OnboardingLayout } from "@/components/OnboardingLayout";
import { Button } from "@/components/ui/button";
import { areaTypeOptions } from "@/data/demographics";
import { formStorage } from "@/utils/formStorage";

const Step6 = () => {
  const navigate = useNavigate();
  const [areaType, setAreaType] = useState("");

  useEffect(() => {
    const savedData = formStorage.get();
    if (savedData.areaGrowUp) {
      setAreaType(savedData.areaGrowUp || "");
    }
  }, []);

  const isValid = areaType !== "";

  const handleContinue = () => {
    formStorage.update({
      areaGrowUp: areaType,
    });
    navigate("/onboarding/step-7");
  };

  return (
    <OnboardingLayout currentStep={6} totalSteps={13} showProgress>
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-medium tracking-tight mb-1.5">
            What type of area did you grow up in?
          </h2>
          <p className="text-muted-foreground text-[13px]">
            Choose the option that best describes your upbringing environment.
          </p>
        </div>

        <div className="space-y-2">
          {areaTypeOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setAreaType(option.value)}
              className={`w-full px-3.5 py-2.5 text-left border rounded-lg transition-all ${
                areaType === option.value
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/20"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-3.5 h-3.5 rounded-full border-[1.5px] transition-all ${
                    areaType === option.value
                      ? "border-primary bg-primary"
                      : "border-muted-foreground/30"
                  }`}
                >
                  {areaType === option.value && (
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
            onClick={() => navigate("/onboarding/step-5")}
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

export default Step6;
