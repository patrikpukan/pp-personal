import { useState, useEffect, ReactNode } from "react";
import { Mail, Github, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";

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
              I am a Software Developer and a student of Prague Univeristy of
              Business and Economics, specializing in Information Technology. My
              expertise lies in full-stack development, with a focus on React
              and Android applications.
            </p>
          </AnimatedEntry>

          <AnimatedEntry delay={800}>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 rounded-md bg-teal-500 text-white font-medium hover:bg-teal-600 transition-colors shadow-lg shadow-teal-500/20 hover:shadow-xl hover:shadow-teal-500/30 flex items-center gap-2 group">
                <Mail className="w-5 h-5 group-hover:animate-bounce" />
                <span>Contact Me</span>
              </button>
              <button className="px-6 py-3 rounded-md border-2 border-teal-500 text-teal-600 dark:text-teal-300 font-medium hover:bg-teal-500/10 transition-colors flex items-center gap-2">
                <Linkedin className="w-5 h-5" />
                <span>My LinkedIn</span>
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
            { number: "4+", label: "Years Experience" },
            { number: "5+", label: "Projects Completed" },
            { number: "3", label: "Happy Clients" },
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

export default PatrikSection;
