import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Header = () => {
    const { items, setIsCartOpen } = useCart();
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <header className="sticky top-0 z-40 w-full border-b border-black bg-white">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-2">
                    <img src="https://vluoppbaehfmhkebyygv.supabase.co/storage/v1/object/public/logos/Overridelogo.svg" alt="Override Logo" className="h-8 w-8 brightness-0" />
                    <span className="text-xl font-bold tracking-tighter">@Override fun Shop()</span>
                </div>

                <button
                    onClick={() => setIsCartOpen(true)}
                    className="flex items-center gap-2 hover:underline decoration-1 underline-offset-4"
                >
                    <span className="font-mono text-sm">[CARRITO: {itemCount}]</span>
                    <ShoppingCart className="h-5 w-5" />
                </button>
            </div>
        </header>
    );
};
