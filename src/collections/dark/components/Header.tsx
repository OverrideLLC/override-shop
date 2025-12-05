import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '../../../shared/context/CartContext';
import { useTheme } from '../../../shared/context/ThemeContext';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const Header = () => {
    const { items, setIsCartOpen } = useCart();
    const { theme } = useTheme();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    const handleThemeToggle = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        navigate(`/${newTheme}`);
        setIsMobileMenuOpen(false);
    };

    return (
        <header className="sticky top-0 z-40 w-full border-b bg-black border-[#00ff00]">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 -ml-2 text-[#00ff00] hover:bg-[#00ff00]/10 transition-colors"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>

                {/* Left Actions (Desktop) */}
                <div className="hidden md:flex items-center gap-4 w-1/3">
                    <button
                        onClick={handleThemeToggle}
                        className="font-mono text-sm uppercase hover:underline decoration-1 underline-offset-4 text-[#00ff00]"
                    >
                        [CAMBIAR_A_LIGHT]
                    </button>
                </div>

                {/* Center Logo */}
                <div className="flex items-center justify-center gap-2 w-full md:w-1/3">
                    <Link to="/" className="flex items-center gap-2">
                        <img src="https://vluoppbaehfmhkebyygv.supabase.co/storage/v1/object/public/logos/Overridelogo.svg" alt="Override Logo" className="h-8 w-8 brightness-0 invert sepia saturate-[5000%] hue-rotate-[80deg]" />
                        <span className="text-xl font-bold tracking-tighter text-[#00ff00]">@Override fun Shop()</span>
                    </Link>
                </div>

                {/* Right Actions */}
                <div className="flex items-center justify-end gap-4 w-auto md:w-1/3">
                    <button
                        onClick={() => setIsCartOpen(true)}
                        className="flex items-center gap-2 hover:underline decoration-1 underline-offset-4 text-[#00ff00]"
                    >
                        <span className="hidden md:inline font-mono text-sm">[CARRITO: {itemCount}]</span>
                        <span className="md:hidden font-mono text-sm">[{itemCount}]</span>
                        <ShoppingCart className="h-5 w-5" />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden border-t border-[#00ff00] bg-black px-4 py-4 shadow-lg absolute w-full left-0 z-50">
                    <div className="flex flex-col gap-4">
                        <button
                            onClick={handleThemeToggle}
                            className="w-full border border-[#00ff00] px-4 py-3 text-sm font-mono uppercase tracking-wide text-[#00ff00] hover:bg-[#00ff00]/10 transition-colors text-center"
                        >
                            [CAMBIAR_A_LIGHT]
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
};
