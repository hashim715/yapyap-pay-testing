import { useNavigate } from "react-router-dom";
import { OnboardingLayout } from "@/components/OnboardingLayout";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { fetchUser } from "../../store/reducer/auth-slice";
import { RootState, AppDispatch } from "../../store/store";
import { useSelector, useDispatch } from "react-redux";

const Submitted = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const baseURL = useSelector((state: RootState) => state.baseUrl.url);

  return (
    <OnboardingLayout>
      <div className="space-y-6">
        <div className="mb-2">
          <h2 className="text-xl font-medium tracking-tight mb-1.5">
            Your application has been submitted
          </h2>
          <p className="text-muted-foreground text-[13px] leading-relaxed">
            We will review your application and get back to you soon. If you
            have any questions, please email us at{" "}
            <a
              href="mailto:help@gmail.com"
              className="text-primary hover:underline"
            >
              help@gmail.com
            </a>
          </p>
        </div>

        <div className="rounded-lg border border-border bg-background p-6">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              <div
                className="w-12 h-12 rounded-full border-2 flex items-center justify-center"
                style={{ borderColor: "#2ECC71" }}
              >
                <Check
                  className="w-6 h-6"
                  strokeWidth={2}
                  style={{ color: "#2ECC71" }}
                />
              </div>
            </div>
            <div className="flex-1">
              <p className="text-[13px] text-foreground leading-relaxed">
                Your submission has been received and is under review. We'll be
                in touch soon.
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            onClick={() => {
              navigate("/");
              dispatch(fetchUser(baseURL));
            }}
            className="flex-1 h-9 text-[13px]"
          >
            Finish
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default Submitted;
