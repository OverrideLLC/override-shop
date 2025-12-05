import type { ReactNode } from 'react';
import { Header } from './Header';
import { CartSidebar } from './CartSidebar';
import { Footer } from './Footer';
import { Hero } from './Hero';
import { useLocation } from 'react-router-dom';

export const Layout = ({ children }: { children: ReactNode }) => {
    const location = useLocation();
    const isHomePage = location.pathname === '/dark' || location.pathname === '/dark/';

    return (
        <div className="min-h-screen bg-black text-[#00ff00] selection:bg-[#00ff00] selection:text-black font-mono">
            <Header />
            <CartSidebar />
            {isHomePage && <Hero />}
            <main className="container mx-auto px-4 py-8 md:py-12">
                {children}
            </main>
            <Footer />
        </div>
    );
};
