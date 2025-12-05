import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useHero } from '../../../shared/hooks/useHero';

export const Hero = () => {
    const { heroData, loading } = useHero();

    if (loading) {
        return (
            <div className="w-full h-[600px] bg-gray-100 animate-pulse flex items-center justify-center">
                <span className="text-gray-400 font-medium">Loading content...</span>
            </div>
        );
    }

    if (!heroData) return null;

    return (
        <section className="relative w-full h-[600px] overflow-hidden bg-gray-50">
            {/* Background Image */}
            <div className="absolute inset-0">
                <img
                    src={heroData.imageUrl}
                    alt={heroData.title}
                    className="w-full h-full object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/50 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative container mx-auto px-4 h-full flex flex-col justify-center max-w-4xl">
                <span className="inline-block px-4 py-1 mb-6 text-xs font-bold tracking-widest text-white uppercase bg-accent rounded-full w-fit shadow-lg shadow-accent/30">
                    Nueva Colección
                </span>
                <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight tracking-tight">
                    {heroData.title}
                </h1>
                <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl leading-relaxed">
                    {heroData.subtitle}
                </p>
                <Link
                    to={heroData.ctaLink}
                    className="group inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-full font-bold hover:bg-accent hover:text-white transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-accent/40"
                >
                    Ver Productos
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </section>
    );
};
