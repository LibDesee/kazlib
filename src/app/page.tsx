import { PageLayout } from "@/components/shared/page-layout";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassButton } from "@/components/ui/glass-button";
import { ArrowRight, Sparkles, Map, GraduationCap, BrainCircuit, School, Calculator, MessageCircle } from "lucide-react";
import Link from "next/link";

const features = [
  {
    title: "AI RoadMap",
    description: "Build your future with AI-driven career paths.",
    icon: Map,
    href: "/roadmap",
    color: "text-blue-400",
  },
  {
    title: "University Hub",
    description: "Find your dream university locally or abroad.",
    icon: GraduationCap,
    href: "/universities",
    color: "text-violet-400",
  },
  {
    title: "Personality Test",
    description: "Discover your strengths and ideal career matches.",
    icon: BrainCircuit,
    href: "/personality",
    color: "text-pink-400",
  },
  {
    title: "Grades Polygon",
    description: "Calculate and predict your term grades instantly.",
    icon: Calculator,
    href: "/grades",
    color: "text-green-400",
  },
  {
    title: "School Ecosystem",
    description: "Schedules, canteen menu, and student search.",
    icon: School,
    href: "/school",
    color: "text-orange-400",
  },
  {
    title: "Social Hub",
    description: "Connect with peers and share your journey.",
    icon: MessageCircle,
    href: "/social",
    color: "text-cyan-400",
  },
];

export default function Home() {
  return (
    <PageLayout>
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel bg-white/5 text-sm font-medium text-accent-primary animate-pulse">
          <Sparkles size={16} />
          <span>The Future of Student Education</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white/80 to-white/50 tracking-tight">
          KazLib — <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-secondary">
            Будущее учеников
          </span>
        </h1>

        <p className="text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed">
          Your all-in-one ecosystem for academic success, career planning, and student life in Kazakhstan.
        </p>

        <div className="flex gap-4 pt-4">
          <GlassButton size="lg" variant="primary">
            Get Started <ArrowRight className="ml-2 w-5 h-5" />
          </GlassButton>
          <GlassButton size="lg" variant="glass">
            Learn More
          </GlassButton>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
        {features.map((feature) => (
          <Link key={feature.title} href={feature.href}>
            <GlassCard className="h-full flex flex-col gap-4 group cursor-pointer hover:border-white/20">
              <div className={`p-3 rounded-xl bg-white/5 w-fit group-hover:bg-white/10 transition-colors ${feature.color}`}>
                <feature.icon size={32} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 transition-all">
                  {feature.title}
                </h3>
                <p className="text-white/50 text-sm group-hover:text-white/70 transition-colors">
                  {feature.description}
                </p>
              </div>
            </GlassCard>
          </Link>
        ))}
      </div>
    </PageLayout>
  );
}
