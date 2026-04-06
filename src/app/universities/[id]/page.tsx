import { LOCAL_UNIVERSITIES, INTERNATIONAL_UNIVERSITIES } from "@/lib/data/universities-expanded";
import { PageLayout } from "@/components/shared/page-layout";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassButton } from "@/components/ui/glass-button";
import { ArrowLeft, ExternalLink, MapPin, Award, Banknote, Building2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function UniversityPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    
    // The ID in the URL is uri encoded, e.g. "Nazarbayev%20University"
    const uniName = decodeURIComponent(id);

    // Search in both arrays
    const localUni = LOCAL_UNIVERSITIES.find(u => u.name === uniName);
    const intUni = INTERNATIONAL_UNIVERSITIES.find(u => u.name === uniName);

    const uni = localUni || intUni;

    if (!uni) {
        notFound();
    }

    const isLocal = !!localUni;

    return (
        <PageLayout>
            <div className="max-w-4xl mx-auto space-y-8">
                <Link href="/universities" className="inline-flex items-center text-white/50 hover:text-white transition-colors">
                    <ArrowLeft size={16} className="mr-2" /> Back to Universities
                </Link>

                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                    <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-accent-primary to-accent-secondary flex items-center justify-center text-5xl font-bold text-white shadow-lg shadow-accent-primary/20 shrink-0">
                        {uni.name[0]}
                    </div>
                    
                    <div className="flex-1 space-y-2">
                        <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between w-full">
                            <h1 className="text-4xl font-bold text-white">{uni.name}</h1>
                            {uni.site && (
                                <a href={`https://${uni.site}`} target="_blank" rel="noopener noreferrer">
                                    <GlassButton variant="glass" size="sm" className="whitespace-nowrap">
                                        Visit Website <ExternalLink size={14} className="ml-2" />
                                    </GlassButton>
                                </a>
                            )}
                        </div>
                        
                        <div className="flex items-center gap-4 text-white/60 text-lg">
                            <span className="flex items-center gap-1">
                                <MapPin size={18} /> {'city' in uni ? uni.city : uni.country}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-white/20" />
                            <span className="flex items-center gap-1 text-accent-secondary/80 font-medium">
                                <Award size={18} /> {'worldRank' in uni ? uni.worldRank : `#${uni.rank} National`}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-6">
                        <GlassCard className="p-8 space-y-4">
                            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                                <Building2 size={20} className="text-accent-primary" /> About
                            </h2>
                            <p className="text-white/80 leading-relaxed text-lg">
                                {uni.desc}
                            </p>
                        </GlassCard>

                        {isLocal && (
                            <GlassCard className="p-8 space-y-4 bg-accent-primary/5 border-accent-primary/20">
                                <h2 className="text-xl font-semibold text-white">Admissions & Grants</h2>
                                <p className="text-white/80">
                                    This university primarily accepts students through the National UNT (Unified National Testing) system. 
                                    Calculate your personalized admission chances on the main Universities page.
                                </p>
                            </GlassCard>
                        )}
                    </div>
                    
                    <div className="space-y-6">
                        <GlassCard className="p-6 space-y-4">
                            <div className="flex items-center gap-3 text-white">
                                <div className="p-3 bg-white/5 rounded-xl">
                                    <Banknote size={24} className="text-green-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-white/40">Tuition Fee</p>
                                    <p className="font-semibold text-lg">{uni.price}</p>
                                </div>
                            </div>
                        </GlassCard>
                        
                        {isLocal && 'type' in uni && (
                            <GlassCard className="p-6 space-y-4">
                                <div className="flex items-center gap-3 text-white">
                                    <div className="p-3 bg-white/5 rounded-xl">
                                        <Award size={24} className="text-yellow-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-white/40">Main Funding Type</p>
                                        <p className="font-semibold text-lg">{uni.type}</p>
                                    </div>
                                </div>
                            </GlassCard>
                        )}
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
