'use client';

import { Terminal } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useHero } from '../hooks/useHero';

import { optimizeImage } from '../lib/cloudinary';

interface HeroProps {
    title?: string;
    subtitle?: string;
    ctaText?: string;
    ctaLink?: string;
    imageUrl?: string;
}

export const Hero = (props: HeroProps) => {
    const { heroData: defaultData, loading } = useHero();

    // Merge props with default data
    const heroData = {
        ...defaultData,
        ...props,
        // Ensure we don't overwrite if props are undefined, but ...props usage above does that if keys exist but are undefined? 
        // Actually, explicitly checking is safer if we want to support partial overrides, 
        // but for SDUI usually we provide all or nothing. 
        // Let's use simple spread for now, assuming props will be passed or not.
        title: props.title || defaultData?.title,
        subtitle: props.subtitle || defaultData?.subtitle,
        ctaText: props.ctaText || defaultData?.ctaText,
        ctaLink: props.ctaLink || defaultData?.ctaLink,
        imageUrl: props.imageUrl || defaultData?.imageUrl,
    };


    if (loading) {
        return (
            <div className="w-full h-[500px] bg-white dark:bg-black border-b border-gray-200 dark:border-[#00ff00] animate-pulse flex items-center justify-center">
                <span className="text-slate-900 dark:text-[#00ff00] font-mono">LOADING_SYSTEM_RESOURCES...</span>
            </div>
        );
    }

    if (!heroData) return null;

    return (
        <section className="relative w-full h-auto min-h-[400px] md:h-[500px] border-b border-gray-200 dark:border-[#00ff00] bg-white dark:bg-black overflow-hidden flex items-center transition-colors duration-300">
            {/* Background Image if present */}
            {heroData.imageUrl && (
                <div className="absolute inset-0 z-0 opacity-20 dark:opacity-40">
                    <Image
                        src={optimizeImage(heroData.imageUrl)}
                        alt="Hero Background"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            )}

            <div className="container mx-auto px-4 py-12 md:py-24 flex flex-col items-start relative z-10">
                <div className="flex items-center gap-2 mb-4 md:mb-6 text-slate-900 dark:text-[#00ff00]">
                    <Terminal className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="font-mono text-xs md:text-sm">ROOT_ACCESS_GRANTED</span>
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-slate-900 dark:text-[#00ff00] mb-4 md:mb-6 font-mono uppercase tracking-widest glitch-text">
                    {heroData.title}
                </h1>

                <div className="p-4 border border-slate-900 dark:border-[#00ff00] bg-white/50 dark:bg-black/50 backdrop-blur-sm mb-6 md:mb-8 max-w-2xl">
                    <p className="text-base md:text-lg lg:text-xl text-slate-900 dark:text-[#00ff00] font-mono leading-relaxed">
                        {heroData.subtitle}
                    </p>
                </div>

                <Link
                    href={heroData.ctaLink || '/'}
                    className="group inline-flex items-center gap-3 px-6 py-3 md:px-8 md:py-4 bg-slate-900 text-white dark:bg-[#00ff00] dark:text-black font-mono font-bold uppercase tracking-wider hover:bg-slate-800 dark:hover:bg-[#00ff00]/90 transition-all hover:translate-x-2 text-sm md:text-base"
                >
                    <span className="animate-pulse mr-2">{'>'}</span>
                    {heroData.ctaText}
                </Link>
            </div>

            {/* Matrix-like background effect (hidden in light mode for cleaner look) */}
            <div className="absolute inset-0 opacity-0 dark:opacity-20 pointer-events-none transition-opacity duration-300">
                <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(0deg,transparent_24%,rgba(0,255,0,.3)_25%,rgba(0,255,0,.3)_26%,transparent_27%,transparent_74%,rgba(0,255,0,.3)_75%,rgba(0,255,0,.3)_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,rgba(0,255,0,.3)_25%,rgba(0,255,0,.3)_26%,transparent_27%,transparent_74%,rgba(0,255,0,.3)_75%,rgba(0,255,0,.3)_76%,transparent_77%,transparent)] bg-[length:50px_50px]" />
            </div>
        </section>
    );
};
