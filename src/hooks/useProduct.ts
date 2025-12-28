import { useState, useEffect } from 'react';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { Product } from '../data/products';
import { PRODUCTS as MOCK_PRODUCTS } from '../data/products';
import { fetchWithCache } from '../lib/cache';

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

            setLoading(true);
            const cacheKey = `product_details_${id}`;

            try {
                const data = await fetchWithCache<Product | null>(cacheKey, async () => {
                    try {
                        // 1. Get all collection themes (Light, Dark)
                        const collectionsRef = collection(db, 'collections');
                        const collectionsSnapshot = await getDocs(collectionsRef);

                        let foundProduct: Product | null = null;

                        // 2. Search for the product in each collection's 'items' subcollection
                        for (const colDoc of collectionsSnapshot.docs) {
                            const productRef = doc(db, 'products', colDoc.id, 'items', id);
                            const productSnap = await getDoc(productRef);

                            if (productSnap.exists()) {
                                const data = productSnap.data();
                                foundProduct = {
                                    id: productSnap.id,
                                    ...data,
                                    images: (Array.isArray(data.images) && data.images.length > 0)
                                        ? data.images
                                        : (data.image ? [data.image] : [])
                                } as Product;
                                break; // Found it
                            }
                        }

                        if (foundProduct) {
                            return foundProduct;
                        } else {
                            // Fallback to Mock Data if not found in Firestore
                            const mockProduct = MOCK_PRODUCTS.find(p => p.id === id);
                            if (mockProduct) {
                                console.log('Product not found in Firestore, using mock data.');
                                return mockProduct;
                            }
                            // Truly not found
                            throw new Error('Product not found in DB or Mock');
                        }
                    } catch (err) {
                        console.error('Error fetching product inside cache fetcher:', err);
                        // Network error ?? Fallback to Mock
                        const mockProduct = MOCK_PRODUCTS.find(p => p.id === id);
                        if (mockProduct) {
                            return mockProduct;
                        }
                        throw err;
                    }
                }, 20); // 20m TTL

                setProduct(data);
                setError(null);

            } catch (err) {
                console.error("Critical error in useProduct:", err);
                setError('Product not found');
                setProduct(null);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    return { product, loading, error };
};
