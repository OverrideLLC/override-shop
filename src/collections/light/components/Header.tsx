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
        <header className="sticky top-0 z-40 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md shadow-sm">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 -ml-2 text-gray-600"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>

                {/* Left Actions (Desktop) */}
                <div className="hidden md:flex items-center gap-4 w-1/3">
                    <button
                        onClick={handleThemeToggle}
                        className="rounded-full bg-gray-100 px-4 py-2 text-xs font-medium uppercase tracking-wide text-gray-600 hover:bg-gray-200 transition-colors"
                    >
                        Switch to Dark
                    </button>
                </div>

                {/* Center Logo */}
                <div className="flex items-center justify-center gap-2 w-full md:w-1/3">
                    <Link to="/" className="flex items-center gap-2 group">
                        <img src="https://vluoppbaehfmhkebyygv.supabase.co/storage/v1/object/public/logos/Overridelogo.svg" alt="Override Logo" className="h-8 w-8 group-hover:scale-110 transition-transform duration-300 brightness-0 invert sepia saturate-[5000%] hue-rotate-[260deg]" />
                        <span className="text-xl font-bold tracking-tight text-gray-900 group-hover:text-accent transition-colors">Override Shop</span>
                    </Link>
                </div>

                {/* Right Actions */}
                <div className="flex items-center justify-end gap-4 w-auto md:w-1/3">
                    <button
                        onClick={() => setIsCartOpen(true)}
                        className="flex items-center gap-2 rounded-full bg-black px-3 py-2 md:px-4 md:py-2 text-white hover:bg-accent transition-colors shadow-md hover:shadow-lg"
                    >
                        <span className="hidden md:inline text-sm font-medium">Cart ({itemCount})</span>
                        <span className="md:hidden text-sm font-medium">({itemCount})</span>
                        <ShoppingCart className="h-4 w-4" />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 shadow-lg absolute w-full left-0">
                    <div className="flex flex-col gap-4">
                        <button
                            onClick={handleThemeToggle}
                            className="w-full rounded-lg bg-gray-100 px-4 py-3 text-sm font-medium uppercase tracking-wide text-gray-600 hover:bg-gray-200 transition-colors text-center"
                        >
                            Switch to Dark Mode
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
};
