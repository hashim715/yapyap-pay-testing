import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { OnboardingLayout } from "@/components/OnboardingLayout";
import { Button } from "@/components/ui/button";
import { formStorage } from "@/utils/formStorage";

const Step11 = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string[]>([]);

  const options = [
    { value: "home", label: "Home and family" },
    { value: "work", label: "Work and school" },
    { value: "social", label: "Socially with friends" },
    { value: "media", label: "Media consumption" },
  ];

  const toggleOption = (value: string) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  useEffect(() => {
    const savedData = formStorage.get();
    if (savedData.languageUsage) {
      setSelected(savedData.languageUsage);
    }
  }, []);

  const isValid = selected.length > 0;

  const handleContinue = () => {
    formStorage.update({
      languageUsage: selected,
    });
    navigate("/onboarding/tutorial-video");
  };

  return (
    <OnboardingLayout currentStep={11} totalSteps={13} showProgress>
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-medium tracking-tight mb-1.5">
            How often do you use this language?
          </h2>
          <p className="text-muted-foreground text-[13px]">
            Select all contexts where you regularly use the language.
          </p>
        </div>

        <div className="space-y-2">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => toggleOption(option.value)}
              className={`w-full px-3.5 py-2.5 text-left border rounded-lg transition-all ${
                selected.includes(option.value)
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/20"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-3.5 h-3.5 rounded border-[1.5px] transition-all flex items-center justify-center ${
                    selected.includes(option.value)
                      ? "border-primary bg-primary"
                      : "border-muted-foreground/30"
                  }`}
                >
                  {selected.includes(option.value) && (
                    <svg
                      className="w-2.5 h-2.5 text-primary-foreground"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
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
            onClick={() => navigate("/onboarding/step-10")}
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

export default Step11;
