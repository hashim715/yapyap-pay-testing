import { CircleDollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PageWrapper, PageSection } from "@/components/PageWrapper";

const Earnings = () => {
  return (
    <PageWrapper fullWidth>
      <PageSection constrained>
        <div className="mb-6">
          <h2 className="text-xl font-medium tracking-tight mb-1.5">
            Earnings
          </h2>
          <p className="text-muted-foreground text-[13px]">
            Track how your conversations turn into income.
          </p>
        </div>

        <Card className="border-border">
          <CardContent className="p-8 md:p-12 flex flex-col items-center text-center">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/[0.04] flex items-center justify-center mb-5 md:mb-6">
              <CircleDollarSign
                className="w-5 h-5 md:w-6 md:h-6 text-primary"
                strokeWidth={1.75}
              />
            </div>

            <h2 className="text-base md:text-lg font-medium mb-2">
              Earnings dashboard coming soon
            </h2>

            <p className="text-[13px] text-muted-foreground max-w-lg mb-4 md:mb-5">
              We're building a comprehensive earnings dashboard to help you
              track your income, view payment history, and analyze your
              conversation performance.
            </p>

            <button className="text-[13px] text-primary hover:underline transition-all duration-200">
              Learn more about earnings
            </button>
          </CardContent>
        </Card>
      </PageSection>
    </PageWrapper>
  );
};

export default Earnings;
