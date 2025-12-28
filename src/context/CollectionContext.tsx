import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { fetchWithCache } from '../lib/cache';

interface CollectionContextType {
    collections: string[];
    currentCollection: string;
    loading: boolean;
    selectCollection: (name: string) => void;
}

const CollectionContext = createContext<CollectionContextType | undefined>(undefined);

export const CollectionProvider = ({ children }: { children: ReactNode }) => {
    const [collections, setCollections] = useState<string[]>([]);
    const [currentCollection, setCurrentCollection] = useState<string>(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('currentCollection') || 'Dark';
        }
        return 'Dark';
    });
    const [loading, setLoading] = useState(true);

    const fetchCollections = async () => {
        try {
            const data = await fetchWithCache<string[]>('collections_list', async () => {
                try {
                    const querySnapshot = await getDocs(collection(db, 'collections'));
                    const fetchedCollections = querySnapshot.docs.map(doc => doc.data().name as string);

                    // Ensure we have at least 'Dark' and 'Light'
                    const defaultCollections = ['Dark', 'Light'];
                    const uniqueCollections = Array.from(new Set([...defaultCollections, ...fetchedCollections]));
                    return uniqueCollections;
                } catch (error) {
                    console.error("Failed to fetch collections from DB:", error);
                    return ['Dark', 'Light'];
                }
            }, 20); // 20m TTL

            setCollections(data);
        } catch (error) {
            console.error("Critical error in CollectionContext:", error);
            // Fallback
            setCollections(['Dark', 'Light']);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCollections();
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('currentCollection', currentCollection);
        }

        // Theme switching logic
        const root = window.document.documentElement;
        const isLight = currentCollection.toLowerCase() === 'light';

        if (isLight) {
            root.classList.remove('dark');
            root.classList.add('light');
        } else {
            root.classList.remove('light');
            root.classList.add('dark');
        }
    }, [currentCollection]);

    const selectCollection = (name: string) => {
        setCurrentCollection(name);
    };

    return (
        <CollectionContext.Provider value={{
            collections,
            currentCollection,
            loading,
            selectCollection
        }}>
            {children}
        </CollectionContext.Provider>
    );
};

export const useCollection = () => {
    const context = useContext(CollectionContext);
    if (context === undefined) {
        throw new Error('useCollection must be used within a CollectionProvider');
    }
    return context;
};
