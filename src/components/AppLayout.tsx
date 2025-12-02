import { Outlet, useLocation } from "react-router-dom";
import { NavLink } from "@/components/NavLink";
import { MobileNav } from "@/components/MobileNav";
import { SwipeIndicator } from "@/components/SwipeIndicator";
import { useSwipeNavigation } from "@/hooks/useSwipeNavigation";
import { Compass, Home, CircleDollarSign, User, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const AppLayout = () => {
  const location = useLocation();
  const swipeHandlers = useSwipeNavigation();
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null);

  const handleHelpSupport = () => {
    window.location.href = "mailto:abc@gmail.com?subject=Support%20Request";
  };

  const navItems = [
    { path: "/explore", label: "Explore", icon: Compass },
    { path: "/home", label: "Home", icon: Home },
    { path: "/earnings", label: "Earnings", icon: CircleDollarSign },
    { path: "/profile", label: "Profile", icon: User },
  ];

  // Enhanced swipe handlers with visual feedback
  const enhancedSwipeHandlers = {
    ...swipeHandlers,
    onSwiping: (eventData: any) => {
      if (Math.abs(eventData.deltaX) > 50) {
        setSwipeDirection(eventData.deltaX < 0 ? "left" : "right");
      }
    },
    onSwiped: () => {
      setSwipeDirection(null);
    },
  };

  // Get next/prev page label for swipe indicator
  const getSwipeLabel = () => {
    const currentIndex = navItems.findIndex(item => item.path === location.pathname);
    if (swipeDirection === "left" && currentIndex < navItems.length - 1) {
      return navItems[currentIndex + 1].label;
    }
    if (swipeDirection === "right" && currentIndex > 0) {
      return navItems[currentIndex - 1].label;
    }
    return undefined;
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Swipe direction indicator */}
      <SwipeIndicator direction={swipeDirection} label={getSwipeLabel()} />

      {/* Mobile Navigation */}
      <MobileNav />

      {/* Desktop Left Sidebar Navigation - Fixed */}
      <aside className="hidden md:fixed md:flex md:left-0 md:top-0 md:h-screen md:w-64 border-r border-border bg-background flex-col z-50">
        {/* Navigation Items */}
        <nav className="flex-1 px-6 pt-16 pb-8 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`
                  flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 text-[15px]
                  ${
                    isActive
                      ? "bg-primary text-primary-foreground font-normal"
                      : "text-foreground/65 hover:text-foreground hover:bg-muted/40 font-normal hover:translate-x-0.5"
                  }
                `}
              >
                <Icon className="w-[19px] h-[19px]" strokeWidth={1.75} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="px-6 py-6 space-y-0.5">
          <button 
            onClick={handleHelpSupport}
            className="flex items-center gap-3 px-3 py-2 w-full text-[15px] font-normal text-foreground/65 hover:text-foreground hover:bg-muted/40 rounded-lg transition-all duration-200 hover:translate-x-0.5"
          >
            <HelpCircle className="w-[19px] h-[19px]" strokeWidth={1.75} />
            <span>Help & Support</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area - Responsive offset with swipe support */}
      <main 
        {...enhancedSwipeHandlers}
        className="flex-1 md:ml-64 pt-14 md:pt-0 overflow-auto touch-pan-y"
      >
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
