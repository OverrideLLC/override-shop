import { Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useHero } from '../../../shared/hooks/useHero';

export const Hero = () => {
    const { heroData, loading } = useHero();

    if (loading) {
        return (
            <div className="w-full h-[500px] bg-black border-b border-[#00ff00] animate-pulse flex items-center justify-center">
                <span className="text-[#00ff00] font-mono">LOADING_SYSTEM_RESOURCES...</span>
            </div>
        );
    }

    if (!heroData) return null;

    return (
        <section className="relative w-full border-b border-[#00ff00] bg-black overflow-hidden">
            <div className="container mx-auto px-4 py-24 flex flex-col items-start relative z-10">
                <div className="flex items-center gap-2 mb-6 text-[#00ff00]">
                    <Terminal className="w-5 h-5" />
                    <span className="font-mono text-sm">ROOT_ACCESS_GRANTED</span>
                </div>

                <h1 className="text-4xl md:text-6xl font-bold text-[#00ff00] mb-6 font-mono uppercase tracking-widest glitch-text">
                    {heroData.title}
                </h1>

                <div className="p-4 border border-[#00ff00] bg-black/50 backdrop-blur-sm mb-8 max-w-2xl">
                    <p className="text-lg md:text-xl text-[#00ff00] font-mono leading-relaxed">
                        {heroData.subtitle}
                    </p>
                </div>

                <Link
                    to={heroData.ctaLink}
                    className="group inline-flex items-center gap-3 px-8 py-4 bg-[#00ff00] text-black font-mono font-bold uppercase tracking-wider hover:bg-[#00ff00]/90 transition-all hover:translate-x-2"
                >
                    <span className="animate-pulse mr-2">{'>'}</span>
                    {heroData.ctaText}
                </Link>
            </div>

            {/* Matrix-like background effect (simplified) */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(0deg,transparent_24%,rgba(0,255,0,.3)_25%,rgba(0,255,0,.3)_26%,transparent_27%,transparent_74%,rgba(0,255,0,.3)_75%,rgba(0,255,0,.3)_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,rgba(0,255,0,.3)_25%,rgba(0,255,0,.3)_26%,transparent_27%,transparent_74%,rgba(0,255,0,.3)_75%,rgba(0,255,0,.3)_76%,transparent_77%,transparent)] bg-[length:50px_50px]" />
            </div>
        </section>
    );
};
