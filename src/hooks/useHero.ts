import { useCollection } from '../context/CollectionContext';

export interface HeroData {
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
    imageUrl?: string;
}

const MOCK_HERO_LIGHT: HeroData = {
    title: "MODA TECH & URBANA",
    subtitle: "Ropa diseñada para mentes creativas. Comodidad y estilo para tu día a día.",
    ctaText: "VER COLECCIÓN", // Más invitacional
    ctaLink: "/products",
    imageUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop"
};

const MOCK_HERO_DARK: HeroData = {
    title: "<CODE YOUR STYLE />", // Uso de sintaxis de etiquetas
    subtitle: "Outfit optimizado para el despliegue. 0% Bugs, 100% Algodón.",
    ctaText: "GIT PULL OUTFIT", // Referencia directa a comandos
    ctaLink: "/products",
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
};

export const useHero = () => {
    const { currentCollection } = useCollection();

    const heroData = currentCollection.toLowerCase() === 'light' ? MOCK_HERO_LIGHT : MOCK_HERO_DARK;
    const loading = false;

    return { heroData, loading };
};
