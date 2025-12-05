import type { ReactNode } from 'react';
import { Header } from './Header';
import { CartSidebar } from './CartSidebar';
import { Footer } from './Footer';

export const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="min-h-screen bg-black text-[#00ff00] selection:bg-[#00ff00] selection:text-black font-mono">
            <Header />
            <CartSidebar />
            <main className="container mx-auto px-4">
                {children}
            </main>
            <Footer />
        </div>
    );
};
