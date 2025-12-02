import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { OnboardingLayout } from "@/components/OnboardingLayout";
import { Button } from "@/components/ui/button";
import { formStorage } from "@/utils/formStorage";

const TutorialQuiz = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const questions = [
    {
      id: "engagement",
      question: "How do you ensure you have good engagement?",
      options: [
        "Active listening and asking follow-up questions",
        "Speaking quickly without pauses",
        "Only discussing topics you prefer",
        "Ignoring your conversation partner",
      ],
      correctAnswer: "Active listening and asking follow-up questions",
    },
    {
      id: "audioQuality",
      question: "What do you need to have high quality audio?",
      options: [
        "A quiet environment and a good microphone",
        "Background music playing",
        "Multiple people talking at once",
        "Any environment is fine",
      ],
      correctAnswer: "A quiet environment and a good microphone",
    },
    {
      id: "pii",
      question: "What is an example of Personally Identifiable Information?",
      options: [
        "Full name, address, or social security number",
        "Favorite color",
        "General opinions",
        "Weather preferences",
      ],
      correctAnswer: "Full name, address, or social security number",
    },
    {
      id: "inappropriate",
      question: "What is an example of inappropriate content?",
      options: [
        "Hate speech, explicit content, or personal attacks",
        "Discussing current events",
        "Sharing personal hobbies",
        "Talking about the weather",
      ],
      correctAnswer: "Hate speech, explicit content, or personal attacks",
    },
  ];

  useEffect(() => {
    const savedData = formStorage.get();
    if (savedData.quizAnswers) {
      setAnswers(savedData.quizAnswers);
    }
  }, []);

  const allAnswered = questions.every((q) => answers[q.id]);

  const handleContinue = () => {
    formStorage.update({
      quizAnswers: answers,
    });
    navigate("/onboarding/audio-test");
  };

  return (
    <OnboardingLayout currentStep={10} totalSteps={10} showProgress>
      <div className="space-y-7 max-w-xl mx-auto">
        <div>
          <h2 className="text-xl font-medium tracking-tight mb-2">
            Tutorial Quiz
          </h2>
          <p className="text-muted-foreground text-[13px]">
            Please answer these questions to proceed.
          </p>
        </div>

        <div className="space-y-6">
          {questions.map((q, qIndex) => (
            <div key={q.id} className="space-y-2.5">
              <h3 className="text-[13px] font-medium text-foreground">
                {qIndex + 1}. {q.question}
              </h3>
              <div className="space-y-2">
                {q.options.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setAnswers({ ...answers, [q.id]: option })}
                    className={`w-full px-3.5 py-2.5 text-left border rounded-lg transition-all text-[12px] ${
                      answers[q.id] === option
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/20 hover:bg-muted/30"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-3.5 h-3.5 rounded-full border-[1.5px] transition-all flex-shrink-0 ${
                          answers[q.id] === option
                            ? "border-primary bg-primary"
                            : "border-muted-foreground/30"
                        }`}
                      >
                        {answers[q.id] === option && (
                          <div className="w-full h-full rounded-full bg-background scale-50" />
                        )}
                      </div>
                      <span className="leading-relaxed">{option}</span>
                    </div>
                  </button>
                ))}
              </div>
              {qIndex < questions.length - 1 && (
                <div className="h-px bg-border mt-4" />
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            onClick={() => navigate("/onboarding/tutorial-video")}
            className="h-9 px-4 text-[13px]"
          >
            Back
          </Button>
          <Button
            onClick={() => handleContinue()}
            disabled={!allAnswered}
            className="flex-1 h-9 text-[13px]"
          >
            Continue to Audio Test
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default TutorialQuiz;
