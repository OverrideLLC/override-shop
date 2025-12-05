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
        <header className="sticky top-0 z-40 w-full border-b bg-black border-[#00ff00]">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-2">
                    <img src="https://vluoppbaehfmhkebyygv.supabase.co/storage/v1/object/public/logos/Overridelogo.svg" alt="Override Logo" className="h-8 w-8 brightness-0 invert sepia saturate-[5000%] hue-rotate-[80deg]" />
                    <span className="text-xl font-bold tracking-tighter text-[#00ff00]">@Override fun Shop()</span>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={handleThemeToggle}
                        className="font-mono text-sm uppercase hover:underline decoration-1 underline-offset-4 text-[#00ff00]"
                    >
                        [CAMBIAR_A_LIGHT]
                    </button>

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
