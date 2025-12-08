import { useState, useEffect } from 'react';
import { collection, getDocs, query, where, type DocumentData, type QueryDocumentSnapshot } from 'firebase/firestore';
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
            // Target collection name based on theme
            const targetCollectionName = theme === 'dark' ? 'Dark' : 'Light';
            const cacheKey = `products_${targetCollectionName}`;

            // Check cache
            const cachedData = sessionStorage.getItem(cacheKey);
            if (cachedData) {
                console.log(`Using cached data for ${targetCollectionName}`);
                setProducts(JSON.parse(cachedData));
                setLoading(false);
                return;
            }

            try {
                // 1. Find the collection document by name
                const collectionsRef = collection(db, 'collections');
                const q = query(collectionsRef, where('name', '==', targetCollectionName));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    // Assuming name is unique, take the first one
                    const collectionDoc = querySnapshot.docs[0];
                    console.log(`Found collection doc: ${collectionDoc.id} for ${targetCollectionName}`);

                    // 2. Fetch items from the subcollection
                    // CHANGED: Now fetching from 'products' root collection instead of nested inside 'collections'
                    const itemsRef = collection(db, 'products', collectionDoc.id, 'items');
                    const itemsSnapshot = await getDocs(itemsRef);

                    const firebaseProducts = itemsSnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => {
                        const data = doc.data();
                        return {
                            id: doc.id,
                            ...data,
                            // Ensure images array exists and is populated.
                            // Fix: Check length > 0 to prevent empty array from blocking fallback to 'image'
                            images: (Array.isArray(data.images) && data.images.length > 0)
                                ? data.images
                                : (data.image ? [data.image] : [])
                        };
                    }) as Product[];

                    setProducts(firebaseProducts);
                    sessionStorage.setItem(cacheKey, JSON.stringify(firebaseProducts));
                    setLoading(false);
                    return;
                } else {
                    console.warn(`No collection found for ${targetCollectionName}`);
                }

                // Fallback to mock data if no collection found or empty (skipping if found but empty subcollection for now, user can handle empty state)
                console.log(`Using mock data for ${theme} mode (Fallback)`);
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
