import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSelector, useDispatch } from "react-redux";
import useAxios from "@/utils/useAxios";
import { fetchUser } from "../store/reducer/auth-slice";
import { RootState, AppDispatch } from "../store/store";

const VerifyPhone = () => {
  const navigate = useNavigate();
  const { phoneNumber } = useParams();
  const [code, setCode] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const baseURL = useSelector((state: RootState) => state.baseUrl.url);
  const api = useAxios();

  const [timer, setTimer] = useState(120);

  useEffect(() => {
    const key = `otp_expiry_${phoneNumber}`;
    const savedExpiry = localStorage.getItem(key);

    if (savedExpiry) {
      const remaining = Math.floor((+savedExpiry - Date.now()) / 1000);
      setTimer(remaining > 0 ? remaining : 0);
    } else {
      const expiry = Date.now() + 120000;
      localStorage.setItem(key, expiry.toString());
    }
  }, [phoneNumber]);

  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60)
      .toString()
      .padStart(2, "0");
    const secs = (sec % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!code) {
        alert("Please enter the verification code.");
        return;
      }

      const response = await api.post(
        `${baseURL}/v1/auth/verify-phone-number/`,
        { phone_number: phoneNumber, code },
        {
          headers: { "ngrok-skip-browser-warning": "true" },
          withCredentials: true,
        }
      );

      localStorage.removeItem(`otp_expiry_${phoneNumber}`);

      dispatch(fetchUser(baseURL));
      if (!response.data.details_added) {
        navigate("/onboarding/welcome");
      } else if (!response.data.adminVerify) {
        navigate("/onboarding/submitted");
      } else {
        navigate("/");
      }
      alert("Verification code verified successfully.");
    } catch (err) {
      alert("Failed to verify verification code.");
    }
  };

  const handleResendCode = async () => {
    if (timer > 0) return;

    try {
      if (!phoneNumber) {
        alert("Please select a country code and enter a phone number.");
        return;
      }

      const response = await api.post(
        `${baseURL}/v1/auth/send-verification-code/`,
        { phone_number: phoneNumber },
        {
          headers: { "ngrok-skip-browser-warning": "true" },
          withCredentials: true,
        }
      );
      const newExpiry = Date.now() + 120000;
      localStorage.setItem(`otp_expiry_${phoneNumber}`, newExpiry.toString());
      setTimer(120);
      alert("Verification code resent successfully.");
    } catch (err) {
      alert("Failed to send verification code. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="w-full max-w-[400px] bg-white border border-[#E5E5E5] rounded-[24px] px-8 py-10">
        <div className="mb-8">
          <h1 className="text-[22px] font-medium tracking-tight mb-1.5 text-foreground">
            Enter verification code
          </h1>
          <p className="text-muted-foreground text-[13px]">
            We sent a code to {phoneNumber}
          </p>
        </div>

        <form onSubmit={handleVerify} className="space-y-5">
          <div className="space-y-2">
            <Label
              htmlFor="code"
              className="text-[12px] text-muted-foreground font-normal"
            >
              Verification Code
            </Label>

            <Input
              id="code"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
              placeholder="000000"
              maxLength={6}
              className="h-10 text-[13px] tracking-widest text-center text-base"
              required
            />
          </div>

          <Button type="submit" className="w-full h-9 text-[13px] mt-6">
            Verify
          </Button>
        </form>

        <div className="mt-5 text-[13px] text-center">
          {timer > 0 ? (
            <span className="text-muted-foreground">
              Resend in {formatTime(timer)}
            </span>
          ) : (
            <>
              <span className="text-muted-foreground">
                Didn't receive a code?{" "}
              </span>
              <button
                type="button"
                onClick={handleResendCode}
                className="text-primary hover:underline font-medium"
              >
                Resend
              </button>
            </>
          )}
        </div>

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => navigate("/phone-number")}
            className="text-[13px] text-muted-foreground hover:text-foreground transition-colors"
          >
            Change phone number
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyPhone;
