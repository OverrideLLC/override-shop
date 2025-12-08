import { useState, useEffect } from 'react';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
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
                setLoading(true);

                // 1. Get all collection themes (Light, Dark)
                const collectionsRef = collection(db, 'collections');
                const collectionsSnapshot = await getDocs(collectionsRef);

                let foundProduct: Product | null = null;

                // 2. Search for the product in each collection's 'items' subcollection
                for (const colDoc of collectionsSnapshot.docs) {
                    // CHANGED: Now searching in 'products' root collection
                    const productRef = doc(db, 'products', colDoc.id, 'items', id);
                    const productSnap = await getDoc(productRef);

                    if (productSnap.exists()) {
                        const data = productSnap.data();
                        foundProduct = {
                            id: productSnap.id,
                            ...data,
                            // Ensure images array exists, fallback to legacy image field if needed - just like in useProducts
                            images: data.images || (data.image ? [data.image] : [])
                        } as Product;
                        break; // Found it, stop searching
                    }
                }

                if (foundProduct) {
                    setProduct(foundProduct);
                    setError(null);
                } else {
                    // Fallback to Mock Data if not found in Firestore
                    const mockProduct = MOCK_PRODUCTS.find(p => p.id === id);
                    if (mockProduct) {
                        console.log('Product not found in Firestore, using mock data.');
                        setProduct(mockProduct);
                        setError(null);
                    } else {
                        setError('Product not found');
                        setProduct(null);
                    }
                }
            } catch (err) {
                console.error('Error fetching product:', err);
                // Fallback to Mock Data on error
                const mockProduct = MOCK_PRODUCTS.find(p => p.id === id);
                if (mockProduct) {
                    console.log('Firestore error, using mock data.');
                    setProduct(mockProduct);
                    setError(null);
                } else {
                    setError('Failed to fetch product');
                    setProduct(null);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    return { product, loading, error };
};
