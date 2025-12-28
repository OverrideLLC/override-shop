'use client';

import type { ReactNode } from 'react';
import { Header } from './Header';
import { CartSidebar } from './CartSidebar';
import { Footer } from './Footer';

export const Layout = ({ children }: { children: ReactNode }) => {
    // pathname used to determine layout variations if needed
    // const pathname = usePathname(); 

    return (
        <div className="min-h-screen transition-colors duration-300">
            <Header />
            <CartSidebar />
            {/* Hero removed from Layout, now handled by Page/Renderer */}
            <main className="container mx-auto px-4 py-8 md:py-12">
                {children}
            </main>
            <Footer />
        </div>
    );
};
