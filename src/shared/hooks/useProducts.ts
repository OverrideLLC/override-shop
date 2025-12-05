import { useState, useEffect } from 'react';
import { collection, getDocs, type DocumentData, type QueryDocumentSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { Product } from '../data/products';
import { PRODUCTS as MOCK_PRODUCTS } from '../data/products';
import { useTheme } from '../context/ThemeContext';

export const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error] = useState<string | null>(null);
    const { theme } = useTheme();

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                // Determine collection name based on theme
                // 'products' for light (default), 'products_dark' for dark
                // Or 'products_light' and 'products_dark' if we want strict separation
                // For now, let's assume 'products' is the default (light) and we add 'products_dark'
                const collectionName = theme === 'dark' ? 'products_dark' : 'products';

                const querySnapshot = await getDocs(collection(db, collectionName));
                if (!querySnapshot.empty) {
                    const firebaseProducts = querySnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
                        id: doc.id,
                        ...doc.data()
                    })) as Product[];
                    setProducts(firebaseProducts);
                    setLoading(false);
                    return;
                }

                // Fallback to mock data if no API key or empty/error
                console.log(`Using mock data for ${theme} mode`);
                // Simulate network delay
                setTimeout(() => {
                    if (theme === 'dark') {
                        // Create "Dark" versions of products for mock
                        const darkProducts = MOCK_PRODUCTS.map(p => ({
                            ...p,
                            name: `[DARK] ${p.name}`,
                            description: `[TERMINAL_MODE] ${p.description}`,
                            price: p.price * 1.2 // Slightly different price to be noticeable
                        }));
                        setProducts(darkProducts);
                    } else {
                        setProducts(MOCK_PRODUCTS);
                    }
                    setLoading(false);
                }, 800);

            } catch (err) {
                console.warn('Firebase connection failed or not configured, using mock data.', err);
                if (theme === 'dark') {
                    const darkProducts = MOCK_PRODUCTS.map(p => ({
                        ...p,
                        name: `[DARK] ${p.name}`,
                        description: `[TERMINAL_MODE] ${p.description}`
                    }));
                    setProducts(darkProducts);
                } else {
                    setProducts(MOCK_PRODUCTS);
                }
                setLoading(false);
            }
        };

        fetchProducts();
    }, [theme]); // Re-fetch when theme changes

    return { products, loading, error };
};
