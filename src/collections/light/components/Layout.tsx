import type { ReactNode } from 'react';
import { Header } from './Header';
import { CartSidebar } from './CartSidebar';
import { Footer } from './Footer';
import { Hero } from './Hero';
import { useLocation } from 'react-router-dom';

export const Layout = ({ children }: { children: ReactNode }) => {
    const location = useLocation();
    const isHomePage = location.pathname === '/light' || location.pathname === '/light/';

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-black selection:text-white">
            <Header />
            <CartSidebar />
            {isHomePage && <Hero />}
            <main className="container mx-auto px-4 py-12">
                {children}
            </main>
            <Footer />
        </div>
    );
};
