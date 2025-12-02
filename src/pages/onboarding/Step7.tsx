import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { OnboardingLayout } from "@/components/OnboardingLayout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { languages } from "@/data/languages";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formStorage } from "@/utils/formStorage";

const Step7 = () => {
  const navigate = useNavigate();
  const [nativeLanguage, setNativeLanguage] = useState("");

  const isValid = nativeLanguage !== "";

  useEffect(() => {
    const savedData = formStorage.get();
    if (savedData.nativeLanguage) {
      setNativeLanguage(savedData.nativeLanguage || "");
    }
  }, []);

  const handleContinue = () => {
    formStorage.update({
      nativeLanguage: nativeLanguage,
    });
    navigate("/onboarding/step-8");
  };

  return (
    <OnboardingLayout currentStep={7} totalSteps={13} showProgress>
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-medium tracking-tight mb-1.5">
            What is your native language?
          </h2>
          <p className="text-muted-foreground text-[13px]">
            Select the language you're most comfortable speaking.
          </p>
        </div>

        <div>
          <Label className="text-[12px] font-normal mb-2 block text-muted-foreground">
            Native Language
          </Label>
          <Select value={nativeLanguage} onValueChange={setNativeLanguage}>
            <SelectTrigger className="h-9 text-[13px] bg-background border-border">
              <SelectValue placeholder="Select your native language" />
            </SelectTrigger>
            <SelectContent className="bg-background max-h-[300px]">
              {languages.map((lang) => (
                <SelectItem
                  key={lang.name}
                  value={lang.name}
                  className="text-[13px]"
                >
                  {lang.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            onClick={() => navigate("/onboarding/step-6")}
            className="h-9 px-4 text-[13px]"
          >
            Back
          </Button>
          <Button
            onClick={handleContinue}
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

export default Step7;
