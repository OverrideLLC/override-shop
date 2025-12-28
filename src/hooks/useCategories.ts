import { useState, useEffect } from 'react';
import { collection, getDocs, type DocumentData, type QueryDocumentSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { fetchWithCache } from '../lib/cache';

export interface CategoryData {
    id: string;
    name: string;
}

export const useCategories = () => {
    const [categories, setCategories] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            const cacheKey = 'categories_cache'; // Key for cache utility

            try {
                const data = await fetchWithCache<string[]>(cacheKey, async () => {
                    try {
                        const querySnapshot = await getDocs(collection(db, 'categories'));
                        if (!querySnapshot.empty) {
                            const firebaseCategories = querySnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => doc.data().name as string);
                            firebaseCategories.sort();
                            return firebaseCategories;
                        }

                        // If empty, return fallback without erroring, but this makes it "fresh" empty data
                        console.warn('No categories found in Firestore.');
                        return [];
                    } catch (err) {
                        console.warn('Failed to fetch categories from Firestore.', err);
                        // Return default static list on error
                        return ['Ropa', 'Accesorios', 'Mats'];
                    }
                }, 20); // 20m TTL

                setCategories(data);
                setLoading(false);
            } catch (err) {
                console.error("Critical error in useCategories:", err);
                // Final fallback
                setCategories(['Ropa', 'Accesorios', 'Mats']);
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return { categories, loading, error };
};
