import { useState, useEffect } from 'react';
import { collection, getDocs, type DocumentData, type QueryDocumentSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { Product } from '../data/products';
import { PRODUCTS as MOCK_PRODUCTS } from '../data/products';

export const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'products'));
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
                console.log('Using mock data');
                // Simulate network delay
                setTimeout(() => {
                    setProducts(MOCK_PRODUCTS);
                    setLoading(false);
                }, 800);

            } catch (err) {
                console.warn('Firebase connection failed or not configured, using mock data.', err);
                setProducts(MOCK_PRODUCTS);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return { products, loading, error };
};
