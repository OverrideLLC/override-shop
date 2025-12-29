import { useState, useEffect } from 'react';
import { collection, getDocs, query, where, type DocumentData, type QueryDocumentSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { Product } from '../data/products';
import { PRODUCTS as MOCK_PRODUCTS } from '../data/products';
import { useCollection } from '../context/CollectionContext';

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
                // We need to query by name because the collection ID is auto-generated or unknown
                const q = query(collectionsRef, where('name', '==', targetCollectionName));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const collectionDoc = querySnapshot.docs[0];
                    console.log(`Found collection doc: ${collectionDoc.id} for ${targetCollectionName}`);

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

                    setProducts(firebaseProducts);
                    sessionStorage.setItem(cacheKey, JSON.stringify(firebaseProducts));
                    setLoading(false);
                    return;
                } else {
                    console.warn(`No collection found for ${targetCollectionName}`);
                }

                // Fallback to mock data
                console.log(`Using mock data for ${targetCollectionName} (Fallback)`);
                setTimeout(() => {
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
                    setProducts(mockData);
                    sessionStorage.setItem(cacheKey, JSON.stringify(mockData));
                    setLoading(false);
                }, 800);

            } catch (err) {
                console.warn('Firebase connection failed or not configured, using mock data.', err);
                let mockData: Product[];
                if (targetCollectionName === 'Dark') {
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
    }, [currentCollection]);

    return { products, loading, error };
};
