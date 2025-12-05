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
        <header className="sticky top-0 z-40 w-full border-b bg-black border-[#00ff00]">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Left Actions */}
                <div className="flex items-center gap-4 w-1/3">
                    <button
                        onClick={handleThemeToggle}
                        className="font-mono text-sm uppercase hover:underline decoration-1 underline-offset-4 text-[#00ff00]"
                    >
                        [CAMBIAR_A_LIGHT]
                    </button>
                </div>

                {/* Center Logo */}
                <div className="flex items-center justify-center gap-2 w-1/3">
                    <Link to="/" className="flex items-center gap-2">
                        <img src="https://vluoppbaehfmhkebyygv.supabase.co/storage/v1/object/public/logos/Overridelogo.svg" alt="Override Logo" className="h-8 w-8 brightness-0 invert sepia saturate-[5000%] hue-rotate-[80deg]" />
                        <span className="text-xl font-bold tracking-tighter text-[#00ff00]">@Override fun Shop()</span>
                    </Link>
                </div>

                {/* Right Actions */}
                <div className="flex items-center justify-end gap-4 w-1/3">
                    <button
                        onClick={() => setIsCartOpen(true)}
                        className="flex items-center gap-2 hover:underline decoration-1 underline-offset-4 text-[#00ff00]"
                    >
                        <span className="font-mono text-sm">[CARRITO: {itemCount}]</span>
                        <ShoppingCart className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </header>
    );
};
