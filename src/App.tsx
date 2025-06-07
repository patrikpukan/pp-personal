import { useState, useEffect, useCallback } from "react";
import { Moon, Sun, Mail, Github, Linkedin } from "lucide-react"; // Removed FileText
import { cn } from "@/lib/utils"; // Assuming you have a utils file for cn
import NavBar from "./components/NavBar/NavBar"; // Import NavBar
import ProjectsSection from "./components/Projects/Projects"; // Import ProjectsSection
import AboutMeSection from "./components/About/About"; // Import AboutMeSection
import PatrikSection from "./components/Intro/Intro"; // Added import for PatrikSection

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
