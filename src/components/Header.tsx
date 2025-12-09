import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useCollection } from '../context/CollectionContext';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export const Header = () => {
    const { items, setIsCartOpen } = useCart();
    const { collections, currentCollection, selectCollection } = useCollection();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <header className="sticky top-0 z-40 w-full border-b bg-white dark:bg-black border-gray-200 dark:border-[#00ff00] transition-colors duration-300">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 -ml-2 text-slate-900 dark:text-[#00ff00] hover:bg-slate-100 dark:hover:bg-[#00ff00]/10 transition-colors"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>

                {/* Left Actions (Desktop) */}
                <div className="hidden md:flex items-center gap-4 w-1/3 flex-wrap">
                    {collections.map(collection => (
                        <button
                            key={collection}
                            onClick={() => selectCollection(collection)}
                            className={`font-mono text-sm uppercase hover:underline decoration-1 underline-offset-4 transition-colors ${currentCollection === collection
                                ? 'text-slate-900 dark:text-[#00ff00] font-bold border border-slate-900 dark:border-[#00ff00] px-2 py-1'
                                : 'text-slate-500 dark:text-[#00ff00]/50 hover:text-slate-900 dark:hover:text-[#00ff00]'
                                }`}
                        >
                            [COLECCIÓN_{collection.toUpperCase()}]
                        </button>
                    ))}
                </div>

                {/* Center Logo */}
                <div className="flex items-center justify-center gap-2 w-full md:w-1/3">
                    <Link to="/" className="flex items-center gap-2">
                        <span className="text-xl font-bold tracking-tighter text-slate-900 dark:text-[#00ff00]">@Override fun Shop()</span>
                    </Link>
                </div>

                {/* Right Actions */}
                <div className="flex items-center justify-end gap-4 w-auto md:w-1/3">
                    <button
                        onClick={() => setIsCartOpen(true)}
                        className="flex items-center gap-2 hover:underline decoration-1 underline-offset-4 text-slate-900 dark:text-[#00ff00]"
                    >
                        <span className="hidden md:inline font-mono text-sm">[CARRITO: {itemCount}]</span>
                        <span className="md:hidden font-mono text-sm">[{itemCount}]</span>
                        <ShoppingCart className="h-5 w-5" />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden border-t border-gray-200 dark:border-[#00ff00] bg-white dark:bg-black px-4 py-4 shadow-lg absolute w-full left-0 z-50 transition-colors duration-300">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            {collections.map(collection => (
                                <button
                                    key={collection}
                                    onClick={() => {
                                        selectCollection(collection);
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className={`w-full border px-4 py-3 text-sm font-mono uppercase tracking-wide transition-colors text-center ${currentCollection === collection
                                        ? 'border-slate-900 dark:border-[#00ff00] bg-slate-100 dark:bg-[#00ff00]/10 text-slate-900 dark:text-[#00ff00] font-bold'
                                        : 'border-slate-200 dark:border-[#00ff00]/30 text-slate-500 dark:text-[#00ff00]/70 hover:bg-slate-50 dark:hover:bg-[#00ff00]/10'
                                        }`}
                                >
                                    [COLECCIÓN_{collection.toUpperCase()}]
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};
