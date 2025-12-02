import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
  /** If true, content will use full width. If false, max-width constraint is applied. */
  fullWidth?: boolean;
}

/**
 * PageWrapper - Consistent layout wrapper for all pages
 * Provides standardized padding and optional max-width constraints
 */
export const PageWrapper = ({
  children,
  className,
  fullWidth = false,
}: PageWrapperProps) => {
  return (
    <div
      className={cn(
        "py-[var(--page-padding-y-mobile)] px-[var(--page-padding-x-mobile)]",
        "md:py-[var(--page-padding-y-tablet)] md:px-[var(--page-padding-x-tablet)]",
        "lg:py-[var(--page-padding-y)] lg:px-[var(--page-padding-x)]",
        fullWidth ? "w-full" : "max-w-[var(--content-max-width)]",
        className
      )}
    >
      {children}
    </div>
  );
};

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

/**
 * PageHeader - Consistent header section for pages
 * Provides standardized spacing and typography matching onboarding style
 */
export const PageHeader = ({
  title,
  description,
  className,
}: PageHeaderProps) => {
  return (
    <div className={cn("mb-6", className)}>
      <h2 className="text-xl font-medium tracking-tight mb-1.5">{title}</h2>
      {description && (
        <p className="text-muted-foreground text-[13px]">{description}</p>
      )}
    </div>
  );
};

interface PageSectionProps {
  children: ReactNode;
  className?: string;
  /** If true, section will use max-width constraint */
  constrained?: boolean;
}

/**
 * PageSection - Wrapper for page sections that may need max-width constraints
 */
export const PageSection = ({
  children,
  className,
  constrained = false,
}: PageSectionProps) => {
  return (
    <div
      className={cn(
        constrained && "max-w-[var(--content-max-width)]",
        className
      )}
    >
      {children}
    </div>
  );
};
