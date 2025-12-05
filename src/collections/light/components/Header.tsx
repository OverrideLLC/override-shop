import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../../shared/context/CartContext';
import { useTheme } from '../../../shared/context/ThemeContext';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
    const { items, setIsCartOpen } = useCart();
    const { theme } = useTheme();
    const navigate = useNavigate();
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    const handleThemeToggle = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        navigate(`/${newTheme}`);
    };

    return (
        <header className="sticky top-0 z-40 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md shadow-sm">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Left Actions */}
                <div className="flex items-center gap-4 w-1/3">
                    <button
                        onClick={handleThemeToggle}
                        className="rounded-full bg-gray-100 px-4 py-2 text-xs font-medium uppercase tracking-wide text-gray-600 hover:bg-gray-200 transition-colors"
                    >
                        Switch to Dark
                    </button>
                </div>

                {/* Center Logo */}
                <div className="flex items-center justify-center gap-2 w-1/3">
                    <Link to="/" className="flex items-center gap-2 group">
                        <img src="https://vluoppbaehfmhkebyygv.supabase.co/storage/v1/object/public/logos/Overridelogo.svg" alt="Override Logo" className="h-8 w-8 group-hover:scale-110 transition-transform duration-300 brightness-0 invert sepia saturate-[5000%] hue-rotate-[260deg]" />
                        <span className="text-xl font-bold tracking-tight text-gray-900 group-hover:text-accent transition-colors">Override Shop</span>
                    </Link>
                </div>

                {/* Right Actions */}
                <div className="flex items-center justify-end gap-4 w-1/3">
                    <button
                        onClick={() => setIsCartOpen(true)}
                        className="flex items-center gap-2 rounded-full bg-black px-4 py-2 text-white hover:bg-accent transition-colors shadow-md hover:shadow-lg"
                    >
                        <span className="text-sm font-medium">Cart ({itemCount})</span>
                        <ShoppingCart className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </header>
    );
};
