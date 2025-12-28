import { useState, useEffect } from 'react';
import { collection, getDocs, query, where, type DocumentData, type QueryDocumentSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { Product } from '../data/products';
import { PRODUCTS as MOCK_PRODUCTS } from '../data/products';
import { useCollection } from '../context/CollectionContext';
import { fetchWithCache } from '../lib/cache';

export const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error] = useState<string | null>(null);
    const { currentCollection } = useCollection();

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const targetCollectionName = currentCollection;
            const cacheKey = `products_${targetCollectionName}`;

            try {
                const data = await fetchWithCache<Product[]>(cacheKey, async () => {
                    // This is the "fresh fetch" logic
                    try {
                        const collectionsRef = collection(db, 'collections');
                        const q = query(collectionsRef, where('name', '==', targetCollectionName));
                        const querySnapshot = await getDocs(q);

                        if (!querySnapshot.empty) {
                            const collectionDoc = querySnapshot.docs[0];
                            console.log(`Found collection doc: ${collectionDoc.id} for ${targetCollectionName}`);

                            // Query 'products/{collectionId}/items'
                            const itemsRef = collection(db, 'products', collectionDoc.id, 'items');
                            const itemsSnapshot = await getDocs(itemsRef);

                            const firebaseProducts = itemsSnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => {
                                const data = doc.data();
                                return {
                                    id: doc.id,
                                    ...data,
                                    images: (Array.isArray(data.images) && data.images.length > 0)
                                        ? data.images
                                        : (data.image ? [data.image] : [])
                                };
                            }) as Product[];

                            return firebaseProducts;
                        } else {
                            console.warn(`No collection found for ${targetCollectionName}, falling back to mock.`);
                            throw new Error(`Collection ${targetCollectionName} not found`);
                        }
                    } catch (err) {
                        console.warn('Firebase fetch failed, using mock data.', err);
                        // Mock Data Generation
                        let mockData: Product[];
                        if (targetCollectionName === 'Dark') {
                            mockData = MOCK_PRODUCTS.map(p => ({
                                ...p,
                                name: `[DARK] ${p.name}`,
                                description: `[TERMINAL_MODE] ${p.description}`,
                                price: p.price * 1.2
                            }));
                        } else {
                            mockData = MOCK_PRODUCTS;
                        }
                        return mockData;
                    }
                }, 20); // TTL 20 minutes

                setProducts(data);
                setLoading(false);

            } catch (err) {
                console.error("Critical error in useProducts:", err);
                setLoading(false);
                // Last ditch fallback if cache fails AND fetch fails (unlikely due to inner try/catch)
                setProducts(MOCK_PRODUCTS);
            }
        };

        fetchProducts();
    }, [currentCollection]);

    return { products, loading, error };
};
