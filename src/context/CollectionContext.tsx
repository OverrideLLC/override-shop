import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

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
        return localStorage.getItem('currentCollection') || 'Dark';
    });
    const [loading, setLoading] = useState(true);

    const fetchCollections = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'collections'));
            const fetchedCollections = querySnapshot.docs.map(doc => doc.data().name as string);

            // Ensure we have at least 'Dark' and 'Light' if DB is empty/incomplete for now
            const defaultCollections = ['Dark', 'Light'];
            const uniqueCollections = Array.from(new Set([...defaultCollections, ...fetchedCollections]));

            setCollections(uniqueCollections);
        } catch (error) {
            console.error("Failed to fetch collections:", error);
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
        localStorage.setItem('currentCollection', currentCollection);

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
