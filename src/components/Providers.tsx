'use client';

import { CartProvider } from '../context/CartContext';
import { CollectionProvider } from '../context/CollectionContext';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <CartProvider>
            <CollectionProvider>
                {children}
            </CollectionProvider>
        </CartProvider>
    );
}
