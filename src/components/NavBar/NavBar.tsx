import React, { ReactNode } from "react";
import { cn } from "@/lib/utils"; // Assuming you have a utils file for cn
import { Home, Briefcase, User, FileText } from "lucide-react"; // Assuming lucide-react for icons

// Define direction type to ensure type safety - Copied from App.tsx, consider moving to a types file
type AnimationDirection = "up" | "down" | "left" | "right";

// Animation utility for entry animations - Copied from App.tsx, consider moving to a utils file
type AnimatedEntryProps = {
  children: React.ReactNode;
  delay?: number;
  direction?: AnimationDirection;
};

const AnimatedEntry = ({
  children,
  delay = 0,
  direction = "up",
}: AnimatedEntryProps) => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const directionClasses: Record<AnimationDirection, string> = {
    up: "translate-y-10",
    down: "-translate-y-10",
    left: "translate-x-10",
    right: "-translate-x-10",
  };

  return (
    <div
      className={cn(
        "transition-all duration-700 ease-out transform opacity-0",
        directionClasses[direction],
        isVisible && "opacity-100 translate-x-0 translate-y-0"
      )}
    >
      {children}
    </div>
  );
};

// NavBar Components with hover effects
type NavItemProps = {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
  icon: ReactNode;
  delay?: number;
};

const NavItem = ({
  active,
  onClick,
  children,
  icon,
  delay = 0,
}: NavItemProps) => {
  return (
    <AnimatedEntry delay={delay} direction="down">
      <button
        onClick={onClick}
        className={cn(
          "px-4 py-2 rounded-md transition-all duration-300 flex items-center gap-2 font-medium",
          active
            ? "bg-teal-500 text-white shadow-lg shadow-teal-500/20"
            : "hover:bg-teal-100 hover:text-teal-800 dark:hover:bg-teal-900 dark:hover:text-teal-200"
        )}
      >
        {icon}
        <span>{children}</span>
      </button>
    </AnimatedEntry>
  );
};

type NavBarProps = {
  activeSection: string;
  setActiveSection: (section: string) => void;
  themeToggleComponent: ReactNode;
};

const NavBar = ({
  activeSection,
  setActiveSection,
  themeToggleComponent,
}: NavBarProps) => {
  return (
    <header className="sticky top-0 z-10 backdrop-blur-lg bg-white/80 dark:bg-slate-900/80 border-b border-teal-100 dark:border-teal-900 shadow-sm">
      <div className="container mx-auto py-4 px-4 flex justify-between items-center">
        <AnimatedEntry>
          <div className="text-2xl font-bold bg-gradient-to-r from-teal-500 to-blue-500 text-transparent bg-clip-text">
            Pukan.tech
          </div>
        </AnimatedEntry>

        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-2">
            <NavItem
              active={activeSection === "patrik"}
              onClick={() => setActiveSection("patrik")}
              icon={<User className="h-5 w-5" />}
              delay={200}
            >
              Patrik
            </NavItem>
            <NavItem
              active={activeSection === "projects"}
              onClick={() => setActiveSection("projects")}
              icon={<Briefcase className="h-5 w-5" />}
              delay={300}
            >
              Projects
            </NavItem>
            <NavItem
              active={activeSection === "about"}
              onClick={() => setActiveSection("about")}
              icon={<FileText className="h-5 w-5" />}
              delay={400}
            >
              About
            </NavItem>
          </nav>
          {themeToggleComponent}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
