import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { Product } from '../data/products';
import { PRODUCTS as MOCK_PRODUCTS } from '../data/products';

export const useProduct = (id: string | undefined) => {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) {
                setLoading(false);
                return;
            }

            try {
                // Try Firestore first
                const docRef = doc(db, 'products', id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setProduct({
                        id: docSnap.id,
                        ...docSnap.data()
                    } as Product);
                } else {
                    // Fallback to Mock Data if not found in Firestore (e.g. if we are using Mock IDs)
                    const mockProduct = MOCK_PRODUCTS.find(p => p.id === id);
                    if (mockProduct) {
                        console.log('Product not found in Firestore, using mock data.');
                        setProduct(mockProduct);
                    } else {
                        setError('Product not found');
                    }
                }
            } catch (err) {
                console.error('Error fetching product:', err);
                // Fallback to Mock Data on error
                const mockProduct = MOCK_PRODUCTS.find(p => p.id === id);
                if (mockProduct) {
                    console.log('Firestore error, using mock data.');
                    setProduct(mockProduct);
                } else {
                    setError('Failed to fetch product');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    return { product, loading, error };
};
