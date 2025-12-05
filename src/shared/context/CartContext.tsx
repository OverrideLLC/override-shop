import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Product } from '../data/products';

export type CartItem = Product & {
    quantity: number;
    selectedSize?: string;
};

interface CartContextType {
    items: CartItem[];
    addItem: (product: Product, size?: string) => void;
    removeItem: (productId: string, size?: string) => void;
    clearCart: () => void;
    total: number;
    isCartOpen: boolean;
    setIsCartOpen: (isOpen: boolean) => void;
    checkoutWhatsApp: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const addItem = (product: Product, size?: string) => {
        setItems(prev => {
            const existingItem = prev.find(item => item.id === product.id && item.selectedSize === size);
            if (existingItem) {
                return prev.map(item =>
                    (item.id === product.id && item.selectedSize === size)
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1, selectedSize: size }];
        });
        setIsCartOpen(true);
    };

    const removeItem = (productId: string, size?: string) => {
        setItems(prev => prev.filter(item => !(item.id === productId && item.selectedSize === size)));
    };

    const clearCart = () => setItems([]);

    const checkoutWhatsApp = () => {
        const phoneNumber = "524522007824"; // Replace with actual number
        const message = items.map(item =>
            `${item.quantity}x ${item.name} ${item.selectedSize ? `(Size: ${item.selectedSize})` : ''} - $${item.price}`
        ).join('%0A');

        const totalMsg = `%0ATotal: $${total.toFixed(2)}`;
        const header = "Hola Override, quiero:%0A";

        const url = `https://wa.me/${phoneNumber}?text=${header}${message}${totalMsg}`;
        window.open(url, '_blank');
    };

    return (
        <CartContext.Provider value={{
            items,
            addItem,
            removeItem,
            clearCart,
            total,
            isCartOpen,
            setIsCartOpen,
            checkoutWhatsApp
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
