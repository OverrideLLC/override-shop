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
            const collectionName = theme === 'dark' ? 'products_dark' : 'products';
            const cacheKey = `products_${collectionName}`;

            // Check cache
            const cachedData = sessionStorage.getItem(cacheKey);
            if (cachedData) {
                console.log(`Using cached data for ${collectionName}`);
                setProducts(JSON.parse(cachedData));
                setLoading(false);
                return;
            }

            try {
                const querySnapshot = await getDocs(collection(db, collectionName));
                if (!querySnapshot.empty) {
                    const firebaseProducts = querySnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => {
                        const data = doc.data();
                        return {
                            id: doc.id,
                            ...data,
                            // Ensure images array exists, fallback to legacy image field if needed
                            images: data.images || (data.image ? [data.image] : [])
                        };
                    }) as Product[];

                    setProducts(firebaseProducts);
                    sessionStorage.setItem(cacheKey, JSON.stringify(firebaseProducts));
                    setLoading(false);
                    return;
                }

                // Fallback to mock data if no API key or empty/error
                console.log(`Using mock data for ${theme} mode`);
                // Simulate network delay
                setTimeout(() => {
                    let mockData: Product[];
                    if (theme === 'dark') {
                        // Create "Dark" versions of products for mock
                        mockData = MOCK_PRODUCTS.map(p => ({
                            ...p,
                            name: `[DARK] ${p.name}`,
                            description: `[TERMINAL_MODE] ${p.description}`,
                            price: p.price * 1.2 // Slightly different price to be noticeable
                        }));
                    } else {
                        mockData = MOCK_PRODUCTS;
                    }
                    setProducts(mockData);
                    sessionStorage.setItem(cacheKey, JSON.stringify(mockData));
                    setLoading(false);
                }, 800);

            } catch (err) {
                console.warn('Firebase connection failed or not configured, using mock data.', err);
                let mockData: Product[];
                if (theme === 'dark') {
                    mockData = MOCK_PRODUCTS.map(p => ({
                        ...p,
                        name: `[DARK] ${p.name}`,
                        description: `[TERMINAL_MODE] ${p.description}`
                    }));
                } else {
                    mockData = MOCK_PRODUCTS;
                }
                setProducts(mockData);
                sessionStorage.setItem(cacheKey, JSON.stringify(mockData));
                setLoading(false);
            }
        };

        fetchProducts();
    }, [theme]); // Re-fetch when theme changes

    return { products, loading, error };
};
