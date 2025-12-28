import { Hero } from '../Hero';
import { ProductList } from '../ProductList';
import type { Section } from '../../types/layout';

interface RendererProps {
    sections: Section[];
}

export const Renderer = ({ sections }: RendererProps) => {
    if (!sections) return null;

    return (
        <div className="flex flex-col w-full">
            {sections.map((section) => {
                switch (section.type) {
                    case 'hero':
                        return (
                            <div key={section.id} className={section.marginBottom || 'mb-0'}>
                                <Hero
                                    title={section.title}
                                    subtitle={section.subtitle}
                                    ctaText={section.ctaText}
                                    ctaLink={section.ctaLink}
                                />
                            </div>
                        );
                    case 'product_grid':
                        return (
                            <div key={section.id} className={`container mx-auto px-4 ${section.marginBottom || 'mb-12'}`}>
                                {section.title && (
                                    <h2 className="text-3xl font-bold mb-8 text-center text-slate-900 dark:text-[#00ff00] font-mono uppercase">
                                        {section.title}
                                    </h2>
                                )}
                                <ProductList />
                            </div>
                        );
                    case 'text_banner':
                        return (
                            <div key={section.id} className={`w-full py-8 bg-slate-100 dark:bg-[#00ff00]/10 ${section.marginBottom || 'mb-8'}`}>
                                <div className="container mx-auto px-4 text-center">
                                    <p className="text-xl font-mono text-slate-900 dark:text-[#00ff00]">
                                        {section.content}
                                    </p>
                                </div>
                            </div>
                        );
                    case 'spacer':
                        return <div key={section.id} className={section.height} />;
                    default:
                        return null;
                }
            })}
        </div>
    );
};
