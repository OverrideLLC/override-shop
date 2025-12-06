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
                    "fixed inset-0 z-50 bg-black/20 backdrop-blur-sm transition-opacity duration-300",
                    isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={() => setIsCartOpen(false)}
            />

            {/* Sidebar */}
            <div
                className={clsx(
                    "fixed inset-y-0 right-0 z-50 w-full max-w-md border-l border-gray-100 bg-white shadow-2xl transition-transform duration-300 ease-in-out",
                    isCartOpen ? "translate-x-0" : "translate-x-full"
                )}
            >
                <div className="flex h-full flex-col">
                    <div className="flex items-center justify-between border-b border-gray-100 p-4 md:p-6">
                        <h2 className="font-bold text-xl text-gray-900">Carrito de Compras</h2>
                        <button
                            onClick={() => setIsCartOpen(false)}
                            className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500 hover:text-black"
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
                                    <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                        <img
                                            src={item.images[0]}
                                            alt={item.name}
                                            className="h-20 w-20 object-cover rounded-xl border border-gray-100"
                                        />
                                        <div className="flex-1">
                                            <h3 className="font-bold text-sm text-gray-900">{item.name}</h3>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {item.selectedSize && `Talla: ${item.selectedSize} | `}
                                                Cant: {item.quantity}
                                            </p>
                                            <p className="font-medium text-sm mt-2 text-gray-900">${item.price.toFixed(2)}</p>
                                        </div>
                                        <button
                                            onClick={() => removeItem(item.id, item.selectedSize)}
                                            className="self-start p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="border-t border-gray-100 p-6 space-y-6 bg-gray-50">
                        <div className="flex justify-between font-bold text-xl">
                            <span className="text-gray-600 font-medium">Total</span>
                            <span className="font-bold text-2xl text-gray-900">${total.toFixed(2)}</span>
                        </div>
                        <button
                            onClick={checkoutWhatsApp}
                            disabled={items.length === 0}
                            className="w-full py-4 bg-black text-white font-bold rounded-xl hover:bg-gray-800 hover:shadow-lg transition-all flex items-center justify-center gap-2"
                        >
                            <span>Comprar por WhatsApp</span>
                            <MessageCircle className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
