import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { OnboardingLayout } from "@/components/OnboardingLayout";
import { Button } from "@/components/ui/button";
import { CityAutocomplete } from "@/components/CityAutocomplete";
import { formStorage } from "@/utils/formStorage";

const Step5 = () => {
  const navigate = useNavigate();
  const [city, setCity] = useState("");

  useEffect(() => {
    const savedData = formStorage.get();
    if (savedData.cityOfResidence) {
      setCity(savedData.cityOfResidence || "");
    }
  }, []);

  const isValid = city.trim() !== "";

  const handleContinue = () => {
    formStorage.update({
      cityOfResidence: city,
    });
    navigate("/onboarding/step-6");
  };

  return (
    <OnboardingLayout currentStep={5} totalSteps={13} showProgress>
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-medium tracking-tight mb-1.5">
            Where do you currently live?
          </h2>
          <p className="text-muted-foreground text-[13px]">
            Start typing to search for your city.
          </p>
        </div>

        <div>
          <CityAutocomplete
            value={city}
            onChange={setCity}
            label="Current City"
            placeholder="Type your city name..."
          />
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            onClick={() => navigate("/onboarding/step-4")}
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

export default Step5;
