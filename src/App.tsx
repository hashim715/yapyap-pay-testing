import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Earnings from "./pages/Earnings";
import Profile from "./pages/Profile";
import Room from "./pages/Room";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import TermsOfUse from "./pages/TermsOfUse";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import HowItWorks from "./pages/HowItWorks";
import PhoneNumber from "./pages/PhoneNumber";
import VerifyPhone from "./pages/VerifyPhone";
import Welcome from "./pages/onboarding/Welcome";
import Step1 from "./pages/onboarding/Step1";
import Step2 from "./pages/onboarding/Step2";
import Step3 from "./pages/onboarding/Step3";
import Step4 from "./pages/onboarding/Step4";
import Step5 from "./pages/onboarding/Step5";
import Step6 from "./pages/onboarding/Step6";
import Step7 from "./pages/onboarding/Step7";
import Step8 from "./pages/onboarding/Step8";
import Step9 from "./pages/onboarding/Step9";
import Step10 from "./pages/onboarding/Step10";
import Step11 from "./pages/onboarding/Step11";
import TutorialVideo from "./pages/onboarding/TutorialVideo";
import TutorialQuiz from "./pages/onboarding/TutorialQuiz";
import AudioTest from "./pages/onboarding/AudioTest";
import Submitted from "./pages/onboarding/Submitted";
import { Provider } from "react-redux";
import { store } from "./store/store";
import ProtectedRoute from "./pages/ProtectedRoute";
import ProtectOnboardingRoute from "./pages/ProtectOnboardingRoute";
import ProtectUserRegisterRoute from "./pages/ProtectUserRegisterRoutes";
import ProtectVerificationRoute from "./pages/ProtectVerificationRoutes";
import ProtectOnboardingSubmittedRoute from "./pages/ProtectOnBoardingSubmitted";
import GoogleOAuthCallback from "./pages/GoogleOAuthCallback";
import JoinPage from "./pages/JoinPage";
import ProtectedRoomRoute from "./pages/ProtectedRoomRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route element={<ProtectUserRegisterRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route
                path="/google/auth/callback"
                element={<GoogleOAuthCallback />}
              ></Route>
            </Route>

            <Route element={<ProtectVerificationRoute />}>
              <Route path="/phone-number" element={<PhoneNumber />} />
              <Route
                path="/verify-phone/:phoneNumber"
                element={<VerifyPhone />}
              />
            </Route>

            <Route element={<ProtectOnboardingRoute />}>
              <Route path="/onboarding/welcome" element={<Welcome />} />
              <Route path="/onboarding/step-1" element={<Step1 />} />
              <Route path="/onboarding/step-2" element={<Step2 />} />
              <Route path="/onboarding/step-3" element={<Step3 />} />
              <Route path="/onboarding/step-4" element={<Step4 />} />
              <Route path="/onboarding/step-5" element={<Step5 />} />
              <Route path="/onboarding/step-6" element={<Step6 />} />
              <Route path="/onboarding/step-7" element={<Step7 />} />
              <Route path="/onboarding/step-8" element={<Step8 />} />
              <Route path="/onboarding/step-9" element={<Step9 />} />
              <Route path="/onboarding/step-10" element={<Step10 />} />
              <Route path="/onboarding/step-11" element={<Step11 />} />
              <Route
                path="/onboarding/tutorial-video"
                element={<TutorialVideo />}
              />
              <Route
                path="/onboarding/tutorial-quiz"
                element={<TutorialQuiz />}
              />
              <Route path="/onboarding/audio-test" element={<AudioTest />} />
            </Route>

            <Route element={<ProtectOnboardingSubmittedRoute />}>
              <Route path="/onboarding/submitted" element={<Submitted />} />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route element={<AppLayout />}>
                <Route path="/" element={<Explore />} />
                <Route path="/home" element={<Home />} />
                <Route path="/earnings" element={<Earnings />} />
                <Route path="/profile" element={<Profile />} />
              </Route>
              <Route
                path="/join/:meetingName/:roomPasscode"
                element={<JoinPage />}
              ></Route>
            </Route>

            <Route element={<ProtectedRoomRoute />}>
              <Route
                path="/room/:meetingName/:roomPasscode"
                element={<Room />}
              />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
