import { useState } from "react";
import { useLocation } from "react-router-dom";
import { NavLink } from "@/components/NavLink";
import { Compass, Home, CircleDollarSign, User, HelpCircle, Menu, X } from "lucide-react";

export const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const handleHelpSupport = () => {
    window.location.href = "mailto:abc@gmail.com?subject=Support%20Request";
  };

  const navItems = [
    { path: "/explore", label: "Explore", icon: Compass },
    { path: "/home", label: "Home", icon: Home },
    { path: "/earnings", label: "Earnings", icon: CircleDollarSign },
    { path: "/profile", label: "Profile", icon: User },
  ];

  return (
    <>
      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 h-14 bg-background border-b border-border flex items-center justify-between px-4 z-50 md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-9 h-9 flex items-center justify-center hover:bg-muted/40 rounded-lg transition-colors"
        >
          {isOpen ? (
            <X className="w-5 h-5 text-foreground" strokeWidth={1.75} />
          ) : (
            <Menu className="w-5 h-5 text-foreground" strokeWidth={1.75} />
          )}
        </button>
        
        <span className="text-[15px] font-medium">
          {navItems.find(item => item.path === location.pathname)?.label || "App"}
        </span>
        
        <div className="w-9" /> {/* Spacer for centering */}
      </header>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <aside
        className={`
          fixed left-0 top-14 bottom-0 w-64 bg-background border-r border-border z-40 transition-transform duration-300 md:hidden
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <nav className="flex flex-col h-full">
          <div className="flex-1 px-4 pt-6 pb-4 space-y-0.5 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`
                    flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 text-[15px]
                    ${
                      isActive
                        ? "bg-primary text-primary-foreground font-normal"
                        : "text-foreground/65 hover:text-foreground hover:bg-muted/40 font-normal"
                    }
                  `}
                >
                  <Icon className="w-[19px] h-[19px]" strokeWidth={1.75} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </div>

          <div className="px-4 py-4 border-t border-border">
            <button 
              onClick={() => {
                handleHelpSupport();
                setIsOpen(false);
              }}
              className="flex items-center gap-3 px-3 py-2 w-full text-[15px] font-normal text-foreground/65 hover:text-foreground hover:bg-muted/40 rounded-lg transition-all duration-200"
            >
              <HelpCircle className="w-[19px] h-[19px]" strokeWidth={1.75} />
              <span>Help & Support</span>
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
};
