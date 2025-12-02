import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { OnboardingLayout } from "@/components/OnboardingLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formStorage } from "@/utils/formStorage";

const Step1 = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    const savedData = formStorage.get();
    if (savedData.firstName || savedData.lastName) {
      setFormData({
        firstName: savedData.firstName || "",
        lastName: savedData.lastName || "",
      });
    }
  }, []);

  const isValid = formData.firstName.trim() && formData.lastName.trim();

  const handleContinue = () => {
    formStorage.update({
      firstName: formData.firstName,
      lastName: formData.lastName,
    });
    navigate("/onboarding/step-2");
  };

  return (
    <OnboardingLayout currentStep={1} totalSteps={13} showProgress>
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-medium tracking-tight mb-1.5">
            What's your name?
          </h2>
          <p className="text-muted-foreground text-[13px]">
            Please provide your legal first and last name.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <Label
              htmlFor="firstName"
              className="text-[12px] font-normal mb-1.5 block text-muted-foreground"
            >
              Legal First Name
            </Label>
            <Input
              id="firstName"
              type="text"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              placeholder="First name"
              className="h-9 text-[13px]"
            />
          </div>

          <div>
            <Label
              htmlFor="lastName"
              className="text-[12px] font-normal mb-1.5 block text-muted-foreground"
            >
              Legal Last Name
            </Label>
            <Input
              id="lastName"
              type="text"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              placeholder="Last name"
              className="h-9 text-[13px]"
            />
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            onClick={() => navigate("/onboarding/welcome")}
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

export default Step1;
