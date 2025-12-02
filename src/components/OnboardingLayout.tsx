import { ReactNode } from "react";

interface OnboardingLayoutProps {
  children: ReactNode;
  currentStep?: number;
  totalSteps?: number;
  showProgress?: boolean;
}

export const OnboardingLayout = ({ 
  children, 
  currentStep = 0, 
  totalSteps = 10,
  showProgress = false 
}: OnboardingLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Minimal progress indicator */}
      {showProgress && (
        <div className="fixed top-0 left-0 right-0 h-[2px] bg-border z-50">
          <div 
            className="h-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      )}

      {/* Centered content - tighter spacing */}
      <div className="flex flex-col items-center justify-center min-h-screen px-6 py-16">
        <div className="w-full max-w-[520px] animate-fade-in">
          {children}
        </div>
      </div>
    </div>
  );
};
