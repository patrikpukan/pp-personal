import { ReactNode, useEffect, useState } from "react";
import { cn } from "@/lib/utils"; // Assuming you have a utils file for cn

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

const AboutMeSection = () => {
  const skills = [
    {
      category: "Languages",
      items: ["TypeScript", "JavaScript", "HTML", "CSS", "Kotlin"],
    },
    {
      category: "Frameworks",
      items: ["React", "Next.js", "Express", "Tailwind CSS"],
    },
    { category: "Tools", items: ["Git", "Docker", "Figma", "VS Code"] },
    {
      category: "Other",
      items: ["RESTful APIs", "GraphQL", "UI/UX Design", "Responsive Design"],
    },
  ];

  const timeline = [
    {
      year: "2023",
      title: "Senior Frontend Developer",
      company: "Tech Solutions Inc.",
    },
    {
      year: "2021",
      title: "UI/UX Designer & Developer",
      company: "Creative Studio",
    },
    { year: "2019", title: "Web Developer", company: "Digital Agency" },
    {
      year: "2018",
      title: "Graduated University",
      company: "BSc Computer Science",
    },
  ];

  return (
    <div className="space-y-12 py-8">
      <AnimatedEntry>
        <div className="relative">
          <div className="absolute -top-16 -left-8 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
          <div className="absolute -bottom-16 -right-8 w-64 h-64 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <h1 className="text-6xl font-bold tracking-tight bg-gradient-to-br from-teal-600 to-blue-500 text-transparent bg-clip-text relative">
            About Me
          </h1>
        </div>
      </AnimatedEntry>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3 space-y-6">
          <AnimatedEntry delay={200}>
            <p className="text-xl leading-relaxed text-slate-700 dark:text-slate-200">
              I'm a passionate developer on a mission to create beautiful,
              functional, and accessible web experiences. My journey in tech
              began with a fascination for how digital interfaces shape our
              interactions with technology.
            </p>
          </AnimatedEntry>

          <AnimatedEntry delay={400}>
            <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
              With over 5 years of experience in web development, I've had the
              opportunity to work on diverse projects across various industries,
              from e-commerce platforms to interactive dashboards and creative
              portfolios.
            </p>
          </AnimatedEntry>

          <AnimatedEntry delay={600}>
            <div className="mt-8 space-y-8">
              <h2 className="text-2xl font-bold text-teal-600 dark:text-teal-300">
                Experience Timeline
              </h2>
              <div className="relative border-l-2 border-teal-300 dark:border-teal-700 pl-8 ml-4 space-y-10">
                {timeline.map((item, index) => (
                  <div key={index} className="relative">
                    <div className="absolute -left-[42px] flex items-center justify-center w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900 border-2 border-teal-300 dark:border-teal-700">
                      <div className="w-3 h-3 rounded-full bg-teal-500"></div>
                    </div>
                    <p className="text-sm text-teal-500 dark:text-teal-400 font-semibold mb-1">
                      {item.year}
                    </p>
                    <h3 className="text-xl font-medium text-slate-800 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300">
                      {item.company}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedEntry>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <AnimatedEntry delay={300} direction="left">
            <div className="rounded-xl border-2 border-teal-100 dark:border-teal-900 overflow-hidden">
              <div className="bg-teal-500 text-white py-3 px-6">
                <h2 className="text-xl font-bold">Skills & Expertise</h2>
              </div>
              <div className="p-6 space-y-6 bg-white dark:bg-slate-800">
                {skills.map((skillGroup, groupIndex) => (
                  <div key={groupIndex}>
                    <h3 className="text-lg font-medium text-teal-600 dark:text-teal-300 mb-3">
                      {skillGroup.category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-900/40 text-teal-600 dark:text-teal-300 text-sm hover:bg-teal-100 dark:hover:bg-teal-800/40 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedEntry>

          <AnimatedEntry delay={500} direction="left">
            <div className="rounded-xl border-2 border-teal-100 dark:border-teal-900 overflow-hidden">
              <div className="bg-teal-500 text-white py-3 px-6">
                <h2 className="text-xl font-bold">Interests & Hobbies</h2>
              </div>
              <div className="p-6 space-y-2 bg-white dark:bg-slate-800">
                <p className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
                  <span className="text-xl">📚</span> Reading science fiction
                  and design books
                </p>
                <p className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
                  <span className="text-xl">🏔️</span> Hiking and outdoor
                  adventures
                </p>
                <p className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
                  <span className="text-xl">🎮</span> Strategy games and game
                  design
                </p>
                <p className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
                  <span className="text-xl">🎸</span> Playing guitar and music
                  production
                </p>
              </div>
            </div>
          </AnimatedEntry>
        </div>
      </div>
    </div>
  );
};

export default AboutMeSection;
