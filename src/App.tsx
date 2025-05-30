import { useState, useEffect, ReactNode, useCallback } from "react";
import { Moon, Sun, Mail, FileText, Github, Linkedin } from "lucide-react"; // Assuming lucide-react for icons
import { cn } from "@/lib/utils"; // Assuming you have a utils file for cn
import NavBar from "./components/NavBar/NavBar"; // Import NavBar
import ProjectsSection from "./components/Projects/Projects"; // Import ProjectsSection
import AboutMeSection from "./components/About/About"; // Import AboutMeSection

// Define direction type to ensure type safety
type AnimationDirection = "up" | "down" | "left" | "right";

// Animation utility for entry animations
type AnimatedEntryProps = {
  children: ReactNode;
  delay?: number;
  direction?: AnimationDirection;
};

const AnimatedEntry = ({
  children,
  delay = 0,
  direction = "up",
}: AnimatedEntryProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
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

// Theme Toggle Component
const ThemeToggle = () => {
  // 'system', 'dark', or 'light'
  type ThemeType = "system" | "dark" | "light";
  const [theme, setTheme] = useState<ThemeType>("system");

  // Apply theme based on current setting
  const applyTheme = useCallback((newTheme: ThemeType) => {
    // If system preference, check what system prefers
    if (newTheme === "system") {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      document.documentElement.classList.toggle("dark", prefersDark);
    } else {
      document.documentElement.classList.toggle("dark", newTheme === "dark");
    }
  }, []);

  useEffect(() => {
    // Check if theme is stored in localStorage
    const savedTheme = localStorage.getItem("theme") || "system";
    setTheme(savedTheme as ThemeType);
    applyTheme(savedTheme as ThemeType);

    // Add listener for system preference changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (theme === "system") {
        applyTheme("system");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme, applyTheme]);

  const setThemeWithSave = (newTheme: ThemeType) => {
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  // Toggle between themes cyclically: system -> light -> dark -> system
  const cycleTheme = () => {
    const themes: ThemeType[] = ["system", "light", "dark"];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setThemeWithSave(themes[nextIndex]);
  };

  return (
    <div className="relative">
      <button
        onClick={cycleTheme}
        className="p-2 rounded-full bg-background hover:bg-muted transition-colors"
        aria-label="Toggle theme"
      >
        {theme === "dark" ? (
          <Moon className="h-5 w-5 text-teal-400" />
        ) : theme === "light" ? (
          <Sun className="h-5 w-5 text-yellow-500" />
        ) : (
          <div className="h-5 w-5 relative">
            <Sun className="h-5 w-5 text-yellow-500 absolute opacity-50" />
            <Moon className="h-5 w-5 text-teal-500 absolute opacity-50" />
          </div>
        )}
      </button>

      {/* <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
        {theme === "system" ? "System" : theme === "dark" ? "Dark" : "Light"}
      </span> */}
    </div>
  );
};

// Section Components
const PatrikSection = () => {
  return (
    <div className="space-y-12 py-8">
      <AnimatedEntry>
        <div className="relative">
          <div className="absolute -top-16 -left-8 w-64 h-64 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-16 -right-8 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-32 right-32 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
          <h1 className="text-6xl font-bold tracking-tight bg-gradient-to-br from-teal-600 to-blue-500 text-transparent bg-clip-text relative">
            Patrik Pukán
          </h1>
        </div>
      </AnimatedEntry>

      <div className="flex flex-col md:flex-row gap-10 items-center md:items-start relative">
        <AnimatedEntry delay={200}>
          <div className="w-48 h-48 rounded-full bg-gradient-to-tr from-teal-500 to-cyan-400 shadow-xl shadow-teal-500/20 p-1">
            <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden">
              <span className="text-7xl animate-pulse">👨‍💻</span>
            </div>
          </div>
        </AnimatedEntry>

        <div className="space-y-6 max-w-2xl">
          <AnimatedEntry delay={400}>
            <h2 className="text-2xl font-medium text-teal-500 dark:text-teal-300">
              Software Developer & Problem Solver
            </h2>
          </AnimatedEntry>

          <AnimatedEntry delay={600}>
            <p className="text-lg leading-relaxed">
              This site is currently under construction and information in it is
              not factual. Please check back later for updates.
            </p>
          </AnimatedEntry>

          <AnimatedEntry delay={800}>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 rounded-md bg-teal-500 text-white font-medium hover:bg-teal-600 transition-colors shadow-lg shadow-teal-500/20 hover:shadow-xl hover:shadow-teal-500/30 flex items-center gap-2 group">
                <Mail className="w-5 h-5 group-hover:animate-bounce" />
                <span>Contact Me</span>
              </button>
              <button className="px-6 py-3 rounded-md border-2 border-teal-500 text-teal-600 dark:text-teal-300 font-medium hover:bg-teal-500/10 transition-colors flex items-center gap-2">
                <FileText className="w-5 h-5" />
                <span>Download CV</span>
              </button>
            </div>
          </AnimatedEntry>

          <AnimatedEntry delay={1000}>
            <div className="flex gap-4 pt-4">
              <a
                href="#"
                className="p-2 text-teal-600 dark:text-teal-300 hover:text-teal-800 dark:hover:text-teal-100 transition-colors"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="p-2 text-teal-600 dark:text-teal-300 hover:text-teal-800 dark:hover:text-teal-100 transition-colors"
              >
                <Mail className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="p-2 text-teal-600 dark:text-teal-300 hover:text-teal-800 dark:hover:text-teal-100 transition-colors"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              {/* Add more social icons as needed */}
            </div>
          </AnimatedEntry>
        </div>
      </div>

      <AnimatedEntry delay={1200}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {[
            { number: "5+", label: "Years Experience" },
            { number: "20+", label: "Projects Completed" },
            { number: "15+", label: "Happy Clients" },
          ].map((stat, index) => (
            <div
              key={index}
              className="p-6 rounded-lg border-2 border-teal-100 dark:border-teal-900 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm hover:border-teal-300 dark:hover:border-teal-700 transition-colors group hover:shadow-lg"
            >
              <h3 className="text-4xl font-bold text-teal-600 dark:text-teal-300 group-hover:scale-110 transition-transform">
                {stat.number}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </AnimatedEntry>
    </div>
  );
};

// Custom styled scrollbar for the page
const GlobalStyles = () => {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      ::-webkit-scrollbar {
        width: 10px;
      }
      ::-webkit-scrollbar-track {
        background: #f1f5f9;
      }
      .dark ::-webkit-scrollbar-track {
        background: #1e293b;
      }
      ::-webkit-scrollbar-thumb {
        background: #14b8a6;
        border-radius: 5px;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: #0f766e;
      }
      
      /* Animation utilities */
      .animation-delay-2000 {
        animation-delay: 2s;
      }
      .animation-delay-4000 {
        animation-delay: 4s;
      }
      
      @keyframes blob {
        0% {
          transform: translate(0px, 0px) scale(1);
        }
        33% {
          transform: translate(30px, -50px) scale(1.2);
        }
        66% {
          transform: translate(-20px, 20px) scale(0.8);
        }
        100% {
          transform: translate(0px, 0px) scale(1);
        }
      }
      .animate-blob {
        animation: blob 10s infinite;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return null;
};

// Main App Component
const App = () => {
  const [activeSection, setActiveSection] = useState("patrik");
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  return (
    <div
      className={cn(
        "min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white transition-colors duration-300",
        !isPageLoaded && "opacity-0"
      )}
    >
      <GlobalStyles />

      <NavBar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        themeToggleComponent={<ThemeToggle />}
      />

      <main className="container mx-auto py-12 px-4">
        {activeSection === "patrik" && <PatrikSection />}
        {activeSection === "projects" && <ProjectsSection />}
        {activeSection === "about" && <AboutMeSection />}
      </main>

      <footer className="border-t border-teal-100 dark:border-teal-900 mt-auto">
        <div className="container mx-auto py-8 px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-600 dark:text-slate-300">
            © {new Date().getFullYear()} Pukan.tech | Crafted with 💙 and React
          </p>
          <div className="flex gap-6">
            <a
              href="https://github.com/patrikpukan"
              className="text-slate-600 hover:text-teal-500 dark:text-slate-300 dark:hover:text-teal-300 transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-slate-600 hover:text-teal-500 dark:text-slate-300 dark:hover:text-teal-300 transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/patrik-pukan/"
              className="text-slate-600 hover:text-teal-500 dark:text-slate-300 dark:hover:text-teal-300 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            {/* Add more social icons as needed */}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
