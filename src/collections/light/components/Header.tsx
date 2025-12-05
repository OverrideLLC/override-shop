import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../../shared/context/CartContext';
import { useTheme } from '../../../shared/context/ThemeContext';
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
                <div className="flex items-center gap-2">
                    <img src="https://vluoppbaehfmhkebyygv.supabase.co/storage/v1/object/public/logos/Overridelogo.svg" alt="Override Logo" className="h-8 w-8" />
                    <span className="text-xl font-bold tracking-tight text-gray-900">@Override Shop</span>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={handleThemeToggle}
                        className="rounded-full bg-gray-100 px-4 py-2 text-xs font-medium uppercase tracking-wide text-gray-600 hover:bg-gray-200 transition-colors"
                    >
                        Switch to Dark
                    </button>

                    <button
                        onClick={() => setIsCartOpen(true)}
                        className="flex items-center gap-2 rounded-full bg-black px-4 py-2 text-white hover:bg-gray-800 transition-colors shadow-md hover:shadow-lg"
                    >
                        <span className="text-sm font-medium">Cart ({itemCount})</span>
                        <ShoppingCart className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </header>
    );
};
