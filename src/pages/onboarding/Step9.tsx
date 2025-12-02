import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { OnboardingLayout } from "@/components/OnboardingLayout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { educationOptions } from "@/data/demographics";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formStorage } from "@/utils/formStorage";

const Step9 = () => {
  const navigate = useNavigate();
  const [education, setEducation] = useState("");

  useEffect(() => {
    const savedData = formStorage.get();
    if (savedData.educationLevel) {
      setEducation(savedData.educationLevel || "");
    }
  }, []);

  const isValid = education !== "";

  const handleContinue = () => {
    formStorage.update({
      educationLevel: education,
    });
    navigate("/onboarding/step-10");
  };

  return (
    <OnboardingLayout currentStep={9} totalSteps={13} showProgress>
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-medium tracking-tight mb-1.5">
            What is your highest level of education?
          </h2>
          <p className="text-muted-foreground text-[13px]">
            Select the highest level of education you have completed.
          </p>
        </div>

        <div>
          <Label className="text-[12px] font-normal mb-2 block text-muted-foreground">
            Education Level
          </Label>
          <Select value={education} onValueChange={setEducation}>
            <SelectTrigger className="h-9 text-[13px] bg-background border-border">
              <SelectValue placeholder="Select your education level" />
            </SelectTrigger>
            <SelectContent className="bg-background max-h-[300px]">
              {educationOptions.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="text-[13px]"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            onClick={() => navigate("/onboarding/step-8")}
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

export default Step9;
