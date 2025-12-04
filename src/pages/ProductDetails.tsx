import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Plus } from 'lucide-react';
import { useProduct } from '../hooks/useProduct';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import { clsx } from 'clsx';

const SIZES = ['S', 'M', 'L', 'XL', '2XL'];

export const ProductDetails = () => {
    const { id } = useParams();
    const { product, loading, error } = useProduct(id);
    const { addItem } = useCart();
    const [selectedSize, setSelectedSize] = useState<string>('L');

    if (loading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <div className="animate-pulse font-mono text-xl">CARGANDO_DATOS...</div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="flex h-[50vh] flex-col items-center justify-center gap-4">
                <div className="font-mono text-red-600">ERROR: {error || 'Product not found'}</div>
                <Link to="/" className="btn-brutal">
                    <ArrowLeft className="h-4 w-4" />
                    Volver a la Base
                </Link>
            </div>
        );
    }

    const isApparel = product.category === 'Ropa';

    return (
        <div className="py-12">
            <Link to="/" className="mb-8 inline-flex items-center gap-2 font-mono text-sm hover:underline">
                <ArrowLeft className="h-4 w-4" />
                VOLVER_AL_CATALOGO
            </Link>

            <div className="grid gap-12 lg:grid-cols-2">
                {/* Image */}
                <div className="aspect-square w-full overflow-hidden border border-black">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover"
                    />
                </div>

                {/* Info */}
                <div className="flex flex-col">
                    <div className="mb-2 inline-block w-fit border border-black px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest">
                        {product.category}
                    </div>
                    <h1 className="mb-4 text-4xl font-black uppercase tracking-tighter md:text-6xl">
                        {product.name}
                    </h1>
                    <p className="mb-8 font-mono text-2xl font-bold">
                        ${product.price.toFixed(2)}
                    </p>

                    <div className="mb-8 border-t border-b border-black py-8">
                        <p className="font-mono text-gray-600 leading-relaxed">
                            {product.description}
                        </p>
                    </div>

                    <div className="mt-auto space-y-6">
                        {isApparel && (
                            <div className="space-y-2">
                                <label className="font-mono text-sm font-bold uppercase">Seleccionar Talla:</label>
                                <div className="flex gap-3">
                                    {SIZES.map(size => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={clsx(
                                                "h-12 w-12 border text-sm font-mono transition-all",
                                                selectedSize === size
                                                    ? "bg-black text-white border-black"
                                                    : "bg-white text-black border-black hover:bg-gray-100"
                                            )}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <button
                            onClick={() => addItem(product, isApparel ? selectedSize : undefined)}
                            disabled={!product.inStock}
                            className={clsx(
                                "w-full py-4 border font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all text-lg",
                                "bg-black text-white border-black hover:bg-white hover:text-black",
                                !product.inStock && "opacity-50 cursor-not-allowed"
                            )}
                        >
                            <span>Agregar al Carrito</span>
                            <Plus className="h-5 w-5" />
                        </button>

                        {!product.inStock && (
                            <p className="text-center font-mono text-sm text-red-600">
                // EXCEPCION_AGOTADO
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
