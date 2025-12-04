import { X, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { clsx } from 'clsx';

export const CartSidebar = () => {
    const { items, removeItem, total, isCartOpen, setIsCartOpen, checkoutWhatsApp } = useCart();

    return (
        <>
            {/* Backdrop */}
            <div
                className={clsx(
                    "fixed inset-0 z-50 bg-black/20 backdrop-blur-sm transition-opacity duration-300",
                    isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={() => setIsCartOpen(false)}
            />

            {/* Sidebar */}
            <div
                className={clsx(
                    "fixed inset-y-0 right-0 z-50 w-full max-w-md border-l border-black bg-white shadow-2xl transition-transform duration-300 ease-in-out",
                    isCartOpen ? "translate-x-0" : "translate-x-full"
                )}
            >
                <div className="flex h-full flex-col">
                    <div className="flex items-center justify-between border-b border-black p-4">
                        <h2 className="font-bold text-lg">SISTEMA_CARRITO</h2>
                        <button
                            onClick={() => setIsCartOpen(false)}
                            className="p-2 hover:bg-black hover:text-white transition-colors"
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
                                    <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4 border border-black p-3">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="h-20 w-20 object-cover border border-black grayscale"
                                        />
                                        <div className="flex-1">
                                            <h3 className="font-bold text-sm">{item.name}</h3>
                                            <p className="font-mono text-xs text-gray-600">
                                                {item.selectedSize && `Talla: ${item.selectedSize} | `}
                                                Cant: {item.quantity}
                                            </p>
                                            <p className="font-mono text-sm mt-1">${item.price.toFixed(2)}</p>
                                        </div>
                                        <button
                                            onClick={() => removeItem(item.id, item.selectedSize)}
                                            className="self-start p-1 hover:text-red-600"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="border-t border-black p-4 space-y-4">
                        <div className="flex justify-between font-bold text-xl">
                            <span>TOTAL</span>
                            <span className="font-mono">${total.toFixed(2)}</span>
                        </div>
                        <button
                            onClick={checkoutWhatsApp}
                            disabled={items.length === 0}
                            className="w-full btn-brutal disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span>Iniciar Compra</span>
                            <ArrowRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
