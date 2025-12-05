import { X, Trash2, MessageCircle } from 'lucide-react';
import { useCart } from '../../../shared/context/CartContext';
import { clsx } from 'clsx';

export const CartSidebar = () => {
    const { items, removeItem, total, isCartOpen, setIsCartOpen, checkoutWhatsApp } = useCart();

    return (
        <>
            {/* Backdrop */}
            <div
                className={clsx(
                    "fixed inset-0 z-50 bg-[#00ff00]/10 backdrop-blur-sm transition-opacity duration-300",
                    isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={() => setIsCartOpen(false)}
            />

            {/* Sidebar */}
            <div
                className={clsx(
                    "fixed inset-y-0 right-0 z-50 w-full max-w-md border-l border-[#00ff00] bg-black shadow-2xl transition-transform duration-300 ease-in-out",
                    isCartOpen ? "translate-x-0" : "translate-x-full"
                )}
            >
                <div className="flex h-full flex-col">
                    <div className="flex items-center justify-between border-b border-[#00ff00] p-4">
                        <h2 className="font-bold text-lg text-[#00ff00]">SISTEMA_CARRITO</h2>
                        <button
                            onClick={() => setIsCartOpen(false)}
                            className="p-2 transition-colors text-[#00ff00] hover:bg-[#00ff00] hover:text-black rounded-none"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4">
                        {items.length === 0 ? (
                            <div className="flex h-full flex-col items-center justify-center text-center opacity-50">
                                <p className="font-mono">El carrito está vacío.</p>
                                <p className="font-mono text-sm mt-2">Ejecuta add_to_cart() para continuar.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {items.map((item) => (
                                    <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4 border border-[#00ff00] p-3 rounded-none">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="h-20 w-20 object-cover rounded-none border border-[#00ff00]"
                                        />
                                        <div className="flex-1">
                                            <h3 className="font-bold text-sm text-[#00ff00]">{item.name}</h3>
                                            <p className="font-mono text-xs text-[#00ff00]/70">
                                                {item.selectedSize && `Talla: ${item.selectedSize} | `}
                                                Cant: {item.quantity}
                                            </p>
                                            <p className="font-mono text-sm mt-1 text-[#00ff00]">${item.price.toFixed(2)}</p>
                                        </div>
                                        <button
                                            onClick={() => removeItem(item.id, item.selectedSize)}
                                            className="self-start p-1 text-[#00ff00]/50 hover:text-[#00ff00]"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="border-t border-[#00ff00] p-4 space-y-4">
                        <div className="flex justify-between font-bold text-xl">
                            <span className="text-[#00ff00]">TOTAL</span>
                            <span className="font-mono text-[#00ff00]">${total.toFixed(2)}</span>
                        </div>
                        <button
                            onClick={checkoutWhatsApp}
                            disabled={items.length === 0}
                            className="w-full py-3 bg-[#00ff00] text-black font-bold uppercase tracking-wider hover:bg-[#00ff00]/90 transition-colors flex items-center justify-center gap-2 rounded-none"
                        >
                            <span>Completar Orden</span>
                            <MessageCircle className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
