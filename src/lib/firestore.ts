import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import type { LayoutConfig } from '../types/layout';

export const getLayoutConfig = async (): Promise<LayoutConfig | null> => {
    try {
        const docRef = doc(db, 'config', 'layout_v1');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data() as LayoutConfig;
        } else {
            console.warn('No layout config found in Firestore');
            return null;
        }
    } catch (error) {
        console.error('Error fetching layout config:', error);
        return null;
    }
};
