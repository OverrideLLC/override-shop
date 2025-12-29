import { useState, useEffect } from 'react';
import { collection, getDocs, type DocumentData, type QueryDocumentSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

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
            const cacheKey = 'categories_cache';

            // Check cache
            const cachedData = sessionStorage.getItem(cacheKey);
            if (cachedData) {
                console.log('Using cached categories');
                setCategories(JSON.parse(cachedData));
                setLoading(false);
                return;
            }

            try {
                const querySnapshot = await getDocs(collection(db, 'categories'));
                if (!querySnapshot.empty) {
                    const firebaseCategories = querySnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => doc.data().name as string);

                    // Sort alphabetically or by some other logic if needed
                    firebaseCategories.sort();

                    setCategories(firebaseCategories);
                    sessionStorage.setItem(cacheKey, JSON.stringify(firebaseCategories));
                    setLoading(false);
                    return;
                }

                // Fallback if empty (shouldn't happen after seed)
                console.warn('No categories found in Firestore.');
                setCategories([]);
                setLoading(false);

            } catch (err) {
                console.warn('Failed to fetch categories from Firestore.', err);
                // Fallback to hardcoded list if offline/error
                setCategories(['Ropa', 'Accesorios', 'Mats']);
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return { categories, loading, error };
};
