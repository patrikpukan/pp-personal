import { ReactNode, useEffect, useState } from "react";
import { Github, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming you have a utils file for cn
import projectsData from "./projects.json";

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

// Project card type definitions
type ProjectType = {
  title: string;
  description: string;
  tags: string[];
  image: string;
};

type ProjectCardProps = {
  project: ProjectType;
  index: number;
};

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  return (
    <AnimatedEntry
      delay={200 * index}
      direction={index % 2 === 0 ? "left" : "right"}
    >
      <div className="group rounded-xl overflow-hidden border border-teal-100 dark:border-teal-900 hover:border-teal-300 dark:hover:border-teal-700 transition-all duration-300 hover:shadow-xl bg-white dark:bg-slate-800">
        <div className="h-48 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-cyan-400 flex items-center justify-center text-7xl group-hover:scale-110 transition-transform duration-700">
            {project.image}
          </div>
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex gap-2">
              <a
                href="#"
                className="p-2 bg-white/90 rounded-full hover:bg-white text-teal-600 transition-colors"
                title="View live site"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 bg-white/90 rounded-full hover:bg-white text-teal-600 transition-colors"
                title="View code"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
        <div className="p-6 space-y-3">
          <h3 className="font-bold text-xl text-teal-600 dark:text-teal-300">
            {project.title}
          </h3>
          <p className="text-slate-600 dark:text-slate-300 line-clamp-3">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {project.tags.map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="px-3 py-1 bg-teal-100 dark:bg-teal-900/60 text-teal-600 dark:text-teal-300 text-xs rounded-full hover:bg-teal-200 dark:hover:bg-teal-800 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </AnimatedEntry>
  );
};

const ProjectsSection = () => {
  const projects = projectsData;

  return (
    <div className="space-y-8 py-8">
      <AnimatedEntry>
        <div className="relative">
          <div className="absolute -top-16 -right-8 w-64 h-64 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-32 -left-8 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <h1 className="text-6xl font-bold tracking-tight bg-gradient-to-br from-teal-600 to-blue-500 text-transparent bg-clip-text relative">
            Projects
          </h1>
        </div>
      </AnimatedEntry>

      <AnimatedEntry delay={200}>
        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl">
          Explore a selection of my work across various domains and
          technologies. Each project represents my approach to problem-solving
          and attention to detail.
        </p>
      </AnimatedEntry>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>
    </div>
  );
};

export default ProjectsSection;
