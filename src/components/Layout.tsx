import type { ReactNode } from 'react';
import { Header } from './Header';
import { CartSidebar } from './CartSidebar';
import { Footer } from './Footer';

export const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white">
            <Header />
            <CartSidebar />
            <main className="container mx-auto px-4">
                {children}
            </main>
            <Footer />
        </div>
    );
};
