import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useTheme } from '../context/ThemeContext';

export interface HeroData {
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
    imageUrl?: string;
}

const MOCK_HERO_LIGHT: HeroData = {
    title: "Summer Collection 2025",
    subtitle: "Discover the new wave of minimalist fashion. Designed for the modern creator.",
    ctaText: "Shop Now",
    ctaLink: "/light/products",
    imageUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop"
};

const MOCK_HERO_DARK: HeroData = {
    title: "SYSTEM_OVERRIDE_INIT",
    subtitle: "> ACCESSING_SECURE_VAULT... [SUCCESS] > DEPLOYING_TACTICAL_GEAR...",
    ctaText: "EXECUTE_ORDER_66",
    ctaLink: "/dark/products",
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
};

export const useHero = () => {
    const [heroData, setHeroData] = useState<HeroData | null>(null);
    const [loading, setLoading] = useState(true);
    const { theme } = useTheme();

    useEffect(() => {
        const fetchHero = async () => {
            setLoading(true);
            try {
                const collectionName = theme === 'dark' ? 'hero_dark' : 'hero';
                const querySnapshot = await getDocs(collection(db, collectionName));

                if (!querySnapshot.empty) {
                    const doc = querySnapshot.docs[0]; // Get the first document
                    setHeroData(doc.data() as HeroData);
                    setLoading(false);
                    return;
                }

                // Fallback to mock
                console.log(`Using mock hero data for ${theme} mode`);
                setHeroData(theme === 'dark' ? MOCK_HERO_DARK : MOCK_HERO_LIGHT);
                setLoading(false);

            } catch (err) {
                console.warn('Firebase connection failed or not configured, using mock hero data.', err);
                setHeroData(theme === 'dark' ? MOCK_HERO_DARK : MOCK_HERO_LIGHT);
                setLoading(false);
            }
        };

        fetchHero();
    }, [theme]);

    return { heroData, loading };
};
