import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { OnboardingLayout } from "@/components/OnboardingLayout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { DIALECTS } from "@/data/dialects";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formStorage } from "@/utils/formStorage";

const Step8 = () => {
  const navigate = useNavigate();
  const [dialect, setDialect] = useState("");
  const [languageName, setLanguageName] = useState("");
  const [dialects, setDialects] = useState<string[]>([]);

  useEffect(() => {
    const savedData = formStorage.get();
    if (savedData.nativeLanguage || savedData.dialect) {
      setLanguageName(savedData.nativeLanguage || "");

      const languageDialects = DIALECTS[savedData.nativeLanguage] || [];
      setDialects(languageDialects);
      setDialect(savedData.dialect || "");
    }
  }, []);

  const isValid = dialects.length === 0 || dialect !== "";

  const handleContinue = () => {
    formStorage.update({
      dialect: dialect,
    });
    navigate("/onboarding/step-9");
  };

  return (
    <OnboardingLayout currentStep={8} totalSteps={13} showProgress>
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-medium tracking-tight mb-1.5">
            Where is your dialect from?
          </h2>
          <p className="text-muted-foreground text-[13px]">
            Select the region or dialect that matches your {languageName}.
          </p>
        </div>

        {dialects.length > 0 ? (
          <div>
            <Label className="text-[12px] font-normal mb-2 block text-muted-foreground">
              Dialect
            </Label>
            <Select value={dialect} onValueChange={setDialect}>
              <SelectTrigger className="h-9 text-[13px] bg-background border-border">
                <SelectValue placeholder="Select your dialect" />
              </SelectTrigger>
              <SelectContent className="bg-background max-h-[300px]">
                {dialects.map((dialectName, index) => (
                  <SelectItem
                    key={index}
                    value={dialectName}
                    className="text-[13px]"
                  >
                    {dialectName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ) : (
          <div className="px-3.5 py-3 border border-border rounded-lg bg-muted/30">
            <p className="text-[13px] text-muted-foreground">
              No dialect selection required.
            </p>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            onClick={() => navigate("/onboarding/step-7")}
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

export default Step8;
