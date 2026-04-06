"use client";

import { PageLayout } from "@/components/shared/page-layout";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassButton } from "@/components/ui/glass-button";
import { ArrowRight, Sparkles, Map, GraduationCap, BrainCircuit, School, Calculator, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/providers/language-provider";




import { NEWS } from "@/lib/data/news";
import { useState } from "react";
import { X, Calendar as CalIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const { t, language } = useLanguage();
  const [selectedNews, setSelectedNews] = useState<any>(null);

  const features = [
    // ... existing features remain same ...
    {
      title: t.landing.features.roadmap.title,
      description: t.landing.features.roadmap.desc,
      icon: Map,
      href: "/roadmap",
      color: "text-blue-400",
    },
    {
      title: t.landing.features.unis.title,
      description: t.landing.features.unis.desc,
      icon: GraduationCap,
      href: "/universities",
      color: "text-violet-400",
    },
    {
      title: t.landing.features.personality.title,
      description: t.landing.features.personality.desc,
      icon: BrainCircuit,
      href: "/personality",
      color: "text-pink-400",
    },
    {
      title: t.landing.features.grades.title,
      description: t.landing.features.grades.desc,
      icon: Calculator,
      href: "/grades",
      color: "text-green-400",
    },
    {
      title: t.landing.features.school.title,
      description: t.landing.features.school.desc,
      icon: School,
      href: "/school",
      color: "text-orange-400",
    },
    {
      title: t.landing.features.social.title,
      description: t.landing.features.social.desc,
      icon: MessageCircle,
      href: "/social",
      color: "text-cyan-400",
    },
  ];

  return (
    <PageLayout>
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel bg-white/5 text-sm font-medium text-accent-primary animate-pulse">
          <Sparkles size={16} />
          <span>{t.landing.heroTag}</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white/80 to-white/50 tracking-tight">
          {t.landing.heroTitlePrefix} <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-secondary">
            {t.landing.heroTitleSuffix}
          </span>
        </h1>

        <p className="text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed">
          {t.landing.heroDescription}
        </p>

        <div className="flex gap-4 pt-4">
          <GlassButton size="lg" variant="primary">
            {t.landing.getStarted} <ArrowRight className="ml-2 w-5 h-5" />
          </GlassButton>
          <GlassButton size="lg" variant="glass">
            {t.landing.learnMore}
          </GlassButton>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
        {features.map((feature) => (
          <Link key={feature.href} href={feature.href}>
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

      {/* News Feed Section */}
      <div className="space-y-8 pb-20">
        <div className="flex items-baseline justify-between">
           <h2 className="text-3xl font-bold text-white">{t.news.title}</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {NEWS.map((item) => (
                <GlassCard 
                    key={item.id} 
                    className="p-0 overflow-hidden group cursor-pointer border-white/5 hover:border-accent-primary/30 flex flex-col"
                    onClick={() => setSelectedNews(item)}
                >
                    <div className="h-48 overflow-hidden">
                        <img 
                            src={item.image} 
                            alt={item.title[language as keyof typeof item.title] || item.title.en} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                    </div>
                    <div className="p-6 flex flex-col flex-1 gap-3">
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-accent-primary uppercase tracking-widest">{item.category[language as keyof typeof item.category] || item.category.en}</span>
                            <span className="text-xs text-white/40 flex items-center gap-1"><CalIcon size={12}/> {item.date}</span>
                        </div>
                        <h3 className="text-xl font-bold text-white line-clamp-2 group-hover:text-accent-primary transition-colors">{item.title[language as keyof typeof item.title] || item.title.en}</h3>
                        <p className="text-white/50 text-sm line-clamp-3">{item.excerpt[language as keyof typeof item.excerpt] || item.excerpt.en}</p>
                        <div className="mt-auto pt-4 flex items-center text-accent-secondary text-sm font-semibold group-hover:gap-2 transition-all">
                            {t.news.readMore} <ArrowRight size={16} className="ml-1"/>
                        </div>
                    </div>
                </GlassCard>
            ))}
        </div>
      </div>

      {/* News Modal */}
      <AnimatePresence>
        {selectedNews && (
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/80 backdrop-blur-md"
                    onClick={() => setSelectedNews(null)}
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-2xl bg-slate-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
                >
                    <button 
                        onClick={() => setSelectedNews(null)}
                        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white/70 hover:bg-black/80 hover:text-white transition-all backdrop-blur-md"
                    >
                        <X size={24} />
                    </button>
                    
                    <div className="h-64 overflow-hidden relative">
                        <img 
                            src={selectedNews.image} 
                            alt={selectedNews.title[language as keyof typeof selectedNews.title] || selectedNews.title.en} 
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                        <div className="absolute bottom-6 left-8">
                             <span className="px-3 py-1 rounded-full bg-accent-primary text-white text-xs font-bold uppercase tracking-wider mb-2 inline-block">
                                {selectedNews.category[language as keyof typeof selectedNews.category] || selectedNews.category.en}
                             </span>
                             <h2 className="text-3xl font-bold text-white leading-tight">{selectedNews.title[language as keyof typeof selectedNews.title] || selectedNews.title.en}</h2>
                        </div>
                    </div>

                    <div className="p-8 space-y-6">
                        <div className="flex items-center gap-4 text-white/40 text-sm border-b border-white/5 pb-4">
                            <span className="flex items-center gap-1"><CalIcon size={14}/> {selectedNews.date}</span>
                            <span>•</span>
                            <span>5 min read</span>
                        </div>
                        
                        <div className="text-white/80 leading-relaxed space-y-4">
                            {(selectedNews.content[language as keyof typeof selectedNews.content] || selectedNews.content.en).split('\n').map((para: string, i: number) => (
                                <p key={i}>{para}</p>
                            ))}
                        </div>
                        
                        <div className="pt-6">
                            <GlassButton onClick={() => setSelectedNews(null)} className="w-full">
                                {t.news.close}
                            </GlassButton>
                        </div>
                    </div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>
    </PageLayout>
  );
}
