export type SectionType = 'hero' | 'product_grid' | 'text_banner' | 'spacer';

export interface BaseSection {
    id: string;
    type: SectionType;
    marginBottom?: string; // Tailwind class e.g., "mb-12"
}

export interface HeroSection extends BaseSection {
    type: 'hero';
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
    backgroundImage?: string;
    variant?: 'center' | 'left' | 'split';
}

export interface ProductGridSection extends BaseSection {
    type: 'product_grid';
    title?: string;
    collectionId?: string; // 'all', 'light', 'dark'
    limit?: number;
}

export interface TextBannerSection extends BaseSection {
    type: 'text_banner';
    content: string;
    alignment?: 'center' | 'left';
}

export interface SpacerSection extends BaseSection {
    type: 'spacer';
    height: string; // Tailwind class "h-12"
}

export type Section = HeroSection | ProductGridSection | TextBannerSection | SpacerSection;

export interface LayoutConfig {
    sections: Section[];
    metaTitle?: string;
    metaDescription?: string;
}
