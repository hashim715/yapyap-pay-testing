import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { OnboardingLayout } from "@/components/OnboardingLayout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formStorage } from "@/utils/formStorage";

const Step2 = () => {
  const navigate = useNavigate();
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const isValid = day !== "" && month !== "" && year !== "";

  useEffect(() => {
    const savedData = formStorage.get();
    if (savedData.dateOfBirth) {
      const [savedYear, savedMonth, savedDay] =
        savedData.dateOfBirth.split("/");
      setDay(savedDay);
      setMonth(savedMonth);
      setYear(savedYear);
    }
  }, []);

  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) =>
    (currentYear - i).toString()
  );

  const handleContinue = () => {
    formStorage.update({
      dateOfBirth: `${year}/${month}/${day}`,
    });
    navigate("/onboarding/step-3");
  };

  return (
    <OnboardingLayout currentStep={2} totalSteps={13} showProgress>
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-medium tracking-tight mb-1.5">
            What's your date of birth?
          </h2>
          <p className="text-muted-foreground text-[13px]">
            This helps us verify your identity and eligibility.
          </p>
        </div>

        <div>
          <Label className="text-[12px] font-normal mb-2 block text-muted-foreground">
            Date of Birth
          </Label>
          <div className="grid grid-cols-3 gap-3">
            <Select value={day} onValueChange={setDay}>
              <SelectTrigger className="h-9 text-[13px] bg-background border-border">
                <SelectValue placeholder="Day" />
              </SelectTrigger>
              <SelectContent className="bg-background">
                {days.map((d) => (
                  <SelectItem key={d} value={d} className="text-[13px]">
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={month} onValueChange={setMonth}>
              <SelectTrigger className="h-9 text-[13px] bg-background border-border">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent className="bg-background">
                {months.map((m, idx) => (
                  <SelectItem
                    key={m}
                    value={(idx + 1).toString()}
                    className="text-[13px]"
                  >
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={year} onValueChange={setYear}>
              <SelectTrigger className="h-9 text-[13px] bg-background border-border">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent className="bg-background">
                {years.map((y) => (
                  <SelectItem key={y} value={y} className="text-[13px]">
                    {y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            onClick={() => navigate("/onboarding/step-1")}
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

export default Step2;
